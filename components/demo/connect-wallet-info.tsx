export const ConnectWalletInfo = ({ loggedIn }: { loggedIn: boolean }) => {
  if (loggedIn) return null;

  return (
    <div className="text-destructive text-xs font-bold ml-3">
      Connect your wallet!
    </div>
  );
};
