import "./Toggle.css";

interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
  id: string;
  store?: boolean;
}

function Toggle({ value, onChange, id, store }: ToggleProps) {
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id={id}
        checked={value}
        readOnly
        className="toggle-input"
      ></input>
      <label
        htmlFor={id}
        className="toggle-label"
        onClick={() => {
          onChange(!value);
          if (store) {
            localStorage.setItem(id, JSON.stringify(!value));
          }
        }}
      ></label>
    </div>
  );
}

export default Toggle;
