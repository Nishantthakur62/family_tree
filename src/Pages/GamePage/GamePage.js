import React, { useEffect, useState } from 'react';
import { FiHeart, FiHome, FiMap, FiRefreshCw, FiStar, FiUsers, FiX, FiZap } from 'react-icons/fi';
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
  ActivityGrid,
  Activity,
  ActivityHeading,
  ActivityCopy,
  TicTacToe,
  TicCell,
  TicStatus,
  PromptButton,
  QuizOptions,
  QuizOption,
  QuizResult,
  OddFeedback,
  FaceOffPrompt,
  FaceOffOptions,
} from './GamePage.style';

const pairs = [
  { id: 'people', label: 'People', Icon: FiUsers },
  { id: 'heart', label: 'Stories', Icon: FiHeart },
  { id: 'home', label: 'Home', Icon: FiHome },
];

const shuffle = (items) => [...items, ...items].sort(() => Math.random() - 0.5);
const randomize = (items) => [...items].sort(() => Math.random() - 0.5);

const faceOffRounds = [
  { question: 'Which family superpower would you choose?', options: ['Always find the missing TV remote', 'Always know who brought dessert'] },
  { question: 'Pick your reunion entrance:', options: ['Two hours early with snacks', 'Twenty minutes late with a dramatic story'] },
  { question: 'Which family chaos would you survive?', options: ['The group chat read aloud at dinner', 'The childhood photo slideshow with commentary'] },
  { question: 'Choose your legendary role:', options: ['Keeper of every secret recipe', 'Keeper of every embarrassing story'] },
  { question: 'What would you rather hear at breakfast?', options: ['A ten-minute story with no ending', 'A confident opinion about something nobody asked'] },
  { question: 'Pick your unusual family talent:', options: ['Parallel-park any vehicle on the first try', 'Fold a fitted sheet without starting a feud'] },
  { question: 'Which invitation can you not refuse?', options: ['A “quick coffee” that becomes dinner', 'A “small favor” involving a ladder'] },
  { question: 'Choose your family documentary title:', options: ['The Snacks Were Never Safe', 'A Brief History of Being Competitive'] },
  { question: 'Which power would make holidays easier?', options: ['Pause time during dessert', 'Mute one relative for exactly six minutes'] },
  { question: 'What belongs on your family crest?', options: ['A heroic spoon', 'A suspiciously large calendar'] },
];

const oddFamilies = [
  { prompt: 'Which one does not belong in a family archive?', related: ['Photo', 'Letter', 'Recipe'], odd: ['Volcano', 'Helmet', 'Trampoline', 'Spaceship', 'Toaster'], reason: 'The other three can all preserve a family memory.' },
  { prompt: 'Which one is least likely to arrive at a reunion?', related: ['Cousin', 'Aunt', 'Grandparent'], odd: ['Map', 'Robot', 'Submarine', 'Traffic cone', 'Dinosaur'], reason: 'The other three are people you might actually greet at the door.' },
  { prompt: 'Which one is not a classic family gathering sound?', related: ['Laugh', 'Story', 'Dance'], odd: ['Screwdriver', 'Fire alarm', 'Chainsaw', 'Car horn', 'Whistle'], reason: 'The other three belong to the joyful noise of being together.' },
  { prompt: 'Which one usually does not come with cake?', related: ['Birthday', 'Wedding', 'Reunion'], odd: ['Tax audit', 'Dentist visit', 'Parking ticket', 'Power cut', 'Flat tyre'], reason: 'The other three are celebrations with suspiciously good dessert potential.' },
  { prompt: 'Which one is not a person who tells family stories?', related: ['Nana', 'Pop-Pop', 'Auntie'], odd: ['Microwave', 'Mailbox', 'Lawnmower', 'Teapot', 'Shoe rack'], reason: 'The other three have probably already told you this story twice.' },
  { prompt: 'Which one is not something you might find in an old photo?', related: ['Hat', 'Smile', 'Bicycle'], odd: ['Wi-Fi signal', 'Laser beam', 'Hologram', 'Drone swarm', 'Robot arm'], reason: 'The other three are classic photo evidence, even if the hat was questionable.' },
  { prompt: 'Which one is not a family nickname?', related: ['Buddy', 'Shorty', 'Sunshine'], odd: ['Refrigerator', 'Spreadsheet', 'Traffic light', 'Pavement', 'Satellite'], reason: 'The other three sound like names that stick around for decades.' },
  { prompt: 'Which one is not a reason people visit home?', related: ['Dinner', 'Holiday', 'A hug'], odd: ['Volcano inspection', 'Moon landing', 'Alien interview', 'Treasure hunt', 'Cloud measurement'], reason: 'The other three are perfectly normal excuses to come home.' },
  { prompt: 'Which one does not belong on a family tree?', related: ['Parent', 'Sibling', 'Cousin'], odd: ['Cactus', 'Traffic jam', 'Umbrella', 'Pancake', 'Sofa'], reason: 'The other three describe real family relationships.' },
  { prompt: 'Which one is not a keepsake?', related: ['Postcard', 'Photo album', 'Recipe card'], odd: ['Parking meter', 'Shoe horn', 'Traffic cone', 'Garden hose', 'Remote control'], reason: 'The other three are small things that can carry a big memory.' },
  { prompt: 'Which one does not belong in a family recipe?', related: ['Flour', 'Cinnamon', 'Vanilla'], odd: ['Batteries', 'Pebbles', 'Socks', 'Keyboard keys', 'Confetti'], reason: 'The other three can actually make dessert better.' },
  { prompt: 'Which one is not a reunion activity?', related: ['Dancing', 'Eating', 'Catching up'], odd: ['Volcano surfing', 'Underwater chess', 'Rocket racing', 'Meteor catching', 'Time travel'], reason: 'The other three are achievable before dessert.' },
  { prompt: 'Which one is not a family role?', related: ['Storyteller', 'Photographer', 'Snack provider'], odd: ['Elevator', 'Telescope', 'Broom', 'Sunglasses', 'Doorbell'], reason: 'The other three are unofficial jobs someone always adopts.' },
  { prompt: 'Which one is not something a grandparent might keep in a drawer?', related: ['Old keys', 'Photos', 'Receipts'], odd: ['A submarine', 'A giraffe', 'A weather satellite', 'A marching band', 'A football stadium'], reason: 'The other three fit the mysterious drawer ecosystem.' },
  { prompt: 'Which one is not a family celebration?', related: ['Anniversary', 'Graduation', 'Birthday'], odd: ['Parking fine', 'Broken printer', 'Monday meeting', 'Tax deadline', 'Lost sock'], reason: 'The other three deserve a toast, not a complaint.' },
  { prompt: 'Which one is not a way to save a memory?', related: ['Writing it down', 'Taking a photo', 'Recording a voice note'], odd: ['Hiding it in a bush', 'Whispering at a wall', 'Telling it to a pigeon', 'Drawing it on toast', 'Yelling into a cupboard'], reason: 'The other three have a chance of surviving tomorrow.' },
  { prompt: 'Which one is not something you bring to a picnic?', related: ['Blanket', 'Sandwiches', 'Lemonade'], odd: ['A filing cabinet', 'A traffic light', 'A grand piano', 'A fog machine', 'A forklift'], reason: 'The other three are sensible picnic equipment, more or less.' },
  { prompt: 'Which one is not a family conversation starter?', related: ['Where did you grow up?', 'What was your first job?', 'Who taught you that recipe?'], odd: ['How fast is this toaster?', 'Can a cloud drive?', 'Why is the moon late?', 'Do socks have feelings?', 'Is a chair just a table with commitment issues?'], reason: 'The other three invite a real story instead of a philosophical emergency.' },
  { prompt: 'Which one is not something you might inherit?', related: ['A watch', 'A recipe', 'A photograph'], odd: ['A thunderstorm', 'A traffic jam', 'A dolphin', 'A volcano', 'A satellite'], reason: 'The other three can arrive in a box with a story attached.' },
  { prompt: 'Which one is not a family tradition?', related: ['Sunday dinner', 'Birthday candles', 'Holiday songs'], odd: ['Quarterly tax filing', 'Emergency parachuting', 'Competitive ironing', 'Midnight forklift racing', 'Annual moon walk'], reason: 'The other three sound like traditions people might actually repeat.' },
  { prompt: 'Which one is not a place family stories begin?', related: ['Kitchen', 'Front porch', 'Car ride'], odd: ['The bottom of the ocean', 'A satellite', 'The moon', 'A volcano crater', 'A cloud'], reason: 'The other three are where people naturally start talking.' },
  { prompt: 'Which one is not a family photo pose?', related: ['Arm around a shoulder', 'Big smile', 'Awkward thumbs-up'], odd: ['Full sprint', 'Emergency dive', 'Mid-air cartwheel', 'Parachute landing', 'Rocket launch'], reason: 'The other three are classic signs that the camera appeared.' },
  { prompt: 'Which one is not a way relatives stay in touch?', related: ['Calling', 'Texting', 'Sending a postcard'], odd: ['Smoke signal from space', 'Carrier submarine', 'Telepathy tournament', 'Pigeon orchestra', 'Cave echo'], reason: 'The other three work without a special effects budget.' },
  { prompt: 'Which one is not a family game night staple?', related: ['Cards', 'Charades', 'Board game'], odd: ['Tax tribunal', 'Rocket science exam', 'Traffic court', 'Surgery simulator', 'Volcano roulette'], reason: 'The other three are competitive without requiring protective equipment.' },
];

const oddQuestionBank = oddFamilies.flatMap((family) => family.odd.map((odd) => ({
  prompt: family.prompt,
  options: randomize([...family.related, odd]),
  answer: odd,
  reason: family.reason,
})));

const GamePage = () => {
  const [cards, setCards] = useState(() => shuffle(pairs));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [ticBoard, setTicBoard] = useState(Array(9).fill(null));
  const [ticTurn, setTicTurn] = useState('X');
  const [faceOffDeck] = useState(() => randomize(faceOffRounds));
  const [faceOffIndex, setFaceOffIndex] = useState(0);
  const [faceOffChoice, setFaceOffChoice] = useState(null);
  const [faceOffLeft, setFaceOffLeft] = useState(0);
  const [oddRounds, setOddRounds] = useState(() => randomize(oddQuestionBank).slice(0, 5));
  const [oddIndex, setOddIndex] = useState(0);
  const [oddScore, setOddScore] = useState(0);
  const [oddChoice, setOddChoice] = useState(null);
  const [oddFinished, setOddFinished] = useState(false);

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

  const chooseFaceOff = (choice) => {
    if (faceOffChoice !== null) return;
    setFaceOffChoice(choice);
    if (choice === 0) setFaceOffLeft((currentScore) => currentScore + 1);
  };

  const nextFaceOff = () => {
    setFaceOffIndex((currentIndex) => (currentIndex + 1) % faceOffDeck.length);
    setFaceOffChoice(null);
  };

  const answerOdd = (option) => {
    if (oddChoice) return;
    setOddChoice(option);
    if (option === oddRounds[oddIndex].answer) setOddScore((currentScore) => currentScore + 1);
  };

  const nextOddRound = () => {
    if (oddIndex === oddRounds.length - 1) {
      setOddFinished(true);
      return;
    }
    setOddIndex((currentIndex) => currentIndex + 1);
    setOddChoice(null);
  };

  const resetOdd = () => {
    setOddRounds(randomize(oddQuestionBank).slice(0, 5));
    setOddIndex(0);
    setOddScore(0);
    setOddChoice(null);
    setOddFinished(false);
  };

  const ticWinner = (() => {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    const line = lines.find(([a, b, c]) => ticBoard[a] && ticBoard[a] === ticBoard[b] && ticBoard[a] === ticBoard[c]);
    return line ? ticBoard[line[0]] : null;
  })();

  const ticDraw = !ticWinner && ticBoard.every(Boolean);

  const playTicCell = (index) => {
    if (ticBoard[index] || ticWinner || ticDraw) return;
    const nextBoard = [...ticBoard];
    nextBoard[index] = ticTurn;
    setTicBoard(nextBoard);
    setTicTurn(ticTurn === 'X' ? 'O' : 'X');
  };

  const resetTicTacToe = () => {
    setTicBoard(Array(9).fill(null));
    setTicTurn('X');
  };

  return (
    <GameShell>
      <GameHeader>
        <div>
          <Eyebrow>Family archive / play</Eyebrow>
          <Heading>Family Playroom</Heading>
          <Intro>Four tiny ways to turn family memories into friendly competition, unexpected choices, and moments worth sending to the group chat.</Intro>
        </div>
        <Scoreboard aria-label="Game score">
          <Score><strong>{moves}</strong><span>Moves</span></Score>
          <Score><strong>{matched.length} / {pairs.length}</strong><span>Pairs found</span></Score>
        </Scoreboard>
      </GameHeader>

      <ActivityGrid>
      <Activity>
        <ActivityHeading><span>01</span> Roots Recall</ActivityHeading>
        <ActivityCopy>Match the symbols that keep a family story together.</ActivityCopy>
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
      </Activity>

      <Activity>
        <ActivityHeading><span>02</span> Branch Battle</ActivityHeading>
        <ActivityCopy>A quick game of Tic-Tac-Toe for two people sharing one screen. X goes first.</ActivityCopy>
        <TicStatus>{ticWinner ? `${ticWinner} wins the branch battle.` : ticDraw ? 'A draw. The family remains wonderfully complicated.' : `${ticTurn}'s turn`}</TicStatus>
        <TicTacToe aria-label="Tic-Tac-Toe board">
          {ticBoard.map((cell, index) => <TicCell type="button" key={index} onClick={() => playTicCell(index)} aria-label={`Square ${index + 1}${cell ? `, ${cell}` : ''}`}>{cell === 'X' ? <FiX aria-hidden="true" /> : cell}</TicCell>)}
        </TicTacToe>
        <ResetButton type="button" onClick={resetTicTacToe}>New round <FiRefreshCw aria-hidden="true" /></ResetButton>
      </Activity>

      <Activity>
        <ActivityHeading><span>03</span> Family Face-Off</ActivityHeading>
        <ActivityCopy>There are no wrong answers, only highly revealing choices. Pick one and let the family personality meter judge you.</ActivityCopy>
        <FaceOffPrompt><FiZap aria-hidden="true" /><strong>{faceOffDeck[faceOffIndex].question}</strong></FaceOffPrompt>
        <FaceOffOptions>
          {faceOffDeck[faceOffIndex].options.map((option, index) => <QuizOption type="button" key={option} onClick={() => chooseFaceOff(index)} $selected={faceOffChoice === index}>{option}</QuizOption>)}
        </FaceOffOptions>
        {faceOffChoice !== null && <OddFeedback $correct><strong>{faceOffChoice === 0 ? 'Excellent. You are the practical legend.' : 'Excellent. You are the plot twist.'}</strong><span>{faceOffChoice === 0 ? 'Your family would trust you with the emergency snacks.' : 'Your family would absolutely ask for the full story.'}</span><span>Left-choice streak: {faceOffLeft}</span><PromptButton type="button" onClick={nextFaceOff}>Next face-off <FiZap aria-hidden="true" /></PromptButton></OddFeedback>}
      </Activity>

      <Activity>
        <ActivityHeading><span>04</span> Odd One Out</ActivityHeading>
        <ActivityCopy>Spot the word that does not belong. Five fresh rounds, instant feedback, and absolutely no arguing with the answer.</ActivityCopy>
        {oddFinished ? (
          <QuizResult><strong>{oddScore} / {oddRounds.length}</strong><span>{oddScore === oddRounds.length ? 'Sharp eyes. Your family archive is in good hands.' : 'Nice try. The odd one was hiding in plain sight.'}</span><PromptButton type="button" onClick={resetOdd}>Play again <FiMap aria-hidden="true" /></PromptButton></QuizResult>
        ) : (
          <>
            <ActivityCopy>{oddRounds[oddIndex].prompt}</ActivityCopy>
            <TicStatus>Round {oddIndex + 1} of {oddRounds.length} · Score {oddScore}</TicStatus>
            <QuizOptions>
              {oddRounds[oddIndex].options.map((option) => <QuizOption type="button" key={option} onClick={() => answerOdd(option)} $selected={oddChoice === option} $correct={oddChoice && option === oddRounds[oddIndex].answer}>{option}</QuizOption>)}
            </QuizOptions>
            {oddChoice && <OddFeedback $correct={oddChoice === oddRounds[oddIndex].answer}><strong>{oddChoice === oddRounds[oddIndex].answer ? 'Correct.' : `It was ${oddRounds[oddIndex].answer}.`}</strong><span>{oddRounds[oddIndex].reason}</span><PromptButton type="button" onClick={nextOddRound}>{oddIndex === oddRounds.length - 1 ? 'See my score' : 'Next round'} <FiMap aria-hidden="true" /></PromptButton></OddFeedback>}
          </>
        )}
      </Activity>
      </ActivityGrid>
    </GameShell>
  );
};

export default GamePage;