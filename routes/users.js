const express = require('express')
const User = require('../models/user')
const router = express.Router()
const jwt = require('jsonwebtoken')
const authMiddleware = require('./auth-middleware')
const bcrypt = require('bcrypt')

// 회원 가입
router.post('/signup', async (req, res) => {
  const { userId, nickname, userPw, userPwConfirm } = req.body

  // password confirm 확인
  if (userPw !== userPwConfirm) {
    return res.status(400).json({
      errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다.',
    })
  }

  // 아이디 중복 확인
  const existUsers = await User.find({ userId })
  if (existUsers.length) {
    return res.status(400).json({
      errorMessage: '아이디가 중복됩니다.',
    })
  }

  const encryptedUserPw = bcrypt.hashSync(userPw, 10)

  const user = new User({ userId, nickname, userPw: encryptedUserPw })
  await user.save()
  res.status(201).json({
    message: '회원 가입 완료!',
  })
})

// 로그인
router.post('/auth', async (req, res) => {
  const { userId, userPw } = req.body

  const user = await User.findOne({ userId })

  if (!user) {
    return res.status(400).json({
      errorMessage: '아이디 또는 비밀번호를 확인해주세요.',
    })
  }

  const compareUserPw = bcrypt.compareSync(userPw, user.userPw)
  console.log(compareUserPw)
  if (!compareUserPw) {
    return res.status(400).json({
      errorMessage: '아이디 또는 비밀번호를 확인해주세요.',
    })
  }

  const token = jwt.sign({ userId: user.userId }, 'wlrmadnflauswjqdms')
  res.json({ token })
})

// 로그인 정보 불러오기
router.post('/auth/me', authMiddleware, async (req, res) => {
  const { user } = res.locals
  res.json({
    userId: user[0].userId,
    nickname: user[0].nickname,
  })
})

module.exports = router
