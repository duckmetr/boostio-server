import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  username: String,
  mediaId: {type: String, unique: true},
  displayUrl: String,
  likes: {type: Number, min: 1, max: 1000},
  whoLiked: {type: Array, default: []},
  completed: {type: Boolean, default: false},
  createdAt: {type: Date, default: new Date()}
})

const Task = mongoose.model('tasks', taskSchema)

export default Task