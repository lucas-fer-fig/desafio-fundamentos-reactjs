import formatValue from './formatValue';

const formatValueSignal = (
  value: number,
  type: 'income' | 'outcome',
): string => {
  const valueSignal = formatValue(value);

  if (type === 'income') {
    return valueSignal;
  }

  return `- ${valueSignal}`;
};

export default formatValueSignal;
