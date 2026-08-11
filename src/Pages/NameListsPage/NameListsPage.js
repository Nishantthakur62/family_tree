import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { NAME_LISTS_KEY } from '../../utils/nameLists';
import { DEFAULT_MALE_NAMES, DEFAULT_FEMALE_NAMES } from '../../utils/nameLibrary';
import {
  ListsShell,
  Breadcrumbs,
  Eyebrow,
  Heading,
  Intro,
  ListsForm,
  ListField,
  ListLabel,
  ListHint,
  ListTextarea,
  Actions,
  BackLink,
  SaveButton,
  SavedMessage,
} from './NameListsPage.style';

const defaultMaleNames = DEFAULT_MALE_NAMES;
const defaultFemaleNames = DEFAULT_FEMALE_NAMES;

const readInitialLists = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(NAME_LISTS_KEY) || 'null');
    if (saved?.maleNames?.length || saved?.femaleNames?.length) return saved;
  } catch {
    return { maleNames: defaultMaleNames, femaleNames: defaultFemaleNames };
  }
  return { maleNames: defaultMaleNames, femaleNames: defaultFemaleNames };
};

const textToNames = (value) => [...new Set(value.split(/[\n,]+/).map((name) => name.trim()).filter(Boolean))];

const NameListsPage = () => {
  const [searchParams] = useSearchParams();
  const returnPath = searchParams.get('return') || '/families';
  const initialLists = readInitialLists();
  const [maleNames, setMaleNames] = useState(initialLists.maleNames.join('\n'));
  const [femaleNames, setFemaleNames] = useState(initialLists.femaleNames.join('\n'));
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const lists = { maleNames: textToNames(maleNames), femaleNames: textToNames(femaleNames) };
    if (lists.maleNames.length === 0 && lists.femaleNames.length === 0) {
      localStorage.removeItem(NAME_LISTS_KEY);
      setMaleNames(defaultMaleNames.join('\n'));
      setFemaleNames(defaultFemaleNames.join('\n'));
    } else {
      localStorage.setItem(NAME_LISTS_KEY, JSON.stringify(lists));
      setMaleNames(lists.maleNames.join('\n'));
      setFemaleNames(lists.femaleNames.join('\n'));
    }
    setSaved(true);
  };

  return (
    <ListsShell>
      <Breadcrumbs><Link to={returnPath}><FiArrowLeft aria-hidden="true" /> Back to builder</Link></Breadcrumbs>
      <Eyebrow>Personalize quick add</Eyebrow>
      <Heading>Your name lists</Heading>
      <Intro>Add names one per line. The drawing-board buttons will use these lists for new family members. Spouse actions automatically choose the opposite list.</Intro>
      <ListsForm onSubmit={handleSubmit}>
        <ListField>
          <ListLabel htmlFor="male-names">Male names</ListLabel>
          <ListHint>Used for male family members and female-member spouses.</ListHint>
          <ListTextarea id="male-names" value={maleNames} onChange={(event) => setMaleNames(event.target.value)} rows="12" />
        </ListField>
        <ListField>
          <ListLabel htmlFor="female-names">Female names</ListLabel>
          <ListHint>Used for female family members and male-member spouses.</ListHint>
          <ListTextarea id="female-names" value={femaleNames} onChange={(event) => setFemaleNames(event.target.value)} rows="12" />
        </ListField>
        <Actions>
          <BackLink as={Link} to={returnPath}>Cancel</BackLink>
          <SaveButton type="submit"><FiSave aria-hidden="true" /> Save name lists</SaveButton>
          {saved && <SavedMessage>Saved locally</SavedMessage>}
        </Actions>
      </ListsForm>
    </ListsShell>
  );
};

export default NameListsPage;
