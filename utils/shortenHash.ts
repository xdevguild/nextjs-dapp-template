export const shortenHash = (address: string, charsAmount = 6) => {
  const firstPart = address.substring(0, charsAmount);
  const lastPart = address.substring(
    address.length - charsAmount,
    address.length
  );
  return `${firstPart}...${lastPart}`;
};
