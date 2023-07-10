const express = require('express')
const router = express.Router()

// Import Views
const {
  getBootCamps,
  getBootCamp,
  createBootCamp,
  updateBootCamp,
  deleteBootCamp
} = require('../views/bootcamps')


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
