import { ChevronRightIcon } from "@heroicons/react/24/solid";

const OrdersCard = (props) => {
  const { totalPrice, totalProducts } = props;
  return (
    <div className="flex justify-between items-center mb-3 border border-black rounded-lg p-4 w-80">
      <p className="flex justify-between w-full">
        <div className="flex flex-col">
          <span className="font-light">
            {new Date().toISOString().split("T")[0]}
          </span>
          <span className="font-light">{totalProducts} articles</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-2xl right-0">$ {totalPrice}</span>
          <ChevronRightIcon className="w-6 h-6 text-black cursor-pointer" />
        </div>
      </p>
    </div>
  );
};

export default OrdersCard;
