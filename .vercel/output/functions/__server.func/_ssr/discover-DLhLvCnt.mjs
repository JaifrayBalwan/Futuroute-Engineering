import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { S as useNavigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Glass, c as PageHeader, f as inputClass, n as Button, p as selectClass, r as Chip, s as Notice, u as btnClass } from "./ui-kit-BmqGm62i.mjs";
import { a as SUBJECTS, n as INTERESTS, t as CAPABILITIES } from "./auth-Bjd81y0G.mjs";
import { i as actions, r as INDUSTRIES, s as useApp } from "./careers-ChJ9jiL5.mjs";
import { r as useCareersCatalog } from "./careers-service-BdvVUi83.mjs";
import { $ as ArrowLeft, F as FlaskConical, Q as ArrowRight, c as SlidersHorizontal, d as Search, j as GitCompareArrows, m as RotateCcw, n as Wallet, s as Sparkles, z as Compass } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DVN8uj3t.mjs";
import { i as recommendGrouped } from "./engine-DVCtS3eD.mjs";
import { n as CompatibilityCard, t as CompatibilityBadge } from "./CompatibilityCard-DGCoBrUg.mjs";
import { r as SaveButton, t as CareerCard } from "./CareerParts-BEKUbYuv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/discover-DLhLvCnt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/discover.tsx?tsr-split=component";
var QUICK_CURIOUS_IDS = [
	"software-developer",
	"ai-ml-engineer",
	"sports-analytics-engineer",
	"football-coach",
	"ui-ux-designer",
	"data-analyst",
	"cybersecurity-analyst",
	"digital-marketer",
	"investment-banking-analyst",
	"corporate-lawyer",
	"biotech-researcher",
	"game-developer",
	"entrepreneurship-founder",
	"sustainability-consultant",
	"clinical-psychologist"
];
function buildSteps(careers) {
	const curiousOptions = QUICK_CURIOUS_IDS.map((id) => {
		const c = careers.find((x) => x.id === id);
		return c ? {
			value: c.id,
			label: c.name
		} : null;
	}).filter((x) => Boolean(x));
	return [
		{
			key: "education",
			title: "What's your current education level?",
			type: "single",
			options: [
				"Class 9–10",
				"Class 11–12",
				"Diploma",
				"Undergraduate",
				"Postgraduate",
				"Other"
			].map((v) => ({
				value: v,
				label: v
			}))
		},
		{
			key: "interests",
			title: "Which interests and topics excite you most?",
			help: "Pick as many as you enjoy — from football and cricket to AI, law, or art.",
			type: "multi",
			options: INTERESTS.map(([value, label]) => ({
				value,
				label
			}))
		},
		{
			key: "capabilities",
			title: "Which strengths or capabilities fit you best?",
			help: "Pick traits you already notice or want to build.",
			type: "multi",
			options: CAPABILITIES.map(([value, label]) => ({
				value,
				label
			}))
		},
		{
			key: "subjects",
			title: "Which subjects do you enjoy most?",
			help: "Optional — helps connect school learning with career fields.",
			type: "multi",
			optional: true,
			options: SUBJECTS.map((v) => ({
				value: v,
				label: v
			}))
		},
		{
			key: "work",
			title: "What kind of day-to-day work sounds appealing?",
			type: "multi",
			options: [
				"Solving logical problems",
				"Designing visuals",
				"Working with data",
				"Talking to people",
				"Protecting systems",
				"Running campaigns",
				"Building things",
				"Physical Fitness",
				"Investigating mysteries"
			].map((v) => ({
				value: v,
				label: v
			}))
		},
		{
			key: "environment",
			title: "Preferred working environment?",
			type: "single",
			optional: true,
			options: [
				"Office / desk",
				"Outdoors / on the move",
				"Lab or studio",
				"Remote / from home",
				"With people (schools, clinics, events)",
				"No preference"
			].map((v) => ({
				value: v,
				label: v
			}))
		},
		{
			key: "curious",
			title: "Any careers you're already curious about?",
			help: "Optional — pick a few starting points or browse all 260+ in the Explorer tab.",
			type: "multi",
			optional: true,
			options: curiousOptions
		},
		{
			key: "hours",
			title: "How much time can you give each week?",
			type: "slider",
			min: 1,
			max: 25,
			step: 1,
			unit: "hours / week"
		},
		{
			key: "budget",
			title: "What's your available learning budget?",
			help: "Core learning resources across Futuroute are free to start.",
			type: "single",
			options: [
				"₹0 — free only",
				"Up to ₹500",
				"Up to ₹1,000",
				"Up to ₹5,000"
			].map((v) => ({
				value: v,
				label: v
			}))
		},
		{
			key: "priorities",
			title: "What matters most to you in a career?",
			help: "Pick up to three.",
			type: "multi",
			options: [
				"Creativity",
				"Flexibility",
				"Stability",
				"Problem-solving",
				"Impact",
				"Leadership"
			].map((v) => ({
				value: v,
				label: v
			}))
		}
	];
}
function Discover() {
	const { discovery, profile } = useApp();
	const { careers } = useCareersCatalog();
	const [tab, setTab] = (0, import_react.useState)("guided");
	const STEPS = (0, import_react.useMemo)(() => buildSteps(careers), [careers]);
	const initialAnswers = (0, import_react.useMemo)(() => {
		const base = { hours: profile?.weeklyHours ?? 5 };
		if (profile?.educationLevel) base["education"] = profile.educationLevel;
		if (profile?.interests?.length) base["interests"] = profile.interests;
		if (profile?.capabilities?.length) base["capabilities"] = profile.capabilities;
		if (profile?.subjects?.length) base["subjects"] = profile.subjects;
		if (profile?.environment) base["environment"] = profile.environment;
		if (typeof profile?.budget === "number") base["budget"] = profile.budget === 0 ? "₹0 — free only" : profile.budget <= 500 ? "Up to ₹500" : profile.budget <= 1e3 ? "Up to ₹1,000" : "Up to ₹5,000";
		return base;
	}, [profile]);
	const [i, setI] = (0, import_react.useState)(0);
	const [a, setA] = (0, import_react.useState)(initialAnswers);
	const [err, setErr] = (0, import_react.useState)("");
	const [showForm, setShowForm] = (0, import_react.useState)(!discovery);
	(0, import_react.useEffect)(() => {
		if (!discovery && profile && i === 0) setA((prev) => ({
			...initialAnswers,
			...prev
		}));
	}, [profile?.uid]);
	const step = STEPS[i];
	const val = a[step.key];
	const valid = () => step.optional || step.type === "slider" || (Array.isArray(val) ? val.length > 0 : Boolean(val));
	const submitAssessment = (answersToRun) => {
		setErr("");
		const grouped = recommendGrouped(answersToRun, careers);
		actions.setDiscovery(answersToRun, grouped.strongMatches.map((m) => m.career.id), grouped, "deterministic");
		setShowForm(false);
	};
	const next = () => {
		if (!valid()) {
			setErr("Please choose at least one option, or go back to adjust an earlier answer.");
			return;
		}
		setErr("");
		if (i < STEPS.length - 1) setI(i + 1);
		else submitAssessment(a);
	};
	const toggle = (o) => {
		const cur = Array.isArray(val) ? val : [];
		if (cur.includes(o)) setA({
			...a,
			[step.key]: cur.filter((x) => x !== o)
		});
		else if (step.key === "priorities" && cur.length >= 3) setErr("You can pick up to three priorities.");
		else {
			setErr("");
			setA({
				...a,
				[step.key]: [...cur, o]
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		eyebrow: "Discover Careers",
		title: "Find paths that match your curiosity",
		text: "Get personalised grouped recommendations across our 260-career database, or browse every industry freely.",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: tab === "guided" ? "primary" : "outline",
				onClick: () => setTab("guided"),
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersHorizontal, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 199,
					columnNumber: 13
				}, this), " Guided Discovery"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 198,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: tab === "browse" ? "primary" : "outline",
				onClick: () => setTab("browse"),
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Compass, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 202,
						columnNumber: 13
					}, this),
					" Explore ",
					careers.length,
					"+ Careers"
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 201,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 197,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 196,
		columnNumber: 7
	}, this), tab === "browse" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BrowseCatalog, {
		careers,
		userInterests: profile?.interests ?? []
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 207,
		columnNumber: 27
	}, this) : !showForm && discovery ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GroupedReport, {
		answers: discovery.answers,
		savedGroups: discovery.groups,
		careers,
		onRetake: () => {
			setA(discovery.answers);
			setI(0);
			setShowForm(true);
		}
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 207,
		columnNumber: 131
	}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-3 flex items-center justify-between text-xs text-text-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
					"Step ",
					i + 1,
					" of ",
					STEPS.length
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 213,
					columnNumber: 13
				}, this), profile?.interests?.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-cyan",
					children: "Pre-filled from your saved profile (editable)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 216,
					columnNumber: 43
				}, this) : null]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 212,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-6 h-2 overflow-hidden rounded-full bg-secondary",
				role: "progressbar",
				"aria-valuemin": 0,
				"aria-valuemax": STEPS.length,
				"aria-valuenow": i + 1,
				"aria-label": "Questionnaire progress",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "h-full bg-brand transition-all",
					style: { width: `${(i + 1) / STEPS.length * 100}%` }
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 219,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 218,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("fieldset", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("legend", {
						className: "font-display text-2xl font-semibold",
						children: step.title
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 225,
						columnNumber: 15
					}, this),
					step.help && /* @__PURE__ */ (void 0)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: step.help
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 226,
						columnNumber: 29
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-6",
						children: step.type === "slider" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							htmlFor: "hours",
							className: "font-display text-4xl font-semibold",
							children: [
								val ?? 5,
								" ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-base text-text-2",
									children: step.unit
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 231,
									columnNumber: 23
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 21
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							id: "hours",
							type: "range",
							min: step.min,
							max: step.max,
							step: step.step,
							value: val ?? 5,
							onChange: (e) => setA({
								...a,
								[step.key]: Number(e.target.value)
							}),
							className: "mt-4 w-full accent-[var(--lavender-bright)]"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 233,
							columnNumber: 21
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 228,
							columnNumber: 43
						}, this) : step.type === "single" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: step.options.map((o) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								"aria-pressed": val === o.value,
								onClick: () => {
									setErr("");
									setA({
										...a,
										[step.key]: o.value
									});
								},
								className: `rounded-2xl border px-4 py-4 text-left transition ${val === o.value ? "border-lavender/60 bg-lavender/20 glow" : "border-glass-border bg-secondary hover:bg-accent"}`,
								children: o.label
							}, o.value, false, {
								fileName: _jsxFileName,
								lineNumber: 238,
								columnNumber: 45
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 237,
							columnNumber: 53
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap gap-2",
							children: step.options.map((o) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
								active: Array.isArray(val) && val.includes(o.value),
								onClick: () => toggle(o.value),
								children: o.label
							}, o.value, false, {
								fileName: _jsxFileName,
								lineNumber: 248,
								columnNumber: 45
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 247,
							columnNumber: 28
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 227,
						columnNumber: 15
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 224,
					columnNumber: 13
				}, this),
				err && /* @__PURE__ */ (void 0)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (void 0)(Notice, {
						tone: "warn",
						children: err
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 255,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 254,
					columnNumber: 21
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "ghost",
						onClick: () => {
							setErr("");
							setI(Math.max(0, i - 1));
						},
						disabled: i === 0,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 262,
							columnNumber: 17
						}, this), " Back"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 258,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-2",
						children: [step.optional && i < STEPS.length - 1 && /* @__PURE__ */ (void 0)(Button, {
							variant: "ghost",
							onClick: () => {
								setErr("");
								setI(i + 1);
							},
							children: "Skip"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 265,
							columnNumber: 59
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: next,
							children: i === STEPS.length - 1 ? "Generate Discovery Report" : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: ["Next ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 273,
								columnNumber: 28
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 272,
								columnNumber: 75
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 271,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 264,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 257,
					columnNumber: 13
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 223,
				columnNumber: 11
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 211,
		columnNumber: 13
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 195,
		columnNumber: 10
	}, this);
}
function GroupedReport({ answers, savedGroups, careers, onRetake }) {
	const nav = useNavigate();
	const { profile } = useApp();
	const [openBreakdownId, setOpenBreakdownId] = (0, import_react.useState)(null);
	const report = (0, import_react.useMemo)(() => {
		if (savedGroups && Array.isArray(savedGroups.strongMatches) && savedGroups.strongMatches.length > 0) return savedGroups;
		return recommendGrouped(answers, careers);
	}, [
		answers,
		careers,
		savedGroups
	]);
	const sections = [
		{
			title: "Strong Matches",
			subtitle: "Closest fit across your interests, capabilities, and preferred style of work.",
			tone: "text-cyan",
			items: report.strongMatches
		},
		{
			title: "Alternative Career Paths",
			subtitle: "Cross-industry careers that reuse your strongest capabilities in a different domain.",
			tone: "text-lavender-bright",
			items: report.alternativePaths
		},
		{
			title: "Unexpected Career Discoveries",
			subtitle: "Creative blends and domains many students overlook until they try them.",
			tone: "text-turquoise",
			items: report.unexpectedDiscoveries
		},
		{
			title: "Emerging Career Opportunities",
			subtitle: "Modern and fast-evolving roles connected to your profile.",
			tone: "text-pink",
			items: report.emergingOpportunities
		}
	];
	const topCompareIds = report.strongMatches.slice(0, 3).map((x) => x.career.id);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-xs text-muted-foreground",
				children: report.summaryNote
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 333,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "outline",
					onClick: onRetake,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcw, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 336,
						columnNumber: 13
					}, this), " Change answers"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 335,
					columnNumber: 11
				}, this), topCompareIds.length >= 2 && /* @__PURE__ */ (void 0)(Button, {
					onClick: () => {
						actions.setCompare(topCompareIds);
						nav({ to: "/compare" });
					},
					children: [/* @__PURE__ */ (void 0)(GitCompareArrows, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 344,
						columnNumber: 15
					}, this), " Compare top matches"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 338,
					columnNumber: 41
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 334,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 332,
			columnNumber: 7
		}, this), sections.map((sec) => sec.items.length > 0 && /* @__PURE__ */ (void 0)("section", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
				className: `font-display text-2xl font-semibold ${sec.tone}`,
				children: sec.title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 351,
				columnNumber: 17
			}, this), /* @__PURE__ */ (void 0)("p", {
				className: "text-sm text-text-2",
				children: sec.subtitle
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 352,
				columnNumber: 17
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 350,
				columnNumber: 15
			}, this), /* @__PURE__ */ (void 0)("div", {
				className: "space-y-4",
				children: sec.items.map((item) => {
					const c = item.career;
					return /* @__PURE__ */ (void 0)(Glass, {
						as: "article",
						className: "min-w-0 break-words",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (void 0)("p", {
											className: "text-xs uppercase tracking-wider text-cyan",
											children: [
												c.industry,
												" · ",
												c.subcategory,
												c.emerging ? " · Emerging" : ""
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 360,
											columnNumber: 27
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "mt-1 flex flex-wrap items-center gap-2.5",
											children: [/* @__PURE__ */ (void 0)("h3", {
												className: "font-display text-2xl font-semibold",
												children: c.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 365,
												columnNumber: 29
											}, this), /* @__PURE__ */ (void 0)(CompatibilityBadge, {
												career: c,
												profile,
												fallbackAnswers: answers
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 366,
												columnNumber: 29
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 364,
											columnNumber: 27
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "mt-1 text-sm text-text-2",
											children: c.short
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 368,
											columnNumber: 27
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 359,
									columnNumber: 25
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (void 0)(SaveButton, { career: c }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 371,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)(Link, {
										to: "/careers/$id",
										params: { id: c.id },
										className: btnClass("outline"),
										children: "Full profile"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 372,
										columnNumber: 27
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 370,
									columnNumber: 25
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 358,
								columnNumber: 23
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
								children: [
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
										className: "mb-1.5 text-xs font-medium uppercase tracking-wider text-lavender-bright",
										children: "1 · Why this career matches"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 382,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-sm text-text-2",
										children: item.whyItMatches
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 385,
										columnNumber: 27
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 381,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
										className: "mb-1.5 text-xs font-medium uppercase tracking-wider text-lavender-bright",
										children: "2 · Relevant skills you bring"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 388,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex flex-wrap gap-1.5",
										children: item.relevantSkills.map((s) => /* @__PURE__ */ (void 0)(Chip, {
											className: "px-2 py-0.5 text-xs",
											children: s
										}, s, false, {
											fileName: _jsxFileName,
											lineNumber: 392,
											columnNumber: 59
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 391,
										columnNumber: 27
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 387,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
										className: "mb-1.5 text-xs font-medium uppercase tracking-wider text-lavender-bright",
										children: "3 · Skills to develop"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 398,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex flex-wrap gap-1.5",
										children: item.skillsToDevelop.map((s) => /* @__PURE__ */ (void 0)(Chip, {
											className: "px-2 py-0.5 text-xs",
											children: s
										}, s, false, {
											fileName: _jsxFileName,
											lineNumber: 402,
											columnNumber: 60
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 401,
										columnNumber: 27
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 397,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
										className: "mb-1.5 text-xs font-medium uppercase tracking-wider text-lavender-bright",
										children: "4 · Required qualifications"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 408,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)("ul", {
										className: "space-y-1 text-sm text-text-2",
										children: item.requiredQualifications.map((q) => /* @__PURE__ */ (void 0)("li", { children: ["• ", q] }, q, true, {
											fileName: _jsxFileName,
											lineNumber: 412,
											columnNumber: 67
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 411,
										columnNumber: 27
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 407,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
										className: "mb-1.5 text-xs font-medium uppercase tracking-wider text-lavender-bright",
										children: "5 · How to start free"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 416,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-sm text-text-2",
										children: item.howToStart
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 419,
										columnNumber: 27
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 415,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
										className: "mb-1.5 text-xs font-medium uppercase tracking-wider text-lavender-bright",
										children: "6 · Practical beginner trial"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 422,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-sm text-text-2",
										children: item.practicalTrial
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 425,
										columnNumber: 27
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 421,
										columnNumber: 25
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 380,
								columnNumber: 23
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "mt-5 flex flex-wrap gap-2 border-t border-glass-border pt-4",
								children: [
									/* @__PURE__ */ (void 0)(Button, {
										variant: "outline",
										onClick: () => setOpenBreakdownId(openBreakdownId === c.id ? null : c.id),
										children: openBreakdownId === c.id ? "Hide compatibility score" : "Inspect compatibility score"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 430,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (void 0)(Link, {
										to: "/try",
										search: { c: c.challengeId },
										className: btnClass("soft"),
										children: [/* @__PURE__ */ (void 0)(FlaskConical, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 436,
											columnNumber: 27
										}, this), " Try the challenge"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 433,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (void 0)(Link, {
										to: "/planner",
										search: { career: c.id },
										className: btnClass("ghost"),
										children: [/* @__PURE__ */ (void 0)(Wallet, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 441,
											columnNumber: 27
										}, this), " Plan learning"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 438,
										columnNumber: 25
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 429,
								columnNumber: 23
							}, this),
							openBreakdownId === c.id && /* @__PURE__ */ (void 0)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (void 0)(CompatibilityCard, {
									career: c,
									profile,
									fallbackAnswers: answers,
									defaultExpanded: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 446,
									columnNumber: 27
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 445,
								columnNumber: 52
							}, this)
						]
					}, c.id, true, {
						fileName: _jsxFileName,
						lineNumber: 357,
						columnNumber: 18
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 354,
				columnNumber: 15
			}, this)]
		}, sec.title, true, {
			fileName: _jsxFileName,
			lineNumber: 349,
			columnNumber: 52
		}, this))]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 331,
		columnNumber: 10
	}, this);
}
var selCls = selectClass("h-10");
function BrowseCatalog({ careers, userInterests }) {
	const [queryText, setQueryText] = (0, import_react.useState)("");
	const [industry, setIndustry] = (0, import_react.useState)("ALL");
	const [interest, setInterest] = (0, import_react.useState)("ALL");
	const [capability, setCapability] = (0, import_react.useState)("ALL");
	const [budgetMax, setBudgetMax] = (0, import_react.useState)("ALL");
	const [emergingOnly, setEmergingOnly] = (0, import_react.useState)(false);
	const [beyondInterests, setBeyondInterests] = (0, import_react.useState)(false);
	const [sortBy, setSortBy] = (0, import_react.useState)("default");
	const [limit, setLimit] = (0, import_react.useState)(18);
	const filtered = (0, import_react.useMemo)(() => {
		const q = queryText.trim().toLowerCase();
		const userIntSet = new Set(userInterests.map((x) => x.toLowerCase()));
		const list = careers.filter((c) => {
			if (industry !== "ALL" && c.industry !== industry) return false;
			if (interest !== "ALL" && !c.interests.includes(interest)) return false;
			if (capability !== "ALL" && !c.capabilities.includes(capability)) return false;
			if (budgetMax === "0" && c.budgetTier > 0) return false;
			if (budgetMax === "1000" && c.budgetTier > 1e3) return false;
			if (emergingOnly && !c.emerging) return false;
			if (beyondInterests && userIntSet.size > 0) {
				if (c.interests.some((intId) => userIntSet.has(intId.toLowerCase()))) return false;
			}
			if (q) {
				if (!`${c.name} ${c.industry} ${c.subcategory} ${c.short} ${c.skills.join(" ")} ${c.tags.join(" ")}`.toLowerCase().includes(q)) return false;
			}
			return true;
		});
		if (sortBy === "az") return [...list].sort((x, y) => x.name.localeCompare(y.name));
		if (sortBy === "gentle") return [...list].sort((x, y) => x.commitmentLevel - y.commitmentLevel || x.name.localeCompare(y.name));
		if (sortBy === "deep") return [...list].sort((x, y) => y.commitmentLevel - x.commitmentLevel || x.name.localeCompare(y.name));
		return list;
	}, [
		careers,
		queryText,
		industry,
		interest,
		capability,
		budgetMax,
		emergingOnly,
		beyondInterests,
		sortBy,
		userInterests
	]);
	const visible = filtered.slice(0, limit);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-3 md:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative lg:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 500,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								value: queryText,
								onChange: (e) => {
									setQueryText(e.target.value);
									setLimit(18);
								},
								placeholder: "Search careers, industries, skills (e.g. football analytics, biotech, law)…",
								className: inputClass("h-10 pl-9")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 501,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 499,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							"aria-label": "Filter by industry",
							className: selCls,
							value: industry,
							onChange: (e) => {
								setIndustry(e.target.value);
								setLimit(18);
							},
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "ALL",
								children: [
									"All ",
									INDUSTRIES.length,
									" Industries"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 510,
								columnNumber: 13
							}, this), INDUSTRIES.map((ind) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: ind,
								children: ind
							}, ind, false, {
								fileName: _jsxFileName,
								lineNumber: 511,
								columnNumber: 36
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 506,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							"aria-label": "Sort careers",
							className: selCls,
							value: sortBy,
							onChange: (e) => setSortBy(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "default",
									children: "Sort: Featured order"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 516,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "az",
									children: "Sort: A – Z"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 517,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "gentle",
									children: "Sort: Gentlest starting curve"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 518,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "deep",
									children: "Sort: Deepest mastery"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 519,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 515,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 498,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							"aria-label": "Filter by interest",
							className: selCls,
							value: interest,
							onChange: (e) => {
								setInterest(e.target.value);
								setLimit(18);
							},
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "ALL",
								children: "All Interests"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 528,
								columnNumber: 13
							}, this), INTERESTS.map(([id, label]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: id,
								children: ["Interest: ", label]
							}, id, true, {
								fileName: _jsxFileName,
								lineNumber: 529,
								columnNumber: 45
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 524,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							"aria-label": "Filter by capability",
							className: selCls,
							value: capability,
							onChange: (e) => {
								setCapability(e.target.value);
								setLimit(18);
							},
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "ALL",
								children: "All Capabilities"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 538,
								columnNumber: 13
							}, this), CAPABILITIES.map(([id, label]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: id,
								children: ["Strength: ", label]
							}, id, true, {
								fileName: _jsxFileName,
								lineNumber: 539,
								columnNumber: 48
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 534,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							"aria-label": "Filter by starting budget",
							className: selCls,
							value: budgetMax,
							onChange: (e) => {
								setBudgetMax(e.target.value);
								setLimit(18);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "ALL",
									children: "Any starter budget"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 548,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "0",
									children: "Free to start (₹0)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 549,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "1000",
									children: "Up to ₹1,000 optional gear/exam"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 550,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 544,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 523,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
							active: emergingOnly,
							onClick: () => setEmergingOnly(!emergingOnly),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 557,
								columnNumber: 15
							}, this), " Emerging Careers Only"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 556,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
							active: beyondInterests,
							onClick: () => setBeyondInterests(!beyondInterests),
							children: "Explore Beyond My Interests"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 559,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 555,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Showing ",
							visible.length,
							" of ",
							filtered.length,
							" matching careers (",
							careers.length,
							" total)"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 563,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 554,
					columnNumber: 9
				}, this),
				beyondInterests && userInterests.length === 0 && /* @__PURE__ */ (void 0)(Notice, {
					tone: "info",
					children: "Tip: Add interests in your Profile or complete Guided Discovery so “Explore Beyond My Interests” hides your primary fields and surfaces surprising paths."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 567,
					columnNumber: 59
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 497,
			columnNumber: 7
		}, this), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-display text-lg font-semibold",
					children: "No careers match all active filters"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 574,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-sm text-text-2",
					children: "Try widening your industry, capability, or search query."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 575,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "outline",
					className: "mt-4",
					onClick: () => {
						setQueryText("");
						setIndustry("ALL");
						setInterest("ALL");
						setCapability("ALL");
						setBudgetMax("ALL");
						setEmergingOnly(false);
						setBeyondInterests(false);
					},
					children: "Clear all filters"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 578,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 573,
			columnNumber: 32
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
			children: visible.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CareerCard, { career: c }, c.id, false, {
				fileName: _jsxFileName,
				lineNumber: 591,
				columnNumber: 31
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 590,
			columnNumber: 11
		}, this), visible.length < filtered.length && /* @__PURE__ */ (void 0)("div", {
			className: "text-center",
			children: /* @__PURE__ */ (void 0)(Button, {
				variant: "outline",
				onClick: () => setLimit((n) => n + 24),
				children: [
					"Load more careers (",
					filtered.length - visible.length,
					" remaining)"
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 594,
				columnNumber: 15
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 593,
			columnNumber: 48
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 589,
			columnNumber: 20
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 496,
		columnNumber: 10
	}, this);
}
//#endregion
export { Discover as component };
