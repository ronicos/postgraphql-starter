export const format = (text, ...rest) => {
  return text.replace(/{(\d+)}/g, function(match, number) {
    return typeof rest[number] != 'undefined' ? rest[number] : match;
  });
};
