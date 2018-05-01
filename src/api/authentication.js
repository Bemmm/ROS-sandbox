'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options

  app.get('/', (req, res, next) => {
    console.log(req)
    res.status(status.OK).json([{name: 'bem'}])
    repo.getCinemasByCity(req.query.cityId)
      .then(cinemas => {
        res.status(status.OK).json(cinemas)
      })
      .catch(next)
  })
  app.post('/auth', (req, res, next) => {
    req.checkBody('email')
    .exists()
    .withMessage('Email doesn\'t exist')
    .notEmpty()
    .withMessage('Email empty')
    .isEmail()
    .withMessage('Email not valid')

    req.getValidationResult()
    .then(result => {
      if (!result.isEmpty()) {
        return res.status(status.NOT_FOUND).send(result.array())
      }
      next()
    })
    console.log(req.body)
    res.status(status.OK).json({status: 'OK'})
  })
}
