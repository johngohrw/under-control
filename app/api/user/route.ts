import { getUserIdFromRequest } from "@/lib/api";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { userId, error } = (await getUserIdFromRequest(request)) ?? {};
  if (error) return error;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json(
      { message: "User not found", data: user },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "User found", data: user },
    { status: 200 }
  );
}
