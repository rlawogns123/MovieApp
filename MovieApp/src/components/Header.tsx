import React from "react";
import SearchBar from "@/pages/Search/components/SearchBar";

type Props = {};

const Header = (props: Props) => {
  return (
    <div>
      <h1>Movie App</h1>
      <SearchBar />
    </div>
  );
};

export default Header;
