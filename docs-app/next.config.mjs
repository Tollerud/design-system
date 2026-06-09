import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: '../_site',
  outputFileTracingRoot: path.join(root, '..'),
  trailingSlash: true,
  images: { unoptimized: true },
  transpilePackages: ['@tollerud/ui'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@tollerud/ui': path.join(root, '../dist/index.js'),
      '@/lib/utils': path.join(root, '../lib/utils.ts'),
      '@paper-design/shaders-react': path.join(root, 'node_modules/@paper-design/shaders-react'),
    }
    return config
  },
}

export default nextConfig
