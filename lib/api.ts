import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import axios from "axios";
import { getServerSession } from "next-auth";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";

export async function serverGetUserId() {
  const { user: sessionUser } = (await getServerSession(authOptions)) ?? {};
  const userResponse = await axios.get(
    `${process.env.BASE_URL}/api/user?email=${sessionUser?.email}`
  );
  const { data: user } = userResponse ?? {};
  return user.id;
}

export async function getUserIdFromRequest(req: Request) {
  const res = await req.headers.get("cookie");
  const cookieObj = parseCookie(res || "");
  const sessionToken =
    cookieObj.get("next-auth.session-token") ||
    cookieObj.get("__Secure-next-auth.session-token");

  if (!sessionToken) {
    return {
      error: NextResponse.json(
        { message: "Session token can't be found. Please login again." },
        { status: 403 }
      ),
    };
  }
  const { userId } =
    (await prisma.session.findUnique({
      where: { sessionToken: sessionToken },
    })) ?? {};

  if (!userId) {
    return {
      error: NextResponse.json(
        {
          message:
            "Session can't be found or has already expired, please login again.",
        },
        { status: 403 }
      ),
    };
  }
  return { userId };
}
