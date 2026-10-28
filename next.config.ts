import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		unoptimized: false,
		formats: ["image/avif", "image/webp"],
	},
	experimental: {
		// Fotos das notícias chegam já reduzidas pelo navegador; o limite cobre a sobra
		serverActions: { bodySizeLimit: "4mb" },
	},
};

export default nextConfig;
