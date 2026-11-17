import { l as __toESM, o as require_jsx_runtime, s as require_react } from "./useSelector-Cu7jxM-W.js";
import { I as Link, h as useUser } from "./auth-ByhFdEgm.js";
import { t as CAREERS } from "./careers-Da7lFkNP.js";
import { a as Menu, c as Compass, i as X, o as Map, r as useCareersCatalog, s as GitCompareArrows } from "./careers-service-REWdQftI.js";
import { t as ArrowRight } from "./arrow-right-Bzry0KKp.js";
import { t as CareerCard } from "./CareerParts-DpDkC956.js";
import { l as ProgressRing, o as Logo, r as Chip, u as btnClass } from "./ui-kit-BDOPC8gw.js";
//#region src/routes/index.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative aspect-[5/4] w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 100 100",
				preserveAspectRatio: "none",
				className: "absolute inset-0 h-full w-full",
				"aria-hidden": true,
				children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: `M22,50 C${(22 + i.x) / 2},50 ${(22 + i.x) / 2},${i.y} ${i.x},${i.y}`,
					fill: "none",
					vectorEffect: "non-scaling-stroke",
					stroke: hover === i.id ? "var(--cyan)" : "var(--lavender)",
					strokeWidth: hover === i.id ? 2.5 : 1.3,
					opacity: "0.8",
					className: "route-dash"
				}, i.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass absolute left-[22%] top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-3 text-center glow",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Start here"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display font-semibold",
					children: "Your Interests"
				})]
			}),
			items.map((i, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-medium",
					children: i.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 inline-block rounded-full bg-cyan/15 px-2 py-0.5 text-[11px] text-cyan",
					children: i.skill
				})]
			}, i.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass absolute left-[2%] top-[6%] hidden items-center gap-3 p-3 sm:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRing, {
					value: 40,
					size: 48,
					stroke: 5,
					label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px]",
						children: "40%"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "Personalised roadmap"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "260+ careers · 20 industries"
					})]
				})]
			})
		]
	});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ambient min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-7xl items-center justify-between px-5 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Main",
						className: "hidden items-center gap-1 md:flex",
						children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							className: btnClass("ghost"),
							children: l.label
						}, l.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: ctaTo,
							className: btnClass("primary", "hidden sm:inline-flex"),
							children: ctaLabel
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-10 place-items-center rounded-xl border border-glass-border md:hidden",
							"aria-label": menu ? "Close menu" : "Open menu",
							"aria-expanded": menu,
							onClick: () => setMenu(!menu),
							children: menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
						})]
					})
				]
			}),
			menu && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Mobile",
				className: "glass mx-5 mb-4 flex flex-col p-2 md:hidden",
				children: [links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: l.to,
					className: btnClass("ghost", "justify-start"),
					children: l.label
				}, l.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: ctaTo,
					className: btnClass("primary", "mt-2"),
					children: ctaLabel
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-8 lg:grid-cols-2 lg:pt-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-4 text-sm text-cyan",
							children: "Explore possibilities. Test your potential. Plan your future."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-4xl font-semibold leading-[1.05] sm:text-6xl",
							children: ["Your Future Isn't ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient",
								children: "One-Size-Fits-All."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-lg text-text-2",
							children: "Explore 260+ career paths across 20 industries, compare what they really involve, and build a learning plan that fits your time, strengths and budget."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/discover",
								className: btnClass("primary", "h-12 px-6"),
								children: ["Discover My Path ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/compare",
								className: btnClass("outline", "h-12 px-6"),
								children: "Compare Careers"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-sm text-muted-foreground",
							children: "Browse 260+ careers freely as a visitor, or sign in to save your assessments and roadmaps."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroArt, {})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-7xl px-5 py-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-semibold",
							children: "Feeling unsure about your future?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-2xl text-text-2",
							children: "Many students have several interests and don't know what different careers actually involve day to day. Futuroute gives you a calm space to explore before you commit."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
							].map(({ icon: I, t, d, to }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to,
								className: "glass block p-6 transition hover:border-lavender/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(I, {
										className: "size-6 text-lavender-bright",
										"aria-hidden": true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-4 font-display text-xl font-semibold",
										children: t
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-text-2",
										children: d
									})
								]
							}, t))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-7xl px-5 py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-semibold",
						children: "How Futuroute works"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-8 grid gap-4 md:grid-cols-3",
						children: [
							"Tell us about your interests, capabilities, and goals.",
							"Explore, compare and test career possibilities.",
							"Build and track a realistic learning roadmap."
						].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "glass-soft flex gap-4 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 shrink-0 place-items-center rounded-full bg-brand font-display font-semibold text-primary-foreground",
								children: i + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "pt-2 text-text-2",
								children: s
							})]
						}, s))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-7xl px-5 py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-semibold",
							children: "Explore popular careers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								"Logic",
								"Sports + Analytics",
								"Design",
								"Security"
							].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: c }, c))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: POPULAR.map((id) => {
							const c = careers.find((x) => x.id === id) ?? CAREERS.find((x) => x.id === id);
							return c ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareerCard, { career: c }, id) : null;
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mx-auto max-w-7xl px-5 py-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass relative overflow-hidden p-10 text-center sm:p-14",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-semibold sm:text-4xl",
							children: "Don't guess your future. Start exploring it."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/discover",
							className: btnClass("primary", "mt-8 h-12 px-6"),
							children: "Explore My Options"
						})]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mx-auto flex max-w-7xl flex-col gap-6 border-t border-glass-border px-5 py-10 md:flex-row md:items-center md:justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Footer",
						className: "flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								className: "hover:text-foreground",
								children: "About Futuroute"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/discover",
								className: "hover:text-foreground",
								children: "Discover Careers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/compare",
								className: "hover:text-foreground",
								children: "Compare Careers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/planner",
								className: "hover:text-foreground",
								children: "Budget Planner"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								hash: "privacy",
								className: "hover:text-foreground",
								children: "Privacy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								hash: "contact",
								className: "hover:text-foreground",
								children: "Contact"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "University project · The NorthCap University"
					})
				]
			})
		]
	});
}
//#endregion
export { Home as component };
