"use client"

import { SubmitHandler, useForm, FormProvider } from "react-hook-form"
import { uploadImage, uploadSelectedImages } from "@/lib/firebase"
import MulitpleOptionsInput from "@/components/organisms/MultipleOptionsInput/MulitpleOptionsInput"
import FormSection from "./FormSection"
import {
  Product,
  addProductFormDefaultValues,
  addProductFormSchema,
} from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"

export default function AddProductForm() {
  const methods = useForm<Product>({
    mode: "all",
    resolver: zodResolver(addProductFormSchema),
    defaultValues: addProductFormDefaultValues,
  })

  const onSubmit: SubmitHandler<Product> = async (data) => {
    console.log("submit")
    return

    const mainImageFile = data.mainImage[0]

    // try {
    //   await Promise.all([uploadImage(mainImageFile), uploadSelectedImages(data.images)]);
    //   console.log("Images uploaded successfully")
    // } catch (error) {
    //   console.error("Error uploading images -" + error);
    // }

    const uploadMainImageResponse = await uploadImage(mainImageFile)
    const otherImagesUrls = await uploadSelectedImages(data.images)

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
    }
    // TODO: add selected resin and wood to the product object
    // const response = await addProduct(product)
    // if (response.status === ResponseStatuses.SUCCESS) {
    //   console.log("Продуктът е добавен към базата")
    //   setNotification({
    //     type: "success",
    //     text: "Продуктът е добавен към базата",
    //   })
    // } else {
    //   console.error("Грешка при създаването на продукта. Моля опитайте отново")
    //   setNotification({
    //     type: "error",
    //     text: "Грешка при създаването на продукта. Моля опитайте отново",
    //   })
    // }
    // reset()
    // 4. ??? Notify the user and give a link to the new page
  }

  // const handleOnAddWoodOption = (value: string) => {
  //   const prevOptions = getValues("materials.wood") || []

  //   if (prevOptions.includes(value)) {
  //     return
  //   }

  //   setValue("materials.wood", [...prevOptions, value], {
  //     shouldValidate: true,
  //     shouldTouch: true,
  //   })
  // }

  // const handleOnAddResinOption = (value: string) => {
  //   const prevOptions = getValues("materials.resin") || []

  //   if (prevOptions.includes(value)) {
  //     return
  //   }

  //   setValue("materials.resin", [...prevOptions, value], {
  //     shouldValidate: true,
  //     shouldTouch: true,
  //   })
  // }

  return (
    <>
      <h2 className="text-xl mb-5">Добави продукт</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full max-w-[600px] bg-blue-200 p-5 rounded text-black"
        >
          <FormSection title="Информация за продукта">
            <div className="flex gap-2 w-full relative">
              <div className="flex-1">
                <label className="text-sm" htmlFor="name">
                  Име на продукта:{" "}
                </label>
                <input
                  className="w-full"
                  {...methods.register("name")}
                  required
                  type="text"
                  id="name"
                />
              </div>
              {methods.formState.errors.name && (
                <span className="text-sm text-red-600 absolute -bottom-5">
                  {methods.formState.errors.name.message}
                </span>
              )}

              <div>
                <label className="text-sm" htmlFor="type">
                  Вид продукт:
                </label>
                <select
                  title="Product type"
                  className="text-black mb-1"
                  {...methods.register("type")}
                  id="type"
                >
                  <option value="table">маса</option>
                  <option value="cutting-board">дъска за рязане</option>
                  <option value="table-top">плот</option>
                </select>
              </div>
            </div>
          </FormSection>

          <FormSection title="Материали">
            <div className="form-cols-row">
              <div className="relative">
                <MulitpleOptionsInput label="Вид дърво" name="materials.wood" />
                {methods.formState.errors.materials?.wood && (
                  <span className="text-sm text-red-600 absolute -bottom-5">
                    {methods.formState.errors.materials?.wood.message}
                  </span>
                )}
              </div>
              <div className="relative">
                <MulitpleOptionsInput
                  label="Вид смола"
                  name="materials.resin"
                />
                {methods.formState.errors.materials?.resin && (
                  <span className="text-sm text-red-600 absolute -bottom-5">
                    {methods.formState.errors.materials?.resin.message}
                  </span>
                )}
              </div>
            </div>
          </FormSection>

          {/* <FormSection title="Размери в сантиметри">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-end">
              <div>
                <label className="text-sm" htmlFor="width">
                  Ширина:{" "}
                </label>
                <input
                  type="number"
                  {...register("dimensions.width")}
                  id="width"
                  min={1}
                  max={10000}
                  step={1}
                  defaultValue={90}
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="length">
                  Дължина:{" "}
                </label>
                <input
                  type="number"
                  {...register("dimensions.height")}
                  id="length"
                  min={1}
                  max={10000}
                  step={1}
                  defaultValue={120}
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="thickness">
                  Дебелина:{" "}
                </label>
                <input
                  type="number"
                  {...register("dimensions.thickness")}
                  id="thickness"
                  min={0.1}
                  max={100}
                  step={0.1}
                  defaultValue={5}
                />
              </div>
              <div>
                <label className="text-sm" htmlFor="height-from-floor">
                  Височина от пода:{" "}
                </label>
                <input
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
          </FormSection> */}

          {/* <FormSection title="Снимки">
          <div className="grid sm:grid-cols-2 gap-2 grid-cols-1">
            <div>
              <label htmlFor="mainImage" className="text-sm">
                Главна снимка: *<br />
              </label>
              <input
                className="max-w-full"
                type="file"
                {...register("mainImage", {
                  required: "Главната снимка е задължителна",
                })}
                id="mainImage"
                accept="image/*"
              />
            </div>
            <div>
              <label htmlFor="images" className="text-sm">
                Допълнителни снимки:
                <br />
              </label>
              <input
                className="max-w-full"
                type="file"
                multiple
                {...register("images")}
                id="images"
                accept="image/*"
              />
            </div>
          </div>
        </FormSection> */}

          <div className="mt-5">
            <button
              type="submit"
              className="bg-black btn  text-white disabled:bg-neutral-500"
              disabled={methods.formState.isSubmitting}
            >
              {methods.formState.isSubmitting
                ? "Качване към базата данни..."
                : "Добави продукт"}
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}
