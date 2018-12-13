const getHash = (req, res) => {
  const baseid = req.params.hash
  if (baseid) {
    const query = { urlShorten: baseid }
    database.collection("URL").find(query).toArray(function (err, result) {
      if (err) {
        return res.status(500).json({ error: true, message: err.message })
      }
      if (!result.length) {
        return res.status(200).redirect('/home-page')
      }
      else {
        let count = result[0].count + 1
        let newvalues = { $set: { count: count } }
        database.collection("URL").updateOne(query, newvalues, function (err, res) {
          if (err) {
            return res.status(500).json({ error: true, message: err.message })
          }
        })
        return res.status(200).redirect(result[0].url)
      }
    })
  }
}
module.exports = {
  getHash
}