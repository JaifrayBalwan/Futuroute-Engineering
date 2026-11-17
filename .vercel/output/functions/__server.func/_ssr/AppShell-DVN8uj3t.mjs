import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { S as useNavigate, m as useRouterState, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { d as cn, o as Logo, u as btnClass } from "./ui-kit-BmqGm62i.mjs";
import { b as useUser, p as logoutUser } from "./auth-Bjd81y0G.mjs";
import { s as useApp } from "./careers-ChJ9jiL5.mjs";
import { r as useCareersCatalog } from "./careers-service-BdvVUi83.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as LogOut, D as Info, E as LayoutGrid, F as FlaskConical, K as Briefcase, X as Bell, b as Map, d as Search, et as ArrowLeftRight, i as UserCheck, j as GitCompareArrows, n as Wallet, q as Bookmark, r as User, t as X, u as Settings, w as LogIn, y as Menu, z as Compass } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-DVN8uj3t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/AppShell.tsx";
var NAV = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutGrid
	},
	{
		to: "/discover",
		label: "Discover Careers",
		icon: Compass
	},
	{
		to: "/compare",
		label: "Compare Futures",
		icon: GitCompareArrows
	},
	{
		to: "/roadmap",
		label: "My Career Roadmap",
		icon: Map
	},
	{
		to: "/simulator",
		label: "Career Change Simulator",
		icon: ArrowLeftRight
	},
	{
		to: "/opportunities",
		label: "Opportunity Finder",
		icon: Briefcase
	},
	{
		to: "/planner",
		label: "Budget Planner",
		icon: Wallet
	},
	{
		to: "/saved",
		label: "Saved Careers",
		icon: Bookmark
	},
	{
		to: "/try",
		label: "Try Challenges",
		icon: FlaskConical
	},
	{
		to: "/profile",
		label: "My Profile",
		icon: User
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	},
	{
		to: "/about",
		label: "About Futuroute",
		icon: Info
	}
];
function SideNav({ onNavigate }) {
	const path = useRouterState({ select: (r) => r.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
		"aria-label": "Main",
		className: "flex flex-1 flex-col gap-1",
		children: NAV.map(({ to, label, icon: Icon }) => {
			const active = path === to || to !== "/dashboard" && path.startsWith(to);
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to,
				onClick: onNavigate,
				className: cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition", active ? "border border-lavender/40 bg-lavender/20 text-foreground glow" : "border border-transparent text-text-2 hover:bg-secondary hover:text-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, {
					className: cn("size-4", active && "text-lavender-bright"),
					"aria-hidden": true
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 64,
					columnNumber: 13
				}, this), label]
			}, to, true, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 11
			}, this);
		})
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 49,
		columnNumber: 5
	}, this);
}
function AccountCard({ onNavigate }) {
	const { user, loading } = useUser();
	const { profile } = useApp();
	const nav = useNavigate();
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "glass-soft p-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-xs text-muted-foreground",
			children: "Checking session…"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 81,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 80,
		columnNumber: 7
	}, this);
	if (!user) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "glass-soft space-y-3 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-sm font-medium",
			children: "Guest explorer"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 90,
			columnNumber: 11
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "mt-1 text-xs text-muted-foreground",
			children: "Browse 260+ careers freely. Sign in to save folders, comparisons, and roadmaps."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 91,
			columnNumber: 11
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 89,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/auth",
			onClick: onNavigate,
			className: btnClass("soft", "w-full text-xs"),
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogIn, { className: "size-3.5" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 96,
				columnNumber: 11
			}, this), " Sign in / Register"]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 95,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 88,
		columnNumber: 7
	}, this);
	const name = profile?.displayName || user.displayName || user.email?.split("@")[0] || "Explorer";
	const handleSignOut = async () => {
		await logoutUser();
		toast.success("Signed out");
		onNavigate?.();
		nav({ to: "/" });
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "glass-soft space-y-2.5 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "truncate text-sm font-medium",
						children: name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 114,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "truncate text-xs text-muted-foreground",
						children: user.email
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 115,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 113,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserCheck, {
					className: "size-4 shrink-0 text-turquoise",
					"aria-hidden": true
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 117,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 112,
				columnNumber: 7
			}, this),
			!user.emailVerified && /* @__PURE__ */ (void 0)(Link, {
				to: "/auth",
				onClick: onNavigate,
				className: "block rounded-lg border border-warning/30 bg-warning/10 px-2.5 py-1.5 text-[11px] text-warning hover:bg-warning/20",
				children: "Verify email to sync cloud data"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 120,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex gap-2 pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/profile",
					onClick: onNavigate,
					className: btnClass("outline", "h-8 min-h-8 flex-1 px-2 text-xs"),
					children: "Profile"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 129,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: handleSignOut,
					className: btnClass("ghost", "h-8 min-h-8 px-2 text-xs"),
					"aria-label": "Sign out",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 142,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 136,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 128,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 111,
		columnNumber: 5
	}, this);
}
function SearchBox() {
	const [q, setQ] = (0, import_react.useState)("");
	const nav = useNavigate();
	const { careers } = useCareersCatalog();
	const trimmed = q.trim().toLowerCase();
	const hits = trimmed.length < 2 ? [] : careers.filter((c) => `${c.name} ${c.industry} ${c.subcategory} ${c.skills.join(" ")}`.toLowerCase().includes(trimmed)).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative w-full max-w-xs",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
				htmlFor: "global-search",
				className: "sr-only",
				children: "Search 260+ careers and skills"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 167,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, {
				className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
				"aria-hidden": true
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 170,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
				id: "global-search",
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search 260+ careers & skills",
				className: "h-10 w-full rounded-xl border border-glass-border bg-popover pl-9 pr-3 text-sm text-foreground placeholder:text-text-2/80 focus-visible:border-cyan focus-visible:outline-none"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 174,
				columnNumber: 7
			}, this),
			trimmed.length >= 2 && /* @__PURE__ */ (void 0)("div", {
				className: "absolute z-30 mt-2 w-full rounded-xl border border-glass-border bg-popover p-1.5 text-popover-foreground shadow-2xl",
				children: hits.length === 0 ? /* @__PURE__ */ (void 0)("p", {
					className: "px-3 py-2 text-sm text-text-2",
					children: "No matches"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 184,
					columnNumber: 13
				}, this) : hits.map((c) => /* @__PURE__ */ (void 0)("button", {
					type: "button",
					className: "block w-full rounded-lg px-3 py-2 text-left text-sm text-popover-foreground transition hover:bg-lavender/20 focus-visible:bg-lavender/25",
					onClick: () => {
						setQ("");
						nav({
							to: "/careers/$id",
							params: { id: c.id }
						});
					},
					children: [/* @__PURE__ */ (void 0)("span", {
						className: "font-medium text-foreground",
						children: c.name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 196,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("span", {
						className: "block text-xs text-text-2",
						children: [
							c.industry,
							" · ",
							c.skills.slice(0, 2).join(", ")
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 197,
						columnNumber: 17
					}, this)]
				}, c.id, true, {
					fileName: _jsxFileName,
					lineNumber: 187,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 182,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 166,
		columnNumber: 5
	}, this);
}
function Activity$1() {
	const s = useApp();
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
			type: "button",
			"aria-label": "Recent activity",
			"aria-expanded": open,
			onClick: () => setOpen(!open),
			className: "relative grid size-10 place-items-center rounded-xl border border-glass-border bg-secondary hover:bg-accent",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "size-4" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 221,
				columnNumber: 9
			}, this), s.activity.length > 0 && /* @__PURE__ */ (void 0)("span", { className: "absolute right-2 top-2 size-2 rounded-full bg-cyan" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 223,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 214,
			columnNumber: 7
		}, this), open && /* @__PURE__ */ (void 0)("div", {
			className: "absolute right-0 z-30 mt-2 w-72 rounded-xl border border-glass-border bg-popover p-2 shadow-xl",
			children: [/* @__PURE__ */ (void 0)("p", {
				className: "px-2 py-1 text-xs uppercase tracking-wider text-muted-foreground",
				children: "Your recent activity"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 228,
				columnNumber: 11
			}, this), s.activity.length === 0 ? /* @__PURE__ */ (void 0)("p", {
				className: "px-2 py-3 text-sm text-text-2",
				children: "Nothing yet — start exploring."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 232,
				columnNumber: 13
			}, this) : s.activity.slice(0, 6).map((a) => /* @__PURE__ */ (void 0)("p", {
				className: "rounded-lg px-2 py-2 text-sm text-text-2",
				children: a.text
			}, a.id, false, {
				fileName: _jsxFileName,
				lineNumber: 235,
				columnNumber: 15
			}, this))]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 227,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 213,
		columnNumber: 5
	}, this);
}
function AppShell({ children, greeting }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { user } = useUser();
	const { profile } = useApp();
	const firstName = profile?.displayName?.split(" ")[0] || user?.displayName?.split(" ")[0];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "ambient flex min-h-screen w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				className: "glass sticky top-4 m-4 hidden h-[calc(100vh-2rem)] w-64 shrink-0 flex-col gap-6 overflow-y-auto p-4 lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "px-2 pt-1",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 256,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 255,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SideNav, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 258,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccountCard, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 259,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 254,
				columnNumber: 7
			}, this),
			open && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-40 lg:hidden",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Navigation",
				children: [/* @__PURE__ */ (void 0)("button", {
					type: "button",
					"aria-label": "Close menu",
					className: "absolute inset-0 bg-background/70",
					onClick: () => setOpen(false)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 269,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "glass relative m-3 flex h-[calc(100vh-1.5rem)] w-72 flex-col gap-6 overflow-y-auto p-4",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)(Logo, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 277,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								"aria-label": "Close menu",
								onClick: () => setOpen(false),
								className: "grid size-9 place-items-center rounded-lg hover:bg-secondary",
								children: /* @__PURE__ */ (void 0)(X, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 284,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 278,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 276,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(SideNav, { onNavigate: () => setOpen(false) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 287,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(AccountCard, { onNavigate: () => setOpen(false) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 288,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 275,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 263,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex min-w-0 flex-1 flex-col px-4 pb-10 lg:pl-0 lg:pr-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
						className: "flex flex-wrap items-center gap-3 py-4 lg:py-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								"aria-label": "Open menu",
								onClick: () => setOpen(true),
								className: "grid size-10 place-items-center rounded-xl border border-glass-border bg-secondary lg:hidden",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 301,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 295,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/",
								className: "lg:hidden",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, { size: 28 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 304,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 303,
								columnNumber: 11
							}, this),
							greeting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "order-last w-full md:order-none md:w-auto md:flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
									className: "font-display text-2xl font-semibold sm:text-3xl",
									children: firstName ? `Good to see you, ${firstName}. Ready to explore your future?` : "Good to see you. Ready to explore your future?"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 308,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-text-2",
									children: "Your next step starts with understanding your options."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 313,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 307,
								columnNumber: 13
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "hidden flex-1 md:block" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 318,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "ml-auto flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "hidden sm:block",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SearchBox, {}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 322,
											columnNumber: 15
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 321,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Activity$1, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 324,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/settings",
										"aria-label": "Settings",
										className: "grid size-10 place-items-center rounded-xl border border-glass-border bg-secondary hover:bg-accent",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Settings, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 330,
											columnNumber: 15
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 325,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/discover",
										className: btnClass("primary", "hidden md:inline-flex"),
										children: "Start Exploring"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 332,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 320,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 294,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mb-4 sm:hidden",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SearchBox, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 338,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 337,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
						id: "main",
						className: "min-w-0 flex-1",
						children
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 340,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 293,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 253,
		columnNumber: 5
	}, this);
}
//#endregion
export { AppShell as t };
