import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-full px-4 py-2 bg-yellow-100 text-sm placeholder:text-stone-400 sm:w-64 transition-all sm:focus:w-72 focus:outline-none focus-ring-yellow focus:ring-opacity-50"
      ></input>
    </form>
  );
}

export default SearchOrder;
