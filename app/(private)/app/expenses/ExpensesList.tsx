"use client";

import { Button } from "@/components/ui/button";
import { Transaction } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function ExpensesList() {
  const queryClient = useQueryClient();
  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: (): Promise<Transaction[]> =>
      axios.get("/api/transactions").then((response) => response.data.data),
  });

  const { mutate: deleteTransaction } = useMutation({
    mutationFn: (transactionId: Transaction["id"]) =>
      axios.delete("/api/transactions", { data: { id: transactionId } }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  return (
    <div>
      {transactions?.map((transaction) => (
        <div key={transaction.id} className="flex flex-row justify-between">
          <div>{transaction.memo}</div>
          <div>{transaction.amount}</div>
          <Button onClick={() => deleteTransaction(transaction.id)}>
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
