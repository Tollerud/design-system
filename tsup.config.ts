import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['components/index.ts'],
  format: ['esm', 'cjs'],
  outExtension({ format }) {
    return { js: format === 'cjs' ? '.cjs' : '.js' }
  },
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  tsconfig: 'tsconfig.build.json',
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'clsx',
    'tailwind-merge',
    '@radix-ui/react-dialog',
    '@radix-ui/react-dropdown-menu',
    '@radix-ui/react-progress',
    '@radix-ui/react-tabs',
    '@radix-ui/react-tooltip',
    'class-variance-authority',
    'framer-motion',
    'lucide-react',
    'sonner',
    '@paper-design/shaders-react',
  ],
  esbuildOptions(options) {
    options.alias = {
      '@/lib/utils': './lib/utils.ts',
    }
  },
})
