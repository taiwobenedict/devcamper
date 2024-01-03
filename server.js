const express = require('express')
const bootcampRoutes = require('./routes/bootcampRoutes')
const courseRoutes = require('./routes/courseRoutes')
const dotenv = require('dotenv')
const color = require('colors')
const connectDB = require('./database/db')
const morgan = require('morgan')
const errorHandler = require('./middleware/error')
// Initializing Express
const app = express()

// Load data from Environment
dotenv.config({path: "./env/config.env"})


const PORT = process.env.PORT || 5000 



// Initializing Database
connectDB()

// Use Morgan
app.use(morgan("dev"))

// Activate body parser
app.use(express.json())

// Mount Router
app.use('/api/v1/bootcamps', bootcampRoutes)
app.use('/api/v1/courses', courseRoutes)
app.use(errorHandler)

// Liten to Port
app.listen(
  PORT,
  console.log(`Running server on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)

// Handle unhandled Rejections/Promises
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`.red)
})

