import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "BangaloreUrbanCabs - ನಮ್ಮ ಸೇವೆ | Best Taxi Service in Bangalore",
	description:
		"Ride with Comfort, Ride with Care - Your Trusted Bangalore Cab Partner,Let us take the wheel - so you can relax and enjoy the ride.",
	keywords:
		"Bangalore taxi, cab booking, Comfort, care, ride, taxi service, Trusted, relax, enjoy, Koramangala, Whitefield, Electronic City, airport transfer",
	generator: "v0.dev",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
