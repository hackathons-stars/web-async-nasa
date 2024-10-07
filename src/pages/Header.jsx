import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import userIcon from '../icons/user.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar className={`header ${scrolled ? 'scrolled' : ''}`} expand="lg">
      <div className="container">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
              <NavDropdown.Item href="/link1">Link 1</NavDropdown.Item>
              <NavDropdown.Item href="/link2">Link 2</NavDropdown.Item>
              <NavDropdown.Item href="/link3">Link 3</NavDropdown.Item>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand href="#">
          <img src={userIcon} className="user-icon" style={{ height: '30px' }} alt="Usuário" />
        </Navbar.Brand>
      </div>
    </Navbar>
  );
};

export default Header;
