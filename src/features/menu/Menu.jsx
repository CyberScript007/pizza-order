import MenuItem from "./MenuItem";
import { getMenu } from "../../services/apiRestaurant";
import { useLoaderData } from "react-router-dom";

function Menu() {
  const menuData = useLoaderData();

  return (
    <ul className="mb-3 divide-y-2 max-[850px]:px-2">
      {menuData.map((item) => (
        <MenuItem item={item} key={item.id} />
      ))}
    </ul>
  );
}

export const loader = async function () {
  const menu = await getMenu();
  return menu;
};

export default Menu;
