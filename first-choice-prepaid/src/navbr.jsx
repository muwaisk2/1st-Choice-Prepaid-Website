import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links-wrapper">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#introduction">Introduction</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
            <a href="#how it works">How it Works</a>
        </li>
        <li>
            <a href="#products">Products</a>
        </li>
        <li>
            <a href="#how to buy">How to Buy</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}
