import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import IntroForm from '../../Components/IntroForm/IntroForm';
import {
	Actions,
	Button,
	Content,
	DemoButton,
	Eyebrow,
	HomeContainer,
	SecondaryButton,
	Stats,
	StoryCopy,
	StoryLabel,
	StoryPanel,
	StoryTitle,
	WelcomeMessage,
} from './HomePage.style';

const HomePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [formOpen, setFormOpen] = useState(searchParams.has('start'));

	const openForm = () => {
		setFormOpen(true);
		setSearchParams({ start: '1' });
	};

	const closeForm = () => {
		setFormOpen(false);
		setSearchParams({});
	};

	return (
		<>
			<HomeContainer>
				<WelcomeMessage>
					<Content>
						<Eyebrow>Family history, made tangible</Eyebrow>
						<h1>Every family has a story worth keeping.</h1>
						<p>Bring the names, memories, and connections that shaped you into one living family tree. Start with what you know and let the branches grow.</p>
						<Actions>
							<Button type="button" onClick={openForm}>Build your tree <span aria-hidden="true">→</span></Button>
							<SecondaryButton as={Link} to="/families">Browse saved families</SecondaryButton>
							<DemoButton type="button" onClick={openForm}>See how it works</DemoButton>
						</Actions>
					</Content>
					<StoryPanel>
						<StoryLabel>A quieter way to remember</StoryLabel>
						<StoryTitle>Start with one name. Leave a map behind.</StoryTitle>
						<StoryCopy>FamilyRoots keeps your family records close, clear, and easy to revisit whenever another story comes back to you.</StoryCopy>
						<Stats>
							<div><strong>01</strong>Begin with<br />your story</div>
							<div><strong>∞</strong>Grow it<br />over time</div>
						</Stats>
					</StoryPanel>
				</WelcomeMessage>
			</HomeContainer>
			{formOpen && <IntroForm onClose={closeForm} />}
		</>
	);
};

export default HomePage;