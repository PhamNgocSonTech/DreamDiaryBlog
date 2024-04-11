/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Unauthorized access"
    );
  }
  const userEmail = data.email;
  if (!userEmail) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Email not provided"
    );
  }
  return admin
    .auth()
    .getUserByEmail(userEmail)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      functions.logger.info(`Success add ${userEmail} made an Admin!!`);
      return {
        message: `Success add ${userEmail} made an Admin!!`,
      };
    })
    .catch((err) => {
      functions.logger.error(
        `Error adding admin role for ${userEmail}: ${err}`
      );
    });
});

// const { onCall } = require("firebase-functions/v2/https");
// const { initializeApp } = require("firebase-admin/app");
// const { auth } = require("firebase-admin");
// // const logger = require("firebase-functions/logger");
// initializeApp();

// exports.addAdminRole = onCall((data, context) => {
//   return auth()
//     .getUserByEmail(data.email)
//     .then((user) => {
//       return auth().setCustomUserClaims(user.uid, { admin: true });
//     })
//     .then(() => {
//       return { message: `Success add ${data.email} made an Admin` };
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
