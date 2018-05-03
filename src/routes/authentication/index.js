const router = require('express').Router()
const { postValidation } = require('./validation')
const { login } = require('./middleware')

router.post('/login', [ postValidation, login() ], async (req, res) => {
  try {
    const { userInfo } = req.app.locals
    res.status(200).send(userInfo)
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
})

module.exports = router
