const express = require('express')
const User = require('../models/user')
const router = express.Router()
const jwt = require('jsonwebtoken')
const authMiddleware = require('./auth-middleware')
const bcrypt = require('bcrypt')
require('dotenv').config()

/** schema 생성
 * @swagger
 *     components:
 *         schemas:
 *             Users:
 *                 type: object
 *                 required:
 *                     - userId
 *                     - nickname
 *                     - userPw
 *                 properties:
 *                     id:
 *                         type: object
 *                         description: The auto-generated id on the User table.
 *                     userId:
 *                         type: string
 *                         description: The user id for log-in.
 *                     nickname:
 *                         type: string
 *                         description: Who wrote this post?
 *                     userPw:
 *                         type: string
 *                         description: The user pw for log-in
 */

/**
 * @swagger
 * /api/signup:
 *   post:
 *     description: sign in
 *     tags: [Users]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "userId"
 *       in: "body"
 *       description: "userId"
 *       type: "string"
 *     - name: "nickname"
 *       in: "body"
 *       description: "nickname"
 *       type: "string"
 *     - name: "userPw"
 *       in: "body"
 *       description: "userPw"
 *       type: "string"
 *     responses:
 *       "201":
 *         description: "successful operation"
 *
 */
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

/**
 * @swagger
 * /api/auth:
 *   post:
 *     description: sign in
 *     tags: [Users]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "userId"
 *       in: "body"
 *       description: "userId"
 *       type: "string"
 *     - name: "userPw"
 *       in: "body"
 *       description: "userPw"
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 */
// 로그인
router.post('/auth', async (req, res) => {
  const { userId, userPw } = req.body

  const user = await User.findOne({ userId })

  if (!user) {
    return res.status(400).send({
      errorMessage: '아이디 또는 비밀번호를 확인해주세요.',
    })
  }

  const compareUserPw = bcrypt.compareSync(userPw, user.userPw)
  console.log(compareUserPw)
  if (!compareUserPw) {
    return res.status(400).send({
      errorMessage: '아이디 또는 비밀번호를 확인해주세요.',
    })
  }

  const token = jwt.sign({ userId: user.userId }, process.env.JWT_SIGNATURE)
  res.json({ token, message: '로그인 성공!' })
})

/**
 * @swagger
 * /api/auth/me:
 *   post:
 *     description: authenticate user
 *     tags: [Users]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "user"
 *       in: "localstorage"
 *       description: "user"
 *       type: "object"
 *     responses:
 *       "200":
 *         description: "successful operation"
 */
// 로그인 정보 불러오기
router.post('/auth/me', authMiddleware, async (req, res) => {
  const { user } = res.locals
  res.send({
    userId: user[0].userId,
    nickname: user[0].nickname,
  })
})

module.exports = router
