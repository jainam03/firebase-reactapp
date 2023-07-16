import { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      // Basic email validation
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    if(!password || password.length < 0) {
      alert("Please enter a password")
    } else if(password.length < 6) {
      alert("This password is too weak!")
    }

    // Create user with email and password
    await createUserWithEmailAndPassword(auth, email, password);
    
    console.log('User signed in:', email);
  } catch (err) {
    console.error(err);
  }
};

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider)
  } 
  catch(err) {
    console.log(err);
  }
}

const signOutUser = async () => {
  try {
    await signOut(auth)
  } 
  catch(err) {
    console.log(err);
  }
}

  return (
    <div>
      <h1>Authentication</h1>
      <input type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={signIn}>Sign in</button>
      
      <button onClick={signInWithGoogle} >Sign in with Google</button>

      <button onClick={signOutUser} >Sign out</button>
    </div>
  );
}
