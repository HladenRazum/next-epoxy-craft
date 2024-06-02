"use server"

import { compare } from "bcrypt"
import { initializeApp } from "firebase/app"
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore"
import { firebaseCofig } from "./firebase.config"
import { FirebaseCollections } from "./constants"

const app = initializeApp(firebaseCofig)
const db = getFirestore(app)

export async function userExistsInFirebase(user: User): Promise<boolean> {
  // Check users collection in Firebase and look for the user by username
  const usersRef = collection(db, FirebaseCollections.USERS)
  const q = query(usersRef, where("username", "==", user.username), limit(1))

  const querySnapshot = await getDocs(q)

  if (querySnapshot.docs.length > 0) {
    const password = querySnapshot.docs.at(0)?.get("password")
    const isMatch = await compare(user.password, password)

    return isMatch
  }

  return false
}
