import { getContacts, setContact, getContactById } from "./firestore/contacts.js";
import { createAccount, logInWithEmailAndPassword } from "./auth.js"

window.getContacts = getContacts;
window.setContact = setContact;
window.getContactById = getContactById;

window.createAccount = createAccount;
window.logInWithEmailAndPassword = logInWithEmailAndPassword;