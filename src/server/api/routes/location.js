

const express = require("express")
const router = express.Router()

const LocationController = require('../controllers/location')

router.get("/all", LocationController.getLocations)
router.post("/current", LocationController.saveCurrentLocation)
module.exports = router