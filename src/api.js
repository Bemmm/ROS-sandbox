const { authenticationRoute } = require('./routes')

module.exports = (app) => {
  app.use('/auth', authenticationRoute)
}
