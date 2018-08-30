const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  },
    unread: { type: Boolean, default: false },
    important: { type: Boolean, default: false },
    link: { type: Boolean, default: false },
    location: { type: Boolean, default: false },
    todo: { type: Boolean, default: false },
    room: { type: String, required: true }
},
{ timestamps: { createdAt: 'created_at' } })

module.exports = mongoose.model('Message', messageSchema)
