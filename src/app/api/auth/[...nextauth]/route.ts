import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogin";
import { userRegister } from "@/libs/userRegister";

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
        CredentialsProvider({
          name: "Register",
          credentials: {
            email: { label: "Email", type: "email", placeholder: "email" },
            password: { label: "Password", type: "password" ,placeholder: "password"},
            name: { label: "Name", type: "name", placeholder: "Name" },
            tel: { label: "Telephone", type: "tel", placeholder: "Telephone" },
            role: { label: "Role", type: "role", placeholder: "Role", disabled: true,value:"user" },
          },
          async authorize(credentials, req) {
            if (!credentials) return null;
            try {
              // Basic input validation example
              if (!credentials.email || !credentials.password || !credentials.name || !credentials.tel) {
                throw new Error("Missing required fields.");
              }
          
              const user = await userRegister(
                credentials.name,
                credentials.tel,
                credentials.email,
                credentials.password,
                credentials.role
              );
              if (user) {
                return user;
              } else {
                return null; // Or throw a more specific error
              }
            } catch (error: any) {
              console.error("Registration failed:", error);
              // Return a custom error message to the client
              return null;
            }
          },
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

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};