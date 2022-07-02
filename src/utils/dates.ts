interface DateType {
  date: Date;
}

export const sortInAscendingOrderByDate = (
  { date: dateA }: DateType,
  { date: dateB }: DateType
) => dateB.getTime() - dateA.getTime();

export const sortInDescendingOrderByDate = (
  { date: dateA }: DateType,
  { date: dateB }: DateType
) => dateA.getTime() - dateB.getTime();
