import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { c as PageHeader } from "./ui-kit-BmqGm62i.mjs";
import { b as useUser } from "./auth-Bjd81y0G.mjs";
import { t as AppShell } from "./AppShell-DVN8uj3t.mjs";
import { t as ProfileForm } from "./ProfileForm-Wiyq6d-N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-t2Sbcrv8.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/profile.tsx?tsr-split=component";
function Profile() {
	const { user, refreshUser } = useUser();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		title: "My profile",
		text: user?.email ? `Signed in as ${user.email}` : void 0
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 11,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "max-w-3xl",
		children: user && /* @__PURE__ */ (void 0)(ProfileForm, {
			userId: user.uid,
			email: user.email ?? void 0,
			defaultName: user.displayName ?? void 0,
			emailVerified: user.emailVerified,
			onRefreshAuth: refreshUser,
			submitLabel: "Save profile changes"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 13,
			columnNumber: 18
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 12,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 10,
		columnNumber: 10
	}, this);
}
//#endregion
export { Profile as component };
