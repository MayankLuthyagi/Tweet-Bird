import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAWSPcNeRVzCbXx6ixQbnDUN3uzOg3lcRI',
  authDomain: 'twitter-clone-7f196.firebaseapp.com',
  projectId: 'twitter-clone-7f196',
  storageBucket: 'twitter-clone-7f196.appspot.com',
  messagingSenderId: '316626992945',
  appId: '1:316626992945:web:21fe5eee6393f91615ba10'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
