export const formatPrice = (price: number) => {
  const number = price.toLocaleString("nl-NL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `€ ${number}`;
};
