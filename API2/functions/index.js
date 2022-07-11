const functions = require('firebase-functions').region('europe-west1')

exports.checkConnection = functions.https.onRequest((request, response) => {
  response.send("Connection is live");
});

// USER ENTITY
const users =  require('./modules/users')
exports.addUserCustomDataWithId = users.addUserCustomDataWithId
exports.getUserCustomData = users.getUserCustomData
exports.toggleFavouriteDrink = users.toggleFavouriteDrink

// DRINK ENTITY
const drinks =  require('./modules/drinks')
exports.addDrink = drinks.addDrink
