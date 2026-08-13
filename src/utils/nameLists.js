import { DEFAULT_FEMALE_NAMES, DEFAULT_MALE_NAMES } from './nameLibrary';

export const NAME_LISTS_KEY = 'familyroots-name-lists';

export const readSavedNameLists = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(NAME_LISTS_KEY) || 'null');
    if (saved && (Array.isArray(saved.maleNames) || Array.isArray(saved.femaleNames))) {
      return {
        maleNames: Array.isArray(saved.maleNames) ? saved.maleNames : [],
        femaleNames: Array.isArray(saved.femaleNames) ? saved.femaleNames : [],
      };
    }
  } catch {
    // fall back to default names below
  }

  return {
    maleNames: DEFAULT_MALE_NAMES,
    femaleNames: DEFAULT_FEMALE_NAMES,
  };
};

export const hasCustomNameLists = () => {
  const saved = JSON.parse(localStorage.getItem(NAME_LISTS_KEY) || 'null');
  if (!saved || (!Array.isArray(saved.maleNames) && !Array.isArray(saved.femaleNames))) {
    return false;
  }
  const maleNames = Array.isArray(saved.maleNames) ? saved.maleNames : [];
  const femaleNames = Array.isArray(saved.femaleNames) ? saved.femaleNames : [];
  return maleNames.length > 0 || femaleNames.length > 0;
};

export const getNameSuggestions = (gender) => {
  const { maleNames, femaleNames } = readSavedNameLists();
  const normalizedGender = String(gender || '').toLowerCase();

  if (normalizedGender === 'male') return maleNames;
  if (normalizedGender === 'female') return femaleNames;
  return [...maleNames, ...femaleNames];
};

export const getOppositeNameSuggestions = (gender) => {
  return getNameSuggestions(gender === 'male' ? 'female' : 'male');
};
