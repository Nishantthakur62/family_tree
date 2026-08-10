import styled from 'styled-components';

export const BuilderShell = styled.section`
	width: min(1180px, 100%);
	margin: 0 auto;
	padding: clamp(2rem, 5vw, 4rem) 1.25rem;
`;

export const Breadcrumbs = styled.nav`
	display: flex;
	align-items: center;
	gap: 0.45rem;
	margin-bottom: 1.25rem;
	color: #7b8c80;
	font-size: 0.75rem;

	a {
		color: #52685a;
		font-weight: 700;
		text-decoration: none;

		&:hover {
			color: #bd5b3c;
		}
	}

	span:last-child {
		color: #24312d;
		font-weight: 700;
	}
`;

export const PageKicker = styled.p`
	margin: 0 0 0.8rem;
	color: #bd5b3c;
	font-size: 0.72rem;
	font-weight: 700;
	letter-spacing: 0.16em;
	text-transform: uppercase;
`;

export const PageHeading = styled.h1`
	margin: 0 0 0.8rem;
	color: #24312d;
	font-family: Georgia, serif;
	font-size: clamp(2.4rem, 5vw, 4.5rem);
	font-weight: 400;
	line-height: 1;
`;

export const PageIntro = styled.p`
	margin: 0 0 2rem;
	color: #52615b;
`;