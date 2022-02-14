const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
  userId: {
    type: String,
  },
  nickname: {
    type: String,
  },
  userPw: {
    type: String,
  },
=======
    userId: {
        type: String
    },
    nickname: {
        type: String
    },
    userPw: {
        type: String
    },
>>>>>>> 74a6fec416ca48b2e9810d84ebd52e744bbe0f3b
})

module.exports = mongoose.model('User', userSchema)
