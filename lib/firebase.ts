import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";
import { firebaseCofig } from "./firebase.config";
import { v4 } from "uuid";

const app = initializeApp(firebaseCofig);
const db = getFirestore(app);

export async function getAllProductIds() {
  let productsIds: string[] = [];
  const q = query(collection(db, "products"));
  const qSnapShot = await getDocs(q);

  qSnapShot.forEach((doc) => {
    productsIds.push(doc.get("id"));
  });

  return productsIds;
}

export type HomepageProduct = {
  id: string;
  src: string;
  name: string;
};

export async function getAllProducts() {
  let products: HomepageProduct[] = [];
  const q = query(collection(db, "products"));
  const qSnapShot = await getDocs(q);

  qSnapShot.forEach((doc) => {
    let product = {};
    Object.assign(product, {
      id: doc.get("id"),
      src: doc.get("mainImageUrl"),
      name: doc.get("name"),
    });

    products.push(product as HomepageProduct);
  });

  return products;
}

export async function seedData() {
  const ID = v4();
  const prod1: EpoxyProduct = {
    id: ID,
    type: "table",
    name: "Sunset Orange",
    mainImageUrl: "",
    imagesUrls: [],
    properties: {
      materials: {
        resin: ["Sunset Orange"],
        wood: ["Cherry"],
      },
      dimentions: {
        width: 8_000,
        height: 15_000,
        thickness: 4_400,
        heightFromFloor: 660,
      },
    },
  };

  try {
    await setDoc(doc(db, "products", ID), prod1);
    console.log("Product uploaded");
  } catch (err) {
    console.log(err);
    console.log("Could not update");
  }
}
