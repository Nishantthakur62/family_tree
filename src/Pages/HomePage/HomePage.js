import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HomeContainer, Button, WelcomeMessage, Content, Eyebrow, Actions, SecondaryButton, DemoButton, StoryPanel, StoryLabel, StoryTitle, StoryCopy, Stats } from './HomePage.style';
import IntroForm from '../../Components/IntroForm/IntroForm';
import avatar1 from '../../Assets/Icons/avatar1.png';
import avatar2 from '../../Assets/Icons/avatar2.png';
import avatar3 from '../../Assets/Icons/avatar3.png';
import avatar4 from '../../Assets/Icons/avatar4.png';
import avatar5 from '../../Assets/Icons/avatar5.png';
import avatar6 from '../../Assets/Icons/avatar6.png';
import avatar7 from '../../Assets/Icons/avatar7.png';
import avatar8 from '../../Assets/Icons/avatar8.png';
import avatar9 from '../../Assets/Icons/avatar9.png';

const darkNotes = {
  'The Winden Family': 'A family archive inspired by the town where four generations are caught in a time knot.',
  'Ines Kahnwald': 'Ines adopts Mikkel after he becomes stranded in 1986 and raises him as Michael Kahnwald.',
  'Daniel Kahnwald': 'Daniel is Ines\' son and the father of Michael, linking the Kahnwald line to Mikkel Nielsen.',
  'Michael Kahnwald': 'Michael is Mikkel Nielsen, the missing boy whose journey into the past changes the Kahnwald family.',
  'Jonas Kahnwald': 'Jonas is Michael and Hannah\'s son, drawn into the search for the origin of Winden\'s cycles.',
  'Agnes Nielsen': 'Agnes is Tronte\'s mother and Noah\'s sister, carrying the Nielsen line through Winden\'s tangled history.',
  'Tronte Nielsen': 'Tronte is Agnes\' son and Ulrich\'s father, one of the links between the Nielsen and Kahnwald families.',
  'Ulrich Nielsen': 'Ulrich investigates Mikkel\'s disappearance while trying to protect his children from Winden\'s secrets.',
  'Martha Nielsen': 'Martha is Ulrich and Katharina\'s daughter, and her connection with Jonas crosses the family knot.',
  'Magnus Nielsen': 'Magnus is Ulrich and Katharina\'s son and part of the group pulled toward the caves and the missing boys.',
  'Noah Tauber': 'Noah, born Hanno Tauber, works to preserve the cycle while searching for his lost family across time.',
  'Bernd Doppler': 'Bernd founded the Winden nuclear power plant, a place central to the town\'s hidden history.',
  'Helge Doppler': 'Helge is Bernd\'s son and becomes involved in Noah\'s experiments and the disappearances around the caves.',
  'Peter Doppler': 'Peter is Helge\'s son, Charlotte\'s husband, and the father of Franziska and Elisabeth.',
  'Charlotte Doppler': 'Charlotte leads the Winden police investigation and discovers that her family history bends through time.',
  'Franziska Doppler': 'Franziska is Charlotte and Peter\'s daughter and Magnus\'s partner during the later cycles.',
  'Elisabeth Doppler': 'Elisabeth is Charlotte and Peter\'s younger daughter, whose future becomes part of the family paradox.',
  'Greta Doppler': 'Greta is Helge\'s mother and Bernd\'s wife, living with the aftermath of Helge\'s disappearance.',
  'Bernd Tiedemann': 'Bernd is Claudia\'s father and the first director of the Winden nuclear power plant.',
  'Claudia Tiedemann': 'Claudia becomes the White Devil to her enemies and spends decades trying to break the knot.',
  'Regina Tiedemann': 'Regina is Claudia\'s daughter and the owner of the hotel, facing the consequences of Winden\'s cycles.',
  'Egon Tiedemann': 'Egon is a Winden police officer whose investigations bring him close to the town\'s impossible events.',
  'Aleksander Tiedemann': 'Aleksander, originally Boris Niewald, becomes Regina\'s husband and director of the power plant.',
  'Bartosz Tiedemann': 'Bartosz is Regina and Aleksander\'s son and is recruited by Noah into the secret society Sic Mundus.',
  'Agnes Kahnwald': 'Agnes Kahnwald is used here as Michael\'s spouse in the demo branch, echoing the show\'s interconnected identities.',
  'Hannah Kahnwald': 'Hannah is Michael\'s wife and Jonas\'s mother, whose choices continue to reshape the family knot.',
  'Jana Nielsen': 'Jana is Tronte\'s wife and Ulrich\'s mother, still haunted by Mads\' disappearance.',
  'Katharina Nielsen': 'Katharina is Ulrich\'s wife and the mother of Magnus, Martha, and Mikkel.',
};

const demoNode = (id, name, children = [], extra = {}) => ({
  id,
  name,
  children,
  siblings: [],
  dob: 'Unknown',
  relation: 'Family member',
  alias: '',
  occupation: 'Family historian',
  location: 'Cedar Falls',
  notes: darkNotes[name] || `${name} is part of this family story.`,
  image: avatar1,
  ...extra,
});

const createDemoTree = () => {
  const root = demoNode('demo-root', 'The Morgan Family', [
    demoNode('demo-elaine', 'Elaine Morgan', [
      demoNode('demo-lena', 'Lena Morgan', [
        demoNode('demo-noah', 'Noah Morgan', [], { dob: '2014', relation: 'Great-grandchild', occupation: 'Student', image: avatar4 }),
        demoNode('demo-nora', 'Nora Morgan', [], { dob: '2017', relation: 'Great-grandchild', occupation: 'Student', location: 'Portland', image: avatar5 }),
      ], { dob: '1980-06-18', relation: 'Grandchild', alias: 'Lee', occupation: 'Architect', location: 'Portland', image: avatar2, notes: 'Sketched the family map during a rainy weekend.' }),
      demoNode('demo-owen', 'Owen Morgan', [
        demoNode('demo-piper', 'Piper Morgan', [], { dob: '2012', relation: 'Great-grandchild', occupation: 'Student', image: avatar6 }),
      ], { dob: '1984-02-03', relation: 'Grandchild', occupation: 'Marine biologist', location: 'Astoria', image: avatar3 }),
    ], { dob: '1954-09-12', relation: 'Daughter', alias: 'Ellie', occupation: 'Librarian', location: 'Cedar Falls', image: avatar2, notes: 'Kept the old letters and labelled every photograph.' }),
    demoNode('demo-james', 'James Morgan', [
      demoNode('demo-mara', 'Mara Morgan', [
        demoNode('demo-ivy', 'Ivy Morgan', [], { dob: '2010', relation: 'Great-grandchild', occupation: 'Student', image: avatar7 }),
        demoNode('demo-isaac', 'Isaac Morgan', [], { dob: '2013', relation: 'Great-grandchild', occupation: 'Student', image: avatar8 }),
      ], { dob: '1982-11-27', relation: 'Grandchild', alias: 'Mars', occupation: 'Civic designer', location: 'Chicago', image: avatar4 }),
      demoNode('demo-theo', 'Theo Morgan', [
        demoNode('demo-june', 'June Morgan', [], { dob: '2018', relation: 'Great-grandchild', occupation: 'Student', image: avatar9 }),
      ], { dob: '1987-04-15', relation: 'Grandchild', occupation: 'Chef', location: 'Chicago', image: avatar5 }),
    ], { dob: '1958-03-21', relation: 'Son', occupation: 'Railway engineer', location: 'Chicago', image: avatar3, notes: 'Built model trains with every grandchild.' }),
    demoNode('demo-ruth', 'Ruth Morgan', [
      demoNode('demo-ava', 'Ava Morgan', [
        demoNode('demo-rose', 'Rose Morgan', [], { dob: '2016', relation: 'Great-grandchild', occupation: 'Student', image: avatar6 }),
        demoNode('demo-reed', 'Reed Morgan', [], { dob: '2019', relation: 'Great-grandchild', occupation: 'Student', image: avatar7 }),
      ], { dob: '1990-08-09', relation: 'Grandchild', occupation: 'Photographer', location: 'Seattle', image: avatar8 }),
      demoNode('demo-ben', 'Ben Morgan', [], { dob: '1993-12-01', relation: 'Grandchild', occupation: 'Teacher', location: 'Seattle', image: avatar9 }),
    ], { dob: '1961-07-05', relation: 'Daughter', alias: 'Ruthie', occupation: 'Botanist', location: 'Seattle', image: avatar4, notes: 'Plants a tree for every new family member.' }),
    demoNode('demo-paul', 'Paul Morgan', [
      demoNode('demo-sage', 'Sage Morgan', [
        demoNode('demo-wren', 'Wren Morgan', [], { dob: '2020', relation: 'Great-grandchild', occupation: 'Student', image: avatar2 }),
      ], { dob: '1991-05-22', relation: 'Grandchild', occupation: 'Sound engineer', location: 'Austin', image: avatar5 }),
      demoNode('demo-milo', 'Milo Morgan', [], { dob: '1995-10-11', relation: 'Grandchild', occupation: 'Game developer', location: 'Austin', image: avatar6 }),
    ], { dob: '1965-01-30', relation: 'Son', occupation: 'Cartographer', location: 'Austin', image: avatar7, notes: 'Draws maps of every place the family has lived.' }),
  ], { dob: '1930-05-14', relation: 'Family root', alias: 'Moe', occupation: 'Teacher and storyteller', location: 'Cedar Falls', image: avatar1, notes: 'Demo family with four generations, rich details, and many branches ready to explore.' });
  root.spouse = demoNode('demo-spouse', 'Samuel Morgan', [], { dob: '1932-10-02', relation: 'Spouse', occupation: 'Woodworker', location: 'Cedar Falls', image: avatar8, notes: 'Made the oak box where the family photographs are kept.' });
  root.children[0].spouse = demoNode('demo-elaine-spouse', 'Daniel Hart', [], { dob: '1952-01-28', relation: 'Spouse', occupation: 'Archivist', location: 'Cedar Falls', image: avatar9 });
  root.children[1].spouse = demoNode('demo-james-spouse', 'Mina Cole', [], { dob: '1959-06-08', relation: 'Spouse', occupation: 'Garden designer', location: 'Chicago', image: avatar6 });
  root.children[2].spouse = demoNode('demo-ruth-spouse', 'Elias Stone', [], { dob: '1960-02-19', relation: 'Spouse', occupation: 'Restorer', location: 'Seattle', image: avatar2 });
  root.children[3].spouse = demoNode('demo-paul-spouse', 'Clara Wells', [], { dob: '1967-09-26', relation: 'Spouse', occupation: 'Museum curator', location: 'Austin', image: avatar3 });
  return root;
};

const createDarkDemoTree = () => {
  const root = demoNode('dark-root', 'The Winden Family', [
    demoNode('dark-ines', 'Ines Kahnwald', [
      demoNode('dark-daniel', 'Daniel Kahnwald', [
        demoNode('dark-michael', 'Michael Kahnwald', [
          demoNode('dark-jonas', 'Jonas Kahnwald', [], { dob: '2003', relation: 'Great-grandchild', alias: 'The traveller', occupation: 'Student', location: 'Winden', image: avatar4 }),
        ], { dob: '1986', relation: 'Grandchild', alias: 'Mikkel Nielsen', occupation: 'Painter', location: 'Winden', image: avatar4, notes: 'A quiet life shaped by memories that never stay in the past.' }),
      ], { dob: '1953', relation: 'Child', occupation: 'Police officer', location: 'Winden', image: avatar2 }),
    ], { dob: '1930', relation: 'Daughter', occupation: 'Nurse', location: 'Winden', image: avatar3, notes: 'The family archive begins with a box of photographs from the caves.' }),
    demoNode('dark-agnes', 'Agnes Nielsen', [
      demoNode('dark-tronte', 'Tronte Nielsen', [
        demoNode('dark-ulrich', 'Ulrich Nielsen', [
          demoNode('dark-martha', 'Martha Nielsen', [], { dob: '2003', relation: 'Great-grandchild', occupation: 'Student', location: 'Winden', image: avatar7 }),
          demoNode('dark-magnus', 'Magnus Nielsen', [], { dob: '2000', relation: 'Great-grandchild', occupation: 'Student', location: 'Winden', image: avatar8 }),
        ], { dob: '1971', relation: 'Grandchild', occupation: 'Police officer', location: 'Winden', image: avatar5 }),
      ], { dob: '1941', relation: 'Child', occupation: 'Journalist', location: 'Winden', image: avatar6 }),
      demoNode('dark-noah', 'Noah Tauber', [], { dob: '1904', relation: 'Son', alias: 'Hanno Tauber', occupation: 'Priest', location: 'Winden', image: avatar9, notes: 'A mysterious priest whose place in the family becomes clear only across time.' }),
    ], { dob: '1915', relation: 'Daughter', occupation: 'Seamstress', location: 'Winden', image: avatar9, notes: 'Some branches of the family seem to return to the same place.' }),
    demoNode('dark-bernd', 'Bernd Doppler', [
      demoNode('dark-helge', 'Helge Doppler', [
        demoNode('dark-peter', 'Peter Doppler', [], { dob: '1970', relation: 'Grandchild', occupation: 'Therapist', location: 'Winden', image: avatar4 }),
      ], { dob: '1944', relation: 'Child', occupation: 'Plant director', location: 'Winden', image: avatar2 }),
    ], { dob: '1918', relation: 'Son', occupation: 'Engineer', location: 'Winden', image: avatar1, notes: 'The family records are full of dates, diagrams, and unanswered questions.' }),
    demoNode('dark-tiedemann', 'Bernd Tiedemann', [
      demoNode('dark-claudia', 'Claudia Tiedemann', [
        demoNode('dark-regina', 'Regina Tiedemann', [], { dob: '1962', relation: 'Grandchild', occupation: 'Hotel owner', location: 'Winden', image: avatar6 }),
      ], { dob: '1942', relation: 'Child', alias: 'The White Devil', occupation: 'Scientist', location: 'Winden', image: avatar6, notes: 'She studies the knot connecting every family in Winden.' }),
    ], { dob: '1913', relation: 'Son', occupation: 'Power plant director', location: 'Winden', image: avatar2, notes: 'The Tiedemann line is at the center of Winden power and secrets.' }),
  ], { dob: '1890', relation: 'Family root', occupation: 'Clockmaker', location: 'Winden', image: avatar1, notes: 'A demo family inspired by the mysterious interconnected families of Winden.' });
  root.spouse = demoNode('dark-root-spouse', 'Egon Tiedemann', [], { dob: '1936', relation: 'Spouse', occupation: 'Police officer', location: 'Winden', image: avatar3 });
  root.children[0].spouse = demoNode('dark-daniel-spouse', 'Agnes Kahnwald', [], { dob: '1955', relation: 'Spouse', occupation: 'Archivist', location: 'Winden', image: avatar5 });
  root.children[0].children[0].children[0].spouse = demoNode('dark-hannah', 'Hannah Kahnwald', [], { dob: '1972', relation: 'Spouse', occupation: 'Massage therapist', location: 'Winden', image: avatar5 });
  root.children[1].children[0].spouse = demoNode('dark-tronte-spouse', 'Jana Nielsen', [], { dob: '1944', relation: 'Spouse', occupation: 'Teacher', location: 'Winden', image: avatar3 });
  root.children[1].children[0].children[0].spouse = demoNode('dark-katharina', 'Katharina Nielsen', [], { dob: '1971', relation: 'Spouse', occupation: 'School principal', location: 'Winden', image: avatar8 });
  root.children[2].children[0].spouse = demoNode('dark-helge-spouse', 'Greta Doppler', [], { dob: '1946', relation: 'Spouse', occupation: 'Homemaker', location: 'Winden', image: avatar8 });
  root.children[2].children[0].children[0].children = [
    demoNode('dark-charlotte', 'Charlotte Doppler', [
      demoNode('dark-franziska', 'Franziska Doppler', [], { dob: '2000', relation: 'Great-grandchild', occupation: 'Student', location: 'Winden', image: avatar7 }),
      demoNode('dark-elisabeth', 'Elisabeth Doppler', [], { dob: '2003', relation: 'Great-grandchild', occupation: 'Student', location: 'Winden', image: avatar9 }),
    ], { dob: '1971', relation: 'Great-grandchild', occupation: 'Police chief', location: 'Winden', image: avatar3 }),
  ];
  root.children[3].children[0].children[0].spouse = demoNode('dark-aleksander', 'Aleksander Tiedemann', [], { dob: '1967', relation: 'Spouse', alias: 'Boris Niewald', occupation: 'Power plant director', location: 'Winden', image: avatar5 });
  root.children[3].children[0].children[0].children.push(demoNode('dark-bartosz', 'Bartosz Tiedemann', [], { dob: '2001', relation: 'Great-grandchild', occupation: 'Student', location: 'Winden', image: avatar8 }));
  return root;
};

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('start') === '1') setIsModalOpen(true);
  }, [searchParams]);

  const openDemo = (demoPhone, familyName, tree) => {
    const demoKey = `family-profile-${demoPhone}`;
    const existingDemo = localStorage.getItem(demoKey);
    let demoVersion = 0;
    try {
      demoVersion = JSON.parse(existingDemo || '{}').demoVersion || 0;
    } catch {
      demoVersion = 0;
    }
    if (demoVersion < 4) {
      localStorage.setItem(demoKey, JSON.stringify({
        fullName: 'Demo Family',
        phoneNumber: demoPhone,
        familyName,
        demoVersion: 4,
        tree: tree(),
      }));
    }
    navigate(`/builder/${demoPhone}`);
  };

  return (
    <HomeContainer>
      <WelcomeMessage>
        <Content>
          <Eyebrow>Your family, in one place</Eyebrow>
          <h1>Keep the stories that made you.</h1>
          <p>Build a living family tree, gather the details that matter, and leave a clearer legacy for the people who come next.</p>
          <Actions>
            <Button onClick={() => setIsModalOpen(true)}>Start your tree <span aria-hidden="true">→</span></Button>
            <SecondaryButton href="#story">See how it works</SecondaryButton>
            <DemoButton type="button" onClick={() => openDemo('demo-morgan-4gen', 'Morgan Family Demo · Four Generations', createDemoTree)}>Explore Morgan demo</DemoButton>
            <DemoButton type="button" onClick={() => openDemo('demo-winden-dark', 'Winden Family Demo · Dark', createDarkDemoTree)}>Explore Winden demo</DemoButton>
          </Actions>
        </Content>
        <StoryPanel id="story">
          <StoryLabel>Family archive / 01</StoryLabel>
          <StoryTitle>Every branch holds a beginning.</StoryTitle>
          <StoryCopy>Save names, relationships, and the little pieces of history you do not want to lose.</StoryCopy>
          <Stats><span><strong>01</strong> simple starting point</span><span><strong>∞</strong> stories to preserve</span></Stats>
        </StoryPanel>
      </WelcomeMessage>
      {isModalOpen && <IntroForm onClose={() => setIsModalOpen(false)} />}
    </HomeContainer>
  );
};

export default HomePage;
