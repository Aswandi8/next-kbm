import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw { error: "No Input Found", status: 401 };
          }
          await connectToDatabase();
          const existingUser = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });
          if (!existingUser) {
            throw { error: "User Not Found", status: 404 };
          }
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (!isValidPassword) {
            throw { error: "Invalid Password", status: 404 };
          }
          const user = {
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
            password: existingUser.password,
            photo: existingUser.photo,
            type: existingUser.type,
            role: existingUser.role,
          };
          return user;
        } catch (error) {
          throw {
            error: "Internal Server Error",
            status: 500,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "credentials") {
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
        token.photo = user.photo;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || "", {
        algorithm: "HS256",
      });
      if (session?.user) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.photo = token.photo;
        session.user.access_token = accessToken;
      }
      return session;
    },
  },
};
