import GoogleProvider from "next-auth/providers/google";
import prisma from "../db/db";
import { Account, AuthOptions, NextAuthOptions, Profile, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

      async profile(profile, token: any) {
        console.log("profile", profile);
        console.log("tokens", token);

        const data = {
          fname: profile.given_name,
          lname: profile.family_name,
          email: profile.email,
          provider: "GOOGLE",
          externalId: profile.sub,
          image: profile.picture,
        };

        try {
          // Check if user already exists
          let user = await prisma.user.findUnique({
            where: { email: data.email },
          });

          if (!user) {
            user = await prisma.user.create({
              data,
            });
          }

          return {
            ...data,
            name: data.fname,
            id: String(user.id),
            role: user.role || "customer",
          };
        } catch (error) {
          console.log(error);
          return {
            id: "", // Return empty ID in case of error
          };
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({
      token,
      account,
      profile,
    }: {
      token: JWT;
      account?: Account | null;
      profile?: Profile;
    }) {
      let user = await prisma.user.findUnique({
        where: { email: token?.email as string },
      });

      if (account && profile && user) {
        token.email = profile.email as string;
        token.id = account.access_token;
        token.role = user?.role || "customer";
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: token?.email ?? "",
          },
        });
        if (user && token?.id) {
          session.user.id = token.id,
          session.user.role = token.role || "customer"
        }
      
      } catch (error) {
        if (error instanceof PrismaClientInitializationError) {
          throw new Error("Internal server error");
        }
        console.log(error);
        throw error;
      }
      return session;
    },
    async signIn() {
      return true;
    },
  },
} satisfies NextAuthOptions