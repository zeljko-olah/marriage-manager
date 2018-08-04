const moment = require('moment')
const mongoose = require("mongoose")
const Message = require("../models/message")

exports.new_message = (req, res, next) => {
  console.log('REQ.BODY:::', req.body)
  const { text, userId } = req.body.message
  console.log('TEXT', text)
  console.log('USERID', userId)
  const message = new Message({
    _id: mongoose.Types.ObjectId(),
    text: text,
    user: userId
  })

  message
    .save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'Message saved'
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

exports.get_messages = (req, res) => {
  Message.find()
    .select('_id text read created_at ')
    .populate('user', 'name')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        messages: docs.map(doc => {
          const formatedTime = moment(doc.created_at).format('h:mm a')

          return {
            id: doc._id,
            text: doc.text,
            read: doc.read,
            createdAt: formatedTime,
            from: doc.user.name,
            user: doc.user
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
