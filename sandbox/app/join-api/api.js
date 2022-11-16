import { getContacts, setContact, getContactById } from "./firestore/contacts.js";
import { signOut } from "./auth.js"

window.getContacts = getContacts;
window.setContact = setContact;
window.getContactById = getContactById;
window.signOut = signOut;