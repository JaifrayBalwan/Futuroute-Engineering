import { l as __toESM, o as require_jsx_runtime, s as require_react } from "./useSelector-Cu7jxM-W.js";
import { n as toast } from "./dist-CnotZWgl.js";
import { I as Link, L as useNavigate, c as logoutUser, d as safeNext, f as sendResetEmail, h as useUser, l as registerWithEmail, m as signInWithGoogle, o as friendlyAuthError, p as signInWithEmail, u as resendVerificationEmail } from "./auth-ByhFdEgm.js";
import { c as getUserProfile } from "./db-BNKfCsrU.js";
import { s as Route } from "./index-DW2YTfhy.js";
import { a as Glass, d as inputClass, n as Button, o as Logo, s as Notice } from "./ui-kit-BDOPC8gw.js";
//#region src/routes/auth.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ambient grid min-h-screen place-items-center px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mb-6 inline-block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glass, { children: user && !user.emailVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-semibold",
						children: "Verify your email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-text-2",
						children: [
							"You are signed in as",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: user.email
							}),
							". For your account security, Futuroute saves cloud profiles, comparisons, and roadmaps once your email is verified."
						]
					}),
					err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "warn",
						children: err
					}),
					info && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "success",
						children: info
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: handleCheckVerification,
								disabled: busy,
								children: busy ? "Checking…" : "I’ve verified — continue"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: handleResendVerification,
								disabled: busy,
								children: "Resend verification email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "soft",
								onClick: () => nav({ to: "/onboarding" }),
								children: "Continue to onboarding (save locally first)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => void logoutUser(),
								children: "Sign out / switch account"
							})
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: mode === "in" ? "Welcome back" : mode === "up" ? "Create your account" : "Reset your password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-text-2",
					children: "You can browse careers without an account. Sign in to save assessments, folders, comparisons and roadmaps."
				}),
				mode !== "forgot" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: busy,
					onClick: handleGoogle,
					className: "mt-5 flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-[#8E918F] bg-[#131314] px-3 text-sm font-medium text-[#E3E3E3] transition hover:brightness-110 disabled:opacity-50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						"aria-hidden": "true",
						width: "18",
						height: "18",
						viewBox: "0 0 24 24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#4285F4",
								d: "M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#34A853",
								d: "M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#FBBC05",
								d: "M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#EA4335",
								d: "M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
							})
						]
					}), "Continue with Google"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "my-4 text-center text-xs text-muted-foreground",
					children: "or with email & password"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-3 grid gap-3",
					noValidate: true,
					children: [
						mode === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1 text-sm",
							children: ["Full Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: input,
								value: name,
								onChange: (e) => setName(e.target.value),
								autoComplete: "name",
								placeholder: "e.g. Aarav Sharma"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1 text-sm",
							children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: input,
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								autoComplete: "email",
								required: true
							})]
						}),
						mode !== "forgot" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1 text-sm",
							children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: input,
								type: "password",
								value: pw,
								onChange: (e) => setPw(e.target.value),
								autoComplete: mode === "in" ? "current-password" : "new-password",
								required: true
							})]
						}),
						err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: "warn",
							children: err
						}),
						info && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: "success",
							children: info
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							className: "mt-1 h-11",
							children: busy ? "Please wait…" : mode === "in" ? "Sign in" : mode === "up" ? "Create account" : "Send reset link"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap justify-between gap-2 text-sm text-text-2",
					children: mode === "in" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "hover:text-foreground",
						onClick: () => setMode("up"),
						children: "New here? Create an account"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "hover:text-foreground",
						onClick: () => setMode("forgot"),
						children: "Forgot password?"
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "hover:text-foreground",
						onClick: () => setMode("in"),
						children: "Back to sign in"
					})
				})
			] }) })]
		})
	});
}
//#endregion
export { AuthPage as component };
