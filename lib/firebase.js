import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/remote-config';

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyAMbE_x1RlYGeLJUytLafBwxsdo0ubiJKo",
    authDomain: "ebdmdev.firebaseapp.com",
    projectId: "ebdmdev",
    storageBucket: "ebdmdev.appspot.com",
    messagingSenderId: "224424594585",
    appId: "1:224424594585:web:bfef3c7af2dfff570afc08",
    measurementId: "G-TD3MWMJRVD"
  })
}

export default firebase;