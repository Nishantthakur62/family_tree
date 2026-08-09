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

const Footer = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <div>
          <LogoImage src={logo} alt="FamilyTree Logo" style={{ transform: "scale(0.5)" }} />
          <Tagline>Preserving your legacy, one branch at a time.</Tagline>
        </div>
        <LinkSection>
          <LinkGroup>
            <LinkItem href="/">Home</LinkItem>
            <LinkItem href="/families">Families</LinkItem>
            <LinkItem href="/export-history">Export</LinkItem>
            <LinkItem href="/contact">Contact</LinkItem>
          </LinkGroup>
        </LinkSection>
        <LinkGroup>
          <LinkItem href="mailto:support@familytree.com">Support</LinkItem>
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