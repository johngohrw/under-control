import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const res = await prisma.user.findUnique({
    where: { email: email ?? "" },
  });

  return NextResponse.json(
    { message: "User found", data: res },
    { status: 200 }
  );
}

export async function getUserId() {
  const { user: sessionUser } = (await getServerSession(authOptions)) ?? {};
  const userResponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user?email=${sessionUser?.email}`,
    {
      method: "GET",
    }
  );
  const { data: user } = await userResponse.json();
  return user.id;
}
