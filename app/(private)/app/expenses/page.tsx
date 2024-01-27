import { ContentPadding } from "@/components/ContentPadding";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExpensesList } from "./ExpensesList";

export default async function Expenses() {
  return (
    <ContentPadding>
      <div className="flex flex-row mb-4 ">
        <h1 className="flex-grow text-3xl font-bold tracking-tight">
          Expenses
        </h1>
        <Button asChild>
          <Link href="/app/expenses/add">New Expense</Link>
        </Button>
      </div>

      <ExpensesList />
    </ContentPadding>
  );
}
