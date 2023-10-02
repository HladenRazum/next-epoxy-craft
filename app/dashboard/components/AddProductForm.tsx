"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { addProduct } from "@/lib/firebase";
import { v4 } from "uuid";

type FormFields = {
  name: string;
  type: EpoxyProductType;
  wood: string;
  resin: string;
};

export default function AddProductForm() {
  const { register, handleSubmit, reset } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const id = v4();
    // TODO: Get product info from the state
    const product: EpoxyProduct = {
      id,
      type: data.type,
      name: data.name,
      mainImageUrl: "",
      imagesUrls: [],
      properties: {
        materials: {
          resin: [data.resin],
          wood: [data.wood],
        },
        dimensions: {
          width: 80,
          height: 170,
          thickness: 4.3,
          heightFromFloor: 80,
        },
      },
    };

    const res = await addProduct(product);
    console.log(res);

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[500px] bg-indigo-200 p-2 rounded text-black"
    >
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
      <select className="text-black mb-1" {...register("type")} id="type">
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
      </div>
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
      <button className="bg-primary btn text-white">Добави</button>
    </form>
  );
}
