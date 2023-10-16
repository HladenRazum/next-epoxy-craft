"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { addProduct, uploadImage, uploadSelectedImages } from "@/lib/firebase";
import { ResponseStatuses } from "@/lib/constants";
import { ErrorMessage } from "@hookform/error-message";
import { addProductFormSchema, loginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export type FormFields = {
  type: EpoxyProductType;
  name: string;
  wood: string;
  resin: string;
  mainImage: File[];
  images: File[];
  dimensions: Dimensions;
};

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    const mainImageFile = data.mainImage[0];
    // 1. Upload main image and get downloadUrl
    const uploadMainImageResponse = await uploadImage(mainImageFile);
    // 2. Upload other images and add their downloadUrls to imagesUrls array
    const otherImagesUrls = await uploadSelectedImages(data.images);
    // 3. Upload the new product
    const product: Omit<EpoxyProduct, "id"> = {
      type: data.type ?? "cutting-board",
      name: data.name,
      mainImageUrl: uploadMainImageResponse.downloadUrl || "",
      imagesUrls: otherImagesUrls,
      properties: {
        materials: {
          resin: [],
          wood: [],
        },
        dimensions: {
          width: data.dimensions.width,
          height: data.dimensions.height,
          thickness: data.dimensions.thickness,
          heightFromFloor: data.dimensions.heightFromFloor,
        },
      },
    };
    // TODO: add selected resin and wood to the product object
    const response = await addProduct(product);
    if (response.status === ResponseStatuses.SUCCESS) {
      console.log("Продукта е добавен към базата");
    } else {
      console.error("Грешка при създаването на продукта. Моля опитайте отново");
    }
    reset();
    // 4. ??? Notify the user and give a link to the new page
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[500px] bg-indigo-200 p-2 rounded text-black"
    >
      <h2 className="text-xl text-primary">Добави продукт</h2>
      <div className="mb-1">
        <label htmlFor="name">Име на продукта: </label>
        <input {...register("name")} type="text" id="name" />
        <ErrorMessage name="name" errors={errors} />
      </div>

      <select
        title="Product type"
        className="text-black mb-1"
        {...register("type")}
        id="type"
      >
        <option value="table">маса</option>
        <option value="cutting-board">дъска за рязане</option>
        <option value="table-top">плот</option>
      </select>
      <hr className="my-3" />
      <div>
        <h3 className="error-field">Материали</h3>
        <div className="mb-1">
          <label htmlFor="wood">Дърво: </label>
          <input type="text" id="wood" {...register("wood")} />
        </div>
        <div className="mb-1">
          <label htmlFor="resin">Смола: </label>
          <input type="text" id="resin" {...register("resin")} />
        </div>
      </div>
      <hr className="my-3" />
      <div>
        <h3 className="error-field">Размери в сантиметри</h3>
        <div className="mb-1">
          <label htmlFor="width">Ширина: </label>
          <input
            className="max-w-min"
            type="number"
            {...register("dimensions.width")}
            id="width"
            min={1}
            max={10000}
            step={1}
            defaultValue={90}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="length">Дължина: </label>
          <input
            className="max-w-min"
            type="number"
            {...register("dimensions.height")}
            id="length"
            min={1}
            max={10000}
            step={1}
            defaultValue={120}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="thickness">Дебелина: </label>
          <input
            className="max-w-min"
            type="number"
            {...register("dimensions.thickness")}
            id="thickness"
            min={0.1}
            max={100}
            step={0.1}
            defaultValue={5}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="height-from-floor">Височина от пода: </label>
          <input
            className="max-w-min"
            type="number"
            {...register("dimensions.heightFromFloor")}
            id="height-from-floor"
            min={1}
            max={10000}
            step={1}
            defaultValue={70}
          />
        </div>
      </div>
      <hr className="my-3" />
      <div className="mb-1">
        <label htmlFor="mainImage">
          Главна снимка: <br />
        </label>
        <input
          type="file"
          {...register("mainImage", {
            required: "Главната снимка е задължителна",
          })}
          id="mainImage"
          accept="image/*"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="images">
          Допълнителни снимки: <br />
          <input
            type="file"
            multiple
            {...register("images")}
            id="images"
            accept="image/*"
          />
        </label>
      </div>
      <button
        type="submit"
        className="bg-primary btn text-white disabled:bg-neutral-500"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Качване към базата данни..." : "Добави"}
      </button>
    </form>
  );
}
