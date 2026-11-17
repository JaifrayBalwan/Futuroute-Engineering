import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { S as useNavigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Glass, c as PageHeader, n as Button, s as Notice, u as btnClass } from "./ui-kit-BmqGm62i.mjs";
import { b as useUser, p as logoutUser } from "./auth-Bjd81y0G.mjs";
import { i as actions, s as useApp } from "./careers-ChJ9jiL5.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as LogOut, r as User, w as LogIn } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DVN8uj3t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-C-wk8woO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/settings.tsx?tsr-split=component";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		title: "Settings",
		text: "Manage your account session, export your exploration data, or reset browser cache."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 33,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid max-w-3xl gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "font-display text-lg font-semibold",
			children: "Account & Cloud Sync"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 36,
			columnNumber: 11
		}, this), user ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-3 space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-text-2",
				children: [
					"Signed in as ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-medium text-foreground",
						children: user.email
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 39,
						columnNumber: 30
					}, this),
					" (",
					user.emailVerified ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-success",
						children: "Verified · Cloud Firestore sync active"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 40,
						columnNumber: 39
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-warning",
						children: "Email verification pending"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 40,
						columnNumber: 118
					}, this),
					")"
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 38,
				columnNumber: 15
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/profile",
					className: btnClass("outline"),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 45,
						columnNumber: 19
					}, this), " Edit Personal Profile"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 44,
					columnNumber: 17
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "ghost",
					onClick: () => void handleLogout(),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 48,
						columnNumber: 19
					}, this), " Sign out"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 17
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 43,
				columnNumber: 15
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 37,
			columnNumber: 19
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-3 space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-text-2",
				children: "You are exploring as a guest. Sign in to sync your profile, shortlist folders, comparisons, and roadmaps with Cloud Firestore."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 15
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/auth",
				search: { next: "/settings" },
				className: btnClass("primary"),
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogIn, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 59,
					columnNumber: 17
				}, this), " Sign in / Create account"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 56,
				columnNumber: 15
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 51,
			columnNumber: 22
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 35,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "font-display text-lg font-semibold",
				children: "Your data"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 65,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
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
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 66,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "outline",
					onClick: exportData,
					children: "Download my data (JSON)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 73,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "outline",
					onClick: () => {
						if (confirm("Clear local browser cache for Futuroute? (Cloud-synced account data remains safe.)")) {
							actions.reset();
							setMsg("Local browser state cleared.");
						}
					},
					children: "Clear local browser cache"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 76,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 72,
				columnNumber: 11
			}, this),
			msg && /* @__PURE__ */ (void 0)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (void 0)(Notice, {
					tone: "success",
					children: msg
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 86,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 85,
				columnNumber: 19
			}, this)
		] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 64,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 34,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 32,
		columnNumber: 10
	}, this);
}
//#endregion
export { Settings as component };
