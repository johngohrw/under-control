import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserId } from "../user/route";

export async function POST(req: Request) {
  const body = await req.json();
  await prisma.transaction.create({
    data: body,
  });
  return NextResponse.json({ message: "Transaction created" }, { status: 200 });
}

export async function GET() {
  const userId = await getUserId();
  const transactions = await prisma.transaction.findMany({
    where: { userId: userId },
  });
  return NextResponse.json(
    { message: "Transactions fetched", data: transactions },
    { status: 200 }
  );
}
