const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (error) {
    console.error('Error parsing FIREBASE_SERVICE_ACCOUNT environment variable:', error);
  }
} else {
  try {
    serviceAccount = require('./serviceAccountKey.json');
  } catch (error) {
    console.warn('serviceAccountKey.json not found and FIREBASE_SERVICE_ACCOUNT not set.');
  }
}

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  console.error('Firebase admin initialization failed: No credentials provided.');
}

const db = admin ? admin.firestore() : null;

module.exports = { db, admin };
