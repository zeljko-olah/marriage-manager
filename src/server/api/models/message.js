const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  },
    room: { type: String, required: true },
    unread: { type: Boolean, default: false },
    type: { type: String, default: 'message' }
},
{ timestamps: { createdAt: 'created_at' } })

module.exports = mongoose.model('Message', messageSchema)
