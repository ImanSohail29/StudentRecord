require('dotenv').config();
const firebase = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
// Initialize Firebase
if (!firebase.apps.length) {
  // Initialize Firebase Admin SDK
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL // Use the database URL from environment variables
  });}
module.exports=firebase;