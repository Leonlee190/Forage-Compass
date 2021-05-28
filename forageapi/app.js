// Look for environment variables or .env file to help configure how to start
// the API server.  Do this at/near the top of the file in case other modules
// eg. 'debug' utilize environment variables as part of their operation
require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const debug = require("debug")("forageapi:server");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const locationsRouter = require("./routes/locations");
const categoriesRouter = require("./routes/categories");

const PORT = normalizePort(process.env.PORT || 3000);

const app = express();
const http = require("http");

const server = http.createServer(app);

const { MongoClient } = require("mongodb");
const dbConnectionURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.5up0o.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
let dbForager;

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;

  debug("Listening on " + bind);
}

app.set("port", PORT);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev")); // From 'morgan' module for logging HTTP info (middleware)
app.use(express.json()); // Force inbound requests to JSON payloads
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/locations", locationsRouter);
app.use("/categories", categoriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

MongoClient.connect(dbConnectionURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    debug("Connected to Database");

    dbForager = client.db("forager");
    app.locals.db = dbForager;
    // Need a way to pass this db object to route modules. Looked up several methods:
    // 1.  insert as middleware to request object (...req.db = db)
    // 2.  create a third module that has db utilites in there to return it's this pointer
    // 3.  leverage express's way of passing data between routes, app.local
    // Went with option 3, mainly because it felt that was exaclty why they added that to express
    app.locals.colLocation = dbForager.collection("location");
    app.locals.colCategory = dbForager.collection("category");

    server.listen(PORT);
    server.on("error", onError);
    server.on("listening", onListening);
  })
  .catch((error) => {
    debug("Error while connecting to database, shutting down");
    debug(error);
  });

module.exports = app;
