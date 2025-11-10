import { withPayload } from "@payloadcms/next/withPayload";
import { paraglideWebpackPlugin } from "@inlang/paraglide-js";

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Your Next.js config here
	webpack: (config) => {
		config.resolve.extensionAlias = {
			".cjs": [".cts", ".cjs"],
			".js": [".ts", ".tsx", ".js", ".jsx"],
			".mjs": [".mts", ".mjs"],
		};

		config.plugins.push(
			paraglideWebpackPlugin({
				outdir: "./src/paraglide",
				project: "./project.inlang",
				strategy: ["url", "baseLocale", "cookie"],
				urlPatterns: [
					{
						pattern: "https://:domain(.*)/:path*",
						localized: [
							["en", "https://:domain(.*)/en/:path*"],
							["fr", "https://:domain(.*)/fr/:path*"],
						],
					},
				],
			}),
		);

		return config;
	},
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
