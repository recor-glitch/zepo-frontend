import { ICreateUserResponse } from "@/type/app";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import toast from "react-hot-toast";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
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
    async session({ session, token }) {
      return { ...session, proile: token };
    },

    async signIn({ user }) {
      try {
        const emailRes = await axios.post<ICreateUserResponse>(
          `${process.env.BASE_URL}/get-by-email`,
          {
            email: user.email,
          }
        );
        if (emailRes.status === 200) {
          return true;
        } else {
          const res = await axios.post<ICreateUserResponse>(
            `${process.env.BASE_URL}/user`,
            {
              id: user.id,
              email: user.email,
              image: user.image,
              name: user.name,
            }
          );
          return true;
        }
      } catch (error) {
        toast.error("Something went wrong");
        return true;
      }
    },
  },

  session: { strategy: "jwt" },
  secret: "abcd12345",
};
