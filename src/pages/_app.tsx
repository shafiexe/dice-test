import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { AppProps } from "next/app";
import Analytics from "@components/analytics";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Analytics />
      <Component {...pageProps} />
    </UserProvider>
  );
}
