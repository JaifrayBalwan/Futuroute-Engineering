import { l as __toESM, o as require_jsx_runtime, s as require_react } from "./useSelector-Cu7jxM-W.js";
import { n as toast } from "./dist-CnotZWgl.js";
import { I as Link } from "./auth-ByhFdEgm.js";
import { a as Search, c as Info, t as AppShell } from "./AppShell-BgEZmUVx.js";
import { a as actions, i as INDUSTRIES, s as useApp } from "./careers-Da7lFkNP.js";
import { o as Route } from "./index-DW2YTfhy.js";
import { l as Bookmark, r as useCareersCatalog, u as createLucideIcon } from "./careers-service-REWdQftI.js";
import { t as CircleCheck } from "./circle-check-kJboa0pm.js";
import { t as ExternalLink } from "./external-link-_z19ceB5.js";
import { t as Sparkles } from "./sparkles-WxdkWloa.js";
import { t as Trash2 } from "./trash-2-CZ9EJ6gF.js";
import { a as Glass, c as PageHeader, d as inputClass, f as selectClass, i as EmptyState, r as Chip, s as Notice, u as btnClass } from "./ui-kit-BDOPC8gw.js";
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Funnel = createLucideIcon("funnel", [["path", {
	d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
	key: "sc7q7i"
}]]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Globe = createLucideIcon("globe", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
		key: "13o1zl"
	}],
	["path", {
		d: "M2 12h20",
		key: "9i4pu4"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MapPin = createLucideIcon("map-pin", [["path", {
	d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
	key: "1r0f0z"
}], ["circle", {
	cx: "12",
	cy: "10",
	r: "3",
	key: "ilqhr7"
}]]);
//#endregion
//#region src/lib/opportunities.ts
var import_react = /* @__PURE__ */ __toESM(require_react());
var OPPORTUNITY_CATEGORIES = [
	"Internships",
	"Free online courses",
	"Scholarships",
	"Hackathons",
	"Competitions",
	"Certifications",
	"Beginner-friendly projects",
	"Workshops & events",
	"Freelancing opportunities",
	"Entry-level jobs"
];
var OPPORTUNITIES_CATALOG = [
	{
		id: "opp-aicte-internship",
		title: "AICTE National Internship Portal",
		provider: "All India Council for Technical Education (Gov of India)",
		category: "Internships",
		description: "Official government portal connecting college & diploma students with internships across engineering, IT, design, public policy, and agri-tech.",
		fields: [
			"Technology & IT",
			"Engineering",
			"Design",
			"Government",
			"Agriculture"
		],
		requiredSkills: [
			"Domain fundamentals",
			"Resume",
			"Communication"
		],
		location: "Pan-India / Remote",
		mode: "Hybrid",
		cost: "Free",
		difficulty: "Beginner",
		eligibility: "School/College & Diploma students across India",
		listingType: "Curated Ongoing Portal",
		scheduleNote: "Rolling openings updated continuously",
		lastVerified: "Nov 2026",
		url: "https://internship.aicte-india.org/"
	},
	{
		id: "opp-internshala",
		title: "Internshala Verified Student Internships",
		provider: "Internshala",
		category: "Internships",
		description: "Filter verified stipended & remote internships across software, UI/UX, finance, marketing, media, law, and sports management.",
		fields: [
			"Technology & IT",
			"Design",
			"Business & Management",
			"Finance",
			"Media & Entertainment",
			"Law"
		],
		requiredSkills: [
			"Portfolio basics",
			"Communication",
			"Domain fundamentals"
		],
		location: "India & Work-from-home",
		mode: "Remote",
		cost: "Free",
		difficulty: "Beginner",
		eligibility: "Class 12+, UG, PG & freshers",
		listingType: "Curated Ongoing Portal",
		scheduleNote: "Rolling monthly intakes",
		lastVerified: "Nov 2026",
		url: "https://internshala.com/internships/"
	},
	{
		id: "opp-swayam-gov",
		title: "SWAYAM National Free MOOCs",
		provider: "Ministry of Education, Gov of India",
		category: "Free online courses",
		description: "Free courses from IITs, IIMs, and central universities covering engineering, law, commerce, psychology, agriculture, and humanities.",
		fields: [
			"Technology & IT",
			"Business & Management",
			"Law",
			"Science & Research",
			"Education",
			"Social Sciences"
		],
		requiredSkills: ["Self-paced study", "Foundational reading"],
		location: "Online",
		mode: "Online",
		cost: "Free audit / Paid cert",
		difficulty: "Beginner",
		eligibility: "Open to Class 9–12, UG, PG & lifelong learners",
		listingType: "Periodic Official Cohort",
		scheduleNote: "Jan & July semester cycles; lecture videos free anytime",
		lastVerified: "Nov 2026",
		url: "https://swayam.gov.in/"
	},
	{
		id: "opp-freecodecamp",
		title: "freeCodeCamp Full Verified Curriculum",
		provider: "freeCodeCamp.org",
		category: "Free online courses",
		description: "100% free interactive coding, data analysis, Python, relational databases, and machine learning tracks with free certificates.",
		fields: [
			"Technology & IT",
			"Artificial Intelligence",
			"Design"
		],
		requiredSkills: [
			"HTML/CSS",
			"JavaScript",
			"Python"
		],
		location: "Global Online",
		mode: "Online",
		cost: "Free",
		difficulty: "Beginner",
		eligibility: "Open to all ages worldwide",
		listingType: "Curated Ongoing Portal",
		scheduleNote: "Self-paced year-round",
		lastVerified: "Nov 2026",
		url: "https://www.freecodecamp.org/learn"
	},
	{
		id: "opp-mit-ocw",
		title: "MIT OpenCourseWare Full University Archive",
		provider: "Massachusetts Institute of Technology",
		category: "Free online courses",
		description: "Free MIT lecture notes, assignments, and exams across computer science, economics, biology, mechanical engineering, and urban planning.",
		fields: [
			"Engineering",
			"Science & Research",
			"Artificial Intelligence",
			"Finance",
			"Environment"
		],
		requiredSkills: ["Mathematics", "Independent study"],
		location: "Global Online",
		mode: "Online",
		cost: "Free",
		difficulty: "Intermediate",
		eligibility: "High school advanced learners, UG & PG",
		listingType: "Curated Ongoing Portal",
		scheduleNote: "Open archive year-round",
		lastVerified: "Nov 2026",
		url: "https://ocw.mit.edu/"
	},
	{
		id: "opp-nsp-india",
		title: "National Scholarship Portal (NSP India)",
		provider: "Government of India",
		category: "Scholarships",
		description: "Official central & state scholarship gateway supporting merit, means-based, technical diploma, and higher-education students.",
		fields: [
			"Education",
			"Engineering",
			"Healthcare",
			"Science & Research",
			"Social Sciences"
		],
		requiredSkills: ["Academic records", "Verified identity"],
		location: "India",
		mode: "Online",
		cost: "Free",
		difficulty: "Beginner",
		eligibility: "Pre-matric, Post-matric, UG & Technical students",
		listingType: "Periodic Official Cohort",
		scheduleNote: "Annual official application windows (check portal)",
		lastVerified: "Nov 2026",
		url: "https://scholarships.gov.in/"
	},
	{
		id: "opp-aicte-pragati-saksham",
		title: "AICTE Pragati, Saksham & Swanath Scholarships",
		provider: "AICTE",
		category: "Scholarships",
		description: "Official technical education support schemes for girl students and differently-abled students pursuing diploma or degree programs.",
		fields: [
			"Engineering",
			"Technology & IT",
			"Design"
		],
		requiredSkills: ["Enrolled in AICTE-approved institution"],
		location: "India",
		mode: "Online",
		cost: "Free",
		difficulty: "Beginner",
		eligibility: "Eligible Diploma / Degree students via NSP",
		listingType: "Periodic Official Cohort",
		scheduleNote: "Annual academic cycle via NSP",
		lastVerified: "Nov 2026",
		url: "https://www.aicte-india.org/schemes/students-development-schemes"
	},
	{
		id: "opp-sih-india",
		title: "Smart India Hackathon (SIH Official Portal)",
		provider: "Ministry of Education Innovation Cell & AICTE",
		category: "Hackathons",
		description: "India's largest national student hackathon solving real-world problem statements across software, hardware, healthcare, and civic tech.",
		fields: [
			"Technology & IT",
			"Artificial Intelligence",
			"Engineering",
			"Environment",
			"Healthcare"
		],
		requiredSkills: [
			"Teamwork",
			"Prototyping",
			"Problem-solving"
		],
		location: "India (Nodal Centres & Online)",
		mode: "Hybrid",
		cost: "Free",
		difficulty: "Intermediate",
		eligibility: "School (SIH Jr) & College teams",
		listingType: "Periodic Official Cohort",
		scheduleNote: "Annual national cycle (usually Aug–Dec)",
		lastVerified: "Nov 2026",
		url: "https://www.sih.gov.in/"
	},
	{
		id: "opp-devpost",
		title: "Devpost Student & Open Hackathons",
		provider: "Devpost",
		category: "Hackathons",
		description: "Live directory of global remote AI, web, game dev, sustainability, and fintech hackathons with beginner tracks and team matching.",
		fields: [
			"Technology & IT",
			"Artificial Intelligence",
			"Design",
			"Entrepreneurship"
		],
		requiredSkills: [
			"Prototyping",
			"Pitching",
			"Coding or No-Code"
		],
		location: "Global / Remote",
		mode: "Online",
		cost: "Free",
		difficulty: "Beginner",
		eligibility: "Students and builders worldwide",
		listingType: "Curated Ongoing Portal",
		scheduleNote: "Weekly new remote hackathons",
		lastVerified: "Nov 2026",
		url: "https://devpost.com/hackathons"
	},
	{
		id: "opp-unstop",
		title: "Unstop Student Case Competitions & Challenges",
		provider: "Unstop",
		category: "Competitions",
		description: "Case studies, strategy battles, finance challenges, marketing sprints, and coding contests hosted by universities and companies.",
		fields: [
			"Business & Management",
			"Finance",
			"Entrepreneurship",
			"Technology & IT",
			"Sports"
		],
		requiredSkills: [
			"Case analysis",
			"Presentation",
			"Teamwork"
		],
		location: "India & Online",
		mode: "Online",
		cost: "Free",
		difficulty: "Beginner",
		eligibility: "UG, PG & school participants (varies by event)",
		listingType: "Curated Ongoing Portal",
		scheduleNote: "Rolling weekly competitions",
		lastVerified: "Nov 2026",
		url: "https://unstop.com/competitions"
	},
	{
		id: "opp-kaggle-comp",
		title: "Kaggle Getting Started & Featured ML Competitions",
		provider: "Kaggle",
		category: "Competitions",
		description: "Practice predictive modeling, sports analytics, computer vision, and tabular data workflows on open datasets with free notebooks.",
		fields: [
			"Artificial Intelligence",
			"Technology & IT",
			"Sports",
			"Finance"
		],
		requiredSkills: [
			"Python",
			"Data analysis",
			"Statistics"
		],
		location: "Global Online",
		mode: "Online",
		cost: "Free",
		difficulty: "Intermediate",
		eligibility: "Open to students and practitioners",
		listingType: "Curated Ongoing Portal",
		scheduleNote: "Ongoing beginner playgrounds & seasonal contests",
		lastVerified: "Nov 2026",
		url: "https://www.kaggle.com/competitions"
	},
	{
		id: "opp-google-skillshop",
		title: "Google Skillshop Official Certifications",
		provider: "Google",
		category: "Certifications",
		description: "Free training and assessment credentials for Google Analytics, Search/Performance Marketing, and campaign measurement.",
		fields: [
			"Business & Management",
			"Media & Entertainment",
			"Entrepreneurship"
		],
		requiredSkills: ["Digital analytics", "Campaign logic"],
		location: "Online",
		mode: "Online",
		cost: "Free",
		difficulty: "Beginner",
		eligibility: "Open to all learners",
		listingType: "Curated Ongoing Portal",
		scheduleNote: "On-demand self-paced",
		lastVerified: "Nov 2026",
		url: "https://skillshop.withgoogle.com/"
	},
	{
		id: "opp-nptel-cert",
		title: "NPTEL IIT/IISc Domain Certifications",
		provider: "IITs & IISc (Gov Supported)",
		category: "Certifications",
		description: "Study full IIT/IISc courses free; take an optional proctored in-person exam (approx ₹1,000, with fee waivers for eligible students).",
		fields: [
			"Engineering",
			"Technology & IT",
			"Artificial Intelligence",
			"Science & Research",
			"Finance"
		],
		requiredSkills: ["Weekly assignments", "Exam prep"],
		location: "Online + Exam centres across India",
		mode: "Hybrid",
		cost: "Free audit / Paid cert",
		difficulty: "Intermediate",
		eligibility: "Students, faculty & working learners",
		listingType: "Periodic Official Cohort",
		scheduleNote: "Jan & July exam semesters",
		lastVerified: "Nov 2026",
		url: "https://nptel.ac.in/"
	},
	{
		id: "opp-github-good-first",
		title: "GitHub Good First Issue Open-Source Projects",
		provider: "GitHub Open Source",
		category: "Beginner-friendly projects",
		description: "Contribute small documentation improvements, bug fixes, or UI tweaks to real open-source tools to build verifiable public work.",
		fields: [
			"Technology & IT",
			"Artificial Intelligence",
			"Design"
		],
		requiredSkills: ["Git basics", "Reading docs"],
		location: "Global Remote",
		mode: "Online",
		cost: "Free",
		difficulty: "Beginner",
		eligibility: "Anyone with a free GitHub account",
		listingType: "Curated Ongoing Portal",
		scheduleNote: "Continuous open issues",
		lastVerified: "Nov 2026",
		url: "https://github.com/topics/good-first-issue"
	},
	{
		id: "opp-fifa-grassroots",
		title: "FIFA Training Centre Match & Coaching Briefs",
		provider: "FIFA",
		category: "Beginner-friendly projects",
		description: "Use free FIFA match-analysis frameworks and session templates to write tactical scouting reports or youth session plans.",
		fields: ["Sports", "Media & Entertainment"],
		requiredSkills: ["Match observation", "Structured writing"],
		location: "Online / Local pitch practice",
		mode: "Hybrid",
		cost: "Free",
		difficulty: "Beginner",
		eligibility: "Aspiring coaches, analysts & sports writers",
		listingType: "Curated Ongoing Portal",
		scheduleNote: "Open library year-round",
		lastVerified: "Nov 2026",
		url: "https://www.fifatrainingcentre.com/"
	},
	{
		id: "opp-ms-learn-events",
		title: "Microsoft Learn Virtual Training Days & Workshops",
		provider: "Microsoft",
		category: "Workshops & events",
		description: "Free live instructor-led online workshops covering Cloud fundamentals, AI workflows, Data visualization, and Security.",
		fields: [
			"Technology & IT",
			"Artificial Intelligence",
			"Business & Management"
		],
		requiredSkills: ["Curiosity", "Basic computer literacy"],
		location: "Global Online",
		mode: "Online",
		cost: "Free",
		difficulty: "Beginner",
		eligibility: "Students and beginners",
		listingType: "Curated Ongoing Portal",
		scheduleNote: "Weekly regional time-zone sessions",
		lastVerified: "Nov 2026",
		url: "https://events.microsoft.com/"
	},
	{
		id: "opp-openwho-workshops",
		title: "OpenWHO Public Health & Clinical Briefings",
		provider: "World Health Organization",
		category: "Workshops & events",
		description: "Free self-paced workshops on public health communication, epidemiology basics, mental health first aid, and emergency response.",
		fields: [
			"Healthcare",
			"Social Sciences",
			"Environment"
		],
		requiredSkills: ["Reading", "Interest in health & community"],
		location: "Global Online",
		mode: "Online",
		cost: "Free",
		difficulty: "Beginner",
		eligibility: "Students, volunteers & healthcare aspirants",
		listingType: "Curated Ongoing Portal",
		scheduleNote: "Available anytime",
		lastVerified: "Nov 2026",
		url: "https://openwho.org/"
	},
	{
		id: "opp-contra-freelance",
		title: "Contra Commission-Free Independent Portfolio Showcase",
		provider: "Contra",
		category: "Freelancing opportunities",
		description: "Build a structured freelance portfolio for UI/UX, video editing, writing, web builds, and marketing without platform commission cuts on projects.",
		fields: [
			"Design",
			"Creative Arts",
			"Technology & IT",
			"Media & Entertainment",
			"Business & Management"
		],
		requiredSkills: ["1–2 sample projects", "Client communication"],
		location: "Global Remote",
		mode: "Remote",
		cost: "Free",
		difficulty: "Intermediate",
		eligibility: "18+ with portfolio samples",
		listingType: "Curated Ongoing Portal",
		scheduleNote: "Open year-round",
		lastVerified: "Nov 2026",
		url: "https://contra.com/"
	},
	{
		id: "opp-upwork-starter",
		title: "Freelance Market Brief Explorer (Writing, Design & Dev)",
		provider: "Upwork Marketplace",
		category: "Freelancing opportunities",
		description: "Inspect real client project briefs to see what skills businesses pay for in copywriting, spreadsheets, design, and coding before pitching.",
		fields: [
			"Design",
			"Technology & IT",
			"Media & Entertainment",
			"Finance",
			"Creative Arts"
		],
		requiredSkills: ["Niche portfolio", "Proposal writing"],
		location: "Global Remote",
		mode: "Remote",
		cost: "Varies",
		difficulty: "Intermediate",
		eligibility: "18+ adhering to local tax/platform rules",
		listingType: "Curated Ongoing Portal",
		scheduleNote: "Live marketplace briefs",
		lastVerified: "Nov 2026",
		url: "https://www.upwork.com/"
	},
	{
		id: "opp-ncs-india",
		title: "National Career Service (NCS India) Job & Career Portal",
		provider: "Ministry of Labour & Employment, Gov of India",
		category: "Entry-level jobs",
		description: "Verified government-run portal listing fresher/entry-level jobs, apprenticeships, and career counselling fairs across public & private employers.",
		fields: [
			"Government",
			"Engineering",
			"Finance",
			"Hospitality",
			"Healthcare",
			"Agriculture",
			"Technology & IT"
		],
		requiredSkills: ["Updated CV", "Basic interview prep"],
		location: "Pan-India",
		mode: "Hybrid",
		cost: "Free",
		difficulty: "Beginner",
		eligibility: "10th/12th pass, ITI, Diploma & Graduates",
		listingType: "Curated Ongoing Portal",
		scheduleNote: "Daily verified employer listings",
		lastVerified: "Nov 2026",
		url: "https://www.ncs.gov.in/"
	},
	{
		id: "opp-hackerearth-jobs",
		title: "HackerEarth Hiring Challenges & Fresher Roles",
		provider: "HackerEarth",
		category: "Entry-level jobs",
		description: "Skill-first technical hiring challenges where beginners and final-year students qualify for developer and data interviews by solving problems.",
		fields: ["Technology & IT", "Artificial Intelligence"],
		requiredSkills: [
			"Data structures",
			"Programming",
			"Debugging"
		],
		location: "India & Global Remote",
		mode: "Remote",
		cost: "Free",
		difficulty: "Intermediate",
		eligibility: "Final-year students & freshers",
		listingType: "Curated Ongoing Portal",
		scheduleNote: "Monthly company challenges",
		lastVerified: "Nov 2026",
		url: "https://www.hackerearth.com/challenges/hiring/"
	}
];
function recommendOpportunities(catalog, profile, savedCareers = [], activeRoadmap, allCareers = []) {
	const focusIndustries = /* @__PURE__ */ new Set();
	for (const sc of savedCareers) focusIndustries.add(sc.industry);
	if (activeRoadmap) {
		const rmCareer = allCareers.find((c) => c.id === activeRoadmap.careerId);
		if (rmCareer) focusIndustries.add(rmCareer.industry);
	}
	const interestStr = [
		...profile?.interests ?? [],
		...profile?.subjects ?? [],
		...profile?.currentSkills ?? []
	].join(" ").toLowerCase();
	return [...catalog].map((opp) => {
		let score = 0;
		if (opp.fields.some((f) => focusIndustries.has(f))) score += 5;
		for (const skill of opp.requiredSkills) if (interestStr.includes(skill.toLowerCase())) score += 2;
		if (opp.cost === "Free") score += 1;
		if (profile?.budget === 0 && opp.cost === "Free") score += 2;
		if (opp.difficulty === "Beginner") score += 1;
		return {
			opp,
			score
		};
	}).sort((a, b) => b.score - a.score).map((x) => x.opp);
}
//#endregion
//#region src/routes/opportunities.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
var MODES = [
	"Online",
	"Remote",
	"Hybrid",
	"On-site"
];
var COSTS = [
	"Free",
	"Free audit / Paid cert",
	"Paid / Stipend-backed",
	"Varies"
];
var DIFFICULTIES = [
	"Beginner",
	"Intermediate",
	"Advanced"
];
var STATUS_LABELS = {
	saved: "Saved",
	planning: "Planning to apply",
	applied: "Applied"
};
function OpportunityCard({ opp, savedEntry }) {
	const handleSave = (status = "saved") => {
		actions.saveOpportunity(opp.id, opp.title, opp.category, status);
		toast.success(savedEntry ? `Marked as "${STATUS_LABELS[status]}"` : `Saved "${opp.title}" to tracker`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
		className: "flex flex-col justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-lavender/40 bg-lavender/15 px-2.5 py-0.5 text-[11px] font-medium text-lavender-bright",
							children: opp.category
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-cyan/35 bg-cyan/10 px-2.5 py-0.5 text-[11px] text-cyan",
							children: opp.listingType
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] text-muted-foreground",
						children: ["Verified ", opp.lastVerified]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-semibold leading-snug",
					children: opp.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs font-medium text-cyan",
					children: opp.provider
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-text-2",
					children: opp.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5 rounded-xl border border-glass-border bg-secondary/60 p-3 text-xs text-text-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-x-4 gap-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5 text-cyan" }),
										" ",
										opp.location
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3.5 text-lavender-bright" }),
										" ",
										opp.mode
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: opp.cost === "Free" ? "font-medium text-turquoise" : "font-medium text-foreground",
									children: opp.cost
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Level: ", opp.difficulty] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Eligibility:"
							}),
							" ",
							opp.eligibility
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Schedule / Cycle:"
							}),
							" ",
							opp.scheduleNote
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: opp.requiredSkills.map((sk) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						className: "px-2.5 py-0.5 text-xs",
						children: sk
					}, sk))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-2 border-t border-glass-border pt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: opp.url,
				target: "_blank",
				rel: "noreferrer",
				className: btnClass("primary", "h-9 min-h-9 px-3.5 text-xs"),
				children: ["Visit Official Portal ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
			}), savedEntry ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					"aria-label": `Application status for ${opp.title}`,
					value: savedEntry.status,
					onChange: (e) => handleSave(e.target.value),
					className: selectClass("h-9 w-auto py-1 text-xs"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "saved",
							children: "Saved"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "planning",
							children: "Planning to apply"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "applied",
							children: "Applied"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						actions.removeOpportunity(opp.id);
						toast.info("Removed from saved opportunities");
					},
					"aria-label": "Remove opportunity",
					className: "grid size-9 place-items-center rounded-xl border border-glass-border bg-secondary text-muted-foreground hover:text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => handleSave("saved"),
				className: btnClass("outline", "h-9 min-h-9 px-3 text-xs"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-3.5" }), " Save & Track"]
			})]
		})]
	});
}
function OpportunitiesPage() {
	const s = useApp();
	const { careers } = useCareersCatalog();
	const search = Route.useSearch();
	const [tab, setTab] = (0, import_react.useState)("all");
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)(() => OPPORTUNITY_CATEGORIES.includes(search.category) ? search.category : "ALL");
	const [field, setField] = (0, import_react.useState)(() => search.field || "ALL");
	const [mode, setMode] = (0, import_react.useState)("ALL");
	const [cost, setCost] = (0, import_react.useState)("ALL");
	const [difficulty, setDifficulty] = (0, import_react.useState)("ALL");
	const [freeOnly, setFreeOnly] = (0, import_react.useState)(false);
	const savedCareersList = (0, import_react.useMemo)(() => s.saved.map((id) => careers.find((c) => c.id === id)).filter((c) => Boolean(c)), [s.saved, careers]);
	const recommended = (0, import_react.useMemo)(() => recommendOpportunities(OPPORTUNITIES_CATALOG, s.profile, savedCareersList, s.roadmap, careers).slice(0, 3), [
		s.profile,
		savedCareersList,
		s.roadmap,
		careers
	]);
	const savedMap = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		for (const item of s.savedOpportunities) m.set(item.opportunityId, { status: item.status });
		return m;
	}, [s.savedOpportunities]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return OPPORTUNITIES_CATALOG.filter((o) => {
			if (tab === "tracked" && !savedMap.has(o.id)) return false;
			if (category !== "ALL" && o.category !== category) return false;
			if (field !== "ALL" && !o.fields.includes(field)) return false;
			if (mode !== "ALL" && o.mode !== mode) return false;
			if (cost !== "ALL" && o.cost !== cost) return false;
			if (difficulty !== "ALL" && o.difficulty !== difficulty) return false;
			if (freeOnly && o.cost !== "Free") return false;
			if (q) {
				if (!`${o.title} ${o.provider} ${o.description} ${o.category} ${o.fields.join(" ")} ${o.requiredSkills.join(" ")}`.toLowerCase().includes(q)) return false;
			}
			return true;
		});
	}, [
		tab,
		savedMap,
		category,
		field,
		mode,
		cost,
		difficulty,
		freeOnly,
		query
	]);
	const resetFilters = () => {
		setQuery("");
		setCategory("ALL");
		setField("ALL");
		setMode("ALL");
		setCost("ALL");
		setDifficulty("ALL");
		setFreeOnly(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Opportunity Finder",
			title: "Real portals & programs matched to your path",
			text: "Discover internships, free online courses, government scholarships, hackathons, certifications, projects, and fresher job gateways across 10 curated categories.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
					active: tab === "all",
					onClick: () => setTab("all"),
					children: [
						"All Portals (",
						OPPORTUNITIES_CATALOG.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
					active: tab === "tracked",
					onClick: () => setTab("tracked"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }),
						" Saved & Tracked (",
						s.savedOpportunities.length,
						")"
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2.5 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "mt-0.5 size-4 shrink-0 text-cyan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-foreground",
						children: "Verification & Schedule Notice:"
					}), " All listings below link directly to official, verified ongoing portals or periodic academic cohorts (Last verified: Nov 2026). Futuroute never fabricates fake company openings or synthetic deadlines — always confirm active registration dates on each provider’s official portal."] })]
				})
			})
		}),
		tab === "all" && recommended.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-8 space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 font-display text-xl font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5 text-cyan" }), " Recommended for your path"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Prioritized from your",
						" ",
						s.roadmap ? `active roadmap (${s.roadmap.title})` : savedCareersList.length > 0 ? `saved careers (${savedCareersList.map((c) => c.name).slice(0, 2).join(", ")})` : "profile interests & budget",
						"."
					]
				})] }), !s.profile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/profile",
					className: "text-xs text-cyan hover:underline",
					children: "Complete Profile to refine recommendations →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: recommended.map((opp) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityCard, {
					opp,
					savedEntry: savedMap.get(opp.id)
				}, `rec-${opp.id}`))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
			className: "mb-6 space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 text-sm font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "size-4 text-lavender-bright" }), " Filter by Category & Requirements"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: freeOnly,
							onClick: () => setFreeOnly(!freeOnly),
							className: "text-xs",
							children: "Free Only"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: resetFilters,
							className: "text-xs text-text-2 underline-offset-4 hover:text-foreground hover:underline",
							children: "Reset filters"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: category === "ALL",
						onClick: () => setCategory("ALL"),
						className: "text-xs",
						children: "All Categories"
					}), OPPORTUNITY_CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: category === cat,
						onClick: () => setCategory(cat),
						className: "text-xs",
						children: cat
					}, cat))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 md:grid-cols-2 lg:grid-cols-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative lg:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "Search skills, providers (SWAYAM, AICTE, Devpost)…",
								className: inputClass("pl-9")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"aria-label": "Filter by career field",
							value: field,
							onChange: (e) => setField(e.target.value),
							className: selectClass(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ALL",
								children: "All Career Fields"
							}), INDUSTRIES.map((ind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: ind,
								children: ind
							}, ind))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"aria-label": "Filter by mode",
							value: mode,
							onChange: (e) => setMode(e.target.value),
							className: selectClass(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ALL",
								children: "All Modes"
							}), MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: m,
								children: m
							}, m))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								"aria-label": "Filter by cost",
								value: cost,
								onChange: (e) => setCost(e.target.value),
								className: selectClass("px-2 text-xs"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ALL",
									children: "Any Cost"
								}), COSTS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c,
									children: c
								}, c))]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								"aria-label": "Filter by difficulty",
								value: difficulty,
								onChange: (e) => setDifficulty(e.target.value),
								className: selectClass("px-2 text-xs"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ALL",
									children: "Any Level"
								}), DIFFICULTIES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: d,
									children: d
								}, d))]
							})]
						})
					]
				})
			]
		}),
		filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-5" }),
			title: tab === "tracked" ? "No saved or tracked opportunities yet" : "No opportunities match your active filters",
			text: tab === "tracked" ? "Click “Save & Track” on any portal in the All Portals tab to track your applications here." : "Try widening your category, mode, or field selection."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
			children: filtered.map((opp) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityCard, {
				opp,
				savedEntry: savedMap.get(opp.id)
			}, opp.id))
		})
	] });
}
//#endregion
export { OpportunitiesPage as component };
