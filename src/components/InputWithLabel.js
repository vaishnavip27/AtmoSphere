import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function InputWithLabel({ label, type, ...otherProps }) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label
        htmlFor="{otherProps.id}"
        style={{
          color: "white",
          fontSize: "17px",
          marginTop: "26px",
        }}
      >
        {label}
      </Label>
      <Input
        type={type}
        {...otherProps}
        style={{ width: "470px", height: "46px" }}
      />
    </div>
  );
}
