import React from "react";
import styles from './NavBar.module.css';

function NavBar({ theme, toggleTheme, mode }) {
  const logoText = "MyProfile";
  const navLinks = [
    { label: "About Me", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <nav className={`${styles.navbar} ${styles[mode]}`}>
      <div className={styles.navbarLogo}>{logoText}</div>
      <button onClick={toggleTheme} className={styles.themeToggle}>
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
      <ul className={styles.navbarLinks}>
        {navLinks.map((link, index) => (
          <li key={index}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
