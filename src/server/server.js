const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const api = require('../api')
const OAuthServer = require('express-oauth-server')

const start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.repo) {
      reject(new Error('The server must be started with a connected repository'))
    }
    if (!options.port) {
      reject(new Error('The server must be started with an available port'))
    }
    const app = express()
    app.oauth = new OAuthServer({
      model: {}
    })
    app.use(morgan('dev'))
    app.use(expressValidator())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(helmet())
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send('Something went wrong!')
    })
    app.use((req, res, next) => {
      req.app.locals.repo = options.repo
      next()
    })
    app.use(app.oauth.authorize());
    api(app, options)

    const server = app.listen(options.port, () => resolve(server))
  })
}

module.exports = Object.assign({}, {start})
