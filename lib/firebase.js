import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/remote-config';

const { APIKEY, AUTHDOMAIN, PROJECTID, BUCKET, SENDERID, APPID, GAID } = process.env;

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: APIKEY,
    authDomain: AUTHDOMAIN,
    projectId: PROJECTID,
    storageBucket: BUCKET,
    messagingSenderId: SENDERID,
    appId: APPID,
    measurementId: GAID
  })
}

export default firebase;