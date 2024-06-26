/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
    domains: ["firebasestorage.googleapis.com"],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
