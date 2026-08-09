import React, { useState } from 'react';
import {
  HeaderContainer,
  LogoImage,
  Nav,
  NavItem,
  Hamburger,
  MobileMenu,
} from './Header.style';
import logo from '../../../src/Assets/Logo/WebsiteLogo.png';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <HeaderContainer>
      <LogoImage  src={logo} alt="FamilyTree Logo" onClick={() => window.location.href = '/'} />
      
      
    
      <Nav>
        <NavItem as={Link} to="/" $active={isActive('/')}>Home</NavItem>
        <NavItem as={Link} to="/families" $active={isActive('/families')}>Families</NavItem>
        <NavItem as={Link} to="/export-history" $active={isActive('/export-history')}>Export</NavItem>
        <NavItem as={Link} to="/contact" $active={isActive('/contact')}>Contact</NavItem>
      </Nav>

      <Hamburger type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </Hamburger>

      {menuOpen && (
        <MobileMenu>
          <NavItem as={Link} to="/" onClick={() => setMenuOpen(false)} $active={isActive('/')}>Home</NavItem>
          <NavItem as={Link} to="/families" onClick={() => setMenuOpen(false)} $active={isActive('/families')}>Families</NavItem>
          <NavItem as={Link} to="/export-history" onClick={() => setMenuOpen(false)} $active={isActive('/export-history')}>Export</NavItem>
          <NavItem as={Link} to="/contact" onClick={() => setMenuOpen(false)} $active={isActive('/contact')}>Contact</NavItem>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;
