/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // pageExtensions: ["tsx"], // ルーティングをtsxファイルのみに限定
  pageExtensions: ["page.tsx"], // ルーティングを*.page.tsxファイルのみに限定
  // rootルーティングをhomeディレクトリに変更
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
  trailingSlash: true, // Firebase Hosting用
};

module.exports = nextConfig;
