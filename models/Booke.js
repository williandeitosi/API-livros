const mongoose = require("mongoose")

const bookeSchema = new mongoose.Schema({
  title:{type: String, unique: true},
  author: String,
  yearOfPublication: Number,
})



module.exports = mongoose.model("booke", bookeSchema)