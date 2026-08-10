import styled from 'styled-components';
import bgImage from '../../Assets/Images/family-tree-bg.jpg';

export const HomeContainer = styled.div`
  position: relative;
  min-height: calc(100vh - 76px);
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: clamp(6rem, 10vw, 9rem) clamp(1.25rem, 8vw, 8rem) clamp(4rem, 8vw, 7rem);
  background: #f6f4ef;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(36, 49, 45, 0.08) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: linear-gradient(90deg, #000 0%, transparent 70%);
    pointer-events: none;
  }
`;

export const BackgroundImage = styled.div`
  position: absolute;
  right: clamp(1.25rem, 7vw, 7rem);
  top: clamp(7rem, 12vw, 10rem);
  height: min(62vh, 610px);
  width: min(38vw, 520px);
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  border-radius: 120px 18px 18px 18px;
  box-shadow: 18px 18px 0 #d9e0d4;
  filter: saturate(0.78);
  z-index: 0;

  @media (max-width: 760px) {
    position: relative;
    right: auto;
    top: auto;
    order: 2;
    width: 100%;
    height: 300px;
    margin-top: 2.5rem;
  }
`;

export const WelcomeMessage = styled.div`
  position: relative;
  z-index: 1;
  color: #24312d;
  width: min(1180px, 100%);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 0.56fr);
  align-items: end;
  gap: clamp(2rem, 8vw, 8rem);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    align-items: start;
  }

  h1 {
    font-family: Georgia, serif;
    font-size: clamp(3rem, 6.5vw, 6.6rem);
    line-height: 0.96;
    max-width: 730px;
    margin: 0 0 1.25rem;
    font-weight: 400;
  }

  p {
    color: #68776d;
    font-size: clamp(1rem, 1.4vw, 1.15rem);
    line-height: 1.7;
    max-width: 540px;
    margin: 0;
  }
`;

export const Content = styled.div``;

export const Eyebrow = styled.div`
  color: #bd5b3c;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2.25rem;
`;

export const Button = styled.button`
  padding: 0.95rem 1.25rem;
  font-size: 0.95rem;
  font-weight: bold;
  background-color: #bd5b3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    background-color: #a4492f;
    transform: translateY(-2px);
  }
`;

export const SecondaryButton = styled.a`
  color: #52615b;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  padding: 0.95rem 0.5rem;
  border-bottom: 1px solid rgba(82, 97, 91, 0.45);
`;

export const DemoButton = styled.button`
  padding: 0.95rem 0.5rem;
  color: #68776d;
  background: transparent;
  border: 0;
  border-bottom: 1px dashed rgba(104, 119, 109, 0.55);
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 700;

  &:hover {
    color: #bd5b3c;
    border-color: #bd5b3c;
  }
`;

export const StoryPanel = styled.aside`
  padding: 1.5rem;
  border-left: 1px solid rgba(36, 49, 45, 0.24);
  max-width: 360px;
  margin-bottom: 0.5rem;
`;

export const StoryLabel = styled.div`
  color: #bd5b3c;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
`;

export const StoryTitle = styled.h2`
  font-family: Georgia, serif;
  font-size: 1.7rem;
  font-weight: 400;
  line-height: 1.15;
  margin: 0 0 0.8rem;
`;

export const StoryCopy = styled.p`
  && {
    font-size: 0.9rem;
    line-height: 1.55;
  }
`;

export const Stats = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-top: 2rem;
  color: #7b8c80;
  font-size: 0.68rem;
  line-height: 1.35;

  strong {
    display: block;
    color: #bd5b3c;
    font-family: Georgia, serif;
    font-size: 1.4rem;
    font-weight: 400;
  }
`;
