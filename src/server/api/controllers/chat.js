const moment = require('moment')
const nodemailer = require('nodemailer')
const {formatMessageTime} = require('./../../helpers')
const mongoose = require("mongoose")
const Message = require("../models/message")

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

exports.save_and_email = (req, res) => {
  // console.log(req.body)
  const {user, messages} = req.body
  
  const createHtml = (messages) => {
    let htmlString = ''

    messages.forEach(message => {
      htmlString += `
      <h3>${message.from}</h3>
      <p><em>${message.text}<em></p>
      <span>${message.createdAt}</span>
      `
    })
    
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
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response);
    res.status(200).json({flashMessage: 'Success'})
    }
  })
}