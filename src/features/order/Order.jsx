import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder, updateOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import Button from "../../ui/Button";
import { useEffect } from "react";

function Order() {
  const order = useLoaderData();
  const { cart, id, orderPrice, priority, priorityPrice, estimatedDelivery } =
    order;
  console.log(order);
  const deliveryTimeLeft = calcMinutesLeft(estimatedDelivery);
  const fetcher = useFetcher();
  const isLoading = fetcher.state === "loading";

  useEffect(
    function () {
      if (fetcher.state === "idle" && !fetcher.data) fetcher.load("/menu");
    },
    [fetcher],
  );

  return (
    <div className="py-6 max-[800px]:py-3">
      <div className="mb-10 flex justify-between max-[800px]:mb-5 max-[700px]:mb-3 max-[600px]:flex-col max-[600px]:gap-2">
        <h2 className="text-xl font-bold max-[600px]:order-2 max-[600px]:text-lg">
          Order #{id} status
        </h2>
        <div className="space-x-3">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold uppercase tracking-wide text-white">
              priority
            </span>
          )}
          <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-bold uppercase tracking-wide text-white">
            preparing order
          </span>
        </div>
      </div>
      <div className="mb-10 flex items-center justify-between bg-stone-200 px-6 py-5 max-[800px]:mb-5 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-2 max-[600px]:px-4 max-[600px]:py-3">
        <p className="text-base font-medium">
          {deliveryTimeLeft > 0
            ? `Only ${deliveryTimeLeft} minutes left 😁`
            : "Order should have arrived"}
        </p>
        <p className="text-xs">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="mb-10 divide-y border-y max-[800px]:mb-5">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId).ingredients ||
              []
            }
            isLoading={isLoading}
          />
        ))}
      </ul>
      <div className="mb-8 bg-stone-200 px-8 py-4 max-[800px]:mb-4 max-[700px]:px-4 max-[700px]:py-2">
        <p className="mb-3 text-sm">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="mb-3 text-sm">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery:{" "}
          {formatCurrency(
            priority ? `${orderPrice + priorityPrice}` : `${orderPrice}`,
          )}
        </p>
      </div>
      {!priority && (
        <div className="text-right">
          <fetcher.Form method="PATCH">
            <Button type="primary" disabled={fetcher.state === "submitting"}>
              make priority
            </Button>
          </fetcher.Form>
        </div>
      )}
    </div>
  );
}

export const loader = async function ({ params }) {
  const data = await getOrder(params.orderId);
  return data;
};

export const action = async function ({ params }) {
  const updateObj = { priority: true };
  await updateOrder(params.orderId, updateObj);
  return null;
};

export default Order;
