
module.exports = (app, options) => {
  const {repo} = options
  const getUserByEmail = (customParam = false) => (req, res, next) => {
    console.log(repo)
    const userId = typeof customParam !== "boolean" ? req.body[customParam] : +req.params.id;
    req.app.locals.userIndex = User.findIndex(user => user.id === userId);

    return next()
  }
}
