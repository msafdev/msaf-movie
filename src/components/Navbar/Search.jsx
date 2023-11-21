import { useState } from "react";

export default function Search({ style, onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className={`items-center border-[2px] border-[#010b13] border-opacity-20 px-6 lg:px-4 py-3 rounded-full justify-between ${style}`}
    >
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="outline-none placeholder:text-[#010b13] w-full"
      />
    </form>
  );
}
