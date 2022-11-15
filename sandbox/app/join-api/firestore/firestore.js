import { app } from "../core.js";
import {
    getFirestore, // https://firebase.google.com/docs/reference/js/firestore_.md#getfirestore
    collection, // https://firebase.google.com/docs/reference/js/firestore_.md#collection
    getDocs, // https://firebase.google.com/docs/reference/js/firestore_.md#getdocs
    doc, // https://firebase.google.com/docs/reference/js/firestore_.md#doc_3
    getDoc, // https://firebase.google.com/docs/reference/js/firestore_.md#getdoc
    query, // https://firebase.google.com/docs/reference/js/firestore_.md#query
    where, // https://firebase.google.com/docs/reference/js/firestore_.md#where
    orderBy, // https://firebase.google.com/docs/reference/js/firestore_.md#orderby
    limit, // https://firebase.google.com/docs/reference/js/firestore_.md#limit
    addDoc, // https://firebase.google.com/docs/reference/js/firestore_.md#adddoc
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

/**
 * @reference https://firebase.google.com/docs/reference/js/firestore_.firestore.md#firestore_class
 * @type Firestore
 */
const firestore = getFirestore(app);

let contacts;
let users;
let tasks;
let subtasks;
let categories;


/**
 *
 * @param {string} collectionName
 * @return {T[]} List of all Documents in your Database
 */
export async function getCollectionList(collectionName) {
    const collection = getCollection(collectionName);

    /**
     * @reference https://firebase.google.com/docs/reference/js/firestore_.querysnapshot.md#querysnapshot_class
     * @type {Promise<QuerySnapshot<T>>}
     */
    const collectionSnapshot = await getDocs(collection);
    const collectionList = collectionSnapshot.docs.map(doc => doc.data());

    return collectionList;
}

/**
 * @reference https://firebase.google.com/docs/reference/js/firestore_.documentdata.md#documentdata_interface
 * @param {string} collectionName
 * @returns {CollectionReference<DocumentData>}
 */
export function getCollection(collectionName) {
    return collection(firestore, collectionName);
}

/**
 *
 * @param {CollectionReference<DocumentData>} collectionRef
 * @param {T} newDoc
 * @returns {Promise<DocumentReference<T>>}
 */
export async function addNewDoc(collectionRef, newDoc) {
    return await addDoc(collectionRef, newDoc);
}

export async function getDocumentById(collectionName, documentId) {
    const docRef = getDocRef(collectionName, documentId)
    const docSnap = await getDocSnapshot(docRef);
    const docData = getDataFromSnapshot(docSnap);
    return docData;
}

/**
 *
 * @param {string} collectionName
 * @param {string} documentId
 * @returns {DocumentReference<T>}
 */
async function getDocRef(collectionName, documentId) {
    const docRef = doc(firestore, collectionName, documentId);
    return docRef;
}

/**
 *
 * @param {DocumentReference<T>} docRef
 * @returns {Promise<DocumentSnapshot<T>>}
 */
export async function getDocSnapshot(docRef) {
    const docSnap = await getDoc(docRef);
    return docSnap;
}

/**
 *
 * @param {DocumentSnapshot<T>} documentSnapshot
 * @returns {T}
 */
async function getDataFromSnapshot(documentSnapshot) {
    if (documentSnapshot.exists()) {
        return documentSnapshot.data();
    } else {
        // doc.data() will be undefined in this case
        return undefined;
    }
}

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