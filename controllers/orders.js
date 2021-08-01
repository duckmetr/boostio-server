import Task from '../models/tasks.js'

export async function fetchOrders(req, res) {
  const { username } = req.body
  const LIMIT = 100

  try {
    const orders = await Task.find({ username, completed: false }).limit(LIMIT).sort({ createdAt: 1 })

    res.status(200).json({ orders })
  } catch (error) {    
    res.status(404).json({message: error.message})
  }
}
