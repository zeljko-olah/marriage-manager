const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const User = require("../models/user")

/*
 * SIGNUP
 *
 */

exports.user_signup = (req, res, next) => {
  // Find the user with email
  User.find({ email: req.body.email })
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
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          // If error
          if (err) {
            // Handle error
            return res.status(500).json({
              error: err
            })
            // Otherwise
          } else {
            // Create user
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              name: req.body.name,
              password: hash
            })

            // Save the user
            user
              .save()
              // Success
              .then(result => {
                console.log(result)
                res.status(201).json({
                  message: "User created"
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
  // Find user with provided email
  User.find({ email: req.body.email })
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
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        // If error comparing
        if (err) {
          // Return auth failed
          return res.status(401).json({
            message: "Nice try :)"
          })
        }
        // If there is a result
        if (result) {
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
              email: user[0].email
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