// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogin";
import userRegister from "@/libs/userRegister";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        email: { label: "Email", type: "Email", placeholder: "email" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        try {
          const user = await userLogIn(credentials.email, credentials.password);
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
    CredentialsProvider({
      name: "Register",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "name" },
        tel: { label: "Tel", type: "text", placeholder: "tel" },
        email: { label: "Email", type: "Email", placeholder: "email" },
        password: { label: "Password", type: "password", placeholder: "password" },
        role: { label: "Role", type: "text", placeholder: "role" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        try {
          const user = await userRegister(
            credentials.name,
            credentials.tel,
            credentials.email,
            credentials.password,
            credentials.role
          );
          if (user) {
            // Registration successful, but don't log in automatically
            return null; // Changed this line!
          } else {
            return null;
          }
        } catch (error) {
          console.error("Registration error:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.tel = user.tel;
        token.role = user.role;
        token.token = "your token"; // you can generate a token here
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user._id = token._id;
        session.user.tel = token.tel;
        session.user.role = token.role;
        session.user.token = token.token;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
