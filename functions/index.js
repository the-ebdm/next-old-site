const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.addBlogPosts = functions.pubsub.schedule('every 5 minutes').onRun(context => {
  console.log("This is the function")
	console.log(context)
  console.log("End Transmission")
})