import { readSavedNameLists, hasCustomNameLists, getNameSuggestions } from './nameLists';

describe('name list helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('uses the default name lists when nothing custom has been saved', () => {
    const lists = readSavedNameLists();
    expect(lists.maleNames.length).toBeGreaterThan(0);
    expect(lists.femaleNames.length).toBeGreaterThan(0);
    expect(hasCustomNameLists()).toBe(false);
  });

  it('detects a custom list when the user adds their own names', () => {
    localStorage.setItem('familyroots-name-lists', JSON.stringify({
      maleNames: ['Aidan', 'Bren'],
      femaleNames: ['Cora', 'Diana'],
    }));

    expect(hasCustomNameLists()).toBe(true);
    expect(getNameSuggestions('male')).toEqual(['Aidan', 'Bren']);
    expect(getNameSuggestions('female')).toEqual(['Cora', 'Diana']);
  });
});
