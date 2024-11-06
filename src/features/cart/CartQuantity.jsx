import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseItemQuantity,
  getCurrentQuantityItem,
  increaseItemQuantity,
} from "./cartSlice";

function CartQuantity({ id }) {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityItem(id));

  const handleIncrement = function () {
    dispatch(increaseItemQuantity(id));
  };

  const handleDecrement = function () {
    dispatch(decreaseItemQuantity(id));
  };
  return (
    <div className="flex items-center gap-3">
      <Button type="round" handleClick={handleDecrement}>
        &minus;
      </Button>
      <p className="text-sm font-medium">{currentQuantity}</p>
      <Button type="round" handleClick={handleIncrement}>
        &#43;
      </Button>
    </div>
  );
}

export default CartQuantity;
