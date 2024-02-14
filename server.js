const express = require('express')
const dotenv = require('dotenv')
const color = require('colors')
const connectDB = require('./database/db')
const morgan = require('morgan')
const errorHandler = require('./middleware/error')
const fileUpload = require("express-fileupload")
const path = require('path')

// Route Handlers
const bootcampRoutes = require('./routes/bootcampRoutes')
const courseRoutes = require('./routes/courseRoutes')
const authRoutes = require('./routes/authRoutes')

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

// Activate file upload
app.use(fileUpload())

// Static folder
app.use(express.static(`${path.join(__dirname, "public")}`))


// Mount Router
app.use('/api/v1/bootcamps', bootcampRoutes)
app.use('/api/v1/courses', courseRoutes)
app.use('/api/v1/auth', authRoutes)

// Error Handler
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

