const mongoDbConnection = require('../models/mongoDb/index')

const postRole = (req, res) => {
	const user = req.body.user
	const changeRoleUser = req.body.role	
	mongoDbConnection(function (databaseConnection) {
		databaseConnection.collection('users', function (error, collection) {
			collection.updateOne({ username: user }, { $set: { role: changeRoleUser } }, function (err, result) {
				if (err) {
					return res.status(500).json({ error: true, message: err.message })
				}
				// databaseConnection.close()
				return res.status(200).json({ error: false, message: 'Role succsessfully updated' })
			})
			databaseConnection.collection('URL', function (error, collection) {
				collection.updateOne({ username: user }, { $set: { roleUser: changeRoleUser } }, function (err, result) {
					if (err) {
						return res.status(500).json({ error: true, message: err.message })
					}
					
				})
			})
		})
	})
}

module.exports = {
	postRole
}
