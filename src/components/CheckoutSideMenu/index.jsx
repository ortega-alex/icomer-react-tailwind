import { XMarkIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../context";
import { totalPrice } from "../../utils";
import OrderCard from "../OrderCard";
import "./style.css";

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProducts = context.cardProducts.filter(
      (item) => item.id !== id
    );
    context.setCardProducts(filteredProducts);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: "01.02.23",
      products: context.cardProducts,
      totalProducts: context.cardProducts.length,
      totalPrice: totalPrice(context.cardProducts),
    };

    context.setOrder([...context.order, orderToAdd]);
    context.setCardProducts([]);
    context.setSearchByTitle('')
  };

  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "flex" : "hidden"
      } checkout-side-menu flex-col fixed bg-white right-0 border border-black rounded-lg`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <div>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => context.closeCheckoutSideMenu()}
          />
        </div>
      </div>
      <div className="px-6 overflow-y-scroll flex-1">
        {context?.cardProducts.map((item) => (
          <OrderCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.images}
            price={item.price}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="px-6 mb-6">
        <p className="flex justify-between items-center mb-2">
          <span className="font-light">Total: </span>
          <span className="font-medium text-2xl">
            ${totalPrice(context.cardProducts)}
          </span>
        </p>
        <Link to="/my-orders/last">
          <button className="w-full bg-black py-3 text-white rounded" onClick={handleCheckout}>Chechkout</button>
        </Link>
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;
