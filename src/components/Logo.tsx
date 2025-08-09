import React from "react";

interface LogoProps {
	size?: number | string;
	className?: string;
	alt?: string;
	src?: string;
}

const Logo: React.FC<LogoProps> = ({
	size = 40,
	className = "",
	alt = "Logo",
	src = "/buc-logo.png",
}) => {
	const logoStyle = {
		width: typeof size === "number" ? `${size}px` : size,
		height: typeof size === "number" ? `${size}px` : size,
	};

	return (
		<img
			src={src}
			alt={alt}
			style={logoStyle}
			className={`logo ${className}`}
		/>
	);
};

export default Logo;
