import { Transaction } from "@prisma/client";

export const groupTransactionsByDay = (transactions: Transaction[]) => {
  return transactions
    .toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .reduce((acc: { [key: string]: Transaction[] }, curr) => {
      const date = new Date(curr.date).toDateString();
      if (!(date in acc)) {
        acc[date] = [];
      }
      acc[date].push(curr);
      return acc;
    }, {});
};
