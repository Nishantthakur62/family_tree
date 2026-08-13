import React, { useEffect } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(20, 28, 27, 0.5);
  backdrop-filter: blur(3px);
`;

const ModalCard = styled.div`
  width: min(420px, 100%);
  background: #fff;
  border: 1px solid rgba(36, 49, 45, 0.12);
  border-radius: 16px;
  box-shadow: 0 24px 70px rgba(20, 28, 27, 0.22);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 1.25rem 1.25rem 0.75rem;
`;

const Title = styled.h3`
  margin: 0;
  color: #24312d;
  font-size: 1.25rem;
  font-weight: 700;
`;

const Body = styled.div`
  padding: 0 1.25rem 1.25rem;
  color: #52615b;
  line-height: 1.6;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 0 1.25rem 1.25rem;
`;

const Button = styled.button`
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(36, 49, 45, 0.12);
  cursor: pointer;
  font-weight: 700;
  transition: 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(Button)`
  background: #f6f4ef;
  color: #24312d;
`;

const PrimaryButton = styled(Button)`
  background: ${({ $danger }) => ($danger ? '#bd5b3c' : '#647b6b')};
  border-color: ${({ $danger }) => ($danger ? '#bd5b3c' : '#647b6b')};
  color: #fff;
`;

const AlertModal = ({
  isOpen,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onClose,
  danger = false,
}) => {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose} role="presentation">
      <ModalCard onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="alert-modal-title">
        <Header>
          <Title id="alert-modal-title">{title}</Title>
        </Header>
        <Body>
          {message}
        </Body>
        <Footer>
          <SecondaryButton type="button" onClick={onClose}>{cancelText}</SecondaryButton>
          <PrimaryButton type="button" $danger={danger} onClick={onConfirm}>{confirmText}</PrimaryButton>
        </Footer>
      </ModalCard>
    </Overlay>
  );
};

export default AlertModal;