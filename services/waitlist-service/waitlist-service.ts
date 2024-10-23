import { IWaitlistResponse } from "@/type/app";

export async function AddEmailToWaitlist(
  email: string
): Promise<IWaitlistResponse> {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Something went wrong");
  }
  const response: IWaitlistResponse = await res.json();
  return response;
}
