const express = require('express')
const router = express.Router({ mergeParams: true})

// Import Controllers
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses')


// Routes without Id's
router.route("/")
  .get(getCourses)
  .post(addCourse)

// Routes with Id's
router.route("/:id")
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse)


module.exports = router
