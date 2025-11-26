import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false, // Remove widget de desenvolvimento Next.js

  // Ignorar erros durante build (compatibilidade Vercel)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Configuração básica de imagens
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },

  // Configuração experimental básica
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;