/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // 모든 API 경로에 적용
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '', // 동적으로 설정될 값
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, OPTIONS, POST, PUT, PATCH, DELETE',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: (req) => {
          const allowedOrigins = ['https://dev.rchive.kr', 'https://rchive.kr'];
          const origin = req.headers.origin;

          if (allowedOrigins.includes(origin)) {
            return {
              headers: {
                'Access-Control-Allow-Origin': origin,
              },
            };
          } else {
            return {
              headers: {
                'Access-Control-Allow-Origin': 'null',
              },
            };
          }
        },
      },
    ];
  },
};

export default nextConfig;
