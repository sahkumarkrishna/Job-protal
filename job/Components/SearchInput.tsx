import React from "react";
import { Input } from "./ui/input"; // Ensure the correct import path

const SearchInput = () => {
  return (
    <div>
      <Input
        type="text"
        placeholder="Search"
        aria-label="Search"
        className="bg-[#EDF3F8] w-80 rounded-lg border-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchInput;
