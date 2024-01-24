import prisma from "@/lib/prisma";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const user = await prisma.user.findUnique({
    where: { email: email ?? "" },
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

export async function getUserId() {
  const { user: sessionUser } = (await getServerSession(authOptions)) ?? {};
  const userResponse = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/user?email=${sessionUser?.email}`
  );
  const { data: user } = userResponse ?? {};
  return user.id;
}
