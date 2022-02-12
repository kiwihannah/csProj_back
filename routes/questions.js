const express = require('express')
const Question = require('../models/question')
const router = express.Router()
const authMiddleware = require('./auth-middleware')

// 면접 질문 리스트 전체 불러오기
router.get('/questions', async (req, res) => {
    const questions = await Question.find({})
    res.json({ questions })
})

// 면접 질문 데이터 생성
router.post('/questions', authMiddleware, async (req, res) => {
    const author = res.locals.user[0].userId
    const { questionTitle } = req.body
    
    if (!questionTitle) {
        return res.status(400).send({
            errorMessage: '내용을 입력해주세요.'
        })
    }

    const question = new Question({ questionTitle, author })
    await question.save()

    res.send({
        message: '카드가 생성되었습니다.'
    })
})

module.exports = router