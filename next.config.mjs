import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.gyazo.com',
      },
      {
        protocol: 'https',
        hostname: 't1.gstatic.com',
      },
    ],
  },
  reactStrictMode: true,
};

export default withMDX(config);
