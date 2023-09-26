import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll } from "firebase/storage";
import { firebaseCofig } from "./firebase.config";

initializeApp(firebaseCofig);
const storage = getStorage();
const listRef = ref(storage, "images");

export default async function getAllImages() {
   let items: FirebaseImage[] = [];

   await listAll(listRef)
      .then((res) => {
         res.items.forEach((itemRef) => {
            items.push({
               name: itemRef.name,
               url: itemRef.fullPath,
            });
         });
      })
      .catch((error) => {
         console.log(error);
      });

   return {
      items,
      bucket: listRef.bucket,
   };
}
