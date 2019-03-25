import express from 'express'
import route from './server/routes'
import logger from 'morgan'
import bodyParser from 'body-parser'

const app = express()

app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', route)
const port = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to  my SMS Management APP' })
})

app.get('*', (req, res) => {
  res
    .status(404)
    .send({ message: 'This is an unvailable route. Visit / to see all routes' })
})

app.listen(port, () => {
  console.log(`App is running on  http://localhost:${port}`)
})

export default app
