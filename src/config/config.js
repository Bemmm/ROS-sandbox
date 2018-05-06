const dbSettings = {
  USER: 'external-auth',
  PASSWORD: 'EsUc7Ysm',
  REALM_URL: 'realm://acc.showsourcing.com:9080',
  REALM_AUTH_URL: 'http://acc.showsourcing.com:9080',
  AUTH_INFO_REALM_URL: 'auth/auth_info'
}

const serverSettings = {
  port: process.env.PORT || 3000,
  SESSION_SECRET: process.env.SESSION_SECRET || 'ExeubUHoQB--|dev|--BQoHUbuexE'

}

module.exports = Object.assign({}, { dbSettings, serverSettings })
