"use client";

import { ContentPadding } from "@/components/ContentPadding";
import { ExpensesForm } from "../ExpensesForm";

export default function AddExpense() {
  return (
    <ContentPadding>
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Add Transaction</h1>
      </div>
      <ExpensesForm />
    </ContentPadding>
  );
}
