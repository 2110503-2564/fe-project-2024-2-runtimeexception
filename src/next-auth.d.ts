// src/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: {
      _id: string;
      name: string;
      tel: string;
      email: string;
      role: string;
      token: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    _id: string;
    tel: string;
    role: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `JWT` callback and `getToken`, when using JWT sessions */
  interface JWT {
    _id: string;
    tel: string;
    role: string;
    token: string;
  }
}
