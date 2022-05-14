export const optionalRedirect = (callbackUrl?: string) => {
  if (typeof window !== 'undefined' && callbackUrl != null) {
    setTimeout(() => {
      if (!window.location.pathname.includes(callbackUrl)) {
        window.location.href = callbackUrl;
      }
    }, 200);
  }
};
