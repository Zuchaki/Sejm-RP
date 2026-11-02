import './src/libs/Env';
import type { NextConfig } from 'next';

// Define the base Next.js configuration
const baseConfig: NextConfig = {
  devIndicators: {
    position: 'bottom-right',
  },
  poweredByHeader: false,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'api.sejm.gov.pl', pathname: '/sejm/**' }],
  },
  reactStrictMode: true,
  reactCompiler: process.env.NODE_ENV === 'production', // Keep the development environment fast
  experimental: {
    // Clean up unused compilation work from memory and disk caches.
    turbopackGc: true,
    // Use the Rust version, instead of the OG Babel one
    turbopackRustReactCompiler: process.env.NODE_ENV === 'production',
  },
  logging: {
    browserToTerminal: process.env.BROWSER_TO_TERMINAL_DISABLED !== 'true',
  },
};

const nextConfig = baseConfig;
export default nextConfig;
