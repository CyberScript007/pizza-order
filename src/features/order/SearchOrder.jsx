import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSumbit = function (e) {
    e.preventDefault();

    if (!query) return;

    navigate(`/order/${query}`);
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSumbit}
      className="max-[640px]:w-full max-[640px]:text-center"
    >
      <input
        type="text"
        placeholder="Search order by ID"
        className="w-64 rounded-3xl bg-yellow-100 px-4 py-2 font-sans text-sm outline-none transition-all duration-300 focus:w-72 focus:ring-2 focus:ring-yellow-500 max-[640px]:w-[90%] max-[640px]:focus:w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
