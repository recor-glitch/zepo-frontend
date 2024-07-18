import { ICreateUserResponse } from "@/type/app";
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
    async session({ session, token }) {
      return { ...session, proile: token };
    },

    async signIn({ user }) {
      try {
        console.log("process.env.BASE_URL", process.env.BASE_URL);

        const res = await axios.post<ICreateUserResponse>(
          `${process.env.BASE_URL}/user`,
          {
            id: user.id,
            email: user.email,
            image: user.image,
            name: user.name,
          }
        );

        console.log({ res });
        return true;
      } catch (error) {
        console.log("There was an error", error);
        return true;
      }

      //   if (res.status === 201) {
      //     return true;
      //   }
      //   return false;
    },
  },

  session: { strategy: "jwt" },
  secret: "abcd12345",
};
