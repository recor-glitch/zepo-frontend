"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Root() {
  const { data: session, status } = useSession();
  console.log({ session });

  useEffect(() => {
    // if (session && session.profile.role != "user") {
    // }
  }, [status, session]);
  return <></>;
}
