import { l as __toESM, o as require_jsx_runtime, s as require_react } from "./useSelector-Cu7jxM-W.js";
import { L as useNavigate } from "./auth-ByhFdEgm.js";
import { t as AppShell } from "./AppShell-BgEZmUVx.js";
import { a as actions, s as useApp } from "./careers-Da7lFkNP.js";
import { n as Route } from "./index-DW2YTfhy.js";
import { u as createLucideIcon } from "./careers-service-REWdQftI.js";
import { t as CircleCheck } from "./circle-check-kJboa0pm.js";
import { a as Glass, c as PageHeader, m as cn, n as Button, p as textareaClass, r as Chip, s as Notice } from "./ui-kit-BDOPC8gw.js";
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleX = createLucideIcon("circle-x", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "m15 9-6 6",
		key: "1uzhvr"
	}],
	["path", {
		d: "m9 9 6 6",
		key: "z0biqf"
	}]
]);
//#endregion
//#region src/routes/try.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CHALLENGES = [
	{
		id: "software",
		label: "Software Development",
		title: "Trace the loop",
		visual: "code",
		instructions: "Read the code below. What value does total have at the end?",
		options: [
			"10",
			"15",
			"5",
			"20"
		],
		correct: 1,
		explain: "The loop adds 1 + 2 + 3 + 4 + 5, so total ends at 15. Following code step by step like this is something developers do every day.",
		skills: [
			"Logical thinking",
			"Reading code",
			"Attention to detail"
		],
		reflection: "Did you work it out in your head, on paper, or by guessing?"
	},
	{
		id: "uiux",
		label: "UI/UX Design",
		title: "Spot the usability problem",
		visual: "ui",
		instructions: "Look at the sample sign-up form. What is the biggest usability problem?",
		options: [
			"The colours are too bright",
			"No labels, so users forget what each field is for",
			"The button is too big",
			"There are too few fields"
		],
		correct: 1,
		explain: "Placeholder-only fields disappear when you start typing, so people forget what goes where. The text is also low-contrast. Designers look for problems like these to help users.",
		skills: [
			"Empathy",
			"Observation",
			"Accessibility awareness"
		],
		reflection: "What other improvement would you make to this form?"
	},
	{
		id: "data",
		label: "Data Analytics",
		title: "Read the chart",
		visual: "chart",
		instructions: "This chart shows library visits each month at a sample college. What is the most reasonable conclusion?",
		options: [
			"Visits rise steadily all year",
			"Visits peak in the exam month (Apr) and drop in the holiday (May)",
			"Visits are random",
			"The library should close in May"
		],
		correct: 1,
		explain: "The data shows a clear peak and a drop. Guessing at causes (exams, holidays) is reasonable, but closing the library goes beyond what the data shows. Analysts keep conclusions in line with the evidence.",
		skills: [
			"Interpreting data",
			"Careful reasoning",
			"Communication"
		],
		reflection: "What extra data would help you be more confident?"
	},
	{
		id: "cyber",
		label: "Cybersecurity",
		title: "The suspicious message",
		instructions: "You get an SMS: “Your bank account will be blocked today. Verify now: bank-secure-kyc.co/login”. What is the safest action?",
		options: [
			"Click the link and log in quickly",
			"Reply asking if it's real",
			"Ignore the link and contact the bank through its official app or number",
			"Forward it to friends to warn them"
		],
		correct: 2,
		explain: "Urgency plus an unofficial link is a classic phishing sign. Checking through an official channel avoids the trap. Security analysts spot these patterns and teach others to stay safe.",
		skills: [
			"Threat recognition",
			"Calm decision-making",
			"Digital safety"
		],
		reflection: "Which detail made the message look suspicious to you?"
	},
	{
		id: "marketing",
		label: "Digital Marketing",
		title: "Pitch a campaign",
		instructions: "A local café wants more students on weekday afternoons. Choose an audience, then write a one-line campaign idea.",
		options: [
			"College students nearby",
			"Office workers",
			"Families with kids",
			"Tourists"
		],
		correct: null,
		explain: "There's no single right answer. Marketers match a message to an audience and then test it. For students, ideas like study-friendly Wi-Fi or a student-ID discount usually fit well.",
		skills: [
			"Audience thinking",
			"Copywriting",
			"Creativity"
		],
		reflection: "How would you measure whether your idea worked?"
	},
	{
		id: "football",
		label: "Sports & Football Analysis",
		title: "Read the halftime stats",
		visual: "pitch",
		instructions: "Your team has 64% possession and 11 shots, but 9 shots were taken from outside the box and you conceded 2 counter-attacks. What tactical adjustment makes the most sense?",
		options: [
			"Shoot even more often from 30 yards",
			"Work closer combinations into the box and keep one midfielder deeper for counter-press cover",
			"Tell defenders to join every corner kick with no cover",
			"Sub off the goalkeeper immediately"
		],
		correct: 1,
		explain: "High shot volume from long range usually yields low expected goals (xG), while leaving space behind exposes transitions. Football coaches and performance analysts pair stats with video to refine positioning.",
		skills: [
			"Tactical awareness",
			"Performance analysis",
			"Decision-making"
		],
		reflection: "Do you prefer breaking down match numbers or leading training on the pitch?"
	},
	{
		id: "business",
		label: "Business & Entrepreneurship",
		title: "Validate a student product",
		visual: "finance",
		instructions: "Before building a campus laundry-pickup app for 3 months, what is the smartest way to test whether students actually want it?",
		options: [
			"Spend ₹50,000 on flyers and a custom logo first",
			"Offer manual pickup slots via a simple form to 20 hostel students this weekend and observe repeat usage",
			"Wait until the app has 25 extra features",
			"Assume friends saying 'nice idea' guarantees paid orders"
		],
		correct: 1,
		explain: "Founders and product managers test core demand early using lightweight experiments before investing heavy time or capital.",
		skills: [
			"Customer discovery",
			"Resourcefulness",
			"Prioritisation"
		],
		reflection: "What question would you ask those first 20 students afterward?"
	},
	{
		id: "science",
		label: "Science & Research",
		title: "Check the study claim",
		visual: "lab",
		instructions: "A headline claims 'Drinking green tea doubles exam scores' based on a 12-person survey with no control group. How should a researcher respond?",
		options: [
			"Accept the headline as proven medical fact",
			"Point out the tiny sample size, lack of control group, and confusion between correlation and causation",
			"Claim green tea has zero biological compounds",
			"Share it immediately as advice"
		],
		correct: 1,
		explain: "Critical evaluation of sample size, study design, and confounding variables is the foundation of scientific, healthcare, and policy research.",
		skills: [
			"Critical thinking",
			"Scientific method",
			"Evidence evaluation"
		],
		reflection: "How would you design a fairer test with a control group?"
	}
];
function Visual({ v }) {
	if (v === "code") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
		className: "glass-soft overflow-x-auto p-4 font-mono text-sm text-turquoise",
		children: `let total = 0;\nfor (let i = 1; i <= 5; i++) {\n  total = total + i;\n}`
	});
	if (v === "ui") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xs rounded-2xl bg-muted p-5",
		"aria-label": "Sample sign-up form with placeholder-only fields and low-contrast text",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-center text-sm text-muted-foreground/60",
				children: "sign up"
			}),
			[
				"name",
				"email",
				"pass"
			].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 rounded-md border border-glass-border px-3 py-2 text-xs text-muted-foreground/50",
				children: p
			}, p)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 rounded-md bg-secondary py-2 text-center text-xs text-muted-foreground/60",
				children: "go"
			})
		]
	});
	if (v === "chart") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "glass-soft flex h-44 items-end gap-3 p-4",
		role: "img",
		"aria-label": "Bar chart: Jan 40, Feb 45, Mar 60, Apr 90, May 20, Jun 35",
		children: [
			["Jan", 40],
			["Feb", 45],
			["Mar", 60],
			["Apr", 90],
			["May", 20],
			["Jun", 35]
		].map(([m, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col items-center gap-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-text-2",
					children: n
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full rounded-t-md bg-brand",
					style: { height: `${n}%` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: m
				})
			]
		}, m))
	});
	if (v === "pitch") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-soft grid grid-cols-3 gap-3 p-4 text-center text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Possession"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl text-cyan",
				children: "64%"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Long-range shots"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl text-warning",
				children: "9 / 11"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Counters conceded"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl text-pink",
				children: "2 goals"
			})] })
		]
	});
	return null;
}
function TryPage() {
	const search = Route.useSearch();
	const nav = useNavigate();
	const { challenges } = useApp();
	const ch = CHALLENGES.find((c) => c.id === search.c) ?? CHALLENGES[0];
	const saved = challenges[ch.id];
	const [pick, setPick] = (0, import_react.useState)(null);
	const [idea, setIdea] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const [refl, setRefl] = (0, import_react.useState)("");
	const submitted = !!saved?.answer;
	const submit = () => {
		if (pick === null) return setErr("Choose an answer first.");
		if (ch.correct === null && idea.trim().length < 5) return setErr("Write a short campaign idea (at least a few words).");
		setErr("");
		const answer = ch.correct === null ? `${ch.options[pick]}: ${idea.trim()}` : ch.options[pick] ?? "";
		actions.setChallenge(ch.id, {
			answer,
			correct: ch.correct === null || pick === ch.correct,
			at: Date.now()
		}, `Completed the ${ch.label} challenge`);
	};
	const select = (id) => {
		setPick(null);
		setIdea("");
		setErr("");
		setRefl("");
		nav({
			to: "/try",
			search: { c: id }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Mini challenges",
			title: "Try Before You Choose",
			text: "Five-minute tasks across 8 fields that give you a feel for real work. Notice what engages your curiosity."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 flex flex-wrap gap-2",
			children: CHALLENGES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
				active: c.id === ch.id,
				onClick: () => select(c.id),
				children: [challenges[c.id]?.answer ? "✓ " : "", c.label]
			}, c.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 xl:grid-cols-[1.4fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-wider text-cyan",
					children: ch.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl font-semibold",
					children: ch.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-text-2",
					children: ch.instructions
				}),
				ch.visual && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Visual, { v: ch.visual })
				}),
				submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: saved.correct ? "success" : "warn",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-start gap-2",
								children: [saved.correct ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Your answer: ",
									saved.answer,
									".",
									" ",
									ch.correct !== null && !saved.correct && `A better answer: ${ch.options[ch.correct]}.`
								] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-text-2",
							children: ch.explain
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => {
								actions.setChallenge(ch.id, {
									answer: "",
									correct: false
								});
								setPick(null);
							},
							children: "Try again"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "sr-only",
							children: "Answer options"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2",
							children: ch.options.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": pick === i,
								onClick: () => setPick(i),
								className: cn("rounded-xl border px-4 py-3 text-left text-sm transition", pick === i ? "border-lavender/60 bg-lavender/20" : "border-glass-border bg-secondary hover:bg-accent"),
								children: o
							}, o))
						}),
						ch.correct === null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "idea",
								className: "mb-1.5 block text-sm text-text-2",
								children: "Your campaign idea"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "idea",
								value: idea,
								onChange: (e) => setIdea(e.target.value),
								rows: 3,
								maxLength: 300,
								className: textareaClass(),
								placeholder: "e.g. “Study Hour: free refills 2–5pm with student ID”"
							})]
						}),
						err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
								tone: "warn",
								children: err
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-4",
							onClick: submit,
							children: "Submit answer"
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-semibold",
					children: "Skills involved"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: ch.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: s }, s))
				})] }), submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-semibold",
						children: "Did you enjoy this activity?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							["enjoyed", "Enjoyed it"],
							["okay", "It was okay"],
							["not", "Not for me"]
						].map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: saved.enjoy === v,
							onClick: () => actions.setChallenge(ch.id, { enjoy: v }),
							children: l
						}, v))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						htmlFor: "refl",
						className: "mt-5 block text-sm text-text-2",
						children: ["Optional reflection: ", ch.reflection]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "refl",
						rows: 3,
						maxLength: 500,
						value: refl || saved.reflection || "",
						onChange: (e) => setRefl(e.target.value),
						className: textareaClass("mt-2")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "soft",
						className: "mt-2",
						onClick: () => actions.setChallenge(ch.id, { reflection: refl.trim() }),
						disabled: !refl.trim(),
						children: "Save reflection"
					}),
					saved.reflection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-success",
						children: "Reflection saved."
					})
				] })]
			})]
		})
	] });
}
//#endregion
export { TryPage as component };
