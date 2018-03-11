import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="main-header">
    <div className="main-header-box">
      <h1 id="logo-wrap">
        <Link to="/" id="logo">Pspgbhu's Blog</Link>
      </h1>
    </div>
  </header>
);

export default Header;
