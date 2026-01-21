import React from "react";
import './NavBar.css';

const NavBar = () => {
  const logoText = "MyProfile";
  const navLinks = [
    { label: "About Me", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo">{logoText}</div>
      <ul className="navbar-links">
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
