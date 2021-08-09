import Profile from '../models/profile.js'

export const createProfile = async (req, res) => {
  const { username } = req.body

  try {
    const oldUser = await Profile.findOne({ username })
    if (oldUser) return res.status(400).json({message: 'User already exists'})

    const result = await Profile.create({ username, createdAt: new Date().toISOString() })

    res.status(201).json({result})
  } catch (error) {
    res.status(500).json({message: 'Something went wrong'})
    
    console.log(error)
  }
}

export async function fetchProfile(req, res) {
  const { username } = req.body;

  try {
    const profile = await Profile.findOne({username})
    if (!profile) return res.status(404).json({message: 'User doesn\'t exist'})

    res.status(200).json({profile})
  } catch (err) {
    res.status(500).json({message: 'Something went wrong'})
  }
}
