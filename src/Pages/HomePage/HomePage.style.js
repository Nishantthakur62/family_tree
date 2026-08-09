import styled from 'styled-components';
import bgImage from '../../Assets/Images/family-tree-bg.jpg';

export const HomeContainer = styled.div`
  position: relative;
  min-height: calc(100vh - 76px);
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: clamp(3rem, 8vw, 7rem) clamp(1.25rem, 8vw, 8rem);
`;

export const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: 62% center;
  z-index: 0;
`;

export const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, rgba(18, 31, 28, 0.92) 0%, rgba(18, 31, 28, 0.64) 48%, rgba(18, 31, 28, 0.18) 100%);
  z-index: 1;
`;

export const WelcomeMessage = styled.div`
  position: relative;
  z-index: 2;
  color: #fff;
  width: min(1120px, 100%);
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(260px, 0.65fr);
  align-items: end;
  gap: clamp(2rem, 8vw, 8rem);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    align-items: start;
  }

  h1 {
    font-family: Georgia, serif;
    font-size: clamp(3.2rem, 7vw, 6.8rem);
    line-height: 0.95;
    max-width: 760px;
    margin: 0 0 1.5rem;
    font-weight: 400;
    letter-spacing: -0.04em;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: clamp(1rem, 1.6vw, 1.2rem);
    line-height: 1.65;
    max-width: 570px;
    margin: 0;
  }
`;

export const Content = styled.div``;

export const Eyebrow = styled.div`
  color: #f0b36d;
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
  background-color: #f0b36d;
  color: #24312d;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    background-color: #f6c98f;
    transform: translateY(-2px);
  }
`;

export const SecondaryButton = styled.a`
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  padding: 0.95rem 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
`;

export const StoryPanel = styled.aside`
  padding: 1.5rem;
  border-left: 1px solid rgba(255, 255, 255, 0.45);
  max-width: 360px;
  margin-bottom: 0.5rem;
`;

export const StoryLabel = styled.div`
  color: #f0b36d;
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
  color: rgba(255, 255, 255, 0.58);
  font-size: 0.68rem;
  line-height: 1.35;

  strong {
    display: block;
    color: #f0b36d;
    font-family: Georgia, serif;
    font-size: 1.4rem;
    font-weight: 400;
  }
`;
