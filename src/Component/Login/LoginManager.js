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
            }
            return signInInfo
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            console.log(credential, email, errorMessage, errorCode);
        });
}

export const signUpForEmail = (name, email, password) => {

    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            updateUserName(name);
            return res.user
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('sign up error', errorCode, errorMessage);
        });
}

export const signInForEmail = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            var user = res.user;
            return user
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('sign in error', errorCode, errorMessage);
        });
}

export const signInForFacebook =()=>{
    var FbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(FbProvider)
  .then(res => {
    var credential = res.credential;
    var user = res.user;
    var accessToken = credential.accessToken;
    return user
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
}

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name,

    }).then(function () {
        console.log('user name update');
    }).catch(function (error) {
        console.log(error);
    });
}