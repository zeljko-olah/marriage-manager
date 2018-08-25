const moment = require('moment')
const mongoose = require("mongoose")
const Location = require("../models/location")
const User = require("../models/user")
const Todo = require('../models/todo')


// SAVE NEW TODO
exports.saveTodo = (req, res, next) => {
  const {title, who, priority, userId, date, description} = req.body


  const todo = new Todo({
    _id: mongoose.Types.ObjectId(),
    user: userId,
    title,
    description,
    who,
    date,
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
            title: doc.text,
            description: doc.description,
            who: doc.who,
            completed: doc.completed,
            priority: doc.priority,
            date: doc.date,
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
  console.log('QUERY', req.query)
  const { date } = req.query
  const start = moment(Number(date)).startOf('day').valueOf()
  const end = moment(Number(date)).endOf('day').valueOf()
  console.log(start < date)
  console.log(date)
  console.log(end > date)

  Todo.find().where('date').gte(start).lte(end)
    .limit(30)
    .select('_id title description who user completed priority date created_at')
    .populate({path: 'user', select: '_id name avatar'})
    .exec()
    .then(docs => {
      res.status(200).json({
        todos: docs.map(doc => {
          const time = moment(doc.created_at)
          return {
            id: doc._id,
            title: doc.title,
            description: doc.description,
            who: doc.who,
            completed: doc.completed,
            priority: doc.priority,
            date: doc.date,
            createdAt: time,
            userId: doc.user._id,
            user: doc.user.name,
            avatar: doc.user.avatar
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

