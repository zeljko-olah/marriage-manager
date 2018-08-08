const moment = require('moment')
const nodemailer = require('nodemailer')
const {formatMessageTime} = require('./../../helpers')
const mongoose = require("mongoose")
const Message = require("../models/message")

// SAVE NEW MESSAGE
exports.new_message = (req, res, next) => {
  const { text, userId } = req.body.message
  const message = new Message({
    _id: mongoose.Types.ObjectId(),
    text: text,
    user: userId
  })

  message
    .save()
    .then(result => {
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

// GET ALL MESSAGES
exports.get_messages = (req, res) => {
  Message.find()
    .select('_id text read created_at ')
    .populate('user', 'name')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        messages: docs.map(doc => {
          const time = formatMessageTime(doc.created_at)

          return {
            id: doc._id,
            text: doc.text,
            read: doc.read,
            createdAt: time,
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
    service: 'mail',
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