'use strict'
const repository = (connection) => {
  const realm = connection

  const GetUserByEmail = (data) => {
    return new Promise((resolve, reject) => {
      let users = realm.objects('Users')
      let user = users.filtered(`email == '${data.email}'`)
      if (user) {
        resolve(user[0])
      } else {
        reject('User not found')
      }
    })
  }

  const disconnect = () => {
    realm.close()
  }

  return {
    GetUserByEmail,
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
