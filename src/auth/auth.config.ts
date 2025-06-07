// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: 'ffg-cms.firebaseapp.com',
  projectId: 'ffg-cms',
  storageBucket: 'ffg-cms.firebasestorage.app',
  messagingSenderId: '343295398938',
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: 'G-CG3P2XTVKZ',
}

// Initialize Firebase
const firebaseAuth = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseAuth)

export { firebaseAuth, analytics }
