var express = require("express");
const debug = require("debug")("forageapi:server");
var router = express.Router();

const validCategories = ["Feature", "Bug", "Data"];
/**
 * Validate that a location "document" for the MongoDB is/contains valid information
 */
function validateRequest(location, userRequest) {
  let retValue = { valid: false };

  // Now we simply need to ensure the variety property of the locaiton object passed
  // in, is one of the valid varieties.
  if (userRequest.type in validCategories) {
    retValue.valid = true;
  } else {
    // Provide some information back that indicates why it is not valid
    retValue.reason = `Category specified [${userRequest.category}], must be one of: ${validCategories}`;
  }

  return retValue;
}

///////////////////////////////////////
// CRUD - CREATE into persistent storage
//
router.post("/", async (req, res, next) => {
  // First need to validate that the requested entry is valid
  let location = validateRequest(req.body, req.app.locals.colCategory);

  res.status(406); // Assume this will encounter an error
  if (location.valid) {
    debug(`Adding location for [${req.body.name}]`);
    await req.app.locals.colLocation
      .insertOne(req.body)
      .then((result) => {
        res.status(200);
        res.send(`Location added`);
      })
      .catch((error) => {
        res.send(error.message);
      });
  } else {
    res.send(`Invalid location information provided ${location.reason}`);
  }
});

///////////////////////////////////////
// CRUD - READ from persistent storage
//
router.get("/", async (req, res, next) => {
  let { classificationFilter } = req.query.classification || {};

  res.status(406); // Assume this will encounter an error
  if (classificationFilter in validCategories) {
    await req.app.locals.colRequests
      .find(classificationFilter)
      .toArray()
      .then((results) => {
        res.status(200).json(results);
      });
  } else {
    res.send(
      `Invalid classificaiton requested, should be one of: [${validCategories}]`
    );
  }
});

///////////////////////////////////////
// CRUD - UPDATE persistent storage
//
router.put("/", async (req, res, next) => {
  let location = await validateLocation(req.body, req.app.locals.colCategory);
  res.status(406); // Assume this will encounter an error

  if (location.valid) {
    debug(`Updating location for [${req.body.name}]`);
    await req.app.locals.colLocation
      .findOneAndReplace({ name: req.body.name }, req.body)
      .then((result) => {
        if (result.lastErrorObject.updatedExisting === true) {
          res.status(200);
          res.send("Location updated");
        } else {
          res.send(
            `Location [${req.body.name}] was not found, so nothing was updated`
          );
        }
      })
      .catch((error) => {
        res.send(error.message);
      });
  } else {
    res.send(`Invalid location information provided ${location.reason}`);
  }
});

///////////////////////////////////////
// CRUD - DELETE from persistent storage
//
router.delete("/", async (req, res, next) => {
  await req.app.locals.colLocation
    .deleteOne({ name: req.query.name })
    .then((results) => {
      if (results.deletedCount === 1) {
        res.status(200);
        res.send("Location deleted");
      } else {
        res.status(404);
        res.send(`Location not found in database`);
      }
    })
    .catch((error) => res.send(error.message));
});

module.exports = router;
