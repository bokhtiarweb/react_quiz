/* eslint-disable max-lines */
import React, { createContext, useContext, useEffect, useState } from 'react';
import '../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    //SignUp function
    async function signUp(email, password, username) {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(auth.currentUser, { displayName: username });

        const user = auth.currentUser;
        setCurrentUser({ ...user });
    }

    //SignIn function
    function logIn(email, password) {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password);
    }

    //LogOut function
    function logOut() {
        const auth = getAuth();
        return signOut(auth);
    }

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
