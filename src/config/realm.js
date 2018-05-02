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
      console.log('REALM NAME', user.identity)
      console.log('realm server')
      let realm = Realm.open({
        schema: [UserSchema],
        // readOnly: true,
        sync: {
          user: user,
          url: options.REALM_URL + '/' + options.AUTH_INFO_REALM_URL
        }
      })
      .then(realm => {
        console.log('REALM Empty?', realm.objects('Users'))
        mediator.emit('db.ready', realm)
      })
      .catch(err => {
        mediator.emit('db.error', err)
      })
    })
  })
}

module.exports = Object.assign({}, {connect})
