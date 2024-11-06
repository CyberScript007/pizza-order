import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import HomePage from "./ui/HomePage";
import Cart from "./features/cart/Cart";
import Menu from "./features/menu/Menu";
import { loader as menuLoader } from "./features/menu/Menu";
import ErrorPage from "./ui/ErrorPage";
import OrderNew from "./features/order/OrderNew";
import { action as OrderNewAction } from "./features/order/OrderNew";
import Order from "./features/order/Order";
import { loader as OrderLoader } from "./features/order/Order";
import { action as OrderAction } from "./features/order/Order";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/menu",
          element: <Menu />,
          loader: menuLoader,
          errorElement: <ErrorPage />,
        },
        {
          path: "/order/new",
          element: <OrderNew />,
          action: OrderNewAction,
        },
        {
          path: "/order/:orderId",
          element: <Order />,
          loader: OrderLoader,
          action: OrderAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
