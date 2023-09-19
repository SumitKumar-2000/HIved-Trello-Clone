import { db } from "./db";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";

// auth providers import
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "mail@example.com",
        },
        password: { 
          label: "Password", 
          type: "password",
          placeholder: "Enter your password" 
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // checking if user already exist or not
        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!existingUser || !existingUser.password) {
          return null;
        }

        // const checking password
        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: existingUser.id,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt ({token, user, account, profile}){
      console.log("jwt token: ",token);
      console.log("jwt account: ",account);
      console.log("jwt user: ",user);
      console.log("jwt profile: ",profile);
      if(user){
        if(account.provider === "google"){
          const existingUser = await db.user.findUnique({
            where: {email: profile.email}
          })
          return {
            ...token,
            id: existingUser.id,
            uid: user.id,
            firstName: profile.given_name,
            lastName: profile.family_name,
          }
        } 
        else if(account.provider === "credentials"){
          return {
            ...token,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
          }
        }
      }
      return token
    },
    async session({session, token}){
      console.log("session token: ",token);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          firstName: token.firstName,
          lastName: token.lastName,
        }
      }
    },
    async signIn({user, account, profile, email, credentials }){ 
      if(account.provider === "google"){
        try {
          const userExist = await db.user.findUnique({
            where: {email : profile.email}
          })

          if(!userExist){
            await db.user.create({
              data: {
                email: profile.email,
                firstName: profile.given_name,
                lastName: profile.family_name,
                image: profile.picture,
              }
            })
          }

          return true;

        } catch (error) {
          console.log("next-auth user sign in error: ",error);
        }
      }

      return true;
    },
  },
  pages: {
    signIn: "/signin",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
};
