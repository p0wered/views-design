export const formatAmount = (value: string): string => {
  const amount = Number.parseInt(value, 10);
  return Number.isFinite(amount) ? new Intl.NumberFormat('ru-RU').format(amount) : value;
};

export const getCookie = (name: string): string => {
  const prefix = `${encodeURIComponent(name)}=`;
  const cookie = document.cookie.split('; ').find(item => item.startsWith(prefix));
  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : '';
};
