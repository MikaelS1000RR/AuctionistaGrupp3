import React from 'react';
import './Sidebar.css'
import { bubble as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/Products">
        Products
      </a>
      <a className="menu-item" href="/Login">
        Login
      </a>
      <a className="menu-item" href="/Register">
        Register
      </a>
    </Menu>
  );
};