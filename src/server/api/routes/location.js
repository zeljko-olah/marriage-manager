// LOCATION ROUTES

const express = require("express")
const router = express.Router()

const LocationController = require('../controllers/location')

router.get("/all", LocationController.getLocations)
router.post("/current", LocationController.saveCurrentLocation)
router.delete("/clear", LocationController.clearLocations)

module.exports = router