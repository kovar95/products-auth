import { cookies } from "next/headers";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const nextCookies = cookies();
        const token = nextCookies.get("token")?.value;

        if (!credentials?.email || !credentials.password || !token) {
          return null;
        }

        const { email, password } = credentials;

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_INSBY_API}/session/customer-sign-in`,
          {
            login: email,
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const user = res.data;

        if (res.status === 200) {
          return {
            email: user.data.customer.email,
            id: user.data.customer.id,
            token: user.data.token,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
