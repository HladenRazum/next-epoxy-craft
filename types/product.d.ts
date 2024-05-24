type EpoxyProduct = {
  id: string
  name: string
  type: EpoxyProductType
  properties: ProductProperties
  mainImageUrl: string
  imagesUrls: string[]
}

// // type Materials = {
// //   resin: string[];
// //   wood: string[];
// // };

// type ProductProperties = {
//   dimensions: Dimensions;
//   materials: Materials;
//   weight?: number;
// };

// type EpoxyProductType = "table" | "cutting-board" | "table-top";
