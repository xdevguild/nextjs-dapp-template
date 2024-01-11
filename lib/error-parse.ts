// Basic version, extend if required

export const errorParse = (err: unknown) => {
  if (typeof err === 'string') {
    return err.toUpperCase();
  } else if (err instanceof Error) {
    return err.message;
  }
  return `Error: ${JSON.stringify(err)}`;
};
