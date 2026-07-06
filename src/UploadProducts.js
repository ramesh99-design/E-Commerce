import { setDoc, doc } from "firebase/firestore";
import { db } from "./Firebase";
import { electronics, books } from "../src/Data/Dataset";

const UploadProducts = async () => {
  try {
    for (const item of electronics) {
      await setDoc(doc(db, "products", `electronics-${item.id}`), {
        name: item.name,
        category: "electronics",
        price: item.price,
        stock: item.quantityAvailable,
        imageLink: item.imageLink,
        featured: true,
        description: `${item.name} Description`,
      });
    }
    for (const book of books) {
      await setDoc(doc(db, "products", `books-${book.id}`), {
        name: book.title,
        author: book.author,
        imageLink: book.imageLink,
        price: book.price,
        category: "books",
        featured: false,
        stock: book.quantityAvailable,
        description: `${book.title} Description`,
      });
    }
    console.log("Products uploaded successfully");
  } catch (error) {
    console.log("FireStore Error", error);
  }
};

export default UploadProducts;
