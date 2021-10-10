import Profile from 'instagram-public-api'

async function check(req, res, next) {
  const { username, uniq } = req.body

  if (!uniq) {
    // generate random string
    return res.status(200).json({uniq: '087640'})
  }

  try {
    const user = new Profile(username)
    // const data = await user.getData()
    console.log(user)
    
    // const uniqBio = data.bio.split(':')

    // console.log(uniqBio)

    // if (uniqBio === uniq) {
    //   next()
    // } else {
    //   return res.status(403).json({message: 'access denied'})
    // }
  } catch (error) {
    console.log('check error:', error.message)
    return res.status(500).json({message: 'server error'})
  }
}

export default check