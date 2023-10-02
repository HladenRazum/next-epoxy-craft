import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { firebaseCofig } from "./firebase.config";
import { FirebaseFiles } from "./constants";

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

export async function uploadImage(image: File) {
  const storage = getStorage();
  const folderRef = ref(
    storage,
    `${FirebaseFiles.STORAGE_IMAGES_FOLDER}/${image.name}`
  );

  let response;
  try {
    let snapshot = await uploadBytes(folderRef, image);
    if (snapshot) {
      response = {
        status: "success",
        message: "Image uploaded to storage",
      };
    } else {
      throw new Error("Failde to upload image");
    }
  } catch (error) {
    response = {
      status: "error",
      message: JSON.stringify(error, null, 1),
    };
  }

  return response;
}

export async function getProductById(productId: string): Promise<EpoxyProduct> {
  const docRef = doc(db, FirebaseFiles.FIRESTORE_DOCUMENTS_FOLDER, productId);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as EpoxyProduct;
}

export async function getAllProducts() {
  let products: HomepageProduct[] = [];
  const q = query(collection(db, FirebaseFiles.FIRESTORE_DOCUMENTS_FOLDER));
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

// export async function seedData() {
//   console.log("Seed data");
//   const id = v4();
//   const product: EpoxyProduct = {
//     id,
//     type: "table",
//     name: "Sunset Orange",
//     mainImageUrl: "",
//     imagesUrls: [],
//     properties: {
//       materials: {
//         resin: ["Sunset Orange"],
//         wood: ["Cherry"],
//       },
//       dimensions: {
//         width: 80,
//         height: 170,
//         thickness: 4.3,
//         heightFromFloor: 80,
//       },
//     },
//   };

//   try {
//     await setDoc(doc(db, "products", id), product);
//     console.log("Product uploaded");
//   } catch (err) {
//     console.log(err);
//     console.log("Could not update");
//   }
// }

export async function addProduct(product: EpoxyProduct) {
  const id = v4();

  const newProduct: EpoxyProduct = {
    type: product.type,
    name: product.name,
    mainImageUrl: "",
    imagesUrls: [],
    properties: {
      materials: {
        resin: product.properties.materials.resin,
        wood: product.properties.materials.wood,
      },
      dimensions: {
        width: product.properties.dimensions.width,
        height: product.properties.dimensions.height,
        thickness: product.properties.dimensions.thickness,
        heightFromFloor: product.properties.dimensions.heightFromFloor,
      },
    },
    //  ...product,
    id,
  };

  try {
    await setDoc(
      doc(db, FirebaseFiles.FIRESTORE_DOCUMENTS_FOLDER, id),
      newProduct
    );
    return {
      status: "success",
      message: "Product Created",
      productId: id,
    };
  } catch (err: any) {
    return {
      status: "error",
      message: err.message || JSON.stringify(err, null, 1),
      productId: null,
    };
  }
}
