//src/utils/parseFilterParams.js
const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  const validTypes = ['work', 'home', 'personal', 'general'];
  if (validTypes.includes(type)) return type;
};

const parseIsFavourite = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return;

  const lowerCaseValue = isFavourite.toLowerCase();
  if (lowerCaseValue === 'true') return true;
  if (lowerCaseValue === 'false') return false;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedContactType = parseContactType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
