import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <span>&copy; {new Date().getFullYear()} Your App Name</span>
    </footer>
  );
}

export default Footer;