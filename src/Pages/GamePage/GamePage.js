import React, { useEffect, useState } from 'react';
import { FiHeart, FiHome, FiMap, FiStar, FiUsers } from 'react-icons/fi';
import {
  GameShell,
  GameHeader,
  Eyebrow,
  Heading,
  Intro,
  Scoreboard,
  Score,
  Board,
  Card,
  CardInner,
  CardFront,
  CardBack,
  Result,
  ResetButton,
} from './GamePage.style';

const pairs = [
  { id: 'people', label: 'People', Icon: FiUsers },
  { id: 'heart', label: 'Stories', Icon: FiHeart },
  { id: 'home', label: 'Home', Icon: FiHome },
];

const shuffle = (items) => [...items, ...items].sort(() => Math.random() - 0.5);

const GamePage = () => {
  const [cards, setCards] = useState(() => shuffle(pairs));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flipped.length !== 2) return undefined;

    const [first, second] = flipped;
    setMoves((currentMoves) => currentMoves + 1);

    if (cards[first].id === cards[second].id) {
      setMatched((currentMatched) => [...currentMatched, cards[first].id]);
      setFlipped([]);
      return undefined;
    }

    const timer = setTimeout(() => setFlipped([]), 750);
    return () => clearTimeout(timer);
  }, [cards, flipped]);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index].id)) return;
    setFlipped((currentFlipped) => [...currentFlipped, index]);
  };

  const resetGame = () => {
    setCards(shuffle(pairs));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  return (
    <GameShell>
      <GameHeader>
        <div>
          <Eyebrow>Family archive / play</Eyebrow>
          <Heading>Roots Recall</Heading>
          <Intro>Match the symbols that keep a family story together. Take your time, then see how quickly you can bring every pair home.</Intro>
        </div>
        <Scoreboard aria-label="Game score">
          <Score><strong>{moves}</strong><span>Moves</span></Score>
          <Score><strong>{matched.length} / {pairs.length}</strong><span>Pairs found</span></Score>
        </Scoreboard>
      </GameHeader>

      <Board aria-label="Roots Recall memory game">
        {cards.map((card, index) => {
          const isRevealed = flipped.includes(index) || matched.includes(card.id);
          const CardIcon = card.Icon;
          return (
            <Card key={`${card.id}-${index}`} type="button" onClick={() => handleCardClick(index)} $revealed={isRevealed} aria-label={isRevealed ? card.label : 'Hidden card'}>
              <CardInner $revealed={isRevealed}>
                <CardFront><FiStar aria-hidden="true" /></CardFront>
                <CardBack><CardIcon aria-hidden="true" /><span>{card.label}</span></CardBack>
              </CardInner>
            </Card>
          );
        })}
      </Board>

      {matched.length === pairs.length ? (
        <Result><strong>Every branch is connected.</strong><span>You found all the pairs in {moves} moves.</span><ResetButton type="button" onClick={resetGame}>Play again <FiMap aria-hidden="true" /></ResetButton></Result>
      ) : (
        <ResetButton type="button" onClick={resetGame}>Shuffle the cards <FiMap aria-hidden="true" /></ResetButton>
      )}
    </GameShell>
  );
};

export default GamePage;