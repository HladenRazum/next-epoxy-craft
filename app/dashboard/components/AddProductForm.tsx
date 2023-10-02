"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { addProduct } from "@/lib/firebase";
import { v4 } from "uuid";
import { useState } from "react";
import Image from "next/image";
import { FirebaseFiles } from "@/lib/constants";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

type FormFields = {
  name: string;
  type: EpoxyProductType;
  wood: string;
  resin: string;
  mainImage: File[];
  images: File[];
};

export default function AddProductForm() {
  const [statusMessage, setStatusMessage] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState("");

  async function uploadImage(file: File) {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `${FirebaseFiles.STORAGE_IMAGES_FOLDER}/${file.name}`
    );

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // // Observe state change events such as progress, pause, and resume
        // // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        // }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      async () => {
        // Handle successful uploads on complete
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setMainImageUrl(downloadUrl);
      }
    );
  }

  const { register, handleSubmit, reset } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    const mainImageFile = data.mainImage[0];
    await uploadImage(mainImageFile);

    setStatusMessage("");
    // setStatusMessage(response.message);

    // const id = v4();
    // const product: EpoxyProduct = {
    //   id,
    //   type: data.type,
    //   name: data.name,
    //   mainImageUrl: "",
    //   imagesUrls: [],
    //   properties: {
    //     materials: {
    //       resin: [data.resin],
    //       wood: [data.wood],
    //     },
    //     dimensions: {
    //       width: 80,
    //       height: 170,
    //       thickness: 4.3,
    //       heightFromFloor: 80,
    //     },
    //   },
    // };
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[500px] bg-indigo-200 p-2 rounded text-black"
    >
      <p className="text-red-700 mb-2">{mainImageUrl}</p>
      <div>
        <p className="text-red-500">{statusMessage}</p>
      </div>
      <h2 className="text-xl text-primary">Добави продукт</h2>
      <div className="mb-1">
        <label htmlFor="name">Име на продукта: </label>
        <input
          {...register("name", {
            required: true,
          })}
          type="text"
          id="name"
        />
      </div>
      <div className="mb-1">
        <label htmlFor="mainImage">Главна снимка: </label>
        <input
          type="file"
          {...register("mainImage")}
          id="mainImage"
          accept="image/*"
          // onChange={(e) => {
          //   if (e.target.files && e.target.files.length > 0) {
          //     const file = e.target.files[0];
          //     const url = URL.createObjectURL(file);
          //   }
          // }}
        />
      </div>
      {/* <select className="text-black mb-1" {...register("type")} id="type">
        <option value="table">маса</option>
        <option value="cutting-board">дъска за рязане</option>
        <option value="table-top">плот</option>
      </select>
      <div>
        <h3 className="text-primary text-lg">Материали</h3>
        <div className="mb-1">
          <label htmlFor="wood">Дърво: </label>
          <input type="text" id="wood" {...register("wood")} />
        </div>
        <div className="mb-1">
          <label htmlFor="resin">Смола: </label>
          <input type="text" id="resin" {...register("resin")} />
        </div>
      </div> */}
      {/*
     

      
      <div>
        <h3 className="text-primary text-lg">Размери в сантиметри</h3>
        <div className='mb-1'>
          <label htmlFor="width">Ширина: </label>
          <input type="number" name='width' id='width' />
        </div>
        <div className='mb-1'>
          <label htmlFor="length">Дължина: </label>
          <input type="number" name='length' id='length' />
        </div>
        <div className='mb-1'>
          <label htmlFor="thickness">Дебелина: </label>
          <input type="number" name='thickness' id='thickness' />
        </div>
        <div className='mb-1'>
          <label htmlFor="height-from-floor">Височина от пода: </label>
          <input type="number" name='height-from-floor' id='height-from-floor' />
        </div>
      </div> */}
      {/* <div className="mb-1">
        <label htmlFor="images">Добави допълнителни снимки</label>
        <input
          type="file"
          multiple
          {...register("images")}
          id="images"
          accept="image/*"
        />
      </div> */}
      <button className="bg-primary btn text-white">Добави</button>
    </form>
  );
}
