const mongoose = require("mongoose");
const slugify = require("slugify")


const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },

  slug: String,

  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description can not be more than 500 characters"],
  },

  wesite: {
    type: String,
    match: [/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, "Please use a valid URL with HTTP or HTTPS" ]
  },

  phone: {
    type: String,
    maxlenth: [20, "Phone nuber can not be longer than 20 characters"]
  },
  
  email: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"]
  },

  address: {
    type: String,
    required: [true, "Please add an address"]
  },
  
  careers: {
    // Array of string
    type: [String],
    required: true,  
    enum: [
      'Web Development',
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other"
    ]
  },

  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must can not be more than 10"],
  },
  
  averageCost: Number,
  
  photo: {
    type: String,
    default: "no-photo.jpg"
  },
  housing: {
    type: Boolean,
    default: false
  },
  jobAssistance: {
    type: Boolean,
    deafult: false
  },
  jobGuarantees: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});


// Create slug field
BootcampSchema.pre("save", function(next) {
  this.slug = slugify(this.name, {lower: true})
  next()
})

// Reverse populate with virtuals
BootcampSchema.virtual("courses", {
  ref: "Courses",
  localField: "_id",
  foreignField: "bootcamp",
  justOne: false,
})

// Cascade delete Courses when a bootcamp is deleted
BootcampSchema.pre("remove", async function(next) {
  await this.model("Courses").deleteMany({bootcamp: this._id})
  next()
})



module.exports = mongoose.model('Bootcamp', BootcampSchema)