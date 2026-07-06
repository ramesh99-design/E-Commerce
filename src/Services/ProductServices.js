import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase.js";

export const getProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getProductById = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  }
};

export const productUpsert = async (docId, data) => {
  await setDoc(doc(db, "products", docId), data, { merge: true });
};
