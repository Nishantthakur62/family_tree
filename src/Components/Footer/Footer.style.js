import styled from 'styled-components';

export const FooterContainer = styled.footer`
   background-color: #0f172a;
  
  
  
  color: #ffffff;
  padding: 3rem 1.5rem;
  text-align: center;
  
  
`;

export const FooterTop = styled.div`
  display: flex;
  justify-content: space-evenly;  // equal space between items
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;

  > div {
    flex: 1;                // each child takes equal width
    max-width: 200px;       // optional: limit max width
    text-align: center;     // center content
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    > div {
      text-align: center;
      max-width: none;
    }
  }
`;

export const LogoImage = styled.img`
  width: 100px;
  margin: 0 auto 1rem auto;
  display: block;
`;


export const Tagline = styled.p`
  font-size: 0.95rem;
  color: #cbd5e1;
  max-width: 250px;
  margin: 0 auto;
  text-align: center;      // center align the text
  display: flex;           // ensures vertical + horizontal control
  justify-content: center; // horizontal centering
  align-items: center;     // vertical centering (if inside fixed-height parent)
  flex-wrap: wrap;         // wrap if content overflows
  line-height: 1.5;
`;


export const LinkSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 150px;
  justify-content: center;

`;

export const LinkItem = styled.a`
  color: #94a3b8;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ffffff;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

export const Icon = styled.div`
  font-size: 1.3rem;
  color: #94a3b8;
  transition: color 0.3s ease;

  &:hover {
    color: #ffffff;
    cursor: pointer;
  }
`;

export const Copyright = styled.div`
  font-size: 0.85rem;
  color: #64748b;
  padding-top: 1rem;
  border-top: 1px solid #2d3748;
`;