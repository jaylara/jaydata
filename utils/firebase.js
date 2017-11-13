const firebase = require('firebase');

require('dotenv').config();

// Provided by the Firebase console
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

// Firebase instance
firebase.initializeApp(config);

// Firebase doesn't return data as an array but as a parent object
//  containing child objects. This utility function will extract
//  the child objects into an array and place the key as 'id'
const firebaseListToArray = (firebaseObjectList) => {
    if (!firebaseObjectList) return [];

    return Object.keys(firebaseObjectList)
    .map(k => {
        const obj = {
            id: k
        };
        for (let key in firebaseObjectList[k]) {
            if (firebaseObjectList[k].hasOwnProperty(key)) {
                obj[key] = firebaseObjectList[k][key];
            }
        }
        return obj;
    });
}

const database = firebase.database();
const auth = firebase.auth();

module.exports = {
    firebase,
    database,
    auth,
    firebaseListToArray
};
