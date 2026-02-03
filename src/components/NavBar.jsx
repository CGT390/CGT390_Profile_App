import React from "react";
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

function NavBar({ theme, toggleTheme, mode }) {
  const logoText = "MyProfile";

  // Change href to to, and use actual paths instead of anchors (#)
  const navLinks = [
    { label: "About Me", to: "/" },
    { label: "Create Card", to: "/contact" } // Matching your Route path="/contact"
  ];

  return (
    <nav className={`${styles.navbar} ${styles[mode]}`}>
      <div className={styles.navbarLogo}>
        {/* Make the logo a link to home too! */}
        <Link to="/">{logoText}</Link>
      </div>

      <button onClick={toggleTheme} className={styles.themeToggle}>
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>

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
