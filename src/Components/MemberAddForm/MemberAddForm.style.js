import styled from 'styled-components';

export const AddForm = styled.form`
	width: min(100%, 720px);
	display: grid;
	grid-template-columns: minmax(0, 1.4fr) minmax(140px, 0.8fr) auto;
	align-items: end;
	gap: 0.8rem;
	padding: 1rem;
	margin-bottom: 2rem;
	background: #fff;
	border: 1px solid rgba(36, 49, 45, 0.12);
	border-radius: 8px;
	box-shadow: 0 10px 28px rgba(36, 49, 45, 0.06);

	@media (max-width: 620px) {
		grid-template-columns: 1fr;
	}
`;

export const Field = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
`;

export const Label = styled.label`
	color: #52615b;
	font-size: 0.7rem;
	font-weight: 700;
	letter-spacing: 0.08em;
	text-transform: uppercase;
`;

export const NameInput = styled.input`
	width: 100%;
	padding: 0.75rem;
	border: 1px solid rgba(36, 49, 45, 0.2);
	border-radius: 4px;
	color: #24312d;
	background: #f6f4ef;
`;

export const RelationSelect = styled.select`
	width: 100%;
	padding: 0.75rem;
	border: 1px solid rgba(36, 49, 45, 0.2);
	border-radius: 4px;
	color: #24312d;
	background: #f6f4ef;
`;

export const AddButton = styled.button`
	padding: 0.75rem 1rem;
	color: #fff;
	background: #bd5b3c;
	border: 0;
	border-radius: 4px;
	cursor: pointer;
	font-weight: 700;

	&:hover:not(:disabled) {
		background: #a4492f;
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;
