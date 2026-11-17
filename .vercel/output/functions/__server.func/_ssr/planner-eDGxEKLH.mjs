import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { S as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Glass, c as PageHeader, d as cn, f as inputClass, n as Button, p as selectClass, r as Chip, s as Notice } from "./ui-kit-BmqGm62i.mjs";
import { b as useUser } from "./auth-Bjd81y0G.mjs";
import { a as getCareer, i as actions, r as INDUSTRIES, s as useApp } from "./careers-ChJ9jiL5.mjs";
import { r as useCareersCatalog } from "./careers-service-BdvVUi83.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { I as ExternalLink, J as BookmarkPlus, P as FolderKanban, T as LoaderCircle, Z as Award, _ as Plus, d as Search, g as RefreshCw, n as Wallet, o as Trash2, x as MapPlus } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DVN8uj3t.mjs";
import { n as BUDGET_CATEGORY_LABEL } from "./budget-catalog-DyJU729V.mjs";
import { a as recomputePlanWithItems, n as buildPlan, r as buildRoadmap } from "./engine-DVCtS3eD.mjs";
import { t as Route } from "./planner-BMtrQmYh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/planner-eDGxEKLH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/planner.tsx?tsr-split=component";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		eyebrow: "Signature feature",
		title: "Budget-to-Skill Planner",
		text: "Enter your real INR budget and weekly hours. Free verified courses always anchor your foundation, while budgets above ₹0 allocate targeted paid courses, tools, certifications, and project materials."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 185,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-6 xl:grid-cols-[410px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
				className: "h-fit space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							htmlFor: "ind-filter",
							className: "text-xs font-medium text-text-2",
							children: "Filter career selector by industry or name"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 191,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
								id: "ind-filter",
								className: selectClass("h-10 text-xs"),
								value: industryFilter,
								onChange: (e) => {
									const nextInd = e.target.value;
									setIndustryFilter(nextInd);
									const first = careers.find((c) => nextInd === "ALL" || c.industry === nextInd);
									if (first) set("careerId", first.id);
								},
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "ALL",
									children: "All 20 Industries"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 201,
									columnNumber: 19
								}, this), INDUSTRIES.map((ind) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: ind,
									children: ind
								}, ind, false, {
									fileName: _jsxFileName,
									lineNumber: 202,
									columnNumber: 42
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 195,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 207,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									"aria-label": "Search career list",
									value: careerSearch,
									onChange: (e) => setCareerSearch(e.target.value),
									placeholder: "Quick search…",
									className: inputClass("h-10 pl-8 pr-2 text-xs")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 208,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 206,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 194,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 190,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						htmlFor: "career",
						className: "mb-1.5 block text-sm font-medium text-text-2",
						children: [
							"Target career (",
							filteredCareers.length,
							" options)"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 214,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						id: "career",
						className: selectClass(),
						value: f.careerId,
						onChange: (e) => set("careerId", e.target.value),
						children: (filteredCareers.length ? filteredCareers : careers).map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: c.id,
							children: [
								c.name,
								" (",
								c.industry,
								")"
							]
						}, c.id, true, {
							fileName: _jsxFileName,
							lineNumber: 218,
							columnNumber: 80
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 217,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 213,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "mb-1.5 block text-sm font-medium text-text-2",
						children: "Current skill level"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 225,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							["beginner", "Complete beginner"],
							["some", "Some basics"],
							["comfortable", "Fairly comfortable"]
						].map(([v, l]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
							active: f.level === v,
							onClick: () => set("level", v),
							children: l
						}, v, false, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 145
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 228,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 224,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "mb-1.5 block text-sm font-medium text-text-2",
							children: "Available budget (INR)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 236,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap gap-2",
							children: [PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
								active: !custom && f.budget === p.v,
								onClick: () => {
									setCustom(false);
									set("budget", p.v);
								},
								children: p.l
							}, p.v, false, {
								fileName: _jsxFileName,
								lineNumber: 240,
								columnNumber: 35
							}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
								active: custom,
								onClick: () => setCustom(true),
								children: "Custom"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 246,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 239,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							htmlFor: "budget",
							className: "sr-only",
							children: "Budget in rupees"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 250,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
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
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 253,
							columnNumber: 15
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 235,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						htmlFor: "hrs",
						className: "mb-1.5 block text-sm font-medium text-text-2",
						children: ["Hours per week: ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-semibold text-foreground",
							children: [f.hours, " h"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 261,
							columnNumber: 33
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 260,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						id: "hrs",
						type: "range",
						min: 1,
						max: 30,
						value: f.hours,
						onChange: (e) => set("hours", Number(e.target.value)),
						className: "w-full accent-[var(--cyan)]"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 263,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 259,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							htmlFor: "dev",
							className: "mb-1.5 block text-sm font-medium text-text-2",
							children: "Device"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 268,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							id: "dev",
							className: selectClass(),
							value: f.device,
							onChange: (e) => set("device", e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "phone",
									children: "Phone"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 272,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "laptop",
									children: "Laptop"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 273,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "desktop",
									children: "Desktop"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 274,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 271,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 267,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							htmlFor: "fmt",
							className: "mb-1.5 block text-sm font-medium text-text-2",
							children: "Format"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 278,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							id: "fmt",
							className: selectClass(),
							value: f.format,
							onChange: (e) => set("format", e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "video",
									children: "Videos"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 282,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "reading",
									children: "Reading"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 283,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "interactive",
									children: "Interactive"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 284,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "mixed",
									children: "Mixed"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 285,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 281,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 277,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 266,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						htmlFor: "out",
						className: "mb-1.5 block text-sm font-medium text-text-2",
						children: "Desired outcome"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 291,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						id: "out",
						className: selectClass(),
						value: f.outcome,
						onChange: (e) => set("outcome", e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "fundamentals",
								children: "Understand the fundamentals"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 295,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "project",
								children: "Complete a beginner project"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 296,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "portfolio",
								children: "Build a small portfolio"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 297,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 294,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 290,
						columnNumber: 13
					}, this),
					err && /* @__PURE__ */ (void 0)(Notice, {
						tone: "warn",
						children: err
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 301,
						columnNumber: 21
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						className: "w-full",
						onClick: generate,
						disabled: loading,
						children: loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 304,
							columnNumber: 19
						}, this), " Building plan…"] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 303,
							columnNumber: 26
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Wallet, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 306,
							columnNumber: 19
						}, this), " Generate my spending & skill plan"] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 305,
							columnNumber: 23
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 302,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 189,
				columnNumber: 11
			}, this), savedPlans.length > 0 && /* @__PURE__ */ (void 0)(Glass, {
				className: "space-y-3",
				children: [/* @__PURE__ */ (void 0)("h2", {
					className: "font-display text-base font-semibold",
					children: [
						"Saved learning plans (",
						savedPlans.length,
						")"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 312,
					columnNumber: 15
				}, this), /* @__PURE__ */ (void 0)("ul", {
					className: "space-y-2",
					children: savedPlans.map((sp) => /* @__PURE__ */ (void 0)("li", {
						className: "glass-soft flex items-center justify-between gap-2 px-3 py-2.5",
						children: [/* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => loadSavedPlan(sp),
							className: "min-w-0 flex-1 text-left hover:text-cyan",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "truncate text-sm font-medium text-foreground",
								children: [
									sp.careerName,
									" · ",
									formatInr(sp.budget)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 318,
								columnNumber: 23
							}, this), /* @__PURE__ */ (void 0)("p", {
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
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 321,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 317,
							columnNumber: 21
						}, this), /* @__PURE__ */ (void 0)("button", {
							type: "button",
							"aria-label": `Delete saved plan for ${sp.careerName}`,
							onClick: () => void actions.removeBudgetPlan(sp.id),
							className: "grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-warning",
							children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 327,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 326,
							columnNumber: 21
						}, this)]
					}, sp.id, true, {
						fileName: _jsxFileName,
						lineNumber: 316,
						columnNumber: 39
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 315,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 311,
				columnNumber: 37
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 188,
			columnNumber: 9
		}, this), !plan ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
			className: "grid place-items-center text-center",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "max-w-md py-16",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-2xl font-semibold",
					children: "Your budget plan appears here"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 336,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-text-2",
					children: "Choose any career across 20 industries and select your INR budget on the left (from ₹0 free-only up to ₹10,000+). We combine free foundations with realistic paid courses, tools, certifications, and project costs that fit your budget."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 337,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 335,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 334,
			columnNumber: 18
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "min-w-0 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs uppercase tracking-wider text-cyan",
									children: [plan.career.industry, " · Estimated budget summary"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 348,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "font-display text-2xl font-semibold",
									children: plan.career.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 351,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 347,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									onClick: handleSavePlan,
									disabled: savingPlan,
									className: "text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookmarkPlus, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 355,
										columnNumber: 21
									}, this), savingPlan ? "Saving…" : "Save Plan"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 354,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "soft",
									onClick: generate,
									className: "text-xs",
									title: "Reset items to default recommended allocation",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 359,
										columnNumber: 21
									}, this), " Regenerate"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 358,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 353,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 346,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "glass-soft p-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground",
										children: "Total available budget"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 366,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 font-display text-2xl font-semibold text-foreground",
										children: formatInr(plan.budgetTotal)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 367,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 365,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "glass-soft p-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											"Estimated recommended spend",
											" ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "ml-1 rounded bg-lavender/20 px-1.5 py-0.5 text-[10px] text-lavender-bright",
												children: "Estimated"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 374,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 372,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 font-display text-2xl font-semibold text-cyan",
										children: formatInr(plan.recommendedSpend)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 378,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 371,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "glass-soft p-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground",
										children: "Remaining balance"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 383,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 font-display text-2xl font-semibold text-success",
										children: formatInr(plan.remainingBalance)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 384,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 382,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 364,
							columnNumber: 15
						}, this),
						plan.budgetTotal > 0 && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
							className: "mb-1 flex justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (void 0)("span", { children: [
								"Budget allocation (",
								spendPct,
								"%)"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 392,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("span", { children: [
								"Strictly within your ",
								formatInr(plan.budgetTotal),
								" cap"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 393,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 391,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "h-2 overflow-hidden rounded-full bg-secondary",
							children: /* @__PURE__ */ (void 0)("div", {
								className: "h-full bg-brand transition-all",
								style: { width: `${spendPct}%` }
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 396,
								columnNumber: 21
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 395,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 390,
							columnNumber: 40
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Notice, {
							tone: plan.withinBudget ? "success" : "warn",
							children: plan.budgetNote
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 402,
							columnNumber: 15
						}, this),
						plan.warnings.map((w) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Notice, {
							tone: "warn",
							children: w
						}, w, false, {
							fileName: _jsxFileName,
							lineNumber: 403,
							columnNumber: 39
						}, this))
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 345,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-5 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-lg font-semibold",
						children: "1 · Skills & concepts to learn"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 411,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
						className: "mt-3 space-y-2 text-sm text-text-2",
						children: plan.learn.map((s, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "grid size-6 shrink-0 place-items-center rounded-full bg-accent text-xs text-lavender-bright",
								children: i + 1
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 416,
								columnNumber: 23
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "min-w-0 break-words",
								children: s
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 419,
								columnNumber: 23
							}, this)]
						}, s, true, {
							fileName: _jsxFileName,
							lineNumber: 415,
							columnNumber: 45
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 414,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 410,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-lg font-semibold",
						children: "2 · Core free verified resources (₹0)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 425,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "mt-3 space-y-2",
						children: plan.free.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: r.url,
							target: "_blank",
							rel: "noreferrer",
							className: "glass-soft flex items-center justify-between gap-2 px-3 py-2.5 text-sm hover:border-cyan/40",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "block font-medium text-foreground",
									children: r.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 432,
									columnNumber: 27
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "block text-xs text-muted-foreground",
									children: [
										r.cost,
										" · ",
										r.note
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 433,
									columnNumber: 27
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 431,
								columnNumber: 25
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-4 shrink-0 text-cyan" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 437,
								columnNumber: 25
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 430,
							columnNumber: 23
						}, this) }, r.url, false, {
							fileName: _jsxFileName,
							lineNumber: 429,
							columnNumber: 39
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 428,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 424,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 409,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-display text-lg font-semibold",
								children: "3 · Tailored INR spending allocation"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 448,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: "Prices are marked Estimated in INR. Remove or swap any item to recalculate your remaining balance instantly."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 451,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 447,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
								className: "text-xs",
								children: [
									plan.allocatedItems.length,
									" item",
									plan.allocatedItems.length === 1 ? "" : "s",
									" ",
									"selected"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 456,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 446,
							columnNumber: 15
						}, this),
						plan.budgetTotal === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Notice, {
							tone: "info",
							children: "At ₹0, your plan uses 100% free verified resources above. Increase your budget if you want to allocate optional paid courses, kits, or exam certificates."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 462,
							columnNumber: 41
						}, this) : plan.allocatedItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Notice, {
							tone: "info",
							children: [
								"No paid items currently allocated from your ",
								formatInr(plan.budgetTotal),
								" budget. Add any compatible option from Section 4 below, or start free right away."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 465,
							columnNumber: 64
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-4",
							children: CATEGORY_ORDER.map((cat) => {
								const items = plan.allocatedItems.filter((x) => x.category === cat);
								if (items.length === 0) return null;
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs font-medium uppercase tracking-wider text-lavender-bright",
										children: BUDGET_CATEGORY_LABEL[cat]
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 473,
										columnNumber: 25
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-3 md:grid-cols-2",
										children: items.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "glass-soft flex flex-col justify-between gap-3 p-4",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "min-w-0 space-y-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
														className: "flex flex-wrap items-start justify-between gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
															className: "font-medium text-foreground",
															children: item.name
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 480,
															columnNumber: 35
														}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
															className: "shrink-0 rounded-full border border-cyan/40 bg-cyan/10 px-2.5 py-0.5 text-xs font-medium text-cyan",
															children: [formatInr(item.estimatedCostInr), " · Estimated"]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 481,
															columnNumber: 35
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 479,
														columnNumber: 33
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
														className: "text-xs text-muted-foreground",
														children: item.provider
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 485,
														columnNumber: 33
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
														className: "text-sm text-text-2",
														children: item.whyRecommended
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 486,
														columnNumber: 33
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
														className: "text-xs text-muted-foreground",
														children: item.priceNote
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 487,
														columnNumber: 33
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 478,
												columnNumber: 31
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex flex-wrap items-center justify-between gap-2 border-t border-glass-border pt-3",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
													href: item.providerUrl,
													target: "_blank",
													rel: "noreferrer",
													className: "inline-flex items-center gap-1 text-xs font-medium text-cyan hover:underline",
													children: ["Verify price ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-3" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 491,
														columnNumber: 48
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 490,
													columnNumber: 33
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "flex gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
														variant: "outline",
														className: "h-8 min-h-8 px-2.5 text-xs",
														onClick: () => replaceAllocatedItem(item),
														children: "Replace"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 494,
														columnNumber: 35
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
														variant: "ghost",
														className: "h-8 min-h-8 px-2.5 text-xs text-warning hover:text-warning",
														onClick: () => removeAllocatedItem(item.id),
														children: "Remove"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 497,
														columnNumber: 35
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 493,
													columnNumber: 33
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 489,
												columnNumber: 31
											}, this)]
										}, item.id, true, {
											fileName: _jsxFileName,
											lineNumber: 477,
											columnNumber: 46
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 476,
										columnNumber: 25
									}, this)]
								}, cat, true, {
									fileName: _jsxFileName,
									lineNumber: 472,
									columnNumber: 22
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 468,
							columnNumber: 29
						}, this),
						plan.overBudgetOptions.length > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "border-t border-glass-border pt-4",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground",
								children: "4 · Optional upgrades & future items (never auto-added beyond budget)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 509,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: plan.overBudgetOptions.map((opt) => {
									const canAfford = opt.estimatedCostInr <= plan.remainingBalance;
									return /* @__PURE__ */ (void 0)("div", {
										className: "glass-soft flex flex-col justify-between gap-2 p-3.5 text-sm",
										children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-start justify-between gap-2",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "font-medium text-foreground",
												children: opt.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 518,
												columnNumber: 31
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "shrink-0 text-xs font-medium text-lavender-bright",
												children: [formatInr(opt.estimatedCostInr), " (Est.)"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 519,
												columnNumber: 31
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 517,
											columnNumber: 29
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "mt-1 text-xs text-text-2",
											children: opt.whyRecommended
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 523,
											columnNumber: 29
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 516,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between gap-2 pt-1",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-[11px] text-muted-foreground",
												children: BUDGET_CATEGORY_LABEL[opt.category]
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 526,
												columnNumber: 29
											}, this), canAfford ? /* @__PURE__ */ (void 0)(Button, {
												variant: "soft",
												className: "h-8 min-h-8 px-2.5 text-xs",
												onClick: () => addCatalogItem(opt),
												children: [
													/* @__PURE__ */ (void 0)(Plus, { className: "size-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 530,
														columnNumber: 33
													}, this),
													" Add (",
													formatInr(opt.estimatedCostInr),
													")"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 529,
												columnNumber: 42
											}, this) : /* @__PURE__ */ (void 0)("span", {
												className: cn("rounded-full border border-warning/40 bg-warning/10 px-2.5 py-0.5 text-[11px] text-warning"),
												children: "Exceeds remaining budget"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 532,
												columnNumber: 43
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 525,
											columnNumber: 27
										}, this)]
									}, opt.id, true, {
										fileName: _jsxFileName,
										lineNumber: 515,
										columnNumber: 24
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 512,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 508,
							columnNumber: 53
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 445,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-5 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "flex items-center gap-2 font-display text-lg font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Award, { className: "size-4 text-cyan" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 546,
							columnNumber: 19
						}, this), " 5 · Relevant qualifications & certifications"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 545,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "mt-3 space-y-1.5 text-sm text-text-2",
						children: plan.certifications.map((cert) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: ["• ", cert] }, cert, true, {
							fileName: _jsxFileName,
							lineNumber: 550,
							columnNumber: 52
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 549,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 544,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "flex items-center gap-2 font-display text-lg font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FolderKanban, { className: "size-4 text-lavender-bright" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 555,
							columnNumber: 19
						}, this), " 6 · Recommended starter projects"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 554,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "mt-3 space-y-1.5 text-sm text-text-2",
						children: plan.projects.map((proj) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: ["• ", proj] }, proj, true, {
							fileName: _jsxFileName,
							lineNumber: 559,
							columnNumber: 46
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 558,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 553,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 543,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-5 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display text-lg font-semibold",
							children: "7 · Estimated duration"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 566,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-3 font-display text-3xl",
							children: [
								"~",
								plan.weeks,
								" weeks"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 567,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-sm text-text-2",
							children: plan.schedule
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 568,
							columnNumber: 17
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 565,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
						className: "flex flex-col justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display text-lg font-semibold",
							children: "8 · Save as a trackable roadmap"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 572,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-sm text-text-2",
							children: "Creates a phased weekly checklist in My Roadmap without overwriting your existing roadmaps."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 575,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 571,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: addToRoadmap,
							disabled: addingRoadmap,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPlus, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 581,
								columnNumber: 19
							}, this), addingRoadmap ? "Adding…" : "Add Plan to My Roadmap"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 580,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 570,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 564,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 343,
			columnNumber: 22
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 187,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 184,
		columnNumber: 10
	}, this);
}
//#endregion
export { Planner as component };
