import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // La API de Platzi Fake Store acepta cualquier URL de imagen de usuarios,
    // así que permitimos cualquier hostname como comodín.
    // En producción con datos controlados, especificar dominios concretos.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
