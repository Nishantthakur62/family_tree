import React, { useState } from 'react';
import { HomeContainer, BackgroundImage, Button, WelcomeMessage, Overlay, Content, Eyebrow, Actions, SecondaryButton, StoryPanel, StoryLabel, StoryTitle, StoryCopy, Stats } from './HomePage.style';
import IntroForm from '../../Components/IntroForm/IntroForm';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <HomeContainer>
      <BackgroundImage />
      <Overlay />
      <WelcomeMessage>
        <Content>
          <Eyebrow>Your family, in one place</Eyebrow>
          <h1>Keep the stories that made you.</h1>
          <p>Build a living family tree, gather the details that matter, and leave a clearer legacy for the people who come next.</p>
          <Actions>
            <Button onClick={() => setIsModalOpen(true)}>Start your tree <span aria-hidden="true">→</span></Button>
            <SecondaryButton href="#story">See how it works</SecondaryButton>
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
