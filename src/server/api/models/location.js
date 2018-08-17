const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  }
},
{ timestamps: { createdAt: 'created_at' } })

module.exports = mongoose.model('Location', locationSchema)
