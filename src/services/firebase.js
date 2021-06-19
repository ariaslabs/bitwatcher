import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBj20vIt0R61lcmX9KSMcURi0XgtGQrSHk",
    authDomain: "bitwatcher-47053.firebaseapp.com",
    projectId: "bitwatcher-47053",
    storageBucket: "bitwatcher-47053.appspot.com",
    messagingSenderId: "200561851596",
    appId: "1:200561851596:web:21c5b65300b9f61a251669"
}

firebase.initializeApp(config);

export default firebase;