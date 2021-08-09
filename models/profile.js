import mongoose from 'mongoose'

const profileSchema = mongoose.Schema({
  profile_pic_url: String,
  username: String,
  posts: {type: Number, default: 0},
  followers: {type: Number, default: 0},
  following: {type: Number, default: 0},
  coins: {type: Number, default: 0, min: 0, max: 1000000},
  orders: {type: Number, default: 0, min: 0, max: 1000000},
  likes: {type: String, default: '∞'},
  createdAt: {type: Date, default: new Date()}
})

const Profile = mongoose.model('users', profileSchema)

export default Profile