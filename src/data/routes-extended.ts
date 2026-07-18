// Extended outstation corridors from Bangalore (2–3 day and long-haul destinations); sedan fares are authoritative.
import type { Route } from "./route-types";

import goaImg from "../assets/destinations/goa.webp";
import tirupatiImg from "../assets/destinations/tirupati.webp";
import pondicherryImg from "../assets/destinations/pondicherry.webp";
import kodaikanalImg from "../assets/destinations/kodaikanal.webp";
import gokarnaImg from "../assets/destinations/gokarna.webp";
import hampiImg from "../assets/destinations/hampi.webp";
import udupiImg from "../assets/destinations/udupi.webp";
import sakleshpurImg from "../assets/destinations/sakleshpur.webp";
import velloreImg from "../assets/destinations/vellore.webp";
import salemImg from "../assets/destinations/salem.webp";

export const ROUTES_EXTENDED: Route[] = [
	{
		slug: "tirupati",
		image: tirupatiImg,
		name: "Tirupati",
		category: "spiritual",
		distanceKm: 250,
		durationHrs: 5.5,
		days: 1,
		fares: { sedan: { oneWay: 4999, roundTrip: 6499 } },
		summary:
			"Day-trip darshan run to Tirumala — 250 km via Kolar and Chittoor with doorstep pickup as early as 3 AM.",
		intro: [
			"The Bangalore to Tirupati taxi is the most requested pilgrimage corridor we run. The 250 km drive takes about 5.5 hours on the main alignment — NH-75 through Kolar and on to Chittoor, which has the best food stops and fuel bunks — while a quieter alternative cuts across via Palamaner if you want to skip Kolar-side traffic. Most families leave Bangalore between 3 and 4 AM so they are at the base of the Alipiri ghat road in time for a morning darshan slot at Tirumala.",
			"A dedicated cab makes far more sense than a bus or train here because darshan queues do not wait. Your driver drops you at Tirumala or the Srivari footpath, waits through your darshan, and is ready when you come out — no scrambling for APSRTC ghat buses with tired parents and children. On the way back you can cover Tiruchanur, Kapila Theertham and Chandragiri Fort at your own pace.",
			"We operate 24/7 with verified drivers who know the ghat road well, and booking is a single WhatsApp message with no advance payment. Fuel and driver bata are included in the fare; tolls, parking and the Andhra Pradesh inter-state permit are charged extra at actuals.",
		],
		sights: [
			{
				name: "Tirumala Venkateswara Temple",
				blurb: "The hilltop shrine of Lord Balaji, among the most visited temples on earth — the reason this road exists.",
			},
			{
				name: "Sri Padmavathi Ammavari Temple, Tiruchanur",
				blurb: "Temple of Goddess Padmavathi, 5 km from Tirupati; custom holds the pilgrimage incomplete without this darshan.",
			},
			{
				name: "Kapila Theertham",
				blurb: "Shiva temple set against a rock face at the foot of the Tirumala hills, with a waterfall that roars after rains.",
			},
			{
				name: "Sri Govindaraja Swamy Temple",
				blurb: "Large Vaishnavite temple in the heart of Tirupati town with a towering gopuram, ideal while waiting for your slot.",
			},
			{
				name: "Chandragiri Fort",
				blurb: "11th-century fort and Vijayanagara-era palaces 15 km away, with a sound-and-light show in the evenings.",
			},
			{
				name: "Talakona Waterfalls",
				blurb: "Andhra's tallest waterfall inside Sri Venkateswara National Park, a worthwhile forest detour of about 50 km.",
			},
		],
		travelTips: [
			"Book your darshan slot on the official TTD portal well in advance — weekend and festival slots vanish weeks ahead.",
			"Leave Bangalore by 4 AM; the Tirumala ghat road and darshan queues both get heavier as the morning progresses.",
			"Carry original photo ID for every pilgrim — TTD checks them against darshan bookings.",
			"Tolls, parking and the AP inter-state permit are extra at actuals; everything else, including driver bata, is in the fare.",
			"Avoid Vaikunta Ekadasi and Brahmotsavam weekends unless you have confirmed slots — the town overflows.",
		],
		faqs: [
			{
				question: "Do you arrange Tirumala darshan tickets?",
				answer: "No — darshan slots, seva tickets and accommodation must be booked directly on the official TTD portal. We handle the road trip: doorstep pickup, the ghat drive and waiting through your darshan.",
			},
			{
				question: "Is a one-day Bangalore to Tirupati trip realistic?",
				answer: "Yes, it is the standard plan. Leave by 3:30–4 AM, complete darshan by early afternoon, cover Tiruchanur on the return and be home by 10–11 PM. A pre-booked darshan slot is what makes or breaks the day.",
			},
			{
				question: "Will the driver wait while we are at Tirumala?",
				answer: "Yes. The driver either takes you up the ghat road and parks at Tirumala, or waits at Alipiri if you take the footpath. Waiting time within the trip is included; only parking charges are extra.",
			},
			{
				question: "What extra charges apply for this route?",
				answer: "The Andhra Pradesh inter-state permit, tolls and parking are billed at actuals over the quoted fare. Fuel and driver bata are already included, and there is no advance payment to book.",
			},
			{
				question: "Can we combine Tirupati with Kanipakam or Sri Kalahasti?",
				answer: "Yes, both are popular add-ons — Sri Kalahasti is 40 km from Tirupati and Kanipakam falls near the return route via Chittoor. Tell us on WhatsApp and we will quote for the extra distance.",
			},
		],
		relatedRoutes: ["vellore", "chennai", "lepakshi"],
		packageSlugs: ["tirupati-darshan-1-day", "tirupati-2-days"],
		popular: true,
		rating: 4.8,
		homepageRail: null,
	},
	{
		slug: "pondicherry",
		image: pondicherryImg,
		name: "Pondicherry",
		category: "beach",
		distanceKm: 310,
		durationHrs: 6,
		days: 2,
		fares: { sedan: { oneWay: 5999, roundTrip: 8299 } },
		summary:
			"French Quarter cafes, Auroville and the Rock Beach promenade — a 310 km coastal escape best done over two days.",
		intro: [
			"Pondicherry sits 310 km from Bangalore, about 6 hours by road. The direct route runs down NH-44 to Krishnagiri and then east on NH-77 through Uthangarai and Tiruvannamalai — with the option of a darshan halt at the Arunachaleswarar temple — before dropping to the coast. The longer alternative loops through Chennai and follows the East Coast Road down, worth it only if you want the sea alongside for the last two hours.",
			"This is a corridor where a cab genuinely beats public transport. There is no direct train from Bangalore, and buses leave you at the edge of town, while Pondicherry's attractions — Auroville to the north, Paradise Beach across the Chunnambar backwater to the south, White Town in between — are spread across 20 km. Having your own car and driver turns that sprawl into an easy loop.",
			"Leave Bangalore by 6 AM to clear the Hosur Road crawl, and plan two days: the promenade and French Quarter deserve an unhurried evening. We run 24/7 with verified drivers and WhatsApp booking, no advance payment. Fuel and driver bata are included; tolls and the Tamil Nadu / Puducherry inter-state permit are extra at actuals.",
		],
		sights: [
			{
				name: "Promenade Beach (Rock Beach)",
				blurb: "The 1.5 km seafront walk past the Gandhi statue and old lighthouse — traffic-free and glorious in the evenings.",
			},
			{
				name: "White Town French Quarter",
				blurb: "Mustard-yellow colonial villas, bougainvillea and cafe-lined streets — the postcard Pondicherry.",
			},
			{
				name: "Auroville and Matrimandir",
				blurb: "The experimental township 12 km north; catch the golden Matrimandir from the viewing point via the visitor centre.",
			},
			{
				name: "Sri Aurobindo Ashram",
				blurb: "The spiritual heart of the town, with the samadhi of Sri Aurobindo and the Mother in a quiet flower-decked courtyard.",
			},
			{
				name: "Paradise Beach",
				blurb: "A clean sand spit reached by a short boat ride across the Chunnambar backwater, 8 km south of town.",
			},
			{
				name: "Basilica of the Sacred Heart of Jesus",
				blurb: "Gothic-revival basilica in brick red and white, one of the finest churches on the Coromandel coast.",
			},
			{
				name: "Serenity Beach",
				blurb: "A quieter surf-friendly beach near Kottakuppam, popular for sunrise and the Sunday flea market.",
			},
		],
		travelTips: [
			"Book Matrimandir viewing passes at the Auroville visitor centre early in the day — same-day slots are limited.",
			"Weekends see heavy tourist rush from both Bangalore and Chennai; book hotels and the cab a week or more ahead.",
			"Depart by 6 AM so the Tiruvannamalai stretch is done before lunch and you reach in time for a beach evening.",
			"Tolls and the TN/Puducherry inter-state permit are extra at actuals; fuel and driver bata for both days are included.",
		],
		faqs: [
			{
				question: "Is a one-way drop from Bangalore to Pondicherry available?",
				answer: "Yes, we run one-way drops on this corridor daily. The fare covers fuel, driver bata and the driver's empty return; you pay only tolls and the inter-state permit on top.",
			},
			{
				question: "Which route will the driver take?",
				answer: "By default the shorter NH-77 route via Krishnagiri and Tiruvannamalai, which is about 6 hours. If you want the East Coast Road experience via Chennai we can do that too — it adds roughly 60 km.",
			},
			{
				question: "Can we stop at Tiruvannamalai on the way?",
				answer: "Yes, the Arunachaleswarar temple is right on the route and a 1–1.5 hour halt fits comfortably. Just mention it while booking so the day's timing is planned around it.",
			},
			{
				question: "Is one day enough for Pondicherry?",
				answer: "It is tight — 12 hours of driving leaves little time for the town itself. Two days is the sweet spot: White Town and the promenade on day one, Auroville and Paradise Beach on day two.",
			},
			{
				question: "Does the cab stay with us in Pondicherry?",
				answer: "On a round trip, yes — the car and driver remain with you for local sightseeing within the package kilometres. Driver accommodation is the driver's own arrangement; you pay nothing extra for it.",
			},
		],
		relatedRoutes: ["chennai", "vellore", "kodaikanal"],
		packageSlugs: ["pondicherry-2-days"],
		popular: true,
		rating: 4.7,
		homepageRail: null,
	},
	{
		slug: "kodaikanal",
		image: kodaikanalImg,
		name: "Kodaikanal",
		category: "hills",
		distanceKm: 465,
		durationHrs: 8.5,
		days: 3,
		fares: { sedan: { oneWay: 8799, roundTrip: 12399 } },
		summary:
			"The Princess of Hill Stations, 465 km out — Kodai Lake, Coaker's Walk and Pillar Rocks over a misty 3-day break.",
		intro: [
			"Kodaikanal is the longest hill run we operate — 465 km and around 8.5 hours. The route follows NH-44 through Krishnagiri, Salem and Dindigul on smooth four- and six-lane highway, then leaves the plains near Batlagundu for the final 60 km Ghat Road: a steady climb of hairpins through eucalyptus and shola forest to 2,100 metres. Our drivers switch the AC off on the steepest sections to keep engines happy, standard practice on this climb.",
			"Depart Bangalore by 5 AM so the entire ghat is done in daylight — mist rolls in by late afternoon and the road has no lighting. Compare that with the alternatives: overnight buses dump you at the lake at dawn after a queasy night, and the nearest railhead, Kodai Road, is still 80 km and a taxi ride from town. A cab door-to-door doubles as your sightseeing vehicle for Pillar Rocks, Guna Caves and the pine forests, which are well outside walking range.",
			"Three days is the plan that works. We are available 24/7, drivers are verified, and booking is over WhatsApp with no advance payment. Fuel and driver bata for all days are included; tolls and the Tamil Nadu inter-state permit are extra.",
		],
		sights: [
			{
				name: "Kodai Lake",
				blurb: "The star-shaped 1863 lake at the heart of town — cycle the 5 km rim or take a pedal boat in the mist.",
			},
			{
				name: "Coaker's Walk",
				blurb: "A kilometre-long cliffside path with sheer views over the plains, best in the hour after sunrise.",
			},
			{
				name: "Pillar Rocks",
				blurb: "Three granite columns rising 120 metres out of the valley, framed by a viewpoint garden.",
			},
			{
				name: "Guna Caves (Devil's Kitchen)",
				blurb: "Deep chambers between the Pillar Rocks made famous by the film Gunaa; viewing is from railed platforms.",
			},
			{
				name: "Bryant Park",
				blurb: "A 20-acre botanical garden beside the lake, at its best during the May flower show.",
			},
			{
				name: "Silver Cascade Falls",
				blurb: "A 55-metre roadside waterfall on the Ghat Road itself — a natural halt as you enter Kodaikanal.",
			},
			{
				name: "Dolphin's Nose",
				blurb: "A rock ledge jutting over a plunging valley, reached by a short steep trail past Echo Point.",
			},
		],
		travelTips: [
			"The Ghat Road has well over 20 hairpins — carry motion-sickness tablets for kids and anyone prone to car sickness.",
			"December and January nights drop close to freezing; pack proper woollens even if Bangalore feels mild.",
			"Avoid summer holiday weekends in May or book well ahead — the flower show season packs the town.",
			"AC stays off on the steep climb sections; it protects the engine and is normal on every Kodai cab.",
			"Tolls and the TN permit are extra at actuals; fuel and driver bata for all three days are in the fare.",
		],
		faqs: [
			{
				question: "How is the road to Kodaikanal?",
				answer: "Excellent highway till Batlagundu, then a 60 km ghat with continuous hairpins. The surface is good but narrow in stretches, which is why we plan the climb strictly in daylight.",
			},
			{
				question: "Can we drive the ghat at night?",
				answer: "We strongly advise against it — the road is unlit, mist cuts visibility after dark, and bison cross in the forest sections. Our itineraries always put the climb and descent in daylight hours.",
			},
			{
				question: "Is 2 days enough, or should we take 3?",
				answer: "With 8.5 hours of driving each way, 2 days gives you barely one evening in the hills. Three days lets you cover the lake, Coaker's Walk, Pillar Rocks and Guna Caves without rushing the ghat.",
			},
			{
				question: "Should we book a sedan or an SUV?",
				answer: "A sedan handles the ghat fine for up to 4 passengers. For 5 or more, heavy luggage, or simply more comfort on the long NH-44 leg, an SUV like an Innova is worth the difference.",
			},
			{
				question: "What extra charges should we expect?",
				answer: "Tolls, parking and the Tamil Nadu inter-state permit are billed at actuals. Fuel and the driver's bata for every day of the trip are already included, and no advance is needed to book.",
			},
		],
		relatedRoutes: ["salem", "ooty", "hogenakkal"],
		packageSlugs: ["kodaikanal-3-days"],
		popular: false,
		rating: 4.6,
		homepageRail: null,
	},
	{
		slug: "gokarna",
		image: gokarnaImg,
		name: "Gokarna",
		category: "beach",
		distanceKm: 485,
		durationHrs: 8.5,
		days: 2,
		fares: { sedan: { oneWay: 9199, roundTrip: 12499 } },
		summary:
			"Temple town with Om and Kudle beaches — 485 km via Tumakuru and Hubballi for a slow two-day coastal reset.",
		intro: [
			"Gokarna is 485 km from Bangalore, roughly 8.5 hours. The run is four-lane NH-48 almost all the way — Tumakuru, Chitradurga, Davanagere, Hubballi — before you turn west and drop through the Western Ghats forest stretch past Yellapur to Ankola, joining coastal NH-66 for the last short hop south. That forested descent is the one section to respect: it is winding, truck-heavy and best crossed in daylight, so a 5 AM start from Bangalore works perfectly.",
			"The whole trip stays inside Karnataka, so there is no inter-state permit to pay — one of the few long corridors where that is true. And a cab earns its keep here: Gokarna's beaches sit in separate coves divided by headlands, the town's lanes are narrow, and buses from Bangalore drop you a sweaty auto-ride from everything. With your own car you can do temple darshan in the morning and be on the Om Beach cliff by noon.",
			"We run this route 24/7 with verified drivers, booked over WhatsApp with no advance payment. Fuel and driver bata for both days are included in the fare; only tolls and parking are extra.",
		],
		sights: [
			{
				name: "Om Beach",
				blurb: "Twin curving coves shaped like the Om symbol — the most famous stretch of sand on the Karnataka coast.",
			},
			{
				name: "Kudle Beach",
				blurb: "A wide, laid-back crescent between two headlands, lined with shacks and the best sunsets in town.",
			},
			{
				name: "Mahabaleshwar Temple",
				blurb: "The ancient shrine of the Atmalinga that gives Gokarna its sanctity; the town is a pilgrimage centre first.",
			},
			{
				name: "Half Moon Beach",
				blurb: "A tiny cove beyond Om Beach reachable only by a cliff trek or boat — bring water and go early.",
			},
			{
				name: "Paradise Beach",
				blurb: "The most remote of Gokarna's beaches, accessible by boat; no shacks, no crowds, just sand and rock.",
			},
			{
				name: "Mirjan Fort",
				blurb: "A moss-covered 16th-century laterite fort 20 km away, tied to the pepper queen Chennabhairadevi.",
			},
		],
		travelTips: [
			"Start by 5 AM so the Yellapur–Ankola forest ghat is behind you in daylight; it is slow going after dark.",
			"No inter-state permit applies — the entire route is within Karnataka, so only tolls and parking are extra.",
			"The sea is rough during the June–September monsoon; November to February is the best window for the beaches.",
			"Half Moon and Paradise beaches need a boat or a cliff trek — wear proper footwear and carry water.",
			"Modest dress is expected at Mahabaleshwar Temple; keep beachwear for the beaches.",
		],
		faqs: [
			{
				question: "Is a one-way cab to Gokarna available?",
				answer: "Yes, one-way drops run regularly on this corridor. The quoted fare includes fuel and driver bata; since the route never leaves Karnataka, there is no permit charge — just tolls at actuals.",
			},
			{
				question: "How is the road condition?",
				answer: "Four-lane and fast until Hubballi, then a winding two-lane forest stretch down to Ankola. The surface is decent but the descent has sharp bends, so we schedule it for daylight.",
			},
			{
				question: "Can the cab take us beach-hopping in Gokarna?",
				answer: "Yes — the car stays with you, and roads reach the cliff tops above Om and Kudle beaches. Half Moon and Paradise are boat-or-trek only, and your driver will drop you at the boat point.",
			},
			{
				question: "Can we combine Gokarna with Murudeshwar or Yana?",
				answer: "Easily. Murudeshwar's shore temple is 75 km south on NH-66 and the Yana rock formations are about 50 km inland — either fits as a half-day extension. Mention it while booking for the revised quote.",
			},
			{
				question: "When is the best time to visit?",
				answer: "October to February — calm seas, cool evenings and clear skies. Summer is hot but workable; monsoon is dramatic on the ghats yet rules out swimming.",
			},
		],
		relatedRoutes: ["goa", "udupi", "chikmagalur"],
		packageSlugs: [],
		popular: false,
		rating: 4.6,
		homepageRail: null,
	},
	{
		slug: "goa",
		name: "Goa",
		image: goaImg,
		category: "beach",
		distanceKm: 560,
		durationHrs: 10,
		days: 3,
		fares: { sedan: { oneWay: 10499, roundTrip: 14699 } },
		summary:
			"560 km to sun, sand and susegad — a big road trip via Hubballi and the Ankola coast into North or South Goa.",
		intro: [
			"Bangalore to Goa is the classic Indian road trip: 560 km and a solid 10 hours. The main route takes four-lane NH-48 to Hubballi, descends the ghat forest stretch to Ankola, then follows coastal NH-66 north through Karwar to enter Goa near Canacona — which puts Palolem and the South Goa beaches first. Heading straight for Baga, Anjuna or Panaji? Staying on NH-48 to Belagavi and crossing into Goa over the Anmod/Chorla ghats is the smarter line. Either way, start by 4–5 AM and you check in before sunset.",
			"Why drive when you can fly? Because a cab carries four people and a boot full of luggage for one fare, stops at Gokarna or the Dudhsagar viewpoints on the way, and then stays with you — beach-hopping in Goa without haggling over local taxi rates is worth the trip alone. Your driver remains with the vehicle for all three days, and the per-day driver bata is already built into our quote.",
			"We operate 24/7 with verified drivers and WhatsApp booking, no advance payment. Fuel and bata are included; tolls, parking and the Goa inter-state permit are extra at actuals. Drivers switch the AC off on the steep ghat climbs — normal practice, not a fault.",
		],
		sights: [
			{
				name: "Baga and Calangute Beaches",
				blurb: "North Goa's high-energy strip — shacks, water sports and the nightlife around Tito's Lane.",
			},
			{
				name: "Fort Aguada",
				blurb: "A 17th-century Portuguese fort and lighthouse guarding the Mandovi mouth, with sweeping sea views.",
			},
			{
				name: "Basilica of Bom Jesus",
				blurb: "The UNESCO-listed Old Goa church holding the relics of St. Francis Xavier.",
			},
			{
				name: "Fontainhas, Panaji",
				blurb: "The Latin Quarter's ochre-and-indigo Portuguese houses, azulejo tiles and slow café lanes.",
			},
			{
				name: "Palolem Beach",
				blurb: "South Goa's palm-fringed crescent — calm water, kayaks and a gentler pace than the north.",
			},
			{
				name: "Chapora Fort",
				blurb: "The hilltop ruin above Vagator made famous by Dil Chahta Hai; go for the sunset.",
			},
			{
				name: "Dudhsagar Falls",
				blurb: "The four-tiered giant on the Goa–Karnataka border; the jeep safari from Mollem runs outside the monsoon.",
			},
		],
		travelTips: [
			"Plan a minimum of 3 days — two of them go into the road, and Goa deserves at least one full unhurried day.",
			"The Goa inter-state permit, tolls and parking are extra at actuals; fuel and the driver's daily bata are included.",
			"November to February is peak season — lock in both the cab and your hotel one to two weeks ahead.",
			"Decide North or South Goa before departure; it changes the best route (Belagavi ghats vs the Karwar coast).",
			"A Gokarna or Dudhsagar halt en route is easy to add — tell us while booking so the day is timed for it.",
		],
		faqs: [
			{
				question: "Is a one-way cab from Bangalore to Goa available?",
				answer: "Yes — one-way drops are common for travellers flying back. The fare includes fuel and driver bata; tolls and the Goa entry permit are billed at actuals on top.",
			},
			{
				question: "Does the driver stay with us for all days in Goa?",
				answer: "Yes, on a round trip the car and driver stay with you for the whole itinerary, covering local beach-hopping within the package kilometres. The multi-day driver bata is already in the quote; the driver arranges his own stay.",
			},
			{
				question: "How long does the drive really take?",
				answer: "Ten hours of driving, so 11–12 hours door to door with breaks. Leaving Bangalore by 4–5 AM gets you to your resort by early evening with the ghat sections done in daylight.",
			},
			{
				question: "Can we stop at Gokarna or Dudhsagar on the way?",
				answer: "Yes — Gokarna sits just off the coastal route and the Dudhsagar jeep point at Mollem is near the Belagavi route. Either adds a few hours, so it is best planned as part of day one.",
			},
			{
				question: "What does the Goa permit cost?",
				answer: "Inter-state permit charges are set by the checkpost and vary by vehicle class; they are paid at actuals and the driver keeps the receipt. Everything else except tolls and parking is inside the fare.",
			},
			{
				question: "Sedan or SUV for the Goa trip?",
				answer: "A sedan is fine for 3–4 people with soft luggage. For four adults with big suitcases, or five and more passengers, take an SUV — the extra room matters over ten hours.",
			},
		],
		relatedRoutes: ["gokarna", "udupi", "hampi"],
		packageSlugs: [],
		popular: true,
		rating: 4.7,
		homepageRail: null,
	},
	{
		slug: "hampi",
		image: hampiImg,
		name: "Hampi",
		category: "heritage",
		distanceKm: 340,
		durationHrs: 6.5,
		days: 2,
		fares: { sedan: { oneWay: 6599, roundTrip: 8999 } },
		summary:
			"UNESCO ruins of Vijayanagara — 340 km via Chitradurga to boulder hills, the Stone Chariot and coracle rides.",
		intro: [
			"Hampi lies 340 km north of Bangalore, about 6.5 hours away. The drive is one of the easiest long runs in Karnataka: four-lane NH-48 past Tumakuru to Chitradurga — windmill country, with the hill fort visible from the highway — then NH-50 towards Hosapete, from where the ruins are a final 13 km. Leave at 6 AM and you are having lunch under the boulders. The whole corridor stays within Karnataka, so no inter-state permit applies.",
			"On the ground, a cab is the difference between seeing Hampi and merely visiting it. The UNESCO site spreads across more than 25 square kilometres of banana groves and granite hills; the nearest railhead is Hosapete with limited trains, and site clusters — Virupaksha, the Royal Enclosure, Vittala — sit kilometres apart. Your driver shuttles you between clusters while you explore each on foot, and gets you to Matanga Hill before dawn for the sunrise that everyone comes for.",
			"Two days covers the highlights properly. We are available 24/7, drivers are verified, booking is a WhatsApp message with no advance payment, and fuel plus driver bata are included — only tolls and parking are extra.",
		],
		sights: [
			{
				name: "Virupaksha Temple",
				blurb: "The living temple at Hampi's heart, in continuous worship since well before the Vijayanagara empire.",
			},
			{
				name: "Vittala Temple and Stone Chariot",
				blurb: "The empire's artistic peak — musical pillars and the iconic stone chariot from the fifty-rupee note.",
			},
			{
				name: "Matanga Hill",
				blurb: "The sunrise point: a steep 30-minute pre-dawn scramble rewarded by the whole ruin field glowing gold.",
			},
			{
				name: "Hemakuta Hill Temples",
				blurb: "A gentle slope of pre-Vijayanagara shrines beside Virupaksha, the easiest sunset spot on the site.",
			},
			{
				name: "Lotus Mahal and Zenana Enclosure",
				blurb: "Indo-Islamic palace architecture in the royal quarter, delicate arches amid manicured lawns.",
			},
			{
				name: "Elephant Stables",
				blurb: "Eleven domed chambers that once housed the royal elephants — remarkably intact after five centuries.",
			},
			{
				name: "Tungabhadra Coracle Ride",
				blurb: "A spin in a round bamboo boat past riverside carvings near the Vittala temple ghats.",
			},
		],
		travelTips: [
			"March to May is scorching among the boulders — visit October to February, and carry water and a cap regardless.",
			"The ASI ticket bought at Vittala Temple also covers the Lotus Mahal enclosure on the same day; keep it handy.",
			"Stay in Hosapete or Kamalapura — accommodation inside the heritage zone itself is deliberately limited.",
			"Hire a licensed guide at Virupaksha or Vittala; the ruins make far more sense with the history narrated.",
			"No inter-state permit on this route — only tolls and parking come over the quoted fare.",
		],
		faqs: [
			{
				question: "Is one day enough for Hampi?",
				answer: "Not really — with 13 hours of driving return, a single day leaves you two rushed hours in the ruins. The standard plan is two days: royal enclosure and Virupaksha on day one, sunrise plus Vittala on day two.",
			},
			{
				question: "How is the road from Bangalore to Hampi?",
				answer: "Very good — four-lane NH-48 till Chitradurga and a well-surfaced NH-50 to Hosapete after that. It is among the smoothest 340 km drives out of Bangalore.",
			},
			{
				question: "Can the cab drive inside the Hampi site?",
				answer: "Cars can reach the parking areas near each major cluster — Virupaksha, the Royal Enclosure and the Vittala approach — but the final stretches are on foot or by the site's battery buggies. Your driver repositions between clusters as you go.",
			},
			{
				question: "When is the best time to visit Hampi?",
				answer: "October to February for bearable daytime heat, with the Hampi Utsav (usually January) as a spectacular bonus if dates align. Summer visits should be planned around early mornings and late afternoons.",
			},
			{
				question: "Can we add Badami or Tungabhadra Dam to the trip?",
				answer: "The Tungabhadra Dam gardens at Hosapete are an easy evening add-on. Badami, Aihole and Pattadakal are about 140 km further and really deserve an extra day — we can extend the package if you want the full circuit.",
			},
		],
		relatedRoutes: ["goa", "gokarna", "chikmagalur"],
		packageSlugs: ["hampi-2-days"],
		popular: true,
		rating: 4.8,
		homepageRail: null,
	},
	{
		slug: "udupi",
		image: udupiImg,
		name: "Udupi",
		category: "spiritual",
		distanceKm: 405,
		durationHrs: 7.5,
		days: 2,
		fares: { sedan: { oneWay: 7699, roundTrip: 10599 } },
		summary:
			"Krishna Matha darshan plus Malpe and Kaup beaches — 405 km across the Western Ghats via Hassan.",
		intro: [
			"Udupi is 405 km and about 7.5 hours from Bangalore. The standard route is NH-75 through Kunigal and Hassan, then down the Shiradi Ghat to the coast near Mangaluru before turning north on NH-66 — the fastest line, though Shiradi's surface conditions vary through the year, especially just after the monsoon. The alternative climbs over the Charmadi Ghat via Chikkamagaluru: slower, prettier, and a good swap if Shiradi is having a rough patch. Either way our drivers keep the AC off on the steep climbs and avoid crossing the ghats in late-night fog.",
			"Udupi rewards a car more than most temple towns. The Krishna Matha and its Car Street are the anchor, but the best of the trip lies scattered up the coast — Malpe's boardwalk, the ferry to St. Mary's Islands, the lighthouse rocks at Kaup — and the Konkan railway's timings from Bangalore are famously unhelpful. A 5 AM start puts you at the matha for evening darshan and prasada.",
			"We operate 24/7 with verified drivers; book on WhatsApp with no advance payment. Fuel and driver bata for both days are included, and with the route entirely inside Karnataka, only tolls and parking are extra.",
		],
		sights: [
			{
				name: "Sri Krishna Matha",
				blurb: "The 13th-century temple founded by Madhvacharya, where darshan is famously taken through the silver Kanakana Kindi window.",
			},
			{
				name: "Malpe Beach",
				blurb: "Udupi's main beach, 6 km out — a busy fishing harbour on one side and a clean promenade on the other.",
			},
			{
				name: "St. Mary's Islands",
				blurb: "Hexagonal basalt rock columns on an islet reached by ferry from Malpe — a genuine geological oddity.",
			},
			{
				name: "Kaup Lighthouse Beach",
				blurb: "A 1901 lighthouse on a rocky headland 15 km south, the most photogenic sunset spot on this coast.",
			},
			{
				name: "Manipal End Point",
				blurb: "A cliff-edge park above the Swarna river valley in the university town next door.",
			},
			{
				name: "Pajaka Kshetra",
				blurb: "The quiet birthplace of the philosopher Madhvacharya, 12 km from town — an easy add for pilgrims.",
			},
		],
		travelTips: [
			"The Shiradi Ghat's surface varies by season — after heavy monsoons we may route via Charmadi; ask us for the current picture.",
			"Ferries to St. Mary's Islands run from Malpe roughly 9 AM to 5 PM and stop entirely in rough monsoon seas.",
			"Traditional dress is appreciated inside Sri Krishna Matha, and the free prasada lunch is an experience in itself.",
			"Cross the ghats in daylight — fog and truck traffic make Shiradi and Charmadi slow, tiring drives after dark.",
			"No inter-state permit on this route; only tolls and parking are charged over the fare.",
		],
		faqs: [
			{
				question: "Which ghat route will we take — Shiradi or Charmadi?",
				answer: "Shiradi on NH-75 by default, as it is the fastest. If its surface is in a bad phase or there is maintenance work, we switch to the Charmadi Ghat via Chikkamagaluru, which adds a little time but is a lovely drive.",
			},
			{
				question: "Is a one-way drop to Udupi or Manipal available?",
				answer: "Yes, one-way drops run to Udupi, Manipal and Mangaluru regularly — students and parents use this corridor a lot. Fuel and bata are inside the fare; tolls are extra at actuals.",
			},
			{
				question: "Can we visit St. Mary's Islands on this trip?",
				answer: "Yes, plan it for the morning of day two — ferries from Malpe start around 9 AM and the round trip with island time takes 2–3 hours. Note that services stop in the monsoon when the sea is rough.",
			},
			{
				question: "Can we combine Udupi with Gokarna or Murudeshwar?",
				answer: "Murudeshwar is 100 km up NH-66 and Gokarna about 175 km, so either extends the trip by a day. Many pilgrims do Udupi–Murudeshwar–Gokarna as a single coastal circuit; we quote for the full loop on request.",
			},
			{
				question: "What are the darshan timings at the Krishna Matha?",
				answer: "The matha opens well before dawn and runs poojas through the day until night, with brief closures around ritual times. Evening darshan followed by a walk around Car Street is the classic first-day plan.",
			},
		],
		relatedRoutes: ["gokarna", "sakleshpur", "chikmagalur", "coorg"],
		packageSlugs: [],
		popular: false,
		rating: 4.5,
		homepageRail: null,
	},
	{
		slug: "sakleshpur",
		image: sakleshpurImg,
		name: "Sakleshpur",
		category: "hills",
		distanceKm: 220,
		durationHrs: 4.5,
		days: 2,
		fares: { sedan: { oneWay: 4399, roundTrip: 8099 } },
		summary:
			"Coffee-country weekend just 220 km down NH-75 — Manjarabad Fort, Bisle viewpoint and estate homestays.",
		intro: [
			"Sakleshpur is the closest slice of Malnad to Bangalore: 220 km and about 4.5 hours, nearly all of it on four-lane NH-75 through Kunigal, Channarayapatna and Hassan. The highway makes even a Friday-evening getaway realistic, though the last leg matters — most stays here are homestays buried inside coffee and pepper estates, reached by narrow plantation roads that are far better tackled in daylight.",
			"That last mile is exactly why a cab beats the bus. KSRTC drops you in Sakleshpur town, after which estates arrange jeep pickups at extra cost and on their schedule; a cab delivers you to the homestay porch and then stays for the sightseeing loop — Manjarabad's star fort, the Bisle Ghat viewpoint deep in the forest, waterfalls that appear and swell with the rains. In the June–September monsoon the whole belt turns emerald, which is both the best and the wettest time to come.",
			"We run 24/7 with verified drivers and WhatsApp booking — no advance payment. Fuel and two days of driver bata are included; the route never leaves Karnataka, so only tolls and parking are extra.",
		],
		sights: [
			{
				name: "Manjarabad Fort",
				blurb: "Tipu Sultan's 1792 star-shaped fort just off NH-75 — its eight-pointed plan is best appreciated from the ramparts.",
			},
			{
				name: "Bisle Ghat Viewpoint",
				blurb: "A forest-road viewpoint over the Kumara Parvatha ranges, one of the great panoramas of the Western Ghats.",
			},
			{
				name: "Mookanamane Falls",
				blurb: "A monsoon-fed waterfall tucked into the estates, at full throated best between July and October.",
			},
			{
				name: "Sakleshwara Swamy Temple",
				blurb: "The Hoysala-era Shiva temple on the Hemavathi riverbank that gives the town its name.",
			},
			{
				name: "Jenukal Gudda",
				blurb: "One of the region's highest peaks, a short trek or rough jeep track ending in 360-degree Ghat views.",
			},
			{
				name: "Coffee and Pepper Estate Walks",
				blurb: "Guided walks through working plantations — most homestays include one, ending with estate-fresh filter coffee.",
			},
		],
		travelTips: [
			"Interior estate roads are rough and slushy in the rains — tell us your homestay's location; an SUV is worth it for remote ones.",
			"Long-weekend homestay inventory sells out weeks ahead; lock your stay before you book the cab dates.",
			"In the monsoon carry rain gear and leech socks if you plan estate or waterfall treks.",
			"The Bisle viewpoint road runs through reserve forest — plan it as a morning outing and clear the stretch before dusk.",
		],
		faqs: [
			{
				question: "Can a sedan reach coffee estate homestays?",
				answer: "Most homestays near the highway and town are fine for a sedan. For properties deep inside estates — especially in the monsoon — the approach tracks get rough, and we recommend an SUV; share the homestay pin and we will advise.",
			},
			{
				question: "Is Sakleshpur doable as a day trip?",
				answer: "Technically yes at 4.5 hours each way, but you would only manage Manjarabad Fort and lunch. The whole point is a slow estate stay, so two days is what we suggest and what the round-trip fare is built for.",
			},
			{
				question: "When is the best time to visit?",
				answer: "June to September for the dramatic monsoon greenery, October to February for clear skies and trekking weather. Summer is quieter and still pleasant compared to the plains.",
			},
			{
				question: "Can we combine Sakleshpur with Chikmagalur or Coorg?",
				answer: "Yes — Chikkamagaluru is about 85 km north via Mudigere and Kukke Subramanya or Coorg can be worked into a triangle. A combined 3-day Malnad circuit is a popular request; ask us on WhatsApp for the quote.",
			},
			{
				question: "Is the famous railway bridge trek allowed?",
				answer: "The Green Route trek along the Sakleshpur–Subramanya railway line is officially prohibited on the active track, and we do not arrange it. The Bisle viewpoint and estate treks are the legal ways to get those Ghat views.",
			},
		],
		relatedRoutes: ["chikmagalur", "coorg", "udupi"],
		packageSlugs: [],
		popular: false,
		rating: 4.5,
		homepageRail: null,
	},
	{
		slug: "vellore",
		image: velloreImg,
		name: "Vellore",
		category: "spiritual",
		distanceKm: 215,
		durationHrs: 4,
		days: 1,
		fares: { sedan: { oneWay: 4299, roundTrip: 5599 } },
		summary:
			"The golden Sripuram temple and a 16th-century moated fort — an easy 215 km day run via Krishnagiri.",
		intro: [
			"Vellore sits 215 km east of Bangalore, an easy 4-hour run. The route takes NH-44 through Hosur to Krishnagiri, then swings onto the Bengaluru–Chennai carriageway past Vaniyambadi and Ambur — yes, that Ambur, so a biryani halt is practically mandatory. The road is fast dual carriageway the whole way, making this one of the most relaxed day trips we operate.",
			"Most travellers come for Sripuram, the Sri Lakshmi Narayani Golden Temple, whose sanctum is clad in gold leaf and approached along a star-shaped walkway of nearly two kilometres. A cab suits this trip because the temple lies 8 km south of the city with limited public transport, and the day's other stops — the massive moated Vellore Fort with the Jalakandeswarar temple inside it — are spread across town. Families heading to CMC hospital also use this corridor heavily, where door-to-door comfort matters most.",
			"Leave by 6 AM, do Sripuram before the midday rush, the fort after lunch, and be home for dinner. We run 24/7 with verified drivers and WhatsApp booking — no advance payment. Fuel and bata are included; tolls and the Tamil Nadu permit are extra.",
		],
		sights: [
			{
				name: "Sripuram Golden Temple",
				blurb: "The Sri Lakshmi Narayani temple sheathed in gold leaf, reached via a 1.8 km star-path of spiritual inscriptions.",
			},
			{
				name: "Vellore Fort",
				blurb: "A formidable 16th-century granite fort ringed by a wide moat — among the best-preserved in South India.",
			},
			{
				name: "Jalakandeswarar Temple",
				blurb: "The Vijayanagara-style Shiva temple inside the fort, its kalyana mandapam a masterpiece of stone carving.",
			},
			{
				name: "Ratnagiri Balamurugan Temple",
				blurb: "A hilltop Murugan shrine on the city's edge with steps up and views over the plains.",
			},
			{
				name: "Amirthi Zoological Park",
				blurb: "A forest park and small waterfall in the Javadi Hills, 25 km away — a good add-on with kids.",
			},
			{
				name: "Ambur Biryani Halt",
				blurb: "The legendary biryani town sits right on your route — the classic lunch stop of the Chennai highway.",
			},
		],
		travelTips: [
			"Phones and cameras are not allowed inside Sripuram — lockers are provided at the entrance, so plan for the wait.",
			"Weekends and festival days see long lines on the Sripuram star-path; a weekday or early-morning visit is far calmer.",
			"Tolls and the Tamil Nadu inter-state permit are extra at actuals; fuel and driver bata are already in the fare.",
			"Going for CMC? Tell us your appointment time and we will plan the pickup so you arrive with a buffer.",
		],
		faqs: [
			{
				question: "Is Vellore doable as a day trip from Bangalore?",
				answer: "Comfortably — 4 hours each way leaves a full afternoon in the city. Depart at 6 AM, finish Sripuram by noon, cover the fort after an Ambur biryani lunch, and you are back by 9 PM.",
			},
			{
				question: "What are the rules at the Golden Temple?",
				answer: "No phones, cameras or leather items inside; lockers are available at the gate. Modest dress is required, and the walk along the star-path to the sanctum takes 45 minutes to an hour at an easy pace.",
			},
			{
				question: "Can we combine Vellore with Tirupati?",
				answer: "Yes — Tirupati is barely 100 km from Vellore, and a two-day loop covering Sripuram and Tirumala is a popular pilgrimage combination. We quote it as a custom round trip with both permits included at actuals.",
			},
			{
				question: "Do you handle CMC Vellore hospital trips?",
				answer: "Regularly — one-way drops, same-day returns and multi-day waits during treatment are all available. The driver can wait at the hospital through your appointments; just tell us the expected schedule.",
			},
			{
				question: "What extra charges apply on this route?",
				answer: "Only tolls and the Tamil Nadu inter-state permit, both at actuals with receipts. Fuel and driver bata are part of the quoted fare, and no advance payment is needed to confirm the booking.",
			},
		],
		relatedRoutes: ["chennai", "tirupati", "pondicherry"],
		packageSlugs: [],
		popular: false,
		rating: 4.4,
		homepageRail: null,
	},
	{
		slug: "salem",
		image: salemImg,
		name: "Salem",
		category: "city",
		distanceKm: 215,
		durationHrs: 3.5,
		days: 1,
		fares: { sedan: { oneWay: 4299, roundTrip: 5599 } },
		summary:
			"Gateway to Yercaud — 215 km of smooth six-lane NH-44 through Krishnagiri and Dharmapuri in 3.5 hours.",
		intro: [
			"Salem is the fastest 200-plus-kilometre corridor out of Bangalore: 215 km down six-lane NH-44 through Hosur, Krishnagiri and Dharmapuri, done in about 3.5 hours. The road is arrow-straight tollway nearly the whole distance, which is why this route serves everyone from textile and steel businessmen on same-day meetings to families using Salem as the doorway to Yercaud, the quiet coffee-country hill station 30 km and twenty hairpin bends above the city.",
			"A cab wins over the train here for one simple reason: everything worth seeing needs a car anyway. Yercaud's ghat, the Mettur Dam 50 km west, and the temples spread around the city are all road trips from Salem Junction — so door-to-door from Bangalore removes a transfer entirely. For the Yercaud climb our drivers take the hairpins gently and switch off the AC on the steepest pulls, standard hill practice.",
			"Depart by 6:30 AM and you beat the Hosur toll queues with the whole day ahead. We operate 24/7 with verified drivers, book on WhatsApp with no advance payment, and include fuel and driver bata in the fare — tolls and the Tamil Nadu permit are extra at actuals.",
		],
		sights: [
			{
				name: "Yercaud and Emerald Lake",
				blurb: "The Shevaroy Hills station 30 km up the ghat — boating on the lake ringed by coffee estates.",
			},
			{
				name: "Pagoda Point",
				blurb: "Yercaud's eastern viewpoint with stacked-stone pagodas and a sweeping look over the Salem plains.",
			},
			{
				name: "Kiliyur Falls",
				blurb: "A 90-metre seasonal waterfall near Yercaud lake, at its best in the weeks after the monsoon.",
			},
			{
				name: "Mettur Dam",
				blurb: "One of India's oldest large dams across the Kaveri, 50 km from Salem, with a park below the sluices.",
			},
			{
				name: "Kottai Mariamman Temple",
				blurb: "Salem's best-known city temple, centre of the grand annual Aadi festival procession.",
			},
			{
				name: "Kurumbapatti Zoological Park",
				blurb: "A compact zoo and picnic spot at the foot of the Shevaroy Hills, an easy stop with children.",
			},
		],
		travelTips: [
			"Add Yercaud to any Salem plan — the 20-hairpin ghat takes under an hour and transforms the trip.",
			"Tolls on NH-44 are frequent; they and the Tamil Nadu permit are extra at actuals, with everything else in the fare.",
			"Start by 6:30 AM to clear the Hosur border and toll queues before the morning office rush.",
			"During the mango season, the Krishnagiri stretch is lined with orchard stalls — worth a ten-minute halt.",
		],
		faqs: [
			{
				question: "Can we cover Salem and Yercaud in one day?",
				answer: "Yes — with only 3.5 hours each way, you can be up the Yercaud ghat by late morning, cover the lake, Pagoda Point and Kiliyur Falls, and still return to Bangalore the same night. It is the most popular way to use this route.",
			},
			{
				question: "How good is the road to Salem?",
				answer: "It is among the best in South India — six-lane, fully divided NH-44 from Hosur to Salem with consistent surfaces. The only slow section is the Yercaud ghat if you extend uphill, which is narrow but well paved.",
			},
			{
				question: "Do you do one-way drops to Salem?",
				answer: "Yes, one-way drops run daily on this corridor for business travellers and students. The fare includes fuel and driver bata; you pay tolls and the TN permit at actuals.",
			},
			{
				question: "Is a late-night return from Salem safe?",
				answer: "The NH-44 stretch is lit, divided and busy around the clock, so night returns on the highway are routine. We only avoid doing the Yercaud ghat after dark; we schedule the descent before sunset.",
			},
			{
				question: "Can we extend towards Kodaikanal from Salem?",
				answer: "Yes — Salem sits exactly on the Kodaikanal route, about halfway. Many travellers break the Kodai journey here or convert a Salem trip into a hill extension; we re-quote the package on WhatsApp in minutes.",
			},
		],
		relatedRoutes: ["hogenakkal", "kodaikanal", "ooty"],
		packageSlugs: [],
		popular: false,
		rating: 4.4,
		homepageRail: null,
	},
];
