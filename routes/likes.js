const express = require('express')
const Like = require('../models/like')
const router = express.Router()
const authMiddleware = require('./auth-middleware')

/** schema 생성
 * @swagger
 *     components:
 *         schemas:
 *             Likes:
 *                 type: object
 *                 required:
 *                     - answerId
 *                     - userId
 *                 properties:
 *                     id:
 *                         type: object
 *                         description: The auto-generated id of the Likes table.
 *                     answerId:
 *                         type: string
 *                         description: answer it self
 *                     userId:
 *                         type: string
 *                         description: user id
 */

/**
 * @swagger
 * /api/answers/:answerId/likes:
 *   post:
 *     description: like answer
 *     tags: [Likes]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "answerId"
 *       in: "params"
 *       description: "answerId"
 *       type: "string"
 *     responses:
 *       "201":
 *         description: "successful operation"
 */
// 답변 카드 좋아요
router.post('/answers/:answerId/likes', authMiddleware, async (req, res) => {
  const { answerId } = req.params
  const userId = res.locals.user[0].userId

  // 이미 좋아요한 경우
  const existLike = await Like.findOne({ answerId, userId })
  if (existLike) {
    return res.status(400).json({
      errorMessage: '이 답변에 이미 좋아요 했습니다.',
    })
  }

  const like = new Like({ answerId, userId })
  await like.save()
  res.send({})
})

/**
 * @swagger
 * /api/answers/:answerId/likes:
 *   delete:
 *     description: candel like answer
 *     tags: [Likes]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "answerId"
 *       in: "params"
 *       description: "answerId"
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 */
// 답변 카드 좋아요 취소
router.delete('/answers/:answerId/likes', authMiddleware, async (req, res) => {
  const { answerId } = req.params
  const userId = res.locals.user[0].userId

  await Like.deleteOne({ answerId, userId })
  res.send({})
})

/**
 * @swagger
 * /api/answers/:answerId/likes:
 *   get:
 *     description: show likes of answer
 *     tags: [Likes]
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "answerId"
 *       in: "params"
 *       description: "answerId"
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 */
// 답변 카드 별 좋아요 수 불러오기
router.get('/answers/:answerId/likes', async (req, res) => {
  const { answerId } = req.params

  const likes = await Like.find({ answerId })

  const countLikes = likes.length

  res.json({ countLikes })
})

module.exports = router
