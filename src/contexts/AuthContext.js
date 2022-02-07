import React, { useContext, useEffect, useState } from 'react';
import {auth} from '../firebase'
// import firebase from "firebase/compat/app"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, updatePassword} from "firebase/auth"
// import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();
const auth1 = getAuth();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(); 
    const [loading, setLoading] = useState(true);
    

    function signup(email, password, passwordConfirm){
        
        if (password === passwordConfirm) {
            
            return createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
               console.log("created the user successfully"); 
            })
            .catch(error => {
                console.log(error)
                this.setState({ error })
            })
        } 
        else {
         this.setState({ error: { message: "Your Passwords dont match dummy."}});
        }
       
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("successful");
        })
        .catch(error => {
            this.setState({error});
        });
        
    }

    function logout(){
        return signOut(auth)
        .then( () => {
            console.log("logged out!")
        });
    }

    function resetPassword(email){
        console.log(email);
        return sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("email sent");
        });
    }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })   
        return unsubscribe;
    }, [])
    
    const value = {
        currentUser,
        login,
        logout,
        signup,
        resetPassword, 
    }

    return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
    );
}
