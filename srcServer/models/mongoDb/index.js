
const MongoClient = require('mongodb');
const urlDb = require('../../../config/index') 
// module.exports = {
//   connectBD:  function () {
//     return new Promise((resolve, reject) => {
//       MongoClient.connect(urlDb.url,  function (err, database)  {
//         // checkconnect BD
//         if (err) {
//           return reject(err);
//         }
//         console.log('successful connect database');  
//         return resolve(database)          
//       })
//     }) 
//   }

// }

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
//the MongoDB connection
var connectionInstance;

module.exports = function(callback) {
  //if already we have a connection, don't connect to database again
  if (connectionInstance) {
    callback(connectionInstance);
    return;
  }
MongoClient.connect(urlDb.url,  function (error, databaseConnection)  {
  
    if (error) throw new Error(error);
    connectionInstance = databaseConnection;
    callback(databaseConnection);
  });
};





