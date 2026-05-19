/** @type {import('next').NextConfig} */
const nextConfig = {
  // eslint වෙනුවට direct typescript/production builds වලදී errors ignore කරන්න මේක දාන්න
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;