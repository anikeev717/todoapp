export const getValidLabel = (inputValue) => inputValue.replace(/\s+/g, ' ').trim();

export const getValidTimeValue = (value) => {
  const reg = /^0+|(^6[1-9])|(^[7-9]\d)|[^\d]/gm;
  const validTimeValue = value.replace(reg, '').slice(0, 2);
  return validTimeValue;
};
