import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background: #24312d;
  color: #fff;
  padding: 4.5rem clamp(1.25rem, 7vw, 7rem) 1.5rem;
`;

export const FooterTop = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 1.35fr) minmax(130px, 0.65fr) minmax(260px, 1fr);
  align-items: flex-start;
  gap: 4rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const FooterBrand = styled.div``;

export const LogoImage = styled.img`
  width: 84px;
  margin: 0 0 1rem;
  display: block;

  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Tagline = styled.p`
  max-width: 250px;
  margin: 0;
  color: #b9c8be;
  font-size: 0.95rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

export const FooterLabel = styled.p`
  color: #f0b36d;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin: 0 0 0.7rem;
`;

export const FooterDescription = styled.p`
  max-width: 300px;
  color: #91a49a;
  font-size: 0.85rem;
  line-height: 1.6;
  margin: 1.25rem 0 0;
`;

export const LinkSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

export const LinkTitle = styled.h2`
  color: #fff;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  margin: 0 0 0.2rem;
  text-transform: uppercase;
`;

export const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.65rem;
  min-width: 150px;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const LinkItem = styled.a`
  color: #b9c8be;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #f0b36d;
  }
`;

export const ContactCard = styled.div`
  display: grid;
  justify-items: start;
  gap: 0.65rem;
  border-left: 2px solid #bd5b3c;
  padding-left: 1.25rem;

  @media (max-width: 768px) { justify-items: start; }
`;

export const ContactLabel = styled.p`
  color: #f0b36d;
  font-family: Georgia, serif;
  font-size: 1.2rem;
  margin: 0 0 0.3rem;
`;

export const Copyright = styled.div`
  padding-top: 1rem;
  color: #91a49a;
  border-top: 1px solid rgba(185, 200, 190, 0.2);
  text-align: center;
  font-size: 0.85rem;
`;
