import { v as lazyRouteComponent, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/planner-BMtrQmYh.js
var $$splitComponentImporter = () => import("./planner-eDGxEKLH.mjs");
var Route = createFileRoute("/planner")({
	validateSearch: (s) => typeof s["career"] === "string" ? { career: s["career"] } : {},
	head: () => ({ meta: [
		{ title: "Budget-to-Skill Planner — Futuroute" },
		{
			name: "description",
			content: "Plan how to start learning any of 260+ careers within your real budget in INR and weekly hours."
		},
		{
			property: "og:title",
			content: "Budget-to-Skill Planner — Futuroute"
		},
		{
			property: "og:description",
			content: "Realistic INR spending and free-first learning plans tailored to your budget."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
