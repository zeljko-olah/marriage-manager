const moment = require('moment')
const mongoose = require("mongoose")
const Location = require("../models/location")
const User = require("../models/user")

// SAVE CURRENT LOCATION
exports.saveCurrentLocation = (req, res, next) => {
  const {lat, lng, userId, address} = req.body

  const location = new Location({
    _id: mongoose.Types.ObjectId(),
    user: userId,
    lat,
    lng,
    address

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
            address: doc.address,
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

// Get 10 recent
exports.getLocations = (req, res, next) => {
  Location.find()
    .limit(30)
    .select('_id lat lng address user created_at')
    .populate({path: 'user', select: 'name avatar'})
    .exec()
    .then(docs => {
      res.status(200).json({
        locations: docs.map(doc => {
          const time = moment(doc.created_at)
          return {
            id: doc._id,
            lat: doc.lat,
            lng: doc.lng,
            address: doc.address,
            createdAt: time,
            user: doc.user.name,
            avatar: doc.user.avatar.replace('public/', '')
          }
        })
        .sort()
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

