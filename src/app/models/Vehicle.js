const mongoose = require('mongoose')

// paginate plugin
const paginate = require('mongoose-paginate')

// define model Vehicle
const VehicleSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Car', 'Motorcycle', 'Truck'],
    require: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year_model: {
    type: String,
    required: true
  },
  fuel: {
    type: String,
    enum: ['Gasoline', 'Alcohol', 'Diesel', 'GNV'],
    required: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
})

// set paginate plugin
mongoose.plugin(paginate)

module.exports = mongoose.model('Vehicle', VehicleSchema)
