const queryResult = (model, populate) => async (req, res, next) => {
    let requestQuery = { ...req.query }
    let query;
    let fields;
  
  
    // Remove Unwanted Qurey Parameter
    const removeQuery = ['select', 'sort', 'limit', 'page']
    removeQuery.forEach(param => delete requestQuery[param])
  
    let queryStr = JSON.stringify(requestQuery)
  
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
    requestQuery = JSON.parse(queryStr)
  
    query = model.find(requestQuery)
  
  
    // Filter Query
    if (req.query.select) {
      fields = req.query.select.split(",").join(' ')
      query.select(fields)
    }
  
    // Sort Query 
    if (req.query.sort) {
      fields = req.query.sort.split(',').join(' ')
      query.sort(fields)
    } else {
      query.sort("-createdAt")
    }
  
    // Populate
    if (populate) {
      query = query.populate(populate)
    }
  
  
    // Pagination 
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 25
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await model.countDocuments()
  
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
        page: page - 1,
        limit
      }
    }

    const data = await query

    res.queryResult = { succes: true, count: data.length, data, pagination }
    next()
}

module.exports = queryResult