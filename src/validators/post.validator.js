const postValidation = (req, res, next) => {

  req.checkBody('name')
    .exists()
    .withMessage('Name doesn\'t exist')
    .notEmpty()
    .withMessage('Name empty')
    .isString()
    .withMessage('Name not a string')

  req.checkBody('email')
    .exists()
    .withMessage('Email doesn\'t exist')
    .notEmpty()
    .withMessage('Email empty')
    .isEmail()
    .withMessage('Email not valid')

  req.getValidationResult()
    .then(result => {
      if(!result.isEmpty()) {
        return res.status(400).send(errorHandler(result.array()))
      }
      next()
    })
}

module.exports = {
  postValidation
}
