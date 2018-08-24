const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true, lowercase: true },
    default: { type: Boolean, default: false },
    users: {
      type: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
      }],
      validate: [arrayLimit, '{PATH} exceeds the limit of 2']
    }
},
{ timestamps: { createdAt: 'created_at' } })

function arrayLimit(val) {
  return val.length <= 2
}

module.exports = mongoose.model('Room', roomSchema)
