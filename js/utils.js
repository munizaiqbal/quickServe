import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import { db } from "./firebase.config.js";


// ================================
// ADD DOCUMENT
// ================================

export async function addDocument(collectionName, data) {
  try {
    const docRef = await addDoc(
      collection(db, collectionName),
      {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    );

    return docRef.id;

  } catch (error) {
    console.error("ADD DOCUMENT ERROR:", error);
    throw error;
  }
}


// ================================
// GET SINGLE DOCUMENT
// ================================

export async function getDocument(collectionName, documentId) {
  try {
    const documentRef = doc(
      db,
      collectionName,
      documentId
    );

    const snapshot = await getDoc(documentRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data()
    };

  } catch (error) {
    console.error("GET DOCUMENT ERROR:", error);
    throw error;
  }
}


// ================================
// GET COLLECTION
// ================================

export async function getCollection(collectionName) {
  try {
    const snapshot = await getDocs(
      collection(db, collectionName)
    );

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data()
    }));

  } catch (error) {
    console.error("GET COLLECTION ERROR:", error);
    throw error;
  }
}


// ================================
// QUERY COLLECTION
// ================================

export async function queryCollection(
  collectionName,
  field,
  operator,
  value
) {
  try {
    const q = query(
      collection(db, collectionName),
      where(field, operator, value)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data()
    }));

  } catch (error) {
    console.error("QUERY COLLECTION ERROR:", error);
    throw error;
  }
}