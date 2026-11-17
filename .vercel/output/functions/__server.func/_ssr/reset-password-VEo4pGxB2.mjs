import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { S as useNavigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Glass, f as inputClass, n as Button, o as Logo, s as Notice, u as btnClass } from "./ui-kit-BmqGm62i.mjs";
import { l as friendlyAuthError, s as completePasswordReset, x as verifyResetCode } from "./auth-Bjd81y0G.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./reset-password-Cf7c1dfk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-VEo4pGxB2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/reset-password.tsx?tsr-split=component";
function Reset() {
	const { oobCode } = Route.useSearch();
	const nav = useNavigate();
	const [pw, setPw] = (0, import_react.useState)("");
	const [pw2, setPw2] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)(null);
	const [checking, setChecking] = (0, import_react.useState)(Boolean(oobCode));
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!oobCode) {
			setChecking(false);
			return;
		}
		verifyResetCode(oobCode).then((em) => setEmail(em)).catch((x) => setErr(friendlyAuthError(x))).finally(() => setChecking(false));
	}, [oobCode]);
	async function submit(e) {
		e.preventDefault();
		setErr("");
		if (!oobCode) return setErr("Missing reset code. Request a new password reset link from Sign in.");
		if (pw.length < 8) return setErr("Password must be at least 8 characters.");
		if (pw !== pw2) return setErr("Passwords don't match.");
		setBusy(true);
		try {
			await completePasswordReset(oobCode, pw);
			toast.success("Password updated — please sign in with your new password.");
			nav({ to: "/auth" });
		} catch (x) {
			setErr(friendlyAuthError(x));
		} finally {
			setBusy(false);
		}
	}
	const cls = inputClass();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "ambient grid min-h-screen place-items-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-6",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 49,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 47,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Set a new password"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 11
			}, this), checking ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-3 text-sm text-text-2",
				children: "Verifying reset link…"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 23
			}, this) : !oobCode ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Notice, {
					tone: "warn",
					children: "No reset code found in this link. Request a new password reset email from the sign-in page."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 55,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/auth",
					className: btnClass("primary", "w-full"),
					children: "Go to Sign in"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 59,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 102
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				onSubmit: submit,
				className: "mt-4 grid gap-3",
				children: [
					email && /* @__PURE__ */ (void 0)("p", {
						className: "text-sm text-text-2",
						children: [
							"Resetting password for",
							" ",
							/* @__PURE__ */ (void 0)("span", {
								className: "font-medium text-foreground",
								children: email
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 65,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 63,
						columnNumber: 25
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "grid gap-1 text-sm",
						children: ["New password", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "password",
							className: cls,
							value: pw,
							onChange: (e) => setPw(e.target.value),
							autoComplete: "new-password"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 69,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 67,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "grid gap-1 text-sm",
						children: ["Confirm password", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "password",
							className: cls,
							value: pw2,
							onChange: (e) => setPw2(e.target.value),
							autoComplete: "new-password"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 73,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 71,
						columnNumber: 15
					}, this),
					err && /* @__PURE__ */ (void 0)(Notice, {
						tone: "warn",
						children: err
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 75,
						columnNumber: 23
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "submit",
						disabled: busy,
						children: busy ? "Saving…" : "Update password"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 62,
				columnNumber: 22
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 46,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 45,
		columnNumber: 10
	}, this);
}
//#endregion
export { Reset as component };
