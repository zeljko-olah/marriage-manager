const moment = require('moment')
const nodemailer = require('nodemailer')
const {formatMessageTime} = require('./../../helpers')
const mongoose = require("mongoose")
const Message = require("../models/message")
const User = require("../models/user")

// SAVE NEW MESSAGE
exports.new_message = (req, res, next) => {
  console.log('REQ.BODY:::', req.body)
  const { text, userId, unread, important } = req.body.message
  const message = new Message({
    _id: mongoose.Types.ObjectId(),
    text: text,
    user: userId,
    room: 'love',
    unread: unread,
    important: important

  })

  message
    .save()
    .then(doc => {
      const id = doc.user
      User.findById( id, 'name')
        .exec()
        .then(user => {
          console.log('USER', user)
          res.status(201).json({
            id: doc._id,
            from: user.name,
            text: doc.text,
            room: 'love',
            unread: doc.unread,
            important: doc.important,
            createdAt: doc.created_at
          })
        })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

// GET ALL MESSAGES
exports.get_messages = (req, res) => {

  Message.find()
    .select('_id text read created_at unread important')
    .populate('user', 'name')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        messages: docs.map(doc => {
          const time = formatMessageTime(doc.created_at)
          console.log('DOC', doc)

          return {
            id: doc._id,
            text: doc.text,
            createdAt: time,
            unread: doc.unread,
            important: doc.important,
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

// EMAIL CHAT HISTORY TO USER EMAIL
exports.email_chat_history = (req, res) => {
  const {user, messages} = req.body
  
  const createHtml = (messages) => {
    let htmlString = '<div style="text-align: center;"><h1>Chat History</h1>'

    messages.forEach(message => {
      htmlString += `
      <p style="color: #555;">
        <strong>
          ${message.from} ---
        </strong> 
        <span style="font-size: 10px; color: #aaa;">${message.createdAt}</span>
      </p>
      <p style="font-size: 12px;"><em>${message.text}<em></p>
      `
    }) 
    htmlString += '</div>' 
    return htmlString
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zeljko.web.developer@gmail.com',
      pass: 'Allah397'
    }
  })

  var mailOptions = {
    from: 'zeljko.web.developer@gmail.com',
    to: user.email,
    subject: `Chat history from ${moment().format('MMM Do YYYY')}`,
    html: createHtml(messages)
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.status(500).json({
        type: 'error',
        flashMessage: 'Unable to send email. Try again later. :('
      })
    } else {
      console.log('Email sent: ' + info.response)
    res.status(200).json({
      type: 'success',
      flashMessage: 'Success. Check your email. :)'
    })
    }
  })
}

// DELETE CHAT HISTORY
exports.delete_chat_history = (req, res) => {
  const {room} = req.query

  Message.deleteMany({ room: room })
    .exec()
    .then(response => {
      console.log(response.n)
      if (response.n === 0) {
        res.status(200).json({
          type: 'success',
          flashMessage: 'Nothing to delete! :)'
        })
        return
      }
      let word = response.n === 1 ? 'message' : 'messages'
      res.status(200).json({
        type: 'success',
        flashMessage: `Success. Deleted ${response.n} ${word}. :)`
      })
    })
    .catch(() => {
      res.status(500).json({
        type: 'error',
        flashMessage: 'Unable to delete history. Try again later. :('
      })
    })
}

exports.mark_as_read = (req, res) => {
  console.log(req.body)
  const ids = req.body

  ids.forEach((id) => {
    Message.update({ _id: id }, { $set: { unread: false }})
    .exec()
    .then(() => {
      res.status(200).json({
        type: 'success',
        flashMessage: `Marked as read :)`
      })
    })
    .catch(err => {
      res.status(200).json({
        type: 'error',
        flashMessage: `Something went wrong :)`
      })
    })
  })
}

