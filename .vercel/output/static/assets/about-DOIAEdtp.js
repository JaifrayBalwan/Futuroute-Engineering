import { o as require_jsx_runtime } from "./useSelector-Cu7jxM-W.js";
import { I as Link } from "./auth-ByhFdEgm.js";
import { t as AppShell } from "./AppShell-BgEZmUVx.js";
import { a as Glass, c as PageHeader, u as btnClass } from "./ui-kit-BDOPC8gw.js";
//#region src/routes/about.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
var STATUS = [
	["260+ Verified Careers across 20 Industries", "Curated real-world roles spanning Technology, AI, Sports (coaching, analytics, physio), Healthcare, Finance, Law, Science, Creative Arts, Design, Media, Education, Government, Defence, Environment, Hospitality, Engineering, Entrepreneurship, Agriculture, and Social Sciences."],
	["Multi-Signal Career Matching Engine", "Futuroute scores your interests, capabilities, preferred subjects, working style, budget, and weekly study hours directly against our curated 260-career database for instant, honest, repeatable guidance."],
	["Firebase Auth & Cloud Firestore Sync", "Guests can freely browse careers, compare paths, and preview plans. Signed-in users get persistent personalised onboarding profiles, shortlist folders, saved comparisons, and multi-roadmap tracking."]
];
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "About",
		title: "Your future isn't a single decision.",
		text: "It's a path you can explore. Discover career possibilities across 20 industries, compare trade-offs honestly, try practical mini-challenges, and build a budget-aware roadmap."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 lg:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: "How it works"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 space-y-3 text-text-2",
					children: [
						"Tell us about your interests, capabilities, budget, and study goals.",
						"Review strong matches, cross-industry alternatives, unexpected discoveries, and emerging careers.",
						"Compare 2–3 careers side by side across 13 real dimensions — without declaring a winner.",
						"Build a free-first learning plan and track weekly tasks in My Roadmap."
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-7 shrink-0 place-items-center rounded-full bg-brand text-sm text-primary-foreground",
							children: i + 1
						}), s]
					}, s))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/discover",
					className: btnClass("primary", "mt-5"),
					children: "Start exploring"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold",
				children: "Platform architecture & honesty"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-3 space-y-3",
				children: STATUS.map(([t, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "font-medium text-cyan",
					children: t
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "text-sm text-text-2",
					children: d
				})] }, t))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "privacy",
				className: "font-display text-xl font-semibold",
				children: "Privacy & security"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-text-2",
				children: "Futuroute never sells student data and never promises guaranteed jobs or salaries. Account authentication and private data (profiles, shortlist folders, comparisons, assessments, and roadmaps) are secured with Firebase Authentication and strict Cloud Firestore security rules scoped exclusively to your user ID."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "contact",
				className: "font-display text-xl font-semibold",
				children: "Contact"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-text-2",
				children: "Futuroute is a B.Tech Computer Science and Engineering project at The NorthCap University, Gurugram. For questions or feedback, reach out through the university project repository."
			})] })
		]
	})] });
}
//#endregion
export { About as component };
