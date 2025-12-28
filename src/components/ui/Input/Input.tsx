import styles from "./Input.module.css";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ type, placeholder, value, onChange }: InputProps) {
  return <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={styles.input} />;
};

export default Input;