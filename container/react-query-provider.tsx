"use client";

import { QueryClient } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

export default function ReactQueryProvider({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
