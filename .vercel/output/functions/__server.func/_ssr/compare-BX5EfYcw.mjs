import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Glass, c as PageHeader, d as cn, f as inputClass, n as Button, p as selectClass, r as Chip, s as Notice, t as Bar, u as btnClass } from "./ui-kit-BmqGm62i.mjs";
import { b as useUser } from "./auth-Bjd81y0G.mjs";
import { a as getCareer, i as actions, n as HUE_CLASS, r as INDUSTRIES, s as useApp } from "./careers-ChJ9jiL5.mjs";
import { r as useCareersCatalog } from "./careers-service-BdvVUi83.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as FlaskConical, J as BookmarkPlus, W as ChevronDown, _ as Plus, d as Search, f as Scale, o as Trash2, t as X } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DVN8uj3t.mjs";
import { a as getCareerInsight, i as formatRangeFromInr, n as formatAbroadRange, o as splitSkills, t as CURRENCY_META } from "./career-insights-DY2zFBVx.mjs";
import { i as computeCompatibility, t as CompatibilityBadge } from "./CompatibilityCard-DGCoBrUg.mjs";
import { r as SaveButton } from "./CareerParts-BEKUbYuv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compare-BX5EfYcw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/compare.tsx?tsr-split=component";
var PRESETS = [
	["software-developer", "ui-ux-designer"],
	["football-coach", "software-developer"],
	["data-analyst", "financial-analyst"],
	["ai-ml-engineer", "cybersecurity-analyst"]
];
var ROWS = [
	{
		key: "overview",
		label: "1 · Career overview & daily work",
		render: (c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-medium text-foreground",
					children: c.short
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 30,
					columnNumber: 9
				}, void 0),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: c.day }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 31,
					columnNumber: 9
				}, void 0),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "space-y-0.5 text-xs text-muted-foreground",
					children: c.responsibilities.slice(0, 3).map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: ["• ", r] }, r, true, {
						fileName: _jsxFileName,
						lineNumber: 33,
						columnNumber: 52
					}, void 0))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 32,
					columnNumber: 9
				}, void 0)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 29,
			columnNumber: 16
		}, void 0)
	},
	{
		key: "qualifications",
		label: "2 · Required qualifications & alternative routes",
		render: (c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs font-medium text-cyan",
					children: ["Baseline: ", c.minEducation]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 40,
					columnNumber: 9
				}, void 0),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "space-y-1",
					children: c.pathways.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: ["• ", r] }, r, true, {
						fileName: _jsxFileName,
						lineNumber: 42,
						columnNumber: 32
					}, void 0))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 41,
					columnNumber: 9
				}, void 0),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs font-medium text-muted-foreground",
					children: "Alternative routes:"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 44,
					columnNumber: 9
				}, void 0),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "space-y-1 text-xs",
					children: c.altRoutes.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: ["• ", r] }, r, true, {
						fileName: _jsxFileName,
						lineNumber: 46,
						columnNumber: 33
					}, void 0))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 45,
					columnNumber: 9
				}, void 0)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 39,
			columnNumber: 16
		}, void 0)
	},
	{
		key: "technical_skills",
		label: "3 · Technical & domain skills",
		render: (c) => {
			const { technical } = splitSkills(c);
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-1.5",
				children: technical.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
					className: "px-2 py-0.5 text-xs",
					children: s
				}, s, false, {
					fileName: _jsxFileName,
					lineNumber: 57,
					columnNumber: 31
				}, void 0))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 56,
				columnNumber: 12
			}, void 0);
		}
	},
	{
		key: "soft_skills",
		label: "4 · Soft skills & human capabilities",
		render: (c) => {
			const { soft } = splitSkills(c);
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-1.5",
				children: soft.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
					className: "px-2 py-0.5 text-xs",
					children: s
				}, s, false, {
					fileName: _jsxFileName,
					lineNumber: 70,
					columnNumber: 26
				}, void 0))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 69,
				columnNumber: 12
			}, void 0);
		}
	},
	{
		key: "salary_india_entry",
		label: "5 · Entry-level salary (India indicative, 0–2 yrs)",
		render: (c, ctx) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-display text-base font-semibold text-cyan tabular-nums",
					children: formatRangeFromInr(ins.indiaEntryInr, ctx.currency)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 81,
					columnNumber: 11
				}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground",
					children: ins.compensationStructure.baseNote
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 84,
					columnNumber: 11
				}, void 0)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 80,
				columnNumber: 12
			}, void 0);
		}
	},
	{
		key: "salary_abroad_entry",
		label: "6 · Entry-level salary (Abroad indicative)",
		render: (c, ctx) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-display text-base font-semibold text-lavender-bright tabular-nums",
					children: formatAbroadRange(ins.abroadEntryUsd, ctx.currency)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 93,
					columnNumber: 11
				}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground",
					children: ins.salaryPeriod
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 96,
					columnNumber: 11
				}, void 0)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 92,
				columnNumber: 12
			}, void 0);
		}
	},
	{
		key: "salary_mid",
		label: "7 · Mid-career salary (3–7 yrs)",
		render: (c, ctx) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-1 tabular-nums",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-medium text-foreground",
						children: ["India: ", formatRangeFromInr(ins.indiaMidInr, ctx.currency)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 105,
						columnNumber: 11
					}, void 0),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: ["Abroad: ", formatAbroadRange(ins.abroadMidUsd, ctx.currency)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 108,
						columnNumber: 11
					}, void 0),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-text-2",
						children: ins.compensationStructure.variableNote
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 111,
						columnNumber: 11
					}, void 0)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 104,
				columnNumber: 12
			}, void 0);
		}
	},
	{
		key: "salary_experienced",
		label: "8 · Experienced salary (8+ yrs)",
		render: (c, ctx) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-1 tabular-nums",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-medium text-turquoise",
					children: ["India: ", formatRangeFromInr(ins.indiaExperiencedInr, ctx.currency)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 120,
					columnNumber: 11
				}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground",
					children: ["Abroad: ", formatAbroadRange(ins.abroadExperiencedUsd, ctx.currency)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 123,
					columnNumber: 11
				}, void 0)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 119,
				columnNumber: 12
			}, void 0);
		}
	},
	{
		key: "difficulty_entry",
		label: "9 · Difficulty of entry",
		render: (c) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bar, { value: c.commitmentLevel }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 13
					}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs font-semibold text-cyan",
						children: ins.difficultyOfEntry
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 136,
						columnNumber: 13
					}, void 0)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 134,
					columnNumber: 11
				}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: ins.difficultyExplanation }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 138,
					columnNumber: 11
				}, void 0)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 133,
				columnNumber: 12
			}, void 0);
		}
	},
	{
		key: "job_opportunities",
		label: "10 · Job opportunities, sectors & remote availability",
		render: (c) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-medium text-foreground",
						children: ins.jobOpportunities.remotePossibility
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 147,
						columnNumber: 11
					}, void 0),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-cyan",
								children: "Industries:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 13
							}, void 0),
							" ",
							ins.jobOpportunities.hiringIndustries.join(", ")
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 148,
						columnNumber: 11
					}, void 0),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-cyan",
								children: "Sectors:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 13
							}, void 0),
							" ",
							ins.jobOpportunities.sectors.join(", ")
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 152,
						columnNumber: 11
					}, void 0),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: c.entryLevelOpportunities
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 155,
						columnNumber: 11
					}, void 0)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 146,
				columnNumber: 12
			}, void 0);
		}
	},
	{
		key: "future_demand",
		label: "11 · Future industry demand outlook",
		render: (c) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-medium text-cyan",
						children: [
							ins.futureDemand.trend,
							" (",
							ins.futureDemand.timeframe,
							")"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 164,
						columnNumber: 11
					}, void 0),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: ins.futureDemand.outlookNote }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 167,
						columnNumber: 11
					}, void 0),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[11px] text-muted-foreground",
						children: ["Source: ", ins.futureDemand.source]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 168,
						columnNumber: 11
					}, void 0)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 163,
				columnNumber: 12
			}, void 0);
		}
	},
	{
		key: "education_costs",
		label: "12 · Education & preparation costs",
		render: (c, ctx) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-medium text-cyan tabular-nums",
						children: ["Estimated pathway: ", formatRangeFromInr(ins.educationCostInr, ctx.currency, false)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 177,
						columnNumber: 11
					}, void 0),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-foreground",
						children: ["Starter budget tier: ₹", c.budgetTier.toLocaleString("en-IN")]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 180,
						columnNumber: 11
					}, void 0),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs",
						children: ins.educationCostSummary
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 183,
						columnNumber: 11
					}, void 0)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 176,
				columnNumber: 12
			}, void 0);
		}
	},
	{
		key: "time_employability",
		label: "13 · Time to employability",
		render: (c) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-medium text-foreground tabular-nums",
					children: [
						"~",
						ins.employabilityMonths[0],
						"–",
						ins.employabilityMonths[1],
						" months"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 192,
					columnNumber: 11
				}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs",
					children: ins.employabilityNote
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 195,
					columnNumber: 11
				}, void 0)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 191,
				columnNumber: 12
			}, void 0);
		}
	},
	{
		key: "compatibility_score",
		label: "14 · Personal Career Compatibility Score (Estimate)",
		render: (c, ctx) => {
			const rep = computeCompatibility(c, ctx.profile, ctx.answers);
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CompatibilityBadge, {
						career: c,
						profile: ctx.profile,
						fallbackAnswers: ctx.answers
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 204,
						columnNumber: 11
					}, void 0),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs",
						children: rep.financialAlignmentNote
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 205,
						columnNumber: 11
					}, void 0),
					rep.missingSkills.length > 0 && /* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-warning",
						children: ["Key gaps: ", rep.missingSkills.slice(0, 3).join(", ")]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 206,
						columnNumber: 44
					}, void 0)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 203,
				columnNumber: 12
			}, void 0);
		}
	},
	{
		key: "growth_opportunities",
		label: "15 · Growth, freelance & entrepreneurship opportunities",
		render: (c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
					className: "space-y-0.5 text-xs text-foreground",
					children: c.progression.map((step, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
						i + 1,
						". ",
						step
					] }, step, true, {
						fileName: _jsxFileName,
						lineNumber: 216,
						columnNumber: 43
					}, void 0))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 215,
					columnNumber: 9
				}, void 0),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-medium text-cyan",
							children: "Freelance:"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 221,
							columnNumber: 11
						}, void 0),
						" ",
						c.freelanceOpportunity
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 220,
					columnNumber: 9
				}, void 0),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-medium text-cyan",
							children: "Startup / Independent:"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 224,
							columnNumber: 11
						}, void 0),
						" ",
						c.entrepreneurshipOpportunity
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 223,
					columnNumber: 9
				}, void 0)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 214,
			columnNumber: 16
		}, void 0)
	},
	{
		key: "advantages",
		label: "16 · Advantages",
		render: (c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
			className: "space-y-1 text-success",
			children: c.pros.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: ["+ ", r] }, r, true, {
				fileName: _jsxFileName,
				lineNumber: 232,
				columnNumber: 26
			}, void 0))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 231,
			columnNumber: 16
		}, void 0)
	},
	{
		key: "disadvantages",
		label: "17 · Disadvantages & trade-offs",
		render: (c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
			className: "space-y-1 text-warning",
			children: c.cons.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: ["– ", r] }, r, true, {
				fileName: _jsxFileName,
				lineNumber: 238,
				columnNumber: 26
			}, void 0))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 237,
			columnNumber: 16
		}, void 0)
	}
];
function buildComparisonSummary(cs, profile, answers) {
	const shared = cs[0].skills.filter((s) => cs.slice(1).every((c) => c.skills.includes(s)));
	const scored = cs.map((c) => ({
		c,
		rep: computeCompatibility(c, profile, answers),
		ins: getCareerInsight(c)
	})).sort((a, b) => b.rep.score - a.rep.score);
	const fastest = [...scored].sort((a, b) => a.ins.employabilityMonths[0] - b.ins.employabilityMonths[0])[0];
	const lowestCost = [...scored].sort((a, b) => a.c.budgetTier - b.c.budgetTier)[0];
	const topCompat = scored[0];
	return [
		shared.length ? `Shared transferable skills: ${shared.join(", ")} — building these keeps all compared futures open.` : "These careers rely on distinct primary skill sets, so trying a 15-minute practical challenge on each is valuable.",
		`Highest profile compatibility estimate: ${topCompat.c.name} (${topCompat.rep.score}% · ${topCompat.rep.band}) based on your current profile and preferences.`,
		`Fastest time to entry employability: ${fastest.c.name} (~${fastest.ins.employabilityMonths[0]}–${fastest.ins.employabilityMonths[1]} months); lowest starter budget tier: ${lowestCost.c.name} (₹${lowestCost.c.budgetTier.toLocaleString("en-IN")}).`,
		...scored.map(({ c, ins }) => `${c.name} (${ins.futureDemand.trend} demand): stronger if you value ${(c.pros[0] ?? "").toLowerCase()}, weighing trade-off: ${(c.cons[0] ?? "").toLowerCase()}.`)
	];
}
function Compare() {
	const { compare, saved, savedComparisons, profile, discovery } = useApp();
	const { user } = useUser();
	const { careers } = useCareersCatalog();
	const ids = compare.filter((id) => getCareer(id, careers));
	const cs = ids.map((id) => getCareer(id, careers));
	const [currency, setCurrency] = (0, import_react.useState)("INR");
	const [open, setOpen] = (0, import_react.useState)({
		overview: true,
		qualifications: true,
		salary_india_entry: true,
		difficulty_entry: true,
		compatibility_score: true,
		advantages: true,
		disadvantages: true
	});
	const [picking, setPicking] = (0, import_react.useState)(false);
	const [pickerSearch, setPickerSearch] = (0, import_react.useState)("");
	const [pickerIndustry, setPickerIndustry] = (0, import_react.useState)("ALL");
	const [saveTitle, setSaveTitle] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const key = ids.join("|");
	(0, import_react.useEffect)(() => {
		if (cs.length >= 2) {
			actions.markCompared(cs.map((c) => c.name));
			setSaveTitle(cs.map((c) => c.name).join(" vs "));
		}
	}, [key]);
	const pickerChoices = (0, import_react.useMemo)(() => {
		const q = pickerSearch.trim().toLowerCase();
		return [...careers].filter((c) => !ids.includes(c.id)).filter((c) => pickerIndustry === "ALL" ? true : c.industry === pickerIndustry).filter((c) => !q ? true : `${c.name} ${c.industry} ${c.skills.join(" ")}`.toLowerCase().includes(q)).sort((a, b) => Number(saved.includes(b.id)) - Number(saved.includes(a.id))).slice(0, 24);
	}, [
		careers,
		ids,
		pickerSearch,
		pickerIndustry,
		saved
	]);
	const remove = (id) => actions.setCompare(ids.filter((x) => x !== id));
	const add = (id) => {
		actions.setCompare([...ids, id]);
		setPicking(false);
		setPickerSearch("");
	};
	const toggleAllRows = (expand) => {
		const next = {};
		for (const r of ROWS) next[r.key] = expand;
		setOpen(next);
	};
	const handleSaveComparison = async () => {
		if (cs.length < 2) return;
		setSaving(true);
		try {
			await actions.saveComparisonRecord(ids, saveTitle.trim() || cs.map((c) => c.name).join(" vs "));
			toast.success(user?.emailVerified ? "Comparison saved to your account" : "Comparison saved locally (sign in & verify email to sync)");
		} finally {
			setSaving(false);
		}
	};
	const ctx = {
		currency,
		profile,
		answers: discovery?.answers
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
			eyebrow: "17-Dimension Career Comparison",
			title: "Compare My Futures",
			text: "Examine 2 or 3 careers across salaries (India & abroad), skills, qualifications, demand, employability time, compatibility score, and trade-offs — without picking a universal winner.",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						"aria-label": "Comparison display currency",
						value: currency,
						onChange: (e) => setCurrency(e.target.value),
						className: selectClass("h-9 w-28 px-2 text-xs"),
						children: Object.keys(CURRENCY_META).map((code) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: code,
							children: CURRENCY_META[code].label
						}, code, false, {
							fileName: _jsxFileName,
							lineNumber: 329,
							columnNumber: 73
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 328,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						className: "h-9 min-h-9 px-3 text-xs",
						onClick: () => toggleAllRows(true),
						children: "Expand all 17"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 333,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "ghost",
						className: "h-9 min-h-9 px-3 text-xs",
						onClick: () => toggleAllRows(false),
						children: "Collapse all"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 336,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 327,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 326,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-6 flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-sm text-muted-foreground",
				children: "Try a comparison:"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 343,
				columnNumber: 9
			}, this), PRESETS.map((p) => {
				const names = p.map((id) => getCareer(id, careers)?.name).filter(Boolean);
				if (names.length < 2) return null;
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
					active: p.join() === ids.join(),
					onClick: () => actions.setCompare(p),
					children: names.join(" vs ")
				}, p.join(), false, {
					fileName: _jsxFileName,
					lineNumber: 347,
					columnNumber: 16
				}, this);
			})]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 342,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-4 md:grid-cols-3",
			children: [cs.map((c) => {
				const h = HUE_CLASS[c.hue];
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
					className: cn("relative min-w-0 break-words border-t-2", h.border),
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => remove(c.id),
							"aria-label": `Remove ${c.name} from comparison`,
							className: "absolute right-3 top-3 grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 358,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 357,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 pr-8",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: cn("inline-grid size-10 shrink-0 place-items-center rounded-xl border font-display font-semibold", h.bg, h.border, h.text),
								children: c.name[0]
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 361,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CompatibilityBadge, {
								career: c,
								profile,
								fallbackAnswers: discovery?.answers
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 364,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 360,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 truncate text-[11px] uppercase tracking-wider text-muted-foreground",
							children: c.industry
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 366,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-0.5 pr-6 font-display text-xl font-semibold leading-snug",
							children: c.name
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 369,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-sm text-text-2",
							children: c.short
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 372,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SaveButton, { career: c }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 374,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/careers/$id",
								params: { id: c.id },
								className: btnClass("ghost"),
								children: "Full profile"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 375,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 373,
							columnNumber: 15
						}, this)
					]
				}, c.id, true, {
					fileName: _jsxFileName,
					lineNumber: 356,
					columnNumber: 16
				}, this);
			}), cs.length < 3 && /* @__PURE__ */ (void 0)("div", {
				className: "glass flex min-h-48 min-w-0 flex-col justify-center gap-3 border-dashed p-5",
				children: !picking ? /* @__PURE__ */ (void 0)("div", {
					className: "text-center",
					children: /* @__PURE__ */ (void 0)("button", {
						type: "button",
						onClick: () => setPicking(true),
						className: btnClass("soft"),
						children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 387,
							columnNumber: 19
						}, this), " Add a career from 260+ options"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 386,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 385,
					columnNumber: 25
				}, this) : /* @__PURE__ */ (void 0)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (void 0)(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 391,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("input", {
								value: pickerSearch,
								onChange: (e) => setPickerSearch(e.target.value),
								placeholder: "Search career or skill…",
								className: inputClass("h-9 pl-8 pr-2 text-xs")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 392,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 390,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("select", {
							"aria-label": "Filter career picker by industry",
							value: pickerIndustry,
							onChange: (e) => setPickerIndustry(e.target.value),
							className: selectClass("h-9 px-2 text-xs"),
							children: [/* @__PURE__ */ (void 0)("option", {
								value: "ALL",
								children: "All industries"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 395,
								columnNumber: 19
							}, this), INDUSTRIES.map((ind) => /* @__PURE__ */ (void 0)("option", {
								value: ind,
								children: ind
							}, ind, false, {
								fileName: _jsxFileName,
								lineNumber: 396,
								columnNumber: 42
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 394,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "flex max-h-40 flex-wrap gap-1.5 overflow-y-auto pr-1",
							children: pickerChoices.map((c) => /* @__PURE__ */ (void 0)(Chip, {
								onClick: () => add(c.id),
								className: "px-2.5 py-1 text-xs",
								children: [saved.includes(c.id) ? "★ " : "", c.name]
							}, c.id, true, {
								fileName: _jsxFileName,
								lineNumber: 401,
								columnNumber: 43
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 400,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							type: "button",
							className: btnClass("ghost", "h-8 min-h-8 text-xs"),
							onClick: () => setPicking(false),
							children: "Cancel"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 406,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 389,
					columnNumber: 24
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 384,
				columnNumber: 27
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 353,
			columnNumber: 7
		}, this),
		cs.length < 2 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Notice, { children: "Add at least two careers to see the 17-dimension comparison." }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 414,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 413,
			columnNumber: 24
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
				className: "mt-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scale, { className: "size-5 text-cyan" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 419,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-display text-xl font-semibold",
								children: "Difference highlights & user-priority summary"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 420,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 418,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								"aria-label": "Comparison title",
								value: saveTitle,
								onChange: (e) => setSaveTitle(e.target.value),
								placeholder: "Comparison name…",
								className: inputClass("h-9 w-56 text-xs")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 425,
								columnNumber: 17
							}, this), user ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "soft",
								className: "h-9 min-h-9 px-3 text-xs",
								onClick: handleSaveComparison,
								disabled: saving,
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookmarkPlus, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 427,
										columnNumber: 21
									}, this),
									" ",
									saving ? "Saving…" : "Save Comparison"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 426,
								columnNumber: 25
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/auth",
								search: { next: "/compare" },
								className: btnClass("soft", "h-9 min-h-9 px-3 text-xs"),
								children: "Sign in to save comparison"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 428,
								columnNumber: 31
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 424,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 417,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "space-y-2 text-text-2",
						children: buildComparisonSummary(cs, profile, discovery?.answers).map((l) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mt-2 size-1.5 shrink-0 rounded-full bg-lavender" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 437,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "min-w-0 break-words",
								children: l
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 438,
								columnNumber: 19
							}, this)]
						}, l, true, {
							fileName: _jsxFileName,
							lineNumber: 436,
							columnNumber: 81
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 435,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Salaries and timelines are indicative market benchmarks (2025–2026) and do not guarantee income. Futuroute highlights trade-offs based on your priorities rather than declaring a single universal winner."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 442,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 416,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				"aria-label": "Comparison table",
				className: "mt-6 space-y-3",
				children: ROWS.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "glass overflow-hidden p-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						"aria-expanded": !!open[r.key],
						onClick: () => setOpen({
							...open,
							[r.key]: !open[r.key]
						}),
						className: "flex w-full items-center justify-between px-5 py-4 text-left font-display font-semibold hover:bg-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: r.label }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 455,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: cn("size-4 shrink-0 transition", open[r.key] && "rotate-180") }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 456,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 451,
						columnNumber: 17
					}, this), open[r.key] && /* @__PURE__ */ (void 0)("div", {
						className: cn("grid gap-px border-t border-glass-border bg-glass-border", cs.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"),
						children: cs.map((c) => /* @__PURE__ */ (void 0)("div", {
							className: "min-w-0 break-words bg-indigo-deep/85 p-5 text-sm text-text-2",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: cn("mb-2 text-xs font-medium uppercase tracking-wider", HUE_CLASS[c.hue].text),
								children: c.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 460,
								columnNumber: 25
							}, this), r.render(c, ctx)]
						}, c.id, true, {
							fileName: _jsxFileName,
							lineNumber: 459,
							columnNumber: 34
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 458,
						columnNumber: 33
					}, this)]
				}, r.key, true, {
					fileName: _jsxFileName,
					lineNumber: 450,
					columnNumber: 28
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 449,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-2xl font-semibold",
						children: "What should I try first?"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 470,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-text-2",
						children: "Spend 10 minutes on each. Notice which one you'd happily keep doing."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 471,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: cn("mt-5 grid gap-4", cs.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"),
						children: cs.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "glass-soft flex min-w-0 flex-col gap-3 p-5 break-words",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: cn("text-sm font-medium", HUE_CLASS[c.hue].text),
									children: [c.name, " trial"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 476,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-text-2",
									children: c.trial
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 477,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/try",
									search: { c: c.challengeId },
									className: btnClass("outline", "mt-auto"),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FlaskConical, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 481,
										columnNumber: 21
									}, this), " Start this trial"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 478,
									columnNumber: 19
								}, this)
							]
						}, c.id, true, {
							fileName: _jsxFileName,
							lineNumber: 475,
							columnNumber: 28
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 474,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 469,
				columnNumber: 11
			}, this)
		] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 415,
			columnNumber: 18
		}, this),
		savedComparisons.length > 0 && /* @__PURE__ */ (void 0)(Glass, {
			className: "mt-6",
			children: [/* @__PURE__ */ (void 0)("h2", {
				className: "font-display text-lg font-semibold",
				children: "Your saved comparisons"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 489,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("div", {
				className: "mt-3 grid gap-3 sm:grid-cols-2",
				children: savedComparisons.map((item) => /* @__PURE__ */ (void 0)("div", {
					className: "glass-soft flex items-center justify-between gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (void 0)("button", {
						type: "button",
						onClick: () => actions.setCompare(item.careerIds),
						className: "min-w-0 flex-1 text-left hover:text-cyan",
						children: [/* @__PURE__ */ (void 0)("p", {
							className: "truncate text-sm font-medium",
							children: item.title
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 493,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground",
							children: [item.careerIds.length, " careers · Click to load"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 494,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 492,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("button", {
						type: "button",
						"aria-label": `Delete ${item.title}`,
						onClick: () => void actions.removeComparisonRecord(item.id),
						className: "grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-warning",
						children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 499,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 498,
						columnNumber: 17
					}, this)]
				}, item.id, true, {
					fileName: _jsxFileName,
					lineNumber: 491,
					columnNumber: 43
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 490,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 488,
			columnNumber: 39
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 325,
		columnNumber: 10
	}, this);
}
//#endregion
export { Compare as component };
