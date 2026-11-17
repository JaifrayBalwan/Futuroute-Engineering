import { v as lazyRouteComponent, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getCareer } from "./careers-ChJ9jiL5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/careers._id-C-GDV46M.js
var $$splitComponentImporter = () => import("./careers._id-D9HCp241.mjs");
var Route = createFileRoute("/careers/$id")({
	loader: ({ params }) => {
		const c = getCareer(params.id);
		if (!c) return {
			name: params.id.replace(/-/g, " "),
			short: "Career exploration profile on Futuroute.",
			isDynamic: true
		};
		return {
			name: c.name,
			short: c.short,
			isDynamic: false
		};
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [
		{ title: `${loaderData.name} — Futuroute` },
		{
			name: "description",
			content: loaderData.short
		},
		{
			property: "og:title",
			content: `${loaderData.name} — Futuroute`
		},
		{
			property: "og:description",
			content: loaderData.short
		}
	] : [{ title: "Career unavailable — Futuroute" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
