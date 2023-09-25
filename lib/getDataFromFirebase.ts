import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import app from "./firebase";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

export default async function getDataFromFirebase() {
   const db = getFirestore(app);
   console.log(db);
}

// Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }
