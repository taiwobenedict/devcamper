const BootcampModel = require("../database/models/Bootcamps");



// decription: Get all Bootcamps
// GET: api/v1/bootcamps/
exports.getBootCamps = async (req, res) => {
  try {
    const data = await BootcampModel.find()
    
    res
      .status(200)
      .json({succes: true, count: BootcampModel.length, data})

  } catch (err) {
  
    res
      .status(400)
      .json({succes: false, msg: err.message})
    
  }
    
};

// decription: Get single Bootcamp
// GET: api/v1/bootcamp/id/
exports.getBootCamp = async (req, res) => {

  try {
    const bootcamp = await BootcampModel.findById(req.params.id)
    res
     .status(200)
     .json({succes: true, data: bootcamp})

  } catch (err) {
    
    res
      .status(400)
      .json({succes: false, msg: err.message})
    
  }
}

// decription: Create Bootcamp
// POST: api/v1/bootcamps/
exports.createBootCamp = async (req, res) => {
  try {
    const body = await BootcampModel.create(req.body)
     res
      .status(201)
      .json({succes: true, data: body})

  } catch (err) {
     res
      .status(400)
      .json({succes: false, msg: err.message})
    
  }
}


// decription: Update Bootcamp
// PUT: api/v1/bootcamps/id/
exports.updateBootCamp = async (req, res) => {
   
  try {
    const bootcamp = await BootcampModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    res
     .status(200)
     .json({succes: true, data: bootcamp})

  } catch (err) {
    
    res
      .status(400)
      .json({succes: false, msg: err.message})
    
  }
}

// decription: Delete Bootcamp
// DELETE: api/v1/bootcamps/id
exports.deleteBootCamp = async (req, res) => {

  try {
    await BootcampModel.findByIdAndDelete(req.params.id)
    res
     .status(200)
     .json({succes: true, data: {}})

  } catch (err) {
    
    res
      .status(400)
      .json({succes: false, msg: err.message})
    
  }
}