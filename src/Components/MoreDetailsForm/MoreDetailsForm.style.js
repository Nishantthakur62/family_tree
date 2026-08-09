import styled from 'styled-components';

export const FormWrapper = styled.div`
  background-color: #fefefe;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

export const Label = styled.label`
  font-weight: bold;
  margin-top: 10px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 5px 0 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  padding: 8px 12px;
  margin-right: 10px;
  background-color: ${props => props.danger ? '#e74c3c' : '#3498db'};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
