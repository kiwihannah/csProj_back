const express = require('express')
const Question = require('../models/question')
const Answer = require('../models/answer')
const router = express.Router()
const authMiddleware = require('./auth-middleware')

// 면접 질문 리스트 전체 불러오기
router.get('/questions', async (req, res) => {
  const questions = await Question.find({})

  // 각 질문 당 답변 개수 counting
  const answersPerQuestion = {}
  for (const question of questions) {
    answersPerQuestion[question._id] = 0
  }

  const answers = await Answer.find({})
  for (const answer of answers) {
    answersPerQuestion[answer.questionId]++
  }

  // 답변 개수 많은 질문 순으로 정렬
  const sortedQuestionIds = Object.entries(answersPerQuestion)
    .sort((a, b) => b[1] - a[1])
    .map((x) => x[0])

  const sortedQuestions = []
  for (const questionId of sortedQuestionIds) {
    const question = await Question.findOne({ _id: questionId })
    sortedQuestions.push(question)
  }

  res.json({ questions: sortedQuestions })
})

// 면접 질문 데이터 생성
router.post('/questions', authMiddleware, async (req, res) => {
  const userId = res.locals.user[0].userId
  const nickname = res.locals.user[0].nickname
  const { questionTitle } = req.body
  const date = new Date().toISOString().slice(0, 10)

  if (!questionTitle) {
    return res.status(400).send({
      errorMessage: '내용을 입력해주세요.',
    })
  }

  const question = new Question({ questionTitle, userId, nickname, date })
  await question.save()

  res.send({
    message: '카드가 생성되었습니다.',
  })
})

module.exports = router
