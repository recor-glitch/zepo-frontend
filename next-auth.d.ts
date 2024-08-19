import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    profile?: {
      iat: number;
      sub: string;
      exp: number;
      jti: string;
      name: string;
      email: string;
      role?: string;
      picture: string;
    };
  }

  interface User extends DefaultUser {
    accessToken?: string;
    refreshToken?: string;
  }
}
