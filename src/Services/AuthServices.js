import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../Firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export const signup = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await updateProfile(userCredential.user, { displayName: name });
  await setDoc(doc(db, "users", userCredential.user.uid), {
    name,
    email,
    role: "user",
    createdAt: serverTimestamp(),
  });

  return userCredential.user;
};
export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);
