import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase.config';

export const AuthContext = createContext(null);


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProviders = ({children}) => {

    const [user , setUser] = useState(null);
    const [loading , setLoading] =useState(true)

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth , email , password);
    }
    const signIn = (email, password)=>{
        return signInWithEmailAndPassword(auth ,email , password)
    }
    const googleSignIn = ()=> {
        return signInWithPopup(auth, googleProvider);
    } 

   const logout =() =>{
    return signOut(auth);
    }

   const authInfo ={
    user , 
    loading,
    createUser,
    signIn,
    googleSignIn,
    logout

    
   }



//    observe auth state change
   useEffect (()=>{
   const unsubscribe = onAuthStateChanged(auth , currentUser => {
    console.log('state change ', currentUser)
    setUser(currentUser)
    setLoading(false)
   });
   
   return () => {
    unsubscribe();
   }


   }, [])

    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProviders;