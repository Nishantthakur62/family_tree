import React, { useEffect, useRef, useState } from 'react';
import { AddForm, Field, Label, NameInput, RelationSelect, AddButton, SelectedPerson, SuggestionList, SuggestionButton, SuggestionField } from './MemberAddForm.style';

const MAX_VISIBLE_SUGGESTIONS = 18;

const MemberAddForm = ({ onAdd, selectedId, selectedName, suggestedRelation = 'child', quickAddChoices = [], quickAddRelation = null, quickAddSelectedId = null, onClearQuickAdd }) => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState(suggestedRelation);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (!selectedId) return;
    setRelation(quickAddRelation || suggestedRelation);
    setShowAllSuggestions(false);
    nameInputRef.current?.focus();
  }, [selectedId, quickAddRelation, suggestedRelation]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName || !selectedId) return;

    onAdd({ name: trimmedName, relation, selectedId });
    setName('');
    onClearQuickAdd?.();
  };

  const handleQuickPick = (quickName) => {
    if (!selectedId) return;
    const pickedRelation = quickAddRelation || relation;
    const pickedSelectedId = quickAddSelectedId || selectedId;
    setRelation(pickedRelation);
    onAdd({ name: quickName, relation: pickedRelation, selectedId: pickedSelectedId });
    onClearQuickAdd?.();
    setName('');
  };

  const visibleSuggestions = quickAddChoices.length > MAX_VISIBLE_SUGGESTIONS && !showAllSuggestions
    ? quickAddChoices.slice(0, MAX_VISIBLE_SUGGESTIONS)
    : quickAddChoices;

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
          <option value="parent">Parent</option>
          <option value="spouse">Spouse</option>
          <option value="sibling">Sibling</option>
        </RelationSelect>
      </Field>
      {quickAddChoices.length > 0 && (
        <SuggestionField>
          <Label>Choose from your list</Label>
          <SuggestionList>
            {visibleSuggestions.map((quickName) => (
              <SuggestionButton key={quickName} type="button" onClick={() => handleQuickPick(quickName)}>
                {quickName}
              </SuggestionButton>
            ))}
          </SuggestionList>
          {quickAddChoices.length > MAX_VISIBLE_SUGGESTIONS && (
            <SuggestionButton type="button" onClick={() => setShowAllSuggestions((current) => !current)}>
              {showAllSuggestions ? 'Show fewer' : `Show all (${quickAddChoices.length})`}
            </SuggestionButton>
          )}
        </SuggestionField>
      )}
      <AddButton type="submit" disabled={!selectedId}>Add person</AddButton>
    </AddForm>
  );
};

export default MemberAddForm