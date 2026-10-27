interface SectionTitleProps {
	title: string;
	subtitle?: string;
	eyebrow?: string;
	centered?: boolean;
	as?: "h1" | "h2";
}

export default function SectionTitle({
	title,
	subtitle,
	eyebrow,
	centered = false,
	as: Heading = "h2",
}: SectionTitleProps) {
	return (
		<div className={`mb-10 ${centered ? "text-center" : ""}`}>
			{eyebrow && <p className="rubrica mb-3">{eyebrow}</p>}
			<Heading
				className={`text-ink ${
					Heading === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
				}`}
			>
				{title}
			</Heading>
			{subtitle && (
				<p
					className={`mt-3 max-w-2xl text-lg text-muted ${
						centered ? "mx-auto" : ""
					}`}
				>
					{subtitle}
				</p>
			)}
		</div>
	);
}
