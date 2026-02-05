import React from "react";
import styles from "./Card.module.css";
import viteSvg from '../assets/vite.svg';

const Card = ({ name, title, description, image, mode }) => {
    return (
        <div className={`${styles.cardBox} ${styles[mode]}`}>
            <img
                className={styles.cardImage}
                src={image? image : viteSvg}
                alt={`${name}'s profile`}
            />
            <h2 className={styles.cardName}>{name}</h2>
            <p className={styles.cardTitle}>{title}</p>
            <p className={styles.cardDescription}>{description}</p>
        </div>
    );
};

export default Card;