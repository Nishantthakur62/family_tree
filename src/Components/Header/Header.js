import React, { useEffect, useState } from 'react';
import {
  HeaderContainer,
  LogoImage,
  LogoLink,
  Nav,
  NavItem,
  NavCta,
  Hamburger,
  MobileMenu,
} from './Header.style';
import logo from '../../../src/Assets/Logo/WebsiteLogo.png';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowRight, FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => path === '/families'
    ? location.pathname === path || location.pathname.startsWith('/builder/')
    : location.pathname === path;

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <HeaderContainer>
      <LogoLink as={Link} to="/" aria-label="FamilyTree home"><LogoImage src={logo} alt="FamilyTree Logo" /></LogoLink>
      
      
    
      <Nav>
        <NavItem as={Link} to="/" $active={isActive('/')} aria-current={isActive('/') ? 'page' : undefined}>Home</NavItem>
        <NavItem as={Link} to="/families" $active={isActive('/families')} aria-current={isActive('/families') ? 'page' : undefined}>Families</NavItem>
        <NavItem as={Link} to="/export-history" $active={isActive('/export-history')} aria-current={isActive('/export-history') ? 'page' : undefined}>Export</NavItem>
        <NavItem as={Link} to="/contact" $active={isActive('/contact')} aria-current={isActive('/contact') ? 'page' : undefined}>Contact</NavItem>
        <NavCta as={Link} to="/?start=1">Build your tree <FiArrowRight aria-hidden="true" /></NavCta>
      </Nav>

      <Hamburger type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
      </Hamburger>

      {menuOpen && (
        <MobileMenu>
          <NavItem as={Link} to="/" onClick={() => setMenuOpen(false)} $active={isActive('/')}>Home</NavItem>
          <NavItem as={Link} to="/families" onClick={() => setMenuOpen(false)} $active={isActive('/families')}>Families</NavItem>
          <NavItem as={Link} to="/export-history" onClick={() => setMenuOpen(false)} $active={isActive('/export-history')}>Export</NavItem>
          <NavItem as={Link} to="/contact" onClick={() => setMenuOpen(false)} $active={isActive('/contact')}>Contact</NavItem>
          <NavCta as={Link} to="/?start=1" onClick={() => setMenuOpen(false)}>Build your tree <FiArrowRight aria-hidden="true" /></NavCta>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;
