const functions = require('firebase-functions').region('europe-west1')
const cors = require('cors')({origin: true})

exports.checkConnection = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.send({data:{msg:"Connection is live", data:"Connection is live"}});
  })
});

// USER ENTITY
const users =  require('./modules/users')
exports.addUserCustomDataWithId = users.addUserCustomDataWithId
exports.getUserCustomData = users.getUserCustomData
exports.toggleFavouriteDrink = users.toggleFavouriteDrink

// DRINK ENTITY
const drinks =  require('./modules/drinks')
exports.addDrink = drinks.addDrink
exports.getDrinksById = drinks.getDrinksById
