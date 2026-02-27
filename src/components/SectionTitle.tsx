interface SectionTitleProps {
	title: string;
	subtitle?: string;
	centered?: boolean;
}

export default function SectionTitle({
	title,
	subtitle,
	centered = true,
}: SectionTitleProps) {
	return (
		<div className={`mb-12 ${centered ? "text-center" : ""}`}>
			<h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
				<span className="ornament">{title}</span>
			</h2>
			<div className="section-divider" />
			{subtitle && (
				<p className="text-gray mt-4 max-w-2xl mx-auto">{subtitle}</p>
			)}
		</div>
	);
}
