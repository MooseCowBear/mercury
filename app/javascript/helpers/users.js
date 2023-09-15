export const isUserActive = (lastActiveDateString) => {
  if (!lastActiveDateString) return false;
  const lastActive = new Date(lastActiveDateString);
  const now = new Date();
  const diffInMinutes = (now.getTime() - lastActive.getTime()) / 60000;
  return diffInMinutes <= 10;
}