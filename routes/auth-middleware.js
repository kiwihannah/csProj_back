const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  const [tokenType, tokenValue] = authorization.split(' ')

  if (tokenType !== 'Bearer') {
    return res.status(400).send({
      errorMessage: '로그인 후 사용하세요.',
    })
  }

  try {
    const { userId } = jwt.verify(tokenValue, 'wlrmadnflauswjqdms')
    User.find({ userId }).then((user) => {
      res.locals.user = user
      next()
    })
  } catch (error) {
    return res.status(401).send({
      errorMessage: '로그인 후 사용하세요.',
    })
  }
}
