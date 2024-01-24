import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserId } from "../user/route";

export async function POST(req: Request) {
  const params = await req.json();
  await prisma.transaction.create({
    data: params,
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

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const transactions = await prisma.transaction.delete({
    where: { id: id },
  });
  return NextResponse.json(
    { message: "Deleted successfully", data: transactions },
    { status: 200 }
  );
}
