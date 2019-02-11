const User = require('../models/User')

class LoginController {
  async signup (req, res) {
    // get email and password user
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user == null) {
      res.status(400).json({ error: 'User not found' })
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    return res.status(200).json({ user, token: User.generateToken(user) })
  }
}

module.exports = new LoginController()
