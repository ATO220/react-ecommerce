import { useContext } from "react";
import Card from "../../Components/Card";
import Layout from "../../Components/Layout";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";
import { useParams } from "react-router-dom";

function Home() {
  const context = useContext(ShoppingCartContext);

  const params = useParams();
  const category = params?.category;
  context.setSearchByCategory(category);
  const renderView = () => {
    if (context.searchByTitle?.length > 0 || context.searchByCategory) {
      if (context?.filteredItems?.length > 0) {
        return context?.filteredItems?.map((item) => {
          return <Card key={item.id} data={item} />;
        });
      } else {
        return (
          <div className="flex justify-center">
            <img
              className="rounded-3xl"
              src="https://ih1.redbubble.net/image.1995557870.8597/st,small,507x507-pad,600x600,f8f8f8.jpg"
              alt="dificutades-tecnicas"
            />
          </div>
        );
      }
    } else {
      return context?.items?.map((item) => {
        return <Card key={item.id} data={item} />;
      });
    }
  };

  return (
    <Layout className="bg-red-100">
      <div className="flex items-center justify-center relative w-80">
        <h1 className="font-medium text-lg mb-4">Exclusive Products</h1>
      </div>
      <input
        type="text"
        placeholder="Search a product"
        className=" rounded-lg border borderblack w-80 p-4 mb-4 focus:outline-none"
        onChange={(event) => context.setSearchByTitle(event.target.value)}
      />
      <div
        className={`${
          context.searchByTitle?.length > 0 &&
          context.filteredItems?.length === 0
            ? ""
            : "grid gap-4 grid-cols-4"
        } w-full max-w-screen-lg`}
      >
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  );
}

export default Home;
