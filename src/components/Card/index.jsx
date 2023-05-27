/* eslint-disable react/prop-types */

import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";

// eslint-disable-next-line react/prop-types
const Card = ({ data }) => {
  const context = useContext(ShoppingCartContext);

  const showProduct = () => {
    context.openProductDetail();
    context.setProductToShow(data);
  };

  const addProductToCard = (env) => {
    env.stopPropagation();
    context.setCount(context.count + 1);
    context.setCardProducts([...context.cardProducts, data]);
    context.closeProductDetail();
    context.openCheckoutSideMenu();
  };

  const renderIcon = () => {
    const isInCart = context.cardProducts.some((item) => item.id === data.id);
    if (isInCart) {
      return (
        <div className="absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2">
          <CheckIcon className="h-6 w-6 text-white" />
        </div>
      );
    } else {
      return (
        <div
          className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2"
          onClick={addProductToCard}
        >
          <PlusIcon className="h-6 w-6 text-black" />
        </div>
      );
    }
  };

  return (
    <div
      className="bg-white cursor-pointer w-56 h-60 rounded-lg"
      onClick={showProduct}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-sm m-2 px-3 py-0.5">
          {data?.category?.name}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={data?.images[0]}
          alt={data?.description}
        />
        {renderIcon()}
      </figure>
      <p className="flex justify-between">
        <span className="text-sm font-light">{data?.title}</span>
        <span className="text-sm font-medium">${data?.price}</span>
      </p>
    </div>
  );
};

export default Card;
