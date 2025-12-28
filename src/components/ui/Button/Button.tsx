import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, className, ...props }: ButtonProps) {
  const combinedClassName = [styles.button, className].filter(Boolean).join(" ");
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}

export default Button;