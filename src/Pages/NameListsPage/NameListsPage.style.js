import styled from 'styled-components';

export const ListsShell = styled.main`
  width: min(960px, 100%);
  min-height: calc(100vh - 76px);
  margin: 0 auto;
  padding: clamp(2rem, 6vw, 5rem) 1.25rem;
`;

export const Breadcrumbs = styled.nav`
  margin-bottom: 2.5rem;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: #52685a;
    font-size: 0.8rem;
    font-weight: 700;
    text-decoration: none;

    &:hover { color: #bd5b3c; }
  }
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
  margin: 0 0 0.9rem;
  color: #24312d;
  font-family: Georgia, serif;
  font-size: clamp(2.6rem, 6vw, 5rem);
  font-weight: 400;
  line-height: 0.95;
`;

export const Intro = styled.p`
  max-width: 680px;
  margin: 0 0 2.5rem;
  color: #52615b;
  line-height: 1.7;
`;

export const ListsForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 680px) { grid-template-columns: 1fr; }
`;

export const ListField = styled.div`
  display: grid;
  gap: 0.5rem;
  padding: 1.25rem;
  background: #fff;
  border: 1px solid rgba(36, 49, 45, 0.14);
  border-radius: 8px;
`;

export const ListLabel = styled.label`
  color: #24312d;
  font-family: Georgia, serif;
  font-size: 1.4rem;
`;

export const ListHint = styled.span`
  min-height: 2.2rem;
  color: #7b8c80;
  font-size: 0.76rem;
  line-height: 1.45;
`;

export const ListTextarea = styled.textarea`
  width: 100%;
  min-height: 260px;
  resize: vertical;
  border: 1px solid rgba(36, 49, 45, 0.2);
  border-radius: 4px;
  background: #f6f4ef;
  color: #24312d;
  font: inherit;
  line-height: 1.7;
  padding: 0.8rem;

  &:focus { outline: 2px solid rgba(189, 91, 60, 0.3); border-color: #bd5b3c; }
`;

export const Actions = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 0.75rem;
`;

export const BackLink = styled.a`
  color: #52615b;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
`;

export const SaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border: 0;
  border-radius: 4px;
  background: #bd5b3c;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  padding: 0.85rem 1rem;

  &:hover { background: #a4492f; }
`;

export const SavedMessage = styled.span`
  color: #52745d;
  font-size: 0.8rem;
  font-weight: 700;
`;
