const status = require('http-status')
const { postValidation } = require('./validation')

module.exports = (app, options) => {
  const {repo} = options

  app.post('/login', postValidation, (req, res, next) => {
    repo.findByEmail(req.body.email)
      .then(user => {
        user.comparePasswords(req.body.password, (err, result) => {
          if (err) {
            return res.status(status.INTERNAL_SERVER_ERROR)
            .json({message: 'Sorry, something goes wrong'})
          }
          if (result) return res.status(status.OK).json(user.authorize)
        })
      })
      .catch(next)
  })

  app.get('/:userId', (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token) return res.status(status.UNAUTHORIZED).json({message: 'Token required!'})
    repo.findById(req.params.userId)
    .then(user => {
      user.verify(token, (err) => {
        if (err) return res.status(status.UNAUTHORIZED).json({message: 'Sorry, your token has expired'})
        return res.status(status.OK).json(user.info(token))
      })
    })
    .catch(next)
  })
}

