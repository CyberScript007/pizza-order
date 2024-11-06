import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUsername } from "../user/UserSlice";
import { clearCart, getCart } from "./cartSlice";
import CartItem from "./CartItem";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector(getUsername);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mb-6 mt-4 max-[640px]:mb-3.5 max-[640px]:mt-2">
      <LinkButton>&larr; Back to menu</LinkButton>

      <h2 className="mb-6 text-lg font-bold max-[640px]:mb-3">
        Your cart, {username}
      </h2>
      <ul className="mb-6 divide-y-2 divide-stone-200 border-y-2 max-[640px]:mb-3">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="space-x-4 max-[300px]:flex max-[300px]:flex-col max-[300px]:gap-2 max-[300px]:space-x-0">
        <Button type="primary" handleClick={() => navigate("/order/new")}>
          order pizzas
        </Button>
        <Button type="clear" handleClick={() => dispatch(clearCart())}>
          clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
