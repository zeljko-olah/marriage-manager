const moment = require('moment')
const mongoose = require("mongoose")
const User = require("../models/user")
const Reminder = require('../models/reminder')


// SAVE NEW TODO
exports.saveReminder = (req, res, next) => {
  const {title, who, priority, userId, date, description} = req.body


  const reminder = new Reminder({
    _id: mongoose.Types.ObjectId(),
    user: userId,
    title,
    description,
    who,
    date,
    priority
  })

  reminder
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
      flashMessage: 'Unable to save reminder. Try again. :('
    })
  })
}

// GET LATEST REMINDERS
exports.getReminders = (req, res, next) => {
  Reminder.find()
    .limit(30)
    .select('_id title description who user completed priority date created_at')
    .populate({path: 'user', select: '_id name avatar'})
    .exec()
    .then(docs => {
      res.status(200).json({
        reminders: docs.map(doc => {
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

