import { o as __toESM } from "../_runtime.mjs";
import { r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { C as useRouter, Ut as redirect, _ as Outlet, b as createRootRouteWithContext, f as Scripts, g as createRouter, p as HeadContent, v as lazyRouteComponent, x as Link, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { S as waitForAuthUser, b as useUser } from "./auth-Bjd81y0G.mjs";
import { c as useFirebaseStoreSync } from "./careers-ChJ9jiL5.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$12 } from "./auth-BhASUXCX.mjs";
import { t as Route$13 } from "./careers._id-C-GDV46M.mjs";
import { t as Route$14 } from "./opportunities-CWasU1nT.mjs";
import { t as Route$15 } from "./planner-BMtrQmYh.mjs";
import { t as Route$16 } from "./reset-password-Cf7c1dfk.mjs";
import { t as Route$17 } from "./simulator-gSnjrkym.mjs";
import { t as Route$18 } from "./try-D-I9P3Qs.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CvqBx_aR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var styles_default = "/assets/styles-DFyBRC7h.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message: describeThrown(error),
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var MAX_SERIALIZED_LENGTH = 2e3;
function describeThrown(error) {
	if (error instanceof Response) return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	const { message } = error ?? {};
	if (typeof message === "string" && message.length > 0) return message;
	try {
		return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
	} catch {
		return String(error);
	}
}
var _jsxFileName = "/app/applet/src/routes/__root.tsx";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 23,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 24,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 25,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 29,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 28,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 22,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 21,
		columnNumber: 5
	}, this);
}
function parseFriendlyError(error) {
	const raw = error instanceof Error ? error.message : String(error ?? "");
	try {
		const parsed = JSON.parse(raw);
		if (parsed && typeof parsed.error === "string") return parsed.error.includes("permission") ? "You don't have permission for that action yet (make sure you're signed in with a verified email)." : parsed.error;
	} catch {}
	return "Something went wrong on our end. You can try refreshing or head back home.";
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 66,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: parseFriendlyError(error)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 69,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 71,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 80,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 70,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 65,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 64,
		columnNumber: 5
	}, this);
}
var Route$11 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Futuroute — Explore possibilities. Plan your future." },
			{
				name: "description",
				content: "Futuroute helps students discover, compare and try careers, then plan learning within their time and budget."
			},
			{
				property: "og:title",
				content: "Futuroute — Explore possibilities. Plan your future."
			},
			{
				property: "og:description",
				content: "Discover, compare and try careers, then build a realistic learning plan."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 132,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 131,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 136,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 134,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 130,
		columnNumber: 5
	}, this);
}
function AppProviders() {
	const { user } = useUser();
	useFirebaseStoreSync(user);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 148,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster, {
		position: "bottom-right",
		theme: "dark",
		richColors: true
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 149,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 147,
		columnNumber: 5
	}, this);
}
function RootComponent() {
	const { queryClient } = Route$11.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppProviders, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 160,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 158,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$10 = () => import("./routes-DvVv87cX.mjs");
var Route$10 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Futuroute — Your future isn't one-size-fits-all" },
		{
			name: "description",
			content: "Explore 260+ career paths across 20 industries, compare trade-offs, try mini-challenges and plan learning within your time and budget."
		},
		{
			property: "og:title",
			content: "Futuroute — Your future isn't one-size-fits-all"
		},
		{
			property: "og:description",
			content: "Discover, compare and try careers. Plan your next step."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./route-CRRSyPUS.mjs");
var Route$9 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async ({ location }) => {
		if (typeof window === "undefined") return;
		if (!await waitForAuthUser()) throw redirect({
			to: "/auth",
			search: { next: location.href }
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./about-DxQzn4s9.mjs");
var Route$8 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About Futuroute — How it works" },
		{
			name: "description",
			content: "What Futuroute is, how verified career recommendations work, privacy and contact."
		},
		{
			property: "og:title",
			content: "About Futuroute"
		},
		{
			property: "og:description",
			content: "Career exploration platform across 20 industries — university project."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./compare-BX5EfYcw.mjs");
var Route$7 = createFileRoute("/compare")({
	head: () => ({ meta: [
		{ title: "Compare My Futures — Futuroute" },
		{
			name: "description",
			content: "Compare two or three careers across 17 dimensions: compatibility scores, India & global salaries, skills, qualifications, entry difficulty, demand, costs, and trade-offs."
		},
		{
			property: "og:title",
			content: "Compare My Futures — Futuroute"
		},
		{
			property: "og:description",
			content: "17-dimension side-by-side career comparison tailored to your profile."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./dashboard-C7YjQnu3.mjs");
var Route$6 = createFileRoute("/dashboard")({
	head: () => ({ meta: [
		{ title: "My Dashboard — Futuroute" },
		{
			name: "description",
			content: "Your personalised profile summary, saved career folders, comparisons, roadmaps and challenges."
		},
		{
			property: "og:title",
			content: "My Dashboard — Futuroute"
		},
		{
			property: "og:description",
			content: "Track your career exploration progress."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./discover-DLhLvCnt.mjs");
var Route$5 = createFileRoute("/discover")({
	head: () => ({ meta: [
		{ title: "Discover Careers — Futuroute" },
		{
			name: "description",
			content: "Explore 260+ careers across 20 industries or answer a guided questionnaire for personalised career recommendations."
		},
		{
			property: "og:title",
			content: "Discover Careers — Futuroute"
		},
		{
			property: "og:description",
			content: "Guided career discovery and 260+ career explorer across 20 industries."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./roadmap-Ce-8Tc3w.mjs");
var Route$4 = createFileRoute("/roadmap")({
	head: () => ({ meta: [
		{ title: "My Career Roadmap — Futuroute" },
		{
			name: "description",
			content: "Manage 5-phase personalised career roadmaps with learning objectives, free alternatives, weekly hours pacing, personal notes, and Cloud Firestore progress tracking."
		},
		{
			property: "og:title",
			content: "My Career Roadmap — Futuroute"
		},
		{
			property: "og:description",
			content: "5-phase interactive learning roadmaps tailored to your career target and pace."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./saved-CxXGeuoI.mjs");
var Route$3 = createFileRoute("/saved")({
	head: () => ({ meta: [
		{ title: "Saved Careers — Futuroute" },
		{
			name: "description",
			content: "Organise your saved careers into Top Choices, Alternative Careers, and Explore Later folders."
		},
		{
			property: "og:title",
			content: "Saved Careers — Futuroute"
		},
		{
			property: "og:description",
			content: "Your saved career shortlist folders."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./settings-C-wk8woO.mjs");
var Route$2 = createFileRoute("/settings")({
	head: () => ({ meta: [
		{ title: "Settings — Futuroute" },
		{
			name: "description",
			content: "Manage your Futuroute account, cloud sync and local data."
		},
		{
			property: "og:title",
			content: "Settings — Futuroute"
		},
		{
			property: "og:description",
			content: "Manage account and exploration data."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./onboarding-D-uS3quW.mjs");
var Route$1 = createFileRoute("/_authenticated/onboarding")({
	head: () => ({ meta: [
		{ title: "Set up your profile — Futuroute" },
		{
			name: "description",
			content: "Tell Futuroute about your interests, capabilities, budget and goals."
		},
		{
			property: "og:title",
			content: "Set up your profile — Futuroute"
		},
		{
			property: "og:description",
			content: "Personalise your career exploration."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./profile-t2Sbcrv8.mjs");
var Route = createFileRoute("/_authenticated/profile")({
	head: () => ({ meta: [
		{ title: "My profile — Futuroute" },
		{
			name: "description",
			content: "Update your interests, capabilities, budget and goals."
		},
		{
			property: "og:title",
			content: "My profile — Futuroute"
		},
		{
			property: "og:description",
			content: "Manage your Futuroute profile."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$11
});
var AuthenticatedRouteRoute = Route$9.update({
	id: "/_authenticated",
	getParentRoute: () => Route$11
});
var AboutRoute = Route$8.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$11
});
var AuthRoute = Route$12.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$11
});
var CompareRoute = Route$7.update({
	id: "/compare",
	path: "/compare",
	getParentRoute: () => Route$11
});
var DashboardRoute = Route$6.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$11
});
var DiscoverRoute = Route$5.update({
	id: "/discover",
	path: "/discover",
	getParentRoute: () => Route$11
});
var OpportunitiesRoute = Route$14.update({
	id: "/opportunities",
	path: "/opportunities",
	getParentRoute: () => Route$11
});
var PlannerRoute = Route$15.update({
	id: "/planner",
	path: "/planner",
	getParentRoute: () => Route$11
});
var ResetPasswordRoute = Route$16.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$11
});
var RoadmapRoute = Route$4.update({
	id: "/roadmap",
	path: "/roadmap",
	getParentRoute: () => Route$11
});
var SavedRoute = Route$3.update({
	id: "/saved",
	path: "/saved",
	getParentRoute: () => Route$11
});
var SettingsRoute = Route$2.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$11
});
var SimulatorRoute = Route$17.update({
	id: "/simulator",
	path: "/simulator",
	getParentRoute: () => Route$11
});
var TryRoute = Route$18.update({
	id: "/try",
	path: "/try",
	getParentRoute: () => Route$11
});
var AuthenticatedOnboardingRoute = Route$1.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfileRoute = Route.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AuthenticatedRouteRoute
});
var CareersIdRoute = Route$13.update({
	id: "/careers/$id",
	path: "/careers/$id",
	getParentRoute: () => Route$11
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedOnboardingRoute,
	AuthenticatedProfileRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AboutRoute,
	AuthRoute,
	CompareRoute,
	DashboardRoute,
	DiscoverRoute,
	OpportunitiesRoute,
	PlannerRoute,
	ResetPasswordRoute,
	RoadmapRoute,
	SavedRoute,
	SettingsRoute,
	SimulatorRoute,
	TryRoute,
	CareersIdRoute
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
