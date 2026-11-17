import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Glass, f as inputClass, i as EmptyState, l as ProgressRing, n as Button, p as selectClass, r as Chip, s as Notice, u as btnClass } from "./ui-kit-BmqGm62i.mjs";
import { b as useUser, f as isUserAdmin, h as resendVerificationEmail, l as friendlyAuthError } from "./auth-Bjd81y0G.mjs";
import { a as getCareer, o as roadmapProgress, r as INDUSTRIES, s as useApp } from "./careers-ChJ9jiL5.mjs";
import { n as seedAllCareersToFirestore, r as useCareersCatalog, t as saveSingleCareerToFirestore } from "./careers-service-BdvVUi83.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { K as Briefcase, M as Gauge, O as IndianRupee, Q as ArrowRight, R as Database, _ as Plus, a as TrendingUp, b as Map, et as ArrowLeftRight, i as UserCheck, j as GitCompareArrows, l as ShieldCheck, tt as Activity, w as LogIn, z as Compass } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DVN8uj3t.mjs";
import { a as getCareerInsight, i as formatRangeFromInr, r as formatAmountFromInr } from "./career-insights-DY2zFBVx.mjs";
import { i as computeCompatibility, t as CompatibilityBadge } from "./CompatibilityCard-DGCoBrUg.mjs";
import { n as RouteMap, r as SaveButton } from "./CareerParts-BEKUbYuv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-C7YjQnu3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/dashboard.tsx?tsr-split=component";
var ago = (t) => {
	const m = Math.round((Date.now() - t) / 6e4);
	return m < 1 ? "just now" : m < 60 ? `${m} min ago` : m < 1440 ? `${Math.round(m / 60)} h ago` : `${Math.round(m / 1440)} d ago`;
};
function AdminCatalogPanel({ totalCount, onUpdated }) {
	const [seeding, setSeeding] = (0, import_react.useState)(false);
	const [showAdd, setShowAdd] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [industry, setIndustry] = (0, import_react.useState)("Technology & IT");
	const [subcategory, setSubcategory] = (0, import_react.useState)("");
	const [shortDesc, setShortDesc] = (0, import_react.useState)("");
	const [skillsRaw, setSkillsRaw] = (0, import_react.useState)("");
	const handleSeedAll = async () => {
		setSeeding(true);
		try {
			const count = await seedAllCareersToFirestore();
			await onUpdated();
			toast.success(`Synced ${count} careers across 20 industries to Cloud Firestore`);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed to seed career catalog");
		} finally {
			setSeeding(false);
		}
	};
	const handleAddCareer = async (e) => {
		e.preventDefault();
		if (!name.trim() || !shortDesc.trim()) return;
		setSaving(true);
		const id = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
		const skills = skillsRaw.split(",").map((s) => s.trim()).filter(Boolean);
		const customCareer = {
			id,
			name: name.trim(),
			industry,
			subcategory: subcategory.trim() || industry,
			short: shortDesc.trim(),
			hue: "cyan",
			day: shortDesc.trim(),
			responsibilities: [
				`Deliver core ${subcategory.trim() || industry} outcomes`,
				"Collaborate with peers and domain mentors",
				"Review work quality and gather user or stakeholder feedback"
			],
			skills: skills.length ? skills : [
				"Problem-solving",
				"Communication",
				"Domain research"
			],
			capabilities: [
				"problem_solving",
				"communication",
				"analytical"
			],
			interests: ["technology"],
			subjects: ["English", "Mathematics"],
			pathways: ["Relevant undergraduate or diploma pathway", "Self-directed portfolio + verified open courses"],
			altRoutes: ["Skill portfolio, internships, and mentorship"],
			projects: [`Starter ${name.trim()} mini-case study`],
			commitment: "Consistent weekly practice builds foundational confidence.",
			commitmentLevel: 3,
			estimatedCostNote: "Can begin free online; optional exam or workshop fees vary.",
			progression: [
				`Junior ${name.trim()}`,
				name.trim(),
				`Senior ${name.trim()}`
			],
			freelanceOpportunity: "Independent consulting and project-based work available with portfolio experience.",
			entrepreneurshipOpportunity: "Strong potential to launch a specialist studio or service after industry experience.",
			entryLevelOpportunities: "Junior trainee, intern, and coordinator openings.",
			pros: ["Growing real-world applicability", "Clear starter skill path"],
			cons: ["Requires ongoing curiosity and practice", "Competition for top roles"],
			resources: [{
				name: "SWAYAM India",
				url: "https://swayam.gov.in/",
				cost: "Free",
				note: "National open MOOC curriculum across disciplines"
			}],
			trial: `Spend 20 minutes researching one real problem solved by a ${name.trim()} and outline a first step.`,
			challengeId: "software",
			emerging: true,
			environment: "Hybrid / collaborative",
			minEducation: "Class 12",
			budgetTier: 0,
			tags: [industry.toLowerCase(), ...skills.map((s) => s.toLowerCase())]
		};
		try {
			await saveSingleCareerToFirestore(customCareer);
			await onUpdated();
			toast.success(`Saved "${customCareer.name}" to Firestore /careers`);
			setName("");
			setSubcategory("");
			setShortDesc("");
			setSkillsRaw("");
			setShowAdd(false);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Couldn't save custom career");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
		className: "mb-6 border-cyan/40",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "grid size-9 place-items-center rounded-xl bg-cyan/15 text-cyan",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 110,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 109,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Admin Career Catalog Manager"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 113,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground",
					children: [totalCount, " careers active across 20 industries · Authorized admin access"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 114,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 112,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 108,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "outline",
					onClick: handleSeedAll,
					disabled: seeding,
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Database, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 121,
							columnNumber: 13
						}, this),
						" ",
						seeding ? "Syncing 260 careers…" : "Seed / Sync 260 Careers to Firestore"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 120,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "soft",
					onClick: () => setShowAdd(!showAdd),
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 125,
							columnNumber: 13
						}, this),
						" ",
						showAdd ? "Close form" : "Add / Update Career"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 124,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 119,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 107,
			columnNumber: 7
		}, this), showAdd && /* @__PURE__ */ (void 0)("form", {
			onSubmit: handleAddCareer,
			className: "mt-4 grid gap-3 border-t border-glass-border pt-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (void 0)("label", {
					className: "grid gap-1 text-xs",
					children: ["Career Name *", /* @__PURE__ */ (void 0)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "e.g. Drone Cinematographer",
						className: inputClass("h-10"),
						required: true
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 131,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("label", {
					className: "grid gap-1 text-xs",
					children: ["Industry *", /* @__PURE__ */ (void 0)("select", {
						value: industry,
						onChange: (e) => setIndustry(e.target.value),
						className: selectClass("h-10"),
						children: INDUSTRIES.map((ind) => /* @__PURE__ */ (void 0)("option", {
							value: ind,
							children: ind
						}, ind, false, {
							fileName: _jsxFileName,
							lineNumber: 138,
							columnNumber: 38
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 137,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 135,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("label", {
					className: "grid gap-1 text-xs",
					children: ["Subcategory", /* @__PURE__ */ (void 0)("input", {
						value: subcategory,
						onChange: (e) => setSubcategory(e.target.value),
						placeholder: "e.g. Aerial Media",
						className: inputClass("h-10")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 145,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 143,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("label", {
					className: "grid gap-1 text-xs",
					children: ["Key Skills (comma-separated)", /* @__PURE__ */ (void 0)("input", {
						value: skillsRaw,
						onChange: (e) => setSkillsRaw(e.target.value),
						placeholder: "e.g. Flight planning, Framing, Safety",
						className: inputClass("h-10")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 149,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 147,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("label", {
					className: "grid gap-1 text-xs sm:col-span-2",
					children: ["Short Description *", /* @__PURE__ */ (void 0)("input", {
						value: shortDesc,
						onChange: (e) => setShortDesc(e.target.value),
						placeholder: "Clear 1-sentence summary of what the career does.",
						className: inputClass("h-10"),
						required: true
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 153,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 151,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (void 0)(Button, {
						type: "submit",
						disabled: saving,
						children: saving ? "Saving…" : "Save Career to Firestore"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 156,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 155,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 130,
			columnNumber: 19
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 106,
		columnNumber: 10
	}, this);
}
function Dashboard() {
	const { user, loading, refreshUser } = useUser();
	const s = useApp();
	const { careers, refresh } = useCareersCatalog();
	if (!loading && !user) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		greeting: true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
			className: "mx-auto max-w-2xl space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-2xl font-semibold",
					children: "Sign in for your personal dashboard"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 177,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-text-2",
					children: "Sign in with Google or email to unlock your protected workspace — saved career folders, discovery reports, side-by-side comparisons, and multi-phase roadmaps synced to Cloud Firestore."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 180,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/auth",
						search: { next: "/dashboard" },
						className: btnClass("primary"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogIn, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 189,
							columnNumber: 15
						}, this), " Sign in / Create account"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 186,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/discover",
						className: btnClass("outline"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Compass, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 192,
							columnNumber: 15
						}, this), " Browse 260+ Careers as Guest"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 191,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 185,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 176,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 175,
		columnNumber: 12
	}, this);
	const p = roadmapProgress(s.roadmap);
	const challenges = Object.values(s.challenges).filter((c) => c.answer);
	const reflections = Object.entries(s.challenges).filter(([, c]) => c.enjoy || c.reflection);
	const firstVisit = s.saved.length === 0 && !s.roadmap && challenges.length === 0 && s.comparedCount === 0 && !s.discovery && s.savedOpportunities.length === 0;
	const next = s.roadmap?.tasks.find((t) => !t.done);
	const roadCareer = s.roadmap ? getCareer(s.roadmap.careerId, careers) : void 0;
	const topMatches = (() => {
		const ids = /* @__PURE__ */ new Set([
			...s.discovery?.results ?? [],
			...s.saved,
			...roadCareer ? [roadCareer.id] : []
		]);
		const matched = Array.from(ids).map((id) => getCareer(id, careers)).filter((c) => Boolean(c));
		if (matched.length >= 3) return matched;
		const extras = careers.filter((c) => !ids.has(c.id)).slice(0, Math.max(6, 12 - matched.length));
		return [...matched, ...extras];
	})().map((career) => ({
		career,
		compat: computeCompatibility(career, s.profile, s.discovery?.answers)
	})).sort((a, b) => b.compat.score - a.compat.score).slice(0, 3);
	const avgCompatibility = topMatches.length > 0 ? Math.round(topMatches.reduce((acc, item) => acc + item.compat.score, 0) / topMatches.length) : 0;
	const appliedCount = s.savedOpportunities.filter((o) => o.status === "applied").length;
	const planningCount = s.savedOpportunities.filter((o) => o.status === "planning").length;
	const primaryFocusCareer = roadCareer ?? topMatches[0]?.career;
	const primaryInsight = primaryFocusCareer ? getCareerInsight(primaryFocusCareer) : void 0;
	const handleResend = async () => {
		try {
			await resendVerificationEmail();
			toast.success("Verification email sent");
		} catch (e) {
			toast.error(friendlyAuthError(e));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		greeting: true,
		children: [
			user && !user.emailVerified && /* @__PURE__ */ (void 0)("div", {
				className: "mb-6",
				children: /* @__PURE__ */ (void 0)(Notice, {
					tone: "warn",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (void 0)("span", { children: [
							"Please verify your email (",
							/* @__PURE__ */ (void 0)("span", {
								className: "font-medium text-foreground",
								children: user.email
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 237,
								columnNumber: 17
							}, this),
							") to enable Cloud Firestore saving across devices."
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 235,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (void 0)(Button, {
								variant: "outline",
								className: "h-8 min-h-8 px-2.5 text-xs",
								onClick: handleResend,
								children: "Resend verification email"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 241,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Button, {
								variant: "soft",
								className: "h-8 min-h-8 px-2.5 text-xs",
								onClick: () => void refreshUser(),
								children: "I’ve verified — refresh"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 244,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 240,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 234,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 233,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 232,
				columnNumber: 39
			}, this),
			isUserAdmin(user) && /* @__PURE__ */ (void 0)(AdminCatalogPanel, {
				totalCount: careers.length,
				onUpdated: refresh
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 252,
				columnNumber: 29
			}, this),
			firstVisit && /* @__PURE__ */ (void 0)(Glass, {
				className: "mb-6",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Welcome to Futuroute 👋"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 257,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "mt-1 text-text-2",
						children: "Pick a starting point — complete your onboarding profile, run guided career discovery, or explore 260+ careers across 20 industries."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 258,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 256,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (void 0)(Link, {
								to: "/onboarding",
								className: btnClass("primary"),
								children: [/* @__PURE__ */ (void 0)(UserCheck, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 265,
									columnNumber: 17
								}, this), " Complete profile setup"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 264,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Link, {
								to: "/discover",
								className: btnClass("outline"),
								children: [/* @__PURE__ */ (void 0)(Compass, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 268,
									columnNumber: 17
								}, this), " Start career discovery"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 267,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Link, {
								to: "/simulator",
								className: btnClass("outline"),
								children: [/* @__PURE__ */ (void 0)(ArrowLeftRight, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 271,
									columnNumber: 17
								}, this), " Simulate career switch"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 270,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(Link, {
								to: "/opportunities",
								className: btnClass("outline"),
								children: [/* @__PURE__ */ (void 0)(Briefcase, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 274,
									columnNumber: 17
								}, this), " Opportunity finder"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 273,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 263,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 255,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 254,
				columnNumber: 22
			}, this),
			s.profile && /* @__PURE__ */ (void 0)(Glass, {
				className: "mb-6",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (void 0)("p", {
								className: "text-xs font-medium uppercase tracking-wider text-cyan",
								children: "Personalised Profile"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 283,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("h2", {
								className: "font-display text-xl font-semibold",
								children: [s.profile.displayName || user?.displayName || "Explorer", s.profile.educationLevel ? ` · ${s.profile.educationLevel}` : ""]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 286,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-text-2",
								children: [
									"Budget ₹",
									s.profile.budget.toLocaleString("en-IN"),
									" · ",
									s.profile.weeklyHours,
									" h/week",
									s.profile.environment ? ` · ${s.profile.environment}` : "",
									s.profile.preferredWorkLocation ? ` · ${s.profile.preferredWorkLocation}` : ""
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 290,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap gap-1.5 pt-1",
								children: s.profile.interests.slice(0, 8).map((intId) => /* @__PURE__ */ (void 0)(Chip, {
									className: "px-2.5 py-0.5 text-xs",
									children: intId
								}, intId, false, {
									fileName: _jsxFileName,
									lineNumber: 296,
									columnNumber: 63
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 295,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 282,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)(Link, {
						to: "/profile",
						className: btnClass("outline", "text-xs"),
						children: "Edit profile & preferences"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 301,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 281,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 280,
				columnNumber: 21
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
						className: "flex flex-col justify-between p-5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm font-medium text-text-2",
								children: "Top Career Matches"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 313,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "grid size-9 place-items-center rounded-xl bg-accent text-lavender-bright",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Compass, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 315,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 314,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 312,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3 space-y-2",
							children: topMatches.map(({ career }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/careers/$id",
								params: { id: career.id },
								className: "flex items-center justify-between gap-2 rounded-xl border border-glass-border bg-secondary/60 px-3 py-2 text-xs transition hover:border-lavender/50",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "truncate font-medium text-foreground",
									children: career.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 324,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CompatibilityBadge, {
									career,
									profile: s.profile,
									fallbackAnswers: s.discovery?.answers
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 325,
									columnNumber: 19
								}, this)]
							}, career.id, true, {
								fileName: _jsxFileName,
								lineNumber: 321,
								columnNumber: 19
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 318,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 311,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/discover",
							className: "mt-3 inline-flex items-center gap-1 text-xs text-cyan hover:underline",
							children: [
								s.discovery ? "Refine career discovery" : "Take full discovery questionnaire",
								" ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 331,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 329,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 310,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
						className: "flex flex-col justify-between p-5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm font-medium text-text-2",
									children: "Average Career Compatibility"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 339,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "grid size-9 place-items-center rounded-xl bg-accent text-cyan",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Gauge, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 341,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 340,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 338,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 font-display text-3xl font-semibold tabular-nums",
								children: [avgCompatibility, "%"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 344,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [
									"Rule-based estimate across your top ",
									topMatches.length,
									" matches & profile fields."
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 347,
								columnNumber: 13
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 337,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3 flex flex-wrap gap-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/profile",
								className: "text-cyan hover:underline",
								children: "Update profile inputs →"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 352,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/simulator",
								className: "text-lavender-bright hover:underline",
								children: "Simulate switch →"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 355,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 351,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 336,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
						className: "flex flex-col justify-between p-5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm font-medium text-text-2",
									children: "Active Career Roadmap"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 365,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "grid size-9 place-items-center rounded-xl bg-accent text-lavender-bright",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Map, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 367,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 366,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 364,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 truncate font-display text-xl font-semibold",
								children: s.roadmap ? roadCareer?.name || s.roadmap.title : "No roadmap active yet"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 370,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: s.roadmap ? `Phase ${p.phase} of 5 · ${s.roadmaps.length} roadmap${s.roadmaps.length === 1 ? "" : "s"} saved` : "Build a personalized 5-phase career path from any career or simulator."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 373,
								columnNumber: 13
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 363,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/roadmap",
							className: "mt-3 inline-flex items-center gap-1 text-xs text-cyan hover:underline",
							children: [
								s.roadmap ? "Open 5-Phase Roadmap" : "Create roadmap",
								" ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 379,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 377,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 362,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
						className: "flex flex-col justify-between p-5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm font-medium text-text-2",
									children: "Learning Progress"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 387,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "grid size-9 place-items-center rounded-xl bg-accent text-turquoise",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 389,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 388,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 386,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 font-display text-3xl font-semibold tabular-nums",
								children: [p.pct, "%"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 392,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: s.roadmap ? `${p.done} of ${p.total} milestones done · ${s.roadmap.hours} h/wk pace` : `${s.saved.length} careers saved · ${challenges.length}/8 challenges tried`
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 393,
								columnNumber: 13
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 385,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: s.roadmap ? "/roadmap" : "/planner",
							className: "mt-3 inline-flex items-center gap-1 text-xs text-cyan hover:underline",
							children: [
								s.roadmap ? "Tick next milestone" : "Build budget-to-skill plan",
								" ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 399,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 397,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 384,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
						className: "flex flex-col justify-between p-5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm font-medium text-text-2",
									children: "Saved Opportunities"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 407,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "grid size-9 place-items-center rounded-xl bg-accent text-cyan",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 409,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 408,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 406,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 font-display text-3xl font-semibold tabular-nums",
								children: s.savedOpportunities.length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 412,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: s.savedOpportunities.length > 0 ? `${planningCount} planning · ${appliedCount} applied across verified portals` : "Browse internships, scholarships, free courses, and hackathons."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 415,
								columnNumber: 13
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 405,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/opportunities",
							className: "mt-3 inline-flex items-center gap-1 text-xs text-cyan hover:underline",
							children: ["Explore Opportunity Finder ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 420,
								columnNumber: 40
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 419,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 404,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
						className: "flex flex-col justify-between p-5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm font-medium text-text-2",
									children: "Financial Expectation Overview"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 428,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "grid size-9 place-items-center rounded-xl bg-accent text-lavender-bright",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IndianRupee, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 430,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 429,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 427,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 font-display text-2xl font-semibold tabular-nums",
								children: s.profile?.expectedStartingSalaryInr ? `${formatAmountFromInr(s.profile.expectedStartingSalaryInr, "INR")} target` : primaryInsight ? formatRangeFromInr(primaryInsight.indiaEntryInr, "INR") : "Set goal"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 433,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: primaryFocusCareer && primaryInsight ? `${primaryFocusCareer.name} India entry benchmark: ${formatRangeFromInr(primaryInsight.indiaEntryInr, "INR")} · Edu ~₹${Math.round(primaryInsight.educationCostInr[0] / 1e3)}k–₹${Math.round(primaryInsight.educationCostInr[1] / 1e3)}k` : "Add optional starting salary expectations in Profile to compare against career bands."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 436,
								columnNumber: 13
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 426,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3 flex flex-wrap gap-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/profile",
								className: "text-cyan hover:underline",
								children: "Set financial goal →"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 441,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/compare",
								className: "text-lavender-bright hover:underline",
								children: "Compare salaries →"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 444,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 440,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 425,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 308,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display text-xl font-semibold",
							children: "My Career Exploration"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 455,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-muted-foreground",
							children: "Interactive route map anchored to your saved shortlist."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 456,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 454,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/compare",
							className: btnClass("soft"),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GitCompareArrows, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 461,
								columnNumber: 15
							}, this), " Compare careers"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 460,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 453,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RouteMap, { className: "mt-4 max-h-[340px]" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 464,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-2 rounded-full bg-turquoise" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 467,
									columnNumber: 15
								}, this), " Saved"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 466,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-2 rounded-full bg-cyan" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 470,
									columnNumber: 15
								}, this), " Recently explored"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 469,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-2 rounded-full bg-lavender" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 473,
									columnNumber: 15
								}, this), " Suggested next"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 472,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 465,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-6 grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mb-2 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-sm font-medium text-text-2",
								children: "Saved career shortlist"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 479,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/saved",
								className: "text-xs text-cyan hover:underline",
								children: "Manage folders →"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 480,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 478,
							columnNumber: 15
						}, this), s.saved.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-muted-foreground",
							children: "Nothing saved yet."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 484,
							columnNumber: 39
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "space-y-2",
							children: s.saved.slice(0, 6).map((id) => {
								const c = getCareer(id, careers);
								return c && /* @__PURE__ */ (void 0)("li", {
									className: "glass-soft flex items-center justify-between gap-2 px-3 py-2",
									children: [/* @__PURE__ */ (void 0)(Link, {
										to: "/careers/$id",
										params: { id },
										className: "truncate text-sm hover:text-lavender-bright",
										children: c.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 488,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)(SaveButton, {
										career: c,
										compact: true
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 493,
										columnNumber: 27
									}, this)]
								}, id, true, {
									fileName: _jsxFileName,
									lineNumber: 487,
									columnNumber: 29
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 484,
							columnNumber: 109
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 477,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "mb-2 text-sm font-medium text-text-2",
							children: "Recently explored"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 499,
							columnNumber: 15
						}, this), s.recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-muted-foreground",
							children: "Open a career profile to see it here."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 500,
							columnNumber: 40
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap gap-2",
							children: s.recent.map((id) => {
								const c = getCareer(id, careers);
								return c && /* @__PURE__ */ (void 0)(Link, {
									to: "/careers/$id",
									params: { id },
									children: /* @__PURE__ */ (void 0)(Chip, { children: c.name }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 508,
										columnNumber: 27
									}, this)
								}, id, false, {
									fileName: _jsxFileName,
									lineNumber: 505,
									columnNumber: 29
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 502,
							columnNumber: 24
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 498,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 476,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 452,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-xl font-semibold",
						children: "My Active Roadmap"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 518,
						columnNumber: 13
					}, this), s.roadmap ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 flex items-center gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProgressRing, { value: p.pct }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 521,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "font-medium",
										children: roadCareer?.name || s.roadmap.title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 523,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-text-2",
										children: ["Current phase: ", p.phase]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 524,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-success",
										children: [p.done, " completed"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 525,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-muted-foreground",
										children: [p.total - p.done, " remaining"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 526,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 522,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 520,
							columnNumber: 17
						}, this),
						next && /* @__PURE__ */ (void 0)("p", {
							className: "mt-4 text-sm text-text-2",
							children: ["Next: ", /* @__PURE__ */ (void 0)("span", {
								className: "text-foreground",
								children: next.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 530,
								columnNumber: 27
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 529,
							columnNumber: 26
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/roadmap",
							className: btnClass("primary", "mt-4 w-full"),
							children: ["Continue Roadmap ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 533,
								columnNumber: 36
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 532,
							columnNumber: 17
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 519,
						columnNumber: 26
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmptyState, {
							icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Map, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 536,
								columnNumber: 35
							}, this),
							title: "No roadmap yet",
							text: "Create a budget-aware plan and turn it into tasks you can tick off.",
							action: {
								label: "Create a plan",
								to: "/planner"
							}
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 536,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 535,
						columnNumber: 21
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 517,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Recent activity"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 544,
						columnNumber: 13
					}, this), s.activity.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmptyState, {
							icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Activity, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 546,
								columnNumber: 35
							}, this),
							title: "Your journey starts here",
							text: "Save a career, try a challenge, or tick off a roadmap milestone — it'll appear here."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 546,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 545,
						columnNumber: 40
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "mt-3 space-y-2",
						children: s.activity.slice(0, 6).map((a) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
							className: "flex items-start justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-start gap-2 text-text-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 550,
									columnNumber: 23
								}, this), a.text]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 549,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "shrink-0 text-xs text-muted-foreground",
								children: ago(a.at)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 553,
								columnNumber: 21
							}, this)]
						}, a.id, true, {
							fileName: _jsxFileName,
							lineNumber: 548,
							columnNumber: 50
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 547,
						columnNumber: 24
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 543,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 516,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 451,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Challenge reflections"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 562,
					columnNumber: 11
				}, this), reflections.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Complete a mini-challenge and share how it felt."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 563,
					columnNumber: 39
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "mt-3 space-y-2",
					children: reflections.map(([id, c]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
						className: "glass-soft px-3 py-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium capitalize",
								children: id
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 567,
								columnNumber: 19
							}, this),
							c.enjoy && /* @__PURE__ */ (void 0)("span", {
								className: "ml-2 text-xs text-cyan",
								children: {
									enjoyed: "Enjoyed it",
									okay: "It was okay",
									not: "Not for me"
								}[c.enjoy]
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 568,
								columnNumber: 31
							}, this),
							c.reflection && /* @__PURE__ */ (void 0)("p", {
								className: "mt-1 text-text-2",
								children: [
									"“",
									c.reflection,
									"”"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 575,
								columnNumber: 36
							}, this)
						]
					}, id, true, {
						fileName: _jsxFileName,
						lineNumber: 566,
						columnNumber: 45
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 565,
					columnNumber: 20
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 561,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Continue where you left off"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 580,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-3 flex flex-col gap-2",
					children: [
						next && /* @__PURE__ */ (void 0)(Link, {
							to: "/roadmap",
							className: btnClass("outline", "justify-between"),
							children: [
								"Roadmap: ",
								next.title,
								/* @__PURE__ */ (void 0)(ArrowRight, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 584,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 582,
							columnNumber: 22
						}, this),
						s.compare.length >= 2 && /* @__PURE__ */ (void 0)(Link, {
							to: "/compare",
							className: btnClass("outline", "justify-between"),
							children: [
								"Comparison shortlist:",
								" ",
								s.compare.map((id) => getCareer(id, careers)?.name).filter(Boolean).join(" vs "),
								/* @__PURE__ */ (void 0)(ArrowRight, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 589,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 586,
							columnNumber: 39
						}, this),
						s.discovery ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/discover",
							className: btnClass("outline", "justify-between"),
							children: ["View your latest discovery report", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 593,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 591,
							columnNumber: 28
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/discover",
							className: btnClass("outline", "justify-between"),
							children: ["Start guided career discovery", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 596,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 594,
							columnNumber: 25
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 581,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 579,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 560,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 231,
		columnNumber: 10
	}, this);
}
//#endregion
export { Dashboard as component };
