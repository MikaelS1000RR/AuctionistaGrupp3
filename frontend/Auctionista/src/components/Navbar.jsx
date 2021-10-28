import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { useHistory } from 'react-router'
import { LoggedIn } from '../App'
import { useGlobal } from '../contexts/UserContextProvider';

import 'bootstrap/dist/css/bootstrap.min.css';

const MyNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  let history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedIn);
  const { userName, email, setUserName, whoAmI } = useGlobal();


  const logout = async () => {
    await fetch('/logout');
    setUserName('');
    setIsLoggedIn(false);
    console.log(isLoggedIn, "isLoggedIn")
    await whoAmI();
    history.push("/");

  }

  useEffect(() => {
    setUserName(userName)
  }, [userName])

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link to="/" style={styles.link}><NavbarBrand>Auctionista</NavbarBrand></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <Link to="/products" style={styles.link}><button style={styles.button}>Products</button></Link>
            {isLoggedIn && <Link to="/upload" style={styles.link}><button style={styles.button}>Upload</button></Link>}
            {!isLoggedIn && <Link to="/login" style={styles.link}><button style={styles.button}>Login</button></Link>}
            {!isLoggedIn && <Link to="/register" style={styles.link}><button style={styles.button}>Register</button></Link>}
            {isLoggedIn && <h5>Hello! {userName}</h5>}
            {isLoggedIn && <button style={styles.button} onClick={logout}>Logout</button>}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;

const styles = {
  link: {
    textDecoration: 'none',
  },
  button: {
    border: 'none'
  }
}