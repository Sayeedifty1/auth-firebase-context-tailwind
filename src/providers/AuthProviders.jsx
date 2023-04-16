import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebase.config';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProviders = ({children}) => {

    const [user , setUser] = useState(null);

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth , email , password);
    }
    const signIn = (email, password)=>{
        return signInWithEmailAndPassword(auth ,email , password)
    }
    
   const logout =() =>{
    return signOut(auth);
    }

   const authInfo ={
    user , 
    createUser,
    signIn,
    logout
    
   }



//    observe auth state change
   useEffect (()=>{
   const unsubscribe = onAuthStateChanged(auth , currentUser => {
    console.log('state change ', currentUser)
    setUser(currentUser)
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