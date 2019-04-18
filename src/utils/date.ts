export const localizedDate = (time: number) => {
  if (!time) {
    return null;
  }
  return Intl.DateTimeFormat('en-DE', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit'
  }).format(time);
};
