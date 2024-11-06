import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPriceItem, getTotalQuantityItem } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalQuantity = useSelector(getTotalQuantityItem);
  const totalItemPrice = useSelector(getTotalPriceItem);

  return (
    <div className="flex justify-between bg-stone-800 px-6 py-4 uppercase text-slate-100 max-[640px]:px-3.5 max-[640px]:py-2.5 max-[300px]:flex-col max-[300px]:gap-2">
      <div className="flex gap-5">
        <p className="max-[640px]:text-sm">{totalQuantity} pizzas</p>
        <p className="max-[640px]:text-sm">{formatCurrency(totalItemPrice)}</p>
      </div>
      <Link to="/cart" className="max-[640px]:text-sm">
        open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
