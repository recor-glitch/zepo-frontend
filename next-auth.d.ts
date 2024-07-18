import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    proile?: {
      iat: number;
      sub: string;
      exp: number;
      jti: string;
      name: string;
      email: string;
      picture: string;
    };
  }
}
