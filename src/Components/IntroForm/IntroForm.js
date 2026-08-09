import React, { useState } from 'react';
import { ModalOverlay, ModalContainer, ModalHeader, ModalBody, Input, SubmitButton, CloseButton } from './IntroForm.style';
import { useNavigate } from 'react-router-dom';

const IntroForm = ({ onClose }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const allKeys = Object.keys(localStorage);
    const phoneExists = allKeys.some((key) => {
      if (key.startsWith('family-profile-')) {
        const data = JSON.parse(localStorage.getItem(key));
        return data.phoneNumber === phoneNumber;
      }
      return false;
    });

    if (phoneExists) {
      setError('This phone number is already used.');
      return;
    }

    const formData = {
      fullName,
      phoneNumber,
      familyName,
    };

    localStorage.setItem(`family-profile-${phoneNumber}`, JSON.stringify(formData));
    navigate(`/builder/${phoneNumber}`);
  };

  return (
    <ModalOverlay onClick={onClose} role="presentation">
      <ModalContainer onClick={(event) => event.stopPropagation()}>
        <ModalHeader>
          <h2>Build Your Family Tree</h2>
          <CloseButton type="button" onClick={onClose} aria-label="Close form">×</CloseButton>
        </ModalHeader>
        <ModalBody onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Family Name"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            required
          />
          {error && <p style={{ color: 'red', margin: '5px 0' }}>{error}</p>}
          <SubmitButton type="submit">Start Building</SubmitButton>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default IntroForm;
