const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
<<<<<<< HEAD
  questionTitle: {
    type: String,
  },
  author: {
    type: String,
  },
=======
    questionTitle: {
        type: String
    },
    userId: {
        type: String
    },
    nickname: {
        type: String
    },
    date: {
        type: String
    }
>>>>>>> 74a6fec416ca48b2e9810d84ebd52e744bbe0f3b
})

module.exports = mongoose.model('Question', questionSchema)
