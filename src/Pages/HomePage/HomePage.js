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
        </div>
      </div>

      {isModalOpen && <IntroForm onClose={() => setIsModalOpen(false)} />}
    </HomeContainer>
  );
};

export default HomePage;
