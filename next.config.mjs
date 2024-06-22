/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "urf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferufil",
    });
    return config;
  },
  images: {
    domains: ["utfs.io"],
  },
};

export default nextConfig;
