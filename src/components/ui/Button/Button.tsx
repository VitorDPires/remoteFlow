import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type: "button" | "submit" | "reset" | undefined;
}

function Button({ children, onClick, type }: ButtonProps) {
  return (
    <button onClick={onClick} type={type} className={styles.button}>
      {children}
    </button>
  );
}

export default Button;