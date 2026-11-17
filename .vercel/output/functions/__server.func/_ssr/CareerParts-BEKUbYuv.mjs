import { S as useNavigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { d as cn, r as Chip, u as btnClass } from "./ui-kit-BmqGm62i.mjs";
import { i as actions, n as HUE_CLASS, s as useApp } from "./careers-ChJ9jiL5.mjs";
import { r as useCareersCatalog } from "./careers-service-BdvVUi83.mjs";
import { Q as ArrowRight, Y as BookmarkCheck, q as Bookmark, s as Sparkles } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CareerParts-BEKUbYuv.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/CareerParts.tsx";
function SaveButton({ career, compact, folder = "top" }) {
	const { saved, savedFolders } = useApp();
	const on = saved.includes(career.id);
	const currentFolder = savedFolders[career.id] ?? folder;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		onClick: () => actions.toggleSave(career.id, career.name, currentFolder),
		"aria-pressed": on,
		"aria-label": on ? `Remove ${career.name} from saved` : `Save ${career.name}`,
		className: cn("inline-flex min-h-10 items-center gap-1.5 rounded-xl border px-3 text-sm transition", on ? "border-turquoise/40 bg-turquoise/15 text-turquoise" : "border-glass-border bg-secondary text-text-2 hover:text-foreground"),
		children: [on ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookmarkCheck, { className: "size-4" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 34,
			columnNumber: 13
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bookmark, { className: "size-4" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 34,
			columnNumber: 52
		}, this), !compact && (on ? "Saved" : "Save")]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 22,
		columnNumber: 5
	}, this);
}
function CareerCard({ career }) {
	const h = HUE_CLASS[career.hue];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		className: "glass flex flex-col gap-4 p-5 transition hover:-translate-y-0.5 hover:border-lavender/40",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: cn("grid size-10 shrink-0 place-items-center rounded-xl border font-display font-semibold", h.bg, h.border, h.text),
						children: career.name[0]
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 46,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
							children: career.industry
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 57,
							columnNumber: 13
						}, this), career.emerging && /* @__PURE__ */ (void 0)("span", {
							className: "inline-flex items-center gap-1 text-[11px] text-cyan",
							children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 62,
								columnNumber: 17
							}, this), " Emerging"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 61,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 56,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 45,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SaveButton, {
					career,
					compact: true
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 67,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 44,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
				className: "font-display text-lg font-semibold",
				children: career.name
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 70,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-1 line-clamp-2 text-sm text-text-2",
				children: career.short
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 71,
				columnNumber: 9
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 69,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-1.5",
				children: career.skills.slice(0, 3).map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
					className: "text-xs",
					children: s
				}, s, false, {
					fileName: _jsxFileName,
					lineNumber: 75,
					columnNumber: 11
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 73,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/careers/$id",
				params: { id: career.id },
				className: btnClass("outline", "mt-auto"),
				children: ["Explore Career ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 81,
					columnNumber: 24
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 80,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 43,
		columnNumber: 5
	}, this);
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 420 320",
		className: cn("h-auto w-full", className),
		role: "group",
		"aria-label": "Career branching map — select a career to explore",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("defs", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
				id: "rm-line",
				x1: "0",
				x2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
					offset: "0",
					stopColor: "var(--lavender-bright)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 129,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
					offset: "1",
					stopColor: "var(--cyan)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 130,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 128,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("radialGradient", {
				id: "rm-glow",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
					offset: "0",
					stopColor: "var(--lavender)",
					stopOpacity: "0.6"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 133,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
					offset: "1",
					stopColor: "var(--lavender)",
					stopOpacity: "0"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 134,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 132,
				columnNumber: 9
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 127,
				columnNumber: 7
			}, this),
			nodes.map((n) => {
				const mx = (o.x + n.x) / 2;
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					d: `M${o.x},${o.y} C${mx},${o.y} ${mx},${n.y} ${n.x},${n.y}`,
					stroke: "url(#rm-line)",
					strokeWidth: "1.5",
					fill: "none",
					opacity: "0.7",
					className: "route-dash"
				}, n.career.id, false, {
					fileName: _jsxFileName,
					lineNumber: 140,
					columnNumber: 11
				}, this);
			}),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
				cx: o.x,
				cy: o.y,
				r: "34",
				fill: "url(#rm-glow)"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 151,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
				cx: o.x,
				cy: o.y,
				r: "9",
				fill: "var(--lavender-bright)"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 152,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
				x: o.x,
				y: o.y + 28,
				textAnchor: "middle",
				fontSize: "11",
				fill: "var(--text-2)",
				children: "You"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 153,
				columnNumber: 7
			}, this),
			nodes.map(({ career: c, x, y }) => {
				const isSaved = saved.includes(c.id);
				const seen = recent.includes(c.id);
				const shortLabel = c.name.length > 17 ? `${c.name.replace(" Analyst", "").replace(" Engineer", "").slice(0, 16)}…` : c.name;
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", {
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
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", {
							x: x - 66,
							y: y - 14,
							width: "132",
							height: "28",
							rx: "14",
							fill: "oklch(0.27 0.08 285 / 0.85)",
							stroke: isSaved ? "var(--turquoise)" : "oklch(1 0 0 / 0.25)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 178,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
							cx: x - 52,
							cy: y,
							r: "4",
							fill: isSaved ? "var(--turquoise)" : seen ? "var(--cyan)" : "var(--lavender)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 187,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
							x: x - 42,
							y: y + 4,
							fontSize: "11",
							fill: "var(--foreground)",
							children: shortLabel
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 193,
							columnNumber: 13
						}, this)
					]
				}, c.id, true, {
					fileName: _jsxFileName,
					lineNumber: 164,
					columnNumber: 11
				}, this);
			})
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 121,
		columnNumber: 5
	}, this);
}
//#endregion
export { RouteMap as n, SaveButton as r, CareerCard as t };
