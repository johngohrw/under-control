import { getUserIdFromRequest } from "@/lib/api";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, error } = (await getUserIdFromRequest(req)) ?? {};
  if (error) return error;

  const params = await req.json();
  await prisma.category.create({
    data: { userId, ...params },
  });
  return NextResponse.json({ message: "Category created" }, { status: 200 });
}

export async function GET(req: Request) {
  const { userId, error } = (await getUserIdFromRequest(req)) ?? {};
  if (error) return error;

  const categories = await prisma.category.findMany({
    where: { userId: userId },
  });
  return NextResponse.json(
    { message: "Categories fetched", data: categories },
    { status: 200 }
  );
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const category = await prisma.category.delete({
    where: { id: id },
  });
  return NextResponse.json(
    { message: "Category deleted successfully", data: category },
    { status: 200 }
  );
}
