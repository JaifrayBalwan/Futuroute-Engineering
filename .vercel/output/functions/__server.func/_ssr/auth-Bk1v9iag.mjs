import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { S as useNavigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Glass, f as inputClass, n as Button, o as Logo, s as Notice } from "./ui-kit-BmqGm62i.mjs";
import { _ as sendResetEmail, b as useUser, g as safeNext, h as resendVerificationEmail, l as friendlyAuthError, m as registerWithEmail, p as logoutUser, v as signInWithEmail, y as signInWithGoogle } from "./auth-Bjd81y0G.mjs";
import { c as getUserProfile } from "./db-Cw3pFnIt.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./auth-BhASUXCX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Bk1v9iag.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/auth.tsx?tsr-split=component";
var input = inputClass();
function AuthPage() {
	const { next } = Route.useSearch();
	const nav = useNavigate();
	const { user, loading, refreshUser } = useUser();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [email, setEmail] = (0, import_react.useState)("");
	const [pw, setPw] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	const [info, setInfo] = (0, import_react.useState)("");
	const dest = safeNext(next);
	const routeSignedInUser = async (uid) => {
		try {
			if ((await getUserProfile(uid))?.onboarded) nav({
				href: dest,
				replace: true
			});
			else nav({
				to: "/onboarding",
				replace: true
			});
		} catch {
			nav({
				to: "/onboarding",
				replace: true
			});
		}
	};
	(0, import_react.useEffect)(() => {
		if (!loading && user && user.emailVerified) routeSignedInUser(user.uid);
	}, [
		loading,
		user?.uid,
		user?.emailVerified
	]);
	async function submit(e) {
		e.preventDefault();
		setErr("");
		setInfo("");
		if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setErr("Please enter a valid email address.");
		if (mode !== "forgot" && pw.length < 8) return setErr("Password must be at least 8 characters.");
		setBusy(true);
		try {
			if (mode === "in") {
				const signedIn = await signInWithEmail(email, pw);
				toast.success("Signed in");
				if (signedIn.emailVerified) await routeSignedInUser(signedIn.uid);
				else setInfo("Signed in! Please verify your email address using the link we sent to unlock cloud saving.");
			} else if (mode === "up") {
				const created = await registerWithEmail(email, pw, name);
				toast.success("Account created");
				if (created.emailVerified) await routeSignedInUser(created.uid);
				else setInfo("Verification email sent! Please click the link in your inbox, then press “I’ve verified — continue” below.");
			} else {
				await sendResetEmail(email);
				setInfo("If an account exists for that email, a password reset link is on its way.");
			}
		} catch (x) {
			setErr(friendlyAuthError(x));
		} finally {
			setBusy(false);
		}
	}
	async function handleGoogle() {
		setErr("");
		setInfo("");
		setBusy(true);
		try {
			const signedIn = await signInWithGoogle();
			toast.success("Signed in with Google");
			await routeSignedInUser(signedIn.uid);
		} catch (x) {
			setErr(friendlyAuthError(x));
		} finally {
			setBusy(false);
		}
	}
	async function handleCheckVerification() {
		setBusy(true);
		setErr("");
		try {
			const refreshed = await refreshUser();
			if (refreshed?.emailVerified) {
				toast.success("Email verified!");
				await routeSignedInUser(refreshed.uid);
			} else setErr("Still showing unverified — please click the verification link in your inbox first.");
		} catch (x) {
			setErr(friendlyAuthError(x));
		} finally {
			setBusy(false);
		}
	}
	async function handleResendVerification() {
		setBusy(true);
		setErr("");
		try {
			await resendVerificationEmail();
			setInfo("Verification email re-sent. Please check your inbox and spam folder.");
		} catch (x) {
			setErr(friendlyAuthError(x));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "ambient grid min-h-screen place-items-center px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/",
				className: "mb-6 inline-block",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 141,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 140,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: user && !user.emailVerified ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "font-display text-2xl font-semibold",
						children: "Verify your email"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 145,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-text-2",
						children: [
							"You are signed in as",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium text-foreground",
								children: user.email
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 148,
								columnNumber: 17
							}, this),
							". For your account security, Futuroute saves cloud profiles, comparisons, and roadmaps once your email is verified."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 146,
						columnNumber: 15
					}, this),
					err && /* @__PURE__ */ (void 0)(Notice, {
						tone: "warn",
						children: err
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 152,
						columnNumber: 23
					}, this),
					info && /* @__PURE__ */ (void 0)(Notice, {
						tone: "success",
						children: info
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 153,
						columnNumber: 24
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								onClick: handleCheckVerification,
								disabled: busy,
								children: busy ? "Checking…" : "I’ve verified — continue"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 155,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								onClick: handleResendVerification,
								disabled: busy,
								children: "Resend verification email"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 158,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "soft",
								onClick: () => nav({ to: "/onboarding" }),
								children: "Continue to onboarding (save locally first)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 161,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								onClick: () => void logoutUser(),
								children: "Sign out / switch account"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 166,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 154,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 144,
				columnNumber: 42
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-2xl font-semibold",
					children: mode === "in" ? "Welcome back" : mode === "up" ? "Create your account" : "Reset your password"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 171,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-sm text-text-2",
					children: "You can browse careers without an account. Sign in to save assessments, folders, comparisons and roadmaps."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 174,
					columnNumber: 15
				}, this),
				mode !== "forgot" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("button", {
					type: "button",
					disabled: busy,
					onClick: handleGoogle,
					className: "mt-5 flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-[#8E918F] bg-[#131314] px-3 text-sm font-medium text-[#E3E3E3] transition hover:brightness-110 disabled:opacity-50",
					children: [/* @__PURE__ */ (void 0)("svg", {
						"aria-hidden": "true",
						width: "18",
						height: "18",
						viewBox: "0 0 24 24",
						children: [
							/* @__PURE__ */ (void 0)("path", {
								fill: "#4285F4",
								d: "M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 182,
								columnNumber: 23
							}, this),
							/* @__PURE__ */ (void 0)("path", {
								fill: "#34A853",
								d: "M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 183,
								columnNumber: 23
							}, this),
							/* @__PURE__ */ (void 0)("path", {
								fill: "#FBBC05",
								d: "M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 184,
								columnNumber: 23
							}, this),
							/* @__PURE__ */ (void 0)("path", {
								fill: "#EA4335",
								d: "M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 185,
								columnNumber: 23
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 181,
						columnNumber: 21
					}, this), "Continue with Google"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 180,
					columnNumber: 19
				}, this), /* @__PURE__ */ (void 0)("p", {
					className: "my-4 text-center text-xs text-muted-foreground",
					children: "or with email & password"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 189,
					columnNumber: 19
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 179,
					columnNumber: 37
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: submit,
					className: "mt-3 grid gap-3",
					noValidate: true,
					children: [
						mode === "up" && /* @__PURE__ */ (void 0)("label", {
							className: "grid gap-1 text-sm",
							children: ["Full Name", /* @__PURE__ */ (void 0)("input", {
								className: input,
								value: name,
								onChange: (e) => setName(e.target.value),
								autoComplete: "name",
								placeholder: "e.g. Aarav Sharma"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 197,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 195,
							columnNumber: 35
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "grid gap-1 text-sm",
							children: ["Email", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								className: input,
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								autoComplete: "email",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 201,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 199,
							columnNumber: 17
						}, this),
						mode !== "forgot" && /* @__PURE__ */ (void 0)("label", {
							className: "grid gap-1 text-sm",
							children: ["Password", /* @__PURE__ */ (void 0)("input", {
								className: input,
								type: "password",
								value: pw,
								onChange: (e) => setPw(e.target.value),
								autoComplete: mode === "in" ? "current-password" : "new-password",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 205,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 203,
							columnNumber: 39
						}, this),
						err && /* @__PURE__ */ (void 0)(Notice, {
							tone: "warn",
							children: err
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 207,
							columnNumber: 25
						}, this),
						info && /* @__PURE__ */ (void 0)(Notice, {
							tone: "success",
							children: info
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 208,
							columnNumber: 26
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "submit",
							disabled: busy,
							className: "mt-1 h-11",
							children: busy ? "Please wait…" : mode === "in" ? "Sign in" : mode === "up" ? "Create account" : "Send reset link"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 209,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 194,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 flex flex-wrap justify-between gap-2 text-sm text-text-2",
					children: mode === "in" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						className: "hover:text-foreground",
						onClick: () => setMode("up"),
						children: "New here? Create an account"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 216,
						columnNumber: 21
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						className: "hover:text-foreground",
						onClick: () => setMode("forgot"),
						children: "Forgot password?"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 219,
						columnNumber: 21
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 215,
						columnNumber: 34
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						className: "hover:text-foreground",
						onClick: () => setMode("in"),
						children: "Back to sign in"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 222,
						columnNumber: 25
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 214,
					columnNumber: 15
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 170,
				columnNumber: 22
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 143,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 139,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 138,
		columnNumber: 10
	}, this);
}
//#endregion
export { AuthPage as component };
