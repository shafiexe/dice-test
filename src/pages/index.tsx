"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import * as Paths from "@router/paths";

export default function Page() {
  const route = useRouter();
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user) {
    route.push(Paths.authSignIn);
  } else {
    route.push(Paths.home);
  }

  return <div>Loading ...</div>;
}
