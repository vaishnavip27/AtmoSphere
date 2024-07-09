import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function InputWithLabel({ label, type, ...otherProps }) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label
        htmlFor="{otherProps.id}"
        style={{
          color: "white",
          fontSize: "16px",
          marginTop: "26px",
        }}
      >
        {label}
      </Label>
      <Input
        type={type}
        {...otherProps}
        style={{
          width: "410px",
          height: "43px",
          border: "1px solid rgb(37,37,37)",
          backgroundColor: "rgb(10,10,10)",
        }}
      />
    </div>
  );
}
