import { ContentPadding } from "@/components/ContentPadding";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExpensesList } from "./ExpensesList";

export default async function Expenses() {
  return (
    <ContentPadding>
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
      </div>
      <Button asChild>
        <Link href="/app/expenses/add">Add</Link>
      </Button>
      <ExpensesList />
    </ContentPadding>
  );
}
