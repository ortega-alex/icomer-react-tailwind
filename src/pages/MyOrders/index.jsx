import { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import OrdersCard from "../../components/OrdersCard";
import { ShoppingCartContext } from "../../context";

export default function MyOrders() {
  const context = useContext(ShoppingCartContext);
  return (
    <Layout>
      <div className="flex w-80 justify-center items-center relative mb-3">
        <h1 className="font-medium text-light">MyOrders</h1>
      </div>

      {context?.order?.map((item, i) => (
        <Link to={`/my-orders/${i}`} key={i}>
          <OrdersCard
            totalPrice={item.totalPrice}
            totalProducts={item.totalProducts}
          />
        </Link>
      ))}
    </Layout>
  );
}
