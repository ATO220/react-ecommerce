import { XMarkIcon } from "@heroicons/react/24/solid";
import "./styles.css";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../OrderCard";
import { totalPrice } from "../../utils";
import { Link } from "react-router-dom";

const CheckoutSideMenu = (props) => {
  const context = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id !== id
    );
    context.setCartProducts(filteredProducts);
    context.setCount(context.count - 1);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: new Date(),
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts),
    };

    context.setOrder([...context.order, orderToAdd]);
    context.setCartProducts([]);
    context.closeCheckoutSideMenu();
  };
  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "flex" : "hidden"
      } checkout-side-menu flex flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <div onClick={() => context.closeCheckoutSideMenu()}>
          <XMarkIcon className="h-6 w-6 text-black-500 cursor-pointer" />
        </div>
      </div>
      <div className="p-6 overflow-y-scroll flex-1">
        {context.cartProducts?.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.images?.[0]}
            price={product.price}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="px-6 mb-6">
        <p className="flex justify-between items-center mb-2">
          <span>Total:</span>
          <span className="font-medium text-lg">
            ${totalPrice(context.cartProducts)}
          </span>
        </p>
        <Link to="/my-orders/last">
          <button
            className="bg-black py-3 text-white w-full rounded-md mt-3"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;
