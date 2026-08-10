import styled from 'styled-components';

export const FormWrapper = styled.div`
  width: auto;
  padding: 1rem 1.25rem;
  margin: 1.25rem 1.25rem 0;
  background: #fff;
  border: 1px solid rgba(36, 49, 45, 0.12);
  border-radius: 8px;
  box-shadow: none;

  form {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .detailGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
  }

  .imageError {
    margin-bottom: 0.5rem;
    color: #a4492f;
    font-size: 0.72rem;
  }

  @media (max-width: 520px) {
    .detailGrid {
      grid-template-columns: 1fr;
    }
  }
`;

export const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: 0.8rem;

  strong {
    color: #24312d;
    font-family: Georgia, serif;
    font-size: 1rem;
    font-weight: 400;
  }

  span {
    color: #7b8c80;
    font-size: 0.72rem;
  }
`;

export const Label = styled.label`
  font-weight: bold;
  margin-top: 10px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.65rem;
  margin: 0 0 0.5rem;
  border-radius: 4px;
  border: 1px solid rgba(36, 49, 45, 0.2);
  color: #24312d;
  background: #f6f4ef;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.65rem;
  margin: 0 0 0.5rem;
  resize: vertical;
  border: 1px solid rgba(36, 49, 45, 0.2);
  border-radius: 4px;
  color: #24312d;
  background: #f6f4ef;
  font: inherit;
`;

export const FileInput = styled.input`
  margin: 0.25rem 0 0.5rem;
  color: #52615b;
  font-size: 0.75rem;
`;

export const ImagePreview = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(36, 49, 45, 0.15);
  border-radius: 50%;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 0.35rem;
`;

export const Button = styled.button`
  padding: 0.65rem 0.9rem;
  background-color: ${props => props.$danger ? '#bd5b3c' : '#647b6b'};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.$danger ? '#a4492f' : '#52685a'};
  }
`;
