import { createContext, useEffect, useState } from "react";

export const ShoppingCartContext = createContext();
// eslint-disable-next-line react/prop-types
export const ShoppingCartProvider = ({ children }) => {
  // Shopping Cart - Increment quantity
  const [count, setCount] = useState(0);

  // Product Detail - Open/Close
  const [isProducDetailOpen, setIsProducDetailOpen] = useState(false);
  const openProductDetail = () => setIsProducDetailOpen(true);
  const closeProductDetail = () => setIsProducDetailOpen(false);

  // Checkout Side Menu . Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  // Product Detail Show product
  const [productToShow, setProductToShow] = useState({});

  // shopping car . add produts to cart
  const [cardProducts, setCardProducts] = useState([])

  // Shopping Cart . ORder
  const [order, setOrder] = useState([])

  // get produtcs
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState([])

  // Get products by title
  const [searchByTitle, setSearchByTitle] = useState('')

  // Get products by category
  const [searchByCategory, setSearchByCategory] = useState('')

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  }

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(item => item.category?.name.toLowerCase().includes(searchByCategory.toLowerCase()))
  }

  // no hay necesidad de pasar tantos parametros, ya que siempre es el state, ejemplo items = hooks items
  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === 'BY_TITLE') {
      return filteredItemsByTitle(items, searchByTitle);
    }
    if (searchType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory);
    }
    if (searchType === 'BY_TITLE_AND_BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    if (!searchByTitle) {
      return items
    }
  }

  useEffect(() => {
    fetch(" https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) =>  { setItems(data)});
  }, []);

  useEffect(() => {
    if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_BY_CATEGORY', items, searchByTitle, searchByCategory))
    if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
    if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
    if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
  }, [items, searchByTitle, searchByCategory])

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        openProductDetail,
        closeProductDetail,
        isProducDetailOpen,
        productToShow,
        setProductToShow,
        cardProducts,
        setCardProducts,
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
        searchByCategory,
        setSearchByCategory
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
