import { l as __toESM, o as require_jsx_runtime, s as require_react } from "./useSelector-Cu7jxM-W.js";
import { n as toast } from "./dist-CnotZWgl.js";
import { i as SUBJECTS, n as INTERESTS, o as friendlyAuthError, r as LEARNING_PREFERENCES, t as CAPABILITIES, u as resendVerificationEmail } from "./auth-ByhFdEgm.js";
import { N as upsertUserProfile, c as getUserProfile } from "./db-BNKfCsrU.js";
import { a as actions, s as useApp } from "./careers-Da7lFkNP.js";
import { t as ArrowLeft } from "./arrow-left-CT5iacK5.js";
import { t as ArrowRight } from "./arrow-right-Bzry0KKp.js";
import { t as Check } from "./check-0L_Q9Hk-.js";
import { a as Glass, f as selectClass, n as Button, r as Chip, s as Notice } from "./ui-kit-BDOPC8gw.js";
//#region src/components/ProfileForm.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
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
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glass, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-text-2",
		children: "Loading your profile…"
	}) });
	const Sel = ({ k, opts, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1 text-sm",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			className: sel,
			value: d[k],
			onChange: (e) => set(k, e.target.value),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "",
				children: "Choose… (optional)"
			}), opts.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o }, o))]
		})]
	});
	const personalSection = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-display text-lg font-semibold",
		children: "1 · Personal Information"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid gap-4 sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-sm sm:col-span-2",
				children: ["Your Name *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: sel,
					value: d.displayName,
					onChange: (e) => set("displayName", e.target.value),
					placeholder: "e.g. Riya Verma"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
				k: "ageRange",
				opts: AGE,
				label: "Age range"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
				k: "educationLevel",
				opts: EDU,
				label: "Education level"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
				k: "stream",
				opts: STREAM,
				label: "Academic stream"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
				k: "academicYear",
				opts: YEAR,
				label: "Current academic year"
			})
		]
	})] });
	const interestsSection = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "font-display text-lg font-semibold",
			children: [
				"2 · Interests (",
				d.interests.length,
				" selected)"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Select as many as apply."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: INTERESTS.map(([id, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				active: d.interests.includes(id),
				onClick: () => toggle("interests", id),
				children: l
			}, id))
		})
	] });
	const capabilitiesSection = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-lg font-semibold",
					children: [
						"3 · Capabilities & Strengths (",
						d.capabilities.length,
						" selected)"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Pick skills and qualities you feel comfortable using or want to grow."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: CAPABILITIES.map(([id, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: d.capabilities.includes(id),
						onClick: () => toggle("capabilities", id),
						children: l
					}, id))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Current Skills & Growth Areas (optional)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Helps Career Compatibility & Simulator identify skills you already hold vs gaps to learn."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [COMMON_SKILLS.map((sk) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: d.currentSkills.includes(sk),
						onClick: () => toggle("currentSkills", sk),
						children: sk
					}, sk)), d.currentSkills.filter((sk) => !COMMON_SKILLS.includes(sk)).map((sk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						active: true,
						onClick: () => toggle("currentSkills", sk),
						children: [sk, " ×"]
					}, sk))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: addCustomSkill,
						children: "Add skill"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs font-medium text-text-2",
					children: "Areas you find challenging (optional — helps flag honest trade-offs):"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: COMMON_WEAKNESSES.map((wk) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: d.weaknesses.includes(wk),
						onClick: () => toggle("weaknesses", wk),
						children: wk
					}, wk))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold",
				children: "Favourite Subjects (optional)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: SUBJECTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: d.subjects.includes(s),
					onClick: () => toggle("subjects", s),
					children: s
				}, s))
			})] })
		]
	});
	const preferencesSection = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-display text-lg font-semibold",
		children: "4 · Preferences, Time & Goals"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid gap-4 sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sel, {
				k: "environment",
				opts: ENV,
				label: "Preferred working environment"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-sm",
				children: [
					"Weekly available time:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-medium text-cyan",
						children: [d.weeklyHours, " hours/week"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 1,
						max: 35,
						value: d.weeklyHours,
						onChange: (e) => set("weeklyHours", Number(e.target.value)),
						className: "mt-2 accent-[var(--cyan)]"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1 text-sm sm:col-span-2",
				children: ["Available learning budget (INR)", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [BUDGET.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						active: d.budget === b,
						onClick: () => set("budget", b),
						children: ["₹", b.toLocaleString("en-IN")]
					}, b)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-xs text-text-2",
						children: ["Custom ₹", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 0,
							className: `${sel} w-28`,
							value: d.budget,
							onChange: (e) => set("budget", Math.max(0, Number(e.target.value) || 0))
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 text-sm sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Learning preferences (multiple allowed)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: LEARNING_PREFERENCES.map((lp) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: d.learningPreferences.includes(lp),
						onClick: () => toggle("learningPreferences", lp),
						children: lp
					}, lp))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-sm",
				children: ["Short-term career ambition", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: sel,
					value: d.shortGoal,
					onChange: (e) => set("shortGoal", e.target.value),
					placeholder: "e.g. Build my first analytics project"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-sm",
				children: ["Long-term career ambition", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: sel,
					value: d.longGoal,
					onChange: (e) => set("longGoal", e.target.value),
					placeholder: "e.g. Work in sports performance or AI"
				})]
			})
		]
	})] });
	const financialSection = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-semibold",
			children: "5 · Financial Expectations & Study Investment (Optional)"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted-foreground",
			children: "Completely optional and skippable. Helps Futuroute compare indicative market ranges against your goals."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1 text-sm",
					children: ["Expected annual starting salary (INR)", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: sel,
						value: d.expectedStartingSalaryInr,
						onChange: (e) => set("expectedStartingSalaryInr", e.target.value === "" ? "" : Number(e.target.value)),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Choose or skip…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 3e5,
								children: "₹3,00,000 / yr (₹3 LPA)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 5e5,
								children: "₹5,00,000 / yr (₹5 LPA)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 8e5,
								children: "₹8,00,000 / yr (₹8 LPA)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 12e5,
								children: "₹12,00,000 / yr (₹12 LPA)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 18e5,
								children: "₹18,00,000 / yr (₹18 LPA)"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1 text-sm",
					children: ["Desired long-term annual salary (INR, 8+ yrs)", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: sel,
						value: d.desiredLongTermSalaryInr,
						onChange: (e) => set("desiredLongTermSalaryInr", e.target.value === "" ? "" : Number(e.target.value)),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Choose or skip…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 1e6,
								children: "₹10,00,000 / yr (₹10 LPA)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 18e5,
								children: "₹18,00,000 / yr (₹18 LPA)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 25e5,
								children: "₹25,00,000 / yr (₹25 LPA)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 4e6,
								children: "₹40,00,000 / yr (₹40 LPA)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 6e6,
								children: "₹60,00,000+ / yr (₹60+ LPA)"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1 text-sm",
					children: ["Preferred work location", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: sel,
						value: d.preferredWorkLocation,
						onChange: (e) => set("preferredWorkLocation", e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Choose or skip…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "India",
								children: "India"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Abroad",
								children: "Abroad"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Both",
								children: "Both India & Abroad"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1 text-sm",
					children: ["Willingness to invest in paid education / courses", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: sel,
						value: d.willingToInvestEducation,
						onChange: (e) => set("willingToInvestEducation", e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Choose or skip…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Yes",
								children: "Yes (degrees, bootcamps & certificates)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Limited / Free-first",
								children: "Limited / Free-first resources preferred"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "No",
								children: "No (₹0 free resources only)"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1 text-sm",
					children: ["Preferred multi-year education budget (INR, optional)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 0,
						className: sel,
						value: d.educationBudgetInr,
						onChange: (e) => set("educationBudgetInr", e.target.value === "" ? "" : Math.max(0, Number(e.target.value) || 0)),
						placeholder: "e.g. 50000 or 0"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1 text-sm",
					children: ["Willingness for higher education (Master's / PG / Licensing)", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: sel,
						value: d.willingHigherEducation,
						onChange: (e) => set("willingHigherEducation", e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Choose or skip…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Yes",
								children: "Yes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Maybe",
								children: "Maybe, depending on career fit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "No",
								children: "No — prefer entering workforce sooner"
							})
						]
					})]
				})
			]
		})
	] });
	const verificationBanner = !emailVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "warn",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your email is not yet verified. Cloud Firestore saves will sync once verified." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "h-8 min-h-8 px-2.5 text-xs",
					onClick: handleResend,
					children: "Resend email"
				}), onRefreshAuth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "soft",
					className: "h-8 min-h-8 px-2.5 text-xs",
					onClick: () => void onRefreshAuth(),
					children: "Refresh status"
				})]
			})]
		})
	});
	if (wizard) {
		const cur = WIZARD_STEPS[step];
		const handleWizardNext = () => {
			setErr("");
			if (step === 0 && !d.displayName.trim()) return setErr("Please enter your name before continuing.");
			if (step < WIZARD_STEPS.length - 1) setStep(step + 1);
			else save(true);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5",
			children: [
				verificationBanner,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2 text-xs text-text-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Step ",
								step + 1,
								" of ",
								WIZARD_STEPS.length,
								" — ",
								cur.title
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.round((step + 1) / WIZARD_STEPS.length * 100), "%"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 overflow-hidden rounded-full bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-brand transition-all",
								style: { width: `${(step + 1) / WIZARD_STEPS.length * 100}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: cur.help
						})
					]
				}),
				step === 0 && personalSection,
				step === 1 && interestsSection,
				step === 2 && capabilitiesSection,
				step === 3 && preferencesSection,
				step === 4 && financialSection,
				err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "warn",
					children: err
				}),
				info && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "success",
					children: info
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						disabled: step === 0,
						onClick: () => {
							setErr("");
							setStep(Math.max(0, step - 1));
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [step > 0 && step < WIZARD_STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => {
								setErr("");
								setStep(step + 1);
							},
							children: "Skip step"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleWizardNext,
							disabled: busy,
							children: busy ? "Saving…" : step === WIZARD_STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }),
								" ",
								submitLabel
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })] })
						})]
					})]
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			verificationBanner,
			personalSection,
			interestsSection,
			capabilitiesSection,
			preferencesSection,
			financialSection,
			err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "warn",
				children: err
			}),
			info && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "success",
				children: info
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => void save(false),
				disabled: busy,
				className: "h-11 px-6",
				children: busy ? "Saving…" : submitLabel
			}) })
		]
	});
}
//#endregion
export { ProfileForm as t };
