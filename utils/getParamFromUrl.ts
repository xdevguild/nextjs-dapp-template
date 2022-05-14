export const getParamFromUrl = (paramName: string) => {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.get(paramName);
  }
};
