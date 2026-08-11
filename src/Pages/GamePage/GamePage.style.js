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

export const ActivityGrid = styled.div`
  width: min(960px, 100%);
  margin: 0 auto;
  display: grid;
  gap: 1.25rem;
`;

export const Activity = styled.section`
  border-top: 1px solid rgba(36, 49, 45, 0.2);
  padding: 2rem 0 2.5rem;
`;

export const ActivityHeading = styled.h2`
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  font-family: Georgia, serif;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 400;
  margin: 0;

  span { color: #bd5b3c; font-family: inherit; font-size: 0.8rem; }
`;

export const ActivityCopy = styled.p`
  color: #68776d;
  line-height: 1.6;
  margin: 0.6rem 0 1.5rem;
`;

export const PromptButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid #bd5b3c;
  border-radius: 3px;
  background: transparent;
  color: #a4492f;
  cursor: pointer;
  font-weight: 700;
  padding: 0.8rem 1rem;

  &:hover { background: rgba(189, 91, 60, 0.1); }
`;

export const TicStatus = styled.p`
  color: #bd5b3c;
  font-family: Georgia, serif;
  font-size: 1.4rem;
  margin: 1.25rem 0;
`;

export const TicTacToe = styled.div`
  width: min(330px, 100%);
  margin: 0 auto 1.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.55rem;
`;

export const TicCell = styled.button`
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border: 1px solid rgba(36, 49, 45, 0.2);
  border-radius: 4px;
  background: #fffaf2;
  color: #bd5b3c;
  cursor: pointer;
  font-family: Georgia, serif;
  font-size: 2.2rem;

  &:hover { background: #f0b36d; }
`;

export const QuizOptions = styled.div`
  width: min(680px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.7rem;

  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

export const QuizOption = styled.button`
  border: 1px solid rgba(36, 49, 45, 0.24);
  border-radius: 3px;
  background: rgba(255, 250, 242, 0.7);
  color: #24312d;
  cursor: pointer;
  padding: 1rem;
  text-align: left;

  border-color: ${({ $selected, $correct }) => ($selected ? ($correct ? '#52745d' : '#bd5b3c') : 'rgba(36, 49, 45, 0.24)')};
  background: ${({ $selected, $correct }) => ($selected ? ($correct ? '#e3eee3' : '#f4ddd4') : 'rgba(255, 250, 242, 0.7)')};

  &:hover { border-color: #bd5b3c; color: #a4492f; }
`;

export const QuizResult = styled.div`
  display: grid;
  justify-items: center;
  gap: 0.7rem;
  text-align: center;

  strong { color: #bd5b3c; font-family: Georgia, serif; font-size: 3rem; font-weight: 400; }
  span { color: #68776d; }
`;

export const DiceGrid = styled.div`
  width: min(760px, 100%);
  margin: 1.5rem auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;

  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

export const Dice = styled.div`
  min-height: 130px;
  display: grid;
  align-content: center;
  gap: 0.65rem;
  border: 1px solid rgba(36, 49, 45, 0.2);
  border-radius: 5px;
  background: #fffaf2;
  padding: 1rem;
  text-align: center;

  span { color: #bd5b3c; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
  strong { font-family: Georgia, serif; font-size: 1.25rem; font-weight: 400; }
`;

export const OddFeedback = styled.div`
  width: min(680px, 100%);
  margin: 1.2rem auto 0;
  display: grid;
  justify-items: center;
  gap: 0.55rem;
  border-top: 1px solid ${({ $correct }) => ($correct ? '#52745d' : '#bd5b3c')};
  padding-top: 1rem;
  text-align: center;

  strong { color: ${({ $correct }) => ($correct ? '#52745d' : '#a4492f')}; font-family: Georgia, serif; font-size: 1.35rem; font-weight: 400; }
  span { color: #68776d; }
`;

export const FaceOffPrompt = styled.div`
  width: min(760px, 100%);
  margin: 1.5rem auto;
  display: grid;
  justify-items: center;
  gap: 0.7rem;
  border: 1px solid rgba(36, 49, 45, 0.2);
  border-radius: 5px;
  background: #24312d;
  color: #fffaf2;
  padding: 1.5rem;
  text-align: center;

  svg { color: #f0b36d; font-size: 1.8rem; }
  strong { max-width: 620px; font-family: Georgia, serif; font-size: clamp(1.2rem, 2.5vw, 1.8rem); font-weight: 400; line-height: 1.25; }
`;

export const FaceOffOptions = styled.div`
  width: min(760px, 100%);
  margin: 0 auto;
  display: grid;
  gap: 0.7rem;
`;