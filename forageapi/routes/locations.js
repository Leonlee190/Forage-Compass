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

  if (location.valid) {
    debug(`Adding location for [${req.body.name}]`);
    await req.app.locals.colLocation
      .insertOne(req.body)
      .then((result) => {
        res.send(`Location for ${req.body.name} was added to the database`);
      })
      .catch((error) => debug(error));
  } else {
    res.status(406);
    res.send(`Invalid location information provided ${location.reason}`);
  }
});

///////////////////////////////////////
// CRUD - READ from persistent storage
//

/* GET all locations without any kind of filter */
router.get("/", async (req, res, next) => {
  await req.app.locals.colLocation
    .find()
    .toArray()
    .then((results) => {
      res.status(200).json(results);
    });
});

///////////////////////////////////////
// CRUD - UPDATE persistent storage
//

///////////////////////////////////////
// CRUD - DELETE from persistent storage
//

module.exports = router;
