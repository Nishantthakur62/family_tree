import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  width: 100%;
  min-height: 100vh;
  padding: 1.25rem;
  background: rgba(18, 31, 28, 0.72);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  position: relative;
  width: min(100%, 430px);
  padding: clamp(1.5rem, 5vw, 2.25rem);
  background: #f6f4ef;
  border: 1px solid rgba(240, 179, 109, 0.45);
  border-radius: 8px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.32);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    color: #24312d;
    font-family: Georgia, serif;
    font-size: 1.65rem;
    font-weight: 400;
  }
`;

export const CloseButton = styled.button`
  color: #52615b;
  font-size: 1.5rem;
  line-height: 1;
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;

  &:hover {
    color: #bd5b3c;
  }
`;

export const ModalBody = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.85rem 0.9rem;
  color: #24312d;
  background: #fff;
  border: 1px solid rgba(36, 49, 45, 0.2);
  border-radius: 4px;

  &:focus {
    outline: 2px solid rgba(189, 91, 60, 0.35);
    border-color: #bd5b3c;
  }
`;

export const GenderSelect = styled.select`
  width: 100%;
  padding: 0.85rem 0.9rem;
  color: #24312d;
  background: #fff;
  border: 1px solid rgba(36, 49, 45, 0.2);
  border-radius: 4px;

  &:focus {
    outline: 2px solid rgba(189, 91, 60, 0.35);
    border-color: #bd5b3c;
  }
`;

export const SubmitButton = styled.button`
  padding: 0.9rem 1rem;
  background-color: #bd5b3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #a4492f;
  }
`;
