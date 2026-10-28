import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		unoptimized: false,
		formats: ["image/avif", "image/webp"],
	},
	// Painel de notícias (Decap CMS) servido de public/admin
	async rewrites() {
		return [{ source: "/admin", destination: "/admin/index.html" }];
	},
};

export default nextConfig;
