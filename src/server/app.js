// Mongoose
require('./db/mongoose')

// Core modules
const path = require('path')

// Import 3rd party dependencies
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
// Fallback to index.html for applications that are using the HTML 5 history API
const history = require('connect-history-api-fallback');
const serveStatic = require('serve-static');

// Import routes
const userRoutes = require('./api/routes/user')

// Define public path to serve it
const publicPath = path.join(__dirname, '../../build')

/*
* Middleware
*
*/

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(history());
// Serve publicPath directory
app.use(serveStatic(publicPath));

// Configure CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

/*
 * Routes
 *
 */

app.use("/api/user", userRoutes)

// Serve React Build
app.get('/', (req, res) => {
  res.sendFile(publicPath)
});

// Not found middleware
app.use((req, res, next) => {
  const error = new Error("Not found")
  error.status = 404
  next(error)
})

// Server error middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

// Export
module.exports = app