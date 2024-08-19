import { ICreateUserResponse, IUserResponse } from "@/type/app";
import axiosInstance from "@/utils/axios-instance/axios-instance";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
    async jwt({ token, user }) {
      try {
        const res = await axios.post<IUserResponse>("/get-by-email", {
          email: user?.email,
        });

        console.log({ res });
        if (res.status === 200) {
          return { ...token, ...user, role: res.data.role };
        }
        return { ...token, ...user, role: "user" };
      } catch (err) {
        return { ...token, ...user, role: "user" };
      }
    },

    async session({ session, token }) {
      return { ...session, profile: { ...token } };
    },

    async signIn({ user }) {
      const res = await axios.post<ICreateUserResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
        {
          id: user.id,
          email: user.email,
          image: user.image,
          name: user.name,
        }
      );

      if (res.status === 201) {
        user.accessToken = res.data.accessToken;
        user.refreshToken = res.data.refreshToken;
      }

      return true;
    },
  },

  session: { strategy: "jwt" },
  secret: "abcd12345",
};
