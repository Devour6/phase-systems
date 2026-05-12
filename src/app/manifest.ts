import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Phase Systems",
    short_name: "Phase Systems",
    description:
      "Phase Systems is Phase's data center vertical based in Des Moines, Iowa. Cloud compute, colocation, ISP, hardware, and security services.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F0F0E",
    theme_color: "#0F0F0E",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
