const Joi = require('joi')

module.exports = {
  body: {
    type: Joi.string()
      .valid(['Car', 'Motorcycle', 'Truck'])
      .required(),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    year_model: Joi.string().required(),
    fuel: Joi.string()
      .valid(['Gasoline', 'Alcohol', 'Diesel', 'GNV'])
      .required()
  }
}
