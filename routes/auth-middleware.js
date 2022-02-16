const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config()

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  const [tokenType, tokenValue] = authorization.split(' ')

  if (tokenType !== 'Bearer') {
    return res.status(400).json({
      errorMessage: '로그인 후 사용하세요.',
    })
  }

  //process.env.JWT_SIGNATURE
  try {
    const { userId } = jwt.verify(tokenValue, "hannah123")
    User.find({ userId }).then((user) => {
      res.locals.user = user
      next()
    })
  } catch (error) {
    return res.status(401).json({
      errorMessage: '로그인 후 사용하세요.',
    })
  }
}
