var express = require("express");
const debug = require("debug")("forageapi:server");
var router = express.Router();

/**
 * Validate that a location "document" for the MongoDB is/contains valid information
 */
async function validateLocation(location, categories) {
  let retValue = { valid: false };
  let validVarieties = [];

  // First, we need to get a simple array of all the valie Varieties within each
  // of the categories.  This array will server as the master list of varieties
  // that can be added to the database.
  await categories
    .find({}, { projection: { _id: 0, variety: 1 } })
    .toArray()
    .then((results) => {
      results.forEach((category) => {
        validVarieties = validVarieties.concat(category.variety);
      });
    });

  // Now we simply need to ensure the variety property of the locaiton object passed
  // in, is one of the valid varieties.
  if (validVarieties.includes(location.variety)) {
    retValue.valid = true;
  } else {
    // Provide some information back that indicates why it is not valid
    retValue.reason = `Variety specified [${location.variety}], must be one of: ${validVarieties}`;
  }

  return retValue;
}

///////////////////////////////////////
// CRUD - CREATE into persistent storage
//
router.post("/", async (req, res, next) => {
  // First need to validate that the requested entry is valid
  let location = await validateLocation(req.body, req.app.locals.colCategory);

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
  let varietyFilter = req.query.variety ? { variety: req.query.variety } : {};

  // First need to validate that the requested entry is valid
  let variety = await validateLocation(
    varietyFilter,
    req.app.locals.colCategory
  );

  res.status(406); // Assume this will encounter an error
  if (variety.valid || Object.keys(varietyFilter).length === 0) {
    await req.app.locals.colLocation
      .find(varietyFilter)
      .toArray()
      .then((results) => {
        res.status(200).json(results);
      });
  } else {
    res.send(`Invalid ${variety.reason}`);
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
        res.status(406);
        res.send(`Location not found in database`);
      }
    })
    .catch((error) => res.send(error.message));
});

module.exports = router;
