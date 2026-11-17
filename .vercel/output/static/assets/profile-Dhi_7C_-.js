import { o as require_jsx_runtime } from "./useSelector-Cu7jxM-W.js";
import { h as useUser } from "./auth-ByhFdEgm.js";
import { t as AppShell } from "./AppShell-BgEZmUVx.js";
import { c as PageHeader } from "./ui-kit-BDOPC8gw.js";
import { t as ProfileForm } from "./ProfileForm-5_iL_y4p.js";
//#region src/routes/_authenticated/profile.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function Profile() {
	const { user, refreshUser } = useUser();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "My profile",
		text: user?.email ? `Signed in as ${user.email}` : void 0
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-3xl",
		children: user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileForm, {
			userId: user.uid,
			email: user.email ?? void 0,
			defaultName: user.displayName ?? void 0,
			emailVerified: user.emailVerified,
			onRefreshAuth: refreshUser,
			submitLabel: "Save profile changes"
		})
	})] });
}
//#endregion
export { Profile as component };
