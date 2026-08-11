import React, { useState } from 'react';
import { ModalOverlay, ModalContainer, ModalHeader, ModalBody, Input, GenderSelect, SubmitButton, CloseButton } from './IntroForm.style';
import { useNavigate } from 'react-router-dom';
import { PROFILE_PREFIX } from '../../utils/familyData';

const IntroForm = ({ onClose }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const allKeys = Object.keys(localStorage);
    const phoneExists = allKeys.some((key) => {
      if (key.startsWith(PROFILE_PREFIX)) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          return data.phoneNumber === phoneNumber;
        } catch {
          return false;
        }
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
      gender,
    };

    localStorage.setItem(`${PROFILE_PREFIX}${phoneNumber}`, JSON.stringify(formData));
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
          <GenderSelect aria-label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </GenderSelect>
          {error && <p style={{ color: 'red', margin: '5px 0' }}>{error}</p>}
          <SubmitButton type="submit">Start Building</SubmitButton>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default IntroForm;
