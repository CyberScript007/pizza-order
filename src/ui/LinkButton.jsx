import Button from "./Button";

function LinkButton({ children }) {
  return <Button to="/menu">{children}</Button>;
}

export default LinkButton;
