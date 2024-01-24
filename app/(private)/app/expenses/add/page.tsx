import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ContentPadding } from "@/components/ContentPadding";
import { getServerSession } from "next-auth";
import { ExpensesForm } from "../ExpensesForm";

export default async function AddExpense() {
  const { user: sessionUser } = (await getServerSession(authOptions)) ?? {};
  if (sessionUser?.email) {
    const user = await prisma?.user.findUnique({
      where: { email: sessionUser.email },
    });

    const categories = await prisma?.category.findMany({
      where: {
        userId: user?.id,
      },
    });

    const paymentMethods = await prisma?.paymentMethod.findMany({
      where: {
        userId: user?.id,
      },
    });

    const currencies = await prisma?.currency.findMany();

    return (
      <ContentPadding>
        <div className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight">Add Transaction</h1>
        </div>
        <ExpensesForm
          currencies={currencies ?? []}
          categories={categories ?? []}
          paymentMethods={paymentMethods ?? []}
          userId={user?.id ?? ""}
        />
      </ContentPadding>
    );
  }
}
