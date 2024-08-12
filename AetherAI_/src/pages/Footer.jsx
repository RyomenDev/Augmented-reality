import "../css/footer.css";
import React from "react";

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer-container">
        <a
          href="https://www.linkedin.com/in/akash-mishra-2b2348224"
          target="_blank"
          className="footer-link link-1"
          rel="noopener noreferrer"
        >
          <img src="/icons8-linkedin.svg" alt="LinkedIn" />
        </a>
        <a
          href="mailto:aakashvatsh007@gmail.com"
          className="footer-link link-2"
        >
          <img src="/icons8-mail-50.png" alt="Email" />
        </a>
      </div>
      <div className="copy-container">&copy;2024 Made by Akash Mishra</div>
    </section>
  );
};

export default Footer;
