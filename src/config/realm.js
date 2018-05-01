const Realm = require('realm')

const UserSchema = {
  name: 'Users',
  primaryKey: 'userId',
  properties: {
    userId: 'string',
    email: 'string',
    password: 'string'
  }
}

const connect = (options, mediator) => {
  mediator.once('boot.ready', () => {
    Realm.Sync.User.login(options.REALM_AUTH_URL, options.USER, options.PASSWORD).then(user => {
      let realm = Realm.open({
        // path: options.AUTH_INFO_REALM_URL,
        schema: [UserSchema],
        sync: {
          user,
          url: `${options.REALM_URL}/~/${options.AUTH_INFO_REALM_URL}`
        }
      })
      .then(data => {
        mediator.emit('db.ready', realm)
        return data
      })
      .catch(err => {
        mediator.emit('db.error', err)
      })
      .then(data => console.log(JSON.stringify(data)))
    })
  })
}

module.exports = Object.assign({}, {connect})
