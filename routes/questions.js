const express = require('express')
const Question = require('../models/question')
const Answer = require('../models/answer')
const router = express.Router()
const authMiddleware = require('./auth-middleware')

// 면접 질문 리스트 전체 불러오기
router.get('/questions', async (req, res) => {
  // 카테고리에 해당하는 질문 찾기
  const category = req.query.category
  let questions
  if (!category) {
    questions = await Question.find({})
  } else {
    questions = await Question.find({ category })
  }

  // 각 질문 당 답변 개수 counting
  const answersPerQuestion = {}
  for (const question of questions) {
    answersPerQuestion[question._id] = 0
  }

  const answers = await Answer.find({})
  for (const answer of answers) {
    if (answersPerQuestion[answer.questionId]) {
        answersPerQuestion[answer.questionId]++
    }
  }

  // 답변 개수 많은 질문 순으로 정렬 + 답변 개수가 같으면 최신 질문이 위로
  const sortedQuestionIds = Object.entries(answersPerQuestion)
    .sort((a, b) => {
        if (a[1] !== b[1]) {
            return b[1] - a[1]
        } else {
            return b[0] - a[0]
        }
        
    })
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
  let { questionTitle, category } = req.body
  const date = new Date().toISOString().slice(0, 10)
  
  if (!questionTitle) {
    return res.status(400).json({
      errorMessage: '내용을 입력해주세요.',
    })
  }

  if (!category) {
    category = null
  }

  const question = new Question({ questionTitle, userId, nickname, category, date })
  await question.save()

  res.json({
    message: '카드가 생성되었습니다.',
  })
})

module.exports = router
