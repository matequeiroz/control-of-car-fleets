const config = require('./config')

// export config connect mongodb
module.exports = {
  uri: `mongodb://${config.username}:${
    config.password
  }@ds015899.mlab.com:15899/controlcarfleets`
}
