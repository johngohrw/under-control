import { getUserIdFromRequest } from "@/lib/api";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, error } = (await getUserIdFromRequest(req)) ?? {};
  if (error) return error;

  const params = await req.json();
  await prisma.paymentMethod.create({
    data: { userId, ...params },
  });
  return NextResponse.json(
    { message: "Payment method created" },
    { status: 200 }
  );
}

export async function GET(req: Request) {
  const { userId, error } = (await getUserIdFromRequest(req)) ?? {};
  if (error) return error;

  const paymentMethods = await prisma.paymentMethod.findMany({
    where: { userId: userId },
  });
  return NextResponse.json(
    { message: "Payment methods fetched", data: paymentMethods },
    { status: 200 }
  );
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const paymentMethod = await prisma.paymentMethod.delete({
    where: { id: id },
  });
  return NextResponse.json(
    { message: "Payment method deleted successfully", data: paymentMethod },
    { status: 200 }
  );
}
