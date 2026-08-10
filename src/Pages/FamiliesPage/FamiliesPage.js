import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, Eyebrow, Heading, Intro, Toolbar, ImportButton, HiddenInput, FamilyGrid, FamilyCard, CardTop, FamilyName, FamilyMeta, CardActions, ActionButton, EmptyState, RenameInput } from './FamiliesPage.style';
import { getUniqueProfileId, isValidTree, PROFILE_PREFIX } from '../../utils/familyData';

const FamiliesPage = () => {
  const fileInput = useRef(null);
  const [profiles, setProfiles] = useState(() => loadProfiles());
  const [editingKey, setEditingKey] = useState(null);
  const [draftName, setDraftName] = useState('');

  const refreshProfiles = () => setProfiles(loadProfiles());

  const renameProfile = (profile) => {
    const nextName = draftName.trim();
    if (!nextName || nextName === profile.familyName) {
      setEditingKey(null);
      return;
    }
    const updatedProfile = { ...profile, familyName: nextName };
    localStorage.setItem(profile.key, JSON.stringify(updatedProfile));
    setEditingKey(null);
    refreshProfiles();
  };

  const deleteProfile = (profile) => {
    if (!window.confirm(`Delete ${profile.familyName}? This cannot be undone.`)) return;
    localStorage.removeItem(profile.key);
    refreshProfiles();
  };

  const importTree = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        if (imported.format && imported.format !== 'familyroots-tree') throw new Error('Invalid archive format');
        if (!imported.familyName || !isValidTree(imported.tree)) throw new Error('Invalid archive');
        const phone = getUniqueProfileId(imported.phone || `imported-${Date.now()}`);
        localStorage.setItem(`${PROFILE_PREFIX}${phone}`, JSON.stringify({
          fullName: imported.fullName || '',
          phoneNumber: phone,
          familyName: imported.familyName,
          tree: imported.tree,
        }));
        refreshProfiles();
      } catch {
        window.alert('This file is not a valid FamilyTree JSON archive.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <Page>
      <Eyebrow>Your archive</Eyebrow>
      <Heading>Families</Heading>
      <Intro>Open, rename, or remove the family trees saved in this browser.</Intro>
      <Toolbar>
        <ImportButton type="button" onClick={() => fileInput.current?.click()}>Import JSON</ImportButton>
        <HiddenInput ref={fileInput} type="file" accept="application/json,.json" onChange={importTree} />
        <span>{profiles.length} {profiles.length === 1 ? 'family' : 'families'}</span>
      </Toolbar>
      {profiles.length === 0 ? (
        <EmptyState>No family trees yet. Start one from the home page.</EmptyState>
      ) : (
        <FamilyGrid>
          {profiles.map((profile) => (
            <FamilyCard key={profile.key}>
              <CardTop><span>Family archive</span><strong>{countMembers(profile.tree)} people</strong></CardTop>
              {editingKey === profile.key ? (
                <RenameInput autoFocus value={draftName} onChange={(event) => setDraftName(event.target.value)} aria-label={`Rename ${profile.familyName}`} />
              ) : <FamilyName>{profile.familyName}</FamilyName>}
              <FamilyMeta>Created from {profile.phoneNumber}</FamilyMeta>
              <CardActions>
                <ActionButton as={Link} to={`/builder/${profile.phoneNumber}`}>Open tree</ActionButton>
                {editingKey === profile.key ? (
                  <>
                    <ActionButton type="button" onClick={() => renameProfile(profile)}>Save</ActionButton>
                    <ActionButton type="button" onClick={() => setEditingKey(null)}>Cancel</ActionButton>
                  </>
                ) : <ActionButton type="button" onClick={() => { setEditingKey(profile.key); setDraftName(profile.familyName); }}>Rename</ActionButton>}
                <ActionButton type="button" $danger onClick={() => deleteProfile(profile)}>Delete</ActionButton>
              </CardActions>
            </FamilyCard>
          ))}
        </FamilyGrid>
      )}
    </Page>
  );
};

const loadProfiles = () => Object.keys(localStorage)
  .filter((key) => key.startsWith(PROFILE_PREFIX))
  .map((key) => {
    try {
      const profile = JSON.parse(localStorage.getItem(key));
      if (!profile || typeof profile !== 'object') return null;
      const phoneNumber = profile.phoneNumber || key.slice(PROFILE_PREFIX.length);
      return { key, ...profile, phoneNumber };
    } catch {
      return null;
    }
  })
  .filter(Boolean);

const countMembers = (node) => {
  if (!node) return 0;
  return 1 + (node.children || []).reduce((total, child) => total + countMembers(child), 0)
    + (node.siblings || []).reduce((total, sibling) => total + countMembers(sibling), 0)
    + (node.spouse ? countMembers(node.spouse) : 0);
};

export default FamiliesPage