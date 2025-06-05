
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';

import { GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';


export const AuthContext = createContext()



const AuthProvider = ({children}) => {
       const[user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    console.log(user);
    const googleProvider = new GoogleAuthProvider()
   
    const forgetPassword = (email) =>{
        setLoading(true)
        return sendPasswordResetEmail(auth,email)
    }
    const loginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
        .then((result)=>{
            console.log(result);
        })
        .catch((error)=>{
            console.log(error);
        })
      };

    const createUser = (email,password) => {
        setLoading(true)

        return createUserWithEmailAndPassword(auth,email,password)
    }



    const signIn = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword (auth,email,password)
    }

    
   
    
    const updateUser = (updatedData) => {
       
        return updateProfile(auth.currentUser, updatedData)
    }



    const logOut = () => {
        return signOut(auth);
    }

    useEffect(()=>{
      const unsubscribe =  onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        });
        return()=> {
            unsubscribe()
        };
    },[])

    const authData = {  
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        loading,
        setLoading,
        loginWithGoogle,
        forgetPassword,
        updateUser
        
    }
    return <AuthContext value={authData}>{children}</AuthContext>
};

export default AuthProvider;