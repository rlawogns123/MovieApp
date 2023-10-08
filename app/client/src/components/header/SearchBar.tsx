import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

type Props = {};

const SearchBar = (props: Props) => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState<string>("");

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${searchWord}`);
    setSearchWord("");
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const word = target.value;
    setSearchWord(word);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <SearchInput
        value={searchWord ?? ""}
        type="text"
        onChange={handleChange}
      />
      <SearchButton>검색</SearchButton>
    </form>
  );
};

export default SearchBar;

const SearchInput = styled.input`
  border-radius: 40px;
  margin-right: 1rem;
  color: black;
  padding: 5px;

  @media screen and (max-width: 1023px) {
    width: 100px;
  }

  @media screen and (max-width: 767px) {
    width: 100px;
  }
`;

const SearchButton = styled.button`
  width: 50px;
  height: 30px;

  @media screen and (max-width: 1023px) {
    width: 40px;
    font-size: 5px;
  }

  @media screen and (max-width: 767px) {
    width: 50px;
    height: 30px;
  }
`;
