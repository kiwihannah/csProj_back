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
    date: {
        type: String
    }
})

module.exports = mongoose.model('Answer', answerSchema)
