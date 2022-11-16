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
    return getCollectionListFromSnapshot(collectionSnapshot);
}

function getCollectionListFromSnapshot(collectionSnapshot) {
    const collectionList = collectionSnapshot.docs.map((docSnap) => getMapIdToDataFromSnapshot(docSnap));
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

/**
 *
 * @param {string} collectionName
 * @param {string} documentId
 * @returns {T} Document from Firestore Collection
 */
export async function getDocumentById(collectionName, documentId) {
    const docRef = getDocRef(collectionName, documentId)
    const docSnap = await getDocSnapshot(docRef);
    const document = getMapIdToDataFromSnapshot(docSnap);
    return document;

}

/**
 *  Appends Id to Document
 * @param {DocumentSnapshot<T>} documentSnapshot
 * @returns {T}
 */
function getMapIdToDataFromSnapshot(documentSnapshot) {
    const docData = getDataFromSnapshot(documentSnapshot);
    docData.id = getIdFromSnapshot(documentSnapshot);
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
 *
 * @param {DocumentSnapshot<T>} documentSnapshot
 * @returns {string}
 */
async function getIdFromSnapshot(documentSnapshot) {
    if (documentSnapshot.exists()) {
        return documentSnapshot.id;
    } else {
        // doc.data() will be undefined in this case
        return undefined;
    }
}

/**
 *
 * @param {string | FieldPath} fieldPath
 * @param {WhereFilterOp} opStr
 * @param {unknown} value
 * @param {Function} queryFn any firestore query function
 * @returns {QueryConstraint}
 */
export function createWereQueryConstraint(fieldPath, opStr, value) {
    return where(fieldPath, opStr, value);
}