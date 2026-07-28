import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  /* Lets React run a route navigation as a view transition. The dissolve
     itself is declared in globals.css; this only opens the door. */
  experimental: {
    viewTransition: true,
  },
  images: {
    qualities: [75],
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },
};

export default nextConfig;
