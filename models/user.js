import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  profile_pic_url: String,
  username: {type: String, unique: true},
  posts: {type: Number, default: 0},
  followers: {type: Number, default: 0},
  following: {type: Number, default: 0},
  coins: {type: Number, default: 0, min: 0, max: 1000000},
  orders: {type: Number, default: 0, min: 0, max: 1000000},
  likes: {type: String, default: '∞'},
  isBanned: {type: Boolean, default: false},
  createdAt: {type: Date, default: new Date()}
})

const User = mongoose.model('users', userSchema)

export default User
