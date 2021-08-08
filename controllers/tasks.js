import Task from '../models/tasks.js'

export async function fetchTasks(req, res) {
  const { username } = req.body
  const LIMIT = 20

  try {
    const tasks = await Task.find({ username: { $ne: username }, whoLiked: { $ne: username }, completed: false }).limit(LIMIT).sort({ createdAt: 1 })

    res.status(200).json({ tasks })
  } catch (error) {    
    res.status(404).json({message: error.message})
  }
}

export async function createTask(req, res) {
  const {mediaId, username, displayUrl, likes} = req.body

  const newTask = new Task({mediaId, username, displayUrl, likes, createdAt: new Date().toISOString()})

  try {
    await newTask.save()

    res.status(201).json(newTask)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export async function likeTask(req, res) {
  const { mediaId, username } = req.body

  try {
    const task = await Task.find({mediaId})

    task[0].whoLiked.includes(username) || task[0].whoLiked.push(username)
    task[0].whoLiked.length >= task[0].likes ? task[0].completed = true : null

    const updatedTask = await Task.findOneAndUpdate({mediaId}, task[0], {new: true})

    res.status(200).json(updatedTask)
  } catch (error) {
    res.status(500).json({message: 'Something went wrong'})
    
    console.log(error)
  }
}
