import {
  FooterContainer,
  FooterTop,
  FooterBrand,
  LogoImage,
  Tagline,
  FooterLabel,
  FooterDescription,
  LinkSection,
  LinkTitle,
  LinkGroup,
  LinkItem,
  ContactCard,
  ContactLabel,
  Copyright,
} from './Footer.style';

import logo from '../../../src/Assets/Logo/WebsiteLogo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <FooterBrand>
          <LogoImage src={logo} alt="FamilyTree Logo" />
          <FooterLabel>Keep the roots close.</FooterLabel>
          <Tagline>Preserving your legacy, one branch at a time.</Tagline>
          <FooterDescription>A calm place to build your tree, save the details, and play together.</FooterDescription>
        </FooterBrand>
        <LinkSection>
          <LinkTitle>Explore</LinkTitle>
          <LinkGroup>
            <LinkItem as={Link} to="/">Home</LinkItem>
            <LinkItem as={Link} to="/families">Families</LinkItem>
            <LinkItem as={Link} to="/export-history">Export</LinkItem>
            <LinkItem as={Link} to="/contact">Contact</LinkItem>
            <LinkItem as={Link} to="/game">Playroom</LinkItem>
          </LinkGroup>
        </LinkSection>
        <ContactCard>
          <ContactLabel>Have a story to share?</ContactLabel>
          <LinkItem href="mailto:nishantthakur13579@gmail.com">nishantthakur13579@gmail.com</LinkItem>
          <LinkItem href="#">Privacy Policy</LinkItem>
          <LinkItem href="#">Terms & Conditions</LinkItem>
        </ContactCard>
      </FooterTop>
      <Copyright>
        © {new Date().getFullYear()} FamilyTree. A thoughtful home for the stories that shape us.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;