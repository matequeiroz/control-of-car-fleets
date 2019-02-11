const VehicleModel = require('../models/Vehicle')

class VehicleController {
  async index (req, res) {
    console.log(req.userId)
    try {
      const vehicles = await VehicleModel.paginate(
        {},
        {
          limit: 10,
          page: req.query.page || 1,
          populate: ['created_by'],
          sort: '-created_at'
        }
      )
      vehicles.total === 0
        ? res.status(200).json({ message: 'Vehicles not found' })
        : res.status(200).json(vehicles)
    } catch (err) {
      throw new Error(err)
    }
  }

  async store (req, res) {
    try {
      console.log(`ID: ${req.userId}`)
      const vehicle = await VehicleModel.create({
        ...req.body,
        created_by: req.userId
      })
      res.status(201).json(vehicle)
    } catch (err) {
      throw new Error(err)
    }
  }

  async show (req, res) {
    try {
      const vehicle = await VehicleModel.findById(req.params.id)
      if (!vehicle) {
        return res.status(400).json({ message: 'Vehicle not found' })
      }
      return res.status(200).json(vehicle)
    } catch (err) {
      throw new Error(err)
    }
  }

  async update (req, res) {
    try {
      const vehicle = await VehicleModel.findOneAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      )
      return res.status(201).json(vehicle)
    } catch (err) {
      throw new Error(err)
    }
  }

  async destroy (req, res) {
    try {
      await VehicleModel.findOneAndDelete(req.params.id)
      return res.status(204).end()
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = new VehicleController()
