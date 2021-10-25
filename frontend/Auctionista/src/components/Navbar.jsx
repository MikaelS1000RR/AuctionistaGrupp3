import React, { useState } from 'react';
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
import 'bootstrap/dist/css/bootstrap.min.css';

const MyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link to="/" style={styles.link}><NavbarBrand>Auctionista</NavbarBrand></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <button style={styles.button}><Link to="/products" style={styles.link}>Products</Link></button>
            </NavItem>
            <NavItem>
              <button style={styles.button}><Link to="/upload" style={styles.link}>Upload</Link></button>
            </NavItem>
            <NavItem>
              <button style={styles.button}><Link to="/login" style={styles.link}>Login</Link></button>
            </NavItem>
            <NavItem>
              <button style={styles.button}><Link to="/register" style={styles.link}>Register</Link></button>
            </NavItem>
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