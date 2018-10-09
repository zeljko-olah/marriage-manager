// DEPENDENCIES
const mongoose = require('mongoose')

// Enable promises with mongoose
mongoose.Promise = global.Promise

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/MM', {
  useNewUrlParser: true
})
  .then(() => {
    console.log('Connected to DB')
  })
  .catch((e) => {
    console.log('ERROR::::')
    console.log(e.name)
  })

module.exports = {mongoose}