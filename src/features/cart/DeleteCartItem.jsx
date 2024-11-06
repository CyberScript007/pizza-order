import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

function DeleteCartItem({ id }) {
  const dispatch = useDispatch();

  const handleDeleteItem = function () {
    dispatch(deleteItem(id));
  };

  return (
    <Button type="secondary" handleClick={handleDeleteItem}>
      Delete
    </Button>
  );
}

export default DeleteCartItem;
