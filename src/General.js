export function accountDisplay(account) {
  if (account && account.length > 38) {
    return `${account.substring(0, 6)}...${account.substring(38)}`;
  }
}
