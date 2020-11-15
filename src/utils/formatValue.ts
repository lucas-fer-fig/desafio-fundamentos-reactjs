import Dinero from 'dinero.js';

const formatValue = (value: number): string => {
  // Intl.NumberFormat().format(value);
  if (!Number.isInteger(value)) {
    return '';
  }
  const price = Dinero({ amount: value, currency: 'BRL' });
  return price.setLocale('pt-BR').multiply(100).toFormat();
};

export default formatValue;
