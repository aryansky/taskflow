import { getServerSession, NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./prisma";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email!,
        },
      });
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name,
            imageUrl: user.image,
          },
        });
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: {
            id: true,
            email: true,
            imageUrl: true,
          },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.email = dbUser.email;
          token.imageUrl = dbUser.imageUrl;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.imageUrl = token.imageUrl as string;
        session.user.name = token.name as string;
        session.user.image = token.imageUrl as string;
      }
      return session;
    },
  },
} satisfies NextAuthOptions;

export const auth = () => getServerSession(authOptions);
