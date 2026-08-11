import styled from 'styled-components';

export const GameShell = styled.main`
  min-height: calc(100vh - 76px);
  padding: clamp(4rem, 9vw, 8rem) clamp(1.25rem, 8vw, 8rem);
  background: #f1e8d8;
  color: #24312d;
`;

export const GameHeader = styled.div`
  width: min(960px, 100%);
  margin: 0 auto 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 3rem;

  @media (max-width: 680px) {
    display: grid;
    gap: 2rem;
  }
`;

export const Eyebrow = styled.div`
  color: #bd5b3c;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
`;

export const Heading = styled.h1`
  font-family: Georgia, serif;
  font-size: clamp(3rem, 8vw, 6.5rem);
  font-weight: 400;
  line-height: 0.92;
  margin: 0 0 1.25rem;
`;

export const Intro = styled.p`
  max-width: 480px;
  color: #68776d;
  line-height: 1.7;
  margin: 0;
`;

export const Scoreboard = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-shrink: 0;
`;

export const Score = styled.div`
  display: grid;
  gap: 0.25rem;
  min-width: 80px;
  border-top: 2px solid #bd5b3c;
  padding-top: 0.7rem;

  strong { font-family: Georgia, serif; font-size: 1.7rem; font-weight: 400; }
  span { color: #68776d; font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; }
`;

export const Board = styled.div`
  width: min(620px, 100%);
  margin: 0 auto 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(0.7rem, 2vw, 1.2rem);
`;

export const Card = styled.button`
  aspect-ratio: 1;
  border: 0;
  border-radius: 6px;
  padding: 0;
  background: transparent;
  cursor: pointer;
  perspective: 800px;

  &:focus-visible { outline: 3px solid #bd5b3c; outline-offset: 4px; }
`;

export const CardInner = styled.span`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.45s ease;
  transform: ${({ $revealed }) => ($revealed ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

export const CardFace = styled.span`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  border-radius: 6px;
  backface-visibility: hidden;
`;

export const CardFront = styled(CardFace)`
  background: #24312d;
  color: #f0b36d;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
`;

export const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  background: #fffaf2;
  color: #bd5b3c;
  gap: 0.6rem;
  font-size: clamp(1.5rem, 4vw, 2.5rem);

  span { color: #24312d; font-family: Georgia, serif; font-size: 0.95rem; }
`;

export const Result = styled.div`
  display: grid;
  justify-items: center;
  gap: 0.55rem;
  margin: 0 auto 1.25rem;
  text-align: center;

  strong { font-family: Georgia, serif; font-size: 1.7rem; font-weight: 400; }
  span { color: #68776d; }
`;

export const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0 auto;
  border: 0;
  border-radius: 3px;
  background: #bd5b3c;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  padding: 0.9rem 1.15rem;

  &:hover { background: #a4492f; }
`;