const mongoose = require('mongoose')
require('dotenv').config()

const connect = () => { //process.env.DB_URL
  mongoose
    .connect(process.env.DB_URL, { ignoreUndefined: true })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = connect
