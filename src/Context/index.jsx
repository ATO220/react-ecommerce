import { createContext, useEffect, useState } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  // Shopping Cart - Increment quantity
  const [count, setCount] = useState(0);

  // Product Detail - Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);
  useState;

  // Checkout Side Menu - Open/Close
  const [isCheckoutSideMenuOpen, setisCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setisCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setisCheckoutSideMenuOpen(false);
  useState;

  //  Product Detail - Show product
  const [productToShow, setProductToShow] = useState({});

  // Shopping Cart - Add products to cart
  const [cartProducts, setCartProducts] = useState([]);

  // Shopping Cart - Order
  const [order, setOrder] = useState([]);

  // Get products
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  const [searchByTitle, setSearchByTitle] = useState(null);
  const [searchByCategory, setSearchByCategory] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products"
        );
        const data = await response.json();
        setItems(data);
        const allCategories = Array.from(
          new Set(data.map((item) => item.category.name))
        );
        setCategories(allCategories);
      } catch (error) {
        console.error(`Failed fetch for get products : ${error}`);
      }
    };

    fetchData();
  }, []);

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(
      (item) =>
        item.category.name.toLowerCase() === searchByCategory.toLowerCase()
    );
  };

  const searchBy = (searchType, items, searchByTitle, searchByCategory) => {
    switch (searchType) {
      case "BY_TITLE":
        return filteredItemsByTitle(items, searchByTitle);
      case "BY_CATEGORY":
        return filteredItemsByCategory(items, searchByCategory);
      case "BY_TITLE_AND_CATEGORY":
        return filteredItemsByTitle(
          filteredItemsByCategory(items, searchByCategory),
          searchByTitle
        );
      default:
        return items;
    }
  };

  useEffect(() => {
    if (searchByTitle && searchByCategory)
      setFilteredItems(
        searchBy(
          "BY_TITLE_AND_CATEGORY",
          items,
          searchByTitle,
          searchByCategory
        )
      );
    if (searchByTitle && !searchByCategory)
      setFilteredItems(
        searchBy("BY_TITLE", items, searchByTitle, searchByCategory)
      );
    if (!searchByTitle && searchByCategory)
      setFilteredItems(
        searchBy("BY_CATEGORY", items, searchByTitle, searchByCategory)
      );
    if (!searchByTitle && !searchByCategory)
      setFilteredItems(searchBy(null, items, searchByTitle, searchByCategory));
  }, [items, searchByTitle, searchByCategory]);

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        setFilteredItems,
        searchByCategory,
        setSearchByCategory,
        categories,
        setCategories,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
