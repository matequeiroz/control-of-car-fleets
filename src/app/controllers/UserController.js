const User = require('../models/User')

class UserController {
  async index (req, res) {
    try {
      // return user paginates sort date create
      const users = await User.paginate(
        {},
        {
          limit: 10,
          page: req.query.page || 1,
          sort: '-created_at'
        }
      )
      users.total === 0
        ? res.status(200).json({ message: 'Users not found' })
        : res.status(200).json(users)
    } catch (err) {
      throw new Error(err)
    }
  }
  async show (req, res) {
    try {
      const user = await User.findById(req.params.id)
      if (!user) {
        return res.status(400).json({ message: 'User not found' })
      }
      return res.status(200).json(user)
    } catch (err) {
      throw new Error(err)
    }
  }
  async update (req, res) {
    try {
      const user = await User.findOneAndUpdate(req.params.id, req.body, {
        // config for return on new registrer
        new: true
      })
      return res.status(201).json(user)
    } catch (err) {
      throw new Error(err)
    }
  }
  async destroy (req, res) {
    try {
      // delete user
      await User.findOneAndDelete(req.params.id)
      return res.status(204).end()
    } catch (err) {
      throw new Error(err)
    }
  }
  async store (req, res) {
    try {
      const { email } = req.body
      // verify if user registered
      if (await User.findOne({ email })) {
        res.status(400).json({ message: 'User already registered' })
      }
      const user = await User.create(req.body)
      res.status(201).json(user)
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = new UserController()
