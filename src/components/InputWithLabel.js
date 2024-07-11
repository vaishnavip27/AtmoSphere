import { Input } from "./ui/input";
import { Label } from "./ui/label";
import "../styles/InputWithLabel.css";

export function InputWithLabel({ label, type, ...otherProps }) {
  return (
    <div className="input-with-label">
      <Label htmlFor="{otherProps.id}" className="input-label">
        {label}
      </Label>
      <Input type={type} {...otherProps} className="input-field" />
    </div>
  );
}
