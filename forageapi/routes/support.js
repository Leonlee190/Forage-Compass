var express = require("express");
const debug = require("debug")("forageapi:server");
var router = express.Router();

const validClassifications = ["Feature", "Bug", "Data"];
/**
 * Validate that a location "document" for the MongoDB is/contains valid information
 */
function validateRequest(supportRequest) {
  let retValue = { valid: false };

  // Now we simply need to ensure the variety property of the locaiton object passed
  // in, is one of the valid varieties.
  if (validClassifications.includes(supportRequest.category)) {
    if (supportRequest.message) {
      retValue.valid = true;
    } else {
      retValue.reason = "Message is not present";
    }
  } else {
    // Provide some information back that indicates why it is not valid
    retValue.reason = `Category specified [${supportRequest.category}], must be one of: ${validClassifications}`;
  }

  return retValue;
}

async function getNextSequenceValue(db, sequenceName) {
  let colSequence = db.collection("sequences");

  let sequenceValue = await colSequence
    .findOneAndUpdate(
      { _id: sequenceName },
      { $inc: { nextval: 1 } },
      { returnDocument: "after" }
    )
    .then((results) => {
      return results.value.nextval;
    })
    .catch((error) => {
      debug(`No Sequence for ${sequenceName} was found in the database`);
      return undefined;
    });
  return sequenceValue;
}

///////////////////////////////////////
// CRUD - CREATE into persistent storage
//
router.post("/", async (req, res, next) => {
  // First need to validate that the requested entry is valid
  const { classification } = req.body || {};
  const validationResult = validateRequest(req.body);

  res.status(406); // Assume this will encounter an error
  if (validationResult.valid) {
    debug(`Adding support item for [${classification}]`);
    req.body._id = await getNextSequenceValue(
      req.app.locals.dbConnection,
      "requestID"
    );

    await req.app.locals.colRequests
      .insertOne(req.body)
      .then((result) => {
        res.status(200);
        res.send(`Support item created`);
      })
      .catch((error) => {
        res.send(error.message);
      });
  } else {
    res.send(
      `Invalid classification information provided (${validationResult.reason})`
    );
  }
});

///////////////////////////////////////
// CRUD - READ from persistent storage
//
router.get("/", async (req, res, next) => {
  const { classification } = req.query || {};
  const requestFilter = classification
    ? { classification: classification }
    : {};

  res.status(406); // Assume this will encounter an error
  if (
    validClassifications.includes(classification) ||
    Object.keys(req.query).length === 0
  ) {
    await req.app.locals.colRequests
      .find(requestFilter)
      .toArray()
      .then((results) => {
        res.status(200).json(results);
      });
  } else {
    res.send(
      `Invalid classificaiton requested, should be one of: [${validClassifications}]`
    );
  }
});

///////////////////////////////////////
// CRUD - UPDATE persistent storage
//
// N/A for this operation, values are predifned in the DB

///////////////////////////////////////
// CRUD - DELETE from persistent storage
//
router.delete("/:requestID", async (req, res, next) => {
  // Establish a filter of which request document to delete.
  // Note:  Passing in value of -1, will result in ALL entries being removed
  const deleteID = parseInt(req.params.requestID, 10);
  const deleteFilter = deleteID === -1 ? {} : { _id: deleteID };

  await req.app.locals.db
    .collection("requests")
    .deleteMany(deleteFilter)
    .then((results) => {
      if (results.deletedCount === 1) {
        res.status(200);
        res.send("Request deleted");
      } else if (deleteID === -1) {
        res.status(200);
        res.send("All support requests were deleted");
      } else {
        res.status(404);
        res.send(`RequestID not found in database`);
      }
    })
    .catch((error) => res.send(error.message));
});

module.exports = router;
