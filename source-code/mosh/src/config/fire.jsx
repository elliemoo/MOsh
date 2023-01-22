import * as firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyAeREgt3YM_FPtwhYnMWF_AijkdYwyykR0",
  authDomain: "mosh-37501.firebaseapp.com",
  databaseURL: "https://mosh-37501.firebaseio.com",
  projectId: "mosh-37501",
  storageBucket: "mosh-37501.appspot.com",
  messagingSenderId: "806342003387",
  appId: "1:806342003387:web:f508ba713ee85e2683f79e",
  measurementId: "G-QVRJRKC8QL"
};

const fire = firebase.initializeApp(config);

const uiConfig ={
  signInFlow: "popup",
  signInOptions: [
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks:{ signInSuccessWithAuthResult: (authResult) => {
    let db = fire.firestore();

    db.collection("users").doc(authResult.user.uid).get().then(doc => {
      if (!doc.exists) {
          console.log("Adding user data to firestore");
          
          db.collection("users").doc(authResult.user.uid).set({
              connections: [],
              displayName: authResult.user.displayName,
              favAlbum: "ASTROWORLD",
              favArtist: "Travis Scott",
              interests: ["Hip Hop", "Pop"],
              photoURL: authResult.user.photoURL,
              posts: [],
          }, {merge: true}).catch(err => {
              console.log(err.message);
          })
      }
  })

    return false;
  }}
}



export {fire,uiConfig, config}
