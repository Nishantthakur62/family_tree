import styled from 'styled-components';

export const NodeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  min-width: 204px;
`;

export const GenerationRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 2.75rem;
  width: max-content;
  padding: 0 1rem;
`;

export const Branch = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PartnerRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.7rem;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -1.75rem;
    width: 2px;
    height: 1.75rem;
    background: linear-gradient(#bd5b3c, #9eafa1);
    border-radius: 999px;
  }

  .partnerLink {
    width: 1.35rem;
    height: 1.35rem;
    display: grid;
    place-items: center;
    color: #bd5b3c;
    background: #fff1e5;
    border: 1px solid rgba(189, 91, 60, 0.3);
    border-radius: 50%;
    font-family: Georgia, serif;
    font-size: 1rem;
    font-weight: 700;
  }
`;

export const NodeBox = styled.button`
  position: relative;
  z-index: 1;
  width: ${({ $root }) => $root ? '196px' : '184px'};
  min-height: ${({ $root }) => $root ? '84px' : '78px'};
  padding: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  background: ${({ selected, $root }) => selected ? '#fff7df' : ($root ? '#edf3e9' : '#fff')};
  border: 1px solid ${({ selected, $root }) => selected ? '#bd5b3c' : ($root ? '#93a992' : 'rgba(36, 49, 45, 0.15)')};
  border-radius: 8px;
  box-shadow: ${({ selected, $root }) => selected ? '0 10px 24px rgba(189, 91, 60, 0.2)' : ($root ? '0 8px 18px rgba(100, 123, 107, 0.16)' : '0 5px 14px rgba(36, 49, 45, 0.1)')};
  cursor: pointer;
  font: inherit;
  text-align: left;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  .nodeMark {
    width: 32px;
    height: 32px;
    flex: 0 0 32px;
    display: grid;
    place-items: center;
    color: #fff;
    background: ${({ selected, $root }) => selected ? '#bd5b3c' : ($root ? '#52685a' : '#647b6b')};
    border-radius: 50%;
    font-family: Georgia, serif;
    font-size: 1.15rem;
  }

  .nodeImage {
    width: 32px;
    height: 32px;
    flex: 0 0 32px;
    object-fit: cover;
    border-radius: 50%;
  }

  .nodeInfo {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  strong {
    overflow: hidden;
    color: #24312d;
    font-size: ${({ $root }) => $root ? '0.9rem' : '0.85rem'};
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  small {
    color: #7b8c80;
    font-size: 0.65rem;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: #bd5b3c;
    box-shadow: 0 12px 24px rgba(36, 49, 45, 0.16);
  }

  &:focus-visible {
    outline: 3px solid rgba(189, 91, 60, 0.32);
    outline-offset: 3px;
  }
`;

export const SiblingButton = styled.button`
  width: 1.8rem;
  height: 1.8rem;
  flex: 0 0 1.8rem;
  display: grid;
  place-items: center;
  border: 1px solid rgba(189, 91, 60, 0.35);
  border-radius: 50%;
  background: #fff1e5;
  color: #a4492f;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s ease, transform 0.2s ease, background 0.2s ease;

  &:hover, &:focus-visible {
    opacity: 1;
    background: #f0b36d;
    transform: scale(1.08);
  }

  &:focus-visible { outline: 3px solid rgba(189, 91, 60, 0.25); outline-offset: 2px; }
`;

export const SpouseButton = styled.button`
  width: 1.35rem;
  height: 1.35rem;
  display: grid;
  place-items: center;
  border: 1px solid rgba(189, 91, 60, 0.3);
  border-radius: 50%;
  background: #fff1e5;
  color: #bd5b3c;
  cursor: pointer;
  font-family: Georgia, serif;
  font-size: 1rem;
  font-weight: 700;

  &:hover, &:focus-visible { background: #f0b36d; }
  &:focus-visible { outline: 3px solid rgba(189, 91, 60, 0.25); outline-offset: 2px; }
`;

export const ChildButton = styled.button`
  position: relative;
  z-index: 2;
  width: 0.85rem;
  height: 0.85rem;
  margin: 1.25rem 0 -0.35rem;
  border: 2px solid #f4f1e9;
  border-radius: 50%;
  background: #bd5b3c;
  box-shadow: 0 0 0 1px rgba(189, 91, 60, 0.35);
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover, &:focus-visible { background: #a4492f; transform: scale(1.25); }
  &:focus-visible { outline: 3px solid rgba(189, 91, 60, 0.25); outline-offset: 3px; }
`;

export const ChildrenWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  position: relative;
  margin-top: 1.75rem;
  padding: 1.75rem 0.75rem 0;
  border-top: 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 1.25rem;
    right: 1.25rem;
    height: 2px;
    background: linear-gradient(90deg, transparent, #9eafa1 10%, #bd5b3c 50%, #9eafa1 90%, transparent);
    border-radius: 999px;
    box-shadow: 0 0 8px rgba(189, 91, 60, 0.12);
  }

  &:has(> ${NodeContainer}:only-child)::after {
    display: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: -1.75rem;
    left: 50%;
    width: 2px;
    height: 1.75rem;
    background: #9eafa1;
    border-radius: 999px;
  }

  > ${NodeContainer}::before {
    content: '';
    position: absolute;
    top: -1.75rem;
    left: 50%;
    width: 2px;
    height: 1.75rem;
    background: #9eafa1;
    border-radius: 999px;
  }

  > ${NodeContainer}::after {
    content: '';
    position: absolute;
    top: -1.86rem;
    left: 50%;
    width: 0.45rem;
    height: 0.45rem;
    background: #bd5b3c;
    border: 2px solid #f4f1e9;
    border-radius: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 0 1px rgba(189, 91, 60, 0.25);
  }
`;
