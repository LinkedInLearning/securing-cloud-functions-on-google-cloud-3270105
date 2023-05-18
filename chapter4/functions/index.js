const functions = require("firebase-functions");
const admin = require("firebase-admin");


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.helloWorld = functions.https.onRequest((req, res) => {
  functions.logger.info("Hello logs!", {structuredData: true});

  // Verify Firebase Authentication token
  const authToken = req.get("Authorization").split("Bearer ")[1];

  admin.auth()
      .verifyIdToken(authToken)
      .then((decodedToken) => {
        // Perform action on behalf of user
        const uid = decodedToken.uid;
        console.log(uid);
        // ...
        res.status(200).send("Hello from Firebase!");
      })
      .catch((error) => {
        console.error(error);
        res.status(401).send("Unauthorized");
      });
});
