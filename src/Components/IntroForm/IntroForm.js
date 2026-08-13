import React, { useState } from 'react';
import { ModalOverlay, ModalContainer, ModalHeader, ModalBody, Input, GenderSelect, SubmitButton, CloseButton, ButtonGroup, AutoFillButton, AutoFillHint } from './IntroForm.style';
import { useNavigate } from 'react-router-dom';
import { PROFILE_PREFIX } from '../../utils/familyData';

const IntroForm = ({ onClose }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const sampleData = [
    {
      fullName: 'Sarah Anderson',
      phoneNumber: '5551234567',
      familyName: 'Anderson Family',
      gender: 'female',
    },
    {
      fullName: 'Michael Chen',
      phoneNumber: '5559876543',
      familyName: 'Chen Family',
      gender: 'male',
    },
    {
      fullName: 'Emma Thompson',
      phoneNumber: '5555555555',
      familyName: 'Thompson Family',
      gender: 'female',
    },
    {
      fullName: 'James Rodriguez',
      phoneNumber: '5554444444',
      familyName: 'Rodriguez Family',
      gender: 'male',
    },
  ];

  const handleAutoFill = () => {
    const randomData = sampleData[Math.floor(Math.random() * sampleData.length)];
    setFullName(randomData.fullName);
    setPhoneNumber(randomData.phoneNumber);
    setFamilyName(randomData.familyName);
    setGender(randomData.gender);
    setError('');
  };

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
          <ButtonGroup>
            <AutoFillButton type="button" onClick={handleAutoFill} title="Fill form with sample data to explore the app">
              📋 Auto Fill
            </AutoFillButton>
            <SubmitButton type="submit">Start Building</SubmitButton>
          </ButtonGroup>
          <AutoFillHint>
            👆 Try "Auto Fill" to explore the app instantly with sample data
          </AutoFillHint>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default IntroForm;
