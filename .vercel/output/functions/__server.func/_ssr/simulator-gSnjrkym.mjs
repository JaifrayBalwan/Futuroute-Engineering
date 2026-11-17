import { v as lazyRouteComponent, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/simulator-gSnjrkym.js
var $$splitComponentImporter = () => import("./simulator-sz4qMDsW.mjs");
var Route = createFileRoute("/simulator")({
	validateSearch: (search) => {
		const res = {};
		if (typeof search["target"] === "string") res.target = search["target"];
		return res;
	},
	head: () => ({ meta: [
		{ title: "Career Change Simulator — Futuroute" },
		{
			name: "description",
			content: "Compare your current background or academic stream against any of 260+ target careers: transferable skills, skill gaps, costs, timeline, and transition roadmap."
		},
		{
			property: "og:title",
			content: "Career Change Simulator — Futuroute"
		},
		{
			property: "og:description",
			content: "Plan a realistic transition between roles or academic streams."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
