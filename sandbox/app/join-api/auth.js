import { app } from "../core.js";

import {
    getAuth, // https://firebase.google.com/docs/reference/js/auth.md#getauth
    applyActionCode, // https://firebase.google.com/docs/reference/js/auth.md#applyactioncode
    checkActionCode, // https://firebase.google.com/docs/reference/js/auth.md#checkactioncode
    confirmPasswordReset, // https://firebase.google.com/docs/reference/js/auth.md#confirmpasswordreset
    createUserWithEmailAndPassword, // https://firebase.google.com/docs/reference/js/auth.md#createuserwithemailandpassword
    onAuthStateChanged, // https://firebase.google.com/docs/reference/js/auth.md#onauthstatechanged
    sendPasswordResetEmail, // https://firebase.google.com/docs/reference/js/auth.md#sendpasswordresetemail
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

/**
 * @reference https://firebase.google.com/docs/reference/js/auth.persistence.md#persistence_interface
 * @type { 'SESSION' | 'LOCAL' | 'NONE' }
 */
const AUTH_PERSISTENCE = 'SESSION';

/**
 * @reference https://firebase.google.com/docs/reference/js/auth.auth.md#auth_interface
 * @type {Auth}
 */
const auth = getAuth(app);

auth.setPersistence(AUTH_PERSISTENCE);

/**
 * @reference https://firebase.google.com/docs/reference/js/auth.auth.md#authonauthstatechanged
 * @type {Unsubscribe}
 */
const unsubscribe = auth.onAuthStateChanged(handleAuthStateChange);

/**
 *
 * @param {nextOrObserver: NextOrObserver<User | null>} newAuthState
 */
function handleAuthStateChange(newAuthState) {
    console.log(newAuthState);
}

/**
 * @reference https://firebase.google.com/docs/reference/js/auth.auth.md#authsignout
 * @returns {Promise<void>}
 */
export function signOut() {
    return auth.signOut();
}


/**
 * @reference https://firebase.google.com/docs/reference/js/auth.auth.md#authupdatecurrentuser
 * @param {User | null} user
 * @returns {Promise<void>}
 */
export function updateCurrentUser(user) {
    return auth.updateCurrentUser();
}