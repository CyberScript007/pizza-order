import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  return (
    <div className="mx-auto mb-7 mt-16 max-w-2xl text-center max-[768px]:mt-10 max-[768px]:px-2 max-[640px]:mt-4">
      <h1 className="mb-5 text-3xl font-semibold max-[768px]:mb-3 max-[768px]:text-2xl max-[640px]:text-xl max-[320px]:text-lg">
        <span>The best pizza.</span> <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you
        </span>
      </h1>

      {username ? (
        <Button type="primary" handleClick={() => navigate("/menu")}>
          continue ordering, {username}
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default HomePage;
