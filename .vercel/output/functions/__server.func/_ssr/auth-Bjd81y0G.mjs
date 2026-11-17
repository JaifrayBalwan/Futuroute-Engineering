import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as getApp, o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { a as onAuthStateChanged, c as signInWithEmailAndPassword, d as updateProfile, f as verifyPasswordResetCode, i as getAuth, l as signInWithPopup, n as confirmPasswordReset, o as sendEmailVerification, r as createUserWithEmailAndPassword, s as sendPasswordResetEmail, t as GoogleAuthProvider, u as signOut } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { m as getFirestore, p as doc, r as getDocFromServer } from "../_libs/@firebase/firestore+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Bjd81y0G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var env = {
	"BASE_URL": "/",
	"DEV": true,
	"MODE": "production",
	"PROD": false,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/"
};
var firebaseConfig = {
	apiKey: env["VITE_FIREBASE_API_KEY"] || "",
	authDomain: env["VITE_FIREBASE_AUTH_DOMAIN"] || "",
	projectId: env["VITE_FIREBASE_PROJECT_ID"] || "",
	storageBucket: env["VITE_FIREBASE_STORAGE_BUCKET"] || "",
	messagingSenderId: env["VITE_FIREBASE_MESSAGING_SENDER_ID"] || "",
	appId: env["VITE_FIREBASE_APP_ID"] || "",
	firestoreDatabaseId: env["VITE_FIREBASE_DATABASE_ID"] || ""
};
var isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
var effectiveConfig = isFirebaseConfigured ? firebaseConfig : {
	apiKey: "demo-api-key",
	authDomain: "demo.firebaseapp.com",
	projectId: "demo-project",
	storageBucket: "demo.appspot.com",
	messagingSenderId: "000000000000",
	appId: "1:000000000000:web:000000000000"
};
var app = getApps().length > 0 ? getApp() : initializeApp(effectiveConfig);
var db = isFirebaseConfigured && firebaseConfig.firestoreDatabaseId ? getFirestore(app, firebaseConfig.firestoreDatabaseId) : getFirestore(app);
var auth = getAuth(app);
var googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
var OperationType = /* @__PURE__ */ function(OperationType) {
	OperationType["CREATE"] = "create";
	OperationType["UPDATE"] = "update";
	OperationType["DELETE"] = "delete";
	OperationType["LIST"] = "list";
	OperationType["GET"] = "get";
	OperationType["WRITE"] = "write";
	return OperationType;
}({});
function handleFirestoreError(error, operationType, path) {
	const errInfo = {
		error: error instanceof Error ? error.message : String(error),
		authInfo: {
			userId: auth.currentUser?.uid ?? null,
			email: auth.currentUser?.email ?? null,
			emailVerified: auth.currentUser?.emailVerified ?? null,
			isAnonymous: auth.currentUser?.isAnonymous ?? null,
			tenantId: auth.currentUser?.tenantId ?? null,
			providerInfo: auth.currentUser?.providerData?.map((provider) => ({
				providerId: provider.providerId,
				email: provider.email
			})) ?? []
		},
		operationType,
		path
	};
	console.error("Firestore Error: ", JSON.stringify(errInfo));
	throw new Error(JSON.stringify(errInfo));
}
var connectionTested = false;
async function testConnection() {
	if (!isFirebaseConfigured || connectionTested || typeof window === "undefined") return;
	connectionTested = true;
	try {
		await getDocFromServer(doc(db, "test", "connection"));
	} catch (error) {
		if (error instanceof Error && error.message.includes("the client is offline")) console.error("Please check your Firebase configuration.");
	}
}
if (isFirebaseConfigured && typeof window !== "undefined") testConnection();
var DEMO_USER_KEY = "futuroute:demo-user";
var demoListeners = /* @__PURE__ */ new Set();
function makeDemoUser(email, displayName) {
	const cleanEmail = email.trim().toLowerCase() || "explorer@futuroute.local";
	const uid = `local-${cleanEmail.replace(/[^a-z0-9]/g, "-").slice(0, 48)}`;
	const name = displayName?.trim() || cleanEmail.split("@")[0]?.replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Explorer";
	return {
		uid,
		email: cleanEmail,
		displayName: name,
		emailVerified: true,
		isAnonymous: false,
		providerData: [],
		metadata: {},
		phoneNumber: null,
		photoURL: null,
		providerId: "local",
		refreshToken: "",
		tenantId: null,
		delete: async () => {},
		getIdToken: async () => "demo-token",
		getIdTokenResult: async () => ({
			authTime: (/* @__PURE__ */ new Date()).toISOString(),
			claims: {},
			expirationTime: new Date(Date.now() + 36e5).toISOString(),
			issuedAtTime: (/* @__PURE__ */ new Date()).toISOString(),
			signInProvider: "local",
			signInSecondFactor: null,
			token: "demo-token"
		}),
		reload: async () => {},
		toJSON: () => ({
			uid,
			email: cleanEmail,
			displayName: name
		})
	};
}
function readDemoUser() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(DEMO_USER_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed.email) return null;
		return makeDemoUser(parsed.email, parsed.displayName);
	} catch {
		return null;
	}
}
function writeDemoUser(u) {
	if (typeof window !== "undefined") try {
		if (u) localStorage.setItem(DEMO_USER_KEY, JSON.stringify({
			email: u.email,
			displayName: u.displayName
		}));
		else localStorage.removeItem(DEMO_USER_KEY);
	} catch {}
	demoListeners.forEach((cb) => cb(u));
}
var initialAuthResolved = false;
var authWaiters = [];
if (typeof window !== "undefined") if (isFirebaseConfigured) onAuthStateChanged(auth, (u) => {
	initialAuthResolved = true;
	while (authWaiters.length) authWaiters.shift()?.(u);
});
else initialAuthResolved = true;
function waitForAuthUser() {
	if (typeof window === "undefined") return Promise.resolve(null);
	if (!isFirebaseConfigured) return Promise.resolve(readDemoUser());
	if (initialAuthResolved) return Promise.resolve(auth.currentUser);
	return new Promise((resolve) => {
		authWaiters.push(resolve);
	});
}
function useUser() {
	const [user, setUser] = (0, import_react.useState)(() => !isFirebaseConfigured && typeof window !== "undefined" ? readDemoUser() : null);
	const [loading, setLoading] = (0, import_react.useState)(() => isFirebaseConfigured);
	(0, import_react.useEffect)(() => {
		if (!isFirebaseConfigured) {
			setUser(readDemoUser());
			setLoading(false);
			const listener = (u) => setUser(u);
			demoListeners.add(listener);
			return () => {
				demoListeners.delete(listener);
			};
		}
		const unsub = onAuthStateChanged(auth, (u) => {
			setUser(u);
			setLoading(false);
		});
		return () => unsub();
	}, []);
	const refreshUser = async () => {
		if (!isFirebaseConfigured) {
			const current = readDemoUser();
			setUser(current);
			return current;
		}
		if (!auth.currentUser) return null;
		await auth.currentUser.reload();
		await auth.currentUser.getIdToken(true);
		setUser({ ...auth.currentUser });
		return auth.currentUser;
	};
	return {
		user,
		loading,
		refreshUser
	};
}
function isUserAdmin(user) {
	return Boolean(user?.emailVerified && user?.email === "jaifray26csu290@ncuindia.edu");
}
function friendlyAuthError(error) {
	const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
	const msg = error instanceof Error ? error.message : String(error);
	switch (code) {
		case "auth/operation-not-allowed": return "Email/Password sign-in is not yet enabled in this project's Firebase Console (Authentication > Sign-in method > Email/Password). Please enable it there or continue with Google sign-in right away.";
		case "auth/email-already-in-use": return "An account with this email already exists. Try signing in instead.";
		case "auth/invalid-credential":
		case "auth/wrong-password":
		case "auth/user-not-found": return "Invalid email or password. Please check your details and try again.";
		case "auth/weak-password": return "Password should be at least 8 characters.";
		case "auth/invalid-email": return "Please enter a valid email address.";
		case "auth/popup-closed-by-user": return "Google sign-in window was closed before completing. Please try again.";
		case "auth/popup-blocked": return "Popup was blocked by your browser. Please allow popups for this site and try again.";
		case "auth/too-many-requests": return "Too many attempts. Please wait a moment and try again.";
		case "auth/expired-action-code":
		case "auth/invalid-action-code": return "This password reset link is invalid or has expired. Please request a new one.";
		default: return msg || "Authentication failed. Please try again.";
	}
}
async function signInWithGoogle() {
	if (!isFirebaseConfigured) {
		const demo = makeDemoUser("explorer@futuroute.local", "Student Explorer");
		writeDemoUser(demo);
		return demo;
	}
	return (await signInWithPopup(auth, googleProvider)).user;
}
async function registerWithEmail(email, password, displayName) {
	if (!isFirebaseConfigured) {
		const demo = makeDemoUser(email, displayName);
		writeDemoUser(demo);
		return demo;
	}
	const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
	if (displayName.trim()) await updateProfile(cred.user, { displayName: displayName.trim().slice(0, 100) });
	try {
		await sendEmailVerification(cred.user, { url: typeof window !== "undefined" ? `${window.location.origin}/auth` : "https://localhost:3000/auth" });
	} catch {}
	return cred.user;
}
async function signInWithEmail(email, password) {
	if (!isFirebaseConfigured) {
		const demo = makeDemoUser(email);
		writeDemoUser(demo);
		return demo;
	}
	return (await signInWithEmailAndPassword(auth, email.trim(), password)).user;
}
async function sendResetEmail(email) {
	if (!isFirebaseConfigured) return;
	await sendPasswordResetEmail(auth, email.trim(), { url: typeof window !== "undefined" ? `${window.location.origin}/reset-password` : "https://localhost:3000/reset-password" });
}
async function resendVerificationEmail() {
	if (!isFirebaseConfigured) return;
	if (!auth.currentUser) throw new Error("No signed-in user.");
	await sendEmailVerification(auth.currentUser);
}
async function verifyResetCode(oobCode) {
	if (!isFirebaseConfigured) return "explorer@futuroute.local";
	return verifyPasswordResetCode(auth, oobCode);
}
async function completePasswordReset(oobCode, newPassword) {
	if (!isFirebaseConfigured) return;
	await confirmPasswordReset(auth, oobCode, newPassword);
}
async function logoutUser() {
	if (!isFirebaseConfigured) {
		writeDemoUser(null);
		return;
	}
	await signOut(auth);
}
var safeNext = (n) => typeof n === "string" && n.startsWith("/") && !n.startsWith("//") ? n : "/dashboard";
var INTERESTS = [
	["sports", "Sports"],
	["football", "Football"],
	["cricket", "Cricket"],
	["gaming", "Gaming"],
	["technology", "Technology"],
	["ai", "Artificial Intelligence"],
	["business", "Business"],
	["entrepreneurship", "Entrepreneurship"],
	["music", "Music"],
	["art", "Art"],
	["design", "Design"],
	["history", "History"],
	["science", "Science"],
	["mathematics", "Mathematics"],
	["writing", "Writing"],
	["travel", "Travelling"],
	["healthcare", "Healthcare"],
	["law", "Law"],
	["media", "Media"],
	["environment", "Environment"],
	["social", "Social activities"]
];
var CAPABILITIES = [
	["leadership", "Leadership"],
	["communication", "Communication"],
	["creativity", "Creativity"],
	["analytical", "Analytical thinking"],
	["problem_solving", "Problem-solving"],
	["mathematics", "Mathematics"],
	["observation", "Observation"],
	["teamwork", "Teamwork"],
	["public_speaking", "Public speaking"],
	["writing", "Writing"],
	["research", "Research"],
	["fitness", "Physical fitness"],
	["organisation", "Organisation"],
	["critical_thinking", "Critical thinking"],
	["technical", "Technical skills"]
];
var SUBJECTS = [
	"Mathematics",
	"Physics",
	"Chemistry",
	"Biology",
	"Computer Science",
	"English",
	"Hindi / Regional language",
	"History",
	"Geography",
	"Economics",
	"Business Studies",
	"Accountancy",
	"Political Science",
	"Psychology",
	"Fine Arts",
	"Physical Education",
	"Environmental Studies",
	"Music"
];
var LEARNING_PREFERENCES = [
	"Video lessons",
	"Reading & guides",
	"Interactive courses",
	"Hands-on projects",
	"Mentorship & workshops",
	"Mixed self-paced"
];
//#endregion
export { waitForAuthUser as S, sendResetEmail as _, SUBJECTS as a, useUser as b, db as c, isFirebaseConfigured as d, isUserAdmin as f, safeNext as g, resendVerificationEmail as h, OperationType as i, friendlyAuthError as l, registerWithEmail as m, INTERESTS as n, auth as o, logoutUser as p, LEARNING_PREFERENCES as r, completePasswordReset as s, CAPABILITIES as t, handleFirestoreError as u, signInWithEmail as v, verifyResetCode as x, signInWithGoogle as y };
