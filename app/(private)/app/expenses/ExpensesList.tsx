"use client";

import { Transaction } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function ExpensesList() {
  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: (): Promise<Transaction[]> =>
      axios.get("/api/transactions").then((response) => response.data.data),
  });

  return (
    <div>
      {transactions?.map((transaction) => (
        <div key={transaction.id} className="flex flex-row justify-between">
          <div>{transaction.memo}</div>
          <div>{transaction.amount}</div>
        </div>
      ))}
    </div>
  );
}
