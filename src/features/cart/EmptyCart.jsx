import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="mt-4">
      <LinkButton>&larr; Back to menu</LinkButton>
      <p className="font-bold">
        Your cart is empty. Start adding some pizza :)
      </p>
    </div>
  );
}

export default EmptyCart;
