import { l as __toESM, o as require_jsx_runtime, s as require_react } from "./useSelector-Cu7jxM-W.js";
import { n as toast } from "./dist-CnotZWgl.js";
import { n as notFound } from "./not-found-8nHLrNYc.js";
import { I as Link, L as useNavigate } from "./auth-ByhFdEgm.js";
import { d as ArrowLeftRight, l as FlaskConical, n as Wallet, t as AppShell, u as Briefcase } from "./AppShell-BgEZmUVx.js";
import { a as actions, r as getCareer, s as useApp } from "./careers-Da7lFkNP.js";
import { t as Route } from "./index-DW2YTfhy.js";
import { o as Map, r as useCareersCatalog, s as GitCompareArrows } from "./careers-service-REWdQftI.js";
import { r as SaveButton } from "./CareerParts-DpDkC956.js";
import { a as TrendingUp, n as CompatibilityCard, r as FinancialOutlookPanel } from "./CompatibilityCard-DgWWA-5m.js";
import { t as ExternalLink } from "./external-link-_z19ceB5.js";
import { t as Sparkles } from "./sparkles-WxdkWloa.js";
import { a as Glass, c as PageHeader, r as Chip, t as Bar, u as btnClass } from "./ui-kit-BDOPC8gw.js";
import { r as buildRoadmap } from "./engine-CZvW0XUP.js";
//#region src/routes/careers.$id.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function List({ title, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "mb-2 text-sm font-medium text-cyan",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-1.5 text-sm text-text-2",
		children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1 shrink-0 rounded-full bg-lavender" }), i]
		}, i))
	})] });
}
function CareerPage() {
	const { id } = Route.useParams();
	const { careers, loading } = useCareersCatalog();
	const c = getCareer(id, careers);
	const { compare, profile, discovery } = useApp();
	const nav = useNavigate();
	(0, import_react.useEffect)(() => {
		if (c) actions.visit(id);
	}, [id, c]);
	if (!c) {
		if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glass, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-text-2",
			children: "Loading career details…"
		}) }) });
		throw notFound();
	}
	const addCompare = () => {
		const next = compare.includes(id) ? compare : [...compare.filter((x) => x !== id), id].slice(-3);
		actions.setCompare(next);
		nav({ to: "/compare" });
	};
	const handleGenerateRoadmap = async () => {
		const rm = buildRoadmap({
			careerId: c.id,
			level: profile?.currentSkills?.length ? "some" : "beginner",
			budget: profile?.budget ?? 0,
			hours: profile?.weeklyHours ?? 6,
			device: "laptop",
			format: "mixed",
			outcome: "portfolio",
			currentSkills: profile?.currentSkills
		}, careers);
		await actions.addRoadmap(rm, c.name);
		toast.success(`Created 5-phase ${c.name} roadmap`);
		nav({ to: "/roadmap" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: `${c.industry} · ${c.subcategory}${c.emerging ? " · Emerging" : ""}`,
			title: c.name,
			text: c.short,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, { career: c }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: addCompare,
						className: btnClass("outline"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCompareArrows, { className: "size-4" }), " Compare"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void handleGenerateRoadmap(),
						className: btnClass("soft"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "size-4" }), " Start 5-Phase Roadmap"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/simulator",
						search: { target: c.id },
						className: btnClass("ghost"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, { className: "size-4" }), " Simulate switch"]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompatibilityCard, {
				career: c,
				profile,
				fallbackAnswers: discovery?.answers,
				defaultExpanded: false
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialOutlookPanel, {
				career: c,
				profile
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[1.5fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-2 font-display text-lg font-semibold",
							children: "A typical day"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-text-2",
							children: c.day
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
									title: "Main responsibilities",
									items: c.responsibilities
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
									title: "Standard education routes",
									items: c.pathways
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
									title: "Alternative & flexible routes",
									items: c.altRoutes
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
									title: "Career progression stages",
									items: c.progression
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
									title: "Advantages",
									items: c.pros
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
									title: "Challenges",
									items: c.cons
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 text-sm font-medium text-cyan",
							children: "Beginner portfolio projects"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: c.projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: p }, p))
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "flex items-center gap-1.5 text-sm font-medium text-cyan",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-4" }), " Entry-level opportunities"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm text-text-2",
							children: c.entryLevelOpportunities
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "flex items-center gap-1.5 text-sm font-medium text-cyan",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4" }), " Freelance & independent work"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm text-text-2",
							children: c.freelanceOpportunity
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "flex items-center gap-1.5 text-sm font-medium text-cyan",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), " Entrepreneurship potential"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm text-text-2",
							children: c.entrepreneurshipOpportunity
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium text-cyan",
							children: "Learning cost & setting"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1.5 text-sm text-text-2",
							children: [
								c.estimatedCostNote,
								" Environment: ",
								c.environment,
								"."
							]
						})] })
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Skills worth exploring"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: c.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: s }, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 text-sm font-medium text-text-2",
							children: "Useful school subjects"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: c.subjects.join(" · ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 text-sm font-medium text-text-2",
							children: "Entry baseline & commitment"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: ["Typical starting point: ", c.minEducation]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, { value: c.commitmentLevel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: c.commitment
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Verified free & open resources"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: c.resources.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: r.url,
							target: "_blank",
							rel: "noreferrer",
							className: "glass-soft flex items-center justify-between gap-2 px-3 py-2 text-sm hover:border-cyan/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-xs text-muted-foreground",
								children: [
									r.cost,
									" · ",
									r.note
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4 shrink-0 text-cyan" })]
						}) }, r.url))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Try it first"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-text-2",
							children: c.trial
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/try",
								search: { c: c.challengeId },
								className: btnClass("primary"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "size-4" }), " Try challenge"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/planner",
								search: { career: c.id },
								className: btnClass("outline"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4" }), " Plan learning"]
							})]
						})
					] })
				]
			})]
		})
	] });
}
//#endregion
export { CareerPage as component };
