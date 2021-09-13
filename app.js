import './dotenv.js'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import auth from './middleware/auth.js'

import userRoutes from './routes/user.js'
import tasksRoutes from './routes/tasks.js'
import ordersRoutes from './routes/orders.js'

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_OPTIONS = {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}

app.disable('x-powered-by')

app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

app.use((req, res, next) => {
  console.log('TIME:', Date.now())
  next()
})

app.use('/tasks', auth, tasksRoutes)
app.use('/orders', auth, ordersRoutes)
app.use('/user', userRoutes)

app.get('/', (_, res) => res.status(200).send('hello gusi'))

init()

async function init() {
  try {
    await mongoose.connect(MONGODB_URI, MONGODB_OPTIONS)
    app.listen(PORT, () => console.log(`server started on ${PORT}`))
  } catch (error) {
    console.error(error.message)
  }
}
