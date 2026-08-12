import "./MLibrarySearch.css";
import { Search } from "lucide-react";

interface MLibrarySearchProps {
  setSearch: (value: string) => void;
}

function MLibrarySearch({ setSearch }: MLibrarySearchProps) {
  return (
    <div className="mlibrary-search">
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

export default MLibrarySearch;
