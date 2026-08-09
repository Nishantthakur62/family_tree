import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(246, 244, 239, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(36, 49, 45, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem clamp(1rem, 5vw, 4.5rem);
  z-index: 1000;
  min-height: 76px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const LogoImage = styled.img`
  width: 74px;
  height: auto;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 68px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 0.35rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.div`
  color: ${({ $active }) => ($active ? '#bd5b3c' : '#52615b')};
  font-weight: 700;
  text-decoration: none;
  font-size: 0.86rem;
  letter-spacing: 0.04em;
  padding: 0.65rem 0.9rem;
  border-radius: 999px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;

  &:hover {
    color: #bd5b3c;
    background: rgba(189, 91, 60, 0.09);
  }
`;

export const Hamburger = styled.button`
  display: none;
  font-size: 1.5rem;
  color: #24312d;
  background: transparent;
  border: 0;
  padding: 0.25rem;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #f6f4ef;
  border-bottom: 1px solid rgba(36, 49, 45, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  gap: 1rem;

  a {
    color: #52615b;
    font-size: 1rem;
    text-decoration: none;

    &:hover {
      color: #ffffff;
    }
  }
`;
