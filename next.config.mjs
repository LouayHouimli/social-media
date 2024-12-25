/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  output: "standalone",
  optimizeFonts: false,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "@vercel/turbopack-next": false,
    };
    return config;
  },
};

export default nextConfig;
