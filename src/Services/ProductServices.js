import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase.js";
import { electronics, books } from "../Data/Dataset.jsx";

// Normalize local dataset as fallback in case Firestore is unreachable or empty
const getFallbackProducts = () => {
  const localElectronics = electronics.map((item) => ({
    id: `electronics-${item.id}`,
    name: item.name,
    category: "electronics",
    price: item.price,
    stock: item.quantityAvailable,
    imageLink: item.imageLink,
    featured: true,
    rating: 4.8,
    reviewsCount: 124,
    description: `High performance ${item.name} built with premium components, designed for productivity and seamless everyday use.`,
  }));

  const localBooks = books.map((item) => ({
    id: `books-${item.id}`,
    name: item.title,
    title: item.title,
    author: item.author,
    category: "books",
    price: item.price,
    stock: item.quantityAvailable,
    imageLink: item.imageLink,
    featured: false,
    rating: 4.9,
    reviewsCount: 89,
    description: `A celebrated masterpiece by ${item.author}. Immerse yourself in unforgettable storytelling and rich, timeless prose.`,
  }));

  return [...localElectronics, ...localBooks];
};

export const getProducts = async () => {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    if (!snapshot.empty) {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (items.length > 0) return items;
    }
    return getFallbackProducts();
  } catch (error) {
    console.warn("Firestore fetch failed, using fallback dataset:", error.message);
    return getFallbackProducts();
  }
};

export const getProductById = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    }
  } catch (error) {
    console.warn("Firestore getProductById error, checking fallback:", error.message);
  }

  // Check fallback dataset
  const fallbackAll = getFallbackProducts();
  const match = fallbackAll.find((p) => p.id === id || String(p.id).endsWith(`-${id}`));
  return match || null;
};

export const productUpsert = async (docId, data) => {
  await setDoc(doc(db, "products", docId), data, { merge: true });
};
