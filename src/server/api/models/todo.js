const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: {type: String, required: true, default: 'normal'},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  }
},
{ timestamps: { createdAt: 'created_at' } })

module.exports = mongoose.model('Todo', todoSchema)
