const Course = require("../database/models/Courses");
const Bootcamp = require("../database/models/Bootcamps")
const asyncHandler = require("../middleware/aysnc");

// decription: Get all Courses
// GET: api/v1/courses/
// GET: api/v1/bootcamps/:bootcampId/courses
// access: Public
exports.getCourses = asyncHandler(async (req, res) => {


    // Get all the courses specific to a bootcamp
    if (req.params.bootcampId) {
        const courses = await Course.find({ bootcamp: req.params.bootcampId }).populate({
            path: "bootcamp",
            select: "name description"

        })

        return res.status(200).json({success:true, count: courses.length, data: courses})

        // Get all the courses
    } else {
        res.status(200).json(res.queryResult)

    }



})


// decription: Get single Course
// GET: api/v1/courses/:id
// access: Public
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: "bootcamp",
        select: "name description"
    });

    if (!course) {
        const error = new Error(`No Bootcamp for this ID: ${req.params.id}`)
        error.statusCode = 404
        return next(error)
    }
    res.status(400).json({ success: true, data: course })

})


// decription: add single Course
// POST: api/v1/bootcamps/:bootcampId/courses
// access: Private
exports.addCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId

    // Check if bootcamp exist
    const bootcamp = await Bootcamp.findById(req.params.bootcampId)
    if (!bootcamp) {
        const error = new Error(`No Bootcamp for this ID: ${req.params.bootcampId}`)
        error.statusCode = 404
        return next(error)
    }

    const course = await Course.create(req.body)
    res.status(201).json({ success: true, data: course })
})




// decription: Update Course
// POST: api/v1/courses/:courseId
// access: Private
exports.updateCourse = asyncHandler(async (req, res, next) => {

    // Check if course exist
    let course = await Course.findById(req.params.id)
    if (!course) {
        const error = new Error(`No Course for this ID: ${req.params.id}`)
        error.statusCode = 404
        return next(error)
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({ success: true, data: course})
})


// decription: Delete Course
// POST: api/v1/courses/:courseId
// access: Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {

    // Check if course exist
    let course = await Course.findById(req.params.id)
    if (!course) {
        const error = new Error(`No Course for this ID: ${req.params.id}`)
        error.statusCode = 404
        return next(error)
    }
    course.remove()
    res.status(200).json({ success: true, data: {}})
})

