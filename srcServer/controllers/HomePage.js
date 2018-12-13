const urlExists = require('url-exists')
const shortid = require('shortid')
const mongoDbConnection = require('../models/mongoDb/index')

const getHomePage = (req, res) => {
  if (!req.user) {
    return res.render('index', { user: res.locals.user, flag:false } )
  }
  return res.render('index', { user: res.locals.user, flag:true })
}

const postHomePage = (req, res) => {
  const url = req.body.url
  // TODO
  if (!url) {
    return res.status(200).json({
      url: url,
      message: "Enter the url"
    })
  }
  // check of existence URL
  return urlExists(url, function (err, exists) {
    if (!exists) {
      return res.status(200).json({
        url: url,
        message: "non-existent URL"
      })
    }
    else {
      let shortUrl = shortid.generate()
      const query = { urlShorten: shortUrl }
      mongoDbConnection(function (databaseConnection) {
        databaseConnection.collection('URL', function (error, collection) {
          collection.find(query).toArray(function (err, result) {
            if (err) {
              return res.status(500).json({ error: true, message: err.message })
            }
            if (result.length) {
              shortUrl = shortid.generate()
            }
            return res.json({
              url: url,
              hash: shortUrl,
              message: "Generate was successful"
            })
          })
        })
      })
    }
  })
}

module.exports = {
  getHomePage,
  postHomePage
}