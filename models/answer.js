const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  questionId: {
    type: String,
  },
  answer: {
    type: String,
  },
  userId: {
    type: String,
  },
  nickname: {
    type: String,
  },
  date: {},
})

module.exports = mongoose.model('Answer', answerSchema)
