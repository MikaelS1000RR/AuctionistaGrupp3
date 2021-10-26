import React, { useState, useEffect } from 'react';
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

import 'bootstrap/dist/css/bootstrap.min.css';

const MyNavbar = (props) => {
  const [displayName, setDisplayName] = useState('')
  let username = props.user.username
  const [isOpen, setIsOpen] = useState(false);
  let history = useHistory();

  const logout = () => {
    fetch('/logout')
    setDisplayName('');
    history.push("/")
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
              <button style={styles.button}><Link to="/upload" style={styles.link}>Upload</Link></button>
              <button style={styles.button}><Link to="/login" style={styles.link}>Login</Link></button>
              <button style={styles.button}><Link to="/register" style={styles.link}>Register</Link></button>
            <h5>Hello! {displayName}</h5>
            <button style={styles.button} onClick={logout}>Logout</button>
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