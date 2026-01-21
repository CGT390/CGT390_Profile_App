import React from "react";
import viteLogo from '/vite.svg';
import './Card.css'
import scooterImage from "../assets/scooter.jpeg"; 

const Card = () => {
    const name = "John Doe"
    const title = "Full Stack Developer"
    const description = "Passionate about developing new strains of catnip for medical use."
    return (
        <div className="card-box">
            <img
                className="card-image"
                src={scooterImage}
                alt="John Doe's profile"
            />
            <h2 className="card-name">{name}</h2>
            <p className="card-title">{title}</p>
            <p className="card-description">{description}</p>
        </div>
    );
};

export default Card;
