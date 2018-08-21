const moment = require('moment')
const mongoose = require("mongoose")
const Location = require("../models/location")
const User = require("../models/user")
const Todo = require('../models/todo')


// SAVE NEW TODO
exports.saveTodo = (req, res, next) => {
  const {text, completed, priority, userId} = req.body


  const todo = new Todo({
    _id: mongoose.Types.ObjectId(),
    user: userId,
    text,
    completed,
    priority
  })

  todo
    .save()
    .then(doc => {
      const id = doc.user
      User.findById( id, 'name')
        .exec()
        .then(user => {
          res.status(201).json({
            _id: doc._id,
            text: doc.text,
            completed: doc.completed,
            priority: doc.priority,
            user: user.name,
            createdAt: moment(doc.created_at).format('h:mm a, MMM Do')
          })
        })
    })
  .catch((e) => {
    console.log(e)
    res.status(500).json({
      type: 'error',
      flashMessage: 'Unable to save todo. Try again. :('
    })
  })
}

// GET LATEST 30 TODOS
exports.getTodos = (req, res, next) => {
  Todo.find()
    .limit(30)
    .select('_id text user completed priority created_at')
    .populate({path: 'user', select: '_id name avatar'})
    .exec()
    .then(docs => {
      res.status(200).json({
        todos: docs.map(doc => {
          const time = moment(doc.created_at)
          return {
            id: doc._id,
            text: doc.text,
            completed: doc.completed,
            priority: doc.priority,
            createdAt: time,
            userId: doc.user._id,
            user: doc.user.name,
            avatar: doc.user.avatar.replace('public/', '')
          }
        })
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

