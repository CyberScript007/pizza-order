import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

import { fetchAddress } from "../user/UserSlice";
import { clearCart, getCart, getTotalPriceItem } from "../cart/cartSlice";
import Button from "../../ui/Button";
import { useState } from "react";
import { createOrder } from "../../services/apiRestaurant";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";

function ValidatePhoneNumber(phone) {
  return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    phone,
  );
}

function OrderNew() {
  const {
    username,
    status: addressStatus,
    position,
    address,
    error,
  } = useSelector((state) => state.user);
  const cart = useSelector(getCart);
  const [priority, setPriority] = useState(false);
  const formAction = useActionData();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isSubmitting = navigation.state === "submitting";
  const totalPriceItem = useSelector(getTotalPriceItem);
  const priorityPrice = priority ? totalPriceItem * 0.2 : 0;
  const totalPrice = totalPriceItem + priorityPrice;
  const isLoading = addressStatus === "loading";

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="py-5 max-[800px]:py-3">
      <h4 className="mb-8 text-xl font-bold max-[800px]:mb-5">
        Ready to order? Let&apos;s go!
      </h4>

      <Form method="POST">
        <div className="mb-5 grid grid-cols-[11rem_1fr] items-center max-[800px]:mb-3 max-[640px]:grid-cols-[1fr] max-[640px]:gap-2">
          <label htmlFor="firstname" className="capitalize ">
            first name
          </label>
          <input
            type="text"
            defaultValue={username}
            required
            id="firstname"
            name="customer"
            className="input"
          />
        </div>
        <div className="mb-5 grid grid-cols-[11rem_1fr] items-center max-[800px]:mb-3 max-[640px]:grid-cols-[1fr] max-[640px]:gap-2">
          <label htmlFor="phoneNumber" className="capitalize">
            phone number
          </label>

          <div>
            <input
              type="tel"
              required
              id="phoneNumber"
              className="input"
              name="phone"
            />
            {formAction && (
              <p className="mt-3 rounded-md bg-red-100 px-4 py-2 text-xs text-red-600">
                {formAction?.phone}
              </p>
            )}
          </div>
        </div>
        <div className="mb-5 grid grid-cols-[11rem_1fr] items-center max-[800px]:mb-3 max-[640px]:grid-cols-[1fr] max-[640px]:gap-2">
          <label htmlFor="address" className="capitalize">
            address
          </label>
          <div>
            <div className="flex items-center">
              <input
                type="text"
                required
                id="address"
                className="input w-full"
                name="address"
                defaultValue={address}
                disabled={isLoading}
              />
              {!position.longitude && !position.latitude && (
                <Button
                  type="secondary"
                  disabled={isLoading}
                  handleClick={async (e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                  className="-ml-[9.3rem] h-10 w-[9rem] max-[400px]:-ml-[7.3rem] max-[400px]:w-[7rem] max-[400px]:text-xs"
                >
                  get position
                </Button>
              )}
            </div>
            {error && (
              <p className="mt-3 w-full rounded-md bg-red-100 px-4 py-2 text-xs text-red-600">
                {error}
              </p>
            )}
          </div>
        </div>
        <div className="mb-10 flex items-center space-x-4 max-[800px]:mb-4">
          <input
            type="checkbox"
            id="checkbox"
            value={priority}
            onChange={(e) => setPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            name="priority"
          />
          <label htmlFor="checkbox" className="font-medium max-[470px]:text-sm">
            Do you want to give your order priority?
          </label>
        </div>
        <div>
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />
          <input
            type="hidden"
            value={JSON.stringify(position)}
            name="position"
          />
          <Button type="primary" disabled={isSubmitting || isLoading}>
            {isSubmitting
              ? "Placing order..."
              : `order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async function ({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
    // position: JSON.parse(data.position),
  };

  const error = {};
  if (!ValidatePhoneNumber(order.phone))
    error.phone =
      "Please give us your correct phone number. We might need it to contact you";

  if (Object.keys(error).length > 0) return error;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
};

export default OrderNew;
