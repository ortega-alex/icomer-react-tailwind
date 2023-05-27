import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import OrderCard from "../../components/OrderCard";
import { ShoppingCartContext } from "../../context";

export default function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const { id } = useParams(); 

  // const currentPath = window.location.pathname
  // const index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  const index = id ?? context.order?.length - 1; 
  

  return (
    <Layout>
      <div className="flex w-80 justify-center items-center relative mb-6">
        <Link to="/my-orders" className="absolute left-0">
          <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer" />
        </Link>
        <h1>MyOrder</h1>
      </div>
      <div className="flex flex-col w-80">
        {context?.order?.[index].products.map((item) => (
          <OrderCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.images}
            price={item.price}
          />
        ))}
      </div>
    </Layout>
  );
}
