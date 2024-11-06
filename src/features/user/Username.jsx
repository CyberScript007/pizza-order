import { useSelector } from "react-redux";
import { getUsername } from "./UserSlice";

function Username() {
  const username = useSelector(getUsername);
  return (
    <p className="font-semibold uppercase max-[640px]:hidden">{username}</p>
  );
}

export default Username;
