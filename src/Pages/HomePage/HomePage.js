import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HomeContainer, HeroSection, HeroContent, Button, DemoButton, Actions, FeaturesSection, FeaturesGrid, FeatureCard } from './HomePage.style';
import IntroForm from '../../Components/IntroForm/IntroForm';
import avatar1 from '../../Assets/Icons/avatar1.png';
import avatar2 from '../../Assets/Icons/avatar2.png';
import avatar3 from '../../Assets/Icons/avatar3.png';
import avatar4 from '../../Assets/Icons/avatar4.png';
import avatar5 from '../../Assets/Icons/avatar5.png';
import avatar6 from '../../Assets/Icons/avatar6.png';
import avatar8 from '../../Assets/Icons/avatar8.png';
import avatar9 from '../../Assets/Icons/avatar9.png';

// Demo tree data (keeping the original for compatibility)
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
  notes: `${name} is part of this family story.`,
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
  ], { dob: '1930-05-14', relation: 'Family root', alias: 'Moe', occupation: 'Teacher and storyteller', location: 'Cedar Falls', image: avatar1, notes: 'Demo family with four generations, rich details, and many branches ready to explore.' });
  root.spouse = demoNode('demo-spouse', 'Samuel Morgan', [], { dob: '1932-10-02', relation: 'Spouse', occupation: 'Woodworker', location: 'Cedar Falls', image: avatar8, notes: 'Made the oak box where the family photographs are kept.' });
  root.children[0].spouse = demoNode('demo-elaine-spouse', 'Daniel Hart', [], { dob: '1952-01-28', relation: 'Spouse', occupation: 'Archivist', location: 'Cedar Falls', image: avatar9 });
  return root;
};

const createThakurTree = () => {
  const root = demoNode('demo-thakur-root', 'Khela Nand Thakur', [
    demoNode('thakur-dayakant', 'Dayakant Thakur', [
      demoNode('thakur-murari', 'Murari Thakur', [
        demoNode('thakur-pintu', 'Pintu', [], { dob: '2023', relation: 'Child' }),
      ], { dob: '1987 approx', relation: 'Grandchild' }),
      demoNode('thakur-rajendra', 'Rajendra Thakur', [], { dob: '12/11/1991', relation: 'Grandchild' }),
      demoNode('thakur-bipin', 'Bipin Thakur', [], { dob: '1/11/1992', relation: 'Grandchild' }),
      demoNode('thakur-triveni', 'Triveni Thakur', [], { dob: '1986', relation: 'Grandchild' }),
    ], { dob: '1955 approx', relation: 'Son', occupation: 'Farmer', location: 'Bihar', notes: 'Married to Jibchi Devi.' }),
    demoNode('thakur-mahakant', 'Mahakant Thakur', [
      demoNode('thakur-sekhar', 'Sekhar Thakur', [], { dob: '15/01/1993', relation: 'Grandchild' }),
      demoNode('thakur-suman', 'Suman Thakur', [], { dob: '15/11/1996', relation: 'Grandchild' }),
      demoNode('thakur-nishant', 'Nishant Thakur', [], { dob: '22/05/2001', relation: 'Grandchild' }),
      demoNode('thakur-prashant', 'Prashant Thakur', [], { dob: '28/07/2002', relation: 'Grandchild' }),
      demoNode('thakur-kaushal', 'Kaushal Thakur', [], { dob: '29/02/2004', relation: 'Grandchild' }),
    ], { dob: '10/10/1967', relation: 'Son', occupation: 'Farmer', location: 'Bihar', notes: 'Married to Jyoti Devi.' }),
    demoNode('thakur-krishan', 'Krishan Kant Thakur', [
      demoNode('thakur-pratibha', 'Pratibha Thakur', [], { dob: 'Unknown', relation: 'Grandchild' }),
    ], { dob: '08/07/1975', relation: 'Son', occupation: 'Farmer', location: 'Bihar', notes: 'Married to Reeta Mishra.' }),
    demoNode('thakur-dharam', 'Dharam Kant Thakur', [
      demoNode('thakur-kumari', 'Kumari', [], { dob: 'Unknown', relation: 'Grandchild' }),
      demoNode('thakur-komal', 'Komal Kant Jha', [], { dob: 'Unknown', relation: 'Grandchild' }),
      demoNode('thakur-sundar', 'Sundar', [], { dob: 'Unknown', relation: 'Grandchild' }),
      demoNode('thakur-parmeshwar', 'Parmeshwar Jha', [], { dob: 'Unknown', relation: 'Grandchild' }),
    ], { dob: '01/12/1979', relation: 'Son', occupation: 'Farmer', location: 'Bihar', notes: 'Married to Gayatri Devi.' }),
    demoNode('thakur-kasi', 'Kasi Thakur', [
      demoNode('thakur-buchan', 'Buchan Jha', [], { dob: 'Unknown', relation: 'Grandchild' }),
      demoNode('thakur-rosan', 'Rosan Jha', [], { dob: 'Unknown', relation: 'Grandchild' }),
      demoNode('thakur-bodh', 'Bodh Krishna Jha', [], { dob: 'Unknown', relation: 'Grandchild' }),
    ], { dob: '1944', relation: 'Son', occupation: 'Farmer', location: 'Bihar', notes: 'Married to Bachu Jha and Puraniya.' }),
    demoNode('thakur-bacha', 'Bacha Thakur', [
      demoNode('thakur-puja', 'Puja Jha', [], { dob: 'Unknown', relation: 'Grandchild' }),
      demoNode('thakur-khusbu', 'Khusbu Jha', [], { dob: 'Unknown', relation: 'Grandchild' }),
      demoNode('thakur-mithu', 'Mithu Jha', [], { dob: 'Unknown', relation: 'Grandchild' }),
      demoNode('thakur-indu', 'Indu Thakur', [
        demoNode('thakur-payal', 'Payal', [], { dob: 'Unknown', relation: 'Great-grandchild' }),
        demoNode('thakur-boy-girl', '1 boy 1 girl', [], { dob: 'Unknown', relation: 'Great-grandchild' }),
      ], { dob: 'Unknown', relation: 'Grandchild' }),
      demoNode('thakur-mana', 'Mana Thakur', [], { dob: 'Unknown', relation: 'Grandchild' }),
    ], { dob: '1946 approx', relation: 'Daughter', occupation: 'Homemaker', location: 'Bihar', notes: 'Married to Shivankar Jha.' }),
    demoNode('thakur-usha', 'Usha Thakur', [
      demoNode('thakur-dudul', 'Dudul Thakur', [], { dob: 'Unknown', relation: 'Grandchild' }),
      demoNode('thakur-ashki', 'Ashki Thakur', [], { dob: 'Unknown', relation: 'Grandchild' }),
      demoNode('thakur-priti', 'Priti Thakur', [], { dob: 'Unknown', relation: 'Grandchild' }),
      demoNode('thakur-dipesh', 'Dipesh Jha', [], { dob: 'Unknown', relation: 'Grandchild' }),
    ], { dob: '1972', relation: 'Daughter', occupation: 'Homemaker', location: 'Bihar', notes: 'Married to Fhule Thakur.' }),
    demoNode('thakur-lalo', 'Lalo Thakur', [
      demoNode('thakur-sonam', 'Sonam Jha', [], { dob: 'Unknown', relation: 'Grandchild' }),
      demoNode('thakur-anand', 'Anand Jha', [], { dob: 'Unknown', relation: 'Grandchild' }),
    ], { dob: '01/12/1981', relation: 'Son', occupation: 'Farmer', location: 'Bihar', notes: 'Married to Hareram Jha.' }),
  ], { dob: '1920s', relation: 'Patriarch', occupation: 'Farmer', location: 'Bihar', notes: 'Passed away at 95 years old.', image: avatar1 });

  root.spouse = demoNode('demo-thakur-spouse', 'Unknown', [], { dob: 'Unknown', relation: 'Spouse', location: 'Bihar', image: avatar8 });
  root.children[0].spouse = demoNode('thakur-jibchi', 'Jibchi Devi', [], { dob: 'Unknown', relation: 'Spouse', image: avatar9 });
  root.children[0].children[0].spouse = demoNode('thakur-taniya', 'Taniya', [], { dob: 'Unknown', relation: 'Spouse', image: avatar9 });
  root.children[1].spouse = demoNode('thakur-jyoti', 'Jyoti Devi', [], { dob: 'Unknown', relation: 'Spouse', image: avatar9 });
  root.children[2].spouse = demoNode('thakur-reeta', 'Reeta Mishra', [], { dob: 'Unknown', relation: 'Spouse', image: avatar9 });
  root.children[3].spouse = demoNode('thakur-gayatri', 'Gayatri Devi', [], { dob: 'Unknown', relation: 'Spouse', image: avatar9 });
  root.children[4].spouse = demoNode('thakur-bachu', 'Bachu Jha', [], { dob: 'Unknown', relation: 'Spouse', image: avatar8 });
  root.children[4].children[0].spouse = demoNode('thakur-puraniya', 'Puraniya', [], { dob: 'Unknown', relation: 'Spouse', image: avatar9 });
  root.children[5].spouse = demoNode('thakur-shivanskar', 'Shivanskar Jha', [], { dob: 'Unknown', relation: 'Spouse', image: avatar9 });
  root.children[6].spouse = demoNode('thakur-fhule', 'Fhule Thakur', [], { dob: 'Unknown', relation: 'Spouse', image: avatar9 });
  root.children[7].spouse = demoNode('thakur-hareram', 'Hareram Jha', [], { dob: 'Unknown', relation: 'Spouse', image: avatar9 });
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
    localStorage.setItem(demoKey, JSON.stringify({
      fullName: 'Demo Family',
      phoneNumber: demoPhone,
      familyName,
      demoVersion: 4,
      tree: tree(),
    }));
    navigate(`/builder/${demoPhone}`);
  };

  return (
    <HomeContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <div className="subtitle">🌳 Family tree builder</div>
          <h1>
            Build your family story<br />
            <span className="emoji">without the mess</span>
          </h1>
          <p>
            Add relatives, save memories, and keep your family connected in one simple place.
          </p>
          <Actions>
            <Button onClick={() => setIsModalOpen(true)}>Start building</Button>
            <DemoButton type="button" onClick={() => navigate('/game')}>
              Play game
            </DemoButton>
            <DemoButton type="button" onClick={() => openDemo('demo-morgan-4gen', 'Morgan Family Demo', createDemoTree)}>
              View demo
            </DemoButton>
            <DemoButton type="button" onClick={() => openDemo('demo-thakur-family', 'Thakur Family', createThakurTree)}>
              View Thakur tree
            </DemoButton>
          </Actions>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '3rem', color: '#24312d' }}>
          What you can do
        </h2>
        <FeaturesGrid>
          <FeatureCard>
            <div className="icon">👨‍👩‍👧‍👦</div>
            <h3>Build your tree</h3>
            <p>Add parents, children, siblings and spouses with simple steps.</p>
          </FeatureCard>

          <FeatureCard>
            <div className="icon">📸</div>
            <h3>Save memories</h3>
            <p>Keep photos and stories together with each family member.</p>
          </FeatureCard>

          <FeatureCard>
            <div className="icon">🎮</div>
            <h3>Play and explore</h3>
            <p>Open the game page and learn about your family in a fun way.</p>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <div style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E42 100%)', padding: '4rem 2rem', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, maxWidth: '600px', margin: '0 auto 1rem' }}>
          Start with your family today
        </h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.95, maxWidth: '600px', margin: '0 auto 2rem' }}>
          Quick, clear, and easy to use.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button onClick={() => setIsModalOpen(true)} style={{ background: '#fff', color: '#FF6B6B', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>Start now</Button>
          <DemoButton type="button" onClick={() => navigate('/game')} style={{ background: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>Open game</DemoButton>
          <DemoButton type="button" onClick={() => openDemo('demo-thakur-family', 'Thakur Family', createThakurTree)} style={{ background: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>Thakur tree</DemoButton>
        </div>
      </div>

      {isModalOpen && <IntroForm onClose={() => setIsModalOpen(false)} />}
    </HomeContainer>
  );
};

export default HomePage;
