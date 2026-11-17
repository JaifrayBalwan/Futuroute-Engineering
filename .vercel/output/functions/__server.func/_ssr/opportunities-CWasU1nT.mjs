import { v as lazyRouteComponent, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/opportunities-CWasU1nT.js
var $$splitComponentImporter = () => import("./opportunities-BAM0zCun.mjs");
var Route = createFileRoute("/opportunities")({
	validateSearch: (search) => {
		const res = {};
		if (typeof search["category"] === "string") res.category = search["category"];
		if (typeof search["field"] === "string") res.field = search["field"];
		return res;
	},
	head: () => ({ meta: [
		{ title: "Opportunity Finder — Futuroute" },
		{
			name: "description",
			content: "Browse curated internships, free online courses, scholarships, hackathons, competitions, certifications, and entry-level job portals matched to your career roadmap."
		},
		{
			property: "og:title",
			content: "Opportunity Finder — Futuroute"
		},
		{
			property: "og:description",
			content: "Verified ongoing portals & periodic cohorts personalized for students."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
