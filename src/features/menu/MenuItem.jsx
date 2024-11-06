import { useDispatch, useSelector } from "react-redux";

import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addToCart, getCart, getCurrentQuantityItem } from "../cart/cartSlice";
import DeleteCartItem from "../cart/DeleteCartItem";
import CartQuantity from "../cart/CartQuantity";

function MenuItem({ item }) {
  const { id, unitPrice, soldOut, name, ingredients, imageUrl } = item;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityItem(id));
  const isInCart = currentQuantity > 0;

  const handleAddToCart = function () {
    const newItem = {
      name,
      pizzaId: id,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };

    dispatch(addToCart(newItem));
  };

  return (
    <li className="py-2">
      <figure className="flex gap-5 max-[450px]:flex-col max-[450px]:gap-3">
        {soldOut ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-28 w-28 opacity-70 grayscale"
          />
        ) : (
          <img src={imageUrl} alt={name} className="h-28 w-28" />
        )}

        <figcaption className="flex w-full flex-col justify-between  max-[450px]:gap-2">
          <div className="mb-auto">
            <p className="font-medium max-[450px]:text-sm">{name}</p>
            <p className="text-sm capitalize italic text-stone-500 max-[450px]:text-xs">
              {ingredients.join(", ")}
            </p>
          </div>
          <div className="flex items-center justify-between max-[300px]:flex-col max-[300px]:items-start max-[300px]:gap-1">
            <p className="uppercase max-[450px]:text-sm">
              {soldOut ? "sold out" : formatCurrency(unitPrice)}
            </p>
            {isInCart && (
              <div className="flex space-x-10 max-[640px]:space-x-4">
                <CartQuantity id={id} />
                <DeleteCartItem id={id} />
              </div>
            )}
            {!soldOut && !isInCart && (
              <Button type="secondary" handleClick={handleAddToCart}>
                add to cart
              </Button>
            )}
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

export default MenuItem;
