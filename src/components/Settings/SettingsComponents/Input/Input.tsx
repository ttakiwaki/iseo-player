import "./Input.css";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  id: string;
  placeholder?: string;
  store?: boolean;
}

function Input({ value, onChange, id, placeholder, store }: InputProps) {
  return (
    <div className="input-container">
      <input
        type="text"
        className="input-input"
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          if (store) {
            localStorage.setItem(id, e.target.value);
          }
        }}
      ></input>
    </div>
  );
}

export default Input;
