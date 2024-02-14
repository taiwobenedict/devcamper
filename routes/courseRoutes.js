const express = require('express')
const router = express.Router({ mergeParams: true})
const course = require('../database/models/Courses')

// Import Controllers
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses')

// Import Advance query
const advanceQuery = require('../middleware/qureyResult')


// Routes without Id's
router.route("/")
  .get(advanceQuery(course, {
    path: "bootcamp",
    select: "name description"

}), getCourses)
  .post(addCourse)

// Routes with Id's
router.route("/:id")
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse)


module.exports = router
