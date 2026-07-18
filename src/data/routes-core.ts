// Core outstation routes for Bangalore Urban Cabs — legacy sedan fares are authoritative; other classes derive at render.
import type { Route } from "./route-types";

import nandiHills from "../assets/destinations/nandi-hills.webp";
import lepakshiTemple from "../assets/destinations/lepakshi-temple.webp";
import shivanaSamudra from "../assets/destinations/shivana-samudra.webp";
import mysorePalace from "../assets/destinations/mysore-palace.webp";
import ishaFoundation from "../assets/destinations/isha-foundation.webp";
import chickmagaluru from "../assets/destinations/chickmagaluru.webp";
import coorg from "../assets/destinations/coorg.webp";
import ooty from "../assets/destinations/ooty.webp";
import waynad from "../assets/destinations/waynad.webp";
import hogenakkalFalls from "../assets/destinations/hogenakkal-falls.webp";
import chennai from "../assets/destinations/chennai.webp";

export const ROUTES_CORE: Route[] = [
	{
		slug: "nandi-hills",
		name: "Nandi Hills",
		image: nandiHills,
		category: "hills",
		distanceKm: 60,
		durationHrs: 1.5,
		days: 1,
		fares: { sedan: { oneWay: 2100, roundTrip: 3300 } },
		summary:
			"Sunrise hill fortress 60 km from Bangalore — Tipu's Drop, misty viewpoints and an easy half-day cab trip.",
		intro: [
			"The classic Bangalore sunrise run. You head out on NH-44 past Hebbal and the airport, turn off near Devanahalli, and take the winding hill road up its forty-odd hairpin bends to the old fortress at 1,478 metres. With empty pre-dawn roads the drive takes about an hour and a half, so a 4:15–4:30 am pickup puts you at the gates when they open at 6 am, in time for sunrise over the cloud line at Tipu's Drop.",
			"The hilltop was Tipu Sultan's summer retreat, and his restored lodge, the fort walls and the ancient Yoga Nandeeshwara temple give you plenty to walk through once the light comes up. Carry a light jacket — it is noticeably colder than the city, especially from November to February.",
			"Weekends get busy fast: the hill road and parking choke by 8–8:30 am, so a weekday visit is far more relaxed. On the way down, stop at the 9th-century Bhoga Nandeeshwara temple in the base village, and if you want a full day, the 112-ft Adiyogi at Sadhguru Sannidhi is a short drive away.",
		],
		sights: [
			{
				name: "Tipu's Drop",
				blurb: "Sheer 600-metre cliff and the hill's signature sunrise viewpoint above the cloud line.",
			},
			{
				name: "Tipu's Summer Residence",
				blurb: "Restored lodge where Tipu Sultan spent his summers, set inside the old fort walls.",
			},
			{
				name: "Yoga Nandeeshwara Temple",
				blurb: "Ancient Shiva temple at the summit, quiet and atmospheric in the early morning mist.",
			},
			{
				name: "Amrita Sarovar",
				blurb: "Perennial 'lake of nectar' near the top that once fed the fort's water channels.",
			},
			{
				name: "Bhoga Nandeeshwara Temple",
				blurb: "9th-century Dravidian temple complex in the base village — worth 45 minutes on the way down.",
			},
			{
				name: "Nehru Nilaya",
				blurb: "Colonial-era bungalow on the summit, once used by the Mysore commissioners and later by Nehru.",
			},
		],
		travelTips: [
			"Book a 4:15–4:30 am pickup for sunrise; gates open at 6 am and the best light is in the first hour.",
			"Hilltop entry and parking fees are paid at the gate and are not part of the cab fare.",
			"Carry a warm layer — the summit is several degrees colder than Bangalore, with strong wind at Tipu's Drop.",
			"Avoid weekend mornings after 8 am; the hairpin road backs up badly and parking fills fast.",
			"Monkeys are bold near the viewpoints — keep food and loose items inside the cab.",
		],
		faqs: [
			{
				question: "What time should we start from Bangalore for the Nandi Hills sunrise?",
				answer: "A 4:15–4:30 am pickup works for most of the city. The drive takes about 90 minutes on empty roads, which puts you at the gates for the 6 am opening and at Tipu's Drop before the sun clears the horizon.",
			},
			{
				question: "Is a one-way drop to Nandi Hills available?",
				answer: "Yes, a sedan one-way drop is ₹2,100. Most guests take the ₹3,300 round trip though, since return cabs are almost impossible to find at the hilltop and the driver waits through your visit.",
			},
			{
				question: "Are tolls and entry fees included in the fare?",
				answer: "The fare covers fuel and driver bata. The NH-44 toll, the Nandi Hills entry fee and hilltop parking are extra and paid at actuals — together they add only a small amount.",
			},
			{
				question: "How long do people usually spend at the top?",
				answer: "Two to three hours covers sunrise, Tipu's Drop, the summer residence and a chai at the summit stalls. Most guests are back in Bangalore comfortably before lunch.",
			},
			{
				question: "Can we combine Nandi Hills with the Adiyogi statue?",
				answer: "Yes — Sadhguru Sannidhi is a short drive from the base of the hills. Do sunrise at the top, the Bhoga Nandeeshwara temple on the way down, and reach Adiyogi by evening for the light show; our Nandi Hills + Adiyogi one-day package covers exactly this.",
			},
		],
		relatedRoutes: ["adiyogi-chikkaballapur", "lepakshi", "mysore", "shivanasamudra"],
		packageSlugs: ["nandi-hills-adiyogi-1-day"],
		popular: true,
		rating: 4.8,
		homepageRail: "weekend",
	},
	{
		slug: "lepakshi",
		name: "Lepakshi",
		image: lepakshiTemple,
		category: "heritage",
		distanceKm: 120,
		durationHrs: 2.5,
		days: 1,
		fares: { sedan: { oneWay: 2100, roundTrip: 3300 } },
		summary:
			"Vijayanagara-era Veerabhadra temple across the Andhra border, famed for its hanging pillar and giant Nandi.",
		intro: [
			"Lepakshi sits just across the Andhra Pradesh border, about 120 km up NH-44 — a smooth two-and-a-half-hour run past the airport, Chikkaballapur and Bagepalli, with the last 12–15 km on a state road after you leave the highway near the Kodikonda checkpost. Since you cross a state line, carry photo ID; the inter-state permit for the cab is billed extra at actuals.",
			"The draw is the 16th-century Veerabhadra temple, built under the Vijayanagara empire and famous for its hanging pillar — one of the hall's 70 pillars rests clear of the floor, and guides happily slide a sheet of paper beneath it to prove the point. The ceilings carry some of the largest surviving fresco panels in India, and a kilometre before the temple stands a gigantic monolithic Nandi carved from a single granite boulder.",
			"Start by 6:30–7 am; the granite floors get scorching by noon and the carvings are at their best in soft morning light. Most guests are back in Bangalore by mid-afternoon, or loop in Nandi Hills on the return for a full day.",
		],
		sights: [
			{
				name: "Veerabhadra Temple",
				blurb: "16th-century Vijayanagara temple with exquisitely carved pillared halls and shrines.",
			},
			{
				name: "Hanging Pillar",
				blurb: "The famous pillar that rests clear of the floor — a sheet of paper slides right under it.",
			},
			{
				name: "Monolithic Nandi",
				blurb: "One of India's largest Nandi statues, carved from a single granite boulder a kilometre before the temple.",
			},
			{
				name: "Naga Linga",
				blurb: "Massive seven-hooded serpent sheltering a Shiva linga, cut from one boulder in the temple courtyard.",
			},
			{
				name: "Fresco Ceilings",
				blurb: "Vijayanagara-era mural panels, including one of the largest ancient frescoes in the country.",
			},
			{
				name: "Kalyana Mantapa",
				blurb: "The unfinished open-air marriage hall, its pillars carved with gods assembled for Shiva's wedding.",
			},
		],
		travelTips: [
			"Carry photo ID for everyone — the route crosses into Andhra Pradesh, and the cab's inter-state permit is billed extra at actuals.",
			"Reach the temple before 10 am; the granite floor becomes painfully hot for bare feet by midday.",
			"Hire a local guide at the entrance (about ₹200–300) — the hanging pillar and murals mean far more with the stories.",
			"NH-44 tolls between Bangalore and the Kodikonda exit are extra at actuals.",
			"Combine Lepakshi with Nandi Hills or Adiyogi on the return if you want a full day out.",
		],
		faqs: [
			{
				question: "Is a one-way drop to Lepakshi available?",
				answer: "Yes, the sedan one-way fare is ₹2,100. Since Lepakshi village has virtually no return cabs, most guests book the ₹3,300 round trip with the driver waiting at the temple.",
			},
			{
				question: "Do we need to carry ID for the Andhra Pradesh border?",
				answer: "Yes, carry photo ID for all passengers as the route crosses into Andhra Pradesh. The driver handles the vehicle's inter-state permit, which is charged extra at actuals.",
			},
			{
				question: "How long does Bangalore to Lepakshi take by taxi?",
				answer: "About two and a half hours for the 120 km run — mostly smooth NH-44 driving, with the last 12–15 km on a state road after the Kodikonda exit. An early start avoids both airport-road traffic and the midday heat.",
			},
			{
				question: "How much time is needed at the temple?",
				answer: "Ninety minutes to two hours covers the Veerabhadra temple, the hanging pillar, the Naga Linga and the monolithic Nandi nearby. Add a bit more if you take a guided walk, which is worth it here.",
			},
			{
				question: "Can we combine Lepakshi with Nandi Hills in one day?",
				answer: "Yes — both sit off the same NH-44 corridor. The usual plan is Lepakshi in the morning and Nandi Hills or the Adiyogi statue on the way back; the extra distance is billed per the rate card.",
			},
		],
		relatedRoutes: ["nandi-hills", "adiyogi-chikkaballapur", "tirupati", "hampi"],
		packageSlugs: [],
		popular: true,
		rating: 4.8,
		homepageRail: "weekend",
	},
	{
		slug: "shivanasamudra",
		name: "Shivanasamudra Falls",
		image: shivanaSamudra,
		category: "waterfalls",
		distanceKm: 135,
		durationHrs: 3,
		days: 1,
		fares: { sedan: { oneWay: 2799, roundTrip: 4999 } },
		summary:
			"Twin Kaveri waterfalls — Gaganachukki and Bharachukki — at full roar from July to October, 135 km from the city.",
		intro: [
			"Here the Kaveri splits around an island and plunges nearly 90 metres in two segmented cataracts — Gaganachukki and Bharachukki. From Bangalore you can drive via Kanakapura Road through Sathanur and Malavalli, or take Mysore Road to Maddur and cut across; both work out to around three hours for the 135 km.",
			"Timing is everything. From July to October, with the monsoon feeding the river, the falls are at full thunder and the spray carries right across the viewpoints; by late winter the flow thins considerably. Gaganachukki is viewed from railed platforms, while Bharachukki — a 20-minute drive around the gorge — has steps leading close to the water and coracle rides when the current permits. Swimming is strictly prohibited; the undertow here is genuinely dangerous.",
			"The 13th-century Keshava temple at Somanathapura and the buried temple town of Talakadu both sit close to the route, and either makes a worthwhile detour on the drive back.",
		],
		sights: [
			{
				name: "Gaganachukki Falls",
				blurb: "The wilder of the twin falls, viewed in full spread from railed platforms on the Shivanasamudra side.",
			},
			{
				name: "Bharachukki Falls",
				blurb: "Broader, terraced cascade a short drive around the gorge, with steps leading close to the water.",
			},
			{
				name: "Coracle Rides",
				blurb: "Round parisal boats at Bharachukki that spin you across the pool when water levels are safe.",
			},
			{
				name: "Madhya Ranganathaswamy Temple",
				blurb: "Ancient Vishnu temple on the river island, one of the three sacred Ranganatha shrines on the Kaveri.",
			},
			{
				name: "Talakadu",
				blurb: "Temple town half-buried in river sand, excavated shrines and all — an atmospheric detour.",
			},
			{
				name: "Somanathapura Keshava Temple",
				blurb: "Star-shaped 13th-century Hoysala masterpiece, among the finest carved temples in Karnataka.",
			},
		],
		travelTips: [
			"Visit between July and October for peak flow; by March the falls are down to a trickle.",
			"Never enter the water — currents below both falls are lethal, and drownings have occurred here.",
			"Coracle rides at Bharachukki run only when levels are safe; pay the boatmen directly.",
			"Reach before 10 am on weekends — the steps at Bharachukki get crowded by late morning.",
			"Add Somanathapura's Keshava temple on the return; it is one of the finest Hoysala monuments anywhere.",
		],
		faqs: [
			{
				question: "When is the best time to visit Shivanasamudra Falls?",
				answer: "July to October, when the monsoon-fed Kaveri is at full flow and both falls are thundering. The falls shrink steadily after December and are a thin trickle by summer.",
			},
			{
				question: "Can we see both Gaganachukki and Bharachukki in one trip?",
				answer: "Yes — they are two arms of the same falls. You view Gaganachukki from its platforms first, then drive about 20 minutes around the gorge to Bharachukki, where steps lead down near the water.",
			},
			{
				question: "Is swimming or bathing allowed at the falls?",
				answer: "No. The undertow below both falls is extremely dangerous and swimming is strictly prohibited. Coracle rides at Bharachukki operate only when the water level is judged safe.",
			},
			{
				question: "Is a one-way drop to Shivanasamudra available?",
				answer: "Yes, the sedan one-way fare is ₹2,799, though nearly everyone books the ₹4,999 round trip — there is no realistic way to find a return cab at the falls. Tolls and parking are extra at actuals.",
			},
			{
				question: "Can we add Talakadu or Somanathapura to the trip?",
				answer: "Easily — both are short detours off the return route and together add two to three hours. The extra kilometres are billed per the rate card, and the Hoysala carvings at Somanathapura alone justify the stop.",
			},
		],
		relatedRoutes: ["mysore", "hogenakkal", "nandi-hills", "coorg"],
		packageSlugs: [],
		popular: true,
		rating: 4.6,
		homepageRail: "weekend",
	},
	{
		slug: "mysore",
		name: "Mysore",
		image: mysorePalace,
		category: "heritage",
		distanceKm: 145,
		durationHrs: 3.5,
		days: 1,
		fares: { sedan: { oneWay: 2799, roundTrip: 5100 } },
		summary:
			"The palace city, now just 3 hours away on the NH-275 expressway — palace, Chamundi Hills and Srirangapatna en route.",
		intro: [
			"The Bengaluru–Mysuru Expressway (NH-275) changed this trip completely: since it fully opened in 2023, the 145 km run is an access-controlled cruise of about three hours door to door, bypassing the old bottlenecks at Ramanagara, Maddur and Mandya. Toll plazas along the way are billed extra at actuals.",
			"A one-day itinerary works well with a 6:30 am start: Mysore Palace when it opens, then Chamundi Hills, St. Philomena's Cathedral and the zoo, with Srirangapatna — Tipu Sultan's island capital, home to the Daria Daulat Bagh and the Ranganathaswamy temple — as a stop on the drive back. If you can plan around a Sunday or public holiday, stay for the palace illumination, when nearly 100,000 bulbs light the facade from 7 to 7:45 pm.",
			"Overnight visitors can add the Brindavan Gardens musical fountain in the evening and the flower and silk lanes of Devaraja Market the next morning. One-way drops are available on this corridor, and it is comfortably our most-driven route.",
		],
		sights: [
			{
				name: "Mysore Palace",
				blurb: "The Wadiyars' Indo-Saracenic showpiece — stained glass, gilded halls and the famous Sunday illumination.",
			},
			{
				name: "Chamundi Hills",
				blurb: "Hilltop Chamundeshwari temple and the giant Nandi, with sweeping views over the city.",
			},
			{
				name: "St. Philomena's Cathedral",
				blurb: "Neo-Gothic cathedral with twin 175-ft spires, one of the tallest churches in India.",
			},
			{
				name: "Mysore Zoo",
				blurb: "One of India's oldest and best-kept zoos, an easy two-hour walk with kids.",
			},
			{
				name: "Brindavan Gardens",
				blurb: "Terraced gardens below the KRS dam, famous for the evening musical fountain show.",
			},
			{
				name: "Srirangapatna",
				blurb: "Tipu Sultan's island capital en route — Daria Daulat Bagh, the fort and the Ranganathaswamy temple.",
			},
			{
				name: "Devaraja Market",
				blurb: "Century-old bazaar stacked with flowers, fruit, sandalwood and Mysore silk.",
			},
		],
		travelTips: [
			"Expressway tolls (two plazas each way) are extra at actuals; with two-wheelers banned from NH-275, the cruise is genuinely smooth.",
			"Enter the palace right at the 10 am opening — ticket queues triple by noon on weekends.",
			"Catch the palace illumination on Sundays and public holidays from 7 to 7:45 pm.",
			"Do Srirangapatna as a stop on the return leg rather than a separate detour.",
			"Make it an overnight trip if you want the Brindavan Gardens fountain show at a relaxed pace.",
		],
		faqs: [
			{
				question: "Is a one-way drop to Mysore available?",
				answer: "Yes — the sedan one-way fare is ₹2,799 and the round trip is ₹5,100. One-way drops are popular on this corridor since the expressway makes it a three-hour hop.",
			},
			{
				question: "How long does Bangalore to Mysore take by taxi now?",
				answer: "About three hours door to door on the NH-275 expressway, which fully opened in 2023. Add 30–45 minutes if you are starting from the far east of Bangalore in peak traffic.",
			},
			{
				question: "Are the expressway tolls included in the fare?",
				answer: "No — the fare includes fuel and driver bata, while the two toll plazas each way are billed extra at actuals. Parking at the palace and other monuments is also extra.",
			},
			{
				question: "Is one day enough for Mysore?",
				answer: "Yes, with a 6:30 am start you can cover the palace, Chamundi Hills, St. Philomena's and the zoo, plus a Srirangapatna stop on the way back. Stay overnight if you also want the Brindavan Gardens fountain show.",
			},
			{
				question: "When is the Mysore Palace illumination?",
				answer: "The facade is lit by nearly 100,000 bulbs on Sundays and public holidays from 7 to 7:45 pm, and nightly during the Dasara season. If you stay for it, expect to be back in Bangalore around 11 pm.",
			},
			{
				question: "Do you have a fixed Mysore sightseeing package?",
				answer: "Yes — our Mysore one-day tour package bundles the round trip with a set sightseeing circuit and fixed pricing. It is the easiest option if you would rather not plan stops yourself.",
			},
		],
		relatedRoutes: ["coorg", "ooty", "shivanasamudra", "wayanad"],
		packageSlugs: [
			"mysore-1-day-tour",
			"ooty-mysore-3-days",
			"mysore-coorg-3-days",
			"mysore-ooty-coorg-4-days",
		],
		popular: true,
		rating: 4.9,
		homepageRail: "weekend",
	},
	{
		slug: "adiyogi-chikkaballapur",
		name: "Adiyogi Chikkaballapur",
		image: ishaFoundation,
		category: "spiritual",
		distanceKm: 65,
		durationHrs: 1.5,
		days: 1,
		fares: { sedan: { roundTrip: 3300 } },
		summary:
			"The 112-ft Adiyogi at Sadhguru Sannidhi near Chikkaballapur, best visited for the spectacular evening light show.",
		intro: [
			"The 112-ft Adiyogi bust at Sadhguru Sannidhi, unveiled near Chikkaballapur in early 2023, has become one of the most striking evening trips out of Bangalore. It sits about 65 km up NH-44 past the airport — an easy hour-and-a-half drive when the airport-road traffic behaves.",
			"Most visitors plan around the Adiyogi Divya Darshanam, a light-and-sound projection on the statue held after sunset. Aim to arrive by 5:30–6 pm to park, walk the campus and find a spot before the show begins; you are typically back in Bangalore by 9:30–10 pm. Entry to the campus and the show is free, and there are food stalls on site.",
			"This corridor runs as a round trip only — return cabs from the Sannidhi are scarce, so your driver waits on site through the visit. It pairs naturally with a Nandi Hills sunrise or the Bhoga Nandeeshwara temple for a full day out, since the base of the hills is only minutes away.",
		],
		sights: [
			{
				name: "112-ft Adiyogi Statue",
				blurb: "The colossal steel face of Shiva as the first yogi, sibling to the famous Coimbatore Adiyogi.",
			},
			{
				name: "Adiyogi Divya Darshanam",
				blurb: "The after-sunset light-and-sound projection on the statue — the main reason to time an evening visit.",
			},
			{
				name: "Sadhguru Sannidhi Campus",
				blurb: "Landscaped meditation spaces, walkways and food stalls spread around the statue's forecourt.",
			},
			{
				name: "Bhoga Nandeeshwara Temple",
				blurb: "Superbly preserved 9th-century temple complex at the base of Nandi Hills, a short drive away.",
			},
			{
				name: "Nandi Hills",
				blurb: "The sunrise fortress hill nearby — the classic pairing for a full-day trip.",
			},
			{
				name: "Skandagiri",
				blurb: "Neighbouring peak known for permit-based night treks to a sunrise above the clouds.",
			},
		],
		travelTips: [
			"Arrive by 5:30–6 pm on weekends — parking and good viewing spots for the light show fill up early.",
			"The light show runs after sunset and timings shift with season, so confirm before you leave.",
			"Entry is free; footwear comes off before the Adiyogi forecourt, so slip-ons help.",
			"This route is round trip only — your driver waits on site through the visit.",
			"Club it with a Nandi Hills sunrise or Bhoga Nandeeshwara temple for a full day out.",
		],
		faqs: [
			{
				question: "What time is the Adiyogi light show?",
				answer: "The Adiyogi Divya Darshanam runs after sunset, typically in the 7–7:30 pm window depending on season, and lasts around 15 minutes. Reach by 5:30–6 pm on weekends to park and find a good spot.",
			},
			{
				question: "Why is there no one-way fare for this route?",
				answer: "The Sannidhi has almost no return cabs, so we run this corridor as a round trip only — ₹3,300 by sedan, with the driver waiting on site through your visit. The fare includes fuel and driver bata; tolls and parking are extra.",
			},
			{
				question: "Is there an entry fee at Sadhguru Sannidhi?",
				answer: "No — entry to the campus, darshan of the Adiyogi and the light show are all free. Food stalls on site are reasonably priced, and there is no advance booking needed for regular visits.",
			},
			{
				question: "How long is the drive from Bangalore?",
				answer: "About an hour and a half for the 65 km run up NH-44 past the airport. Evening departures around 4 pm comfortably beat the show; the return after 9 pm is quick on empty roads.",
			},
			{
				question: "Can we combine Adiyogi with Nandi Hills?",
				answer: "Yes, the base of Nandi Hills is minutes away. The classic plan is a sunrise at the hilltop, Bhoga Nandeeshwara temple mid-morning and the Adiyogi light show in the evening — our Nandi Hills + Adiyogi one-day package covers it.",
			},
		],
		relatedRoutes: ["nandi-hills", "lepakshi", "tirupati"],
		packageSlugs: ["nandi-hills-adiyogi-1-day"],
		popular: false,
		rating: 4.5,
		homepageRail: "weekend",
	},
	{
		slug: "chikmagalur",
		name: "Chikmagalur",
		image: chickmagaluru,
		category: "hills",
		distanceKm: 245,
		durationHrs: 5.5,
		days: 2,
		fares: { sedan: { oneWay: 4800, roundTrip: 8800 } },
		summary:
			"Coffee country below Mullayanagiri, Karnataka's highest peak — estates, waterfalls and Hoysala temples en route.",
		intro: [
			"Karnataka's coffee heartland is a 245 km run on NH-75 — out through Nelamangala, Kunigal and Channarayapatna to Hassan, then the Belur road into the hills. Leave by 6 am and you clear the Nelamangala stretch before truck traffic builds, reaching Chikmagalur town for a late lunch even with a breakfast stop.",
			"The Hoysala temples at Belur and Halebidu sit right on the corridor, and their carved friezes deserve two or three hours en route. Above the town, the road climbs toward Mullayanagiri — at 1,930 metres the highest peak in Karnataka — and on steep ghat pulls like this the AC stays off, as it does on all our hill routes.",
			"Two days is the sensible minimum: day one for the drive and the Belur–Halebidu stop, day two for Mullayanagiri, Baba Budangiri and a coffee-estate walk before the return. Hebbe Falls near Kemmangundi needs a local 4x4 for the final stretch; your cab drops you at the jeep point.",
		],
		sights: [
			{
				name: "Mullayanagiri Peak",
				blurb: "Karnataka's highest point at 1,930 m, with a small hilltop temple and huge Western Ghats views.",
			},
			{
				name: "Baba Budangiri",
				blurb: "Sacred peak and shrine where coffee first arrived in India, ringed by grassy ridgelines.",
			},
			{
				name: "Coffee Museum",
				blurb: "Quick primer on how Chikmagalur's estates grow, pulp and roast their beans.",
			},
			{
				name: "Hirekolale Lake",
				blurb: "Calm reservoir just outside town with mirror reflections of the Mullayanagiri range at sunset.",
			},
			{
				name: "Kemmangundi & Hebbe Falls",
				blurb: "Hill station gardens and a two-stage waterfall reached by shared 4x4 from the jeep point.",
			},
			{
				name: "Belur Chennakeshava Temple",
				blurb: "Star-shaped Hoysala masterpiece en route, its bracket figures among India's finest carving.",
			},
			{
				name: "Halebidu Hoysaleswara Temple",
				blurb: "The old Hoysala capital's twin-shrined temple, wrapped in bands of sculpted friezes.",
			},
		],
		travelTips: [
			"Leave Bangalore by 6 am to clear Nelamangala before truck traffic builds on NH-75.",
			"Stop at Belur and Halebidu on the way in — the Hoysala carvings deserve at least two hours.",
			"AC stays off on the Mullayanagiri and Baba Budangiri climbs, as on all steep ghat sections.",
			"Hebbe Falls needs a shared local 4x4 from the Kemmangundi jeep point; budget ₹400–500 per head.",
			"Carry leech protection if you plan monsoon treks — the trails are famously leechy from June to September.",
		],
		faqs: [
			{
				question: "How long does Bangalore to Chikmagalur take by taxi?",
				answer: "Around five and a half hours for the 245 km via NH-75 and Hassan, including a breakfast halt. A 6 am start gets you into town for a late lunch even with a Belur stop.",
			},
			{
				question: "Can we visit Belur and Halebidu on the way?",
				answer: "Yes — both sit just off the route between Hassan and Chikmagalur and add two to three hours to day one. It is the natural way to see them without a separate trip.",
			},
			{
				question: "Does the cab stay with us for local sightseeing?",
				answer: "Yes, on the two-day round trip the driver stays overnight and covers your local circuit — fuel and driver bata are included, with a 300 km/day cap and extra kilometres billed per the rate card. Tolls, parking and entry fees are extra.",
			},
			{
				question: "Can the cab go up to Mullayanagiri?",
				answer: "The tarred road runs to a car park near the summit, from where a short flight of steps leads to the peak temple. The climb is steep and narrow, and the AC stays off on this stretch per hill policy.",
			},
			{
				question: "How do we reach Hebbe Falls?",
				answer: "Regular cabs cannot do the last stretch — it is a rough track from Kemmangundi covered by shared local 4x4 jeeps, roughly ₹400–500 per head. Your cab drops and picks you up at the jeep point.",
			},
		],
		relatedRoutes: ["coorg", "sakleshpur", "mysore", "udupi"],
		packageSlugs: ["chikmagalur-2-days"],
		popular: true,
		rating: 4.7,
		homepageRail: "extended",
	},
	{
		slug: "coorg",
		name: "Coorg (Madikeri)",
		image: coorg,
		category: "hills",
		distanceKm: 265,
		durationHrs: 6,
		days: 2,
		fares: { sedan: { oneWay: 4800, roundTrip: 8800 } },
		summary:
			"Misty Kodagu hills — Abbey Falls, Dubare elephants and coffee estates, the classic overnight drive from Bangalore.",
		intro: [
			"Most of our Coorg trips run via the Mysore expressway (NH-275), then Hunsur and Kushalnagar before the ghat climb to Madikeri — about 265 km and six hours with a breakfast halt. An alternative via Kunigal, Hassan and Somwarpet exists, but the Mysore route is faster and better surfaced for most of the year.",
			"The Kushalnagar cluster comes first, so cover it on the way in: the Namdroling Monastery's Golden Temple at Bylakuppe, the Dubare elephant camp across the river, and the bamboo island of Nisargadhama. Then the road lifts into Madikeri's mist — AC off on the ghat climb, per hill policy — for Abbey Falls, Raja's Seat at sunset and the Omkareshwara temple in town.",
			"Plan two days minimum; a third lets you add Talakaveri, the source of the Kaveri, or a Mandalpatti jeep run above the clouds. October to February is crisp and clear; the monsoon is spectacularly green but comes with serious rain.",
		],
		sights: [
			{
				name: "Abbey Falls",
				blurb: "Coffee-estate waterfall minutes from Madikeri, at its loudest right after the monsoon.",
			},
			{
				name: "Raja's Seat",
				blurb: "The old kings' sunset pavilion, looking out over folded green valleys.",
			},
			{
				name: "Dubare Elephant Camp",
				blurb: "Forest camp on the Kaveri where you can watch and help bathe elephants in the morning.",
			},
			{
				name: "Golden Temple, Bylakuppe",
				blurb: "Namdroling Monastery's gilded prayer halls in India's second-largest Tibetan settlement, en route.",
			},
			{
				name: "Nisargadhama",
				blurb: "Bamboo-grove river island near Kushalnagar, reached by a hanging bridge.",
			},
			{
				name: "Talakaveri",
				blurb: "The source of the Kaveri high on the Brahmagiri ridge, with a temple tank and big views.",
			},
			{
				name: "Omkareshwara Temple",
				blurb: "Unusual 1820s Shiva temple in Madikeri blending Islamic domes with a temple tank.",
			},
			{
				name: "Mandalpatti Viewpoint",
				blurb: "Grassland ridge above the clouds, reached by a rough jeep track from Madikeri.",
			},
		],
		travelTips: [
			"Cover Bylakuppe, Dubare and Nisargadhama on the drive in — all three sit before the Madikeri climb.",
			"Dubare's elephant interaction runs in the morning (roughly 9–11 am); plan it for day two if you arrive late.",
			"Mandalpatti is jeep-only — hire a local 4x4 in Madikeri for about ₹1,500–2,000.",
			"AC is switched off on the ghat climb into Madikeri, per hill policy.",
			"Homestays sell out on long weekends; lock your stay before confirming travel dates.",
		],
		faqs: [
			{
				question: "Which route does the taxi take to Coorg?",
				answer: "Usually the Mysore expressway (NH-275), then Hunsur and Kushalnagar before the ghat climb to Madikeri — about six hours with a breakfast halt. It is faster and better surfaced than the Hassan–Somwarpet alternative.",
			},
			{
				question: "Is a one-way drop to Coorg available?",
				answer: "Yes, a sedan one-way drop is ₹4,800; the two-day round trip is ₹8,800. One-ways suit guests staying longer in Kodagu who will arrange their own return.",
			},
			{
				question: "What does the two-day fare include?",
				answer: "Fuel and driver bata for both days, with the driver staying overnight and covering your local sightseeing within the 300 km/day cap. Tolls, parking, entry fees and any extra kilometres are billed separately.",
			},
			{
				question: "When should we visit Dubare elephant camp?",
				answer: "The elephant bathing and feeding interaction runs in the morning, roughly 9–11 am, with a short boat crossing to the camp. It sits near Kushalnagar, so slot it on the drive in or on day two's morning.",
			},
			{
				question: "Can our cab drive up to Mandalpatti?",
				answer: "No — the Mandalpatti track is rough and restricted to local 4x4 jeeps, hired in Madikeri for about ₹1,500–2,000. Your cab drops you at the jeep pickup point.",
			},
			{
				question: "What is the best season for Coorg?",
				answer: "October to February is crisp, clear and ideal for viewpoints. June to September is dramatically green and misty, but expect heavy rain and occasional roadside landslips on the ghat.",
			},
		],
		relatedRoutes: ["mysore", "chikmagalur", "wayanad", "sakleshpur"],
		packageSlugs: [
			"coorg-2-days",
			"coorg-3-days",
			"mysore-coorg-3-days",
			"mysore-ooty-coorg-4-days",
		],
		popular: true,
		rating: 4.8,
		homepageRail: "extended",
	},
	{
		slug: "ooty",
		name: "Ooty",
		image: ooty,
		category: "hills",
		distanceKm: 270,
		durationHrs: 7,
		days: 2,
		fares: { sedan: { oneWay: 5000, roundTrip: 9000 } },
		summary:
			"The Nilgiris' queen via Bandipur forest — botanical gardens, the toy train and Doddabetta at 2,637 metres.",
		intro: [
			"The Ooty run goes via the Mysore expressway, then Nanjangud and Gundlupet before entering the Bandipur tiger reserve, continuing through Mudumalai and up the Nilgiris — about 270 km, but budget a full seven hours for forest speed limits and the final ghat. One thing is non-negotiable: the Bandipur forest gates close from 9 pm to 6 am, so there is no night crossing and we schedule departures around it.",
			"After Mudumalai the cab climbs either the Kalhatti ghat — 36 numbered hairpins, steep and quick — or the gentler, longer route via Gudalur. Drive slowly through the reserve; spotted deer, elephants and gaur regularly cross the road, and stopping or honking at wildlife is prohibited. The AC goes off on the hairpin climb, as on all steep ghats.",
			"At 2,240 metres, Ooty rewards the effort: the Government Botanical Gardens, the lake, Doddabetta's summit views and the UNESCO-listed Nilgiri Mountain Railway. Two days is the workable minimum; carry proper warm layers from November to February, when nights drop to low single digits.",
		],
		sights: [
			{
				name: "Government Botanical Gardens",
				blurb: "Terraced 1848 gardens with a fern house, old trees and the famous summer flower show.",
			},
			{
				name: "Ooty Lake",
				blurb: "Boat rides on the 2 km artificial lake ringed by eucalyptus — an easy family stop.",
			},
			{
				name: "Doddabetta Peak",
				blurb: "The Nilgiris' highest point at 2,637 m, with a telescope house and valley views on clear days.",
			},
			{
				name: "Nilgiri Mountain Railway",
				blurb: "UNESCO-listed toy train; the Ooty–Coonoor joyride is the easiest section to experience.",
			},
			{
				name: "Tea Museum & Factory",
				blurb: "Working factory on Doddabetta road showing the leaf-to-cup process, with tastings.",
			},
			{
				name: "Rose Garden",
				blurb: "Twenty thousand rose varieties on terraced slopes — best from April to June.",
			},
			{
				name: "Pykara Lake & Falls",
				blurb: "Quiet lake, shola forest and falls about 20 km out on the Gudalur road.",
			},
		],
		travelTips: [
			"Bandipur forest gates close 9 pm–6 am — there is no night crossing, so plan departure times around it.",
			"Wildlife sightings on the drive-through are common; stopping, feeding or honking inside the reserve is prohibited.",
			"AC stays off on the 36-hairpin Kalhatti climb; carry motion-sickness tablets if anyone is prone.",
			"Book the Nilgiri Mountain Railway on IRCTC well ahead — the Ooty–Coonoor joyride sells out fast in season.",
			"Pack real warm clothing from November to February; Ooty nights get close to freezing.",
		],
		faqs: [
			{
				question: "How long does Bangalore to Ooty take by taxi?",
				answer: "About seven hours for the 270 km — three hours to beyond Mysore, then slower going through Bandipur's speed-limited forest roads and the final ghat climb. A 6 am start gets you in by early afternoon.",
			},
			{
				question: "Can we stop at Bandipur for a safari?",
				answer: "You will very likely spot deer, elephants or gaur from the car on the drive-through, but stopping inside the reserve is not allowed. Proper safaris run from the Bandipur and Mudumalai reception centres and need separate booking, which we can time into your itinerary.",
			},
			{
				question: "What are the Bandipur forest gate timings?",
				answer: "The gates on the Gundlupet–Ooty road are closed from 9 pm to 6 am every night, with no exceptions for taxis. We schedule both onward and return legs so you cross well within daylight hours.",
			},
			{
				question: "Is a one-way drop to Ooty available?",
				answer: "Yes, a sedan one-way is ₹5,000 and the two-day round trip is ₹9,000, including fuel and driver bata. Tolls, parking, forest-area charges and extra kilometres beyond the 300 km/day cap are billed separately.",
			},
			{
				question: "How do we ride the Nilgiri toy train?",
				answer: "Book on IRCTC well in advance — the full Mettupalayam–Ooty run fills weeks ahead in season, while the shorter Ooty–Coonoor joyride is easier to get. Your cab can drop you at one station and collect you at the other.",
			},
		],
		relatedRoutes: ["mysore", "coorg", "wayanad", "kodaikanal"],
		packageSlugs: ["ooty-2-days", "ooty-mysore-3-days", "mysore-ooty-coorg-4-days"],
		popular: false,
		rating: 4.6,
		homepageRail: "extended",
	},
	{
		slug: "wayanad",
		name: "Wayanad",
		image: waynad,
		category: "nature",
		distanceKm: 280,
		durationHrs: 6.5,
		days: 2,
		fares: { sedan: { oneWay: 5000, roundTrip: 9000 } },
		summary:
			"Kerala's green highland across the Bandipur–Muthanga forests — caves, dams, lakes and spice country.",
		intro: [
			"Wayanad, Kerala's green highland district, is reached through big forest country. From the Mysore side the cab takes either NH-766 through Bandipur and the Muthanga sanctuary toward Sultan Bathery, or the Nagarhole–Kutta road toward Tholpetty and Mananthavady, depending on where you stay. The Bandipur stretch carries the same hard rule as the Ooty route: gates are shut from 9 pm to 6 am, so we time the crossing for daylight.",
			"The 280 km run takes about six and a half hours with a breakfast halt. Once across the border — carry photo ID; the Kerala inter-state permit is billed extra at actuals — the landscape flips to paddy flats, spice gardens and betel palms almost immediately.",
			"Two days covers the classics: the neolithic carvings inside the Edakkal caves (last entry is mid-afternoon, and it is a proper 30–40 minute climb), Banasura Sagar — India's largest earthen dam — Pookode Lake and Soochipara Falls. Add a third day for the Chembra Peak trek, which needs a forest permit with limited daily slots.",
		],
		sights: [
			{
				name: "Edakkal Caves",
				blurb: "Neolithic rock carvings inside a cleft on Ambukuthi hill, reached by a steep 30–40 minute walk.",
			},
			{
				name: "Banasura Sagar Dam",
				blurb: "India's largest earthen dam, with island-dotted reservoir views and boating.",
			},
			{
				name: "Pookode Lake",
				blurb: "Forest-ringed freshwater lake near Vythiri with pedal boats and an easy walking path.",
			},
			{
				name: "Soochipara Falls",
				blurb: "Three-tiered waterfall near Meppadi, reached by a short forest trail.",
			},
			{
				name: "Chembra Peak",
				blurb: "Wayanad's highest peak, with the heart-shaped lake trek — permit required, limited daily slots.",
			},
			{
				name: "Thirunelli Temple",
				blurb: "Ancient Vishnu temple in a Brahmagiri valley, near the Tholpetty side of the district.",
			},
			{
				name: "Kuruva Island",
				blurb: "Bamboo-forested river delta on the Kabini, open seasonally for guided walks.",
			},
		],
		travelTips: [
			"Time both forest crossings for daylight — the Bandipur–Muthanga stretch is closed 9 pm–6 am.",
			"Carry photo ID for all passengers; the Kerala inter-state permit is billed extra at actuals.",
			"Edakkal caves stop admitting visitors by mid-afternoon and involve a steep 30–40 minute walk — go early with good shoes.",
			"The Chembra Peak trek needs a forest department permit with limited daily slots; arrange it a day ahead.",
			"June to September is lush but very wet — some waterfalls and treks close at monsoon peak.",
		],
		faqs: [
			{
				question: "Which route does the taxi take to Wayanad?",
				answer: "Via Mysore, then either NH-766 through Bandipur–Muthanga toward Sultan Bathery, or the Nagarhole–Kutta road toward Mananthavady — we pick based on where your stay is. Both cross reserve forest with a 9 pm–6 am closure, so departures are planned around daylight crossings.",
			},
			{
				question: "Do we need any permit to enter Kerala by taxi?",
				answer: "The vehicle needs a Kerala inter-state permit, which the driver arranges and bills at actuals. Passengers just need to carry photo ID.",
			},
			{
				question: "Is two days enough for Wayanad?",
				answer: "Two days covers Edakkal, Banasura Sagar, Pookode Lake and Soochipara Falls at a reasonable pace. Add a third day if you want the Chembra Peak trek, which needs a forest permit with limited daily slots.",
			},
			{
				question: "What should we know before visiting Edakkal caves?",
				answer: "Entry closes by mid-afternoon and the approach is a steep 30–40 minute uphill walk, so go in the morning with proper shoes. The neolithic carvings inside the rock shelter are worth the effort.",
			},
			{
				question: "Is a one-way drop to Wayanad available?",
				answer: "Yes — sedan one-way is ₹5,000 and the two-day round trip is ₹9,000, including fuel and driver bata. Tolls, the Kerala permit, parking and extra kilometres beyond the 300 km/day cap are billed separately.",
			},
		],
		relatedRoutes: ["coorg", "ooty", "mysore"],
		packageSlugs: ["wayanad-2-days"],
		popular: false,
		rating: 4.5,
		homepageRail: "extended",
	},
	{
		slug: "hogenakkal",
		name: "Hogenakkal Falls",
		image: hogenakkalFalls,
		category: "waterfalls",
		distanceKm: 130,
		durationHrs: 3,
		days: 1,
		fares: { sedan: { oneWay: 2999, roundTrip: 5199 } },
		summary:
			"The 'Niagara of India' on the Kaveri — coracle rides beneath roaring falls, a long but easy day trip.",
		intro: [
			"The 'Niagara of India' sits where the Kaveri tears through a rocky gorge on the Karnataka–Tamil Nadu border, about 130 km from Bangalore. The run goes down NH-44 through Hosur toward Dharmapuri, then west on state roads to the falls — around three hours each way, which makes this a long but comfortable single-day trip.",
			"The thing to do here is the coracle ride: boatmen spin the round parisal boats through the channels and, when the flow allows, right up to the spray beneath the falls. Rides are paid directly to the operators — expect roughly ₹750–1,000 per coracle for a standard loop. The riverside rows of fried-fish stalls and the traditional oil-massage huts are half the experience.",
			"Flow peaks from August to November; rides get suspended during flood surges, and the falls thin out by late summer. You cross into Tamil Nadu, so the cab's inter-state permit is extra — carry photo ID. Start by 6:30 am and you are back in Bangalore for a late dinner.",
		],
		sights: [
			{
				name: "Hogenakkal Main Falls",
				blurb: "The Kaveri crashing through a rocky gorge in multiple channels — loudest August to November.",
			},
			{
				name: "Coracle (Parisal) Rides",
				blurb: "Spinning round-boat rides through the gorge channels, right up to the spray when flow permits.",
			},
			{
				name: "Fried-Fish Stalls",
				blurb: "Riverside rows frying the day's Kaveri catch with local masalas — a Hogenakkal institution.",
			},
			{
				name: "Oil Massage Huts",
				blurb: "Traditional riverside massages followed by a dip at the bathing ghats.",
			},
			{
				name: "Theerthamalai Temple",
				blurb: "Hilltop Shiva temple with a spring-fed theertham, a possible side trip via Harur.",
			},
		],
		travelTips: [
			"Start by 6:30 am — three hours each way plus three to four hours at the falls makes a full day.",
			"Coracle rides are paid directly to boatmen, about ₹750–1,000 per boat; agree the route and price before boarding.",
			"Rides are suspended during flood surges at monsoon peak — check conditions before travelling in August–September.",
			"The route crosses into Tamil Nadu; the inter-state permit is extra at actuals, so carry photo ID.",
			"Watch your footing near the gorge — the rocks stay wet and many stretches have no railings.",
		],
		faqs: [
			{
				question: "How long is the drive from Bangalore to Hogenakkal?",
				answer: "About three hours for the 130 km — NH-44 through Hosur toward Dharmapuri, then state roads west to the falls. It is comfortably doable as a day trip with an early start.",
			},
			{
				question: "Is the coracle ride included in the taxi fare?",
				answer: "No — coracle rides are run by local boatmen and paid directly, typically ₹750–1,000 per boat seating four to six. Agree on the route and price before you board.",
			},
			{
				question: "When is the best time to visit Hogenakkal?",
				answer: "August to January, when the Kaveri runs strong and the gorge is at its loudest. During monsoon flood surges the coracles stop operating, and by late summer the flow thins considerably.",
			},
			{
				question: "Are tolls and permits included in the fare?",
				answer: "The fare covers fuel and driver bata. NH-44 tolls and the Tamil Nadu inter-state permit are billed extra at actuals — carry photo ID for the border crossing.",
			},
			{
				question: "Is one day really enough for Hogenakkal?",
				answer: "Yes — leave by 6:30 am, spend three to four hours at the falls with a coracle ride and lunch, and you are back in Bangalore by around 8 pm. The sedan round trip is ₹5,199.",
			},
		],
		relatedRoutes: ["shivanasamudra", "salem", "vellore", "chennai"],
		packageSlugs: [],
		popular: true,
		rating: 4.4,
		homepageRail: "extended",
	},
	{
		slug: "chennai",
		name: "Chennai",
		image: chennai,
		category: "city",
		distanceKm: 345,
		durationHrs: 6.5,
		days: 2,
		fares: { sedan: { oneWay: 6200, roundTrip: 10200 } },
		summary:
			"Coastal metro run down NH-48 — Marina Beach, Fort St. George and the gateway to Mahabalipuram.",
		intro: [
			"The Chennai run is a 345 km highway day on NH-48: out through Hoskote and Kolar, a brief cut through Andhra Pradesh near Chittoor, then into Tamil Nadu past Ranipet and Sriperumbudur and on into the city. With a meal break it takes about six and a half hours; the highway is four-laned throughout, with several toll plazas billed at actuals.",
			"Start by 5 am and you beat both Bangalore's outbound crawl and Chennai's evening peak, arriving by early afternoon. The traditional halt is a biryani lunch at Ambur — or the Sripuram Golden Temple detour at Vellore if you have an hour to spare.",
			"In the city, Marina Beach, the Kapaleeshwarar temple in Mylapore, Fort St. George and Santhome Basilica anchor a solid day of sightseeing, and Mahabalipuram's shore temples are only an hour further down the East Coast Road. Since the route crosses both Andhra Pradesh and Tamil Nadu, two inter-state permits apply, billed extra at actuals.",
		],
		sights: [
			{
				name: "Marina Beach",
				blurb: "One of the world's longest urban beaches — best at dawn or after 5 pm with the food stalls out.",
			},
			{
				name: "Kapaleeshwarar Temple",
				blurb: "Mylapore's towering Dravidian gopuram and tank, the heart of old Chennai.",
			},
			{
				name: "Fort St. George",
				blurb: "The East India Company's first fortress (1644), now housing a museum and St. Mary's Church.",
			},
			{
				name: "Santhome Basilica",
				blurb: "Neo-Gothic basilica built over the tomb of St. Thomas the Apostle.",
			},
			{
				name: "Government Museum, Egmore",
				blurb: "Superb bronze gallery and one of India's oldest museum complexes.",
			},
			{
				name: "Besant Nagar Beach",
				blurb: "Elliot's Beach — calmer sands, cafes and the Ashtalakshmi temple nearby.",
			},
			{
				name: "Mahabalipuram",
				blurb: "UNESCO-listed shore temples and rock carvings an hour south on the ECR — the classic add-on day.",
			},
		],
		travelTips: [
			"Start by 5 am to skip Bangalore's outbound crawl and reach before Chennai's evening peak.",
			"NH-48 has several toll plazas; tolls plus the Andhra and Tamil Nadu permits are billed extra at actuals.",
			"Plan the classic Ambur biryani lunch stop — it splits the drive almost perfectly.",
			"Chennai traffic is heaviest 5–9 pm; schedule beach and temple visits around it.",
			"Keep a day for Mahabalipuram if you can — the shore temples are an easy hour down the ECR.",
		],
		faqs: [
			{
				question: "How long does Bangalore to Chennai take by taxi?",
				answer: "About six and a half hours for the 345 km on NH-48, including a meal break. Add time if you arrive into Chennai during the 5–9 pm peak, which is worth planning around.",
			},
			{
				question: "Is a one-way drop to Chennai available?",
				answer: "Yes — the sedan one-way is ₹6,200, popular for relocations and onward flights, and the two-day round trip is ₹10,200. Both include fuel and driver bata.",
			},
			{
				question: "Are tolls and inter-state permits included?",
				answer: "No — NH-48 has several toll plazas, and the route crosses both Andhra Pradesh and Tamil Nadu, so two inter-state permits apply. All are billed extra at actuals; carry photo ID.",
			},
			{
				question: "Can we stop at Vellore or Ambur on the way?",
				answer: "Yes — Ambur's biryani lunch stop is practically a tradition on this route, and the Sripuram Golden Temple at Vellore is a short detour if you have an extra hour. Both sit right on the corridor.",
			},
			{
				question: "Can we add Mahabalipuram to the trip?",
				answer: "Easily — the UNESCO shore temples are about an hour south of Chennai on the East Coast Road, and most guests slot them into day two. Extra kilometres beyond the 300 km/day cap are billed per the rate card.",
			},
		],
		relatedRoutes: ["pondicherry", "vellore", "tirupati", "salem"],
		packageSlugs: [],
		popular: true,
		rating: 4.4,
		homepageRail: "extended",
	},
];
