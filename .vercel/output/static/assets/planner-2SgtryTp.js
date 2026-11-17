import { l as __toESM, o as require_jsx_runtime, s as require_react } from "./useSelector-Cu7jxM-W.js";
import { n as toast } from "./dist-CnotZWgl.js";
import { L as useNavigate, h as useUser } from "./auth-ByhFdEgm.js";
import { a as Search, n as Wallet, t as AppShell } from "./AppShell-BgEZmUVx.js";
import { a as actions, i as INDUSTRIES, r as getCareer, s as useApp } from "./careers-Da7lFkNP.js";
import { a as Route } from "./index-DW2YTfhy.js";
import { r as useCareersCatalog, u as createLucideIcon } from "./careers-service-REWdQftI.js";
import { t as BookmarkPlus } from "./bookmark-plus-C-BtLwOv.js";
import { t as ExternalLink } from "./external-link-_z19ceB5.js";
import { t as Plus } from "./plus-Vx67vOmi.js";
import { t as Trash2 } from "./trash-2-CZ9EJ6gF.js";
import { a as Glass, c as PageHeader, d as inputClass, f as selectClass, m as cn, n as Button, r as Chip, s as Notice } from "./ui-kit-BDOPC8gw.js";
import { n as BUDGET_CATEGORY_LABEL } from "./budget-catalog-DyJU729V.js";
import { a as recomputePlanWithItems, n as buildPlan, r as buildRoadmap } from "./engine-CZvW0XUP.js";
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Award = createLucideIcon("award", [["path", {
	d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
	key: "1yiouv"
}], ["circle", {
	cx: "12",
	cy: "8",
	r: "6",
	key: "1vp47v"
}]]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FolderKanban = createLucideIcon("folder-kanban", [
	["path", {
		d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
		key: "1fr9dc"
	}],
	["path", {
		d: "M8 10v4",
		key: "tgpxqk"
	}],
	["path", {
		d: "M12 10v2",
		key: "hh53o1"
	}],
	["path", {
		d: "M16 10v6",
		key: "1d6xys"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LoaderCircle = createLucideIcon("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MapPlus = createLucideIcon("map-plus", [
	["path", {
		d: "m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V12",
		key: "svfegj"
	}],
	["path", {
		d: "M15 5.764V12",
		key: "1ocw4k"
	}],
	["path", {
		d: "M18 15v6",
		key: "9wciyi"
	}],
	["path", {
		d: "M21 18h-6",
		key: "139f0c"
	}],
	["path", {
		d: "M9 3.236v15",
		key: "1uimfh"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var RefreshCw = createLucideIcon("refresh-cw", [
	["path", {
		d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
		key: "v9h5vc"
	}],
	["path", {
		d: "M21 3v5h-5",
		key: "1q7to0"
	}],
	["path", {
		d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
		key: "3uifl3"
	}],
	["path", {
		d: "M8 16H3v5",
		key: "1cv678"
	}]
]);
//#endregion
//#region src/routes/planner.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRESETS = [
	{
		v: 0,
		l: "₹0 — Free only"
	},
	{
		v: 500,
		l: "₹500"
	},
	{
		v: 1e3,
		l: "₹1,000"
	},
	{
		v: 2e3,
		l: "₹2,000"
	},
	{
		v: 5e3,
		l: "₹5,000"
	},
	{
		v: 1e4,
		l: "₹10,000"
	}
];
var CATEGORY_ORDER = [
	"paid_course",
	"paid_tool",
	"certification",
	"project_expense"
];
function formatInr(value) {
	return `₹${Math.max(0, Math.round(value)).toLocaleString("en-IN")}`;
}
function Planner() {
	const search = Route.useSearch();
	const { profile, savedPlans } = useApp();
	const { user } = useUser();
	const { careers } = useCareersCatalog();
	const nav = useNavigate();
	const initialCareerId = search.career && getCareer(search.career, careers) ? search.career : "software-developer";
	const [industryFilter, setIndustryFilter] = (0, import_react.useState)("ALL");
	const [careerSearch, setCareerSearch] = (0, import_react.useState)("");
	const [f, setF] = (0, import_react.useState)({
		careerId: initialCareerId,
		level: "beginner",
		budget: profile?.budget ?? 0,
		hours: profile?.weeklyHours ?? 5,
		device: "laptop",
		format: "mixed",
		outcome: "fundamentals"
	});
	const [custom, setCustom] = (0, import_react.useState)(profile?.budget !== void 0 && !PRESETS.some((p) => p.v === profile.budget));
	const [err, setErr] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [savingPlan, setSavingPlan] = (0, import_react.useState)(false);
	const [addingRoadmap, setAddingRoadmap] = (0, import_react.useState)(false);
	const [plan, setPlan] = (0, import_react.useState)(null);
	const filteredCareers = (0, import_react.useMemo)(() => {
		const q = careerSearch.trim().toLowerCase();
		return careers.filter((c) => {
			if (industryFilter !== "ALL" && c.industry !== industryFilter) return false;
			if (q && !`${c.name} ${c.industry} ${c.skills.join(" ")}`.toLowerCase().includes(q)) return false;
			return true;
		});
	}, [
		careers,
		industryFilter,
		careerSearch
	]);
	const set = (k, v) => {
		setF((prev) => ({
			...prev,
			[k]: v
		}));
		setPlan(null);
	};
	const generate = () => {
		if (!Number.isFinite(f.budget) || f.budget < 0) return setErr("Budget must be ₹0 or more.");
		if (f.budget > 1e6) return setErr("Please enter a budget below ₹10,00,000.");
		if (f.hours < 1 || f.hours > 40) return setErr("Hours per week must be between 1 and 40.");
		setErr("");
		setLoading(true);
		setTimeout(() => {
			setPlan(buildPlan(f, careers));
			setLoading(false);
		}, 180);
	};
	const removeAllocatedItem = (itemId) => {
		if (!plan) return;
		const next = plan.allocatedItems.filter((x) => x.id !== itemId);
		setPlan(recomputePlanWithItems(plan, next));
	};
	const replaceAllocatedItem = (oldItem) => {
		if (!plan) return;
		const availableCap = plan.remainingBalance + oldItem.estimatedCostInr;
		const activeIds = new Set(plan.allocatedItems.map((x) => x.id));
		const candidates = plan.catalogRanked.filter((x) => !activeIds.has(x.id) && x.estimatedCostInr <= availableCap);
		const replacement = candidates.find((x) => x.category === oldItem.category) ?? candidates[0];
		if (!replacement) {
			toast.info("No alternative item fits within your remaining budget.");
			return;
		}
		const next = plan.allocatedItems.map((x) => x.id === oldItem.id ? replacement : x);
		setPlan(recomputePlanWithItems(plan, next));
		toast.success(`Replaced with ${replacement.name}`);
	};
	const addCatalogItem = (item) => {
		if (!plan) return;
		if (item.estimatedCostInr > plan.remainingBalance) {
			toast.error("This option exceeds your remaining balance.");
			return;
		}
		const next = [...plan.allocatedItems, item];
		setPlan(recomputePlanWithItems(plan, next));
		toast.success(`Added ${item.name}`);
	};
	const handleSavePlan = async () => {
		if (!plan) return;
		setSavingPlan(true);
		try {
			await actions.saveBudgetPlan({
				careerId: plan.career.id,
				careerName: plan.career.name,
				level: f.level ?? "beginner",
				budget: plan.budgetTotal,
				recommendedSpend: plan.recommendedSpend,
				hours: f.hours,
				device: f.device,
				format: f.format,
				outcome: f.outcome,
				weeks: plan.weeks,
				itemIds: plan.allocatedItems.map((i) => i.id)
			});
			toast.success(user?.emailVerified ? `Saved ${formatInr(plan.budgetTotal)} plan to your account` : `Saved ${formatInr(plan.budgetTotal)} plan locally`);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed to save learning plan");
		} finally {
			setSavingPlan(false);
		}
	};
	const loadSavedPlan = (saved) => {
		const nextInput = {
			careerId: saved.careerId,
			level: saved.level,
			budget: saved.budget,
			hours: saved.hours,
			device: saved.device || f.device,
			format: saved.format || f.format,
			outcome: saved.outcome || f.outcome
		};
		setF(nextInput);
		setCustom(!PRESETS.some((p) => p.v === saved.budget));
		const base = buildPlan(nextInput, careers);
		const chosenItems = saved.itemIds.map((itemId) => base.catalogRanked.find((c) => c.id === itemId)).filter((x) => Boolean(x));
		setPlan(recomputePlanWithItems(base, chosenItems));
		toast.success(`Loaded plan for ${saved.careerName}`);
	};
	const addToRoadmap = async () => {
		const chosen = getCareer(f.careerId, careers);
		if (!chosen) return;
		setAddingRoadmap(true);
		try {
			const rm = buildRoadmap({ ...f }, careers);
			await actions.addRoadmap(rm, chosen.name);
			toast.success(user?.emailVerified ? `Added ${chosen.name} to your cloud roadmaps` : `Added ${chosen.name} roadmap locally`);
			nav({ to: "/roadmap" });
		} finally {
			setAddingRoadmap(false);
		}
	};
	const spendPct = plan && plan.budgetTotal > 0 ? Math.min(100, Math.round(plan.recommendedSpend / plan.budgetTotal * 100)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Signature feature",
		title: "Budget-to-Skill Planner",
		text: "Enter your real INR budget and weekly hours. Free verified courses always anchor your foundation, while budgets above ₹0 allocate targeted paid courses, tools, certifications, and project materials."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 xl:grid-cols-[410px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
				className: "h-fit space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "ind-filter",
							className: "text-xs font-medium text-text-2",
							children: "Filter career selector by industry or name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "ind-filter",
								className: selectClass("h-10 text-xs"),
								value: industryFilter,
								onChange: (e) => {
									const nextInd = e.target.value;
									setIndustryFilter(nextInd);
									const first = careers.find((c) => nextInd === "ALL" || c.industry === nextInd);
									if (first) set("careerId", first.id);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ALL",
									children: "All 20 Industries"
								}), INDUSTRIES.map((ind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: ind,
									children: ind
								}, ind))]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"aria-label": "Search career list",
									value: careerSearch,
									onChange: (e) => setCareerSearch(e.target.value),
									placeholder: "Quick search…",
									className: inputClass("h-10 pl-8 pr-2 text-xs")
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						htmlFor: "career",
						className: "mb-1.5 block text-sm font-medium text-text-2",
						children: [
							"Target career (",
							filteredCareers.length,
							" options)"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: "career",
						className: selectClass(),
						value: f.careerId,
						onChange: (e) => set("careerId", e.target.value),
						children: (filteredCareers.length ? filteredCareers : careers).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: c.id,
							children: [
								c.name,
								" (",
								c.industry,
								")"
							]
						}, c.id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1.5 block text-sm font-medium text-text-2",
						children: "Current skill level"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							["beginner", "Complete beginner"],
							["some", "Some basics"],
							["comfortable", "Fairly comfortable"]
						].map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: f.level === v,
							onClick: () => set("level", v),
							children: l
						}, v))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1.5 block text-sm font-medium text-text-2",
							children: "Available budget (INR)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: !custom && f.budget === p.v,
								onClick: () => {
									setCustom(false);
									set("budget", p.v);
								},
								children: p.l
							}, p.v)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: custom,
								onClick: () => setCustom(true),
								children: "Custom"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "budget",
							className: "sr-only",
							children: "Budget in rupees"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "budget",
							type: "number",
							min: 0,
							inputMode: "numeric",
							value: f.budget,
							onChange: (e) => {
								setCustom(true);
								set("budget", Number(e.target.value));
							},
							placeholder: "Enter budget in ₹",
							className: inputClass("mt-2.5")
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						htmlFor: "hrs",
						className: "mb-1.5 block text-sm font-medium text-text-2",
						children: ["Hours per week: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold text-foreground",
							children: [f.hours, " h"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "hrs",
						type: "range",
						min: 1,
						max: 30,
						value: f.hours,
						onChange: (e) => set("hours", Number(e.target.value)),
						className: "w-full accent-[var(--cyan)]"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "dev",
							className: "mb-1.5 block text-sm font-medium text-text-2",
							children: "Device"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "dev",
							className: selectClass(),
							value: f.device,
							onChange: (e) => set("device", e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "phone",
									children: "Phone"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "laptop",
									children: "Laptop"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "desktop",
									children: "Desktop"
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "fmt",
							className: "mb-1.5 block text-sm font-medium text-text-2",
							children: "Format"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "fmt",
							className: selectClass(),
							value: f.format,
							onChange: (e) => set("format", e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "video",
									children: "Videos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "reading",
									children: "Reading"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "interactive",
									children: "Interactive"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "mixed",
									children: "Mixed"
								})
							]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "out",
						className: "mb-1.5 block text-sm font-medium text-text-2",
						children: "Desired outcome"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						id: "out",
						className: selectClass(),
						value: f.outcome,
						onChange: (e) => set("outcome", e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "fundamentals",
								children: "Understand the fundamentals"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "project",
								children: "Complete a beginner project"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "portfolio",
								children: "Build a small portfolio"
							})
						]
					})] }),
					err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "warn",
						children: err
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						onClick: generate,
						disabled: loading,
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Building plan…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4" }), " Generate my spending & skill plan"] })
					})
				]
			}), savedPlans.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-base font-semibold",
					children: [
						"Saved learning plans (",
						savedPlans.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: savedPlans.map((sp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "glass-soft flex items-center justify-between gap-2 px-3 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => loadSavedPlan(sp),
							className: "min-w-0 flex-1 text-left hover:text-cyan",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-sm font-medium text-foreground",
								children: [
									sp.careerName,
									" · ",
									formatInr(sp.budget)
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Est. spend ",
									formatInr(sp.recommendedSpend),
									" · ",
									sp.hours,
									" h/wk · ~",
									sp.weeks,
									" ",
									"wks"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Delete saved plan for ${sp.careerName}`,
							onClick: () => void actions.removeBudgetPlan(sp.id),
							className: "grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-warning",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					}, sp.id))
				})]
			})]
		}), !plan ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glass, {
			className: "grid place-items-center text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-md py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: "Your budget plan appears here"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-text-2",
					children: "Choose any career across 20 industries and select your INR budget on the left (from ₹0 free-only up to ₹10,000+). We combine free foundations with realistic paid courses, tools, certifications, and project costs that fit your budget."
				})]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs uppercase tracking-wider text-cyan",
									children: [plan.career.industry, " · Estimated budget summary"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl font-semibold",
									children: plan.career.name
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									onClick: handleSavePlan,
									disabled: savingPlan,
									className: "text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkPlus, { className: "size-4" }), savingPlan ? "Saving…" : "Save Plan"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "soft",
									onClick: generate,
									className: "text-xs",
									title: "Reset items to default recommended allocation",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), " Regenerate"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass-soft p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Total available budget"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-display text-2xl font-semibold text-foreground",
										children: formatInr(plan.budgetTotal)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass-soft p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											"Estimated recommended spend",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-1 rounded bg-lavender/20 px-1.5 py-0.5 text-[10px] text-lavender-bright",
												children: "Estimated"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-display text-2xl font-semibold text-cyan",
										children: formatInr(plan.recommendedSpend)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass-soft p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Remaining balance"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-display text-2xl font-semibold text-success",
										children: formatInr(plan.remainingBalance)
									})]
								})
							]
						}),
						plan.budgetTotal > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Budget allocation (",
								spendPct,
								"%)"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Strictly within your ",
								formatInr(plan.budgetTotal),
								" cap"
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 overflow-hidden rounded-full bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-brand transition-all",
								style: { width: `${spendPct}%` }
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: plan.withinBudget ? "success" : "warn",
							children: plan.budgetNote
						}),
						plan.warnings.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: "warn",
							children: w
						}, w))
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "1 · Skills & concepts to learn"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 space-y-2 text-sm text-text-2",
						children: plan.learn.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-6 shrink-0 place-items-center rounded-full bg-accent text-xs text-lavender-bright",
								children: i + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 break-words",
								children: s
							})]
						}, s))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "2 · Core free verified resources (₹0)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: plan.free.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: r.url,
							target: "_blank",
							rel: "noreferrer",
							className: "glass-soft flex items-center justify-between gap-2 px-3 py-2.5 text-sm hover:border-cyan/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-medium text-foreground",
									children: r.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block text-xs text-muted-foreground",
									children: [
										r.cost,
										" · ",
										r.note
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4 shrink-0 text-cyan" })]
						}) }, r.url))
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold",
								children: "3 · Tailored INR spending allocation"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Prices are marked Estimated in INR. Remove or swap any item to recalculate your remaining balance instantly."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								className: "text-xs",
								children: [
									plan.allocatedItems.length,
									" item",
									plan.allocatedItems.length === 1 ? "" : "s",
									" ",
									"selected"
								]
							})]
						}),
						plan.budgetTotal === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: "info",
							children: "At ₹0, your plan uses 100% free verified resources above. Increase your budget if you want to allocate optional paid courses, kits, or exam certificates."
						}) : plan.allocatedItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
							tone: "info",
							children: [
								"No paid items currently allocated from your ",
								formatInr(plan.budgetTotal),
								" budget. Add any compatible option from Section 4 below, or start free right away."
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: CATEGORY_ORDER.map((cat) => {
								const items = plan.allocatedItems.filter((x) => x.category === cat);
								if (items.length === 0) return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium uppercase tracking-wider text-lavender-bright",
										children: BUDGET_CATEGORY_LABEL[cat]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-3 md:grid-cols-2",
										children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "glass-soft flex flex-col justify-between gap-3 p-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 space-y-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-wrap items-start justify-between gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
															className: "font-medium text-foreground",
															children: item.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "shrink-0 rounded-full border border-cyan/40 bg-cyan/10 px-2.5 py-0.5 text-xs font-medium text-cyan",
															children: [formatInr(item.estimatedCostInr), " · Estimated"]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-muted-foreground",
														children: item.provider
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm text-text-2",
														children: item.whyRecommended
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-muted-foreground",
														children: item.priceNote
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center justify-between gap-2 border-t border-glass-border pt-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: item.providerUrl,
													target: "_blank",
													rel: "noreferrer",
													className: "inline-flex items-center gap-1 text-xs font-medium text-cyan hover:underline",
													children: ["Verify price ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "outline",
														className: "h-8 min-h-8 px-2.5 text-xs",
														onClick: () => replaceAllocatedItem(item),
														children: "Replace"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														className: "h-8 min-h-8 px-2.5 text-xs text-warning hover:text-warning",
														onClick: () => removeAllocatedItem(item.id),
														children: "Remove"
													})]
												})]
											})]
										}, item.id))
									})]
								}, cat);
							})
						}),
						plan.overBudgetOptions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-glass-border pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground",
								children: "4 · Optional upgrades & future items (never auto-added beyond budget)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: plan.overBudgetOptions.map((opt) => {
									const canAfford = opt.estimatedCostInr <= plan.remainingBalance;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass-soft flex flex-col justify-between gap-2 p-3.5 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground",
												children: opt.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "shrink-0 text-xs font-medium text-lavender-bright",
												children: [formatInr(opt.estimatedCostInr), " (Est.)"]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-text-2",
											children: opt.whyRecommended
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-2 pt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] text-muted-foreground",
												children: BUDGET_CATEGORY_LABEL[opt.category]
											}), canAfford ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "soft",
												className: "h-8 min-h-8 px-2.5 text-xs",
												onClick: () => addCatalogItem(opt),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }),
													" Add (",
													formatInr(opt.estimatedCostInr),
													")"
												]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("rounded-full border border-warning/40 bg-warning/10 px-2.5 py-0.5 text-[11px] text-warning"),
												children: "Exceeds remaining budget"
											})]
										})]
									}, opt.id);
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 font-display text-lg font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-4 text-cyan" }), " 5 · Relevant qualifications & certifications"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-1.5 text-sm text-text-2",
						children: plan.certifications.map((cert) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", cert] }, cert))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 font-display text-lg font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderKanban, { className: "size-4 text-lavender-bright" }), " 6 · Recommended starter projects"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-1.5 text-sm text-text-2",
						children: plan.projects.map((proj) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", proj] }, proj))
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "7 · Estimated duration"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 font-display text-3xl",
							children: [
								"~",
								plan.weeks,
								" weeks"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-text-2",
							children: plan.schedule
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
						className: "flex flex-col justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "8 · Save as a trackable roadmap"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-text-2",
							children: "Creates a phased weekly checklist in My Roadmap without overwriting your existing roadmaps."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: addToRoadmap,
							disabled: addingRoadmap,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPlus, { className: "size-4" }), addingRoadmap ? "Adding…" : "Add Plan to My Roadmap"]
						})]
					})]
				})
			]
		})]
	})] });
}
//#endregion
export { Planner as component };
