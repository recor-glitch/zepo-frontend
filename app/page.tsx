import { redirect, RedirectType } from "next/navigation";

export default function Root() {
  return redirect("/home", RedirectType.replace);
}
