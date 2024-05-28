import { initializeApp } from "firebase/app"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore"
import { v4 } from "uuid"
import { firebaseCofig } from "./firebase.config"
import { FirebaseCollections, ResponseStatuses } from "./constants"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { EpoxyProduct } from "@/types/product"

const app = initializeApp(firebaseCofig)
const db = getFirestore(app)

export async function uploadImage(image: File, folderName: string) {
  const storage = getStorage()
  const imageRef = ref(
    storage,
    `${FirebaseCollections.STORAGE_IMAGES}/${folderName}/${image.name}`
  )

  let response
  try {
    let snapshot = await uploadBytes(imageRef, image)
    if (snapshot) {
      const downloadUrl = await getDownloadURL(imageRef)

      response = {
        status: ResponseStatuses.SUCCESS,
        message: "Снимката е качена успешно.",
        downloadUrl,
      }
    } else {
      throw new Error("Грешка при качването на снимката.")
    }
  } catch (error) {
    response = {
      status: ResponseStatuses.ERROR,
      message: JSON.stringify(error, null, 1),
    }
  }

  return response
}

export async function uploadSelectedImages(images: File[], folderName: string) {
  let imagesUrls: string[] = []
  let uploadFilesPromises = []

  for (const fileImage of images) {
    uploadFilesPromises.push(uploadImage(fileImage, folderName))
  }

  await Promise.all([...uploadFilesPromises]).then((values) => {
    if (values.some((value) => value.status === ResponseStatuses.ERROR)) {
      console.log(
        "Грешка при качването на някоя от снимките към базата. Моля опитайте отново."
      )
    } else {
      values.forEach((val) => {
        if (val.downloadUrl) {
          imagesUrls.push(val.downloadUrl)
        }
      })
    }
  })

  return imagesUrls
}

export async function getAllProductIds() {
  let productsIds: string[] = []
  const q = query(collection(db, FirebaseCollections.FIRESTORE_DOCUMENTS))
  const qSnapShot = await getDocs(q)

  qSnapShot.forEach((doc) => {
    productsIds.push(doc.get("id"))
  })

  return productsIds
}

export type HomepageProduct = {
  id: string
  src: string
  name: string
}

export async function updateProductsImages(
  productId: string,
  mainImageUrl: string,
  otherImages: string[]
) {
  const docRef = doc(db, FirebaseCollections.FIRESTORE_DOCUMENTS, productId)
  const docSnap = await updateDoc(docRef, {
    mainImageUrl,
    imagesUrls: [...otherImages],
  })

  return docSnap
}

export async function getProductById(productId: string): Promise<EpoxyProduct> {
  const docRef = doc(db, FirebaseCollections.FIRESTORE_DOCUMENTS, productId)
  const docSnap = await getDoc(docRef)
  return docSnap.data() as EpoxyProduct
}

export async function getAllProducts() {
  let products: HomepageProduct[] = []
  const q = query(collection(db, FirebaseCollections.FIRESTORE_DOCUMENTS))
  const qSnapShot = await getDocs(q)

  qSnapShot.forEach((doc) => {
    let product = {}
    Object.assign(product, {
      id: doc.get("id"),
      src: doc.get("mainImageUrl"),
      name: doc.get("name"),
    })

    products.push(product as HomepageProduct)
  })

  return products
}

export async function addProduct(product: Omit<EpoxyProduct, "id">) {
  const id = v4()

  const newProduct: EpoxyProduct = {
    ...product,
    id,
  }

  try {
    await setDoc(
      doc(db, FirebaseCollections.FIRESTORE_DOCUMENTS, id),
      newProduct
    )
    return {
      status: ResponseStatuses.SUCCESS,
      message: "Продуктът е създаден.",
      productId: id,
    }
  } catch (err: any) {
    return {
      status: ResponseStatuses.ERROR,
      message: err.message || JSON.stringify(err, null, 1),
      productId: null,
    }
  }
}

export async function userExistsInFirebase(user: User): Promise<boolean> {
  // Check users collection in Firebase and look for the user by username
  const usersRef = collection(db, FirebaseCollections.USERS)
  const q = query(usersRef, where("username", "==", user.username), limit(1))
  const querySnapshot = await getDocs(q)

  // If the username exists, compare passwords
  if (querySnapshot.docs.length > 0) {
    const password = querySnapshot.docs.at(0)?.get("password")
    return password === user.password
  } // User not found

  return false
}
