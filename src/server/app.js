/*
 * Dependencies
 *
 */

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
// const history = require('connect-history-api-fallback')
const serveStatic = require('serve-static')
const cors = require('cors')

// Import routes
const userRoutes = require('./api/routes/user')
const chatRoutes = require('./api/routes/chat')
const locationRoutes = require('./api/routes/location')
const todoRoutes = require('./api/routes/todos')
const reminderRoutes = require('./api/routes/reminders')

// Define public path to serve it
const publicPath = path.join(__dirname, '../../build')

/*
* Middleware
*
*/

// Use express middleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Serve publicPath directory
app.use(serveStatic(publicPath))
app.use(cors())

/*
 * Routes
 *
 */

app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/location", locationRoutes)
app.use("/api/todos", todoRoutes)
app.use("/api/reminders", reminderRoutes)

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