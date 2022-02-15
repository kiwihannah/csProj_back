const mongoose = require('mongoose')
// require('dotenv').config()

const connect = () => {
  mongoose
    .connect(
      'mongodb://test:test@3.35.169.150:27017/cheat-sheet?authSource=admin',
      { ignoreUndefined: true }
    )
    .catch((err) => {
      console.log(err)
    })
}

module.exports = connect
