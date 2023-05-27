import { XMarkIcon } from "@heroicons/react/24/solid";

// eslint-disable-next-line react/prop-types
const OrderCard = ({ id, title, imageUrl, price, handleDelete }) => {
  let renderXMarkIcon = handleDelete ? (
    <XMarkIcon
      className="h-6 w-6 text-black cursor-pointer"
      onClick={() => handleDelete(id)}
    />
  ) : null;

  return (
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-2">
        <figure className="w-20 h-20">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full rounded-lg object-cover"
          />
        </figure>
        <p className="text-sm font-light">{title}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-lg fotn-medium">{price}</p>
        {renderXMarkIcon}
      </div>
    </div>
  );
};

export default OrderCard;
