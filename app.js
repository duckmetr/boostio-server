import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv  from 'dotenv'

import profileRoutes from './routes/profile.js'
import tasksRoutes from './routes/tasks.js'
import ordersRoutes from './routes/orders.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const CONNECTION_URI = process.env.CONNECTION_URI

app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

app.use('/profile', profileRoutes)
app.use('/tasks', tasksRoutes)
app.use('/orders', ordersRoutes)

app.get('/', (_, res) => res.send('hello gusi'))

mongoose.connect(CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() => app.listen(PORT, () => console.log(`server is runing on http://localhost:${PORT}`)))
  .catch((error) => console.log(error.message))