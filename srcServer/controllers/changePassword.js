const helpers = require('../auth/helpers')
const mongoDbConnection = require('../models/mongoDb/index')

const putChangePassword = (req, res) => {
	const user = req.body.user
	const newPassword = req.body.newPassword
	if (!newPassword) {
		return res.status(200).json({ error: true, message: 'New password field can not be empty' })
	}
	return	mongoDbConnection(function (databaseConnection) {
		databaseConnection.collection('users', function (error, collection) {
			collection.updateOne({ username: user }, { $set: { password: helpers.hashPassword(newPassword) } }, function (err, result) {
				// helpers.hashPassword()
				// result[0].password = helpers.hashPassword(password);
				if (err) {
					return res.status(500).json({ error: true, message: err.message })
				}
				return res.status(200).json({ error: false, message: 'Password succsessfully updated' })
			})
		})
	})
}

module.exports = {
	putChangePassword
}