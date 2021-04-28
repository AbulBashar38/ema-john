import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './FirebaseConfig';

export const initializeConfig = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    }
}
export const signInForGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then((result) => {
            const { displayName, email } = result.user
            const signInInfo = {
                name: displayName,
                email: email,
                isSignIn: true
            }
            return signInInfo
        })
        .catch((error) => {
            const userInfo = {};
            const errorMessage = error.message;
            userInfo.error = errorMessage;
            userInfo.isSignIn = false;
            return userInfo;
        });
}

export const signUpForEmail = (name, email, password) => {

    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const userInfo = res.user
            userInfo.isSignIn = true
            updateUserName(name);
            return userInfo;
        })
        .catch((error) => {
            const userInfo = {};
            const errorMessage = error.message;
            userInfo.error = errorMessage;
            userInfo.isSignIn = false;
        });
}

export const signInForEmail = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const userInfo = res.user;
            userInfo.isSignIn = true;
            return userInfo
        })
        .catch((error) => {
            const userInfo = {};
            const errorMessage = error.message;
            userInfo.error = errorMessage;
            userInfo.isSignIn = false;
            return userInfo;
        });
}

export const signInForFacebook = () => {
    const FbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(FbProvider)
        .then(res => {
            const credential = res.credential;
            const userInfo = res.user;
            userInfo.isSignIn = true;
            const accessToken = credential.accessToken;
            return userInfo

        })
        .catch((error) => {
            const userInfo = {};
            const errorMessage = error.message;
            userInfo.error = errorMessage;
            userInfo.isSignIn = false;
            return userInfo;
        });
}

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name,

    }).then(function () {
        console.log('user name update');
    }).catch(function (error) {
        const userInfo = {};
        userInfo.error = error;
        userInfo.isSignIn = false;
        return userInfo;
    });
}