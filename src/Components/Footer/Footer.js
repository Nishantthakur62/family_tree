import {
  FooterContainer,
  FooterTop,
  LogoImage,
  Tagline,
  LinkSection,
  LinkGroup,
  LinkItem,
  SocialIcons,
  Icon,
  Copyright,
} from './Footer.style';

import { FaFacebookF, FaInstagram, FaTwitter, FaGlobe } from 'react-icons/fa';
import logo from '../../../src/Assets/Logo/WebsiteLogo.png'; // Adjust the path as necessary
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <div>
          <LogoImage src={logo} alt="FamilyTree Logo" />
          <Tagline>Preserving your legacy, one branch at a time.</Tagline>
        </div>
        <LinkSection>
          <LinkGroup>
            <LinkItem as={Link} to="/">Home</LinkItem>
            <LinkItem as={Link} to="/families">Families</LinkItem>
            <LinkItem as={Link} to="/export-history">Export</LinkItem>
            <LinkItem as={Link} to="/contact">Contact</LinkItem>
            <LinkItem as={Link} to="/game">Game</LinkItem>
          </LinkGroup>
        </LinkSection>
        <LinkGroup>
          <LinkItem href="mailto:nishantthakur13579@gmail.com">nishantthakur13579@gmail.com</LinkItem>
          <LinkItem href="#">Privacy Policy</LinkItem>
          <LinkItem href="#">Terms & Conditions</LinkItem>
        </LinkGroup>
      </FooterTop>
      <SocialIcons>
        <Icon><FaGlobe /></Icon>
        <Icon><FaFacebookF /></Icon>
        <Icon><FaTwitter /></Icon>
        <Icon><FaInstagram /></Icon>
      </SocialIcons>
      <Copyright>
        © {new Date().getFullYear()} FamilyTree | Built with ❤️ by Nishant
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;