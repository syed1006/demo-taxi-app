"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Search, X } from "lucide-react";
import { OlaMapsClient } from "ola-maps-client";
import { Map as MapLibreMap, NavigationControl, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapPickerProps {
	onClose: () => void;
	onLocationSelect: (
		location: string,
		longitude: number,
		latitude: number
	) => void;
	title: string;
}

function debounce<F extends (...args: any[]) => void>(func: F, wait: number) {
	let timeout: ReturnType<typeof setTimeout>;

	// explicitly declare `this` and args
	return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}

if (!process.env.NEXT_PUBLIC_API_KEY) {
	throw new Error("Missing NEXT_PUBLIC_API_KEY in environment variables");
}

const STYLE_NAME = "default-light-standard";
const API_KEY: string = process.env.NEXT_PUBLIC_API_KEY;
const BANGALORE = { lat: 12.9629, lng: 77.5775 };

export function MapPicker({
	onClose,
	onLocationSelect,
	title,
}: MapPickerProps) {
	const [map, setMap] = useState<any>(null);
	const mapContainer = useRef<HTMLDivElement>(null);
	const [styleURL, setStyleURL] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	const [autocompleteResults, setAutocompleteResults] = useState<any[]>([]);

	useEffect(() => {
		const fetchStyleURL = async () => {
			try {
				const styleURL = `https://api.olamaps.io/tiles/vector/v1/styles/${STYLE_NAME}/style.json`;
				setStyleURL(styleURL);
			} catch (error) {
				console.error("Error fetching style URL:", error);
			}
		};

		fetchStyleURL();
	}, []);

	const transformRequest = useCallback((url: string, resourceType: any) => {
		url = url.replace("app.olamaps.io", "api.olamaps.io");
		const separator = url.includes("?") ? "&" : "?";
		return {
			url: `${url}${separator}api_key=${API_KEY}`,
			resourceType,
		};
	}, []);

	useEffect(() => {
		console.log(map, styleURL, mapContainer.current);

		if (map || !styleURL || !mapContainer.current) return;

		const newMap = new MapLibreMap({
			container: mapContainer.current,
			style: styleURL,
			center: [0, 0],
			zoom: 2,
			transformRequest,
		});

		newMap.addControl(
			new NavigationControl({ visualizePitch: false, showCompass: true }),
			"bottom-left"
		);

		newMap.on("load", () => {
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const { longitude, latitude } = position.coords;
						newMap.flyTo({
							center: [longitude, latitude],
							zoom: 14,
						});
						new Marker()
							.setLngLat([longitude, latitude])
							.addTo(newMap);
					},
					() => {
						newMap.flyTo({
							center: [BANGALORE.lng, BANGALORE.lat],
							zoom: 14,
						});
						new Marker()
							.setLngLat([BANGALORE.lng, BANGALORE.lat])
							.addTo(newMap);
					}
				);
			} else {
				newMap.flyTo({
					center: [BANGALORE.lng, BANGALORE.lat],
					zoom: 14,
				});
				new Marker()
					.setLngLat([BANGALORE.lng, BANGALORE.lat])
					.addTo(newMap);
			}
		});

		setMap(newMap);

		return () => {
			newMap.remove();
		};
	}, [styleURL, transformRequest, mapContainer]);

	const handleLocationSelect = (place: any) => {
		console.log(place.geometry.location.lng, place.geometry.location.lat);
		onLocationSelect(
			place.description,
			place.geometry.location.lng,
			place.geometry.location.lat
		);
		onClose();
	};

	const handleInputChange = (query: string) => {
		setSearchQuery(query);
		handleAutocomplete(query);
	};

	const handleAutocomplete = useCallback(
		debounce(async (query) => {
			const client = new OlaMapsClient(API_KEY);
			try {
				const bangaloreLocation = `${BANGALORE.lat},${BANGALORE.lng}`;
				const result = await client.places.autocomplete({
					input: query,
					location: bangaloreLocation,
					radius: 200000,
					strictbounds: true,
				});
				setAutocompleteResults(result.predictions || []);
			} catch (error) {
				console.error("Error during autocomplete:", error);
			}
		}, 300),
		[]
	);

	return (
		<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
			<Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
					<CardTitle className="flex items-center gap-2">
						<MapPin className="h-5 w-5 text-orange-500" />
						{title}
					</CardTitle>
					<Button variant="ghost" size="icon" onClick={onClose}>
						<X className="h-4 w-4" />
					</Button>
				</CardHeader>

				<CardContent className="space-y-4">
					{/* Search Input */}
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search for a location..."
							value={searchQuery}
							onChange={(e) => handleInputChange(e.target.value)}
							className="pl-10"
						/>
					</div>

					{/* Map Placeholder */}
					<div
						ref={mapContainer}
						className="h-64 rounded-lg border-2 border-dashed border-border"
					></div>

					{/* Location List */}
					<div className="max-h-48 overflow-y-auto space-y-2">
						<h4 className="font-semibold text-sm text-muted-foreground mb-2">
							Popular Locations
						</h4>
						{autocompleteResults.map((place, index) => (
							<Button
								key={index}
								variant="ghost"
								className="w-full justify-start h-auto p-3 hover:bg-orange-50 dark:hover:bg-orange-950"
								onClick={() => handleLocationSelect(place)}
							>
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-orange-500 rounded-full" />
									<div className="text-left">
										<div className="font-medium">
											{place.description}
										</div>
									</div>
								</div>
							</Button>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
