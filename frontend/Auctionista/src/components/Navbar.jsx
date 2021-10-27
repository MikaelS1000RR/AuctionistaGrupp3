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

import 'bootstrap/dist/css/bootstrap.min.css';

const MyNavbar = (props) => {
  let username = props.user.username
  const [displayName, setDisplayName] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  let history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedIn);


  const logout = () => {
    fetch('/logout')
    setDisplayName('');
    history.push("/")
    console.log(isLoggedIn,"isLoggedIn")
    setIsLoggedIn(false)
    console.log(isLoggedIn,"isLoggedIn")
  }

  useEffect(() => {
    setDisplayName(username)
    // if (username == '') {
    //   whoAmI()
    //   console.log('whoAmI ran')
    // }
  }, [username])

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link to="/" style={styles.link}><NavbarBrand>Auctionista</NavbarBrand></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <button style={styles.button}><Link to="/products" style={styles.link}>Products</Link></button>
            {isLoggedIn && <button style={styles.button}><Link to="/upload" style={styles.link}>Upload</Link></button>}
            {!isLoggedIn && <button style={styles.button}><Link to="/login" style={styles.link}>Login</Link></button>}
            {!isLoggedIn && <button style={styles.button}><Link to="/register" style={styles.link}>Register</Link></button>}
            {isLoggedIn && <h5>Hello! {displayName}</h5>}
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