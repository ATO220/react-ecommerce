import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/solid";

const Card = (props) => {
  const context = useContext(ShoppingCartContext);
  const showProduct = (productDetail) => {
    context.closeCheckoutSideMenu();
    context.openProductDetail();
    context.setProductToShow(productDetail);
  };

  const addProductToCart = (event, productData) => {
    event.stopPropagation();
    context.setCount(context.count + 1);
    context.setCartProducts([...context.cartProducts, productData]);
    context.closeProductDetail();
    context.openCheckoutSideMenu();
    context;
  };

  const renderIcon = (id) => {
    const isInCard =
      context.cartProducts.filter((product) => product.id === id).length > 0;

    return isInCard ? (
      <button className="absolute top-0 right-0 flex justify-center items-center bg-green-500 w-6 h-6 rounded-full m-2 p-1 text-black/70 text-sm">
        <CheckIcon
          onClick={(event) => event.stopPropagation()}
          className="w-6 h-6 text-white"
        />
      </button>
    ) : (
      <button
        className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1 text-black/70 text-sm"
        onClick={(event) => addProductToCart(event, props.data)}
      >
        <PlusIcon className="w-6 h-6 text-black" />
      </button>
    );
  };

  return (
    <div
      className="bg-white cursor-pointer w-55 h-60 rounded-lg shadow-xl"
      onClick={() => showProduct(props.data)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black/60 font-semibold text-xs m-2 px-3 py-0.5">
          {props.data.category.name}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={props.data.images[0]}
          alt={props.data.title}
        />
        {renderIcon(props.data.id)}
      </figure>
      <p className="flex justify-between">
        <span className="text-sm text-black/50 font-medium m-2">
          {props.data.title}
        </span>
        <span className="text-sm font-semibold m-2">${props.data.price}</span>
      </p>
    </div>
  );
};

export default Card;
