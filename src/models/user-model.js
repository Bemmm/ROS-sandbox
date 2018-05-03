const UserSchema = {
  name: 'Users',
  primaryKey: 'userId',
  properties: {
    userId: 'string',
    email: 'string',
    password: 'string'
  }
}

module.exports = { UserSchema }
