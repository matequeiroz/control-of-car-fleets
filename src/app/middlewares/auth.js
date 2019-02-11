// require jwt
const jwt = require('jsonwebtoken')
// function for transform in promisse
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeaders = req.headers.authorization
  // verify if received token
  if (!authHeaders) {
    res.status(401).json({ error: 'Token not provider' })
  }
  // get token
  const [, token] = authHeaders.split(' ')

  try {
    // decoded jwt
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)

    req.userId = decoded.id
    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}
