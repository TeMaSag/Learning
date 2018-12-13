const getCheckAuth = (req, res) => {
  if (res.locals.user) {
    return res.json({ user: res.locals.user })
  }
  return res.status(401).json ({message: "Unauthorized"})
}

module.exports = {
  getCheckAuth
}