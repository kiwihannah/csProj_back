const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    answerId: {
        type: String
    },
    userId: {
        type: String
    },
})

module.exports = mongoose.model('Like', likeSchema)