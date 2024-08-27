/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rchive-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/thumbnails/**',
      },
    ],
  },
};

export default nextConfig;
