const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    users: {
      type: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
      }],
      validate: [arrayLimit, '{PATH} exceeds the limit of 10']
    }
},
{ timestamps: { createdAt: 'created_at' } })

function arrayLimit(val) {
  return val.length <= 2
}

module.exports = mongoose.model('Room', roomSchema)
