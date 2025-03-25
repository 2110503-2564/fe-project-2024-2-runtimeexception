import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogin";
import { AuthOptions } from "next-auth";

export const authOptions:AuthOptions = {
  providers:[

      CredentialsProvider({

          name: "Login",

          credentials: {
            email: { label: "Email", type: "email", placeholder: "email" },
            password: { label: "Password", type: "password" ,placeholder: "password"}
          },
          async authorize(credentials, req) {
            if (!credentials) return null;
            const user = await userLogin(credentials.email,credentials.password)
            if (user) {
            
              return user
            } else {
         
              return null
      
              
            }
          }
      }),
      
  ],
  session: { strategy: "jwt"},
  callbacks: {
      async jwt({token, user}){
          return {...token,...user}
      },
      async session({session, token, user}){
          session.user = token as any;
          return session;
      }
  }
}