import { l as __toESM, o as require_jsx_runtime, s as require_react } from "./useSelector-Cu7jxM-W.js";
import { n as toast } from "./dist-CnotZWgl.js";
import { I as Link, h as useUser } from "./auth-ByhFdEgm.js";
import { s as LogIn, t as AppShell } from "./AppShell-BgEZmUVx.js";
import { a as actions, r as getCareer, s as useApp } from "./careers-Da7lFkNP.js";
import { l as Bookmark, r as useCareersCatalog, s as GitCompareArrows } from "./careers-service-REWdQftI.js";
import { t as CareerCard } from "./CareerParts-DpDkC956.js";
import { a as Glass, c as PageHeader, d as inputClass, f as selectClass, i as EmptyState, n as Button, r as Chip, u as btnClass } from "./ui-kit-BDOPC8gw.js";
//#region src/routes/saved.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	if (!loading && !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Saved Careers",
		text: "Sign in to save careers into Top Choices, Alternative Careers, and Explore Later folders."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
		className: "max-w-xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold",
				children: "Sign in to manage your saved folders"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-text-2",
				children: "Your shortlist folders and personal notes sync safely with your verified Futuroute account."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/auth",
					search: { next: "/saved" },
					className: btnClass("primary"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4" }), " Sign in / Register"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/discover",
					className: btnClass("outline"),
					children: "Browse careers"
				})]
			})
		]
	})] });
	const allCareers = saved.map((id) => getCareer(id, careers)).filter((c) => Boolean(c));
	const visibleCareers = activeTab === "all" ? allCareers : allCareers.filter((c) => (savedFolders[c.id] ?? "top") === activeTab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Saved Careers",
			text: "Organise your shortlist into folders, keep personal notes, and compare options side by side.",
			children: visibleCareers.length >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/compare",
				onClick: () => actions.setCompare(visibleCareers.slice(0, 3).map((c) => c.id)),
				className: btnClass("primary"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCompareArrows, { className: "size-4" }),
					" Compare",
					" ",
					activeTab === "all" ? "top saved" : "folder"
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
				active: activeTab === "all",
				onClick: () => setActiveTab("all"),
				children: [
					"All Saved (",
					allCareers.length,
					")"
				]
			}), FOLDERS.map((f) => {
				const count = allCareers.filter((c) => (savedFolders[c.id] ?? "top") === f.id).length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
					active: activeTab === f.id,
					onClick: () => setActiveTab(f.id),
					children: [
						f.label,
						" (",
						count,
						")"
					]
				}, f.id);
			})]
		}),
		allCareers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glass, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-5" }),
			title: "No saved careers yet",
			text: "Save careers from Guided Discovery, the 260+ Career Explorer, Compare, or any Career Profile.",
			action: {
				label: "Discover careers",
				to: "/discover"
			}
		}) }) : visibleCareers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glass, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-text-2",
			children: "No careers in this folder yet. Move any saved career below or save more in Discover."
		}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
			children: visibleCareers.map((c) => {
				const folder = savedFolders[c.id] ?? "top";
				const draft = noteDrafts[c.id] ?? savedNotes[c.id] ?? "";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareerCard, { career: c }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-soft space-y-2 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Folder:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								"aria-label": `Folder for ${c.name}`,
								value: folder,
								onChange: (e) => {
									actions.setSavedFolder(c.id, c.name, e.target.value);
									toast.success(`Moved ${c.name}`);
								},
								className: selectClass("h-8 w-auto rounded-lg px-2 text-xs"),
								children: FOLDERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: f.id,
									children: f.label
								}, f.id))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"aria-label": `Personal note for ${c.name}`,
								value: draft,
								onChange: (e) => setNoteDrafts({
									...noteDrafts,
									[c.id]: e.target.value
								}),
								placeholder: "Add personal note…",
								maxLength: 240,
								className: inputClass("h-8 min-w-0 flex-1 rounded-lg px-2.5 text-xs")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "h-8 min-h-8 px-2.5 text-xs",
								onClick: () => {
									actions.setSavedNote(c.id, draft);
									toast.success("Note saved");
								},
								children: "Save"
							})]
						})]
					})]
				}, c.id);
			})
		})
	] });
}
//#endregion
export { Saved as component };
