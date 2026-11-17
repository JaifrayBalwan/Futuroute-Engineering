import { l as __toESM, o as require_jsx_runtime, s as require_react } from "./useSelector-Cu7jxM-W.js";
import { I as Link, L as useNavigate, i as SUBJECTS, n as INTERESTS, t as CAPABILITIES } from "./auth-ByhFdEgm.js";
import { a as Search, l as FlaskConical, n as Wallet, t as AppShell } from "./AppShell-BgEZmUVx.js";
import { a as actions, i as INDUSTRIES, s as useApp } from "./careers-Da7lFkNP.js";
import { c as Compass, r as useCareersCatalog, s as GitCompareArrows, u as createLucideIcon } from "./careers-service-REWdQftI.js";
import { t as ArrowLeft } from "./arrow-left-CT5iacK5.js";
import { t as ArrowRight } from "./arrow-right-Bzry0KKp.js";
import { r as SaveButton, t as CareerCard } from "./CareerParts-DpDkC956.js";
import { n as CompatibilityCard, t as CompatibilityBadge } from "./CompatibilityCard-DgWWA-5m.js";
import { t as RotateCcw } from "./rotate-ccw-B6VJ56SS.js";
import { t as Sparkles } from "./sparkles-WxdkWloa.js";
import { a as Glass, c as PageHeader, d as inputClass, f as selectClass, n as Button, r as Chip, s as Notice, u as btnClass } from "./ui-kit-BDOPC8gw.js";
import { i as recommendGrouped } from "./engine-CZvW0XUP.js";
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var SlidersHorizontal = createLucideIcon("sliders-horizontal", [
	["path", {
		d: "M10 5H3",
		key: "1qgfaw"
	}],
	["path", {
		d: "M12 19H3",
		key: "yhmn1j"
	}],
	["path", {
		d: "M14 3v4",
		key: "1sua03"
	}],
	["path", {
		d: "M16 17v4",
		key: "1q0r14"
	}],
	["path", {
		d: "M21 12h-9",
		key: "1o4lsq"
	}],
	["path", {
		d: "M21 19h-5",
		key: "1rlt1p"
	}],
	["path", {
		d: "M21 5h-7",
		key: "1oszz2"
	}],
	["path", {
		d: "M8 10v4",
		key: "tgpxqk"
	}],
	["path", {
		d: "M8 12H3",
		key: "a7s4jb"
	}]
]);
//#endregion
//#region src/routes/discover.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Discover Careers",
		title: "Find paths that match your curiosity",
		text: "Get personalised grouped recommendations across our 260-career database, or browse every industry freely.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: tab === "guided" ? "primary" : "outline",
				onClick: () => setTab("guided"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4" }), " Guided Discovery"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: tab === "browse" ? "primary" : "outline",
				onClick: () => setTab("browse"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-4" }),
					" Explore ",
					careers.length,
					"+ Careers"
				]
			})]
		})
	}), tab === "browse" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowseCatalog, {
		careers,
		userInterests: profile?.interests ?? []
	}) : !showForm && discovery ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupedReport, {
		answers: discovery.answers,
		savedGroups: discovery.groups,
		careers,
		onRetake: () => {
			setA(discovery.answers);
			setI(0);
			setShowForm(true);
		}
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between text-xs text-text-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Step ",
					i + 1,
					" of ",
					STEPS.length
				] }), profile?.interests?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-cyan",
					children: "Pre-filled from your saved profile (editable)"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 h-2 overflow-hidden rounded-full bg-secondary",
				role: "progressbar",
				"aria-valuemin": 0,
				"aria-valuemax": STEPS.length,
				"aria-valuenow": i + 1,
				"aria-label": "Questionnaire progress",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-brand transition-all",
					style: { width: `${(i + 1) / STEPS.length * 100}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "font-display text-2xl font-semibold",
						children: step.title
					}),
					step.help && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: step.help
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: step.type === "slider" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							htmlFor: "hours",
							className: "font-display text-4xl font-semibold",
							children: [
								val ?? 5,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-base text-text-2",
									children: step.unit
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
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
						})] }) : step.type === "single" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: step.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
							}, o.value))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: step.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: Array.isArray(val) && val.includes(o.value),
								onClick: () => toggle(o.value),
								children: o.label
							}, o.value))
						})
					})
				] }),
				err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "warn",
						children: err
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						onClick: () => {
							setErr("");
							setI(Math.max(0, i - 1));
						},
						disabled: i === 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [step.optional && i < STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => {
								setErr("");
								setI(i + 1);
							},
							children: "Skip"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: next,
							children: i === STEPS.length - 1 ? "Generate Discovery Report" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })] })
						})]
					})]
				})
			] })
		]
	})] });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: report.summaryNote
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: onRetake,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " Change answers"]
				}), topCompareIds.length >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => {
						actions.setCompare(topCompareIds);
						nav({ to: "/compare" });
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCompareArrows, { className: "size-4" }), " Compare top matches"]
				})]
			})]
		}), sections.map((sec) => sec.items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: `font-display text-2xl font-semibold ${sec.tone}`,
				children: sec.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-text-2",
				children: sec.subtitle
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: sec.items.map((item) => {
					const c = item.career;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
						as: "article",
						className: "min-w-0 break-words",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs uppercase tracking-wider text-cyan",
											children: [
												c.industry,
												" · ",
												c.subcategory,
												c.emerging ? " · Emerging" : ""
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 flex flex-wrap items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-2xl font-semibold",
												children: c.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompatibilityBadge, {
												career: c,
												profile,
												fallbackAnswers: answers
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-text-2",
											children: c.short
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, { career: c }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/careers/$id",
										params: { id: c.id },
										className: btnClass("outline"),
										children: "Full profile"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "mb-1.5 text-xs font-medium uppercase tracking-wider text-lavender-bright",
										children: "1 · Why this career matches"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-text-2",
										children: item.whyItMatches
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "mb-1.5 text-xs font-medium uppercase tracking-wider text-lavender-bright",
										children: "2 · Relevant skills you bring"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1.5",
										children: item.relevantSkills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											className: "px-2 py-0.5 text-xs",
											children: s
										}, s))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "mb-1.5 text-xs font-medium uppercase tracking-wider text-lavender-bright",
										children: "3 · Skills to develop"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1.5",
										children: item.skillsToDevelop.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											className: "px-2 py-0.5 text-xs",
											children: s
										}, s))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "mb-1.5 text-xs font-medium uppercase tracking-wider text-lavender-bright",
										children: "4 · Required qualifications"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "space-y-1 text-sm text-text-2",
										children: item.requiredQualifications.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", q] }, q))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "mb-1.5 text-xs font-medium uppercase tracking-wider text-lavender-bright",
										children: "5 · How to start free"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-text-2",
										children: item.howToStart
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "mb-1.5 text-xs font-medium uppercase tracking-wider text-lavender-bright",
										children: "6 · Practical beginner trial"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-text-2",
										children: item.practicalTrial
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex flex-wrap gap-2 border-t border-glass-border pt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										onClick: () => setOpenBreakdownId(openBreakdownId === c.id ? null : c.id),
										children: openBreakdownId === c.id ? "Hide compatibility score" : "Inspect compatibility score"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/try",
										search: { c: c.challengeId },
										className: btnClass("soft"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "size-4" }), " Try the challenge"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/planner",
										search: { career: c.id },
										className: btnClass("ghost"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4" }), " Plan learning"]
									})
								]
							}),
							openBreakdownId === c.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompatibilityCard, {
									career: c,
									profile,
									fallbackAnswers: answers,
									defaultExpanded: true
								})
							})
						]
					}, c.id);
				})
			})]
		}, sec.title))]
	});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 md:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative lg:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: queryText,
								onChange: (e) => {
									setQueryText(e.target.value);
									setLimit(18);
								},
								placeholder: "Search careers, industries, skills (e.g. football analytics, biotech, law)…",
								className: inputClass("h-10 pl-9")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"aria-label": "Filter by industry",
							className: selCls,
							value: industry,
							onChange: (e) => {
								setIndustry(e.target.value);
								setLimit(18);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: "ALL",
								children: [
									"All ",
									INDUSTRIES.length,
									" Industries"
								]
							}), INDUSTRIES.map((ind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: ind,
								children: ind
							}, ind))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"aria-label": "Sort careers",
							className: selCls,
							value: sortBy,
							onChange: (e) => setSortBy(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "default",
									children: "Sort: Featured order"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "az",
									children: "Sort: A – Z"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "gentle",
									children: "Sort: Gentlest starting curve"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "deep",
									children: "Sort: Deepest mastery"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"aria-label": "Filter by interest",
							className: selCls,
							value: interest,
							onChange: (e) => {
								setInterest(e.target.value);
								setLimit(18);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ALL",
								children: "All Interests"
							}), INTERESTS.map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: id,
								children: ["Interest: ", label]
							}, id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"aria-label": "Filter by capability",
							className: selCls,
							value: capability,
							onChange: (e) => {
								setCapability(e.target.value);
								setLimit(18);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ALL",
								children: "All Capabilities"
							}), CAPABILITIES.map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: id,
								children: ["Strength: ", label]
							}, id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"aria-label": "Filter by starting budget",
							className: selCls,
							value: budgetMax,
							onChange: (e) => {
								setBudgetMax(e.target.value);
								setLimit(18);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ALL",
									children: "Any starter budget"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "0",
									children: "Free to start (₹0)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "1000",
									children: "Up to ₹1,000 optional gear/exam"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
							active: emergingOnly,
							onClick: () => setEmergingOnly(!emergingOnly),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " Emerging Careers Only"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: beyondInterests,
							onClick: () => setBeyondInterests(!beyondInterests),
							children: "Explore Beyond My Interests"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
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
					})]
				}),
				beyondInterests && userInterests.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "info",
					children: "Tip: Add interests in your Profile or complete Guided Discovery so “Explore Beyond My Interests” hides your primary fields and surfaces surprising paths."
				})
			]
		}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold",
					children: "No careers match all active filters"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-text-2",
					children: "Try widening your industry, capability, or search query."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
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
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
			children: visible.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareerCard, { career: c }, c.id))
		}), visible.length < filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: () => setLimit((n) => n + 24),
				children: [
					"Load more careers (",
					filtered.length - visible.length,
					" remaining)"
				]
			})
		})] })]
	});
}
//#endregion
export { Discover as component };
