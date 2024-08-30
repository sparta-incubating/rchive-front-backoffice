/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/backoffice',
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
