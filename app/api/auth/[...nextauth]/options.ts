import { ICreateUserResponse } from "@/type/app";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import { headers } from "next/headers";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          image: profile.picture,
          name: profile.name,
        };
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      return session;
    },
    
    async signIn({ user }) {
      const res = await axios.post<ICreateUserResponse>(
        `${process.env.BASE_URL}/user`,
        {
          id: user.id,
          email: user.email,
          image: user.image,
          name: user.name,
        }
      );
      if (res.status === 201) {
        return true;
      }
      return false;
    },
  },
};
