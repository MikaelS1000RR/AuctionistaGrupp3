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
  const { userId, userName, email, setUserName, whoAmI, isLoggedIn, setIsLoggedIn } = useGlobal();


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
        {isLoggedIn && <h5>Hello! {userName}</h5>}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* <button style={styles.button}><Link to="/products" style={styles.link}>Products</Link></button> */}
            {isLoggedIn && <button style={styles.button}><Link to="/upload" style={styles.link}>Upload</Link></button>}
            {!isLoggedIn && <button style={styles.button}><Link to="/login" style={styles.link}>Login</Link></button>}
            {!isLoggedIn && <button style={styles.button}><Link to="/register" style={styles.link}>Register</Link></button>}
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
    color:'black'
  },
  button: {
    border: 'none',
  }
}