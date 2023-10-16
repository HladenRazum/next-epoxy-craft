import { getFormattedStringFromArray } from "@/lib/utils";

type Props = {
  product: EpoxyProduct;
};

export default function ProductInfo({ product }: Props) {
  const woodArr = product.properties.materials.wood;
  const resinArr = product.properties.materials.resin;
  const dimensions = product.properties.dimensions;

  return (
    <>
      <h1 className="font-bold text-primary">{product.name}</h1>
      <p className="text-xl mb-5">Маса от епоксидна смола Ocean Blue и орех</p>
      <div className="mb-5">
        <h2 className="text-lg">Материали</h2>
        <ul>
          <li>
            <span className="underline text-red-300">дърво</span>:{" "}
            {getFormattedStringFromArray(woodArr)}
          </li>
          <li>
            <span className="underline text-red-300">смола</span>:{" "}
            {getFormattedStringFromArray(resinArr)}
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-lg">Размери</h2>
        <ul>
          <li>
            <span className="underline text-red-300">дължина</span>:{" "}
            {dimensions.height} см
          </li>
          <li>
            <span className="underline text-red-300">ширина</span>:{" "}
            {dimensions.width} см
          </li>
          <li>
            <span className="underline text-red-300">дебелина</span>:{" "}
            {dimensions.thickness} см
          </li>
        </ul>
      </div>
    </>
  );
}
