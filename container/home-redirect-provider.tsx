import { nextAuthOptions } from "@/app/auth/auth";
import { getServerSession } from "next-auth";
import { redirect, RedirectType } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function HomeRedirectProvider({
  children,
}: PropsWithChildren) {
  const session = await getServerSession(nextAuthOptions);

  if (session && session.profile?.role !== "user") {
    return redirect("/dashboard", RedirectType.replace);
  }

  return <>{children}</>;
}
