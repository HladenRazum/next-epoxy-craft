"use client";

import React, { FormEvent } from "react";

export default function AddProductForm() {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // const id = v4();
    // const product: EpoxyProduct = {
    //   id,
    //   type: "table",
    //   name: "Sunset Orange",
    //   mainImageUrl: "",
    //   imagesUrls: [],
    //   properties: {
    //     materials: {
    //       resin: ["Sunset Orange"],
    //       wood: ["Cherry"],
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
      onSubmit={handleSubmit}
      className="w-[500px] bg-indigo-200 p-2 rounded text-black"
    >
      <h2 className="text-xl text-primary">Добави продукт</h2>
      {/* <div className='mb-1'>
        <label htmlFor="name">Име на продукта: </label>
        <input type="text" id='name' name='name' />
      </div>
      <select className='text-black mb-1' name="type" id="type">
        <option value="table">Маса</option>
        <option value="cutting-board">Дъска за рязане</option>
        <option value="table-top">Плот</option>
      </select>

      <div>
        <h3 className="text-primary text-lg">Материали</h3>
        <div className='mb-1'>
          <label htmlFor="wood">Дърво: </label>
          <input type="text" id='wood' name='wood' />
        </div>
        <div className='mb-1'>
          <label htmlFor="resin">Смола: </label>
          <input type="text" id='resin' name='resin' />
        </div>
      </div>
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
