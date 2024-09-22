import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dice",
    short_name: "Dice",
    description: "Dice Application",
    start_url: ".",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/favicon.ico",
        type: "image/x-icon",
        sizes: "256x256",
      },
    ],
  };
}
