/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		unoptimized: true,
	},
	basePath: "/demo-taxi-app",
	output: "export",
	distDir: "build",
	reactStrictMode: true,
	assetPrefix: "https://syed1006.github.io/demo-taxi-app/",
};

export default nextConfig;
