import { useEffect } from "react";
import { useRouter } from "next/router";
import { analytics } from "@/lib/segment"; // Adjust the path based on your project structure

const Analytics: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Track the initial page load
    analytics.page();

    // Function to handle route changes
    const handleRouteChange = (url: string) => {
      analytics.page();
    };

    // Subscribe to route changes
    router.events.on("routeChangeComplete", handleRouteChange);

    // Clean up the event listener on unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return null;
};

export default Analytics;
