const OauthServer = require('oauth2-server')

const Request = OauthServer.Request
const Response = OauthServer.Response

const oauth = new OauthServer({
  model: require('../../models/oauth2-model')
})

const login = (customParam = false) => (req, res, next) => {
  var request = new Request(req)
  var response = new Response(res)

  return oauth.authorize(request, response).then((success) => {
    res.json(success)
  }).catch((err) => {
    res.status(err.code || 500).json(err)
  })
  // let repo = req.app.locals.repo
  // req.app.locals.userInfo = repo.GetUserByEmail(req.body).then((data) => {
  //   req.app.locals.userInfo = data
  //   return next()
  // })
}

module.exports = {
  login
}
