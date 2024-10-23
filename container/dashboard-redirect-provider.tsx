import { nextAuthOptions } from "@/app/auth/auth";
import { getServerSession } from "next-auth";
import { redirect, RedirectType } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function DashboardRedirectProvider({
  children,
}: PropsWithChildren) {
  const session = await getServerSession(nextAuthOptions);

  if (session && session.profile?.role === "user") {
    return redirect("/home", RedirectType.replace);
  }

  if (!session) {
    return redirect("/home", RedirectType.replace);
  }

  return <div className="flex w-full h-full">{children}</div>;
}
