const mongoDbConnection = require('../models/mongoDb/index')

const postShowUrl = (req, res) => {
	if (!req.user) {
		return res.status(200).json({ error: true, message: 'Log in to the system' })
	}
	else {
		const query = { username: req.user.username }
		mongoDbConnection(function (databaseConnection) {
			databaseConnection.collection('URL', function (error, collection) {
				collection.find(query).toArray(function (err, result) {
					if (err) {
						return res.status(500).json({ error: true, message: err.message })
					}
					return res.status(200).json({ result })
				})
			})
		})
	}
}

module.exports = {
	postShowUrl
}