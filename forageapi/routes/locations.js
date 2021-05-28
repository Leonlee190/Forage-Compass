var express = require("express");
const debug = require("debug")("forageapi:server");
var router = express.Router();

///////////////////////////////////////
// CRUD - CREATE into persistent storage
//
router.post("/", async (req, res, next) => {
  debug(`Adding location for [${req.body.name}]`);
  await req.app.locals.colLocation
    .insertOne(req.body)
    .then((result) => {
      res.send(`Location for ${req.body.name} was added to the database`);
    })
    .catch((error) => debug(error));
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
