import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  confirmPasswordReset,
  verifyPasswordResetCode,
  type User,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "./firebase";

export type { User };

export const ADMIN_EMAIL = "jaifray26csu290@ncuindia.edu";

const DEMO_USER_KEY = "futuroute:demo-user";
const demoListeners = new Set<(u: User | null) => void>();

function makeDemoUser(email: string, displayName?: string): User {
  const cleanEmail = email.trim().toLowerCase() || "explorer@futuroute.local";
  const uid = `local-${cleanEmail.replace(/[^a-z0-9]/g, "-").slice(0, 48)}`;
  const name =
    displayName?.trim() ||
    cleanEmail
      .split("@")[0]
      ?.replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "Explorer";

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
      authTime: new Date().toISOString(),
      claims: {},
      expirationTime: new Date(Date.now() + 3600_000).toISOString(),
      issuedAtTime: new Date().toISOString(),
      signInProvider: "local",
      signInSecondFactor: null,
      token: "demo-token",
    }),
    reload: async () => {},
    toJSON: () => ({ uid, email: cleanEmail, displayName: name }),
  } as unknown as User;
}

function readDemoUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DEMO_USER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { email?: string; displayName?: string };
    if (!parsed.email) return null;
    return makeDemoUser(parsed.email, parsed.displayName);
  } catch {
    return null;
  }
}

function writeDemoUser(u: User | null) {
  if (typeof window !== "undefined") {
    try {
      if (u) {
        localStorage.setItem(
          DEMO_USER_KEY,
          JSON.stringify({ email: u.email, displayName: u.displayName }),
        );
      } else {
        localStorage.removeItem(DEMO_USER_KEY);
      }
    } catch {
      // storage blocked
    }
  }
  demoListeners.forEach((cb) => cb(u));
}

let initialAuthResolved = false;
const authWaiters: Array<(u: User | null) => void> = [];

if (typeof window !== "undefined") {
  if (isFirebaseConfigured) {
    onAuthStateChanged(auth, (u) => {
      initialAuthResolved = true;
      while (authWaiters.length) {
        const resolve = authWaiters.shift();
        resolve?.(u);
      }
    });
  } else {
    initialAuthResolved = true;
  }
}

export function waitForAuthUser(): Promise<User | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (!isFirebaseConfigured) return Promise.resolve(readDemoUser());
  if (initialAuthResolved) return Promise.resolve(auth.currentUser);
  return new Promise((resolve) => {
    authWaiters.push(resolve);
  });
}

export function useUser() {
  const [user, setUser] = useState<User | null>(() =>
    !isFirebaseConfigured && typeof window !== "undefined" ? readDemoUser() : null,
  );
  const [loading, setLoading] = useState(() => isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setUser(readDemoUser());
      setLoading(false);
      const listener = (u: User | null) => setUser(u);
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
    setUser({ ...auth.currentUser } as User);
    return auth.currentUser;
  };

  return { user, loading, refreshUser };
}

export function isUserAdmin(user: User | null | undefined): boolean {
  return Boolean(user?.emailVerified && user?.email === ADMIN_EMAIL);
}

export function friendlyAuthError(error: unknown): string {
  const code =
    error && typeof error === "object" && "code" in error
      ? String((error as { code?: unknown }).code)
      : "";
  const msg = error instanceof Error ? error.message : String(error);
  switch (code) {
    case "auth/operation-not-allowed":
      return "Email/Password sign-in is not yet enabled in this project's Firebase Console (Authentication > Sign-in method > Email/Password). Please enable it there or continue with Google sign-in right away.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try signing in instead.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password. Please check your details and try again.";
    case "auth/weak-password":
      return "Password should be at least 8 characters.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/popup-closed-by-user":
      return "Google sign-in window was closed before completing. Please try again.";
    case "auth/popup-blocked":
      return "Popup was blocked by your browser. Please allow popups for this site and try again.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/expired-action-code":
    case "auth/invalid-action-code":
      return "This password reset link is invalid or has expired. Please request a new one.";
    default:
      return msg || "Authentication failed. Please try again.";
  }
}

export async function signInWithGoogle() {
  if (!isFirebaseConfigured) {
    const demo = makeDemoUser("explorer@futuroute.local", "Student Explorer");
    writeDemoUser(demo);
    return demo;
  }
  const cred = await signInWithPopup(auth, googleProvider);
  return cred.user;
}

export async function registerWithEmail(email: string, password: string, displayName: string) {
  if (!isFirebaseConfigured) {
    const demo = makeDemoUser(email, displayName);
    writeDemoUser(demo);
    return demo;
  }
  const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
  if (displayName.trim()) {
    await updateProfile(cred.user, { displayName: displayName.trim().slice(0, 100) });
  }
  try {
    await sendEmailVerification(cred.user, {
      url:
        typeof window !== "undefined"
          ? `${window.location.origin}/auth`
          : "https://localhost:3000/auth",
    });
  } catch {
    // Verification email send may fail in restricted environments; UI handles resend.
  }
  return cred.user;
}

export async function signInWithEmail(email: string, password: string) {
  if (!isFirebaseConfigured) {
    const demo = makeDemoUser(email);
    writeDemoUser(demo);
    return demo;
  }
  const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
  return cred.user;
}

export async function sendResetEmail(email: string) {
  if (!isFirebaseConfigured) return;
  await sendPasswordResetEmail(auth, email.trim(), {
    url:
      typeof window !== "undefined"
        ? `${window.location.origin}/reset-password`
        : "https://localhost:3000/reset-password",
  });
}

export async function resendVerificationEmail() {
  if (!isFirebaseConfigured) return;
  if (!auth.currentUser) throw new Error("No signed-in user.");
  await sendEmailVerification(auth.currentUser);
}

export async function verifyResetCode(oobCode: string) {
  if (!isFirebaseConfigured) return "explorer@futuroute.local";
  return verifyPasswordResetCode(auth, oobCode);
}

export async function completePasswordReset(oobCode: string, newPassword: string) {
  if (!isFirebaseConfigured) return;
  await confirmPasswordReset(auth, oobCode, newPassword);
}

export async function logoutUser() {
  if (!isFirebaseConfigured) {
    writeDemoUser(null);
    return;
  }
  await signOut(auth);
}

export const safeNext = (n: unknown) =>
  typeof n === "string" && n.startsWith("/") && !n.startsWith("//") ? n : "/dashboard";

export const INTERESTS: [string, string][] = [
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
  ["social", "Social activities"],
];

export const CAPABILITIES: [string, string][] = [
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
  ["technical", "Technical skills"],
];

export const SUBJECTS = [
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
  "Music",
];

export const LEARNING_PREFERENCES = [
  "Video lessons",
  "Reading & guides",
  "Interactive courses",
  "Hands-on projects",
  "Mentorship & workshops",
  "Mixed self-paced",
];
