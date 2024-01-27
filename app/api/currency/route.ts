import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const currencies = await prisma.currency.findMany();
  return NextResponse.json(
    { message: "Currencies fetched", data: currencies },
    { status: 200 }
  );
}
