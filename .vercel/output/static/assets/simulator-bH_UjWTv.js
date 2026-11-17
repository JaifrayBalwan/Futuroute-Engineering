import { l as __toESM, o as require_jsx_runtime, s as require_react } from "./useSelector-Cu7jxM-W.js";
import { n as toast } from "./dist-CnotZWgl.js";
import { I as Link, L as useNavigate } from "./auth-ByhFdEgm.js";
import { d as ArrowLeftRight, n as Wallet, t as AppShell } from "./AppShell-BgEZmUVx.js";
import { a as actions, r as getCareer, s as useApp, t as CAREERS } from "./careers-Da7lFkNP.js";
import { r as Route } from "./index-DW2YTfhy.js";
import { i as X, o as Map, r as useCareersCatalog, u as createLucideIcon } from "./careers-service-REWdQftI.js";
import { t as ArrowRight } from "./arrow-right-Bzry0KKp.js";
import { t as CircleCheck } from "./circle-check-kJboa0pm.js";
import { t as Clock } from "./clock-CaH_y0_w.js";
import { t as Plus } from "./plus-Vx67vOmi.js";
import { t as Sparkles } from "./sparkles-WxdkWloa.js";
import { t as Trash2 } from "./trash-2-CZ9EJ6gF.js";
import { a as Glass, c as PageHeader, d as inputClass, f as selectClass, l as ProgressRing, n as Button, r as Chip, s as Notice, u as btnClass } from "./ui-kit-BDOPC8gw.js";
import { a as getCareerInsight, o as splitSkills, r as formatAmountFromInr } from "./career-insights-DY2zFBVx.js";
import { r as scoreCatalogItemForCareer, t as BUDGET_CATALOG } from "./budget-catalog-DyJU729V.js";
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var GraduationCap = createLucideIcon("graduation-cap", [
	["path", {
		d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
		key: "j76jl0"
	}],
	["path", {
		d: "M22 10v6",
		key: "1lu8f3"
	}],
	["path", {
		d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5",
		key: "1r8lef"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Rocket = createLucideIcon("rocket", [
	["path", {
		d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
		key: "qeys4"
	}],
	["path", {
		d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",
		key: "u4xsad"
	}],
	["path", {
		d: "M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",
		key: "676m9"
	}],
	["path", {
		d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05",
		key: "92ym6u"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Save = createLucideIcon("save", [
	["path", {
		d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
		key: "1c8476"
	}],
	["path", {
		d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
		key: "1ydtos"
	}],
	["path", {
		d: "M7 3v4a1 1 0 0 0 1 1h7",
		key: "t51u73"
	}]
]);
//#endregion
//#region src/lib/simulator.ts
var import_react = /* @__PURE__ */ __toESM(require_react());
var BACKGROUND_STREAM_PRESETS = {
	"student-beginner": {
		label: "I am a student / beginner (starting fresh)",
		skills: [
			"Digital literacy",
			"Communication",
			"Basic research",
			"Time management"
		],
		capabilities: [
			"curiosity",
			"teamwork",
			"communication"
		]
	},
	"stream-pcm": {
		label: "Science (PCM — Maths, Physics, CS background)",
		skills: [
			"Mathematics",
			"Logical reasoning",
			"Problem-solving",
			"Basic programming"
		],
		capabilities: [
			"analytical",
			"problem_solving",
			"mathematics"
		]
	},
	"stream-pcb": {
		label: "Science (PCB — Biology, Chemistry background)",
		skills: [
			"Scientific observation",
			"Laboratory basics",
			"Report writing",
			"Data logging"
		],
		capabilities: [
			"observation",
			"research",
			"critical_thinking"
		]
	},
	"stream-commerce": {
		label: "Commerce (Accounting, Economics, Business)",
		skills: [
			"Spreadsheets",
			"Financial literacy",
			"Economics basics",
			"Business communication"
		],
		capabilities: [
			"analytical",
			"organisation",
			"communication"
		]
	},
	"stream-humanities": {
		label: "Humanities / Arts (Writing, History, Psychology)",
		skills: [
			"Essay writing",
			"Critical reading",
			"Qualitative research",
			"Storytelling"
		],
		capabilities: [
			"writing",
			"communication",
			"critical_thinking",
			"creativity"
		]
	},
	"stream-diploma": {
		label: "Polytechnic / Vocational Diploma holder",
		skills: [
			"Hands-on troubleshooting",
			"Technical documentation",
			"Workflow execution"
		],
		capabilities: [
			"technical",
			"problem_solving",
			"organisation"
		]
	}
};
function tokenizeList(items) {
	const out = /* @__PURE__ */ new Set();
	for (const item of items) {
		const low = item.trim().toLowerCase();
		if (!low) continue;
		out.add(low);
		for (const part of low.split(/[\s/,&-]+/)) if (part.length >= 3) out.add(part);
	}
	return out;
}
function simulateCareerTransition(input, catalog = CAREERS) {
	const target = getCareer(input.targetCareerId, catalog) ?? catalog[0] ?? CAREERS[0];
	const isPreset = input.currentBackground in BACKGROUND_STREAM_PRESETS;
	const preset = isPreset ? BACKGROUND_STREAM_PRESETS[input.currentBackground] : void 0;
	const sourceCareer = !isPreset ? getCareer(input.currentBackground, catalog) : void 0;
	const currentLabel = preset ? preset.label : sourceCareer ? sourceCareer.name : "General background";
	const combinedSourceSkills = Array.from(/* @__PURE__ */ new Set([
		...preset?.skills ?? [],
		...sourceCareer?.skills ?? [],
		...input.currentSkills.map((s) => s.trim()).filter(Boolean)
	]));
	const sourceCapabilities = Array.from(/* @__PURE__ */ new Set([...preset?.capabilities ?? [], ...sourceCareer?.capabilities ?? []]));
	const sourceTokens = tokenizeList([...combinedSourceSkills, ...sourceCapabilities]);
	const { technical: targetTech, soft: targetSoft } = splitSkills(target);
	const existingRelevantSkills = [];
	const missingTechnicalSkills = [];
	for (const skill of targetTech) {
		const words = skill.toLowerCase().split(/[\s/,&-]+/).filter((w) => w.length >= 3);
		if (sourceTokens.has(skill.toLowerCase()) || words.some((w) => sourceTokens.has(w))) existingRelevantSkills.push(skill);
		else missingTechnicalSkills.push(skill);
	}
	const transferableSkills = [];
	const missingSoftSkills = [];
	for (const sSkill of targetSoft) {
		const words = sSkill.toLowerCase().split(/[\s/,&-]+/).filter((w) => w.length >= 3);
		if (sourceTokens.has(sSkill.toLowerCase()) || words.some((w) => sourceTokens.has(w))) transferableSkills.push(sSkill);
		else missingSoftSkills.push(sSkill);
	}
	for (const cap of target.capabilities) {
		const readable = cap.replace(/_/g, " ");
		const capPretty = readable.charAt(0).toUpperCase() + readable.slice(1);
		if (sourceCapabilities.includes(cap) && !transferableSkills.includes(capPretty)) transferableSkills.push(capPretty);
	}
	const sameIndustry = sourceCareer?.industry === target.industry;
	const overlapRatio = (existingRelevantSkills.length + transferableSkills.length * .6) / Math.max(1, targetTech.length + targetSoft.length * .6);
	const qualLow = input.previousQualifications.toLowerCase();
	const minEduLow = target.minEducation.toLowerCase();
	const hasDegree = qualLow.includes("bachelor") || qualLow.includes("b.tech") || qualLow.includes("degree") || qualLow.includes("master") || qualLow.includes("undergraduate") || qualLow.includes("postgraduate");
	const missingQualifications = [];
	if (minEduLow.includes("master") && !qualLow.includes("master") && !qualLow.includes("postgrad")) missingQualifications.push(`Target usually asks for ${target.minEducation} — check whether a specialist postgraduate degree or equivalent track is needed.`);
	else if ((minEduLow.includes("bachelor") || minEduLow.includes("degree") || minEduLow.includes("ll.b")) && !hasDegree) missingQualifications.push(`Recommended academic qualification: ${target.minEducation}. Alternative skill-portfolio routes: ${target.altRoutes[0] ?? "Verified portfolio + internships"}.`);
	const rawScore = 32 + overlapRatio * 42 + (sameIndustry ? 14 : 0) + (missingQualifications.length === 0 ? 10 : 0) + Math.min(8, input.weeklyHours * .5);
	const compatibilityScore = Math.max(15, Math.min(96, Math.round(rawScore)));
	const transitionDifficulty = compatibilityScore >= 72 ? "Smooth" : compatibilityScore >= 48 ? "Moderate" : "Major Pivot";
	const weeklyHours = Math.max(1, Math.min(50, Math.round(input.weeklyHours || 6)));
	const skillHoursNeeded = missingTechnicalSkills.length * 16 + missingSoftSkills.length * 6 + target.commitmentLevel * 12;
	const discountFactor = sameIndustry ? .75 : existingRelevantSkills.length >= 2 ? .85 : 1;
	const estimatedTotalHours = Math.max(30, Math.round(skillHoursNeeded * discountFactor));
	const estimatedWeeks = Math.max(4, Math.ceil(estimatedTotalHours / weeklyHours));
	const withinPreferredTimeline = estimatedWeeks <= Math.max(4, Math.round(input.preferredTimelineMonths * 4.3));
	const budgetCap = Math.max(0, Math.round(input.budgetInr || 0));
	const rankedCatalog = [...BUDGET_CATALOG].map((item) => ({
		item,
		score: scoreCatalogItemForCareer(item, target, existingRelevantSkills.length >= 2 ? "some" : "beginner")
	})).sort((a, b) => b.score - a.score || a.item.estimatedCostInr - b.item.estimatedCostInr).map((x) => x.item);
	const chosenItems = [];
	let spend = 0;
	for (const item of rankedCatalog) {
		if (chosenItems.length >= 3) break;
		if (spend + item.estimatedCostInr <= budgetCap) {
			chosenItems.push(item);
			spend += item.estimatedCostInr;
		}
	}
	const insight = getCareerInsight(target);
	return {
		currentLabel,
		targetCareer: target,
		compatibilityScore,
		transitionDifficulty,
		existingRelevantSkills,
		transferableSkills,
		missingTechnicalSkills,
		missingSoftSkills,
		missingQualifications,
		certificationsRequired: [...target.pathways.slice(0, 2), ...target.altRoutes.slice(0, 1)],
		estimatedTotalHours,
		estimatedWeeks,
		withinPreferredTimeline,
		recommendedSequence: [
			`1. Bridge transfer: anchor on your ${transferableSkills.slice(0, 2).join(" & ") || "core problem-solving"} while scoping ${target.name} expectations.`,
			missingTechnicalSkills.length > 0 ? `2. Core gap closure: prioritize ${missingTechnicalSkills.slice(0, 3).join(", ")} using verified open courses (${target.resources[0]?.name ?? "free online modules"}).` : `2. Deepen domain fluency across ${target.skills.slice(0, 3).join(", ")}.`,
			`3. Hands-on proof: complete 1–2 portfolio artifacts (${target.projects.slice(0, 2).join("; ")}).`,
			`4. Market readiness: prepare resume & applications targeting ${insight.jobOpportunities.typicalTitles[0] ?? target.progression[0] ?? `Junior ${target.name}`}.`
		],
		estimatedExpensesInr: {
			totalRecommended: spend,
			withinBudget: spend <= budgetCap,
			items: chosenItems,
			freeTrackNote: budgetCap === 0 ? `₹0 free-first transition plan using ${target.resources.map((r) => r.name).join(", ")}.` : `Estimated optional spend of ₹${spend.toLocaleString("en-IN")} within your ₹${budgetCap.toLocaleString("en-IN")} budget.`
		},
		recommendedProjects: target.projects,
		entryLevelJobRoles: Array.from(/* @__PURE__ */ new Set([target.progression[0] ?? `Trainee ${target.name}`, ...insight.jobOpportunities.typicalTitles.slice(0, 2)])),
		disclaimer: "Transition compatibility & duration are rule-based planning estimates; real timelines vary with project depth, mentoring, and hiring cycles."
	};
}
function buildTransitionRoadmap(sim, weeklyHours, budgetInr) {
	const c = sim.targetCareer;
	const hrs = Math.max(1, weeklyHours || 6);
	const uid = `tr-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`;
	let cumHours = 0;
	const mkTask = (phase, title, desc, hours, difficulty, objectives, practicalTask, resIdx = 0) => {
		cumHours += hours;
		const week = Math.max(1, Math.ceil(cumHours / hrs));
		const mainRes = c.resources[resIdx] ?? c.resources[0];
		const altRes = c.resources[resIdx + 1] ?? c.resources[0];
		return {
			id: `${phase}-${title}-${uid}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-").slice(0, 96),
			phase,
			week,
			title,
			desc,
			effort: `${hours} h · ~${Math.max(1, Math.ceil(hours / hrs))} wk`,
			objectives,
			difficulty,
			practicalTask,
			resource: mainRes ? {
				name: mainRes.name,
				url: mainRes.url
			} : void 0,
			freeAlternative: altRes ? {
				name: altRes.name,
				url: altRes.url
			} : void 0,
			done: false
		};
	};
	const gap0 = sim.missingTechnicalSkills[0] ?? c.skills[0] ?? "Domain fundamentals";
	const gap1 = sim.missingTechnicalSkills[1] ?? c.skills[1] ?? "Core workflows";
	const gap2 = sim.missingTechnicalSkills[2] ?? c.skills[2] ?? "Applied execution";
	const tasks = [
		mkTask(1, `Map transferable strengths from ${sim.currentLabel}`, `Audit how your existing skills (${sim.transferableSkills.slice(0, 3).join(", ") || "problem-solving"}) transfer into ${c.name}.`, 4, "Beginner", ["Identify 3 overlapping workflows between your current path and target role", "Try the 15-minute practical career starter trial"], c.trial, 0),
		mkTask(2, `Bridge priority gap: ${gap0}`, `Close your first missing technical area (${gap0}) with structured open curriculum.`, 12, "Beginner", [`Grasp core terminology and tools in ${gap0}`, "Complete 2 guided starter exercises"], `Publish a short walkthrough or mini-exercise demonstrating ${gap0}.`, 0),
		mkTask(2, `Bridge priority gap: ${gap1}`, `Build hands-on confidence in ${gap1} using free documentation and interactive drills.`, 14, "Intermediate", [`Apply ${gap1} to realistic sample data or briefs`, "Document common mistakes and fixes"], `Solve one real-world scenario problem using ${gap1}.`, 1),
		mkTask(3, `Master ${gap2} & workflow standards`, `Combine ${gap0}, ${gap1}, and ${gap2} in an end-to-end intermediate workflow.`, 14, "Intermediate", [`Connect ${gap2} into quality-checked deliverables`, "Follow standard conventions in " + c.industry], "Review two public case studies or open portfolios in this role.", 2),
		mkTask(4, `Build transition portfolio project: ${sim.recommendedProjects[0] ?? c.projects[0] ?? c.trial}`, "Demonstrate job readiness to recruiters even without prior titles in this field.", 18, "Advanced", ["Scope problem statement, execution steps, and measurable outcome", "Request review feedback from a peer or mentor"], `Ship a polished case study for “${sim.recommendedProjects[0] ?? c.projects[0] ?? c.trial}”.`, 0),
		mkTask(5, `Transition positioning & ${sim.entryLevelJobRoles[0] ?? c.name} applications`, `Tailor your CV/LinkedIn to highlight transferable skills and target ${sim.entryLevelJobRoles.join(", ")}.`, 8, "Intermediate", ["Reframe prior experience around outcomes relevant to " + c.industry, "Apply to 3–5 beginner/intern or transition-friendly roles via Opportunity Finder"], "Draft an outreach & portfolio summary linking your transition project.", 0)
	];
	return {
		id: `rm-${uid}`,
		careerId: c.id,
		title: `${c.name} Transition Roadmap`,
		level: sim.existingRelevantSkills.length >= 2 ? "some" : "beginner",
		hours: hrs,
		budget: Math.max(0, Math.round(budgetInr)),
		format: "mixed",
		project: sim.recommendedProjects[0] ?? c.projects[0] ?? c.trial,
		weeks: Math.max(4, tasks[tasks.length - 1]?.week ?? sim.estimatedWeeks),
		createdAt: Date.now(),
		tasks
	};
}
//#endregion
//#region src/routes/simulator.tsx?tsr-split=component
var import_jsx_runtime = require_jsx_runtime();
var QUALIFICATION_OPTIONS = [
	"Class 10 / Secondary",
	"Class 12 / Senior Secondary",
	"Vocational / Polytechnic Diploma",
	"Undergraduate degree (Bachelor's)",
	"Postgraduate degree (Master's / MBA / PhD)",
	"Self-taught / Certificate track"
];
var BUDGET_PRESETS = [
	0,
	500,
	1e3,
	2e3,
	5e3,
	15e3
];
var TIMELINE_OPTIONS = [
	3,
	6,
	9,
	12,
	18,
	24
];
var SUGGESTED_QUICK_SKILLS = [
	"Communication",
	"Spreadsheets",
	"Python",
	"SQL",
	"Design thinking",
	"Writing",
	"Mathematics",
	"Project planning",
	"Public speaking",
	"Data analysis"
];
function CareerSimulatorPage() {
	const { careers } = useCareersCatalog();
	const s = useApp();
	const search = Route.useSearch();
	const nav = useNavigate();
	const sortedCareers = (0, import_react.useMemo)(() => [...careers].sort((a, b) => a.name.localeCompare(b.name)), [careers]);
	const [currentBackground, setCurrentBackground] = (0, import_react.useState)("student-beginner");
	const [targetCareerId, setTargetCareerId] = (0, import_react.useState)(() => {
		if (search.target && careers.some((c) => c.id === search.target)) return search.target;
		return "data-analyst";
	});
	(0, import_react.useEffect)(() => {
		if (search.target && careers.some((c) => c.id === search.target)) setTargetCareerId(search.target);
	}, [search.target, careers]);
	const [currentSkills, setCurrentSkills] = (0, import_react.useState)(() => s.profile?.currentSkills?.length ? s.profile.currentSkills : ["Communication", "Problem-solving"]);
	const [skillDraft, setSkillDraft] = (0, import_react.useState)("");
	const [previousQualifications, setPreviousQualifications] = (0, import_react.useState)(() => {
		const edu = s.profile?.educationLevel;
		if (edu === "Undergraduate") return "Undergraduate degree (Bachelor's)";
		if (edu === "Postgraduate") return "Postgraduate degree (Master's / MBA / PhD)";
		if (edu === "Diploma") return "Vocational / Polytechnic Diploma";
		return "Class 12 / Senior Secondary";
	});
	const [weeklyHours, setWeeklyHours] = (0, import_react.useState)(() => s.profile?.weeklyHours ?? 6);
	const [budgetInr, setBudgetInr] = (0, import_react.useState)(() => s.profile?.budget ?? 1e3);
	const [preferredTimelineMonths, setPreferredTimelineMonths] = (0, import_react.useState)(6);
	const [creatingRoadmap, setCreatingRoadmap] = (0, import_react.useState)(false);
	const [savingSim, setSavingSim] = (0, import_react.useState)(false);
	const sim = (0, import_react.useMemo)(() => simulateCareerTransition({
		currentBackground,
		currentSkills,
		previousQualifications,
		targetCareerId,
		weeklyHours,
		budgetInr,
		preferredTimelineMonths
	}, careers), [
		currentBackground,
		currentSkills,
		previousQualifications,
		targetCareerId,
		weeklyHours,
		budgetInr,
		preferredTimelineMonths,
		careers
	]);
	const addSkill = (raw) => {
		const cleaned = raw.trim();
		if (!cleaned) return;
		if (currentSkills.some((x) => x.toLowerCase() === cleaned.toLowerCase())) {
			setSkillDraft("");
			return;
		}
		setCurrentSkills((prev) => [...prev, cleaned].slice(0, 18));
		setSkillDraft("");
	};
	const removeSkill = (skill) => {
		setCurrentSkills((prev) => prev.filter((x) => x !== skill));
	};
	const handleGenerateRoadmap = async () => {
		setCreatingRoadmap(true);
		try {
			const rm = buildTransitionRoadmap(sim, weeklyHours, budgetInr);
			await actions.addRoadmap(rm, sim.targetCareer.name);
			toast.success(`5-phase transition roadmap created for ${sim.targetCareer.name}`);
			nav({ to: "/roadmap" });
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Could not generate transition roadmap");
		} finally {
			setCreatingRoadmap(false);
		}
	};
	const handleSaveAnalysis = async () => {
		setSavingSim(true);
		try {
			await actions.addTransition({
				currentRole: sim.currentLabel,
				targetCareerId: sim.targetCareer.id,
				targetCareerName: sim.targetCareer.name,
				existingSkills: [...sim.existingRelevantSkills, ...sim.transferableSkills],
				missingSkills: [...sim.missingTechnicalSkills, ...sim.missingSoftSkills],
				compatibilityScore: sim.compatibilityScore,
				estimatedWeeks: sim.estimatedWeeks,
				budgetInr,
				weeklyHours
			});
			toast.success("Transition analysis saved to your account");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Could not save transition analysis");
		} finally {
			setSavingSim(false);
		}
	};
	const difficultyTone = sim.transitionDifficulty === "Smooth" ? "border-success/40 bg-success/15 text-success" : sim.transitionDifficulty === "Moderate" ? "border-cyan/40 bg-cyan/15 text-cyan" : "border-warning/40 bg-warning/15 text-warning";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Career Change Simulator",
		title: "Simulate switching paths before you commit",
		text: "Compare your current career or student stream against any target career — map transferable strengths, spot missing skills or qualifications, estimate realistic time and INR cost, and generate a 5-phase transition roadmap.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/compare",
			className: btnClass("outline"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, { className: "size-4" }), " Compare Careers"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 xl:grid-cols-[0.95fr_1.35fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
			className: "space-y-5 self-start",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "1. Where are you starting from?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs text-muted-foreground",
					children: "Students & beginners can pick an academic stream; career switchers can select any of 260+ roles."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5 text-xs text-text-2",
							children: ["Current career or student background", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: currentBackground,
								onChange: (e) => setCurrentBackground(e.target.value),
								className: selectClass(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
									label: "Student / Academic Stream",
									children: Object.keys(BACKGROUND_STREAM_PRESETS).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: key,
										children: BACKGROUND_STREAM_PRESETS[key].label
									}, key))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
									label: "260+ Existing Careers",
									children: sortedCareers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: c.id,
										children: [
											c.name,
											" (",
											c.industry,
											")"
										]
									}, c.id))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5 text-xs text-text-2",
							children: ["Target career to transition into", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: targetCareerId,
								onChange: (e) => setTargetCareerId(e.target.value),
								className: selectClass(),
								children: sortedCareers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: c.id,
									children: [
										c.name,
										" · ",
										c.industry
									]
								}, c.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5 text-xs text-text-2",
							children: ["Highest / current qualification", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: previousQualifications,
								onChange: (e) => setPreviousQualifications(e.target.value),
								className: selectClass(),
								children: QUALIFICATION_OPTIONS.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: q,
									children: q
								}, q))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2.5 border-t border-glass-border pt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-text-2",
							children: "2. Your current skills"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: skillDraft,
								onChange: (e) => setSkillDraft(e.target.value),
								onKeyDown: (e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										addSkill(skillDraft);
									}
								},
								placeholder: "Add a skill (e.g. Excel, Writing, Python)…",
								className: inputClass("h-10")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "soft",
								onClick: () => addSkill(skillDraft),
								className: "h-10 shrink-0 px-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add"]
							})]
						}),
						currentSkills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1.5",
							children: currentSkills.map((sk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-full border border-lavender/40 bg-lavender/15 px-2.5 py-1 text-xs text-foreground",
								children: [sk, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => removeSkill(sk),
									"aria-label": `Remove ${sk}`,
									className: "text-text-2 hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
								})]
							}, sk))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-1.5 text-[11px] text-muted-foreground",
								children: "Quick-add common skills:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: SUGGESTED_QUICK_SKILLS.filter((q) => !currentSkills.some((x) => x.toLowerCase() === q.toLowerCase())).map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
									onClick: () => addSkill(q),
									className: "px-2.5 py-0.5 text-[11px]",
									children: ["+ ", q]
								}, q))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 border-t border-glass-border pt-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5 text-xs text-text-2",
						children: [
							"Weekly study hours (",
							weeklyHours,
							" h/wk)",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 2,
								max: 35,
								value: weeklyHours,
								onChange: (e) => setWeeklyHours(Number(e.target.value)),
								className: "accent-cyan"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5 text-xs text-text-2",
						children: ["Preferred timeline", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: preferredTimelineMonths,
							onChange: (e) => setPreferredTimelineMonths(Number(e.target.value)),
							className: selectClass("h-10"),
							children: TIMELINE_OPTIONS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: m,
								children: [
									"Within ",
									m,
									" months"
								]
							}, m))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs text-text-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Learning & upskilling budget (INR)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-foreground",
							children: budgetInr === 0 ? "₹0 (Free-first)" : `₹${budgetInr.toLocaleString("en-IN")}`
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5",
						children: BUDGET_PRESETS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: budgetInr === b,
							onClick: () => setBudgetInr(b),
							className: "px-2.5 py-1 text-xs",
							children: b === 0 ? "₹0 Free" : `₹${b.toLocaleString("en-IN")}`
						}, b))
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRing, {
								value: sim.compatibilityScore,
								size: 88,
								stroke: 8,
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-xl font-semibold tabular-nums",
									children: [sim.compatibilityScore, "%"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `rounded-full border px-2.5 py-0.5 text-xs font-medium ${difficultyTone}`,
										children: [sim.transitionDifficulty, " Transition"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "(Rule-Based Estimate)"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mt-1.5 font-display text-xl font-semibold",
									children: [
										sim.currentLabel,
										" → ",
										sim.targetCareer.name
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-text-2",
									children: [
										sim.targetCareer.industry,
										" · ",
										sim.targetCareer.environment
									]
								})
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "primary",
								onClick: handleGenerateRoadmap,
								disabled: creatingRoadmap,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "size-4" }), creatingRoadmap ? "Generating…" : "Generate My Transition Roadmap"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: handleSaveAnalysis,
								disabled: savingSim,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), savingSim ? "Saving…" : "Save Analysis"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-soft p-3.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex items-center gap-1.5 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5 text-cyan" }), " Estimated Transition Time"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 font-display text-xl font-semibold tabular-nums",
										children: [sim.estimatedWeeks, " weeks"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-text-2",
										children: [
											"~",
											sim.estimatedTotalHours,
											" study hrs at ",
											weeklyHours,
											" h/wk"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-soft p-3.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex items-center gap-1.5 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-3.5 text-lavender-bright" }), " Estimated Learning Spend"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-display text-xl font-semibold tabular-nums",
										children: formatAmountFromInr(sim.estimatedExpensesInr.totalRecommended, "INR")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-text-2",
										children: budgetInr === 0 ? "100% free open track" : `Within ₹${budgetInr.toLocaleString("en-IN")} cap`
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-soft p-3.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex items-center gap-1.5 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-turquoise" }), " Timeline Feasibility"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-display text-xl font-semibold",
										children: sim.withinPreferredTimeline ? "On target" : "Needs extra pace"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-text-2",
										children: sim.withinPreferredTimeline ? `Fits inside your ${preferredTimelineMonths}-month target` : `Target is ${preferredTimelineMonths} mo; increase weekly hours or scope`
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-soft space-y-2 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-medium text-turquoise",
								children: "Existing & Transferable Skills"
							}), sim.existingRelevantSkills.length === 0 && sim.transferableSkills.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Add your current skills on the left to map direct overlaps."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-1.5",
								children: [sim.existingRelevantSkills.map((sk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
									className: "border-turquoise/40 bg-turquoise/10 text-xs",
									children: ["✓ ", sk]
								}, sk)), sim.transferableSkills.map((sk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
									className: "text-xs",
									children: ["↔ ", sk]
								}, sk))]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-soft space-y-2 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-medium text-warning",
								children: "Missing Technical & Soft Skills"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-1.5",
								children: [sim.missingTechnicalSkills.map((sk) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									className: "border-warning/35 bg-warning/10 text-xs",
									children: sk
								}, sk)), sim.missingSoftSkills.map((sk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
									className: "text-xs",
									children: [sk, " (soft)"]
								}, sk))]
							})]
						})]
					}),
					sim.missingQualifications.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "warn",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "mt-0.5 size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-1 text-xs",
								children: sim.missingQualifications.map((mq) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: mq }, mq))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-soft space-y-2 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-medium text-cyan",
								children: "Recommended Transition Sequence"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "space-y-2 text-xs text-text-2",
								children: sim.recommendedSequence.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "leading-relaxed",
									children: step
								}, step))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-soft space-y-3 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-medium text-lavender-bright",
								children: "Recommended Projects & Starter Roles"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-1.5 space-y-1 text-xs text-text-2",
								children: sim.recommendedProjects.slice(0, 3).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 size-3.5 shrink-0 text-turquoise" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p })]
								}, p))
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-glass-border pt-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] uppercase tracking-wider text-muted-foreground",
									children: "Target entry-level titles"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1.5 flex flex-wrap gap-1.5",
									children: sim.entryLevelJobRoles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										className: "px-2.5 py-0.5 text-xs",
										children: role
									}, role))
								})]
							})]
						})]
					}),
					sim.estimatedExpensesInr.items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-soft space-y-2 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-sm font-medium",
								children: [
									"Optional Budget Breakdown (",
									sim.estimatedExpensesInr.freeTrackNote,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/planner",
								className: "text-xs text-cyan hover:underline",
								children: "Customize in Budget Planner →"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2 sm:grid-cols-3",
							children: sim.estimatedExpensesInr.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: item.providerUrl,
								target: "_blank",
								rel: "noreferrer",
								className: "rounded-xl border border-glass-border bg-secondary/70 p-2.5 text-xs transition hover:border-lavender/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-foreground",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-0.5 text-muted-foreground",
									children: [
										"~₹",
										item.estimatedCostInr.toLocaleString("en-IN"),
										" · ",
										item.provider
									]
								})]
							}, item.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 border-t border-glass-border pt-3 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: sim.disclaimer }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/careers/$id",
							params: { id: sim.targetCareer.id },
							className: "inline-flex items-center gap-1 text-cyan hover:underline",
							children: [
								"Explore full ",
								sim.targetCareer.name,
								" guide ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })
							]
						})]
					})
				]
			}), s.transitions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Saved Transition Analyses"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/roadmap",
						className: "inline-flex items-center gap-1 text-xs text-cyan hover:underline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "size-3.5" }), " View Roadmaps"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: s.transitions.map((tr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-soft flex items-start justify-between gap-3 p-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-sm font-medium",
								children: [
									tr.currentRole,
									" → ",
									tr.targetCareerName
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-text-2 tabular-nums",
								children: [
									tr.compatibilityScore,
									"% fit · ",
									tr.estimatedWeeks,
									" wks · ",
									tr.weeklyHours,
									" ",
									"h/wk ·",
									" ",
									(tr.budgetInr ?? 0) === 0 ? "₹0 free" : `₹${(tr.budgetInr ?? 0).toLocaleString("en-IN")}`
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void actions.removeTransition(tr.id),
							"aria-label": "Delete saved transition",
							className: "rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					}, tr.id))
				})]
			})]
		})]
	})] });
}
//#endregion
export { CareerSimulatorPage as component };
