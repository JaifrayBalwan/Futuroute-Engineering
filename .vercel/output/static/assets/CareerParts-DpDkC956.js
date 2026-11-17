import { o as require_jsx_runtime } from "./useSelector-Cu7jxM-W.js";
import { I as Link, L as useNavigate } from "./auth-ByhFdEgm.js";
import { a as actions, n as HUE_CLASS, s as useApp } from "./careers-Da7lFkNP.js";
import { l as Bookmark, r as useCareersCatalog, u as createLucideIcon } from "./careers-service-REWdQftI.js";
import { t as ArrowRight } from "./arrow-right-Bzry0KKp.js";
import { t as Sparkles } from "./sparkles-WxdkWloa.js";
import { m as cn, r as Chip, u as btnClass } from "./ui-kit-BDOPC8gw.js";
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var BookmarkCheck = createLucideIcon("bookmark-check", [["path", {
	d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
	key: "oz39mx"
}], ["path", {
	d: "m9 10 2 2 4-4",
	key: "1gnqz4"
}]]);
//#endregion
//#region src/components/CareerParts.tsx
var import_jsx_runtime = require_jsx_runtime();
function SaveButton({ career, compact, folder = "top" }) {
	const { saved, savedFolders } = useApp();
	const on = saved.includes(career.id);
	const currentFolder = savedFolders[career.id] ?? folder;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => actions.toggleSave(career.id, career.name, currentFolder),
		"aria-pressed": on,
		"aria-label": on ? `Remove ${career.name} from saved` : `Save ${career.name}`,
		className: cn("inline-flex min-h-10 items-center gap-1.5 rounded-xl border px-3 text-sm transition", on ? "border-turquoise/40 bg-turquoise/15 text-turquoise" : "border-glass-border bg-secondary text-text-2 hover:text-foreground"),
		children: [on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4" }), !compact && (on ? "Saved" : "Save")]
	});
}
function CareerCard({ career }) {
	const h = HUE_CLASS[career.hue];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "glass flex flex-col gap-4 p-5 transition hover:-translate-y-0.5 hover:border-lavender/40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("grid size-10 shrink-0 place-items-center rounded-xl border font-display font-semibold", h.bg, h.border, h.text),
						children: career.name[0]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
							children: career.industry
						}), career.emerging && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 text-[11px] text-cyan",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), " Emerging"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {
					career,
					compact: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-semibold",
				children: career.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 line-clamp-2 text-sm text-text-2",
				children: career.short
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: career.skills.slice(0, 3).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					className: "text-xs",
					children: s
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/careers/$id",
				params: { id: career.id },
				className: btnClass("outline", "mt-auto"),
				children: ["Explore Career ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
			})
		]
	});
}
var NODE_POSITIONS = [
	{
		x: 300,
		y: 50
	},
	{
		x: 340,
		y: 120
	},
	{
		x: 330,
		y: 195
	},
	{
		x: 300,
		y: 265
	},
	{
		x: 170,
		y: 290
	},
	{
		x: 160,
		y: 20
	}
];
var DEFAULT_NODE_IDS = [
	"software-developer",
	"sports-analytics-engineer",
	"data-analyst",
	"ui-ux-designer",
	"cybersecurity-analyst",
	"digital-marketer"
];
function RouteMap({ className }) {
	const nav = useNavigate();
	const { saved, recent } = useApp();
	const { careers } = useCareersCatalog();
	const o = {
		x: 60,
		y: 160
	};
	const nodes = Array.from(/* @__PURE__ */ new Set([...saved.slice(0, 4), ...DEFAULT_NODE_IDS])).slice(0, 6).map((id, idx) => {
		const career = careers.find((c) => c.id === id);
		const pos = NODE_POSITIONS[idx];
		return career && pos ? {
			career,
			x: pos.x,
			y: pos.y
		} : null;
	}).filter((n) => Boolean(n));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 420 320",
		className: cn("h-auto w-full", className),
		role: "group",
		"aria-label": "Career branching map — select a career to explore",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "rm-line",
				x1: "0",
				x2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0",
					stopColor: "var(--lavender-bright)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "var(--cyan)"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
				id: "rm-glow",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0",
					stopColor: "var(--lavender)",
					stopOpacity: "0.6"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "var(--lavender)",
					stopOpacity: "0"
				})]
			})] }),
			nodes.map((n) => {
				const mx = (o.x + n.x) / 2;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: `M${o.x},${o.y} C${mx},${o.y} ${mx},${n.y} ${n.x},${n.y}`,
					stroke: "url(#rm-line)",
					strokeWidth: "1.5",
					fill: "none",
					opacity: "0.7",
					className: "route-dash"
				}, n.career.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: o.x,
				cy: o.y,
				r: "34",
				fill: "url(#rm-glow)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: o.x,
				cy: o.y,
				r: "9",
				fill: "var(--lavender-bright)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: o.x,
				y: o.y + 28,
				textAnchor: "middle",
				fontSize: "11",
				fill: "var(--text-2)",
				children: "You"
			}),
			nodes.map(({ career: c, x, y }) => {
				const isSaved = saved.includes(c.id);
				const seen = recent.includes(c.id);
				const shortLabel = c.name.length > 17 ? `${c.name.replace(" Analyst", "").replace(" Engineer", "").slice(0, 16)}…` : c.name;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					role: "button",
					tabIndex: 0,
					"aria-label": `Open ${c.name}`,
					className: "cursor-pointer outline-none [&:focus-visible>rect]:stroke-[var(--cyan)]",
					onClick: () => nav({
						to: "/careers/$id",
						params: { id: c.id }
					}),
					onKeyDown: (e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							nav({
								to: "/careers/$id",
								params: { id: c.id }
							});
						}
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: x - 66,
							y: y - 14,
							width: "132",
							height: "28",
							rx: "14",
							fill: "oklch(0.27 0.08 285 / 0.85)",
							stroke: isSaved ? "var(--turquoise)" : "oklch(1 0 0 / 0.25)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: x - 52,
							cy: y,
							r: "4",
							fill: isSaved ? "var(--turquoise)" : seen ? "var(--cyan)" : "var(--lavender)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: x - 42,
							y: y + 4,
							fontSize: "11",
							fill: "var(--foreground)",
							children: shortLabel
						})
					]
				}, c.id);
			})
		]
	});
}
//#endregion
export { RouteMap as n, SaveButton as r, CareerCard as t };
