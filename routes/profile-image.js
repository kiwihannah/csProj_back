const express = require('express')
const User = require('../models/user')
const router = express.Router()
const authMiddleware = require('./auth-middleware')
const upload = require('../modules/multer')

// 프로필 이미지 업로드
router.post('/upload', authMiddleware, upload.single('profile_image'), async (req, res) => {
    const userId = res.locals.user[0].userId
    const profileImageUrl = req.file.location

    const user = await User.findOne({ userId })
    user.profileImageUrl = profileImageUrl
    await user.save()

    res.send({})
})

// 프로필 사진 url 보내주기
router.post('/profile_image', authMiddleware, async (req, res) => {
    const userId = res.locals.user[0].userId
    const user = await User.findOne({ userId })
    const profileImageUrl = user.profileImageUrl

    res.json({ profileImageUrl })
})

module.exports = router
