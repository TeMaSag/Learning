const jwt = require('jsonwebtoken');
const config = require('config')
const request = require('request');
// const helpers = require('../auth/helpers');
const mongoDbConnection = require('../models/mongoDb/index')
const authHelpers = require('./helpers');
// const setCookie = require('set-cookie');
const { createUser } = require('../controllers/registrForm')

const authMongoDb = (login, password, email, res) => {
    let token = '';
    return mongoDbConnection( async function (databaseConnection) {
        await databaseConnection.collection('users', async function (error, collection) {
            await collection.findOne({
                $or: [
                    { email: email }, { username: login }
                ]
            }, async function (err, result) {
                if (err) {
                    return res.status(500).json({ error: true, message: err.message })
                }
                if (!result) { return res.status(401).json({ message: "Error login or password" }) }
                if (password != 'facebook') {
                    if (!authHelpers.comparePasswords(password, result.password)) {
                        return res.status(401).json({ message: "Invalid login or password" })
                    }
                }
                token = jwt.sign({ username: login, email: result.email, avatar: result.avatar, role: result.role }, config.jwtSecret);
                return res.status(200).json({
                    token: token,
                    user: result
                })
            })
        })
    })
}

const getAuth = (req, res) => {
    return res.render("auth", { flag: false })
}

const postAuth = (req, res) => {
    const login = req.query.login
    let email = () => {
        if (req.query.email) {
            return req.query.email
        }
        return ""
    }
    email = email()
    const password = req.query.password
    if (!login) {
        return res.status(401).json({ message: "Enter login" })
    }
    if (password == "facebook") {
        return res.status(401).json ({message: "You can not use this password"})
    }
    if (!password) {
        return res.status(401).json({ message: "Enter password" })
    }
    return authMongoDb(login, password, email, res)

}

const FBAuth = (req, res) => checkFBToken(req.body.token)
    .then(result => {
        console.log(result);
        let username = result.name
        let email = result.email
        let password = 'facebook'
        return mongoDbConnection(function (databaseConnection) {
            databaseConnection.collection('users', function (error, collection) {
                collection.findOne({ email: email }, function (err, result) {
                    if (err) {
                        return res.status(500).json({ error: true, message: err.message })
                    }
                    if (!result) {
                        return collection.insert({ username: username, password: authHelpers.hashPassword(password), email: email, avatar: null, role: "user", }, (err, results) => {
                            return authMongoDb(username, password, email, res)
                        })
                    }
                    return authMongoDb(username, password, email, res)
                })
            })
        })
    })
    .catch(e => {
        console.log('error:', e);
    })


const checkFBToken = token =>
    new Promise((resolve, reject) => {
        request(
            {
                url: 'https://graph.facebook.com/me?fields=name,email',
                qs: { access_token: token, scope: 'name, email' }
            },
            (error, response, body) => {
                const result = JSON.parse(body);
                if (!result.error && response.statusCode === 200) {
                    resolve(result);
                } else {
                    reject(result.error);
                }
            }
        );
    });

module.exports = {
    getAuth,
    postAuth,
    FBAuth
}