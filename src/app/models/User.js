const mongoose = require('mongoose')
// paginate plugin
const paginate = require('mongoose-paginate')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// define schema user
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
})

// add plugin paginate
mongoose.plugin(paginate)

// config crypt for password user
UserSchema.pre('save', async function (next) {
  // verify if this password is modified
  if (!this.isModified('password')) {
    return next()
  }

  // if create new user, get password and set password with bcrypt
  this.password = await bcrypt.hash(this.password, 8)
})

UserSchema.methods = {
  compareHash (password) {
    return bcrypt.compare(password, this.password)
  }
}

UserSchema.statics = {
  generateToken (user) {
    const { id } = user
    return jwt.sign({ id }, process.env.APP_SECRET, {
      expiresIn: process.env.APP_EXPIRED_TOKEN
    })
  }
}

module.exports = mongoose.model('User', UserSchema)
