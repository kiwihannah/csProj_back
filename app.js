const express = require('express')
const connect = require('./models')
const bodyParser = require('body-parser')
const cors = require('cors')
const { swaggerUi, specs } = require('./swagger');

const app = express()
const router = express.Router()

const usersRouter = require('./routes/users')
const questionsRouter = require('./routes/questions')
const answersRouter = require('./routes/answers')
const likesRouter = require('./routes/likes')
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

app.use(
  // url -> localhost/swagger
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
)

const port = process.env.PORT
connect()

app.use(cors())
// 리액트 배포 이후 아래처럼 origin 적어줄 것 (보안 강화)
// app.use(cors({ origin: 허용 오리진 주소 }))

router.get('/', (req, res) => {
  res.send('3조 서버 오픈 테스트')
})

app.use('/api', bodyParser.json(), [
  router,
  usersRouter,
  questionsRouter,
  answersRouter,
])
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
