import { l as __toESM, o as require_jsx_runtime, s as require_react } from "./useSelector-Cu7jxM-W.js";
import { n as toast } from "./dist-CnotZWgl.js";
import { I as Link, h as useUser } from "./auth-ByhFdEgm.js";
import { a as Search, l as FlaskConical, t as AppShell } from "./AppShell-BgEZmUVx.js";
import { a as actions, i as INDUSTRIES, n as HUE_CLASS, r as getCareer, s as useApp } from "./careers-Da7lFkNP.js";
import { i as X, r as useCareersCatalog, u as createLucideIcon } from "./careers-service-REWdQftI.js";
import { r as SaveButton } from "./CareerParts-DpDkC956.js";
import { t as BookmarkPlus } from "./bookmark-plus-C-BtLwOv.js";
import { i as computeCompatibility, s as ChevronDown, t as CompatibilityBadge } from "./CompatibilityCard-DgWWA-5m.js";
import { t as Plus } from "./plus-Vx67vOmi.js";
import { t as Trash2 } from "./trash-2-CZ9EJ6gF.js";
import { a as Glass, c as PageHeader, d as inputClass, f as selectClass, m as cn, n as Button, r as Chip, s as Notice, t as Bar, u as btnClass } from "./ui-kit-BDOPC8gw.js";
import { a as getCareerInsight, i as formatRangeFromInr, n as formatAbroadRange, o as splitSkills, t as CURRENCY_META } from "./career-insights-DY2zFBVx.js";
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Scale = createLucideIcon("scale", [
	["path", {
		d: "M12 3v18",
		key: "108xh3"
	}],
	["path", {
		d: "m19 8 3 8a5 5 0 0 1-6 0zV7",
		key: "zcdpyk"
	}],
	["path", {
		d: "M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1",
		key: "1yorad"
	}],
	["path", {
		d: "m5 8 3 8a5 5 0 0 1-6 0zV7",
		key: "eua70x"
	}],
	["path", {
		d: "M7 21h10",
		key: "1b0cd5"
	}]
]);
//#endregion
//#region src/routes/compare.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
		render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-foreground",
					children: c.short
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: c.day }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-0.5 text-xs text-muted-foreground",
					children: c.responsibilities.slice(0, 3).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", r] }, r))
				})
			]
		})
	},
	{
		key: "qualifications",
		label: "2 · Required qualifications & alternative routes",
		render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-medium text-cyan",
					children: ["Baseline: ", c.minEducation]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1",
					children: c.pathways.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", r] }, r))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium text-muted-foreground",
					children: "Alternative routes:"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1 text-xs",
					children: c.altRoutes.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", r] }, r))
				})
			]
		})
	},
	{
		key: "technical_skills",
		label: "3 · Technical & domain skills",
		render: (c) => {
			const { technical } = splitSkills(c);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: technical.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					className: "px-2 py-0.5 text-xs",
					children: s
				}, s))
			});
		}
	},
	{
		key: "soft_skills",
		label: "4 · Soft skills & human capabilities",
		render: (c) => {
			const { soft } = splitSkills(c);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: soft.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					className: "px-2 py-0.5 text-xs",
					children: s
				}, s))
			});
		}
	},
	{
		key: "salary_india_entry",
		label: "5 · Entry-level salary (India indicative, 0–2 yrs)",
		render: (c, ctx) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-base font-semibold text-cyan tabular-nums",
					children: formatRangeFromInr(ins.indiaEntryInr, ctx.currency)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: ins.compensationStructure.baseNote
				})]
			});
		}
	},
	{
		key: "salary_abroad_entry",
		label: "6 · Entry-level salary (Abroad indicative)",
		render: (c, ctx) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-base font-semibold text-lavender-bright tabular-nums",
					children: formatAbroadRange(ins.abroadEntryUsd, ctx.currency)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: ins.salaryPeriod
				})]
			});
		}
	},
	{
		key: "salary_mid",
		label: "7 · Mid-career salary (3–7 yrs)",
		render: (c, ctx) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1 tabular-nums",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-medium text-foreground",
						children: ["India: ", formatRangeFromInr(ins.indiaMidInr, ctx.currency)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: ["Abroad: ", formatAbroadRange(ins.abroadMidUsd, ctx.currency)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-2",
						children: ins.compensationStructure.variableNote
					})
				]
			});
		}
	},
	{
		key: "salary_experienced",
		label: "8 · Experienced salary (8+ yrs)",
		render: (c, ctx) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1 tabular-nums",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-medium text-turquoise",
					children: ["India: ", formatRangeFromInr(ins.indiaExperiencedInr, ctx.currency)]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: ["Abroad: ", formatAbroadRange(ins.abroadExperiencedUsd, ctx.currency)]
				})]
			});
		}
	},
	{
		key: "difficulty_entry",
		label: "9 · Difficulty of entry",
		render: (c) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, { value: c.commitmentLevel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-cyan",
						children: ins.difficultyOfEntry
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: ins.difficultyExplanation })]
			});
		}
	},
	{
		key: "job_opportunities",
		label: "10 · Job opportunities, sectors & remote availability",
		render: (c) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-foreground",
						children: ins.jobOpportunities.remotePossibility
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-cyan",
								children: "Industries:"
							}),
							" ",
							ins.jobOpportunities.hiringIndustries.join(", ")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-cyan",
								children: "Sectors:"
							}),
							" ",
							ins.jobOpportunities.sectors.join(", ")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: c.entryLevelOpportunities
					})
				]
			});
		}
	},
	{
		key: "future_demand",
		label: "11 · Future industry demand outlook",
		render: (c) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-medium text-cyan",
						children: [
							ins.futureDemand.trend,
							" (",
							ins.futureDemand.timeframe,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: ins.futureDemand.outlookNote }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-muted-foreground",
						children: ["Source: ", ins.futureDemand.source]
					})
				]
			});
		}
	},
	{
		key: "education_costs",
		label: "12 · Education & preparation costs",
		render: (c, ctx) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-medium text-cyan tabular-nums",
						children: ["Estimated pathway: ", formatRangeFromInr(ins.educationCostInr, ctx.currency, false)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-foreground",
						children: ["Starter budget tier: ₹", c.budgetTier.toLocaleString("en-IN")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs",
						children: ins.educationCostSummary
					})
				]
			});
		}
	},
	{
		key: "time_employability",
		label: "13 · Time to employability",
		render: (c) => {
			const ins = getCareerInsight(c);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-medium text-foreground tabular-nums",
					children: [
						"~",
						ins.employabilityMonths[0],
						"–",
						ins.employabilityMonths[1],
						" months"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs",
					children: ins.employabilityNote
				})]
			});
		}
	},
	{
		key: "compatibility_score",
		label: "14 · Personal Career Compatibility Score (Estimate)",
		render: (c, ctx) => {
			const rep = computeCompatibility(c, ctx.profile, ctx.answers);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompatibilityBadge, {
						career: c,
						profile: ctx.profile,
						fallbackAnswers: ctx.answers
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs",
						children: rep.financialAlignmentNote
					}),
					rep.missingSkills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-warning",
						children: ["Key gaps: ", rep.missingSkills.slice(0, 3).join(", ")]
					})
				]
			});
		}
	},
	{
		key: "growth_opportunities",
		label: "15 · Growth, freelance & entrepreneurship opportunities",
		render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-0.5 text-xs text-foreground",
					children: c.progression.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						i + 1,
						". ",
						step
					] }, step))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-cyan",
							children: "Freelance:"
						}),
						" ",
						c.freelanceOpportunity
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-cyan",
							children: "Startup / Independent:"
						}),
						" ",
						c.entrepreneurshipOpportunity
					]
				})
			]
		})
	},
	{
		key: "advantages",
		label: "16 · Advantages",
		render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-1 text-success",
			children: c.pros.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["+ ", r] }, r))
		})
	},
	{
		key: "disadvantages",
		label: "17 · Disadvantages & trade-offs",
		render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-1 text-warning",
			children: c.cons.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["– ", r] }, r))
		})
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "17-Dimension Career Comparison",
			title: "Compare My Futures",
			text: "Examine 2 or 3 careers across salaries (India & abroad), skills, qualifications, demand, employability time, compatibility score, and trade-offs — without picking a universal winner.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						"aria-label": "Comparison display currency",
						value: currency,
						onChange: (e) => setCurrency(e.target.value),
						className: selectClass("h-9 w-28 px-2 text-xs"),
						children: Object.keys(CURRENCY_META).map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: code,
							children: CURRENCY_META[code].label
						}, code))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "h-9 min-h-9 px-3 text-xs",
						onClick: () => toggleAllRows(true),
						children: "Expand all 17"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "h-9 min-h-9 px-3 text-xs",
						onClick: () => toggleAllRows(false),
						children: "Collapse all"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-muted-foreground",
				children: "Try a comparison:"
			}), PRESETS.map((p) => {
				const names = p.map((id) => getCareer(id, careers)?.name).filter(Boolean);
				if (names.length < 2) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: p.join() === ids.join(),
					onClick: () => actions.setCompare(p),
					children: names.join(" vs ")
				}, p.join());
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-3",
			children: [cs.map((c) => {
				const h = HUE_CLASS[c.hue];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
					className: cn("relative min-w-0 break-words border-t-2", h.border),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => remove(c.id),
							"aria-label": `Remove ${c.name} from comparison`,
							className: "absolute right-3 top-3 grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 pr-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("inline-grid size-10 shrink-0 place-items-center rounded-xl border font-display font-semibold", h.bg, h.border, h.text),
								children: c.name[0]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompatibilityBadge, {
								career: c,
								profile,
								fallbackAnswers: discovery?.answers
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 truncate text-[11px] uppercase tracking-wider text-muted-foreground",
							children: c.industry
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-0.5 pr-6 font-display text-xl font-semibold leading-snug",
							children: c.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-text-2",
							children: c.short
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, { career: c }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/careers/$id",
								params: { id: c.id },
								className: btnClass("ghost"),
								children: "Full profile"
							})]
						})
					]
				}, c.id);
			}), cs.length < 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass flex min-h-48 min-w-0 flex-col justify-center gap-3 border-dashed p-5",
				children: !picking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setPicking(true),
						className: btnClass("soft"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add a career from 260+ options"]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: pickerSearch,
								onChange: (e) => setPickerSearch(e.target.value),
								placeholder: "Search career or skill…",
								className: inputClass("h-9 pl-8 pr-2 text-xs")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"aria-label": "Filter career picker by industry",
							value: pickerIndustry,
							onChange: (e) => setPickerIndustry(e.target.value),
							className: selectClass("h-9 px-2 text-xs"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ALL",
								children: "All industries"
							}), INDUSTRIES.map((ind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: ind,
								children: ind
							}, ind))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex max-h-40 flex-wrap gap-1.5 overflow-y-auto pr-1",
							children: pickerChoices.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								onClick: () => add(c.id),
								className: "px-2.5 py-1 text-xs",
								children: [saved.includes(c.id) ? "★ " : "", c.name]
							}, c.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: btnClass("ghost", "h-8 min-h-8 text-xs"),
							onClick: () => setPicking(false),
							children: "Cancel"
						})
					]
				})
			})]
		}),
		cs.length < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: "Add at least two careers to see the 17-dimension comparison." })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
				className: "mt-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-5 text-cyan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-semibold",
								children: "Difference highlights & user-priority summary"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"aria-label": "Comparison title",
								value: saveTitle,
								onChange: (e) => setSaveTitle(e.target.value),
								placeholder: "Comparison name…",
								className: inputClass("h-9 w-56 text-xs")
							}), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "soft",
								className: "h-9 min-h-9 px-3 text-xs",
								onClick: handleSaveComparison,
								disabled: saving,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkPlus, { className: "size-3.5" }),
									" ",
									saving ? "Saving…" : "Save Comparison"
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								search: { next: "/compare" },
								className: btnClass("soft", "h-9 min-h-9 px-3 text-xs"),
								children: "Sign in to save comparison"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2 text-text-2",
						children: buildComparisonSummary(cs, profile, discovery?.answers).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1.5 shrink-0 rounded-full bg-lavender" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 break-words",
								children: l
							})]
						}, l))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Salaries and timelines are indicative market benchmarks (2025–2026) and do not guarantee income. Futuroute highlights trade-offs based on your priorities rather than declaring a single universal winner."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"aria-label": "Comparison table",
				className: "mt-6 space-y-3",
				children: ROWS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass overflow-hidden p-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-expanded": !!open[r.key],
						onClick: () => setOpen({
							...open,
							[r.key]: !open[r.key]
						}),
						className: "flex w-full items-center justify-between px-5 py-4 text-left font-display font-semibold hover:bg-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 shrink-0 transition", open[r.key] && "rotate-180") })]
					}), open[r.key] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("grid gap-px border-t border-glass-border bg-glass-border", cs.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"),
						children: cs.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 break-words bg-indigo-deep/85 p-5 text-sm text-text-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("mb-2 text-xs font-medium uppercase tracking-wider", HUE_CLASS[c.hue].text),
								children: c.name
							}), r.render(c, ctx)]
						}, c.id))
					})]
				}, r.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: "What should I try first?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-text-2",
						children: "Spend 10 minutes on each. Notice which one you'd happily keep doing."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("mt-5 grid gap-4", cs.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"),
						children: cs.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-soft flex min-w-0 flex-col gap-3 p-5 break-words",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: cn("text-sm font-medium", HUE_CLASS[c.hue].text),
									children: [c.name, " trial"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-text-2",
									children: c.trial
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/try",
									search: { c: c.challengeId },
									className: btnClass("outline", "mt-auto"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "size-4" }), " Start this trial"]
								})
							]
						}, c.id))
					})
				]
			})
		] }),
		savedComparisons.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold",
				children: "Your saved comparisons"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-3 sm:grid-cols-2",
				children: savedComparisons.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-soft flex items-center justify-between gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => actions.setCompare(item.careerIds),
						className: "min-w-0 flex-1 text-left hover:text-cyan",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [item.careerIds.length, " careers · Click to load"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `Delete ${item.title}`,
						onClick: () => void actions.removeComparisonRecord(item.id),
						className: "grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-warning",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
					})]
				}, item.id))
			})]
		})
	] });
}
//#endregion
export { Compare as component };
