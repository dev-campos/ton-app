import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
    label: string;
    onClick: () => void;
    buttonType: "chartButton" | "upButton" | "downButton";
}

export const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    buttonType,
}) => (
    <button
        className={`${styles.button} ${styles[buttonType]}`}
        onClick={onClick}>
        {label}
    </button>
);
