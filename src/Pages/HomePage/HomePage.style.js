import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

export const HomeContainer = styled.div`
  position: relative;
  width: 100%;
  background: linear-gradient(135deg, #f6f4ef 0%, #faf9f6 50%, #f1ede6 100%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255, 107, 107, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    animation: ${float} 6s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(108, 92, 231, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    animation: ${float} 8s ease-in-out infinite reverse;
  }
`;

export const HeroSection = styled.div`
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: clamp(2rem, 5vw, 4rem);
  text-align: center;
`;

export const HeroContent = styled.div`
  animation: ${fadeInUp} 0.8s ease-out;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: clamp(2.5rem, 7vw, 5rem);
    font-weight: 900;
    margin: 0 0 1rem;
    color: #24312d;
    line-height: 1.1;
    letter-spacing: -0.02em;

    .emoji {
      display: inline-block;
      font-size: 1em;
      animation: ${pulse} 2s ease-in-out infinite;
      margin: 0 0.2em;
    }
  }

  .subtitle {
    font-size: clamp(1rem, 3vw, 1.3rem);
    color: #FF6B6B;
    font-weight: 700;
    margin-bottom: 2rem;
    letter-spacing: 0.05em;
  }

  p {
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    color: #555;
    line-height: 1.8;
    margin: 0 0 2rem;
    font-weight: 500;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
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
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;

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
  padding: 1rem 1.75rem;
  font-size: 1rem;
  font-weight: 700;
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E42 100%);
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transition: left 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
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
  padding: 0.95rem 1.25rem;
  color: #555;
  background: rgba(255, 255, 255, 0.7);
  border: 2px solid rgba(108, 92, 231, 0.2);
  border-radius: 50px;
  cursor: pointer;
  font: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    border-color: #6C5CE7;
    color: #6C5CE7;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(108, 92, 231, 0.2);
  }
`;

export const FeaturesSection = styled.section`
  position: relative;
  z-index: 10;
  padding: 6rem clamp(1.25rem, 8vw, 8rem);
  background: #fff;
  margin-top: 4rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

export const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

export const FeatureCard = styled.div`
  padding: 2rem;
  border-radius: 16px;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.6s ease-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: rgba(255, 107, 107, 0.2);
    background: linear-gradient(135deg, #fff 0%, #fffaf5 100%);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    display: inline-block;
    animation: ${float} 3s ease-in-out infinite;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 0.75rem;
    color: #24312d;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

export const SocialProofSection = styled.section`
  position: relative;
  z-index: 10;
  padding: 4rem clamp(1.25rem, 8vw, 8rem);
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(108, 92, 231, 0.05) 100%);
  text-align: center;
  animation: ${fadeIn} 1s ease-out 0.4s both;
`;

export const SocialProofContent = styled.div`
  max-width: 600px;
  margin: 0 auto;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 1rem;
    color: #24312d;
  }

  p {
    font-size: 1.1rem;
    color: #666;
    margin: 0;
  }
`;

export const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: #FF6B6B;
  display: inline-block;
  margin-top: 1rem;
`;

export const StoryPanel = styled.aside`
  padding: 2rem;
  border-left: 3px solid #FF6B6B;
  max-width: 360px;
  margin-bottom: 0.5rem;
  background: rgba(255, 107, 107, 0.02);
  border-radius: 8px;
  animation: ${fadeInUp} 0.8s ease-out 0.3s both;
`;

export const StoryLabel = styled.div`
  color: #FF6B6B;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
  font-weight: 700;
`;

export const StoryTitle = styled.h2`
  font-family: Georgia, serif;
  font-size: 1.7rem;
  font-weight: 400;
  line-height: 1.15;
  margin: 0 0 0.8rem;
  color: #24312d;
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
