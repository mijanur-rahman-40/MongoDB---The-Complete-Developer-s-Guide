import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

const header = props => {
  let links = (
    <ul className="main-header__nav-items">
      <li className="main-header__nav-item">
        <NavLink to="/products">Products</NavLink>
      </li>
      <li className="main-header__nav-item">
        <NavLink to="/product/add">Add Product</NavLink>
      </li>

      <li className="main-header__nav-item">
        <button onClick={props.onLogout}>Logout</button>
      </li>
    </ul>
  );

  if (!props.authenticated) {
    links = (
      <ul className="main-header__nav-items">
        <li className="main-header__nav-item">
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      </ul>
    );
  }

  return (
    <header className="main-header">
      <nav className="main-header__nav">{links}</nav>
    </header>
  );
};

export default header;
