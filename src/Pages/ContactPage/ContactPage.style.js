import styled from 'styled-components';

export const ContactShell = styled.section`
	min-height: calc(100vh - 76px);
	padding: clamp(4rem, 9vw, 8rem) clamp(1.25rem, 8vw, 8rem);
	background: #e8ede5;
`;

export const ContactGrid = styled.div`
	width: min(1080px, 100%);
	margin: 0 auto;
	display: grid;
	grid-template-columns: minmax(0, 0.9fr) minmax(320px, 0.75fr);
	gap: clamp(3rem, 10vw, 9rem);
	align-items: start;

	@media (max-width: 720px) {
		grid-template-columns: 1fr;
	}
`;

export const ContactIntro = styled.div`
	max-width: 490px;

	p {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		color: #52615b;
		font-size: 0.92rem;
		margin: 1rem 0 0;
	}

	svg { color: #bd5b3c; }

	a {
		color: inherit;
		text-decoration: none;

		&:hover { color: #bd5b3c; }
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
	color: #24312d;
	font-family: Georgia, serif;
	font-size: clamp(2.8rem, 6vw, 5.5rem);
	font-weight: 400;
	line-height: 0.98;
	margin: 0 0 1.4rem;
`;

export const Copy = styled.p`
	color: #68776d;
	line-height: 1.7;
	max-width: 430px;
	margin: 0 0 2.25rem;
`;

export const ContactForm = styled.form`
	display: grid;
	gap: 1.25rem;
	padding-top: 0.45rem;
`;

export const Field = styled.label`
	display: grid;
	gap: 0.45rem;
	color: #52615b;
	font-size: 0.75rem;
	font-weight: 700;
	letter-spacing: 0.08em;
	text-transform: uppercase;

	input,
	textarea {
		width: 100%;
		border: 1px solid rgba(36, 49, 45, 0.25);
		border-radius: 3px;
		background: rgba(255, 255, 255, 0.62);
		color: #24312d;
		font: inherit;
		padding: 0.85rem 0.9rem;
		outline: none;
		resize: vertical;

		&:focus { border-color: #bd5b3c; box-shadow: 0 0 0 3px rgba(189, 91, 60, 0.14); }
	}
`;

export const Textarea = styled.textarea``;

export const SubmitButton = styled.button`
	justify-self: start;
	border: 0;
	border-radius: 3px;
	background: #bd5b3c;
	color: #fff;
	cursor: pointer;
	font-weight: 700;
	padding: 0.95rem 1.25rem;

	&:hover { background: #a4492f; }
`;

export const Confirmation = styled.div`
	display: grid;
	gap: 0.8rem;
	border-left: 2px solid #bd5b3c;
	color: #52615b;
	line-height: 1.6;
	padding: 1rem 0 1rem 1.25rem;

	strong { color: #24312d; font-family: Georgia, serif; font-size: 1.7rem; font-weight: 400; }
`;
