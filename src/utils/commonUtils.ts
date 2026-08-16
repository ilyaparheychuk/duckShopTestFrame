export const getNumberFromPrice = (price: string) => parseFloat(price.replace(/[^0-9.]/g, ""));

export const normalizeText = (text: string | null): string => {
  return text ? text.replace(/\s+/g, " ").trim() : '';
};