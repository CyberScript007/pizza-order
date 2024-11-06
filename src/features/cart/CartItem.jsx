import { formatCurrency } from "../../utils/helpers";
import CartQuantity from "./CartQuantity";
import DeleteCartItem from "./DeleteCartItem";

function CartItem({ item }) {
  const { pizzaId, name, totalPrice, quantity } = item;
  return (
    <li className="flex items-center justify-between py-4 max-[550px]:flex-col max-[550px]:items-start max-[550px]:gap-2 max-[550px]:py-2">
      <p className="max-[400px]:text-sm">
        {quantity}x {name}
      </p>
      <div className="flex items-center gap-5 max-[300px]:flex-col max-[300px]:items-start max-[300px]:gap-2">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <div className="flex gap-4">
          <CartQuantity id={pizzaId} />
          <DeleteCartItem id={pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
