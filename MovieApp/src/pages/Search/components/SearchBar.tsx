import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const SearchBar = (props: Props) => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState<string>("");

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/search", { state: { searchWord } });
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const word = target.value;
    setSearchWord(word);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input value={searchWord ?? ""} type="text" onChange={handleChange} />
      <button>검색</button>
    </form>
  );
};

export default SearchBar;
