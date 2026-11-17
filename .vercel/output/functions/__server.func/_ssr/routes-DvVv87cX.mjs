import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { l as ProgressRing, o as Logo, r as Chip, u as btnClass } from "./ui-kit-BmqGm62i.mjs";
import { b as useUser } from "./auth-Bjd81y0G.mjs";
import { t as CAREERS } from "./careers-ChJ9jiL5.mjs";
import { r as useCareersCatalog } from "./careers-service-BdvVUi83.mjs";
import { Q as ArrowRight, b as Map, j as GitCompareArrows, t as X, y as Menu, z as Compass } from "../_libs/lucide-react.mjs";
import { t as CareerCard } from "./CareerParts-BEKUbYuv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DvVv87cX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
var POPULAR = [
	"software-developer",
	"ai-ml-engineer",
	"sports-analytics-engineer",
	"ui-ux-designer",
	"cybersecurity-analyst",
	"digital-marketer"
];
function HeroArt() {
	const [hover, setHover] = (0, import_react.useState)(null);
	const items = [
		{
			id: "software-developer",
			label: "Software Dev",
			x: 78,
			y: 14,
			skill: "Logic"
		},
		{
			id: "ui-ux-designer",
			label: "UI/UX Design",
			x: 86,
			y: 44,
			skill: "Empathy"
		},
		{
			id: "sports-analytics-engineer",
			label: "Sports Analytics",
			x: 74,
			y: 76,
			skill: "Math + Sport"
		},
		{
			id: "cybersecurity-analyst",
			label: "Cybersecurity",
			x: 40,
			y: 88,
			skill: "Networks"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative aspect-[5/4] w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
				viewBox: "0 0 100 100",
				preserveAspectRatio: "none",
				className: "absolute inset-0 h-full w-full",
				"aria-hidden": true,
				children: items.map((i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					d: `M22,50 C${(22 + i.x) / 2},50 ${(22 + i.x) / 2},${i.y} ${i.x},${i.y}`,
					fill: "none",
					vectorEffect: "non-scaling-stroke",
					stroke: hover === i.id ? "var(--cyan)" : "var(--lavender)",
					strokeWidth: hover === i.id ? 2.5 : 1.3,
					opacity: "0.8",
					className: "route-dash"
				}, i.id, false, {
					fileName: _jsxFileName,
					lineNumber: 39,
					columnNumber: 25
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 38,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass absolute left-[22%] top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-3 text-center glow",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground",
					children: "Start here"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 42,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-display font-semibold",
					children: "Your Interests"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 43,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 41,
				columnNumber: 7
			}, this),
			items.map((i, k) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/careers/$id",
				params: { id: i.id },
				onMouseEnter: () => setHover(i.id),
				onMouseLeave: () => setHover(null),
				onFocus: () => setHover(i.id),
				onBlur: () => setHover(null),
				className: "glass floaty absolute -translate-x-1/2 -translate-y-1/2 px-3 py-2 text-sm transition hover:border-cyan/60",
				style: {
					left: `${i.x}%`,
					top: `${i.y}%`,
					animationDelay: `${k * .8}s`
				},
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "block font-medium",
					children: i.label
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "mt-1 inline-block rounded-full bg-cyan/15 px-2 py-0.5 text-[11px] text-cyan",
					children: i.skill
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 11
				}, this)]
			}, i.id, true, {
				fileName: _jsxFileName,
				lineNumber: 45,
				columnNumber: 28
			}, this)),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass absolute left-[2%] top-[6%] hidden items-center gap-3 p-3 sm:flex",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProgressRing, {
					value: 40,
					size: 48,
					stroke: 5,
					label: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[10px]",
						children: "40%"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 58,
						columnNumber: 62
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 58,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-medium",
						children: "Personalised roadmap"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 60,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground",
						children: "260+ careers · 20 industries"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 61,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 59,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 57,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 37,
		columnNumber: 10
	}, this);
}
function Home() {
	const [menu, setMenu] = (0, import_react.useState)(false);
	const { user } = useUser();
	const { careers } = useCareersCatalog();
	const links = [
		{
			to: "/",
			label: "Home"
		},
		{
			to: "/discover",
			label: "Discover Careers"
		},
		{
			to: "/compare",
			label: "Compare Careers"
		},
		{
			to: "/planner",
			label: "Budget Planner"
		},
		{
			to: "/about",
			label: "About"
		}
	];
	const ctaTo = user ? "/dashboard" : "/auth";
	const ctaLabel = user ? "My Dashboard" : "Sign in / Start";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "ambient min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "mx-auto flex max-w-7xl items-center justify-between px-5 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 95,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 94,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						"aria-label": "Main",
						className: "hidden items-center gap-1 md:flex",
						children: links.map((l) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: l.to,
							className: btnClass("ghost"),
							children: l.label
						}, l.label, false, {
							fileName: _jsxFileName,
							lineNumber: 98,
							columnNumber: 27
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 97,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: ctaTo,
							className: btnClass("primary", "hidden sm:inline-flex"),
							children: ctaLabel
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 103,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							className: "grid size-10 place-items-center rounded-xl border border-glass-border md:hidden",
							"aria-label": menu ? "Close menu" : "Open menu",
							"aria-expanded": menu,
							onClick: () => setMenu(!menu),
							children: menu ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 107,
								columnNumber: 21
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 107,
								columnNumber: 48
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 106,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 102,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 93,
				columnNumber: 7
			}, this),
			menu && /* @__PURE__ */ (void 0)("nav", {
				"aria-label": "Mobile",
				className: "glass mx-5 mb-4 flex flex-col p-2 md:hidden",
				children: [links.map((l) => /* @__PURE__ */ (void 0)(Link, {
					to: l.to,
					className: btnClass("ghost", "justify-start"),
					children: l.label
				}, l.label, false, {
					fileName: _jsxFileName,
					lineNumber: 112,
					columnNumber: 27
				}, this)), /* @__PURE__ */ (void 0)(Link, {
					to: ctaTo,
					className: btnClass("primary", "mt-2"),
					children: ctaLabel
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 115,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 111,
				columnNumber: 16
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-8 lg:grid-cols-2 lg:pt-16",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mb-4 text-sm text-cyan",
							children: "Explore possibilities. Test your potential. Plan your future."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 123,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "font-display text-4xl font-semibold leading-[1.05] sm:text-6xl",
							children: ["Your Future Isn't ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-gradient",
								children: "One-Size-Fits-All."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 127,
								columnNumber: 33
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 126,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-6 max-w-xl text-lg text-text-2",
							children: "Explore 260+ career paths across 20 industries, compare what they really involve, and build a learning plan that fits your time, strengths and budget."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 129,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/discover",
								className: btnClass("primary", "h-12 px-6"),
								children: ["Discover My Path ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 135,
									columnNumber: 34
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/compare",
								className: btnClass("outline", "h-12 px-6"),
								children: "Compare Careers"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 137,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 133,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-6 text-sm text-muted-foreground",
							children: "Browse 260+ careers freely as a visitor, or sign in to save your assessments and roadmaps."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 141,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 122,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeroArt, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 146,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 121,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "mx-auto max-w-7xl px-5 py-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display text-3xl font-semibold",
							children: "Feeling unsure about your future?"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 150,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-3 max-w-2xl text-text-2",
							children: "Many students have several interests and don't know what different careers actually involve day to day. Futuroute gives you a calm space to explore before you commit."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 151,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-8 grid gap-4 md:grid-cols-3",
							children: [
								{
									icon: Compass,
									t: "Discover",
									d: "Explore possible career paths based on what you enjoy.",
									to: "/discover"
								},
								{
									icon: GitCompareArrows,
									t: "Compare",
									d: "Understand differences, trade-offs and required skills.",
									to: "/compare"
								},
								{
									icon: Map,
									t: "Plan",
									d: "Build realistic next steps based on available time and budget.",
									to: "/planner"
								}
							].map(({ icon: I, t, d, to }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to,
								className: "glass block p-6 transition hover:border-lavender/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(I, {
										className: "size-6 text-lavender-bright",
										"aria-hidden": true
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 177,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "mt-4 font-display text-xl font-semibold",
										children: t
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 178,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-2 text-text-2",
										children: d
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 179,
										columnNumber: 17
									}, this)
								]
							}, t, true, {
								fileName: _jsxFileName,
								lineNumber: 176,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 155,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 149,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "mx-auto max-w-7xl px-5 py-16",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-3xl font-semibold",
						children: "How Futuroute works"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 185,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
						className: "mt-8 grid gap-4 md:grid-cols-3",
						children: [
							"Tell us about your interests, capabilities, and goals.",
							"Explore, compare and test career possibilities.",
							"Build and track a realistic learning roadmap."
						].map((s, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
							className: "glass-soft flex gap-4 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "grid size-10 shrink-0 place-items-center rounded-full bg-brand font-display font-semibold text-primary-foreground",
								children: i + 1
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 188,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "pt-2 text-text-2",
								children: s
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 191,
								columnNumber: 17
							}, this)]
						}, s, true, {
							fileName: _jsxFileName,
							lineNumber: 187,
							columnNumber: 187
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 186,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 184,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "mx-auto max-w-7xl px-5 py-16",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display text-3xl font-semibold",
							children: "Explore popular careers"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 198,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								"Logic",
								"Sports + Analytics",
								"Design",
								"Security"
							].map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, { children: c }, c, false, {
								fileName: _jsxFileName,
								lineNumber: 200,
								columnNumber: 79
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 199,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 197,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: POPULAR.map((id) => {
							const c = careers.find((x) => x.id === id) ?? CAREERS.find((x) => x.id === id);
							return c ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CareerCard, { career: c }, id, false, {
								fileName: _jsxFileName,
								lineNumber: 206,
								columnNumber: 24
							}, this) : null;
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 203,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 196,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "mx-auto max-w-7xl px-5 py-16",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "glass relative overflow-hidden p-10 text-center sm:p-14",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display text-3xl font-semibold sm:text-4xl",
							children: "Don't guess your future. Start exploring it."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 213,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/discover",
							className: btnClass("primary", "mt-8 h-12 px-6"),
							children: "Explore My Options"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 216,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 212,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 211,
					columnNumber: 9
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 120,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
				className: "mx-auto flex max-w-7xl flex-col gap-6 border-t border-glass-border px-5 py-10 md:flex-row md:items-center md:justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 224,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						"aria-label": "Footer",
						className: "flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/about",
								className: "hover:text-foreground",
								children: "About Futuroute"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 226,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/discover",
								className: "hover:text-foreground",
								children: "Discover Careers"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 229,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/compare",
								className: "hover:text-foreground",
								children: "Compare Careers"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 232,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/planner",
								className: "hover:text-foreground",
								children: "Budget Planner"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 235,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/about",
								hash: "privacy",
								className: "hover:text-foreground",
								children: "Privacy"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 238,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/about",
								hash: "contact",
								className: "hover:text-foreground",
								children: "Contact"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 241,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 225,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "University project · The NorthCap University"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 245,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 223,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 92,
		columnNumber: 10
	}, this);
}
//#endregion
export { Home as component };
