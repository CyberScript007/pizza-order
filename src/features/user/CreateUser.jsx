import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUsername } from "./UserSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSumbit = function (e) {
    e.preventDefault();

    if (!username) return;
    dispatch(updateUsername(username));
    navigate("/menu");
  };

  return (
    <div className="text-center">
      <p className="mb-5 max-[640px]:mb-4 max-[640px]:text-sm max-[320px]:text-xs">
        👋 Welcome! Please start by telling us your name:
      </p>

      <form onSubmit={handleSumbit}>
        <input
          type="text"
          placeholder="Your full name"
          className="max-[300px]:w-90% mb-8 w-72 rounded-full border border-slate-200 px-5 py-3 text-sm outline-none ring-yellow-400 transition-all focus:ring  max-[640px]:mb-6 max-[640px]:px-4 max-[640px]:py-2 max-[400px]:w-[80%] max-[300px]:w-[90%]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {username && (
          <div>
            <Button type="primary">start ordering</Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateUser;
