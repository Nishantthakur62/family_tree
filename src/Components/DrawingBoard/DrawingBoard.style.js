import styled from 'styled-components';

export const BoardWrapper = styled.div`
  width: 100%;
  padding: clamp(1rem, 3vw, 2rem);
  background: #e8e4da;
  border: 1px solid rgba(36, 49, 45, 0.12);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  overflow: hidden;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 18px 45px rgba(36, 49, 45, 0.08);
`;

export const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  > span {
    color: #7b8c80;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  > div:last-child {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    gap: 0.55rem;
  }

  @media (max-width: 560px) {
    flex-direction: column;

    > div:last-child {
      width: 100%;
      align-items: flex-start;
    }
  }
`;

export const ExportButton = styled.button`
  padding: 0.55rem 0.8rem;
  color: #fff;
  background: #647b6b;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 700;

  &:hover:not(:disabled) {
    background: #52685a;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const BoardTitle = styled.h2`
  margin: 0 0 0.25rem;
  color: #24312d;
  font-family: Georgia, serif;
  font-size: 1.7rem;
  font-weight: 400;
`;

export const BoardHint = styled.p`
  margin: 0;
  color: #68776d;
  font-size: 0.85rem;

  &::before {
    content: '●';
    margin-right: 0.45rem;
    color: #bd5b3c;
    font-size: 0.6rem;
    vertical-align: 0.08em;
  }
`;

export const TreeViewport = styled.div`
  width: 100%;
  min-height: 280px;
  padding: 2rem 1rem 3rem;
  overflow-x: auto;
  background-color: #f4f1e9;
  background-image: linear-gradient(rgba(100, 113, 100, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 113, 100, 0.07) 1px, transparent 1px);
  background-size: 24px 24px;
  border: 1px solid rgba(36, 49, 45, 0.1);
  border-radius: 8px;

  > div {
    margin: 0 auto;
  }
`;
