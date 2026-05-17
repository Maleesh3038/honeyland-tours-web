/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // මේකෙන් Next.js බිල්ඩ් එක වෙලාවේ ESLint Errors තිබ්බත් ඒව ඉග්නෝර් කරලා ලයිව් යවන්න ඉඩ දෙනවා
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;