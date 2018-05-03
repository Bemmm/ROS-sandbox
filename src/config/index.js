const {dbSettings, serverSettings} = require('./config')
const db = require('./realm')

module.exports = Object.assign({}, {dbSettings, serverSettings, db})
