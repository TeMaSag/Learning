const mongoDbConnection = require('../models/mongoDb/index')
const getAllUsers = async (req, res) => {
	// if (!res.locals.user || res.locals.user.role !== "admin") {
	// 	return res.status(200).render('admin', { flag: false })
	// }
	let usersUrl = []
	return mongoDbConnection(function (databaseConnection) {
		databaseConnection.collection('users', function (error, collection) {
			collection.aggregate([

				{
					$lookup: {
						from: "URL",       // other table name
						localField: "username",   // name of users table field
						foreignField: "username", // name of userinfo table field
						as: "URL",
					},
				},
				{
					$group: {
						_id: "$username",
						urls: { $push: "$URL.urlShorten" },
						role: { $first: "$role" },
						// count: { $sum: 1 }
					},
				},
				{
					$unwind: {
						path: "$urls",
					}
				},
				{
					$project: {
						
						totalUrls: { $size: "$urls" },
						role: "$role"
					}
				}
			]).toArray(function (err, result) {
				if (err) {
					return res.status(500).json({ error: true, message: err.message })
				}
				// users.push(result)
				return res.status(200).json({ user: res.locals.user, result: result })

			})
		})
	})
}
module.exports = {
	getAllUsers
}