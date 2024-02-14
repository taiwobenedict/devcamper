const path = require('path')
const Bootcamp = require("../database/models/Bootcamps");
const asyncHandler = require("../middleware/aysnc");

// decription: Get all Bootcamps
// GET: api/v1/bootcamps/
// access: Public

exports.getBootCamps = asyncHandler(async (req, res) => {
  res.status(200).json(res.queryResult);
});

// decription: Get single Bootcamp
// GET: api/v1/bootcamp/id/
exports.getBootCamp = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  res.status(200).json({ success: true, data: bootcamp });
});

// decription: Create Bootcamp
// POST: api/v1/bootcamps/
exports.createBootCamp = asyncHandler(async (req, res) => {
  const body = await Bootcamp.create(req.body);
  res.status(201).json({ succes: true, data: body });
});

// decription: Update Bootcamp
// PUT: api/v1/bootcamps/id/ 
exports.updateBootCamp = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ succes: true, data: bootcamp });
});

// decription: Delete Bootcamp
// DELETE: api/v1/bootcamps/id
exports.deleteBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)
  if (!bootcamp) {
    const error = new Error(`Bootcamp not found for this id: ${req.params.id}`);
    error.statusCode = 404;
    return next(error);
  }
  bootcamp.remove();
  res.status(200).json({ succes: true, data: {} });
});

// decription: Upload Bootcamp Photo
// DELETE: api/v1/bootcamps/id
exports.bootCampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)
  if (!bootcamp) {
    const error = new Error(`Bootcamp not found for this id: ${req.params.id}`);
    error.statusCode = 404;
    return next(error);
  }

  if (!req.files) {
    const error = new Error("Please upload a photo");
    error.statusCode = 400;
    return next(error);
  }
  let file = req.files.file

  // Check if the file is a photo
  if (!file.mimetype.startsWith("image")) {
    const error = new Error("Please upload an image file");
    error.statusCode = 400;
    return next(error);
  }

  // Set custome file name
  file.name = `photo_${req.params.id}${path.extname(file.name)}`

  // Check File size

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    const error = new Error(`Please upload a photo less than ${process.env.MAX_FILE_UPLOAD} bits`);
    error.statusCode = 400;
    return next(error);
  }

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.log(err)
      const error = new Error(`Photo fail to upload`);
      error.statusCode = 400;
      return next(error)
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name})

    res.status(200).json({succes: true, photo: file.name})
  })


});
