import { XMarkIcon } from "@heroicons/react/24/solid";
import "./styles.css";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";

const ProductDetail = (props) => {
  const context = useContext(ShoppingCartContext);
  return (
    <aside
      className={`${
        context.isProductDetailOpen ? "flex" : "hidden"
      } product-detail flex flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detail</h2>
        <div onClick={() => context.closeProductDetail()}>
          <XMarkIcon className="h-6 w-6 text-black-500 cursor-pointer" />
        </div>
      </div>
      <figure className="px-6">
        <img
          className="w-full h-full max-w-[20rem] max-h-[20rem] rounded-lg"
          src={context.productToShow.images?.[0]}
          alt={context.productToShow?.title}
        />
        <p className="flex flex-col p-6">
          <span className="font-medium text-2xl">
            $ {context.productToShow?.price}
          </span>
          <span className="font-medium text-md">
            {context.productToShow?.title}
          </span>
          <span className="font-light text-sm">
            {context.productToShow?.description}
          </span>
        </p>
      </figure>
    </aside>
  );
};

export default ProductDetail;
