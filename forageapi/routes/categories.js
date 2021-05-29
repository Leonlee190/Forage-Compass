var express = require("express");
var router = express.Router();

///////////////////////////////////////
// CRUD - CREATE into persistent storage
//
// N/A for this operation, values are predifned in the DB

///////////////////////////////////////
// CRUD - READ from persistent storage
//

/* GET all locations without any kind of filter */
router.get("/", async (req, res, next) => {
  await req.app.locals.colCategory
    .find()
    .toArray()
    .then((results) => {
      res.status(200).json(results);
    });
});

///////////////////////////////////////
// CRUD - UPDATE persistent storage
//
// N/A for this operation, values are predifned in the DB

///////////////////////////////////////
// CRUD - DELETE from persistent storage
//
// N/A for this operation, values are predifned in the DB

module.exports = router;
