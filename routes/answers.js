const express = require('express')
const Answer = require('../models/answer')
const router = express.Router()
const authMiddleware = require('./auth-middleware')

// 답변 카드 생성
router.post('/questions/:questionId/answers', authMiddleware, async (req, res) => {
    const { questionId } = req.params
    const author = res.locals.user[0].userId
    const { answer } = req.body

    if (!answer) {
        return res.status(400).send({
            errorMessage: '내용을 입력해주세요.'
        })
    }

    const answerToCreate = new Answer({ questionId, answer, author })
    await answerToCreate.save()
    
    res.status(201).send({
        message: '답변이 생성되었습니다.'
    })
})

// 모든 답변 카드 불러오기
router.get('/questions/:questionId/answers', async (req, res) => {
    const { questionId } = req.params
    const answers = await Answer.find({ questionId })
    res.json({ answers })
})

// 답변 카드 삭제
router.delete('/answers/:answerId', authMiddleware, async (req, res) => {
    const { answerId } = req.params
    const author = res.locals.user[0].userId
    
    try {
        await Answer.deleteOne({ _id: answerId, author })
    } catch(error) {
        return res.status(400).send({
            errorMessage: '권한이 없습니다.'
        })
    }

    res.send({
        message: '삭제가 완료되었습니다.'
    })
})


// 답변 카드 수정
router.patch('/answers/:answerId', authMiddleware, async (req, res) => {
    const { answerId } = req.params
    const author = res.locals.user[0].userId
    const { answer } = req.body

    const answerToPatch = await Answer.findOne({ _id: answerId, author })
    
    if (!answerToPatch) {
        return res.status(400).send({
            errorMessage: '권한이 없습니다.'
        })
    }
    answerToPatch.answer = answer
    await answerToPatch.save()
    res.send({
        message: '답변이 수정되었습니다.'
    })
})

module.exports = router