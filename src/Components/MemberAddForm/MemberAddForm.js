import React, { useEffect, useRef, useState } from 'react';
import { AddForm, Field, Label, NameInput, RelationSelect, AddButton, SelectedPerson } from './MemberAddForm.style';

const MemberAddForm = ({ onAdd, selectedId, selectedName, suggestedRelation = 'child' }) => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState(suggestedRelation);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (!selectedId) return;
    setRelation(suggestedRelation);
    nameInputRef.current?.focus();
  }, [selectedId, suggestedRelation]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName || !selectedId) return;

    onAdd({ name: trimmedName, relation, selectedId });
    setName('');
  };

  return (
    <AddForm onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="member-name">Add to {selectedName || 'your tree'}</Label>
        <SelectedPerson>{selectedName ? `New person will connect to ${selectedName}.` : 'Select a person in the tree first.'}</SelectedPerson>
        <NameInput
          ref={nameInputRef}
          id="member-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          required
        />
      </Field>
      <Field>
        <Label htmlFor="member-relation">Relationship</Label>
        <RelationSelect id="member-relation" value={relation} onChange={(event) => setRelation(event.target.value)}>
          <option value="child">Child</option>
          <option value="spouse">Spouse</option>
          <option value="sibling">Sibling</option>
        </RelationSelect>
      </Field>
      <AddButton type="submit" disabled={!selectedId}>Add person</AddButton>
    </AddForm>
  );
};

export default MemberAddForm