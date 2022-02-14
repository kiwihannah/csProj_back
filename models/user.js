const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  nickname: {
    type: String,
  },
  userPw: {
    type: String,
  },
})

module.exports = mongoose.model('User', userSchema)
