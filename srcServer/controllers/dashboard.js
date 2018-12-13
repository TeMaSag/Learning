const db = require('../models')

const getDashboard = async (req, res) => {
  // const offset=req.query.offset;
  // const limit=req.query.limit;z
  const carlist = await db.carlist.findAll({ })
  // return res.json ({carlist })
  if (!req.user) {
    return res.render('table', { user: res.locals.user, flag: false, carlist:carlist })
  }
  return res.render('table', { user: res.locals.user, flag: true, carlist:carlist })
}
module.exports = {
  getDashboard
}