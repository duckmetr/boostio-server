import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

let dbTasks = []

app.get('/', (_, res) => {
  res.send('hello gusi')
})

app.get('/tasks', (_, res) => {
  const tasks = dbTasks.filter(task => task.completed === false)

  res.status(200).json(tasks)
})

app.post('/orders', (req, res) => {
  const { username } = req.body
  const orders = dbTasks.filter(task => task.username === username)

  res.status(200).json(orders)
})

app.get('/profile', (_, res) => {
  res.status(200).json({})
})

app.post('/tasks/create', (req, res) => {
  const { id, username, url, likes } = req.body

  dbTasks.push({id, username, url, likes, whoLiked: [], completed: false})

  res.status(201).json({result: 'created'})
})

app.post('/tasks/like', (req, res) => {
  const { id, username } = req.body 
  const index = dbTasks.findIndex(task => task.id === id)
  
  dbTasks[index].whoLiked.includes(username) || dbTasks[index].whoLiked.push(username)
  dbTasks[index].whoLiked.length >= dbTasks[index].likes ? dbTasks[index].completed = true : null
  
  console.log(dbTasks)

  res.status(200).json({result: 'liked'})
})

// app.post('/tasks/:id/like', (req, res) => {
//   res.status(200).json({result: 'liked'})
// })

// app.post('/tasks/delete', (_, res) => {
//   res.status(200).json({result: 'deleted'})
// })

app.listen(PORT, () => console.log(`server on ${PORT}..`))