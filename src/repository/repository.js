const { User } = require('../models/user')
const repository = (connection) => {
  const realm = connection

  const findByEmail = (email) => {
    return new Promise((resolve, reject) => {
      let users = realm.objects('Users')
      let result = users.filtered(`email == '${email}'`)
      if (result.length) {
        resolve(new User(result[0].email, result[0].password, result[0].userId))
      } else {
        reject('Sorry, wrong email or password')
      }
    })
  }

  const findById = (userId) => {
    return new Promise((resolve, reject) => {
      let users = realm.objects('Users')
      let result = users.filtered(`userId == '${userId}'`)
      if (result.length) {
        resolve(new User(result[0].email, result[0].password, result[0].userId))
      } else {
        reject('Sorry, wrong email or password')
      }
    })
  }

  const disconnect = () => {
    realm.close()
  }

  return {
    findByEmail,
    findById,
    disconnect
  }
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection realm not supplied!'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})
