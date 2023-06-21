import { useContext } from "react";
import Layout from "../../Components/Layout";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../../Components/OrderCard";
import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const params = useParams();
  let index = Number(params.id);
  if (isNaN(index)) index = context.order?.length - 1;
  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-6">
        <Link to="/my-orders" className="absolute left-0">
          <ChevronLeftIcon className="w-5 h-6 text-black cursor-pointer" />
        </Link>
        <h1>My Order</h1>
      </div>
      <div className="flex flex-col w-80">
        {context.order[index]?.products?.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.images?.[0]}
            price={product.price}
          />
        ))}
      </div>
    </Layout>
  );
}

export default MyOrder;
