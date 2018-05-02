const router = require('express').Router()
const { postValidation } = require('./validation')
const { getUserByEmail } = require('./middleware')
router.post('/', [getUserByEmail, postValidation], async (req, res) => {
  console.log('LOOK HERE', req.app.locals.repo)
  res.status(200).send('test')
  // try {
  //   const userEntity = await User.create(req.body)
  //   return res.send(userEntity)
  // } catch (err) {
  //   res.status(400).send({ message: err.message })
  // }
})

module.exports = router
