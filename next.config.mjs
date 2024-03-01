/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn2.vdicheck.com",
        port: "",
      },

    ],
  },
};

export default nextConfig;
