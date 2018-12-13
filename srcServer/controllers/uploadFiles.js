const mongoDbConnection = require('../models/mongoDb/index')

const getUpload = (req, res) => {
  return res.render("fileupload", { flag: false })
}

const uploadFiles = async (req, res) => {
  const user = req.user.username
  let email = () => {
    if (req.user.email) {
      return req.user.email
    }
    return ""
  }
  email = email()
  if (!req.file) {
    return res.json({ message: "no File" })
  }
  await mongoDbConnection(async function (databaseConnection) {
    await databaseConnection.collection('users', async function (error, collection) {
      await collection.findOne({
        $or: [
          { email: email }, { username: user }
        ]
      }, async function (error, results) {
        if (error) {
          return res.status(500).json({ error: true, message: err.message })
      }
        if (results) {
          await collection.updateOne({ username: user }, { $set: { avatar: req.file } }, async function (err, result) {
            if (err) {
              return res.status(500).json({ error: true, message: err.message })
            }
            return res.json({ file: req.file, message: "successful update" })
          })
        }
      });
    });
  })
}

module.exports = {
  uploadFiles,
  getUpload
}
