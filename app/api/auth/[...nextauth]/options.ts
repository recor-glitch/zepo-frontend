import { ICreateUserResponse } from "@/type/app";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          ...profile,
        };
      },
      authorization: {
        params: {
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile, email, user, credentials }) {
      if (account?.provider === "google") {
        // TODO: CONTINUE DATABASE STORAGE
        const res = await axios.post<ICreateUserResponse>("/user", {
          id: user.id,
          email: user.email,
          image: user.image,
          name: user.name,
        });
        if (res.status === 201) {
          return true;
        }
      }
      return false;
    },
  },
};
