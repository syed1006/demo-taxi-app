import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ImageCarousel({
	images,
	alt,
	color,
	icon: IconComponent,
}: {
	images: string[];
	alt: string;
	color: string;
	icon: React.ComponentType<any>;
}) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [loadedImages, setLoadedImages] = useState<boolean[]>(
		new Array(images.length).fill(false)
	);

	const nextImage = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCurrentImageIndex((prev) => (prev + 1) % images.length);
	};

	const prevImage = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCurrentImageIndex(
			(prev) => (prev - 1 + images.length) % images.length
		);
	};

	const handleImageLoad = (index: number) => {
		setLoadedImages((prev) => {
			const newState = [...prev];
			newState[index] = true;
			return newState;
		});
	};

	const handleImageError = (index: number) => {
		setLoadedImages((prev) => {
			const newState = [...prev];
			newState[index] = false;
			return newState;
		});
	};

	return (
		<div className="relative h-48 md:h-64 md:w-1/3 overflow-hidden group">
			{/* Fallback gradient background - always visible */}
			<div className={`absolute inset-0 bg-gradient-to-br ${color}`} />

			{/* Vehicle icon overlay for fallback */}
			<div className="absolute inset-0 flex items-center justify-center z-10">
				<div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
					<IconComponent className="h-8 w-8 text-white" />
				</div>
			</div>

			{/* Images */}
			{images.map((image, index) => (
				<img
					key={index}
					src={image || "/placeholder.svg"}
					alt={`${alt} - Image ${index + 1}`}
					className={`absolute inset-0 w-full h-full p2 object-contain object-center group-hover:transition-all duration-500 z-20 ${
						index === currentImageIndex
							? "opacity-100"
							: "opacity-0"
					}`}
					loading="lazy"
					onLoad={() => handleImageLoad(index)}
					onError={() => handleImageError(index)}
					style={{
						opacity:
							index === currentImageIndex && loadedImages[index]
								? 1
								: 0,
						transition: "opacity 0.5s ease-in-out",
					}}
				/>
			))}

			{/* Navigation Arrows - only show if more than 1 image */}
			{images.length > 1 && (
				<>
					<Button
						variant="ghost"
						size="icon"
						className="absolute left-2 top-1/2 z-30 bg-black/30 hover:bg-black/50 text-white border-none rounded-full w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						onClick={prevImage}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="absolute right-2 top-1/2 transform z-30 bg-black/30 hover:bg-black/50 text-white border-none rounded-full w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						onClick={nextImage}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</>
			)}

			{/* Image Indicators - only show if more than 1 image */}
			{images.length > 1 && (
				<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-30 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					{images.map((_, index) => (
						<button
							key={index}
							onClick={(e) => {
								e.stopPropagation();
								setCurrentImageIndex(index);
							}}
							className={`min-w-2 min-h-2 w-2 h-2 rounded-full transition-all duration-300 ${
								index === currentImageIndex
									? "bg-white scale-125"
									: "bg-white/50 hover:bg-white/75"
							}`}
						/>
					))}
				</div>
			)}

			{/* Overlay gradient */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-25" />
		</div>
	);
}
