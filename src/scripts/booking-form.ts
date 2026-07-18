/**
 * Booking form behavior: date bounds, conditional fields per booking type,
 * inline validation via the Constraint Validation API, WhatsApp handoff on
 * submit, and page-wide pre-fill from cards that carry
 * [data-booking-type] / [data-cab-type].
 */

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const form = document.querySelector<HTMLFormElement>("#booking-form form");

if (form) {
	const field = <T extends Field = HTMLInputElement>(name: string): T =>
		form.elements.namedItem(name) as T;

	const bookingType = field<HTMLSelectElement>("bookingType");
	const cabType = field<HTMLSelectElement>("cabType");
	const pickup = field("pickup");
	const drop = field("drop");
	const mobile = field("mobile");
	const dateInput = field("date");
	const status = document.getElementById("form-status")!;

	// --- Date bounds: today .. +30 days, in LOCAL time (toISOString() is UTC
	// and would be a day off for IST evenings).
	const formatLocal = (date: Date) =>
		`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
	const today = new Date();
	const maxDate = new Date();
	maxDate.setDate(maxDate.getDate() + 30);
	dateInput.min = formatLocal(today);
	dateInput.max = formatLocal(maxDate);

	// --- Validation messages, mirroring the original form's copy.
	const MESSAGES: Record<string, Partial<Record<string, string>>> = {
		name: {
			valueMissing: "Full name is required",
			tooShort: "Name must be at least 2 characters long",
			patternMismatch: "Name can only contain letters and spaces",
		},
		mobile: {
			valueMissing: "Mobile number is required",
			patternMismatch:
				"Please enter a valid 10-digit Indian mobile number starting with 6-9",
		},
		pickup: {
			valueMissing: "Pickup location is required",
			tooShort: "Please enter a valid pickup location (minimum 3 characters)",
		},
		drop: {
			valueMissing: "Drop location is required",
			tooShort: "Please enter a valid drop location (minimum 3 characters)",
		},
		date: {
			valueMissing: "Travel date is required",
			rangeUnderflow: "Travel date cannot be in the past",
			rangeOverflow: "Bookings can only be made up to 30 days in advance",
		},
		time: { valueMissing: "Travel time is required" },
		cabType: { valueMissing: "Please select a cab type" },
		bookingType: { valueMissing: "Please select a booking type" },
	};

	const VALIDITY_KEYS = [
		"valueMissing",
		"patternMismatch",
		"tooShort",
		"rangeUnderflow",
		"rangeOverflow",
		"badInput",
		"typeMismatch",
	] as const;

	function messageFor(el: Field): string {
		if (el.validity.customError) return el.validationMessage;
		const rules = MESSAGES[el.name];
		if (rules) {
			for (const key of VALIDITY_KEYS) {
				if (el.validity[key] && rules[key]) return rules[key];
			}
		}
		return el.validationMessage;
	}

	function validateField(el: Field) {
		if (el.name === "drop" && !el.disabled) {
			const same =
				el.value.trim() !== "" &&
				el.value.trim().toLowerCase() === pickup.value.trim().toLowerCase();
			el.setCustomValidity(
				same ? "Drop location must be different from pickup location" : ""
			);
		}
		const errorEl = document.getElementById(`err-${el.name}`);
		if (!errorEl) return;
		const message = el.disabled || el.validity.valid ? "" : messageFor(el);
		errorEl.textContent = message;
		errorEl.classList.toggle("hidden", !message);
		el.setAttribute("aria-invalid", message ? "true" : "false");
	}

	// --- Conditional fields, driven by data-hide on the booking-type options.
	function applyConditions() {
		const hidden = (bookingType.selectedOptions[0]?.dataset.hide ?? "")
			.split(" ")
			.filter(Boolean);
		for (const el of [drop, cabType]) {
			const show = !hidden.includes(el.name);
			el.closest("[data-field]")?.classList.toggle("hidden", !show);
			// Disabled fields are skipped by both validation and FormData.
			el.disabled = !show;
			el.required = show;
			if (!show) validateField(el);
		}
	}

	applyConditions();

	// --- URL-param prefill: every page's CTAs deep-link here, e.g.
	// /book/?type=outstation&drop=Mysore&cab=Sedan&package=coorg-2-days
	const params = new URLSearchParams(location.search);
	const setSelect = (el: HTMLSelectElement, value: string | null) => {
		if (value && Array.from(el.options).some((o) => o.value === value)) {
			el.value = value;
		}
	};
	setSelect(bookingType, params.get("type"));
	applyConditions();
	setSelect(cabType, params.get("cab"));
	for (const [param, el] of [
		["pickup", pickup],
		["drop", drop],
	] as const) {
		const value = params.get(param);
		if (value && !el.disabled) el.value = value.slice(0, 120);
	}
	const pkg = params.get("package");
	if (pkg) {
		const notes = field<HTMLTextAreaElement>("notes");
		notes.value = `Package: ${pkg.slice(0, 80)}`;
	}

	// --- Field-level listeners: validate on blur; once a field has an error,
	// re-validate live so the message clears as the user fixes it.
	form.addEventListener(
		"blur",
		(event) => {
			const el = event.target as Field;
			if (el.name && el.name in MESSAGES) validateField(el);
		},
		true
	);

	form.addEventListener("input", (event) => {
		const el = event.target as Field;
		if (el === mobile) {
			mobile.value = mobile.value.replace(/\D/g, "").slice(0, 10);
		}
		if (el.getAttribute("aria-invalid") === "true") validateField(el);
		if (el === pickup && drop.getAttribute("aria-invalid") === "true") {
			validateField(drop);
		}
	});

	bookingType.addEventListener("change", () => {
		applyConditions();
		validateField(bookingType);
	});

	cabType.addEventListener("change", () => validateField(cabType));

	function showStatus(kind: "success" | "error", message: string) {
		status.textContent = message;
		status.className = `rounded-md p-4 text-sm font-medium ${
			kind === "success"
				? "bg-green-50 text-green-800 border border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800"
				: "bg-red-50 text-red-800 border border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-800"
		}`;
	}

	// --- Submit: validate everything, build the WhatsApp message, hand off.
	form.addEventListener("submit", (event) => {
		event.preventDefault();

		if (!form.checkValidity()) {
			for (const el of Array.from(form.elements)) {
				const f = el as Field;
				if (f.name && f.name in MESSAGES) validateField(f);
			}
			form.querySelector<Field>(":invalid:not(:disabled)")?.focus();
			showStatus(
				"error",
				"Some required fields are missing or contain errors. Please check and try again."
			);
			return;
		}

		const data = Object.fromEntries(new FormData(form)) as Record<
			string,
			string
		>;
		const driverOnly = data.bookingType === "driver-only";
		const bookingTypeName =
			bookingType.selectedOptions[0]?.textContent?.trim() ?? data.bookingType;

		let message = "🚗 *BangaloreUrbanCabs Booking Request*\n\n";
		message += "📋 *Booking Details:*\n";
		message += `👤 Name: ${data.name}\n`;
		message += `📱 Mobile: ${data.mobile}\n`;
		message += driverOnly
			? "🧑‍✈️ Service: Spare Driver (no vehicle)\n"
			: `🚗 Cab Type: ${data.cabType}\n`;
		message += `📍 Pickup: ${data.pickup}\n`;
		if (data.drop) message += `🎯 Drop: ${data.drop}\n`;
		message += `📅 Date: ${data.date}\n`;
		message += `⏰ Time: ${data.time}\n`;
		message += `🎫 Booking Type: ${bookingTypeName}\n`;
		if (data.notes) message += `📝 Notes: ${data.notes}\n`;
		message += "\nPlease confirm the booking and share the fare details. Thank you! 🙏";

		window.open(
			`https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(message)}`,
			"_blank",
			"noopener"
		);

		showStatus(
			"success",
			"Opening WhatsApp… send the pre-filled message and we'll confirm your booking and fare shortly. 🎉"
		);
	});

	// --- Page-wide pre-fill: any element with data-booking-type / data-cab-type
	// (journey cards, pricing "Select" buttons, destination "Book Now", footer
	// service links) sets the matching select. Anchors handle the scrolling.
	document.addEventListener("click", (event) => {
		const trigger = (event.target as Element).closest<HTMLElement>(
			"[data-booking-type], [data-cab-type]"
		);
		if (!trigger) return;
		const { bookingType: bt, cabType: ct } = trigger.dataset;
		if (bt && Array.from(bookingType.options).some((o) => o.value === bt)) {
			bookingType.value = bt;
			applyConditions();
		}
		if (ct && Array.from(cabType.options).some((o) => o.value === ct)) {
			cabType.value = ct;
		}
	});
}
