const express = require('express')
const User = require('../models/user')
const router = express.Router()
const jwt = require('jsonwebtoken')
const authMiddleware = require('./auth-middleware')

// 회원 가입
router.post('/signup', async (req, res) => {
    const { userId, userPw, userPwConfirm } = req.body

    // password confirm 확인
    if (userPw !== userPwConfirm) {
        return res.status(400).send({
            errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다.'
        })
    }

    // 아이디 중복 확인
    const existUsers = await User.find({ userId })
    if (existUsers.length) {
        return res.status(400).send({
            errorMessage: '아이디가 중복됩니다.'
        })
    }

    const user = new User({ userId, userPw })
    await user.save()
    res.status(201).send({})
})

// 로그인
router.post('/auth', async (req, res) => {
    const { userId, userPw } = req.body
    
    const user = await User.findOne({ userId, userPw })

    if (!user) {
        return res.status(400).send({
            errorMessage: '아이디 또는 비밀번호를 확인해주세요.'
        })
    }

    const token = jwt.sign({ userId: user.userId }, 'wlrmadnflauswjqdms')
    res.send({ token })
})

// 로그인 정보 불러오기
router.post('/auth/me', authMiddleware, async (req, res) => {
    const { user } = res.locals
    res.send({
        userId: user[0].userId
    })
})

module.exports = router