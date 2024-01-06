import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../../lib/prisma";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
