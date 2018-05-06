const {
  errorHandler
} = require('../helpers')

const postValidation = (req, res, next) => {
  console.log(req.body)
  req.checkBody('email')
    .exists()
    .withMessage('Email value required')
    .notEmpty()
    .withMessage('Email could not be empty')

  req.checkBody('password')
    .exists()
    .withMessage('Password value required')

  req.getValidationResult()
    .then(result => {
      if (!result.isEmpty()) {
        return res.status(400).send(errorHandler(result.array()))
      }

      return next()
    })
}

module.exports = {
  postValidation
}
