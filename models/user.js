const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    userPw: {
        type: String
    },
})

module.exports = mongoose.model('User', userSchema)