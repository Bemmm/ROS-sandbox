'use strict'
const repository = (connection) => {
  const {db, ObjectID} = connection

  const GetUserByEmail = (email) => {
    console.log(db, connection)
    return new Promise((resolve, reject) => {
      const cinemas = []
      const query = {city_id: email}
      const projection = {_id: 1, name: 1}
      const cursor = db.collection('cinemas').find(query, projection)
      const addCinema = (cinema) => {
        cinemas.push(cinema)
      }
      const sendCinemas = (err) => {
        if (err) {
          reject(new Error('An error occured fetching cinemas, err: ' + err))
        }
        resolve(cinemas)
      }
      cursor.forEach(addCinema, sendCinemas)
    })
  }
  const disconnect = () => {
    db.close()
  }

  return Object.create({
    GetUserByEmail,
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})
