const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  questionTitle: {
    type: String,
  },
  author: {
    type: String,
  },
})

module.exports = mongoose.model('Question', questionSchema)
