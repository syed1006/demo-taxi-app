// Airport transfer coverage areas — distances, sedan fares and area-page
// content for KIA runs. Data lives in content/airport-areas.json (editable
// from /admin/).
import type { AirportArea } from "./route-types";
import airportAreasJson from "./content/airport-areas.json";

export const AIRPORT_AREAS = airportAreasJson as unknown as AirportArea[];
