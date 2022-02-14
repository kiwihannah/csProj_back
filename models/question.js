const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
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
})

module.exports = mongoose.model('Question', questionSchema)
