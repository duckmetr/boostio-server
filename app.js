import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

let tasks = []
const profile = {
  name: '🐺👆',
  username: 'auf.6.9',
  avatar: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/fantastic-mr-fox-wolf-teassa-herdian.jpg'
}

app.get('/', (_, res) => {
  res.send('hello gusi')
})

app.get('/tasks', (_, res) => {
  res.status(200).json(tasks)
})

app.get('/orders', (req, res) => {
  const { username } = req.body

  const orders = tasks.filter(task => task.username === username)

  res.status(200).json(orders)
})

app.get('/profile', (_, res) => {
  res.status(200).json(profile)
})

app.post('/tasks/create', (req, res) => {
  console.log(req.body)
  const { id, username, url, likes } = req.body

  tasks.push({id, username, url, likes})

  res.status(201).json({result: 'created', tasks})
})

app.post('/tasks/:id/like', (req, res) => {
  res.status(200).json({result: 'liked'})
})

app.post('/tasks/like', (req, res) => {
  res.status(200).json({result: 'liked'})
})

app.delete('/tasks/delete', (req, res) => {
  res.status(200).json({result: 'deleted'})
})

app.listen(PORT, () => console.log(`server on ${PORT}..`))