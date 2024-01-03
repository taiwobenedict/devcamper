const moongose = require('mongoose')

const CourseSchema = new moongose.Schema({
    title: {
        type: String,
        require: [true, "Please add a course title"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please add  description"]
    },
    weeks: {
        type: String,
        required: [true, "Please add  number of weeks"]
    },
    tuition: {
        type: String,
        required: [true, "Please add a tuition cost"]
    },
    minimumSkill: {
        type: String,
        required: [true, "Please add a minimum skill"],
        enum: ['beginner', "intermediate", 'advanced']
    },
    scholarhipsAvailable: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // Creating Many Courses to One Bootcamp Relationship
    bootcamp: {
        type: moongose.Schema.ObjectId,
        ref: "Bootcamp",
        require: true
    }
})

module.exports = moongose.model("Courses", CourseSchema)