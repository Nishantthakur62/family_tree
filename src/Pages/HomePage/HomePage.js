import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HomeContainer, Button, WelcomeMessage, Content, Eyebrow, Actions, SecondaryButton, DemoButton, StoryPanel, StoryLabel, StoryTitle, StoryCopy, Stats } from './HomePage.style';
import IntroForm from '../../Components/IntroForm/IntroForm';

const demoNode = (id, name, children = [], extra = {}) => ({ id, name, children, siblings: [], ...extra });

const createDemoTree = () => {
  const root = demoNode('demo-root', 'The Morgan Family', [
    demoNode('demo-elaine', 'Elaine Morgan', [
      demoNode('demo-lena', 'Lena Morgan', [demoNode('demo-noah', 'Noah Morgan')]),
      demoNode('demo-owen', 'Owen Morgan'),
    ], { dob: '1954', notes: 'A family historian who kept the old letters.' }),
    demoNode('demo-james', 'James Morgan', [
      demoNode('demo-mara', 'Mara Morgan', [demoNode('demo-ivy', 'Ivy Morgan')]),
      demoNode('demo-theo', 'Theo Morgan'),
    ]),
  ], { notes: 'Demo family with three generations ready to explore.' });
  root.spouse = demoNode('demo-spouse', 'Samuel Morgan');
  return root;
};

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('start') === '1') setIsModalOpen(true);
  }, [searchParams]);

  const openDemo = () => {
    const demoPhone = 'demo-morgan-3gen';
    const demoKey = `family-profile-${demoPhone}`;
    if (!localStorage.getItem(demoKey)) {
      localStorage.setItem(demoKey, JSON.stringify({
        fullName: 'Demo Family',
        phoneNumber: demoPhone,
        familyName: 'Morgan Family Demo',
        tree: createDemoTree(),
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
            <DemoButton type="button" onClick={openDemo}>Explore demo family</DemoButton>
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
