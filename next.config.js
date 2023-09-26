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
      domains: ["firebasestorage.googleapis.com", "via.placeholder.com"],
   },
};

module.exports = nextConfig;
