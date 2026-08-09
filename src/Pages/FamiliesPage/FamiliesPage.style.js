import styled from 'styled-components';

export const Page = styled.section`
	width: min(1080px, 100%);
	margin: 0 auto;
	padding: clamp(2.5rem, 6vw, 5rem) 1.25rem;
`;

export const Eyebrow = styled.p`
	margin: 0 0 0.8rem;
	color: #bd5b3c;
	font-size: 0.72rem;
	font-weight: 700;
	letter-spacing: 0.16em;
	text-transform: uppercase;
`;

export const Heading = styled.h1`
	margin: 0 0 0.8rem;
	color: #24312d;
	font-family: Georgia, serif;
	font-size: clamp(2.6rem, 6vw, 5rem);
	font-weight: 400;
	line-height: 0.95;
`;

export const Intro = styled.p`
	margin: 0;
	color: #52615b;
`;

export const Toolbar = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	margin: 2.5rem 0 1rem;
	color: #68776d;
	font-size: 0.8rem;

	@media (max-width: 480px) {
		align-items: flex-start;
		flex-direction: column;
		margin-top: 2rem;
	}
`;

export const ImportButton = styled.button`
	padding: 0.75rem 1rem;
	color: #fff;
	background: #647b6b;
	border: 0;
	border-radius: 4px;
	cursor: pointer;
	font-weight: 700;
`;

export const HiddenInput = styled.input`
	display: none;
`;

export const FamilyGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	gap: 1rem;
`;

export const FamilyCard = styled.article`
	padding: 1.25rem;
	background: #fff;
	border: 1px solid rgba(36, 49, 45, 0.12);
	border-radius: 8px;
	box-shadow: 0 10px 28px rgba(36, 49, 45, 0.06);
`;

export const CardTop = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 1rem;
	color: #7b8c80;
	font-size: 0.68rem;
	letter-spacing: 0.08em;
	text-transform: uppercase;

	strong { color: #bd5b3c; font-weight: 700; }
`;

export const FamilyName = styled.h2`
	margin: 2.5rem 0 0.5rem;
	color: #24312d;
	font-family: Georgia, serif;
	font-size: 1.8rem;
	font-weight: 400;
`;

export const RenameInput = styled.input`
	width: 100%;
	margin: 2.5rem 0 0.5rem;
	padding: 0.45rem 0.55rem;
	color: #24312d;
	background: #f6f4ef;
	border: 1px solid #bd5b3c;
	border-radius: 4px;
	font-family: Georgia, serif;
	font-size: 1.35rem;
`;

export const FamilyMeta = styled.p`
	margin: 0;
	color: #68776d;
	font-size: 0.8rem;
`;

export const CardActions = styled.div`
	display: flex;
	gap: 0.5rem;
	flex-wrap: wrap;
	margin-top: 1.5rem;
`;

export const ActionButton = styled.button`
	padding: 0.55rem 0.7rem;
	color: ${({ $danger }) => $danger ? '#a4492f' : '#52685a'};
	background: transparent;
	border: 1px solid ${({ $danger }) => $danger ? 'rgba(164, 73, 47, 0.3)' : 'rgba(82, 104, 90, 0.3)'};
	border-radius: 4px;
	cursor: pointer;
	font-size: 0.75rem;
	font-weight: 700;
	text-decoration: none;
`;

export const EmptyState = styled.div`
	padding: 2rem;
	color: #68776d;
	background: #fff;
	border: 1px solid rgba(36, 49, 45, 0.12);
	border-radius: 8px;
`;
