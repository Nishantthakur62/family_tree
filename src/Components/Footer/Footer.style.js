import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #24312d;
  color: #fff;
  padding: 3.5rem clamp(1.25rem, 6vw, 6rem) 1.25rem;
`;

export const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2.5rem;
  margin-bottom: 2rem;

  > div {
    flex: 1;
    max-width: 260px;
    text-align: left;
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

export const LinkSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
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

export const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin: 2rem 0 1rem;
`;

export const Icon = styled.div`
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  color: #b9c8be;
  border: 1px solid rgba(185, 200, 190, 0.28);
  border-radius: 50%;
  font-size: 0.9rem;

  &:hover {
    color: #f0b36d;
    cursor: pointer;
  }
`;

export const Copyright = styled.div`
  padding-top: 1rem;
  color: #91a49a;
  border-top: 1px solid rgba(185, 200, 190, 0.2);
  text-align: center;
  font-size: 0.85rem;
`;
