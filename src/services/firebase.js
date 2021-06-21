import firebase from 'firebase'

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  appId: process.env.VUE_APP_APP_ID
}

firebase.initializeApp(config);

export default firebase;