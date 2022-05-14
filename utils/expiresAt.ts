export const getNewLoginExpiresTimestamp = () => {
  return new Date().setHours(new Date().getHours() + 24);
};

export const isLoginExpired = (expirationTimestamp: number) => {
  return Date.now() > expirationTimestamp;
};
