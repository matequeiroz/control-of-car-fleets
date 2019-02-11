require('dotenv').config()
const express = require('express')
const Youch = require('youch')
const mongoose = require('mongoose')
const validator = require('express-validation')
const db = require('./config/database/db')
const routers = require('./app/routes/index')

class Server {
  constructor () {
    this.express = express()
    this.database()
    this.middlewares()
    this.routes()
    this.exception()
  }

  // config conection with mongodb
  database () {
    mongoose.connect(db.uri, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
  }

  // config middlewares app
  middlewares () {
    this.express.use(express.json())
  }

  // config routes app
  routes () {
    this.express.use(routers)
  }

  // define middleware exception for use app
  exception () {
    this.express.use(async (err, req, res, next) => {
      /**
			 * verify if error is instance class ValidationError
			 * case true, this error is valition fields request
			 */
      if (err instanceof validator.ValidationError) {
        res.status(err.status).json({
          status: err.status,
          message: err.statusText,
          errors: err.errors
        })
      }

      /**
			 * pretty logger error in development environment
			 * return JSON with info logger
			 */
      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err)
        return res.json(await youch.toJSON())
      }

      res.status(err.status || 500).json({ error: 'Internal Server Error' })
    })
  }
}

module.exports = new Server().express
