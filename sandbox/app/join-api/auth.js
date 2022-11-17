import { app } from "./core.js";

import {
    getAuth, // https://firebase.google.com/docs/reference/js/auth.md#getauth
    applyActionCode, // https://firebase.google.com/docs/reference/js/auth.md#applyactioncode
    checkActionCode, // https://firebase.google.com/docs/reference/js/auth.md#checkactioncode
    confirmPasswordReset, // https://firebase.google.com/docs/reference/js/auth.md#confirmpasswordreset
    createUserWithEmailAndPassword, // https://firebase.google.com/docs/reference/js/auth.md#createuserwithemailandpassword
    onAuthStateChanged, // https://firebase.google.com/docs/reference/js/auth.md#onauthstatechanged
    sendPasswordResetEmail, // https://firebase.google.com/docs/reference/js/auth.md#sendpasswordresetemail
    signInAnonymously, // https://firebase.google.com/docs/reference/js/auth.md#signinanonymously
    signInWithEmailAndPassword, // https://firebase.google.com/docs/reference/js/auth.md#signinwithemailandpassword
    signOut, // https://firebase.google.com/docs/reference/js/auth.md#signout
    updateCurrentUser, // https://firebase.google.com/docs/reference/js/auth.md#updatecurrentuser
    verifyPasswordResetCode, // https://firebase.google.com/docs/reference/js/auth.md#verifypasswordresetcode
    deleteUser, // https://firebase.google.com/docs/reference/js/auth.md#deleteuser
    reload, // https://firebase.google.com/docs/reference/js/auth.md#reload
    updateEmail, // https://firebase.google.com/docs/reference/js/auth.md#updateemail
    updatePassword, // https://firebase.google.com/docs/reference/js/auth.md#updatepassword
    updatePhoneNumber, // https://firebase.google.com/docs/reference/js/auth.md#updatephonenumber
    updateProfile, // https://firebase.google.com/docs/reference/js/auth.md#updateprofile
    getAdditionalUserInfo, // https://firebase.google.com/docs/reference/js/auth.md#getadditionaluserinfo
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

/**
 * @reference https://firebase.google.com/docs/reference/js/auth.persistence.md#persistence_interface
 * @type { 'SESSION' | 'LOCAL' | 'NONE' }
 */
const AUTH_PERSISTENCE = 'SESSION';

/**
 * @references { https://firebase.google.com/docs/reference/js/auth.auth.md#auth_interface | https://firebase.google.com/docs/reference/js/auth }
 * @type {Auth}
 */
const auth = getAuth(app);

/**
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>}
 */
export async function createAccount(email, password){
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    return userCredentials;
}

/**
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>}
 */
export async function logInWithEmailAndPassword(email, password){
   const userCredentials = await signInWithEmailAndPassword(auth, email, password);
   return userCredentials;
}