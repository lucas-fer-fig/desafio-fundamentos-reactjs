import { parseISO, format } from 'date-fns';

const formatDateTime = (value: string): string => {
  const date = parseISO(value);

  const formattedDate = format(date, "dd'/'MM'/'yy");

  return formattedDate;
};

export default formatDateTime;
