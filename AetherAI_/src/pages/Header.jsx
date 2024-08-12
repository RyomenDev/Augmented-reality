import "../css/header.css";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 mb-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold">AetherAI</h1>
        <nav className="mt-4">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
