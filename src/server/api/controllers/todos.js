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
            title: doc.title,
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
  const { date } = req.query
  const start = moment(Number(date)).startOf('day').valueOf()
  const end = moment(Number(date)).endOf('day').valueOf()
  const yesterday = moment(Number(date)).startOf('day').add(-1, 'days').valueOf()

  Todo.find().where('date').lte(start).gte(yesterday)
    .exec()
    .then((todos) => {
      const active = todos.filter(t => t.completed === 'active')
      console.log('ACTIVE', active)

      if (active.length) {
        active.forEach(a => {
          console.log('AAA:::', a)
        Todo.findByIdAndUpdate(a._id, { $set: { completed: 'failed' }}).exec()
      })        
      }
    })

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

exports.updateTodoStatus = (req, res, next) => {
  console.log('REQ.BODY:::', req.body)
  const { id, status } = req.body

  Todo.update({ _id: id }, { $set: {completed: status} })
    .exec()
    .then(doc => {
      console.log(doc)
      res.status(200).json({
        type: 'success',
        flashMessage: `${status === 'failed' ? 'Ooops':'Great'}. Task is now ${status}`
      })
    })
    .catch(err => {
      res.status(500).json({
        type: 'error',
        flashMessage: 'Something went wrong'
      })
    })
}

exports.renewTodo = (req, res, next) => {
  console.log('REQ.BODY:::', req.body)
  const { id, date } = req.body
  const now = moment().valueOf()

  // Todo.update({ _id: id }, { $set: {date: now} })
  Todo.findById(id)
  .exec()
  .then(doc => {
    console.log('DOC', doc)
    const clone = doc
    clone._id = mongoose.Types.ObjectId()
    clone.isNew = true
    clone.date = now
    clone.completed = 'active'

    clone
      .save()
      .then(clonedTodo => {
        console.log('CLONE:::', clonedTodo)
        res.status(200).json({
          type: 'success',
          flashMessage: 'Great. Todo renewed'
        })
      })
      .catch(err => {
        console.log('ERR', err)
      })
  })
  .catch(err => {
    res.status(500).json({
      type: 'error',
      flashMessage: 'Something went wrong'
    })
  })
}

exports.editTodoTitle = (req, res, next) => {
  console.log('REQ.BODY:::', req.body)
  const { id, title } = req.body

  Todo.update({ _id: id }, { $set: {title: title} })
  .exec()
  .then(doc => {
    console.log('DOC', doc)
    res.status(200).json({
      type: 'success',
      flashMessage: 'Great. Todo title edited'
    })
  })
  .catch(err => {
    res.status(500).json({
      type: 'error',
      flashMessage: 'Something went wrong'
    })
  })
}

exports.deleteTodo = (req, res, next) => {
  const { id } = req.query

  Todo.deleteOne({ _id: id })
    .exec()
    .then(doc => {
      console.log(doc)
      res.status(200).json({
        type: 'success',
        flashMessage: 'Great. Todo deleted'
      })
    })
    .catch(err => {
      res.status(500).json({
        type: 'error',
        flashMessage: 'Something went wrong'
      })
    })
}

