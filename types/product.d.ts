type EpoxyProduct = {
  id: string;
  name: string;
  type: EpoxyProductType;
  properties: ProductProperties;
  mainImageUrl: string;
  imagesUrls: string[];
};

type Dimensions = {
  width: number;
  height: number;
  thickness: number;
  heightFromFloor: number;
};

type Materials = {
  resin: string[];
  wood: string[];
};

type ProductProperties = {
  dimensions: Dimensions;
  materials: Materials;
  weight?: number;
};

type EpoxyProductType = "table" | "cutting-board";
