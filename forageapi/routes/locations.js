var express = require("express");
var router = express.Router();

//const locationCollection = dbForager.collection("location");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  await req.app.locals.colLocation
    .find()
    .toArray()
    .then((results) => {
      res.status(200).json(results);
    });
});

module.exports = router;
