const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
<<<<<<< HEAD
  questionId: {
    type: String,
  },
  answer: {
    type: String,
  },
  author: {
    type: String,
  },
=======
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
    date: {
        type: String
    }
>>>>>>> 74a6fec416ca48b2e9810d84ebd52e744bbe0f3b
})

module.exports = mongoose.model('Answer', answerSchema)
