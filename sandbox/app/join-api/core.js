import { firebaseConfig } from "./config.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
/**
 * @reference https://firebase.google.com/docs/reference/js/app.firebaseapp.md#firebaseapp_interface
 * @type FirebaseApp
 */
export const app = initializeApp(firebaseConfig);