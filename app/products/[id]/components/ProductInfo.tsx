import { getFormattedStringFromArray } from "@/lib/utils"
import { EpoxyProduct } from "@/types/product"

type Props = {
  product: EpoxyProduct
}

export default function ProductInfo({ product }: Props) {
  const woodArr = product.properties.materials.wood
  const resinArr = product.properties.materials.resin
  const dimensions = product.properties.dimensions
  const name = product.name

  return (
    <>
      <h1 className="mb-5 text-xl sm:max-w-[340px] font-normal  sm:text-2xl">
        {name}
      </h1>
      <div className="mb-10 flex flex-col gap-5">
        <div>
          <h2 className="text-accent">Размери</h2>
          <ul>
            <li>
              <span className="text-secondary">дължина</span>:{" "}
              {dimensions.length} см
            </li>
            <li>
              <span className="text-secondary">ширина</span>: {dimensions.width}{" "}
              см
            </li>
            <li>
              <span className="text-secondary">дебелина</span>:{" "}
              {dimensions.thickness} см
            </li>
            <li>
              <span className="text-secondary">височина от пода</span>:{" "}
              {dimensions.heightFromFloor} см
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-accent">Материали</h2>
          <ul>
            <li>
              <span className="text-secondary">дърво</span>:{" "}
              {getFormattedStringFromArray(woodArr)}
            </li>
            <li>
              <span className="text-secondary">смола</span>:{" "}
              {getFormattedStringFromArray(resinArr)}
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
