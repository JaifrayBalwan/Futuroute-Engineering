import { v as lazyRouteComponent, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-Cf7c1dfk.js
var $$splitComponentImporter = () => import("./reset-password-VEo4pGxB2.mjs");
var Route = createFileRoute("/reset-password")({
	validateSearch: (s) => ({ oobCode: typeof s["oobCode"] === "string" ? s["oobCode"] : void 0 }),
	head: () => ({ meta: [
		{ title: "Set a new password — Futuroute" },
		{
			name: "description",
			content: "Choose a new password for your Futuroute account."
		},
		{
			property: "og:title",
			content: "Set a new password — Futuroute"
		},
		{
			property: "og:description",
			content: "Reset your Futuroute password."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
