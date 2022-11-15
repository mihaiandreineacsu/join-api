import {
    getCollectionList,
    getCollection,
    addNewDoc,
    getDocSnapshot,
    getDocumentById
} from './firestore.js';

/**
 * Get all of contacts from your database
 * @returns {T[]}
 */
export const getContacts = async () => {
    const contacts = getCollectionList('contacts');
    return contacts;
};

/**
 *
 * @param {T} newContact
 * @returns {T}
 */
export const setContact = async (newContact) => {
    const contactsRef = getCollection('contacts');
    const newDocRef = await addNewDoc(contactsRef, newContact);
    const docSnap = await getDocSnapshot(newDocRef);
    return docSnap.data();
}

/**
 * Get contact by Id from your database
 * @param {string} contactId
 * @returns {T}
 */
export const getContactById = async (contactId) => {
    const contact = getDocumentById('contacts', contactId);
    return contact;
};

/**
 * Get multiple documents from a collection
 * @param {string} field - Should be a field name present in contact object
 * @param {string} condition - compare sign that proves @filed and @value
 * @param {any} value - value to query collection
 */
window.getContactsWhere = async (field, condition, value) => {
    const q = query(collection(firestore, "contacts"), where(field, condition, value));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });

    return
}

/**
 *
 * @param {string} fieldToOrderBy
 * @param {number} limit
 */
window.getContactsOrderBy = async (fieldToOrderBy, orderDirection, limit) => {
    const q = query(collection(firestore, "contacts"), orderBy(fieldToOrderBy, orderDirection), limit(limit));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
}