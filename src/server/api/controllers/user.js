const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const User = require("../models/user")
const Room = require("../models/room")

/*
 * SIGNUP
 *
 */

exports.user_signup = (req, res, next) => {
  // Find the user with email
  const { email, password, name, room, partnerId } = req.body
  User.find({ email })
    // Return promise
    .exec()
    // then get the user
    .then(user => {
      // If there are more than 1 user
      if (user.length >= 1) {
        // Return mail exists
        return res.status(409).json({
          message: "Mail exists"
        })
        // Otherwise
      } else {
        // Hash the password
        bcrypt.hash(password, 10, (err, hash) => {
          // If error
          if (err) {
            // Handle error
            console.log('HERE!!!')
            return res.status(500).json({
              error: err
            })
            // Otherwise
          } else {
            // Create user
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email,
              name,
              password: hash,
              // req.file due to upload.single middleware
              avatar: req.file.path
            })

            // Save the user
            user
              .save()
              // Success
              .then(createdUser => {
                Room.find({name: room})
                  .exec()
                  .then((existingRooms) => {
                    if (!existingRooms.length) {
                      const chatRoom = new Room({
                        _id: new mongoose.Types.ObjectId(),
                        name: room,
                      })
      
                      chatRoom.users.push(createdUser._id)
                      if (partnerId) {
                        chatRoom.users.push(partnerId)
                      }
      
                      chatRoom.save()
                        .then((createdRoom) => {
                          user.rooms.push(createdRoom._id)
                          user.save()
                            .then(() => {
                              res.status(201).json({
                                message: "User and room created"
                              })
                            })
                        })
                    } else {
                      res.status(201).json({
                        message: "Just user created"
                      })
                    }
                    
                  })
              })
              // Catch potential errors
              .catch(err => {
                console.log(err)
                res.status(500).json({
                  error: err
                })
              })
          }
        })
      }
    })
}

/*
 * LOGIN
 *
 */
exports.user_login = (req, res, next) => {
  const {email, password} = req.body
  // Find user with provided email
  User.find({ email })
    .select('_id email password name avatar')
    .populate('rooms')
    .exec()
    // User is array of objects (just one if succesfull)
    .then(user => {
      // If there is no user
      if (user.length < 1) {
        // Return auth failed
        return res.status(401).json({
          message: "Nice try :)"
        })
      }
      // Compare provided pasword with hashed one from database
      bcrypt.compare(password, user[0].password, (err, result) => {
        // If error comparing
        if (err) {
          // Return auth failed
          return res.status(401).json({
            message: "Nice try :)"
          })
        }
        // If there is a result
        if (result) {
          console.log('USER:::', user)
          // Create token with
          const token = jwt.sign(
            // User email and id
            {
              email: user[0].email,
              userId: user[0]._id
            },
            // Secret key
            process.env.JWT_KEY,
            // And expires in time
            {
              expiresIn: "1h"
            }
          )
          // Return token
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            userId: user[0]._id,
            user: {
              id: user[0]._id,
              name: user[0].name,
              email: user[0].email,
              rooms: user[0].rooms,
              avatar: user[0].avatar.replace('public/', '')
            }
          })
        }
        // If there is no result
        res.status(401).json({
          // Return atu failed
          message: "Nice try :)"
        })
      })
    })
    // Catch server errors
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

/*
 * DELETE USER
 *
 */

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}