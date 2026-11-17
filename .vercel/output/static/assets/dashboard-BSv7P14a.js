import { l as __toESM, o as require_jsx_runtime, s as require_react } from "./useSelector-Cu7jxM-W.js";
import { n as toast } from "./dist-CnotZWgl.js";
import { I as Link, h as useUser, o as friendlyAuthError, s as isUserAdmin, u as resendVerificationEmail } from "./auth-ByhFdEgm.js";
import { d as ArrowLeftRight, i as UserCheck, s as LogIn, t as AppShell, u as Briefcase } from "./AppShell-BgEZmUVx.js";
import { i as INDUSTRIES, o as roadmapProgress, r as getCareer, s as useApp } from "./careers-Da7lFkNP.js";
import { c as Compass, n as seedAllCareersToFirestore, o as Map, r as useCareersCatalog, s as GitCompareArrows, t as saveSingleCareerToFirestore, u as createLucideIcon } from "./careers-service-REWdQftI.js";
import { t as ArrowRight } from "./arrow-right-Bzry0KKp.js";
import { n as RouteMap, r as SaveButton } from "./CareerParts-DpDkC956.js";
import { a as TrendingUp, i as computeCompatibility, o as IndianRupee, t as CompatibilityBadge } from "./CompatibilityCard-DgWWA-5m.js";
import { t as Plus } from "./plus-Vx67vOmi.js";
import { a as Glass, d as inputClass, f as selectClass, i as EmptyState, l as ProgressRing, n as Button, r as Chip, s as Notice, u as btnClass } from "./ui-kit-BDOPC8gw.js";
import { a as getCareerInsight, i as formatRangeFromInr, r as formatAmountFromInr } from "./career-insights-DY2zFBVx.js";
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Activity = createLucideIcon("activity", [["path", {
	d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
	key: "169zse"
}]]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Database = createLucideIcon("database", [
	["ellipse", {
		cx: "12",
		cy: "5",
		rx: "9",
		ry: "3",
		key: "msslwz"
	}],
	["path", {
		d: "M3 5V19A9 3 0 0 0 21 19V5",
		key: "1wlel7"
	}],
	["path", {
		d: "M3 12A9 3 0 0 0 21 12",
		key: "mv7ke4"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Gauge = createLucideIcon("gauge", [["path", {
	d: "m12 14 4-4",
	key: "9kzdfg"
}], ["path", {
	d: "M3.34 19a10 10 0 1 1 17.32 0",
	key: "19p75a"
}]]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShieldCheck = createLucideIcon("shield-check", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
//#endregion
//#region src/routes/dashboard.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ago = (t) => {
	const m = Math.round((Date.now() - t) / 6e4);
	return m < 1 ? "just now" : m < 60 ? `${m} min ago` : m < 1440 ? `${Math.round(m / 60)} h ago` : `${Math.round(m / 1440)} d ago`;
};
function AdminCatalogPanel({ totalCount, onUpdated }) {
	const [seeding, setSeeding] = (0, import_react.useState)(false);
	const [showAdd, setShowAdd] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [industry, setIndustry] = (0, import_react.useState)("Technology & IT");
	const [subcategory, setSubcategory] = (0, import_react.useState)("");
	const [shortDesc, setShortDesc] = (0, import_react.useState)("");
	const [skillsRaw, setSkillsRaw] = (0, import_react.useState)("");
	const handleSeedAll = async () => {
		setSeeding(true);
		try {
			const count = await seedAllCareersToFirestore();
			await onUpdated();
			toast.success(`Synced ${count} careers across 20 industries to Cloud Firestore`);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed to seed career catalog");
		} finally {
			setSeeding(false);
		}
	};
	const handleAddCareer = async (e) => {
		e.preventDefault();
		if (!name.trim() || !shortDesc.trim()) return;
		setSaving(true);
		const id = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
		const skills = skillsRaw.split(",").map((s) => s.trim()).filter(Boolean);
		const customCareer = {
			id,
			name: name.trim(),
			industry,
			subcategory: subcategory.trim() || industry,
			short: shortDesc.trim(),
			hue: "cyan",
			day: shortDesc.trim(),
			responsibilities: [
				`Deliver core ${subcategory.trim() || industry} outcomes`,
				"Collaborate with peers and domain mentors",
				"Review work quality and gather user or stakeholder feedback"
			],
			skills: skills.length ? skills : [
				"Problem-solving",
				"Communication",
				"Domain research"
			],
			capabilities: [
				"problem_solving",
				"communication",
				"analytical"
			],
			interests: ["technology"],
			subjects: ["English", "Mathematics"],
			pathways: ["Relevant undergraduate or diploma pathway", "Self-directed portfolio + verified open courses"],
			altRoutes: ["Skill portfolio, internships, and mentorship"],
			projects: [`Starter ${name.trim()} mini-case study`],
			commitment: "Consistent weekly practice builds foundational confidence.",
			commitmentLevel: 3,
			estimatedCostNote: "Can begin free online; optional exam or workshop fees vary.",
			progression: [
				`Junior ${name.trim()}`,
				name.trim(),
				`Senior ${name.trim()}`
			],
			freelanceOpportunity: "Independent consulting and project-based work available with portfolio experience.",
			entrepreneurshipOpportunity: "Strong potential to launch a specialist studio or service after industry experience.",
			entryLevelOpportunities: "Junior trainee, intern, and coordinator openings.",
			pros: ["Growing real-world applicability", "Clear starter skill path"],
			cons: ["Requires ongoing curiosity and practice", "Competition for top roles"],
			resources: [{
				name: "SWAYAM India",
				url: "https://swayam.gov.in/",
				cost: "Free",
				note: "National open MOOC curriculum across disciplines"
			}],
			trial: `Spend 20 minutes researching one real problem solved by a ${name.trim()} and outline a first step.`,
			challengeId: "software",
			emerging: true,
			environment: "Hybrid / collaborative",
			minEducation: "Class 12",
			budgetTier: 0,
			tags: [industry.toLowerCase(), ...skills.map((s) => s.toLowerCase())]
		};
		try {
			await saveSingleCareerToFirestore(customCareer);
			await onUpdated();
			toast.success(`Saved "${customCareer.name}" to Firestore /careers`);
			setName("");
			setSubcategory("");
			setShortDesc("");
			setSkillsRaw("");
			setShowAdd(false);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Couldn't save custom career");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
		className: "mb-6 border-cyan/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-9 place-items-center rounded-xl bg-cyan/15 text-cyan",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Admin Career Catalog Manager"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [totalCount, " careers active across 20 industries · Authorized admin access"]
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: handleSeedAll,
					disabled: seeding,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-4" }),
						" ",
						seeding ? "Syncing 260 careers…" : "Seed / Sync 260 Careers to Firestore"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "soft",
					onClick: () => setShowAdd(!showAdd),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
						" ",
						showAdd ? "Close form" : "Add / Update Career"
					]
				})]
			})]
		}), showAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleAddCareer,
			className: "mt-4 grid gap-3 border-t border-glass-border pt-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1 text-xs",
					children: ["Career Name *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "e.g. Drone Cinematographer",
						className: inputClass("h-10"),
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1 text-xs",
					children: ["Industry *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: industry,
						onChange: (e) => setIndustry(e.target.value),
						className: selectClass("h-10"),
						children: INDUSTRIES.map((ind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: ind,
							children: ind
						}, ind))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1 text-xs",
					children: ["Subcategory", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: subcategory,
						onChange: (e) => setSubcategory(e.target.value),
						placeholder: "e.g. Aerial Media",
						className: inputClass("h-10")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1 text-xs",
					children: ["Key Skills (comma-separated)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: skillsRaw,
						onChange: (e) => setSkillsRaw(e.target.value),
						placeholder: "e.g. Flight planning, Framing, Safety",
						className: inputClass("h-10")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1 text-xs sm:col-span-2",
					children: ["Short Description *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: shortDesc,
						onChange: (e) => setShortDesc(e.target.value),
						placeholder: "Clear 1-sentence summary of what the career does.",
						className: inputClass("h-10"),
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: saving,
						children: saving ? "Saving…" : "Save Career to Firestore"
					})
				})
			]
		})]
	});
}
function Dashboard() {
	const { user, loading, refreshUser } = useUser();
	const s = useApp();
	const { careers, refresh } = useCareersCatalog();
	if (!loading && !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		greeting: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
			className: "mx-auto max-w-2xl space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: "Sign in for your personal dashboard"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-text-2",
					children: "Sign in with Google or email to unlock your protected workspace — saved career folders, discovery reports, side-by-side comparisons, and multi-phase roadmaps synced to Cloud Firestore."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/auth",
						search: { next: "/dashboard" },
						className: btnClass("primary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4" }), " Sign in / Create account"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/discover",
						className: btnClass("outline"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-4" }), " Browse 260+ Careers as Guest"]
					})]
				})
			]
		})
	});
	const p = roadmapProgress(s.roadmap);
	const challenges = Object.values(s.challenges).filter((c) => c.answer);
	const reflections = Object.entries(s.challenges).filter(([, c]) => c.enjoy || c.reflection);
	const firstVisit = s.saved.length === 0 && !s.roadmap && challenges.length === 0 && s.comparedCount === 0 && !s.discovery && s.savedOpportunities.length === 0;
	const next = s.roadmap?.tasks.find((t) => !t.done);
	const roadCareer = s.roadmap ? getCareer(s.roadmap.careerId, careers) : void 0;
	const topMatches = (() => {
		const ids = /* @__PURE__ */ new Set([
			...s.discovery?.results ?? [],
			...s.saved,
			...roadCareer ? [roadCareer.id] : []
		]);
		const matched = Array.from(ids).map((id) => getCareer(id, careers)).filter((c) => Boolean(c));
		if (matched.length >= 3) return matched;
		const extras = careers.filter((c) => !ids.has(c.id)).slice(0, Math.max(6, 12 - matched.length));
		return [...matched, ...extras];
	})().map((career) => ({
		career,
		compat: computeCompatibility(career, s.profile, s.discovery?.answers)
	})).sort((a, b) => b.compat.score - a.compat.score).slice(0, 3);
	const avgCompatibility = topMatches.length > 0 ? Math.round(topMatches.reduce((acc, item) => acc + item.compat.score, 0) / topMatches.length) : 0;
	const appliedCount = s.savedOpportunities.filter((o) => o.status === "applied").length;
	const planningCount = s.savedOpportunities.filter((o) => o.status === "planning").length;
	const primaryFocusCareer = roadCareer ?? topMatches[0]?.career;
	const primaryInsight = primaryFocusCareer ? getCareerInsight(primaryFocusCareer) : void 0;
	const handleResend = async () => {
		try {
			await resendVerificationEmail();
			toast.success("Verification email sent");
		} catch (e) {
			toast.error(friendlyAuthError(e));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		greeting: true,
		children: [
			user && !user.emailVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "warn",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Please verify your email (",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: user.email
							}),
							") to enable Cloud Firestore saving across devices."
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "h-8 min-h-8 px-2.5 text-xs",
								onClick: handleResend,
								children: "Resend verification email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "soft",
								className: "h-8 min-h-8 px-2.5 text-xs",
								onClick: () => void refreshUser(),
								children: "I’ve verified — refresh"
							})]
						})]
					})
				})
			}),
			isUserAdmin(user) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCatalogPanel, {
				totalCount: careers.length,
				onUpdated: refresh
			}),
			firstVisit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glass, {
				className: "mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Welcome to Futuroute 👋"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-text-2",
						children: "Pick a starting point — complete your onboarding profile, run guided career discovery, or explore 260+ careers across 20 industries."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/onboarding",
								className: btnClass("primary"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-4" }), " Complete profile setup"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/discover",
								className: btnClass("outline"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-4" }), " Start career discovery"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/simulator",
								className: btnClass("outline"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, { className: "size-4" }), " Simulate career switch"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/opportunities",
								className: btnClass("outline"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-4" }), " Opportunity finder"]
							})
						]
					})]
				})
			}),
			s.profile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glass, {
				className: "mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-wider text-cyan",
								children: "Personalised Profile"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-xl font-semibold",
								children: [s.profile.displayName || user?.displayName || "Explorer", s.profile.educationLevel ? ` · ${s.profile.educationLevel}` : ""]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-text-2",
								children: [
									"Budget ₹",
									s.profile.budget.toLocaleString("en-IN"),
									" · ",
									s.profile.weeklyHours,
									" h/week",
									s.profile.environment ? ` · ${s.profile.environment}` : "",
									s.profile.preferredWorkLocation ? ` · ${s.profile.preferredWorkLocation}` : ""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5 pt-1",
								children: s.profile.interests.slice(0, 8).map((intId) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									className: "px-2.5 py-0.5 text-xs",
									children: intId
								}, intId))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/profile",
						className: btnClass("outline", "text-xs"),
						children: "Edit profile & preferences"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
						className: "flex flex-col justify-between p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-text-2",
								children: "Top Career Matches"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-9 place-items-center rounded-xl bg-accent text-lavender-bright",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-2",
							children: topMatches.map(({ career }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/careers/$id",
								params: { id: career.id },
								className: "flex items-center justify-between gap-2 rounded-xl border border-glass-border bg-secondary/60 px-3 py-2 text-xs transition hover:border-lavender/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate font-medium text-foreground",
									children: career.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompatibilityBadge, {
									career,
									profile: s.profile,
									fallbackAnswers: s.discovery?.answers
								})]
							}, career.id))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/discover",
							className: "mt-3 inline-flex items-center gap-1 text-xs text-cyan hover:underline",
							children: [
								s.discovery ? "Refine career discovery" : "Take full discovery questionnaire",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
						className: "flex flex-col justify-between p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-text-2",
									children: "Average Career Compatibility"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-9 place-items-center rounded-xl bg-accent text-cyan",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 font-display text-3xl font-semibold tabular-nums",
								children: [avgCompatibility, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [
									"Rule-based estimate across your top ",
									topMatches.length,
									" matches & profile fields."
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/profile",
								className: "text-cyan hover:underline",
								children: "Update profile inputs →"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/simulator",
								className: "text-lavender-bright hover:underline",
								children: "Simulate switch →"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
						className: "flex flex-col justify-between p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-text-2",
									children: "Active Career Roadmap"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-9 place-items-center rounded-xl bg-accent text-lavender-bright",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 truncate font-display text-xl font-semibold",
								children: s.roadmap ? roadCareer?.name || s.roadmap.title : "No roadmap active yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: s.roadmap ? `Phase ${p.phase} of 5 · ${s.roadmaps.length} roadmap${s.roadmaps.length === 1 ? "" : "s"} saved` : "Build a personalized 5-phase career path from any career or simulator."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/roadmap",
							className: "mt-3 inline-flex items-center gap-1 text-xs text-cyan hover:underline",
							children: [
								s.roadmap ? "Open 5-Phase Roadmap" : "Create roadmap",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
						className: "flex flex-col justify-between p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-text-2",
									children: "Learning Progress"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-9 place-items-center rounded-xl bg-accent text-turquoise",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 font-display text-3xl font-semibold tabular-nums",
								children: [p.pct, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: s.roadmap ? `${p.done} of ${p.total} milestones done · ${s.roadmap.hours} h/wk pace` : `${s.saved.length} careers saved · ${challenges.length}/8 challenges tried`
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: s.roadmap ? "/roadmap" : "/planner",
							className: "mt-3 inline-flex items-center gap-1 text-xs text-cyan hover:underline",
							children: [
								s.roadmap ? "Tick next milestone" : "Build budget-to-skill plan",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
						className: "flex flex-col justify-between p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-text-2",
									children: "Saved Opportunities"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-9 place-items-center rounded-xl bg-accent text-cyan",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-3xl font-semibold tabular-nums",
								children: s.savedOpportunities.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: s.savedOpportunities.length > 0 ? `${planningCount} planning · ${appliedCount} applied across verified portals` : "Browse internships, scholarships, free courses, and hackathons."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/opportunities",
							className: "mt-3 inline-flex items-center gap-1 text-xs text-cyan hover:underline",
							children: ["Explore Opportunity Finder ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
						className: "flex flex-col justify-between p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-text-2",
									children: "Financial Expectation Overview"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-9 place-items-center rounded-xl bg-accent text-lavender-bright",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-2xl font-semibold tabular-nums",
								children: s.profile?.expectedStartingSalaryInr ? `${formatAmountFromInr(s.profile.expectedStartingSalaryInr, "INR")} target` : primaryInsight ? formatRangeFromInr(primaryInsight.indiaEntryInr, "INR") : "Set goal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: primaryFocusCareer && primaryInsight ? `${primaryFocusCareer.name} India entry benchmark: ${formatRangeFromInr(primaryInsight.indiaEntryInr, "INR")} · Edu ~₹${Math.round(primaryInsight.educationCostInr[0] / 1e3)}k–₹${Math.round(primaryInsight.educationCostInr[1] / 1e3)}k` : "Add optional starting salary expectations in Profile to compare against career bands."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/profile",
								className: "text-cyan hover:underline",
								children: "Set financial goal →"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/compare",
								className: "text-lavender-bright hover:underline",
								children: "Compare salaries →"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-semibold",
							children: "My Career Exploration"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Interactive route map anchored to your saved shortlist."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/compare",
							className: btnClass("soft"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCompareArrows, { className: "size-4" }), " Compare careers"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteMap, { className: "mt-4 max-h-[340px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-turquoise" }), " Saved"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-cyan" }), " Recently explored"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-lavender" }), " Suggested next"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-medium text-text-2",
								children: "Saved career shortlist"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/saved",
								className: "text-xs text-cyan hover:underline",
								children: "Manage folders →"
							})]
						}), s.saved.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Nothing saved yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2",
							children: s.saved.slice(0, 6).map((id) => {
								const c = getCareer(id, careers);
								return c && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "glass-soft flex items-center justify-between gap-2 px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/careers/$id",
										params: { id },
										className: "truncate text-sm hover:text-lavender-bright",
										children: c.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {
										career: c,
										compact: true
									})]
								}, id);
							})
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 text-sm font-medium text-text-2",
							children: "Recently explored"
						}), s.recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Open a career profile to see it here."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: s.recent.map((id) => {
								const c = getCareer(id, careers);
								return c && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/careers/$id",
									params: { id },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: c.name })
								}, id);
							})
						})] })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "My Active Roadmap"
					}), s.roadmap ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRing, { value: p.pct }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: roadCareer?.name || s.roadmap.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-text-2",
										children: ["Current phase: ", p.phase]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-success",
										children: [p.done, " completed"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted-foreground",
										children: [p.total - p.done, " remaining"]
									})
								]
							})]
						}),
						next && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-sm text-text-2",
							children: ["Next: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: next.title
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/roadmap",
							className: btnClass("primary", "mt-4 w-full"),
							children: ["Continue Roadmap ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "size-5" }),
							title: "No roadmap yet",
							text: "Create a budget-aware plan and turn it into tasks you can tick off.",
							action: {
								label: "Create a plan",
								to: "/planner"
							}
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Recent activity"
					}), s.activity.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-5" }),
							title: "Your journey starts here",
							text: "Save a career, try a challenge, or tick off a roadmap milestone — it'll appear here."
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: s.activity.slice(0, 6).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-start gap-2 text-text-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan" }), a.text]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-xs text-muted-foreground",
								children: ago(a.at)
							})]
						}, a.id))
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Challenge reflections"
				}), reflections.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Complete a mini-challenge and share how it felt."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: reflections.map(([id, c]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "glass-soft px-3 py-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium capitalize",
								children: id
							}),
							c.enjoy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-xs text-cyan",
								children: {
									enjoyed: "Enjoyed it",
									okay: "It was okay",
									not: "Not for me"
								}[c.enjoy]
							}),
							c.reflection && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-text-2",
								children: [
									"“",
									c.reflection,
									"”"
								]
							})
						]
					}, id))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Continue where you left off"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-col gap-2",
					children: [
						next && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/roadmap",
							className: btnClass("outline", "justify-between"),
							children: [
								"Roadmap: ",
								next.title,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
							]
						}),
						s.compare.length >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/compare",
							className: btnClass("outline", "justify-between"),
							children: [
								"Comparison shortlist:",
								" ",
								s.compare.map((id) => getCareer(id, careers)?.name).filter(Boolean).join(" vs "),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
							]
						}),
						s.discovery ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/discover",
							className: btnClass("outline", "justify-between"),
							children: ["View your latest discovery report", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/discover",
							className: btnClass("outline", "justify-between"),
							children: ["Start guided career discovery", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					]
				})] })]
			})
		]
	});
}
//#endregion
export { Dashboard as component };
