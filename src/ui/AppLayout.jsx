import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import { getCart } from "../features/cart/cartSlice";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const cart = useSelector(getCart);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      {isLoading && <Spinner />}
      <div className="overflow-y-auto">
        <main className="mx-auto max-w-3xl px-2">
          <Outlet />
        </main>
      </div>
      {cart.length > 0 && <CartOverview />}
    </div>
  );
}

export default AppLayout;
