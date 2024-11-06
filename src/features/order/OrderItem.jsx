import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, ingredients, isLoading }) {
  const { name, quantity, totalPrice, pizzaId } = item;
  return (
    <li className="py-5 max-[800px]:py-3">
      <div className="mb-2 flex justify-between max-[350px]:flex-col max-[350px]:gap-2 ">
        <p className="text-sm font-medium">
          {quantity}x {name}
        </p>
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic">
        {isLoading ? "Loading..." : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
