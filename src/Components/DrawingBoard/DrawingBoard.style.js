import styled from 'styled-components';

export const BoardWrapper = styled.div`
  width: 100%;
  padding: 0;
  background: #ece9df;
  border: 1px solid rgba(36, 49, 45, 0.12);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow: hidden;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 18px 45px rgba(36, 49, 45, 0.08);
`;

export const BoardHeader = styled.div`
  padding: 1.25rem clamp(1.25rem, 3vw, 2rem);
  background: #24312d;
  border-radius: 11px 11px 0 0;
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

  h2 {
    color: #fff;
  }

  @media (max-width: 560px) {
    flex-direction: column;

    > div:last-child {
      width: 100%;
      align-items: flex-start;
    }
  }
`;

export const BoardTools = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.55rem;

  > span:last-child {
    color: #b9c8be;
    font-size: 0.68rem;
    text-align: right;
  }

  @media (max-width: 560px) {
    justify-content: flex-start;

    > span:last-child {
      text-align: left;
    }
  }
`;

export const ExportButton = styled.button`
  padding: 0.55rem 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #fff;
  background: #bd5b3c;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 700;

  &:hover:not(:disabled) {
    background: #a4492f;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ZoomLabel = styled.span`
  color: #24312d;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const ZoomControls = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem;
  background: #f6f4ef;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 6px;
`;

export const ZoomButton = styled.button`
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  color: #24312d;
  background: transparent;
  border: 0;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: #fff;
    background: #647b6b;
  }

  &:focus-visible {
    outline: 2px solid #bd5b3c;
    outline-offset: 2px;
  }
`;

export const FitButton = styled.button`
  height: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0 0.55rem;
  color: #52685a;
  background: #e3e9df;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.68rem;
  font-weight: 700;

  &:hover {
    color: #24312d;
    background: #e8e4da;
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
  color: #b9c8be;
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
  max-width: 100%;
  min-height: 300px;
  max-height: min(68vh, 720px);
  margin: 1.25rem;
  padding: 2rem 1.25rem 2.75rem;
  overflow-x: auto;
  overflow-y: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f4f1e9;
  background-image: radial-gradient(circle at 50% 0%, rgba(189, 91, 60, 0.1), transparent 42%), linear-gradient(rgba(100, 113, 100, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 113, 100, 0.06) 1px, transparent 1px);
  background-size: auto, 28px 28px, 28px 28px;
  border: 1px solid rgba(36, 49, 45, 0.1);
  border-radius: 8px;
  scrollbar-color: #9ca99d #e8e4da;
  cursor: grab;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 560px) {
    justify-content: flex-start;
  }
`;

export const UnlinkedSection = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin: 1.25rem 1.25rem 0;
  padding: 0.9rem 1rem;
  color: #52615b;
  background: #f7f2e8;
  border-left: 3px solid #bd5b3c;
  border-radius: 4px;
  font-size: 0.75rem;

  strong {
    color: #24312d;
    font-size: 0.85rem;
  }
`;

export const UnlinkedList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1.25rem;
  margin: 0.35rem 0 0;
  padding-left: 1.1rem;
`;

export const TreeCanvas = styled.div`
  flex: 0 0 auto;
  width: max-content;
  margin: 0;
  transform: scale(${({ $zoom }) => $zoom});
  transform-origin: top left;
`;

export const TreeStage = styled.div`
  flex: 0 0 auto;
  width: ${({ $width }) => $width ? `${$width}px` : 'max-content'};
  height: ${({ $height }) => $height ? `${$height}px` : 'auto'};
`;
