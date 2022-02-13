const express = require('express')
const connect = require('./models')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const router = express.Router()

const usersRouter = require('./routes/users')
const questionsRouter = require('./routes/questions')
const answersRouter = require('./routes/answers')
const likesRouter = require('./routes/likes')

const port = 3000
connect()

app.use(cors())

router.get('/', (req, res) => {
    res.send('3조 서버 오픈 테스트')
})

app.use('/api', bodyParser.json(), [router, usersRouter, questionsRouter, answersRouter, likesRouter])
// app.use(express.static("./assets"));

const myLogger = function (req, res, next) {
    console.log(
        new Date().toLocaleTimeString(),
        '| Request URL:',
        req.originalUrl
    )
    next()
}
app.use(myLogger)

app.listen(port, () => {
    console.log(
        new Date().toLocaleTimeString(),
        '|',
        port,
        ': server has been connected'
    )
})
