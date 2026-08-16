import { readSavedNameLists, hasCustomNameLists, getNameSuggestions } from './nameLists';
import { insertParentNode } from './familyData';

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

  it('inserts a parent above the selected node without losing the existing branch', () => {
    const tree = {
      id: 'root',
      name: 'Family',
      children: [
        {
          id: 'person-1',
          name: 'Ava',
          children: [],
          siblings: [],
        },
      ],
      siblings: [],
    };

    const updated = insertParentNode(tree, 'person-1', {
      id: 'parent-1',
      name: 'Mara',
      children: [],
      siblings: [],
    });

    expect(updated.id).toBe('root');
    expect(updated.children[0].id).toBe('parent-1');
    expect(updated.children[0].children[0].id).toBe('person-1');
    expect(updated.children[0].children[0].name).toBe('Ava');
  });
});
