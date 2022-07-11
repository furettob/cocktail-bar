const functions = require('firebase-functions').region('europe-west1')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.checkConnection = functions.https.onRequest((request, response) => {
  response.send("Connection is live");
});

// DRINK ENTITY
const users =  require('./modules/users')
exports.addUserWithId = users.addUserWithId

