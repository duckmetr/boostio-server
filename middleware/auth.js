import jwt from 'jsonwebtoken'

async function auth(req, res, next) {
  const secret = process.env.JWT_SECRET

  try {
    if (req.headers.authorization) {
      const [,token] = req.headers.authorization.split(' ')

      if (token) {      
        const decodedData = jwt.verify(token, secret)
        
        req.username = decodedData?.username
        next()
      } else {
        throw new Error('token expired')
      }
    } else {
      throw new Error('access denied')
    }
  } catch (error) {
    console.log('AUTH ERROR:', error.message)
    res.status(403).json({message: 'access denied'})
  }
}

export default auth