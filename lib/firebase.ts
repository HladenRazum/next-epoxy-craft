import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { getStorage, ref, listAll } from "firebase/storage";
import { firebaseCofig } from "./firebase.config";

const app = initializeApp(firebaseCofig);
const storage = getStorage();
const listRef = ref(storage, "images");
const db = getFirestore(app);

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

export async function testFirebase() {
  let data = {};
  const q = query(collection(db, "products"));
  const qSnapShot = await getDocs(q);

  qSnapShot.forEach((doc) => {
    console.log(doc.id);

    Object.assign(data, {
      images: doc.get("images"),
    });

    console.log(data);
  });

  return data;
}
