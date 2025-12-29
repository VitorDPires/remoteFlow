import type { ChangeEvent, InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "placeholder"> & {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Input({ type, placeholder, value, onChange, ...props }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.input}
      {...props}
    />
  );
}


export default Input;