import { o as require_jsx_runtime } from "./useSelector-Cu7jxM-W.js";
import { L as useNavigate, h as useUser } from "./auth-ByhFdEgm.js";
import { t as AppShell } from "./AppShell-BgEZmUVx.js";
import { c as PageHeader } from "./ui-kit-BDOPC8gw.js";
import { t as ProfileForm } from "./ProfileForm-5_iL_y4p.js";
//#region src/routes/_authenticated/onboarding.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
function Onboarding() {
	const { user, refreshUser } = useUser();
	const nav = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Personalised onboarding",
		title: "Let's get to know you",
		text: "This takes about two minutes. You can skip optional fields and update anything later from your profile."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-3xl",
		children: user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileForm, {
			wizard: true,
			userId: user.uid,
			email: user.email ?? void 0,
			defaultName: user.displayName ?? void 0,
			emailVerified: user.emailVerified,
			onRefreshAuth: refreshUser,
			submitLabel: "Finish & open Dashboard",
			onSaved: () => nav({ to: "/dashboard" })
		})
	})] });
}
//#endregion
export { Onboarding as component };
