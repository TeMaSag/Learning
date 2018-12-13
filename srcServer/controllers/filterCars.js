const db = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op

function prepareParams(req) {
  const priceUp = req.query.priceUp
  const priceDown = req.query.priceDown
  const yearDown = req.query.yearDown
  const yearUp = req.query.yearUp
  const search = req.query.search
  const offset = req.query.offset;
  const limit = req.query.limit;

  let params = {}
  let where = {}
  const priceParams = {}
  const yearParams = {}

  if (priceDown) {
    priceParams.$gte = priceDown.trim();
  }
  if (priceUp) {
    priceParams.$lte = priceUp.trim();
  }
  if (yearDown && yearDown !== "All years" ) {
    yearParams.$gte = yearDown
  }
  if (yearUp !== "All years" && yearUp) {
    yearParams.$lte = yearUp
  } 
  if (limit) {
    params.limit = +limit 
  }
  if(offset) {
    params.offset = +offset
  }
  if (search) {
    where.name = {
      [Op.like]: `%${search}%`
    }
  }

  if (Object.keys(yearParams).length) {
    where.year = yearParams
  }
  if (Object.keys(priceParams).length) {
    where.price = priceParams
  }
  params.where = where;
  return params;
}



const getCarData = async (req, res) => {
  const where = prepareParams(req)
   return res.json(await db.carlist.findAll( where ))
  // return res.json(await db.carlist.findAll({ where: {
  //   year: {
  //     [Op.gte]: 2012,
  //     [Op.lte]: 2016
  //   }
  // }}, { offset:1, limit:15}))
}

module.exports = {
  getCarData
}