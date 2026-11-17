import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Glass, n as Button, p as selectClass, r as Chip, s as Notice } from "./ui-kit-BmqGm62i.mjs";
import { a as SUBJECTS, h as resendVerificationEmail, l as friendlyAuthError, n as INTERESTS, r as LEARNING_PREFERENCES, t as CAPABILITIES } from "./auth-Bjd81y0G.mjs";
import { N as upsertUserProfile, c as getUserProfile } from "./db-Cw3pFnIt.mjs";
import { i as actions, s as useApp } from "./careers-ChJ9jiL5.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as ArrowLeft, G as Check, Q as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProfileForm-Wiyq6d-N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/ProfileForm.tsx";
var AGE = [
	"Under 15",
	"15–17",
	"18–21",
	"22–25",
	"26+"
];
var EDU = [
	"Class 8–10",
	"Class 11–12",
	"Diploma",
	"Undergraduate",
	"Postgraduate",
	"Working / gap year"
];
var STREAM = [
	"Science (PCM)",
	"Science (PCB)",
	"Commerce",
	"Humanities / Arts",
	"Vocational",
	"Not decided / not applicable"
];
var YEAR = [
	"Year 1",
	"Year 2",
	"Year 3",
	"Year 4+",
	"Board exam year",
	"Graduated / gap year"
];
var ENV = [
	"Office / desk",
	"Outdoors / on the move",
	"Lab or studio",
	"Remote / from home",
	"With people (schools, clinics, events)",
	"No preference"
];
var BUDGET = [
	0,
	500,
	1e3,
	5e3
];
var sel = selectClass();
var COMMON_SKILLS = [
	"Python",
	"Excel / Spreadsheets",
	"HTML / CSS",
	"JavaScript",
	"SQL",
	"Figma / Design",
	"Public speaking",
	"Writing & editing",
	"Data analysis",
	"Video editing",
	"Accounting basics",
	"Project planning"
];
var COMMON_WEAKNESSES = [
	"Math-heavy theory",
	"Stage / public speaking",
	"Coding syntax",
	"Time consistency",
	"Long reading sessions",
	"Working under strict deadlines"
];
var EMPTY = {
	displayName: "",
	ageRange: "",
	educationLevel: "",
	stream: "",
	academicYear: "",
	subjects: [],
	interests: [],
	capabilities: [],
	currentSkills: [],
	weaknesses: [],
	environment: "",
	budget: 0,
	weeklyHours: 5,
	learningPreferences: [],
	shortGoal: "",
	longGoal: "",
	expectedStartingSalaryInr: "",
	desiredLongTermSalaryInr: "",
	preferredWorkLocation: "",
	willingToInvestEducation: "",
	educationBudgetInr: "",
	willingHigherEducation: ""
};
var WIZARD_STEPS = [
	{
		key: "personal",
		title: "Personal Information",
		help: "Tell us where you are in school or college. Only your name is required."
	},
	{
		key: "interests",
		title: "Your Interests",
		help: "Pick everything that sparks curiosity — sports, tech, arts, science, or society."
	},
	{
		key: "capabilities",
		title: "Skills, Strengths & Subjects",
		help: "Select strengths, current skills, and favourite school or college subjects."
	},
	{
		key: "preferences",
		title: "Time, Budget & Ambitions",
		help: "Optional preferences so roadmaps and learning plans fit your real life."
	},
	{
		key: "financial",
		title: "Financial Expectations (Optional)",
		help: "Optional — share salary expectations and study willingness to calibrate compatibility scores."
	}
];
function ProfileForm({ userId, email, defaultName, emailVerified = true, onRefreshAuth, submitLabel, wizard = false, onSaved }) {
	const { profile } = useApp();
	const [d, setD] = (0, import_react.useState)({
		...EMPTY,
		displayName: defaultName ?? ""
	});
	const [customSkillDraft, setCustomSkillDraft] = (0, import_react.useState)("");
	const [step, setStep] = (0, import_react.useState)(0);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	const [info, setInfo] = (0, import_react.useState)("");
	const set = (k, v) => setD((x) => ({
		...x,
		[k]: v
	}));
	const toggle = (k, v) => setD((x) => ({
		...x,
		[k]: x[k].includes(v) ? x[k].filter((y) => y !== v) : [...x[k], v]
	}));
	(0, import_react.useEffect)(() => {
		let alive = true;
		(async () => {
			try {
				const source = await getUserProfile(userId).catch(() => null) ?? profile;
				if (!alive) return;
				if (source) setD({
					displayName: source.displayName || defaultName || "",
					ageRange: source.ageRange ?? "",
					educationLevel: source.educationLevel ?? "",
					stream: source.stream ?? "",
					academicYear: source.academicYear ?? "",
					subjects: source.subjects ?? [],
					interests: source.interests ?? [],
					capabilities: source.capabilities ?? [],
					currentSkills: source.currentSkills ?? [],
					weaknesses: source.weaknesses ?? [],
					environment: source.environment ?? "",
					budget: source.budget ?? 0,
					weeklyHours: source.weeklyHours ?? 5,
					learningPreferences: source.learningPreferences ?? [],
					shortGoal: source.shortGoal ?? "",
					longGoal: source.longGoal ?? "",
					expectedStartingSalaryInr: typeof source.expectedStartingSalaryInr === "number" ? source.expectedStartingSalaryInr : "",
					desiredLongTermSalaryInr: typeof source.desiredLongTermSalaryInr === "number" ? source.desiredLongTermSalaryInr : "",
					preferredWorkLocation: source.preferredWorkLocation ?? "",
					willingToInvestEducation: source.willingToInvestEducation ?? "",
					educationBudgetInr: typeof source.educationBudgetInr === "number" ? source.educationBudgetInr : "",
					willingHigherEducation: source.willingHigherEducation ?? ""
				});
			} finally {
				if (alive) setLoading(false);
			}
		})();
		return () => {
			alive = false;
		};
	}, [userId]);
	const addCustomSkill = () => {
		const clean = customSkillDraft.trim();
		if (!clean) return;
		if (!d.currentSkills.includes(clean)) set("currentSkills", [...d.currentSkills, clean]);
		setCustomSkillDraft("");
	};
	async function save(allowEmptyInterests = false) {
		setErr("");
		setInfo("");
		if (!d.displayName.trim()) return setErr("Please add your name.");
		if (!allowEmptyInterests && (d.interests.length === 0 || d.capabilities.length === 0)) return setErr("Pick at least one interest and one capability (or adjust them anytime later).");
		setBusy(true);
		const localRecord = {
			uid: userId,
			displayName: d.displayName.trim(),
			email: email || void 0,
			ageRange: d.ageRange || void 0,
			educationLevel: d.educationLevel || void 0,
			stream: d.stream || void 0,
			academicYear: d.academicYear || void 0,
			subjects: d.subjects,
			interests: d.interests,
			capabilities: d.capabilities,
			currentSkills: d.currentSkills,
			weaknesses: d.weaknesses,
			environment: d.environment || void 0,
			budget: Math.max(0, Math.round(d.budget)),
			weeklyHours: Math.max(1, Math.min(40, Math.round(d.weeklyHours))),
			learningPreferences: d.learningPreferences,
			shortGoal: d.shortGoal.trim() || void 0,
			longGoal: d.longGoal.trim() || void 0,
			expectedStartingSalaryInr: d.expectedStartingSalaryInr !== "" ? Math.max(0, Number(d.expectedStartingSalaryInr)) : void 0,
			desiredLongTermSalaryInr: d.desiredLongTermSalaryInr !== "" ? Math.max(0, Number(d.desiredLongTermSalaryInr)) : void 0,
			preferredWorkLocation: d.preferredWorkLocation || void 0,
			willingToInvestEducation: d.willingToInvestEducation || void 0,
			educationBudgetInr: d.educationBudgetInr !== "" ? Math.max(0, Number(d.educationBudgetInr)) : void 0,
			willingHigherEducation: d.willingHigherEducation || void 0,
			onboarded: true
		};
		try {
			actions.setProfile(localRecord);
			if (emailVerified) {
				await upsertUserProfile(userId, localRecord);
				toast.success("Profile saved to your account");
			} else toast.success("Profile saved locally — verify your email to sync across devices");
			onSaved?.();
		} catch (x) {
			setErr(x instanceof Error ? x.message : "Couldn't save your profile. Please try again.");
		} finally {
			setBusy(false);
		}
	}
	async function handleResend() {
		try {
			await resendVerificationEmail();
			setInfo("Verification email sent. Click the link, then refresh your status.");
		} catch (x) {
			setErr(friendlyAuthError(x));
		}
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
		className: "text-sm text-text-2",
		children: "Loading your profile…"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 323,
		columnNumber: 9
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 322,
		columnNumber: 7
	}, this);
	const Sel = ({ k, opts, label }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
		className: "grid gap-1 text-sm",
		children: [label, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
			className: sel,
			value: d[k],
			onChange: (e) => set(k, e.target.value),
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
				value: "",
				children: "Choose… (optional)"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 340,
				columnNumber: 9
			}, this), opts.map((o) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: o }, o, false, {
				fileName: _jsxFileName,
				lineNumber: 342,
				columnNumber: 11
			}, this))]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 339,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 337,
		columnNumber: 5
	}, this);
	const personalSection = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
		className: "font-display text-lg font-semibold",
		children: "1 · Personal Information"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 350,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mt-4 grid gap-4 sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
				className: "grid gap-1 text-sm sm:col-span-2",
				children: ["Your Name *", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					className: sel,
					value: d.displayName,
					onChange: (e) => set("displayName", e.target.value),
					placeholder: "e.g. Riya Verma"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 354,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 352,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sel, {
				k: "ageRange",
				opts: AGE,
				label: "Age range"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 361,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sel, {
				k: "educationLevel",
				opts: EDU,
				label: "Education level"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 362,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sel, {
				k: "stream",
				opts: STREAM,
				label: "Academic stream"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 363,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sel, {
				k: "academicYear",
				opts: YEAR,
				label: "Current academic year"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 364,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 351,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 349,
		columnNumber: 5
	}, this);
	const interestsSection = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "font-display text-lg font-semibold",
			children: [
				"2 · Interests (",
				d.interests.length,
				" selected)"
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 371,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Select as many as apply."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 374,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: INTERESTS.map(([id, l]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
				active: d.interests.includes(id),
				onClick: () => toggle("interests", id),
				children: l
			}, id, false, {
				fileName: _jsxFileName,
				lineNumber: 377,
				columnNumber: 11
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 375,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 370,
		columnNumber: 5
	}, this);
	const capabilitiesSection = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-lg font-semibold",
					children: [
						"3 · Capabilities & Strengths (",
						d.capabilities.length,
						" selected)"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 388,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Pick skills and qualities you feel comfortable using or want to grow."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 391,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: CAPABILITIES.map(([id, l]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
						active: d.capabilities.includes(id),
						onClick: () => toggle("capabilities", id),
						children: l
					}, id, false, {
						fileName: _jsxFileName,
						lineNumber: 396,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 394,
					columnNumber: 9
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 387,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Current Skills & Growth Areas (optional)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 407,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Helps Career Compatibility & Simulator identify skills you already hold vs gaps to learn."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 410,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [COMMON_SKILLS.map((sk) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
						active: d.currentSkills.includes(sk),
						onClick: () => toggle("currentSkills", sk),
						children: sk
					}, sk, false, {
						fileName: _jsxFileName,
						lineNumber: 415,
						columnNumber: 13
					}, this)), d.currentSkills.filter((sk) => !COMMON_SKILLS.includes(sk)).map((sk) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
						active: true,
						onClick: () => toggle("currentSkills", sk),
						children: [sk, " ×"]
					}, sk, true, {
						fileName: _jsxFileName,
						lineNumber: 426,
						columnNumber: 15
					}, this))]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 413,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						value: customSkillDraft,
						onChange: (e) => setCustomSkillDraft(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								addCustomSkill();
							}
						},
						placeholder: "Add another skill (e.g. Canva, CAD, Tally)…",
						className: `${sel} max-w-xs`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 432,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						onClick: addCustomSkill,
						children: "Add skill"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 444,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 431,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-4 text-xs font-medium text-text-2",
					children: "Areas you find challenging (optional — helps flag honest trade-offs):"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 448,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: COMMON_WEAKNESSES.map((wk) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
						active: d.weaknesses.includes(wk),
						onClick: () => toggle("weaknesses", wk),
						children: wk
					}, wk, false, {
						fileName: _jsxFileName,
						lineNumber: 453,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 451,
					columnNumber: 9
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 406,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "font-display text-lg font-semibold",
				children: "Favourite Subjects (optional)"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 464,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: SUBJECTS.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
					active: d.subjects.includes(s),
					onClick: () => toggle("subjects", s),
					children: s
				}, s, false, {
					fileName: _jsxFileName,
					lineNumber: 467,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 465,
				columnNumber: 9
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 463,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 386,
		columnNumber: 5
	}, this);
	const preferencesSection = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
		className: "font-display text-lg font-semibold",
		children: "4 · Preferences, Time & Goals"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 478,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mt-4 grid gap-4 sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sel, {
				k: "environment",
				opts: ENV,
				label: "Preferred working environment"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 480,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
				className: "grid gap-1 text-sm",
				children: [
					"Weekly available time:",
					" ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-medium text-cyan",
						children: [d.weeklyHours, " hours/week"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 483,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "range",
						min: 1,
						max: 35,
						value: d.weeklyHours,
						onChange: (e) => set("weeklyHours", Number(e.target.value)),
						className: "mt-2 accent-[var(--cyan)]"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 484,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 481,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-1 text-sm sm:col-span-2",
				children: ["Available learning budget (INR)", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [BUDGET.map((b) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
						active: d.budget === b,
						onClick: () => set("budget", b),
						children: ["₹", b.toLocaleString("en-IN")]
					}, b, true, {
						fileName: _jsxFileName,
						lineNumber: 497,
						columnNumber: 15
					}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "flex items-center gap-2 text-xs text-text-2",
						children: ["Custom ₹", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "number",
							min: 0,
							className: `${sel} w-28`,
							value: d.budget,
							onChange: (e) => set("budget", Math.max(0, Number(e.target.value) || 0))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 503,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 501,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 495,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 493,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-2 text-sm sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Learning preferences (multiple allowed)" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 514,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-2",
					children: LEARNING_PREFERENCES.map((lp) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
						active: d.learningPreferences.includes(lp),
						onClick: () => toggle("learningPreferences", lp),
						children: lp
					}, lp, false, {
						fileName: _jsxFileName,
						lineNumber: 517,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 515,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 513,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
				className: "grid gap-1 text-sm",
				children: ["Short-term career ambition", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					className: sel,
					value: d.shortGoal,
					onChange: (e) => set("shortGoal", e.target.value),
					placeholder: "e.g. Build my first analytics project"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 529,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 527,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
				className: "grid gap-1 text-sm",
				children: ["Long-term career ambition", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					className: sel,
					value: d.longGoal,
					onChange: (e) => set("longGoal", e.target.value),
					placeholder: "e.g. Work in sports performance or AI"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 538,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 536,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 479,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 477,
		columnNumber: 5
	}, this);
	const financialSection = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "font-display text-lg font-semibold",
			children: "5 · Financial Expectations & Study Investment (Optional)"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 551,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "mt-1 text-xs text-muted-foreground",
			children: "Completely optional and skippable. Helps Futuroute compare indicative market ranges against your goals."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 554,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-4 grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "grid gap-1 text-sm",
					children: ["Expected annual starting salary (INR)", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						className: sel,
						value: d.expectedStartingSalaryInr,
						onChange: (e) => set("expectedStartingSalaryInr", e.target.value === "" ? "" : Number(e.target.value)),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "",
								children: "Choose or skip…"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 568,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: 3e5,
								children: "₹3,00,000 / yr (₹3 LPA)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 569,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: 5e5,
								children: "₹5,00,000 / yr (₹5 LPA)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 570,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: 8e5,
								children: "₹8,00,000 / yr (₹8 LPA)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 571,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: 12e5,
								children: "₹12,00,000 / yr (₹12 LPA)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 572,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: 18e5,
								children: "₹18,00,000 / yr (₹18 LPA)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 573,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 561,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 559,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "grid gap-1 text-sm",
					children: ["Desired long-term annual salary (INR, 8+ yrs)", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						className: sel,
						value: d.desiredLongTermSalaryInr,
						onChange: (e) => set("desiredLongTermSalaryInr", e.target.value === "" ? "" : Number(e.target.value)),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "",
								children: "Choose or skip…"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 586,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: 1e6,
								children: "₹10,00,000 / yr (₹10 LPA)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 587,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: 18e5,
								children: "₹18,00,000 / yr (₹18 LPA)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 588,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: 25e5,
								children: "₹25,00,000 / yr (₹25 LPA)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 589,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: 4e6,
								children: "₹40,00,000 / yr (₹40 LPA)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 590,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: 6e6,
								children: "₹60,00,000+ / yr (₹60+ LPA)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 591,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 579,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 577,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "grid gap-1 text-sm",
					children: ["Preferred work location", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						className: sel,
						value: d.preferredWorkLocation,
						onChange: (e) => set("preferredWorkLocation", e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "",
								children: "Choose or skip…"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 604,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "India",
								children: "India"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 605,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "Abroad",
								children: "Abroad"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 606,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "Both",
								children: "Both India & Abroad"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 607,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 597,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 595,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "grid gap-1 text-sm",
					children: ["Willingness to invest in paid education / courses", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						className: sel,
						value: d.willingToInvestEducation,
						onChange: (e) => set("willingToInvestEducation", e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "",
								children: "Choose or skip…"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 623,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "Yes",
								children: "Yes (degrees, bootcamps & certificates)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 624,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "Limited / Free-first",
								children: "Limited / Free-first resources preferred"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 625,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "No",
								children: "No (₹0 free resources only)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 626,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 613,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 611,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "grid gap-1 text-sm",
					children: ["Preferred multi-year education budget (INR, optional)", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "number",
						min: 0,
						className: sel,
						value: d.educationBudgetInr,
						onChange: (e) => set("educationBudgetInr", e.target.value === "" ? "" : Math.max(0, Number(e.target.value) || 0)),
						placeholder: "e.g. 50000 or 0"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 632,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 630,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "grid gap-1 text-sm",
					children: ["Willingness for higher education (Master's / PG / Licensing)", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						className: sel,
						value: d.willingHigherEducation,
						onChange: (e) => set("willingHigherEducation", e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "",
								children: "Choose or skip…"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 656,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "Yes",
								children: "Yes"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 657,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "Maybe",
								children: "Maybe, depending on career fit"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 658,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "No",
								children: "No — prefer entering workforce sooner"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 659,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 649,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 647,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 558,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 550,
		columnNumber: 5
	}, this);
	const verificationBanner = !emailVerified && /* @__PURE__ */ (void 0)(Notice, {
		tone: "warn",
		children: /* @__PURE__ */ (void 0)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (void 0)("span", { children: "Your email is not yet verified. Cloud Firestore saves will sync once verified." }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 669,
				columnNumber: 9
			}, this), /* @__PURE__ */ (void 0)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (void 0)(Button, {
					variant: "outline",
					className: "h-8 min-h-8 px-2.5 text-xs",
					onClick: handleResend,
					children: "Resend email"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 671,
					columnNumber: 11
				}, this), onRefreshAuth && /* @__PURE__ */ (void 0)(Button, {
					variant: "soft",
					className: "h-8 min-h-8 px-2.5 text-xs",
					onClick: () => void onRefreshAuth(),
					children: "Refresh status"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 675,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 670,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 668,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 667,
		columnNumber: 5
	}, this);
	if (wizard) {
		const cur = WIZARD_STEPS[step];
		const handleWizardNext = () => {
			setErr("");
			if (step === 0 && !d.displayName.trim()) return setErr("Please enter your name before continuing.");
			if (step < WIZARD_STEPS.length - 1) setStep(step + 1);
			else save(true);
		};
		return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-5",
			children: [
				verificationBanner,
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center justify-between gap-2 text-xs text-text-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
								"Step ",
								step + 1,
								" of ",
								WIZARD_STEPS.length,
								" — ",
								cur.title
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 707,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [Math.round((step + 1) / WIZARD_STEPS.length * 100), "%"] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 710,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 706,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-2 overflow-hidden rounded-full bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-full bg-brand transition-all",
								style: { width: `${(step + 1) / WIZARD_STEPS.length * 100}%` }
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 713,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 712,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-muted-foreground",
							children: cur.help
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 718,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 705,
					columnNumber: 9
				}, this),
				step === 0 && personalSection,
				step === 1 && interestsSection,
				step === 2 && capabilitiesSection,
				step === 3 && preferencesSection,
				step === 4 && financialSection,
				err && /* @__PURE__ */ (void 0)(Notice, {
					tone: "warn",
					children: err
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 727,
					columnNumber: 17
				}, this),
				info && /* @__PURE__ */ (void 0)(Notice, {
					tone: "success",
					children: info
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 728,
					columnNumber: 18
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "ghost",
						disabled: step === 0,
						onClick: () => {
							setErr("");
							setStep(Math.max(0, step - 1));
						},
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 739,
							columnNumber: 13
						}, this), " Back"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 731,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap gap-2",
						children: [step > 0 && step < WIZARD_STEPS.length - 1 && /* @__PURE__ */ (void 0)(Button, {
							variant: "ghost",
							onClick: () => {
								setErr("");
								setStep(step + 1);
							},
							children: "Skip step"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 743,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: handleWizardNext,
							disabled: busy,
							children: busy ? "Saving…" : step === WIZARD_STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 758,
									columnNumber: 19
								}, this),
								" ",
								submitLabel
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 757,
								columnNumber: 17
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: ["Next ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 762,
								columnNumber: 24
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 761,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 753,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 741,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 730,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 703,
			columnNumber: 7
		}, this);
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-5",
		children: [
			verificationBanner,
			personalSection,
			interestsSection,
			capabilitiesSection,
			preferencesSection,
			financialSection,
			err && /* @__PURE__ */ (void 0)(Notice, {
				tone: "warn",
				children: err
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 780,
				columnNumber: 15
			}, this),
			info && /* @__PURE__ */ (void 0)(Notice, {
				tone: "success",
				children: info
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 781,
				columnNumber: 16
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				onClick: () => void save(false),
				disabled: busy,
				className: "h-11 px-6",
				children: busy ? "Saving…" : submitLabel
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 783,
				columnNumber: 9
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 782,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 773,
		columnNumber: 5
	}, this);
}
//#endregion
export { ProfileForm as t };
