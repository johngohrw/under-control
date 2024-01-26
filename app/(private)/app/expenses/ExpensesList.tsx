"use client";

import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactGenericHTMLElementProps } from "@/types";
import { Transaction } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// TODO: replace hardcoded currency formatter. create global currency config.
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "MYR",
});

export function ExpensesList({
  className,
  ...props
}: ReactGenericHTMLElementProps) {
  const queryClient = useQueryClient();
  const { data: transactions, isFetched } = useQuery({
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
    <div className={`flex flex-col gap-1 ${className}`} {...props}>
      {!isFetched || !transactions ? (
        <Loading className="min-h-[200px]" />
      ) : transactions.length <= 0 ? (
        <MutedMessage className="min-h-[200px]">No Transactions</MutedMessage>
      ) : (
        transactions?.map((transaction) => (
          <div
            key={transaction.id}
            className="flex flex-row justify-between items-center gap-2"
          >
            <div className="flex-grow">{transaction.memo}</div>
            <div className="font-bold">
              {formatter.format(transaction.amount)}
            </div>
            <div className="flex flex-row gap-1">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {}} // TODO: handle edit
              >
                Edit
              </Button>
              <Button
                size="sm"
                className="bg-red-500"
                onClick={() => deleteTransaction(transaction.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export function MutedMessage({
  className,
  children,
  ...props
}: ReactGenericHTMLElementProps) {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center",
        "text-md font-semibold tracking-wide text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
