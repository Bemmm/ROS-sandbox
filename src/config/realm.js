const Realm = require('realm')
const {UserSchema} = require('../models/user-model')

const connect = (options, mediator) => {
  mediator.once('boot.ready', () => {
    Realm.Sync.User.login(options.REALM_AUTH_URL, options.USER, options.PASSWORD).then(user => {
      Realm.open({
        schema: [UserSchema],
        sync: {
          user: user,
          url: options.REALM_URL + '/' + options.AUTH_INFO_REALM_URL
        }
      })
      .then(realm => {
        mediator.emit('db.ready', realm)
      })
      .catch(err => {
        mediator.emit('db.error', err)
      })
    })
  })
}

module.exports = Object.assign({}, {connect})
