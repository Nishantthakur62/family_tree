import styled from 'styled-components';

export const NodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  min-width: 190px;
`;

export const GenerationRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
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
  gap: 0.55rem;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -1.5rem;
    width: 1px;
    height: 1.5rem;
    background: rgba(100, 123, 107, 0.45);
  }

  .partnerLink {
    color: #bd5b3c;
    font-family: Georgia, serif;
    font-size: 1rem;
    font-weight: 700;
  }
`;

export const NodeBox = styled.div`
  position: relative;
  z-index: 1;
  width: 175px;
  min-height: 76px;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  background: ${({ selected }) => selected ? '#fff7df' : '#fff'};
  border: 1px solid ${({ selected }) => selected ? '#bd5b3c' : 'rgba(36, 49, 45, 0.15)'};
  border-radius: 8px;
  box-shadow: ${({ selected }) => selected ? '0 8px 20px rgba(189, 91, 60, 0.18)' : '0 6px 16px rgba(36, 49, 45, 0.1)'};
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  .nodeMark {
    width: 32px;
    height: 32px;
    flex: 0 0 32px;
    display: grid;
    place-items: center;
    color: #fff;
    background: ${({ selected }) => selected ? '#bd5b3c' : '#647b6b'};
    border-radius: 50%;
    font-family: Georgia, serif;
    font-size: 1.1rem;
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
    font-size: 0.85rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  small {
    color: #7b8c80;
    font-size: 0.65rem;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 22px rgba(36, 49, 45, 0.16);
  }
`;

export const ChildrenWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  position: relative;
  margin-top: 1.5rem;
  padding: 1.5rem 0.5rem 0;
  border-top: 1px solid rgba(100, 123, 107, 0.5);

  &::before {
    content: '';
    position: absolute;
    top: -1.5rem;
    left: 50%;
    width: 1px;
    height: 1.5rem;
    background: rgba(100, 123, 107, 0.45);
  }

  > ${NodeContainer}::before {
    content: '';
    position: absolute;
    top: -1.5rem;
    left: 50%;
    width: 1px;
    height: 1.5rem;
    background: rgba(100, 123, 107, 0.45);
  }
`;
