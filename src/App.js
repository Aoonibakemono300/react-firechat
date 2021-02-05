import React, { useState, useEffect } from 'react'
// Components
import Button from "./components/Button";

// Firebase dependencies
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAJFctSn65x2poT4cgAVcPXfuNu4PSMIsc",
  authDomain: "react-firechat-131f7.firebaseapp.com",
  projectId: "react-firechat-131f7",
  storageBucket: "react-firechat-131f7.appspot.com",
  messagingSenderId: "524895972353",
  appId: "1:524895972353:web:01d536db6b9205b560e400"
})

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription
    return unsubscribe;
  }, [])

  const signInWithGoogle = async () => {
    //Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    //Set language to the default browser preference
    auth.useDeviceLanguage();

    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (initializing) return "Loading..."

  return (
    <div>
      {user ? (
        <>
          <Button onClick={signOut}>Sign out here</Button>
          <Channel user={user} db={db} />
        </>
      ) : (
        <Button onClick={signInWithGoogle}>Sign in here with Google</Button>
      )}  
    </div>
  );
}

export default App;
