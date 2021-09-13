import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

const secret = process.env.JWT_SECRET

export const createProfile = async (req, res) => {
  const { username } = req.body
  const token = jwt.sign({username}, secret, {expiresIn: '30d'})

  try {
    const oldUser = await User.findOne({username})
    if (oldUser) {
      return res.status(200).json({message: 'User already exists', token})
    } else {
      const result = await User.create({username, createdAt: new Date().toISOString()})
      return res.status(201).json({result, token})
    }
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message: 'Something went wrong'})
  }
}

export async function fetchProfile(req, res) {
  const { username } = req

  try {
    const profile = await User.findOne({username})
    if (!profile) return res.status(404).json({message: 'User doesn\'t exist'})

    res.status(200).json({profile})
  } catch (err) {
    res.status(500).json({message: 'Something went wrong'})
  }
}


export const signin = async (req, res) => {
  const { email, password } = req.body

  try {
    const oldUser = await User.findOne({email})

    if (!oldUser) return res.status(404).json({ message: 'User doesn\'t exist'})

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

    if (!isPasswordCorrect) return res.status(400).json({message: 'Invalid credentials'})

    const token = jwt.sign({email: oldUser.email, id: oldUser._id}, secret, {expiresIn: '1h'})

    res.status(200).json({result: oldUser, token})
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong'})
  }
}

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body

  try {
    const oldUser = await User.findOne({email})

    if (oldUser) return res.status(400).json({message: 'User already exists'})

    const hashedPassword = await bcrypt.hash(password, 12)
    const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})
    const token = jwt.sign({email: result.email, id: result._id}, secret, {expiresIn: '1h'})

    res.status(201).json({result, token})
  } catch (error) {
    res.status(500).json({message: 'Something went wrong'})
    
    console.log(error)
  }
}
