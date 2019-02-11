const express = require('express')
// mod validator express
const validate = require('express-validation')
const handler = require('express-async-handler')
const router = express.Router()
// object with all controllers
const controllers = require('../controllers/loader')
// object with all validators
const validators = require('../validators/loader')

// middleware auth
const auth = require('../middlewares/auth')

// routers vehicle
router.post(
  '/vehicle',
  auth,
  validate(validators.Vehicle),
  handler(controllers.VehicleController.store)
)
router.get('/vehicles', auth, handler(controllers.VehicleController.index))
router.get('/vehicle/:id', auth, handler(controllers.VehicleController.show))
router.put('/vehicle/:id', auth, handler(controllers.VehicleController.update))
router.delete(
  '/vehicle/:id',
  auth,
  handler(controllers.VehicleController.destroy)
)

// routers users
router.get('/user', auth, handler(controllers.UserController.index))
router.get('/user/:id', auth, handler(controllers.UserController.show))
router.post('/user', auth, handler(controllers.UserController.store))
router.delete('/user/:id', auth, handler(controllers.UserController.destroy))
router.put('/user/:id', auth, handler(controllers.UserController.update))
router.post('/user/register', handler(controllers.UserController.store))

// routers login
router.post('/signup', handler(controllers.LoginController.signup))

module.exports = router
