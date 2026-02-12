import React from "react";
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

function NavBar({ theme, toggleTheme, mode }) {
  const logoText = "My Profile App";

  // Change href to to, and use actual paths instead of anchors (#)
  const navLinks = [
    { label: "About Me", to: "/" },
    { label: "Create Card", to: "/contact" }, // Matching your Route path="/contact"
    { label: "API Data", to: "/apidata" }, // Matching your Route path="/apidata"
    { label: "Profile Page", to: "/profile/5" } // Example link to a profile page with id 1
  ];

  return (
    <nav className={`${styles.navbar} ${styles[mode]}`}>
      <div className={styles.navbarLogo}>
        {/* Make the logo a link to home too! */}
        <Link to="/">{logoText}</Link>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>

      <ul className={styles.navbarLinks}>
        {navLinks.map((link, index) => (
          <li key={index}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
