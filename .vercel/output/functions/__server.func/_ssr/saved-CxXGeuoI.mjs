import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Glass, c as PageHeader, f as inputClass, i as EmptyState, n as Button, p as selectClass, r as Chip, u as btnClass } from "./ui-kit-BmqGm62i.mjs";
import { b as useUser } from "./auth-Bjd81y0G.mjs";
import { a as getCareer, i as actions, s as useApp } from "./careers-ChJ9jiL5.mjs";
import { r as useCareersCatalog } from "./careers-service-BdvVUi83.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { j as GitCompareArrows, q as Bookmark, w as LogIn } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DVN8uj3t.mjs";
import { t as CareerCard } from "./CareerParts-BEKUbYuv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/saved-CxXGeuoI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/saved.tsx?tsr-split=component";
var FOLDERS = [
	{
		id: "top",
		label: "Top Career Choices",
		desc: "Strong contenders you want to examine closely."
	},
	{
		id: "alternative",
		label: "Alternative Careers",
		desc: "Realistic backup or cross-industry paths."
	},
	{
		id: "explore_later",
		label: "Explore Later",
		desc: "Interesting discoveries to revisit when you have time."
	}
];
function Saved() {
	const { user, loading } = useUser();
	const { saved, savedFolders, savedNotes } = useApp();
	const { careers } = useCareersCatalog();
	const [activeTab, setActiveTab] = (0, import_react.useState)("all");
	const [noteDrafts, setNoteDrafts] = (0, import_react.useState)({});
	if (!loading && !user) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		title: "Saved Careers",
		text: "Sign in to save careers into Top Choices, Alternative Careers, and Explore Later folders."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 46,
		columnNumber: 9
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
		className: "max-w-xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "font-display text-xl font-semibold",
				children: "Sign in to manage your saved folders"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 48,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-text-2",
				children: "Your shortlist folders and personal notes sync safely with your verified Futuroute account."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 51,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/auth",
					search: { next: "/saved" },
					className: btnClass("primary"),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogIn, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 59,
						columnNumber: 15
					}, this), " Sign in / Register"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/discover",
					className: btnClass("outline"),
					children: "Browse careers"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 61,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 55,
				columnNumber: 11
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 47,
		columnNumber: 9
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 45,
		columnNumber: 12
	}, this);
	const allCareers = saved.map((id) => getCareer(id, careers)).filter((c) => Boolean(c));
	const visibleCareers = activeTab === "all" ? allCareers : allCareers.filter((c) => (savedFolders[c.id] ?? "top") === activeTab);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
			title: "Saved Careers",
			text: "Organise your shortlist into folders, keep personal notes, and compare options side by side.",
			children: visibleCareers.length >= 2 && /* @__PURE__ */ (void 0)(Link, {
				to: "/compare",
				onClick: () => actions.setCompare(visibleCareers.slice(0, 3).map((c) => c.id)),
				className: btnClass("primary"),
				children: [
					/* @__PURE__ */ (void 0)(GitCompareArrows, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 73,
						columnNumber: 13
					}, this),
					" Compare",
					" ",
					activeTab === "all" ? "top saved" : "folder"
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 72,
				columnNumber: 40
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 71,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-6 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
				active: activeTab === "all",
				onClick: () => setActiveTab("all"),
				children: [
					"All Saved (",
					allCareers.length,
					")"
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 79,
				columnNumber: 9
			}, this), FOLDERS.map((f) => {
				const count = allCareers.filter((c) => (savedFolders[c.id] ?? "top") === f.id).length;
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
					active: activeTab === f.id,
					onClick: () => setActiveTab(f.id),
					children: [
						f.label,
						" (",
						count,
						")"
					]
				}, f.id, true, {
					fileName: _jsxFileName,
					lineNumber: 84,
					columnNumber: 16
				}, this);
			})]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 78,
			columnNumber: 7
		}, this),
		allCareers.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bookmark, { className: "size-5" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 91,
				columnNumber: 29
			}, this),
			title: "No saved careers yet",
			text: "Save careers from Guided Discovery, the 260+ Career Explorer, Compare, or any Career Profile.",
			action: {
				label: "Discover careers",
				to: "/discover"
			}
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 91,
			columnNumber: 11
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 90,
			columnNumber: 34
		}, this) : visibleCareers.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-sm text-text-2",
			children: "No careers in this folder yet. Move any saved career below or save more in Discover."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 96,
			columnNumber: 11
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 95,
			columnNumber: 50
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
			children: visibleCareers.map((c) => {
				const folder = savedFolders[c.id] ?? "top";
				const draft = noteDrafts[c.id] ?? savedNotes[c.id] ?? "";
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CareerCard, { career: c }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 104,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "glass-soft space-y-2 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between gap-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Folder:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 107,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
								"aria-label": `Folder for ${c.name}`,
								value: folder,
								onChange: (e) => {
									actions.setSavedFolder(c.id, c.name, e.target.value);
									toast.success(`Moved ${c.name}`);
								},
								className: selectClass("h-8 w-auto rounded-lg px-2 text-xs"),
								children: FOLDERS.map((f) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: f.id,
									children: f.label
								}, f.id, false, {
									fileName: _jsxFileName,
									lineNumber: 112,
									columnNumber: 41
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 108,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 106,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								"aria-label": `Personal note for ${c.name}`,
								value: draft,
								onChange: (e) => setNoteDrafts({
									...noteDrafts,
									[c.id]: e.target.value
								}),
								placeholder: "Add personal note…",
								maxLength: 240,
								className: inputClass("h-8 min-w-0 flex-1 rounded-lg px-2.5 text-xs")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 118,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								className: "h-8 min-h-8 px-2.5 text-xs",
								onClick: () => {
									actions.setSavedNote(c.id, draft);
									toast.success("Note saved");
								},
								children: "Save"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 122,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 117,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 105,
						columnNumber: 17
					}, this)]
				}, c.id, true, {
					fileName: _jsxFileName,
					lineNumber: 103,
					columnNumber: 16
				}, this);
			})
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 99,
			columnNumber: 20
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 70,
		columnNumber: 10
	}, this);
}
//#endregion
export { Saved as component };
