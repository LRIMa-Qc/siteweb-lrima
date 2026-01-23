import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker and Vercel deployment
  output: 'standalone',
  webpack: (config, { isServer }) => {
    config.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Exclude paraglide output and message files from webpack watching
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/node_modules', '**/src/paraglide/**', '**/messages/**', '**/project.inlang/**'],
    }

    return config
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
