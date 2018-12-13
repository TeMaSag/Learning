const urlExists = require('url-exists')
const script = require('../script')
const jwt = require('jsonwebtoken');
const mongoDbConnection = require('../models/mongoDb/index')

const postSaveDb = (req, res) => {
  const urlShorten = req.body.urlShorten
  const url = req.body.url
  // const token = req.header('Authorization')
  let username;
  let role;
  if (res.locals.user) {
    username = res.locals.user.username;
    role = res.locals.user.role
  }
  // check empty field Short URL 
  if (!urlShorten || !url) {
    return res.status(200).json({
      message: "Enter the short url or URL",
      urlShorten: urlShorten,
      url: url
    })
  }
  return urlExists(url, function (err, exists) {
    if (!exists) {
      return res.status(200).json({
        message: "non-existent URL",
        url: url
      })
    }
    else {
      const query = { urlShorten: urlShorten }
      mongoDbConnection(function (databaseConnection) {
        databaseConnection.collection('URL', function (error, collection) {
          collection.find(query).toArray(function (err, result) {
            if (err) {
              return res.status(500).json({ error: true, message: err.message })
            }
            if (!result.length) {
              const date = new Date()
              const currentDate = script.dateFormat(date)
              // const role = res.locals.user.role
            
              const docDB = { username: username, roleUser: role, "url": url, "urlShorten": urlShorten, date: currentDate, count: 0 }
              databaseConnection.collection('URL', function (error, collection) {
                collection.insert(docDB, (err, results) => {
                  if (err) {
                    return res.status(500).json({ error: true, message: err.message })
                  }
                })
                return res.status(200).json({
                  url: url,
                  hash: urlShorten,
                  message: "successful"
                })
              })
            }
            else {
              return res.status(200).json({
                url: url,
                hash: urlShorten,
                message: "short URL found in DB"
              })
            }
          })
        })

      })
    }
  })
}

module.exports = {
  postSaveDb
}