const moment = require('moment')
const mongoose = require("mongoose")
const Location = require("../models/location")
const User = require("../models/user")

// SAVE CURRENT LOCATION
exports.saveCurrentLocation = (req, res, next) => {
  console.log('REQ.BODY:::', req.body.lat)
  const {lat, lng, userId} = req.body

  const location = new Location({
    _id: mongoose.Types.ObjectId(),
    user: userId,
    lat,
    lng

  })

  location
    .save()
    .then(doc => {
      const id = doc.user
      User.findById( id, 'name')
        .exec()
        .then(user => {
          res.status(201).json({
            id: doc._id,
            lat: doc.lat,
            lng: doc.lng,
            from: user.name,
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

exports.getLocations = (req, res, next) => {
  Location.find()
    .select('_id lat lng user created_at')
    .populate({path: 'user', select: 'name avatar'})
    .exec()
    .then(docs => {
      res.status(200).json({
        locations: docs.map(doc => {
          const time = moment(doc.created_at).format('h:mm a, MMM Do')
          return {
            id: doc._id,
            lat: doc.lat,
            lng: doc.lng,
            createdAt: time,
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

