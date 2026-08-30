
import { db } from "./firebase.config.js";

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

export async function getProviders() {
  const providersRef = collection(db, "providers");

  const snapshot = await getDocs(providersRef);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}

export async function getProvidersByCategory(category) {
  const providersRef = collection(db, "providers");

  const q = query(
    providersRef,
    where("category", "==", category)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}

export async function getProvider(providerId) {
  const providerRef = doc(
    db,
    "providers",
    providerId
  );

  const snapshot = await getDoc(providerRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

export async function createProvider(providerData) {
  const providersRef = collection(db, "providers");

  const docRef = await addDoc(providersRef, {
    ...providerData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function createBooking(bookingData) {
  const bookingsRef = collection(db, "bookings");

  const docRef = await addDoc(bookingsRef, {
    ...bookingData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

