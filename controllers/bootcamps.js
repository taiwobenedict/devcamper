const Bootcamp = require("../database/models/Bootcamps");
const asyncHandler = require("../middleware/aysnc");

// decription: Get all Bootcamps
// GET: api/v1/bootcamps/
// access: Public

exports.getBootCamps = asyncHandler(async (req, res) => {

  let requestQuery = {...req.query}
  let query;
  let fields;
  
  
  // Remove Unwanted Qurey Parameter
  const removeQuery = ['select', 'sort', 'limit', 'page']
  removeQuery.forEach(param => delete requestQuery[param])
  
  let queryStr = JSON.stringify(requestQuery)
  
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match =>`$${match}`)
  requestQuery = JSON.parse(queryStr)
  
  query = Bootcamp.find(requestQuery).populate("courses")
  

  // Filter Query
  if (req.query.select) {
    fields = req.query.select.split(",").join(' ')
    query.select( fields)
  }

  // Sort Query 
  if (req.query.sort) {
    fields = req.query.sort.split(',').join(' ')
    query.sort(fields)
  } else {
    query.sort("-createdAt")
  }


  
  // Pagination 
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 25
  const startIndex = (page-1) * limit
  const endIndex = page * limit
  const total = await Bootcamp.countDocuments()
  
  query.skip(startIndex).limit(limit)

  // Pagination result
  const pagination = {}
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page -1,
      limit
    }
  }
  
  const data = await query

  res.status(200).json({ succes: true, count: data.length, data, pagination });
});

// decription: Get single Bootcamp
// GET: api/v1/bootcamp/id/
exports.getBootCamp = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  res.status(200).json({ succes: true, data: bootcamp });
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
