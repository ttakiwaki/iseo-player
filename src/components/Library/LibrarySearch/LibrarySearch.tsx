import "./LibrarySearch.css";
import { Search } from "lucide-react";

interface LibrarySearchProps {
  setSearch: (value: string) => void;
}

function LibrarySearch({ setSearch }: LibrarySearchProps) {
  return (
    <div className="library-search">
      <Search size={18} color="black"></Search>
      <input
        type="search"
        placeholder="Search Library"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></input>
    </div>
  );
}

export default LibrarySearch;
