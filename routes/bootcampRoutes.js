const express = require('express')
const router = express.Router()
const Bootcamp = require('../database/models/Bootcamps')
const queryResult = require('../middleware/qureyResult')

// Include other resource routers
const courseRouter = require("./courseRoutes")

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter)

// Import Controllers
const {
  getBootCamps,
  getBootCamp,
  createBootCamp,
  updateBootCamp,
  deleteBootCamp,
  bootCampPhotoUpload
} = require('../controllers/bootcamps')


// Routes without Id's
router.route("/")
  .get(queryResult(Bootcamp, "courses"), getBootCamps)
  .post(createBootCamp)

// Routes with Id's
router.route('/:id')
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp)

router.route("/:id/upload") 
  .put(bootCampPhotoUpload)


module.exports = router
