const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

class User {

  constructor (email, password, userId) {
    this.email = email
    this.password = password
    this.userId = userId
  }

  get authorize () {
    const user = this
    const token = jwt.sign({iss: user.userId}, config.serverSettings.SESSION_SECRET, { expiresIn: '1h' })
    return {
      'x-access-token': token,
      'email': user.email,
      // 'password': user.password,
      'userId': user.userId
    }
  }
  info (token) {
    const user = this
    return {
      'email': user.email,
      // 'password': user.password,
      'userId': user.userId
    }
  }
  comparePasswords (candidate, callback) {
    bcrypt.compare(candidate, this.password, (err, isMatch) => {
      if (err) return callback(err)
      callback(null, isMatch)
    })
  }

  verify (token, callback) {
    jwt.verify(token, config.serverSettings.SESSION_SECRET, (err, decoded) => {
      if (err) {
        callback(err)
      }
      callback(null)
    })
  }
}

User.schema = {
  name: 'Users',
  primaryKey: 'userId',
  properties: {
    userId: 'string',
    email: 'string',
    password: 'string'
  }
}
module.exports = { User }
