import "./Searchbar.css";

interface SearchbarProps {
  setSearch: (value: string) => void;
}

function Searchbar({ setSearch }: SearchbarProps) {
  return (
    <input
      type="text"
      placeholder="Search"
      className="searchbar"
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    />
  );
}

export default Searchbar;
