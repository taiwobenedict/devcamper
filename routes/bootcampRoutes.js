const express = require('express')
const router = express.Router()

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
  deleteBootCamp
} = require('../controllers/bootcamps')


// Routes without Id's
router.route("/")
  .get(getBootCamps)
  .post(createBootCamp)

// Routes with Id's
router.route('/:id')
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp)


module.exports = router
