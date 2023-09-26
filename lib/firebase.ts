// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll } from "firebase/storage";
import {
   collection,
   getDocs,
   getFirestore,
   query,
   where,
} from "firebase/firestore";
import { firebaseCofig } from "./firebase.config";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseCofig);
const db = getFirestore(app);

const storage = getStorage();
const listRef = ref(storage, "images");

// const analytics = getAnalytics(app);

export default async function getData() {
   //   const ref = collection(db, "products");
   //   const q = query(
   //     collection(db, "products"),
   //     where("name", "==", "emerald dreams")
   //   );
   //   const qSnapShot = await getDocs(q);
   //   qSnapShot.forEach((doc) => {
   //     // doc.data() is never undefined for query doc snapshots
   //     console.log(doc.id, " => ", doc.data());
   //   });
}
