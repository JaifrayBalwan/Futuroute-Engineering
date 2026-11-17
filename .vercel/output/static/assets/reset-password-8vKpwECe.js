import { l as __toESM, o as require_jsx_runtime, s as require_react } from "./useSelector-Cu7jxM-W.js";
import { n as toast } from "./dist-CnotZWgl.js";
import { I as Link, L as useNavigate, a as completePasswordReset, g as verifyResetCode, o as friendlyAuthError } from "./auth-ByhFdEgm.js";
import { i as Route } from "./index-DW2YTfhy.js";
import { a as Glass, d as inputClass, n as Button, o as Logo, s as Notice, u as btnClass } from "./ui-kit-BDOPC8gw.js";
//#region src/routes/reset-password.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ambient grid min-h-screen place-items-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Set a new password"
			}), checking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-text-2",
				children: "Verifying reset link…"
			}) : !oobCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "warn",
					children: "No reset code found in this link. Request a new password reset email from the sign-in page."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/auth",
					className: btnClass("primary", "w-full"),
					children: "Go to Sign in"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mt-4 grid gap-3",
				children: [
					email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-text-2",
						children: [
							"Resetting password for",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: email
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["New password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							className: cls,
							value: pw,
							onChange: (e) => setPw(e.target.value),
							autoComplete: "new-password"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Confirm password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							className: cls,
							value: pw2,
							onChange: (e) => setPw2(e.target.value),
							autoComplete: "new-password"
						})]
					}),
					err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "warn",
						children: err
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy,
						children: busy ? "Saving…" : "Update password"
					})
				]
			})] })]
		})
	});
}
//#endregion
export { Reset as component };
