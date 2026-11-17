import { l as __toESM, n as useRouter, o as require_jsx_runtime, s as require_react, t as useSelector } from "./useSelector-Cu7jxM-W.js";
import { i as useStructuralSharing, n as toast } from "./dist-CnotZWgl.js";
import { I as Link, L as useNavigate, c as logoutUser, h as useUser } from "./auth-ByhFdEgm.js";
import { s as useApp } from "./careers-Da7lFkNP.js";
import { a as Menu, c as Compass, i as X, l as Bookmark, o as Map, r as useCareersCatalog, s as GitCompareArrows, u as createLucideIcon } from "./careers-service-REWdQftI.js";
import { m as cn, o as Logo, u as btnClass } from "./ui-kit-BDOPC8gw.js";
//#region node_modules/@tanstack/react-router/dist/esm/useRouterState.js
/**
* Subscribe to the router's state store with optional selection and
* structural sharing for render optimization.
*
* Options:
* - `select`: Project the full router state to a derived slice
* - `structuralSharing`: Replace-equal semantics for stable references
* - `router`: Read state from a specific router instance instead of context
*
* @returns The selected router state (or the full state by default).
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useRouterStateHook
*/
function useRouterState(opts) {
	const contextRouter = useRouter({ warn: opts?.router === void 0 });
	const router = opts?.router || contextRouter;
	return useSelector(router.stores.__store, useStructuralSharing(opts, router));
}
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowLeftRight = createLucideIcon("arrow-left-right", [
	["path", {
		d: "M8 3 4 7l4 4",
		key: "9rb6wj"
	}],
	["path", {
		d: "M4 7h16",
		key: "6tx8e3"
	}],
	["path", {
		d: "m16 21 4-4-4-4",
		key: "siv7j2"
	}],
	["path", {
		d: "M20 17H4",
		key: "h6l3hr"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Bell = createLucideIcon("bell", [["path", {
	d: "M10.268 21a2 2 0 0 0 3.464 0",
	key: "vwvbt9"
}], ["path", {
	d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
	key: "11g9vi"
}]]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Briefcase = createLucideIcon("briefcase", [["path", {
	d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
	key: "jecpp"
}], ["rect", {
	width: "20",
	height: "14",
	x: "2",
	y: "6",
	rx: "2",
	key: "i6l2r4"
}]]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FlaskConical = createLucideIcon("flask-conical", [
	["path", {
		d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
		key: "18mbvz"
	}],
	["path", {
		d: "M6.453 15h11.094",
		key: "3shlmq"
	}],
	["path", {
		d: "M8.5 2h7",
		key: "csnxdl"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Info = createLucideIcon("info", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 16v-4",
		key: "1dtifu"
	}],
	["path", {
		d: "M12 8h.01",
		key: "e9boi3"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LayoutGrid = createLucideIcon("layout-grid", [
	["rect", {
		width: "7",
		height: "7",
		x: "3",
		y: "3",
		rx: "1",
		key: "1g98yp"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "14",
		y: "3",
		rx: "1",
		key: "6d4xhi"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "14",
		y: "14",
		rx: "1",
		key: "nxv5o0"
	}],
	["rect", {
		width: "7",
		height: "7",
		x: "3",
		y: "14",
		rx: "1",
		key: "1bb6yr"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LogIn = createLucideIcon("log-in", [
	["path", {
		d: "m10 17 5-5-5-5",
		key: "1bsop3"
	}],
	["path", {
		d: "M15 12H3",
		key: "6jk70r"
	}],
	["path", {
		d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",
		key: "u53s6r"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LogOut = createLucideIcon("log-out", [
	["path", {
		d: "m16 17 5-5-5-5",
		key: "1bji2h"
	}],
	["path", {
		d: "M21 12H9",
		key: "dn1m92"
	}],
	["path", {
		d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
		key: "1uf3rs"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Search = createLucideIcon("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Settings = createLucideIcon("settings", [["path", {
	d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
	key: "1i5ecw"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var UserCheck = createLucideIcon("user-check", [
	["path", {
		d: "m16 11 2 2 4-4",
		key: "9rsbq5"
	}],
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var User = createLucideIcon("user", [["path", {
	d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
	key: "975kel"
}], ["circle", {
	cx: "12",
	cy: "7",
	r: "4",
	key: "17ys0d"
}]]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Wallet = createLucideIcon("wallet", [["path", {
	d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
	key: "18etb6"
}], ["path", {
	d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",
	key: "xoc0q4"
}]]);
//#endregion
//#region src/components/AppShell.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Main",
		className: "flex flex-1 flex-col gap-1",
		children: NAV.map(({ to, label, icon: Icon }) => {
			const active = path === to || to !== "/dashboard" && path.startsWith(to);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to,
				onClick: onNavigate,
				className: cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition", active ? "border border-lavender/40 bg-lavender/20 text-foreground glow" : "border border-transparent text-text-2 hover:bg-secondary hover:text-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: cn("size-4", active && "text-lavender-bright"),
					"aria-hidden": true
				}), label]
			}, to);
		})
	});
}
function AccountCard({ onNavigate }) {
	const { user, loading } = useUser();
	const { profile } = useApp();
	const nav = useNavigate();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "glass-soft p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: "Checking session…"
		})
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-soft space-y-3 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium",
			children: "Guest explorer"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted-foreground",
			children: "Browse 260+ careers freely. Sign in to save folders, comparisons, and roadmaps."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/auth",
			onClick: onNavigate,
			className: btnClass("soft", "w-full text-xs"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-3.5" }), " Sign in / Register"]
		})]
	});
	const name = profile?.displayName || user.displayName || user.email?.split("@")[0] || "Explorer";
	const handleSignOut = async () => {
		await logoutUser();
		toast.success("Signed out");
		onNavigate?.();
		nav({ to: "/" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-soft space-y-2.5 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-medium",
						children: name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs text-muted-foreground",
						children: user.email
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, {
					className: "size-4 shrink-0 text-turquoise",
					"aria-hidden": true
				})]
			}),
			!user.emailVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/auth",
				onClick: onNavigate,
				className: "block rounded-lg border border-warning/30 bg-warning/10 px-2.5 py-1.5 text-[11px] text-warning hover:bg-warning/20",
				children: "Verify email to sync cloud data"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/profile",
					onClick: onNavigate,
					className: btnClass("outline", "h-8 min-h-8 flex-1 px-2 text-xs"),
					children: "Profile"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: handleSignOut,
					className: btnClass("ghost", "h-8 min-h-8 px-2 text-xs"),
					"aria-label": "Sign out",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-3.5" })
				})]
			})
		]
	});
}
function SearchBox() {
	const [q, setQ] = (0, import_react.useState)("");
	const nav = useNavigate();
	const { careers } = useCareersCatalog();
	const trimmed = q.trim().toLowerCase();
	const hits = trimmed.length < 2 ? [] : careers.filter((c) => `${c.name} ${c.industry} ${c.subcategory} ${c.skills.join(" ")}`.toLowerCase().includes(trimmed)).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full max-w-xs",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "global-search",
				className: "sr-only",
				children: "Search 260+ careers and skills"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "global-search",
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search 260+ careers & skills",
				className: "h-10 w-full rounded-xl border border-glass-border bg-popover pl-9 pr-3 text-sm text-foreground placeholder:text-text-2/80 focus-visible:border-cyan focus-visible:outline-none"
			}),
			trimmed.length >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute z-30 mt-2 w-full rounded-xl border border-glass-border bg-popover p-1.5 text-popover-foreground shadow-2xl",
				children: hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-3 py-2 text-sm text-text-2",
					children: "No matches"
				}) : hits.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "block w-full rounded-lg px-3 py-2 text-left text-sm text-popover-foreground transition hover:bg-lavender/20 focus-visible:bg-lavender/25",
					onClick: () => {
						setQ("");
						nav({
							to: "/careers/$id",
							params: { id: c.id }
						});
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: c.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block text-xs text-text-2",
						children: [
							c.industry,
							" · ",
							c.skills.slice(0, 2).join(", ")
						]
					})]
				}, c.id))
			})
		]
	});
}
function Activity() {
	const s = useApp();
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-label": "Recent activity",
			"aria-expanded": open,
			onClick: () => setOpen(!open),
			className: "relative grid size-10 place-items-center rounded-xl border border-glass-border bg-secondary hover:bg-accent",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), s.activity.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-2 top-2 size-2 rounded-full bg-cyan" })]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute right-0 z-30 mt-2 w-72 rounded-xl border border-glass-border bg-popover p-2 shadow-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-2 py-1 text-xs uppercase tracking-wider text-muted-foreground",
				children: "Your recent activity"
			}), s.activity.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-2 py-3 text-sm text-text-2",
				children: "Nothing yet — start exploring."
			}) : s.activity.slice(0, 6).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg px-2 py-2 text-sm text-text-2",
				children: a.text
			}, a.id))]
		})]
	});
}
function AppShell({ children, greeting }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { user } = useUser();
	const { profile } = useApp();
	const firstName = profile?.displayName?.split(" ")[0] || user?.displayName?.split(" ")[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ambient flex min-h-screen w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "glass sticky top-4 m-4 hidden h-[calc(100vh-2rem)] w-64 shrink-0 flex-col gap-6 overflow-y-auto p-4 lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "px-2 pt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNav, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountCard, {})
				]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-40 lg:hidden",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Navigation",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Close menu",
					className: "absolute inset-0 bg-background/70",
					onClick: () => setOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass relative m-3 flex h-[calc(100vh-1.5rem)] w-72 flex-col gap-6 overflow-y-auto p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Close menu",
								onClick: () => setOpen(false),
								className: "grid size-9 place-items-center rounded-lg hover:bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNav, { onNavigate: () => setOpen(false) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountCard, { onNavigate: () => setOpen(false) })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col px-4 pb-10 lg:pl-0 lg:pr-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex flex-wrap items-center gap-3 py-4 lg:py-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Open menu",
								onClick: () => setOpen(true),
								className: "grid size-10 place-items-center rounded-xl border border-glass-border bg-secondary lg:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "lg:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 28 })
							}),
							greeting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "order-last w-full md:order-none md:w-auto md:flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-2xl font-semibold sm:text-3xl",
									children: firstName ? `Good to see you, ${firstName}. Ready to explore your future?` : "Good to see you. Ready to explore your future?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-text-2",
									children: "Your next step starts with understanding your options."
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden flex-1 md:block" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-auto flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "hidden sm:block",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/settings",
										"aria-label": "Settings",
										className: "grid size-10 place-items-center rounded-xl border border-glass-border bg-secondary hover:bg-accent",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/discover",
										className: btnClass("primary", "hidden md:inline-flex"),
										children: "Start Exploring"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 sm:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						id: "main",
						className: "min-w-0 flex-1",
						children
					})
				]
			})
		]
	});
}
//#endregion
export { Search as a, Info as c, ArrowLeftRight as d, UserCheck as i, FlaskConical as l, Wallet as n, LogOut as o, User as r, LogIn as s, AppShell as t, Briefcase as u };
