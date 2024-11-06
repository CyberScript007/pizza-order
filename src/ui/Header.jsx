import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  const username = useSelector((state) => state.user.username);
  return (
    <header className="flex items-center  justify-between bg-yellow-400 px-6 py-4 max-[640px]:flex-col max-[640px]:gap-3 max-[640px]:px-4 max-[640px]:py-2.5 max-[640px]:text-center">
      <Link to="/" className="text-lg uppercase tracking-widest ">
        fast react pizza co.
      </Link>
      <SearchOrder />

      {username && <Username />}
    </header>
  );
}

export default Header;
