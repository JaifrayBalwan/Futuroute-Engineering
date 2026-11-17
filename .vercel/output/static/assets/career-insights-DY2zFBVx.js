//#region src/lib/career-insights.ts
var CURRENCY_META = {
	INR: {
		symbol: "₹",
		label: "INR (₹)",
		rateFromInr: 1
	},
	USD: {
		symbol: "$",
		label: "USD ($)",
		rateFromInr: 1 / 84.5
	},
	GBP: {
		symbol: "£",
		label: "GBP (£)",
		rateFromInr: 1 / 107
	},
	EUR: {
		symbol: "€",
		label: "EUR (€)",
		rateFromInr: 1 / 91
	}
};
var INDUSTRY_BASELINES = {
	"Technology & IT": {
		entryInr: [4e5, 9e5],
		midInr: [1e6, 22e5],
		expInr: [24e5, 48e5],
		entryUsd: [62e3, 95e3],
		midUsd: [1e5, 15e4],
		expUsd: [155e3, 23e4],
		eduCostInr: [0, 45e4],
		eduSummary: "₹0 (self-taught + open courses) up to ₹4.5L+ for private B.Tech/BCA degrees",
		months: [4, 12],
		trend: "Growing",
		remote: "High remote availability",
		sectors: [
			"Private tech companies",
			"Startups",
			"SaaS & IT services",
			"Global remote teams"
		],
		hiring: [
			"Software & SaaS",
			"FinTech",
			"E-commerce",
			"Enterprise IT"
		],
		source: "NASSCOM Tech Skills Report & AmbitionBox India / U.S. BLS (2025–2026)"
	},
	"Artificial Intelligence": {
		entryInr: [55e4, 12e5],
		midInr: [14e5, 3e6],
		expInr: [3e6, 6e6],
		entryUsd: [78e3, 118e3],
		midUsd: [125e3, 18e4],
		expUsd: [185e3, 27e4],
		eduCostInr: [0, 6e5],
		eduSummary: "₹0 (open Kaggle/Hugging Face tracks) to ₹6L+ for B.Tech/M.Tech AI programs",
		months: [6, 18],
		trend: "Growing",
		remote: "High remote availability",
		sectors: [
			"AI product firms",
			"R&D labs",
			"Cloud platforms",
			"Healthcare & FinTech AI"
		],
		hiring: [
			"AI & Data Platforms",
			"Cloud Infrastructure",
			"Autonomous & Robotics",
			"Analytics"
		],
		source: "WEF Future of Jobs & AmbitionBox India / U.S. BLS (2025–2026)"
	},
	Sports: {
		entryInr: [24e4, 55e4],
		midInr: [6e5, 14e5],
		expInr: [14e5, 32e5],
		entryUsd: [35e3, 58e3],
		midUsd: [6e4, 95e3],
		expUsd: [95e3, 165e3],
		eduCostInr: [5e3, 35e4],
		eduSummary: "₹5k–₹40k for federation licenses (AIFF/NIS); ₹1.5L–₹3.5L for B.P.Ed/Sports Science",
		months: [4, 15],
		trend: "Growing",
		remote: "Primarily on-site",
		sectors: [
			"Academies & clubs",
			"Sports federations",
			"Fitness brands",
			"Sports analytics tech"
		],
		hiring: [
			"Football & Cricket Academies",
			"Pro Leagues",
			"Sports Tech",
			"Schools & Universities"
		],
		source: "SAI / Khelo India Industry Briefs & Sports Tech Outlook (2025–2026)"
	},
	Healthcare: {
		entryInr: [35e4, 8e5],
		midInr: [85e4, 19e5],
		expInr: [18e5, 42e5],
		entryUsd: [52e3, 85e3],
		midUsd: [85e3, 145e3],
		expUsd: [15e4, 26e4],
		eduCostInr: [5e4, 18e5],
		eduSummary: "₹50k–₹3L in govt colleges (NEET/allied health) up to ₹15L+ in private institutions",
		months: [12, 48],
		trend: "Growing",
		remote: "Primarily on-site",
		sectors: [
			"Public & private hospitals",
			"Clinics",
			"Public health NGOs",
			"Digital health"
		],
		hiring: [
			"Hospital Networks",
			"Diagnostics & Rehab",
			"Public Health",
			"HealthTech"
		],
		source: "National Health Authority Reports & U.S. BLS Healthcare Outlook (2025–2026)"
	},
	"Business & Management": {
		entryInr: [4e5, 85e4],
		midInr: [1e6, 22e5],
		expInr: [22e5, 48e5],
		entryUsd: [55e3, 82e3],
		midUsd: [9e4, 14e4],
		expUsd: [145e3, 225e3],
		eduCostInr: [5e3, 12e5],
		eduSummary: "₹5k–₹1.5L for BBA/B.Com in public universities; ₹4L–₹20L for premier MBA programs",
		months: [4, 15],
		trend: "Stable",
		remote: "Hybrid common",
		sectors: [
			"Corporates",
			"Consulting firms",
			"Startups",
			"Operations & retail"
		],
		hiring: [
			"Consulting",
			"Consumer Goods & Retail",
			"SaaS Startups",
			"Manufacturing"
		],
		source: "AICTE Management Placement Benchmarks & U.S. BLS (2025–2026)"
	},
	Finance: {
		entryInr: [45e4, 1e6],
		midInr: [12e5, 26e5],
		expInr: [25e5, 55e5],
		entryUsd: [62e3, 95e3],
		midUsd: [1e5, 155e3],
		expUsd: [16e4, 25e4],
		eduCostInr: [15e3, 8e5],
		eduSummary: "₹15k–₹1.5L (B.Com/CA/NISM tracks) up to ₹8L+ for CFA/MBA Finance pathways",
		months: [6, 24],
		trend: "Growing",
		remote: "Hybrid common",
		sectors: [
			"Banks & NBFCs",
			"Investment & wealth firms",
			"FinTech",
			"Corporate treasury"
		],
		hiring: [
			"Banking & Markets",
			"FinTech",
			"Audit & Advisory",
			"Insurance"
		],
		source: "AmbitionBox Finance Benchmarks & U.S. BLS Financial Analysts (2025–2026)"
	},
	Law: {
		entryInr: [36e4, 9e5],
		midInr: [9e5, 22e5],
		expInr: [22e5, 5e6],
		entryUsd: [6e4, 98e3],
		midUsd: [105e3, 165e3],
		expUsd: [17e4, 26e4],
		eduCostInr: [4e4, 12e5],
		eduSummary: "₹40k–₹3L for govt LL.B colleges; ₹6L–₹15L+ for 5-year NLU / private BA-LL.B",
		months: [18, 60],
		trend: "Stable",
		remote: "Hybrid common",
		sectors: [
			"Law firms",
			"In-house corporate legal",
			"Independent litigation",
			"Policy bodies"
		],
		hiring: [
			"Corporate Law Firms",
			"Tech Compliance & IP",
			"Courts & Chambers",
			"Public Policy"
		],
		source: "Bar Council of India Career Guides & U.S. BLS Legal Outlook (2025–2026)"
	},
	"Science & Research": {
		entryInr: [35e4, 75e4],
		midInr: [8e5, 16e5],
		expInr: [16e5, 34e5],
		entryUsd: [52e3, 78e3],
		midUsd: [82e3, 125e3],
		expUsd: [13e4, 195e3],
		eduCostInr: [15e3, 5e5],
		eduSummary: "₹15k–₹1.2L in public B.Sc/M.Sc (with CSIR/GATE fellowships for PhD); ₹3L–₹5L private",
		months: [12, 36],
		trend: "Growing",
		remote: "Primarily on-site",
		sectors: [
			"R&D institutes",
			"Biotech & Pharma",
			"Universities",
			"Deep-tech labs"
		],
		hiring: [
			"CSIR/ISRO/DRDO Labs",
			"Biotech & Life Sciences",
			"Materials & Energy",
			"Academia"
		],
		source: "DST India R&D Indicators & U.S. BLS Life/Physical Scientists (2025–2026)"
	},
	"Creative Arts": {
		entryInr: [24e4, 55e4],
		midInr: [6e5, 13e5],
		expInr: [13e5, 28e5],
		entryUsd: [38e3, 58e3],
		midUsd: [62e3, 95e3],
		expUsd: [95e3, 155e3],
		eduCostInr: [0, 4e5],
		eduSummary: "₹0 (self-paced open portfolio tools like Blender/Krita) up to ₹4L for BFA/diplomas",
		months: [3, 12],
		trend: "Stable",
		remote: "High remote availability",
		sectors: [
			"Studios & agencies",
			"Publishing & gaming",
			"Independent freelancing",
			"Education"
		],
		hiring: [
			"Animation & Game Studios",
			"Media Agencies",
			"Publishing Houses",
			"Creators & Brands"
		],
		source: "FICCI-EY Media Report & Creative Sector Benchmarks (2025–2026)"
	},
	Design: {
		entryInr: [38e4, 85e4],
		midInr: [95e4, 2e6],
		expInr: [2e6, 42e5],
		entryUsd: [56e3, 86e3],
		midUsd: [92e3, 138e3],
		expUsd: [14e4, 205e3],
		eduCostInr: [0, 6e5],
		eduSummary: "₹0 (Figma + open UX case studies) to ₹6L+ for B.Des/NID/private design schools",
		months: [4, 12],
		trend: "Growing",
		remote: "High remote availability",
		sectors: [
			"Product tech companies",
			"Design studios",
			"E-commerce",
			"Freelance consulting"
		],
		hiring: [
			"SaaS & Consumer Apps",
			"Digital Agencies",
			"Consumer Hardware",
			"FinTech"
		],
		source: "DesignIndia Insights & AmbitionBox UX/Product Benchmarks (2025–2026)"
	},
	"Media & Entertainment": {
		entryInr: [28e4, 6e5],
		midInr: [65e4, 15e5],
		expInr: [15e5, 34e5],
		entryUsd: [4e4, 65e3],
		midUsd: [68e3, 108e3],
		expUsd: [11e4, 18e4],
		eduCostInr: [0, 45e4],
		eduSummary: "₹0 (open digital storytelling & audio tools) to ₹4.5L for mass communication degrees",
		months: [3, 12],
		trend: "Stable",
		remote: "Hybrid common",
		sectors: [
			"Digital publications",
			"OTT & broadcast",
			"Creator studios",
			"PR agencies"
		],
		hiring: [
			"Digital Newsrooms",
			"Streaming & Podcasts",
			"Sports Media",
			"Brand Content Teams"
		],
		source: "FICCI-EY Media & Entertainment Report (2025–2026)"
	},
	Education: {
		entryInr: [26e4, 55e4],
		midInr: [55e4, 12e5],
		expInr: [11e5, 24e5],
		entryUsd: [42e3, 62e3],
		midUsd: [6e4, 9e4],
		expUsd: [88e3, 135e3],
		eduCostInr: [15e3, 25e4],
		eduSummary: "₹15k–₹1.2L for public B.Ed/M.Ed; EdTech curriculum tracks start ₹0 online",
		months: [6, 24],
		trend: "Growing",
		remote: "Hybrid common",
		sectors: [
			"Schools & colleges",
			"EdTech platforms",
			"Corporate L&D",
			"Special education"
		],
		hiring: [
			"K-12 & Higher Ed",
			"EdTech Startups",
			"Skill Academies",
			"Corporate Learning Teams"
		],
		source: "Ministry of Education AISHE & U.S. BLS Education Outlook (2025–2026)"
	},
	Government: {
		entryInr: [42e4, 82e4],
		midInr: [85e4, 15e5],
		expInr: [15e5, 28e5],
		entryUsd: [48e3, 72e3],
		midUsd: [75e3, 112e3],
		expUsd: [115e3, 17e4],
		eduCostInr: [5e3, 25e4],
		eduSummary: "₹5k–₹60k for public bachelor's + exam fees (optional test prep coaching ₹30k–₹1.5L)",
		months: [12, 36],
		trend: "Stable",
		remote: "Primarily on-site",
		sectors: [
			"Central & state ministries",
			"Municipal administration",
			"Public sector undertakings"
		],
		hiring: [
			"Civil & Administrative Services",
			"Policy Think Tanks",
			"Public Sector Utilities"
		],
		source: "7th/8th Pay Commission Grade Benchmarks & NCS India (2025–2026)"
	},
	Defence: {
		entryInr: [6e5, 105e4],
		midInr: [11e5, 19e5],
		expInr: [19e5, 34e5],
		entryUsd: [45e3, 72e3],
		midUsd: [75e3, 118e3],
		expUsd: [12e4, 185e3],
		eduCostInr: [0, 1e5],
		eduSummary: "NDA/CDS/AFCAT academy training is government-funded once selected; exam/fitness prep minimal",
		months: [12, 36],
		trend: "Stable",
		remote: "Primarily on-site",
		sectors: [
			"Armed forces",
			"Coast guard & paramilitary",
			"Defence R&D & cyber defence"
		],
		hiring: [
			"Indian Army / Navy / Air Force",
			"Cyber Defence Wings",
			"Aerospace & Defence Labs"
		],
		source: "Join Indian Army/Navy/IAF Officer Pay Matrix & Official Notices (2025–2026)"
	},
	Environment: {
		entryInr: [32e4, 68e4],
		midInr: [75e4, 16e5],
		expInr: [16e5, 34e5],
		entryUsd: [5e4, 76e3],
		midUsd: [78e3, 12e4],
		expUsd: [125e3, 185e3],
		eduCostInr: [1e4, 4e5],
		eduSummary: "₹10k–₹1L in state universities; free ESG & climate policy modules on UN CC:Learn",
		months: [6, 24],
		trend: "Growing",
		remote: "Hybrid common",
		sectors: [
			"ESG & sustainability consulting",
			"Renewable energy",
			"Conservation NGOs",
			"Gov agencies"
		],
		hiring: [
			"Clean Energy Firms",
			"ESG Audit Teams",
			"Environmental Agencies",
			"Climate Tech"
		],
		source: "ILO Green Jobs Outlook & WEF Sustainability Skills Brief (2025–2026)"
	},
	Hospitality: {
		entryInr: [24e4, 5e5],
		midInr: [55e4, 125e4],
		expInr: [125e4, 28e5],
		entryUsd: [36e3, 56e3],
		midUsd: [58e3, 92e3],
		expUsd: [95e3, 155e3],
		eduCostInr: [2e4, 45e4],
		eduSummary: "₹20k–₹3L for IHM/hospitality diplomas; on-the-job apprenticeships often paid",
		months: [3, 12],
		trend: "Growing",
		remote: "Primarily on-site",
		sectors: [
			"Hotels & resorts",
			"Airlines & travel platforms",
			"Events & culinary ventures"
		],
		hiring: [
			"Hospitality Chains",
			"Travel Tech",
			"Aviation & Cruise",
			"Event Management"
		],
		source: "Ministry of Tourism & Hospitality Sector Skill Council (2025–2026)"
	},
	Engineering: {
		entryInr: [4e5, 88e4],
		midInr: [95e4, 2e6],
		expInr: [2e6, 42e5],
		entryUsd: [64e3, 9e4],
		midUsd: [95e3, 142e3],
		expUsd: [145e3, 21e4],
		eduCostInr: [5e4, 8e5],
		eduSummary: "₹50k–₹3L in govt engineering/polytechnic colleges up to ₹8L+ in private universities",
		months: [12, 48],
		trend: "Stable",
		remote: "Hybrid common",
		sectors: [
			"Infrastructure & manufacturing",
			"EV & energy",
			"Aerospace & robotics",
			"EPC firms"
		],
		hiring: [
			"Automotive & EV",
			"Infrastructure & Construction",
			"Energy & Power",
			"Industrial Mfg"
		],
		source: "AICTE Engineering Placement Insights & U.S. BLS Engineering (2025–2026)"
	},
	Entrepreneurship: {
		entryInr: [18e4, 75e4],
		midInr: [8e5, 24e5],
		expInr: [2e6, 6e6],
		entryUsd: [42e3, 85e3],
		midUsd: [85e3, 16e4],
		expUsd: [15e4, 3e5],
		eduCostInr: [0, 35e4],
		eduSummary: "₹0 (open startup playbooks & incubators) + variable initial prototype/registration capital",
		months: [3, 18],
		trend: "Growing",
		remote: "High remote availability",
		sectors: [
			"Early-stage startups",
			"D2C & local services",
			"Venture studios",
			"Product operations"
		],
		hiring: [
			"Tech & Consumer Startups",
			"Venture Incubators",
			"Self-founded Businesses"
		],
		source: "DPIIT Startup India Brief & Global Entrepreneurship Monitor (2025–2026)"
	},
	Agriculture: {
		entryInr: [26e4, 56e4],
		midInr: [6e5, 13e5],
		expInr: [13e5, 26e5],
		entryUsd: [44e3, 66e3],
		midUsd: [68e3, 102e3],
		expUsd: [105e3, 155e3],
		eduCostInr: [1e4, 3e5],
		eduSummary: "₹10k–₹1.2L in public State Agricultural Universities (SAUs); FAO/SWAYAM modules free",
		months: [6, 24],
		trend: "Growing",
		remote: "Primarily on-site",
		sectors: [
			"AgriTech startups",
			"Food processing",
			"FPOs & cooperatives",
			"Rural banking"
		],
		hiring: [
			"AgriTech Firms",
			"Dairy & Food Processing",
			"Seed & Crop Science",
			"Rural Advisory"
		],
		source: "ICAR Career Compendium & FAO Agri-Food Outlook (2025–2026)"
	},
	"Social Sciences": {
		entryInr: [28e4, 62e4],
		midInr: [65e4, 145e4],
		expInr: [14e5, 28e5],
		entryUsd: [44e3, 68e3],
		midUsd: [7e4, 108e3],
		expUsd: [11e4, 165e3],
		eduCostInr: [1e4, 35e4],
		eduSummary: "₹10k–₹1L in public BA/MA universities; up to ₹3.5L for specialized MA/M.Phil",
		months: [6, 24],
		trend: "Stable",
		remote: "Hybrid common",
		sectors: [
			"Policy think tanks",
			"UX/Market research",
			"NGOs & UN agencies",
			"Hospitals & HR"
		],
		hiring: [
			"Policy Institutes",
			"UX & Consumer Insights",
			"Development Sector",
			"Education"
		],
		source: "TISS / Public Policy Placement Reports & U.S. BLS Social Science (2025–2026)"
	}
};
var SOFT_SKILL_PATTERNS = [
	"communication",
	"leadership",
	"empathy",
	"teamwork",
	"writing",
	"storytelling",
	"negotiation",
	"patience",
	"listening",
	"presentation",
	"public speaking",
	"critical thinking",
	"problem",
	"observation",
	"mentoring",
	"coaching",
	"time management",
	"stakeholder",
	"ethics",
	"adaptability",
	"collaboration",
	"decision",
	"calmness",
	"persuasion",
	"cultural",
	"creativity",
	"interpersonal",
	"client"
];
function splitSkills(career) {
	const technical = [];
	const soft = [];
	for (const s of career.skills) {
		const low = s.toLowerCase();
		if (SOFT_SKILL_PATTERNS.some((p) => low.includes(p))) soft.push(s);
		else technical.push(s);
	}
	if (soft.length === 0) for (const cap of career.capabilities.slice(0, 3)) {
		const pretty = cap.replace(/_/g, " ");
		const capTitle = pretty.charAt(0).toUpperCase() + pretty.slice(1);
		if (!soft.includes(capTitle)) soft.push(capTitle);
	}
	return {
		technical: technical.length ? technical : career.skills.slice(0, 3),
		soft
	};
}
function formatAmountFromInr(amountInr, currency) {
	const meta = CURRENCY_META[currency];
	if (currency === "INR") {
		if (amountInr >= 1e5) {
			const lakhs = amountInr / 1e5;
			return `₹${Number.isInteger(lakhs) ? lakhs : lakhs.toFixed(1)} LPA`;
		}
		return `₹${Math.round(amountInr).toLocaleString("en-IN")}`;
	}
	const converted = Math.round(amountInr * meta.rateFromInr / 1e3);
	return `${meta.symbol}${converted}k`;
}
function formatRangeFromInr(rangeInr, currency, isAnnualSalary = true) {
	if (currency === "INR") {
		if (isAnnualSalary && rangeInr[0] >= 1e5) return `₹${(rangeInr[0] / 1e5).toFixed(1).replace(/\.0$/, "")}L – ₹${(rangeInr[1] / 1e5).toFixed(1).replace(/\.0$/, "")}L / yr`;
		return `₹${Math.round(rangeInr[0]).toLocaleString("en-IN")} – ₹${Math.round(rangeInr[1]).toLocaleString("en-IN")}`;
	}
	const meta = CURRENCY_META[currency];
	const lo = Math.max(1, Math.round(rangeInr[0] * meta.rateFromInr));
	const hi = Math.max(lo, Math.round(rangeInr[1] * meta.rateFromInr));
	if (isAnnualSalary && hi >= 2e3) return `${meta.symbol}${Math.round(lo / 1e3)}k – ${meta.symbol}${Math.round(hi / 1e3)}k / yr`;
	return `${meta.symbol}${lo.toLocaleString("en-US")} – ${meta.symbol}${hi.toLocaleString("en-US")}`;
}
function formatAbroadRange(rangeUsd, currency) {
	if (currency === "USD") return `$${Math.round(rangeUsd[0] / 1e3)}k – $${Math.round(rangeUsd[1] / 1e3)}k / yr`;
	const inrEquivalent = [rangeUsd[0] * 84.5, rangeUsd[1] * 84.5];
	if (currency === "INR") {
		const lo = (inrEquivalent[0] / 1e5).toFixed(1).replace(/\.0$/, "");
		const hi = (inrEquivalent[1] / 1e5).toFixed(1).replace(/\.0$/, "");
		return `$${Math.round(rangeUsd[0] / 1e3)}k–$${Math.round(rangeUsd[1] / 1e3)}k (~₹${lo}L–₹${hi}L)`;
	}
	const meta = CURRENCY_META[currency];
	const lo = Math.round(inrEquivalent[0] * meta.rateFromInr / 1e3);
	const hi = Math.round(inrEquivalent[1] * meta.rateFromInr / 1e3);
	return `${meta.symbol}${lo}k – ${meta.symbol}${hi}k / yr`;
}
function roundToNearest10k(n) {
	return Math.round(n / 1e4) * 1e4;
}
function getCareerInsight(career) {
	const base = INDUSTRY_BASELINES[career.industry];
	const factor = (career.commitmentLevel >= 5 ? 1.15 : career.commitmentLevel === 4 ? 1.06 : career.commitmentLevel <= 2 ? .92 : 1) * (career.emerging ? 1.08 : 1);
	const scaleInr = (pair) => [roundToNearest10k(pair[0] * factor), roundToNearest10k(pair[1] * factor)];
	const scaleUsd = (pair) => [Math.round(pair[0] * factor / 1e3) * 1e3, Math.round(pair[1] * factor / 1e3) * 1e3];
	const difficultyOfEntry = career.commitmentLevel <= 2 ? "Beginner-friendly" : career.commitmentLevel === 3 ? "Moderate" : "Highly competitive";
	const difficultyExplanation = difficultyOfEntry === "Beginner-friendly" ? `Accessible entry curve with low formal barriers (${career.minEducation}); portfolio projects can open junior roles quickly.` : difficultyOfEntry === "Moderate" ? `Requires structured skills in ${career.skills.slice(0, 2).join(" & ")} plus demonstrable project or internship experience.` : `High competition or formal screening (${career.pathways[0] ?? career.minEducation}); expects sustained preparation.`;
	const trend = career.emerging ? "Growing" : base.trend;
	const outlookNote = career.emerging ? `${career.name} is an emerging specialty within ${career.industry}, driven by automation, analytics, or specialized workflows.` : trend === "Growing" ? `Steady expansion expected across ${career.industry}, especially for candidates combining ${career.skills.slice(0, 2).join(" and ")}.` : `Consistent replacement & core demand in ${career.industry}; differentiation via practical specialization matters.`;
	const remotePossibility = career.environment.toLowerCase().includes("remote") ? "High remote availability" : career.environment.toLowerCase().includes("outdoors") || career.environment.toLowerCase().includes("people") || career.environment.toLowerCase().includes("lab") ? "Primarily on-site" : base.remote;
	const isEntrepreneurial = career.industry === "Entrepreneurship" || career.industry === "Creative Arts" || career.industry === "Design";
	return {
		indiaEntryInr: scaleInr(base.entryInr),
		indiaMidInr: scaleInr(base.midInr),
		indiaExperiencedInr: scaleInr(base.expInr),
		abroadEntryUsd: scaleUsd(base.entryUsd),
		abroadMidUsd: scaleUsd(base.midUsd),
		abroadExperiencedUsd: scaleUsd(base.expUsd),
		compensationStructure: {
			baseNote: isEntrepreneurial ? "Income can blend retainer contracts with milestone-based studio revenue rather than fixed monthly pay alone." : "Structured annual fixed base CTC (India) or base salary (abroad), paid monthly or bi-weekly.",
			variableNote: career.industry === "Finance" || career.industry === "Business & Management" ? "Performance bonuses and equity/ESOPs commonly add 10%–30% in mid/senior roles." : "Annual performance bonus (5%–15%) or ESOPs in growth-stage companies.",
			freelanceNote: career.freelanceOpportunity,
			selfEmploymentNote: career.entrepreneurshipOpportunity
		},
		educationCostInr: base.eduCostInr,
		educationCostSummary: `${base.eduSummary}. ${career.estimatedCostNote}`,
		employabilityMonths: base.months,
		employabilityNote: `Typically ${base.months[0]}–${base.months[1]} months of focused skill-building or formal qualification completion before job-ready applications.`,
		difficultyOfEntry,
		difficultyExplanation,
		jobOpportunities: {
			hiringIndustries: Array.from(/* @__PURE__ */ new Set([career.industry, ...base.hiring])).slice(0, 4),
			typicalTitles: career.progression.slice(0, 3),
			sectors: base.sectors,
			remotePossibility,
			freelanceAvailability: career.freelanceOpportunity
		},
		futureDemand: {
			trend,
			timeframe: "2025–2030",
			outlookNote,
			source: base.source
		},
		salarySource: base.source,
		salaryPeriod: "2025–2026 indicative market benchmarks"
	};
}
//#endregion
export { getCareerInsight as a, formatRangeFromInr as i, formatAbroadRange as n, splitSkills as o, formatAmountFromInr as r, CURRENCY_META as t };
