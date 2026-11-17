import { l as __toESM, o as require_jsx_runtime, s as require_react } from "./useSelector-Cu7jxM-W.js";
import { n as toast } from "./dist-CnotZWgl.js";
import { I as Link, L as useNavigate, c as logoutUser, h as useUser } from "./auth-ByhFdEgm.js";
import { o as LogOut, r as User, s as LogIn, t as AppShell } from "./AppShell-BgEZmUVx.js";
import { a as actions, s as useApp } from "./careers-Da7lFkNP.js";
import { a as Glass, c as PageHeader, n as Button, s as Notice, u as btnClass } from "./ui-kit-BDOPC8gw.js";
//#region src/routes/settings.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Settings() {
	const s = useApp();
	const { user } = useUser();
	const nav = useNavigate();
	const [msg, setMsg] = (0, import_react.useState)("");
	const exportData = () => {
		const blob = new Blob([JSON.stringify(s, null, 2)], { type: "application/json" });
		const a = document.createElement("a");
		a.href = URL.createObjectURL(blob);
		a.download = "futuroute-data.json";
		a.click();
	};
	const handleLogout = async () => {
		await logoutUser();
		toast.success("Signed out");
		nav({ to: "/" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Settings",
		text: "Manage your account session, export your exploration data, or reset browser cache."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid max-w-3xl gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-semibold",
			children: "Account & Cloud Sync"
		}), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-text-2",
				children: [
					"Signed in as ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: user.email
					}),
					" (",
					user.emailVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-success",
						children: "Verified · Cloud Firestore sync active"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-warning",
						children: "Email verification pending"
					}),
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/profile",
					className: btnClass("outline"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4" }), " Edit Personal Profile"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					onClick: () => void handleLogout(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Sign out"]
				})]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-text-2",
				children: "You are exploring as a guest. Sign in to sync your profile, shortlist folders, comparisons, and roadmaps with Cloud Firestore."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/auth",
				search: { next: "/settings" },
				className: btnClass("primary"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4" }), " Sign in / Create account"]
			})]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold",
				children: "Your data"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-text-2",
				children: [
					"Currently loaded: ",
					s.saved.length,
					" saved careers, ",
					s.savedComparisons.length,
					" saved comparisons, ",
					Object.keys(s.challenges).length,
					" challenges, ",
					s.roadmaps.length,
					" roadmaps (",
					s.roadmap ? s.roadmap.tasks.length : 0,
					" active tasks), and ",
					s.activity.length,
					" ",
					"activity events."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: exportData,
					children: "Download my data (JSON)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => {
						if (confirm("Clear local browser cache for Futuroute? (Cloud-synced account data remains safe.)")) {
							actions.reset();
							setMsg("Local browser state cleared.");
						}
					},
					children: "Clear local browser cache"
				})]
			}),
			msg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "success",
					children: msg
				})
			})
		] })]
	})] });
}
//#endregion
export { Settings as component };
