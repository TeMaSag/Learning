var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var http = require('http');
var fs = require('fs');
const getHash = (req, res) => {
  const baseid = req.params.hash
  // if (baseid) {
    const query = {"fieldname": "avatar",
    "originalname": "header.jpg",
    "encoding": "7bit",
    "mimetype": "image/jpeg",
    "destination": "uploads/",
    "filename": "32d6bf7449bbfd1e4e0299054abf613e",
    "path": "uploads/32d6bf7449bbfd1e4e0299054abf613e",
    "size": 21932 }
  //   database.collection("users").find(query).toArray(function (err, result) {
  //     if (err) {
  //       return res.status(500).json({ error: true, message: err.message })
  //     }
  //     if (!result.length) {
  //       return res.status(200).redirect('/home-page')
  //     }
  //     else {
  //        return res.status(200).redirect(result[0].query)
  //     }
  //   })
  // }
//   fileupload='32d6bf7449bbfd1e4e0299054abf613e'
//   if (req.url == '/32d6bf7449bbfd1e4e0299054abf613e') {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//       res.writeHead(200, {'content-type': 'text/plain'});
//       res.write('File uploaded');
//       res.end(util.inspect({fields: fields, files: query}));
//     });
//   }
 
// var file = fs.createWriteStream("file.jpg");
// var request = http.get("http://test/test.jpg", function(response) {
//   response.pipe(file);
// });


  var file = fs.createWriteStream("file.jpg");
  var request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
  return res.json( response.pipe(file) );
  });
}
module.exports = {
  getHash
}