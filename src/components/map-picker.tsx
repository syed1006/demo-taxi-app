"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronsUpDown, MapPin, X } from "lucide-react";
import { OlaMapsClient } from "ola-maps-client";
import { Map as MapLibreMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./ui/command";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

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
	const [map, setMap] = useState<MapLibreMap | null>(null);
	const [marker, setMarker] = useState<Marker | null>(null);
	const mapContainer = useRef<HTMLDivElement>(null);
	const [styleURL, setStyleURL] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [open, setOpen] = useState(false);

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

		// newMap.addControl(
		// 	new NavigationControl({ visualizePitch: false, showCompass: true }),
		// 	"bottom-left"
		// );

		newMap.on("load", () => {
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const { longitude, latitude } = position.coords;
						newMap.flyTo({
							center: [longitude, latitude],
							zoom: 14,
						});
						const newMarker = new Marker()
							.setLngLat([longitude, latitude])
							.addTo(newMap);
						setMarker(newMarker);
					},
					() => {
						newMap.flyTo({
							center: [BANGALORE.lng, BANGALORE.lat],
							zoom: 14,
						});
						const newMarker = new Marker()
							.setLngLat([BANGALORE.lng, BANGALORE.lat])
							.addTo(newMap);

						setMarker(newMarker);
					}
				);
			} else {
				newMap.flyTo({
					center: [BANGALORE.lng, BANGALORE.lat],
					zoom: 14,
				});
				const newMarker = new Marker()
					.setLngLat([BANGALORE.lng, BANGALORE.lat])
					.addTo(newMap);
				setMarker(newMarker);
			}
		});

		setMap(newMap);

		return () => {
			newMap.remove();
		};
	}, [styleURL, transformRequest, mapContainer]);

	const handleLocationSelect = (place: any) => {
		setOpen(false);
		setSearchQuery(place.description);
		onLocationSelect(
			place.description,
			place.geometry.location.lat,
			place.geometry.location.lng
		);
		if (map) {
			map.flyTo({
				center: [
					place.geometry.location.lng,
					place.geometry.location.lat,
				],
				zoom: 14,
			});

			if (marker) {
				marker.remove();
			}
			const newMarker = new Marker()
				.setLngLat([
					place.geometry.location.lng,
					place.geometry.location.lat,
				])
				.addTo(map);
			setMarker(newMarker);
		}
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
				});
				setAutocompleteResults(result.predictions || []);
			} catch (error) {
				console.error("Error during autocomplete:", error);
			}
		}, 300),
		[]
	);

	return (
		<div
			className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
			onWheel={(e) => e.stopPropagation()} // Prevent wheel events from bubbling
			onScroll={(e) => e.stopPropagation()} // Prevent wheel events from bubbling
			onTouchMove={(e) => e.stopPropagation()}
		>
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
					<div className="space-y-2">
						<label className="text-sm font-medium text-muted-foreground">
							Search and select location:
						</label>
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									aria-expanded={open}
									className="w-full h-10 px-3 py-2 text-sm justify-between font-normal bg-transparent border border-input hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
								>
									<span
										className={cn(
											"truncate",
											!searchQuery &&
												"text-muted-foreground"
										)}
									>
										{searchQuery
											? searchQuery
											: "Search locations..."}
									</span>
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className="w-[--radix-popover-trigger-width] p-0"
								align="start"
							>
								<Command>
									<CommandInput
										placeholder="Search locations..."
										className="h-9"
										value={searchQuery}
										onValueChange={handleInputChange}
									/>
									<CommandList className="max-h-[200px]">
										<CommandEmpty>
											No location found.
										</CommandEmpty>
										<CommandGroup>
											{autocompleteResults.map(
												(location) => (
													<CommandItem
														key={
															location.description
														}
														value={
															location.description
														}
														onSelect={() =>
															handleLocationSelect(
																location
															)
														}
														className="cursor-pointer"
													>
														<div className="flex items-center space-x-2 w-full">
															<div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
															<div className="flex-1 min-w-0">
																<div
																	className="font-medium truncate"
																	title={
																		location.description
																	}
																>
																	{
																		location.description
																	}
																</div>
															</div>
															<Check
																className={cn(
																	"ml-auto h-4 w-4 flex-shrink-0",
																	searchQuery ===
																		location.description
																		? "opacity-100"
																		: "opacity-0"
																)}
															/>
														</div>
													</CommandItem>
												)
											)}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
					</div>
					{/* Map Placeholder */}
					<div
						ref={mapContainer}
						className="h-64 rounded-lg border-2 border-dashed border-border"
					></div>
					<div className="flex gap-3 pt-2">
						<Button
							variant="outline"
							onClick={onClose}
							className="flex-1 bg-transparent"
						>
							Close
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
