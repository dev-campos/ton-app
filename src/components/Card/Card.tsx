import React from "react";
import styles from "./Card.module.scss";

interface CardProps {
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => (
    <div className={styles.card}>{children}</div>
);
