

const express = require("express")
const router = express.Router()

const multer = require('multer')

// Multer storage
const storage = multer.diskStorage({
  // Folder destination
  destination: function(req, file, cb) {
    cb(null, './public/uploads/users')
  },
  // Filename define
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

// Multer file filter
const fileFilter = (req, file, cb) => {
  // Accept jpeg and png files
  if (file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    // Reject a file without error
    cb(null, false);
  }
}

// Upload object gives us a couple of middlewares to use inside the route handler
const upload = multer({
  // Define storage folder
  storage: storage,
  // Limit file size
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  // Filter files by type
  fileFilter: fileFilter
});

const UserController = require('../controllers/user')
const checkAuth = require('../middleware/check-auth')

// Multer Uploader middleware - Upload.single
router.post("/signup", upload.single('avatar'), UserController.user_signup)

router.post("/login", UserController.user_login)

router.delete("/:userId", checkAuth, UserController.user_delete)

module.exports = router
