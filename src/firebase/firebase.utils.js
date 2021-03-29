import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyBEVeKyUMz7GiO6sDm8zxuCsGXtnWTxxVA",
  authDomain: "crwn-db-3bfa1.firebaseapp.com",
  projectId: "crwn-db-3bfa1",
  storageBucket: "crwn-db-3bfa1.appspot.com",
  messagingSenderId: "413068858459",
  appId: "1:413068858459:web:b0b0e7200aa00787d45b7e"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()
  
  if(!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase