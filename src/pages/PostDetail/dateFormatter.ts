export const formatDateTime = (isoString: string): string => {
  if (!isoString) {
    return '';
  }
  const date = new Date(isoString);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

