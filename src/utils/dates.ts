interface DateType {
  date: Date;
}

export const sortInAscendingOrderByDate = (
  { date: dateA }: DateType,
  { date: dateB }: DateType
) => {
  // Asking if date is string as when we stringified the entire rssList then the date became a string
  if (typeof dateA === "string") dateA = new Date(dateA);
  if (typeof dateB === "string") dateB = new Date(dateB);
  return dateB.getTime() - dateA.getTime();
};

export const sortInDescendingOrderByDate = (
  { date: dateA }: DateType,
  { date: dateB }: DateType
) => {
  // same as above here
  if (typeof dateA === "string") dateA = new Date(dateA);
  if (typeof dateB === "string") dateB = new Date(dateB);
  return dateA.getTime() - dateB.getTime();
};
