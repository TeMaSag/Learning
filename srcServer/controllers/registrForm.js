const helpers = require('../auth/helpers');
const mongoDbConnection = require('../models/mongoDb/index')

const createUser = (login, password, email, res) => {
	mongoDbConnection(function (databaseConnection) {
		databaseConnection.collection('users', function (error, collection) {
			// const value = () =>{
			// 	 if (email) { return true}
			// 	 return false
			// 	}
			collection.find({
				$or: [
					{ email: email },
					{ username: login }
				]
			}).toArray(function (err, result) {
				if (err) {
					return res.status(500).json({ error: true, message: err.message })
				}
				if (!result.length) {
					collection.insert({ username: login, password: helpers.hashPassword(password), email: email, role: "user", avatar: null }, (err, results) => { })
					return res.status(200).json({ flag: false, message: "registration completed successfully" })
				}
				else
					if (result[0].username === login) { return res.status(401).json({ message: 'This user already exists' }) }
			})
		})
	})
}

const getRegistr = (req, res) => {
	return res.render("registr", { flag: false })
}

const postRegistr = (req, res) => {
	const login = req.body.login
	const password = req.body.password
	const email = req.body.email || undefined
	if (password == "facebook") {
		return res.status(401).json({ message: "You can not use this password" })
	}
	if (!login.length) {
		return res.status(401).json({ message: "Enter login" })
	}
	if (!password.length) {
		return res.status(401).json({ message: "Enter password" })
	}
	return createUser(login, password, email, res)
}
module.exports = {
	getRegistr,
	postRegistr,
	createUser
}   