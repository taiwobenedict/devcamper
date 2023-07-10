const mongoose = require('mongoose')
const color = require('colors')

const connectDB = async function () {
  await mongoose.connect("mongodb://localhost:27017/DevCamper", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log("connected to mongodb".green)

};
module.exports = connectDB;