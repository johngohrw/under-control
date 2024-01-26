"use client";

import { Loading } from "@/components/Loading";
import { SoftMessage } from "@/components/SoftMessage";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { cn, formatCurrency, getHumanReadableDate } from "@/lib/utils";
import { ReactGenericHTMLElementProps } from "@/types";
import { Transaction } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

export function ExpensesList({
  className,
  ...props
}: ReactGenericHTMLElementProps) {
  // Get Transactions
  const { data: transactions, isFetched } = useQuery({
    queryKey: ["transactions"],
    queryFn: (): Promise<Transaction[]> =>
      axios.get("/api/transactions").then((response) => response.data.data),
  });

  const groupByDay = (transactions: Transaction[]) => {
    return transactions
      .toSorted(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .reduce((acc: { [key: string]: Transaction[] }, curr) => {
        const date = new Date(curr.date).toDateString();
        if (!(date in acc)) {
          acc[date] = [];
        }
        acc[date].push(curr);
        return acc;
      }, {});
  };

  const dateGroupedTransactions = useMemo(
    () =>
      transactions && transactions.length > 0 ? groupByDay(transactions) : {},
    [transactions]
  );

  return (
    <div className={`flex flex-col gap-4 ${className}`} {...props}>
      {!isFetched || !transactions ? (
        <Loading className="min-h-[200px]" />
      ) : transactions.length <= 0 ? (
        <SoftMessage className="min-h-[200px]">No Transactions</SoftMessage>
      ) : (
        Object.keys(dateGroupedTransactions).map((dateKey) => (
          <ExpensesDateGroup
            dateGroupedTransactions={dateGroupedTransactions}
            dateKey={dateKey}
            key={dateKey}
          />
        ))
      )}
    </div>
  );
}

export function ExpensesDateGroup({
  className,
  children,
  dateKey,
  dateGroupedTransactions,
  ...props
}: {
  dateKey: string;
  dateGroupedTransactions: { [key: string]: Transaction[] };
} & ReactGenericHTMLElementProps) {
  return (
    <div className={cn(``, className)} {...props}>
      <div className="font-medium tracking-wide text-lg text-muted-foreground border-b mb-2">
        {getHumanReadableDate(dateKey)}
      </div>
      <div className="flex flex-col gap-1">
        {dateGroupedTransactions[dateKey].map((transaction) => (
          <ExpenseListItem transaction={transaction} key={transaction.id} />
        ))}
      </div>
    </div>
  );
}

export function ExpenseListItem({
  className,
  children,
  transaction,
  ...props
}: { transaction: Transaction } & ReactGenericHTMLElementProps) {
  const queryClient = useQueryClient();

  // Delete Transaction mutation
  const { mutate: deleteTransaction } = useMutation({
    mutationFn: (transactionId: Transaction["id"]) =>
      axios.delete("/api/transactions", { data: { id: transactionId } }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  return (
    <div
      className={cn(
        "flex flex-row justify-between items-center gap-2",
        className
      )}
      {...props}
    >
      <div className="flex-grow">{transaction.memo}</div>
      <div className="font-bold">{formatCurrency(transaction.amount)}</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="xs" className="ml-2">
            <DotsVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36" align="end" forceMount>
          {/* // TODO: handle edit */}
          <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => deleteTransaction(transaction.id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
