import { getUserIdFromRequest } from "@/lib/api";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, error } = (await getUserIdFromRequest(req)) ?? {};
  if (error) return error;

  const params = await req.json();
  await prisma.transaction.create({
    data: { userId, ...params },
  });
  return NextResponse.json({ message: "Transaction created" }, { status: 200 });
}

export async function GET(req: Request) {
  const { userId, error } = (await getUserIdFromRequest(req)) ?? {};
  if (error) return error;

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
