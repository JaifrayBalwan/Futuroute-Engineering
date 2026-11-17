import { v as lazyRouteComponent, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BhASUXCX.js
var $$splitComponentImporter = () => import("./auth-Bk1v9iag.mjs");
var Route = createFileRoute("/auth")({
	validateSearch: (s) => ({ next: typeof s["next"] === "string" ? s["next"] : void 0 }),
	head: () => ({ meta: [
		{ title: "Sign in — Futuroute" },
		{
			name: "description",
			content: "Sign in or create a Futuroute account to save careers, assessments, comparisons and roadmaps."
		},
		{
			property: "og:title",
			content: "Sign in — Futuroute"
		},
		{
			property: "og:description",
			content: "Create a free account to save your career exploration."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
