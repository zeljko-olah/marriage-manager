const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
})
  .then(() => {
    console.log('Connected to DB')
  })

module.exports = {mongoose}