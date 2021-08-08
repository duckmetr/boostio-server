import mongoose from 'mongoose'

const profileSchema = mongoose.Schema({
  profile_pic_url: String,
  username: String,
  posts: {type: String, default: 0},
  followers: {type: String, default: 0},
  following: {type: String, default: 0},
  coins: {type: String, default: 0},
  orders: {type: String, default: 0},
  likes: {type: String, default: '∞'},
  createdAt: {type: Date, default: new Date()}
})

const ProfileModel = mongoose.model('users', profileSchema)

export default ProfileModel