/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      net: false,
      dns: false,
      tls: false,
      path: false,
      fs: false,
      child_process: false,
    };

    return config;
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig
