const mongoose = require('mongoose')

const ReminderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String },
    who: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: {type: String, required: true, default: 'normal'},
    date: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  }
},
{ timestamps: { createdAt: 'created_at' } })

module.exports = mongoose.model('Reminder', ReminderSchema)
