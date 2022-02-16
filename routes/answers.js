const express = require('express')
const Answer = require('../models/answer')
const Like = require('../models/like')
const router = express.Router()
const authMiddleware = require('./auth-middleware')

// 답변 카드 생성
router.post(
  '/questions/:questionId/answers',
  authMiddleware,
  async (req, res) => {
    const { questionId } = req.params
    const userId = res.locals.user[0].userId
    const nickname = res.locals.user[0].nickname
    const { answer } = req.body
    const date = new Date()

    if (!answer) {
      return res.status(400).json({
        errorMessage: '내용을 입력해주세요.',
      })
    }

    const answerToCreate = new Answer({
      questionId,
      answer,
      userId,
      nickname,
      date,
    })
    await answerToCreate.save()

    res.status(201).json({
      message: '답변이 생성되었습니다.',
    })
  }
)

// 모든 답변 카드 불러오기
router.get('/questions/:questionId/answers', async (req, res) => {
  const { questionId } = req.params
  const answers = await Answer.find({ questionId })

  // 각 답변 당 좋아요 개수 counting
  const likesPerAnswer = {}
  for (const answer of answers) {
    likesPerAnswer[answer._id] = 0
  }

  const likes = await Like.find({})
  for (const like of likes) {
    if (likesPerAnswer[like.answerId]) {
        likesPerAnswer[like.answerId]++
    }
  }

  // 좋아요 개수 많은 답변 순으로 정렬
  const sortedAnswerIds = Object.entries(likesPerAnswer)
    .sort((a, b) => b[1] - a[1])
    .map((x) => x[0])

  const sortedAnswers = []
  for (const answerId of sortedAnswerIds) {
    const answer = await Answer.findOne({ _id: answerId })
    const date = answer.date
    answer.date = timeFromNow(date)
    sortedAnswers.push(answer)
  }

  res.json({ answers: sortedAnswers })
})

// 답변 카드 삭제
router.delete('/answers/:answerId', authMiddleware, async (req, res) => {
  const { answerId } = req.params
  const author = res.locals.user[0].userId

  try {
    await Answer.deleteOne({ _id: answerId, author })
  } catch (error) {
    return res.status(400).json({
      errorMessage: '권한이 없습니다.',
    })
  }

  res.json({
    message: '삭제가 완료되었습니다.',
  })
})

// 답변 카드 수정
router.patch('/answers/:answerId', authMiddleware, async (req, res) => {
  const { answerId } = req.params
  const author = res.locals.user[0].userId
  const { answer } = req.body

  const answerToPatch = await Answer.findOne({ _id: answerId, author })

  if (!answerToPatch) {
    return res.status(400).json({
      errorMessage: '권한이 없습니다.',
    })
  }
  answerToPatch.answer = answer
  await answerToPatch.save()
  res.json({
    message: '답변이 수정되었습니다.',
  })
})

module.exports = router
