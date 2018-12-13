const jwt = require('jsonwebtoken');
const config = require('config');
const mongoDbConnection = require('../models/mongoDb/index')
var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')
app.use(cookieParser())

const authRequired = (req, res, next) => {
  if (!req.header('authorization')) {
    return res.status(401).json({ error: true, message: 'Auth required' });
  }
  const token = req.header('authorization');

  return jwt.verify(token, config.jwtSecret, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: true, message: 'Auth required' });
    }

    req.user = decoded;
    await mongoDbConnection(async function (databaseConnection) {
      await databaseConnection.collection('users', async function (error, collection) {
        await collection.find({ username: decoded.username }).toArray(async function (error, results) {
          res.locals.user = results[0]
          return next();
        });
      });
    });
  });
};

const checkAuth = (req, res, next) => {
  if (req.header('Authorization') && req.header('Authorization') !== "undefined") {
    let token;
    try {
      token = req.header('Authorization')
    } catch (err) {
      console.log(err);
    }
    return jwt.verify(token, config.jwtSecret, async (err, decoded) => {
      if (err) {
        console.log(err);
        // return res.status(401).json({ error: true, message: 'Auth required' });
      }
      req.user = decoded;
      // const a = decoded.username;
      // res.locals.user = await database.collection("users").findOne({ username: decoded.username });
      await mongoDbConnection(async function (databaseConnection) {
        await databaseConnection.collection('users', async function (error, collection) {
          await collection.find({ username: decoded.username }).toArray(async function (error, results) {
            if (results.length) {
              res.locals.user = results[0]
              return next();
            }
            await databaseConnection.collection('usersFB', async function (error, collection1) {
              await collection1.find({ username: decoded.username }).toArray(async function (error, result) {
                res.locals.user = result[0]
                return next();
              })
            })

          });
        });
      });
    });
  }
  return next()
};


module.exports = {
  authRequired,
  checkAuth
};
