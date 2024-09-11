import { ICreateUserResponse, IUserResponse } from "@/type/app";
import { TokenStorage } from "@/utils/access-token-storage/access-token-storage";
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
        const res = await axiosInstance.post<IUserResponse>("/get-by-email", {
          email: token?.email,
        });

        if (res.status === 200) {
          return { ...token, ...user, role: res.data.role };
        }
        return { ...token, ...user, role: "user" };
      } catch (err) {
        return { ...token, ...user, role: "user" };
      }
    },

    async session({ session, token }) {
      console.log("session ", { session, token });

      const accessToken = token?.accessToken
        ? token?.accessToken
        : session.profile?.accessToken;
      const refreshToken = token?.refreshToken
        ? token?.refreshToken
        : session.profile?.refreshToken;

      const res = await axiosInstance.post<ICreateUserResponse>("/invalidate", {
        accessToken: accessToken,
        refreshToken: refreshToken,
      });

      if (res.status === 201) {
        TokenStorage.setAccessToken(res.data.accessToken || "");
        TokenStorage.setRefreshToken(res.data.refreshToken || "");

        return {
          ...session,
          profile: {
            ...token,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          },
        };
      }

      return { ...session, profile: token };
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

      console.log("My Signin", { res });

      if (res.status >= 200) {
        user.accessToken = res.data.accessToken;
        user.refreshToken = res.data.refreshToken;

        TokenStorage.setAccessToken(res.data.accessToken);
        TokenStorage.setRefreshToken(res.data.refreshToken);
      }

      return true;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.GOOGLE_SIGNIN_SECRET || "abcdefghijklmnopqrstuv",
};
