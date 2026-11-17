import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Glass, d as cn, l as ProgressRing, p as selectClass, r as Chip, s as Notice } from "./ui-kit-BmqGm62i.mjs";
import { K as Briefcase, L as Earth, O as IndianRupee, U as CircleAlert, W as ChevronDown, a as TrendingUp } from "../_libs/lucide-react.mjs";
import { t as TEXT_TO_SIGNALS } from "./engine-DVCtS3eD.mjs";
import { a as getCareerInsight, i as formatRangeFromInr, n as formatAbroadRange, t as CURRENCY_META } from "./career-insights-DY2zFBVx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CompatibilityCard-DGCoBrUg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var COMPATIBILITY_WEIGHTS = {
	interests: .25,
	subjects: .2,
	skills: .2,
	strengths: .15,
	financial: .1,
	readiness: .1
};
var EDU_RANK = {
	"Class 8–10": 1,
	"Class 9–10": 1,
	"Class 11–12": 2,
	Diploma: 3,
	Undergraduate: 4,
	Postgraduate: 5,
	"Working / gap year": 4
};
function expandSignalTokens(items) {
	const out = /* @__PURE__ */ new Set();
	for (const item of items) {
		const low = item.trim().toLowerCase();
		if (!low) continue;
		out.add(low);
		for (const word of low.split(/[\s/,&-]+/)) if (word.length >= 3) out.add(word);
		for (const mapped of TEXT_TO_SIGNALS[item] ?? TEXT_TO_SIGNALS[low] ?? []) out.add(mapped.toLowerCase());
	}
	return out;
}
function minEduRank(minEdu) {
	const m = minEdu.toLowerCase();
	if (m.includes("master") || m.includes("postgrad") || m.includes("mbbs") || m.includes("phd")) return 5;
	if (m.includes("bachelor") || m.includes("degree") || m.includes("b.tech") || m.includes("ll.b")) return 4;
	if (m.includes("diploma")) return 3;
	if (m.includes("12")) return 2;
	return 1;
}
function getCompatibilityBand(score) {
	if (score >= 80) return "Strong Match";
	if (score >= 60) return "Good Match";
	if (score >= 40) return "Moderate Match";
	return "Low Match";
}
function computeCompatibility(career, profile, fallbackAnswers) {
	const interests = profile?.interests?.length ? profile.interests : Array.isArray(fallbackAnswers?.["interests"]) ? fallbackAnswers["interests"] : [];
	const subjects = profile?.subjects?.length ? profile.subjects : Array.isArray(fallbackAnswers?.["subjects"]) ? fallbackAnswers["subjects"] : [];
	const capabilities = profile?.capabilities?.length ? profile.capabilities : Array.isArray(fallbackAnswers?.["capabilities"]) ? fallbackAnswers["capabilities"] : [];
	const currentSkills = profile?.currentSkills ?? [];
	const eduLevel = profile?.educationLevel ?? (typeof fallbackAnswers?.["education"] === "string" ? fallbackAnswers["education"] : void 0);
	const weeklyHours = profile?.weeklyHours ?? (typeof fallbackAnswers?.["hours"] === "number" ? fallbackAnswers["hours"] : void 0);
	const budget = profile?.budget ?? 0;
	const missingProfileFields = [];
	if (interests.length === 0) missingProfileFields.push("Personal interests");
	if (subjects.length === 0) missingProfileFields.push("Favourite subjects");
	if (currentSkills.length === 0) missingProfileFields.push("Current skills");
	if (capabilities.length === 0) missingProfileFields.push("Strengths & capabilities");
	if (!eduLevel) missingProfileFields.push("Education level");
	if (!profile?.expectedStartingSalaryInr && !profile?.preferredWorkLocation) missingProfileFields.push("Financial expectations & work location");
	const userIntTokens = expandSignalTokens(interests);
	const careerInterests = career.interests.map((x) => x.toLowerCase());
	const interestHits = careerInterests.filter((ci) => userIntTokens.has(ci) || career.tags.some((t) => userIntTokens.has(t.toLowerCase())));
	const interestDirectCount = careerInterests.filter((ci) => userIntTokens.has(ci)).length;
	const interestScore = interests.length === 0 ? 45 : Math.min(100, Math.round(interestDirectCount / Math.max(1, careerInterests.length) * 85 + (interestHits.length > 0 ? 15 : 0)));
	const userSubTokens = expandSignalTokens(subjects);
	const subjDirect = career.subjects.filter((cs) => userSubTokens.has(cs.toLowerCase()) || cs.toLowerCase().split(/[\s/,&-]+/).some((w) => w.length >= 4 && userSubTokens.has(w)));
	const subjectSignalOverlap = career.subjects.filter((cs) => (TEXT_TO_SIGNALS[cs] ?? []).some((sig) => userSubTokens.has(sig)));
	const subjectScore = subjects.length === 0 ? 50 : Math.min(100, Math.round(subjDirect.length / Math.max(1, career.subjects.length) * 75 + (subjectSignalOverlap.length > 0 ? 25 : 0)));
	const userSkillTokens = expandSignalTokens([
		...currentSkills,
		...capabilities,
		...subjects
	]);
	const matchedSkills = [];
	const missingSkills = [];
	for (const reqSkill of career.skills) {
		const words = reqSkill.toLowerCase().split(/[\s/,&-]+/).filter((w) => w.length >= 3);
		if (userSkillTokens.has(reqSkill.toLowerCase()) || words.some((w) => userSkillTokens.has(w)) || (TEXT_TO_SIGNALS[reqSkill]?.some((sig) => userSkillTokens.has(sig)) ?? false)) matchedSkills.push(reqSkill);
		else missingSkills.push(reqSkill);
	}
	const skillScore = currentSkills.length === 0 && capabilities.length === 0 ? 35 : Math.min(100, Math.round(matchedSkills.length / Math.max(1, career.skills.length) * 85 + (currentSkills.length > 0 ? 15 : 0)));
	const userCapTokens = expandSignalTokens(capabilities);
	const matchedCaps = career.capabilities.filter((c) => userCapTokens.has(c.toLowerCase()));
	const envMatch = profile?.environment && profile.environment !== "No preference" && career.environment.toLowerCase().includes((profile.environment.split(" ")[0] ?? "").toLowerCase());
	const strengthScore = capabilities.length === 0 ? 45 : Math.min(100, Math.round(matchedCaps.length / Math.max(1, career.capabilities.length) * 85 + (envMatch ? 15 : 5)));
	const insight = getCareerInsight(career);
	const expectedStart = profile?.expectedStartingSalaryInr;
	const desiredLong = profile?.desiredLongTermSalaryInr;
	const eduBudget = profile?.educationBudgetInr ?? budget;
	let financialScore = 72;
	let financialAlignmentNote = `Typical India entry range is ₹${(insight.indiaEntryInr[0] / 1e5).toFixed(1)}L–₹${(insight.indiaEntryInr[1] / 1e5).toFixed(1)}L/yr; starter learning budget fits ₹${career.budgetTier.toLocaleString("en-IN")}.`;
	if (expectedStart && expectedStart > 0) {
		const targetPool = profile?.preferredWorkLocation === "Abroad" ? [insight.abroadEntryUsd[0] * 84.5, insight.abroadEntryUsd[1] * 84.5] : insight.indiaEntryInr;
		if (expectedStart <= targetPool[1] * 1.05) {
			financialScore = 90;
			financialAlignmentNote = `Your expected starting compensation (₹${(expectedStart / 1e5).toFixed(1)}L) aligns realistically with ${profile?.preferredWorkLocation === "Abroad" ? "international" : "India"} entry benchmarks.`;
		} else if (expectedStart <= targetPool[1] * 1.45) {
			financialScore = 62;
			financialAlignmentNote = `Your expected starting pay (₹${(expectedStart / 1e5).toFixed(1)}L) sits slightly above typical entry benchmarks — typically reachable by mid-career.`;
		} else {
			financialScore = 38;
			financialAlignmentNote = `Expected starting pay (₹${(expectedStart / 1e5).toFixed(1)}L) exceeds typical entry bands for this role; review mid/experienced salary progression or combine specializations.`;
		}
	}
	if (desiredLong && desiredLong > 0) {
		if (desiredLong > (profile?.preferredWorkLocation === "Abroad" ? insight.abroadExperiencedUsd[1] * 84.5 : insight.indiaExperiencedInr[1]) * 1.4) financialScore = Math.max(30, financialScore - 15);
	}
	if (eduBudget < career.budgetTier && profile?.willingToInvestEducation === "No") financialScore = Math.max(30, financialScore - 15);
	const userEduRank = eduLevel ? EDU_RANK[eduLevel] ?? 2 : 2;
	const reqEduRank = minEduRank(career.minEducation);
	const eduGap = Math.max(0, reqEduRank - userEduRank);
	const hoursBonus = typeof weeklyHours === "number" ? weeklyHours >= 10 ? 25 : weeklyHours >= 5 ? 18 : 10 : 12;
	const readinessBase = eduGap === 0 ? 75 : eduGap === 1 ? 58 : Math.max(25, 70 - eduGap * 18);
	const readinessScore = Math.min(100, readinessBase + hoursBonus);
	const missingQualifications = [];
	if (eduGap > 0) missingQualifications.push(`Recommended baseline: ${career.minEducation} (pathway: ${career.pathways[0] ?? "Structured degree/diploma"})`);
	if (profile?.willingHigherEducation === "No" && reqEduRank >= 5) missingQualifications.push("Usually expects postgraduate or formal licensing — check alternative routes.");
	const breakdown = [
		{
			key: "interests",
			label: "Interests & curiosity",
			weightPct: Math.round(COMPATIBILITY_WEIGHTS.interests * 100),
			score: interestScore,
			detail: interests.length === 0 ? "Add interests in Profile for tighter alignment." : interestDirectCount > 0 ? `Matches ${interestDirectCount} of your core interests` : "Partial thematic overlap with your interest tags"
		},
		{
			key: "subjects",
			label: "Favourite subjects",
			weightPct: Math.round(COMPATIBILITY_WEIGHTS.subjects * 100),
			score: subjectScore,
			detail: subjects.length === 0 ? "Optional school/college subjects not yet listed." : subjDirect.length > 0 ? `Connects with ${subjDirect.join(", ")}` : `Helpful foundations: ${career.subjects.slice(0, 2).join(", ")}`
		},
		{
			key: "skills",
			label: "Current skills",
			weightPct: Math.round(COMPATIBILITY_WEIGHTS.skills * 100),
			score: skillScore,
			detail: matchedSkills.length > 0 ? `Already covers ${matchedSkills.length}/${career.skills.length} listed skills` : `Build starter skills: ${career.skills.slice(0, 2).join(", ")}`
		},
		{
			key: "strengths",
			label: "Strengths & environment",
			weightPct: Math.round(COMPATIBILITY_WEIGHTS.strengths * 100),
			score: strengthScore,
			detail: matchedCaps.length > 0 ? `Uses your strengths: ${matchedCaps.slice(0, 3).map((c) => c.replace(/_/g, " ")).join(", ")}` : `Needs ${career.capabilities.slice(0, 2).map((c) => c.replace(/_/g, " ")).join(", ")}`
		},
		{
			key: "financial",
			label: "Financial expectations",
			weightPct: Math.round(COMPATIBILITY_WEIGHTS.financial * 100),
			score: financialScore,
			detail: financialAlignmentNote
		},
		{
			key: "readiness",
			label: "Time & education readiness",
			weightPct: Math.round(COMPATIBILITY_WEIGHTS.readiness * 100),
			score: readinessScore,
			detail: `${weeklyHours ?? 5} h/wk pace · Baseline: ${career.minEducation}`
		}
	];
	const totalScore = Math.max(1, Math.min(99, Math.round(breakdown.reduce((acc, item) => acc + item.score * COMPATIBILITY_WEIGHTS[item.key], 0))));
	const matchedStrengths = Array.from(/* @__PURE__ */ new Set([
		...matchedCaps.map((c) => c.replace(/_/g, " ")),
		...matchedSkills,
		...subjDirect
	])).slice(0, 6);
	const improvementAreas = [
		...missingSkills.slice(0, 3).map((s) => `Develop practical experience in ${s}`),
		...profile?.weaknesses?.length ? [`Watch out for self-noted areas (${profile.weaknesses.slice(0, 2).join(", ")}) when choosing daily tasks`] : [],
		...eduGap > 0 ? [`Plan academic prerequisite (${career.minEducation}) or portfolio alternative`] : []
	].slice(0, 4);
	return {
		careerId: career.id,
		score: totalScore,
		band: getCompatibilityBand(totalScore),
		breakdown,
		matchedStrengths,
		missingSkills,
		missingQualifications,
		improvementAreas,
		missingProfileFields,
		financialAlignmentNote,
		disclaimer: "Compatibility score is a rule-based estimate across 6 profile dimensions — use it as a guide alongside practical trials, not a scientific prediction."
	};
}
var _jsxFileName = "/app/applet/src/components/CompatibilityCard.tsx";
var BAND_CLASS = {
	"Strong Match": "border-turquoise/50 bg-turquoise/15 text-turquoise",
	"Good Match": "border-cyan/50 bg-cyan/15 text-cyan",
	"Moderate Match": "border-lavender/50 bg-lavender/20 text-lavender-bright",
	"Low Match": "border-warning/40 bg-warning/15 text-warning"
};
function CompatibilityBadge({ career, profile, fallbackAnswers }) {
	const report = computeCompatibility(career, profile, fallbackAnswers);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tabular-nums", BAND_CLASS[report.band]),
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [report.score, "%"] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 42,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "opacity-80",
			children: ["· ", report.band]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 43,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 36,
		columnNumber: 5
	}, this);
}
function CompatibilityCard({ career, profile, fallbackAnswers, defaultExpanded = true }) {
	const [expanded, setExpanded] = (0, import_react.useState)(defaultExpanded);
	const report = computeCompatibility(career, profile, fallbackAnswers);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProgressRing, {
						value: report.score,
						size: 84,
						stroke: 8,
						label: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-display text-lg font-semibold tabular-nums",
							children: [report.score, "%"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 71,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 66,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs font-medium uppercase tracking-wider text-cyan",
							children: "Career Compatibility Score (Estimate)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 77,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-1 flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: cn("rounded-full border px-2.5 py-0.5 text-xs font-medium", BAND_CLASS[report.band]),
								children: report.band
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 81,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs text-muted-foreground",
								children: ["for ", career.name]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 89,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 80,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-xs text-text-2",
							children: report.financialAlignmentNote
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 91,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 65,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => setExpanded((e) => !e),
					"aria-expanded": expanded,
					className: "inline-flex items-center gap-1.5 rounded-xl border border-glass-border bg-secondary px-3 py-2 text-xs font-medium text-foreground hover:bg-accent",
					children: [expanded ? "Hide breakdown" : "Inspect 6-factor breakdown", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: cn("size-3.5 transition", expanded && "rotate-180") }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 101,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 94,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 64,
				columnNumber: 7
			}, this),
			report.missingProfileFields.length > 0 && /* @__PURE__ */ (void 0)(Notice, {
				tone: "info",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (void 0)("span", {
						className: "flex items-center gap-1.5 text-xs",
						children: [
							/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-4 shrink-0 text-cyan" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 109,
								columnNumber: 15
							}, this),
							"Complete your profile (",
							report.missingProfileFields.slice(0, 3).join(", "),
							") for a more accurate compatibility estimate."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 108,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)(Link, {
						to: "/profile",
						className: "text-xs font-medium text-cyan hover:underline",
						children: "Update profile →"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 113,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 107,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 106,
				columnNumber: 9
			}, this),
			expanded && /* @__PURE__ */ (void 0)("div", {
				className: "space-y-4 border-t border-glass-border pt-4",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: report.breakdown.map((b) => /* @__PURE__ */ (void 0)("div", {
							className: "glass-soft space-y-1.5 p-3",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between gap-2 text-xs",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "font-medium text-foreground",
										children: [
											b.label,
											" ",
											/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground",
												children: [
													"(",
													b.weightPct,
													"% weight)"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 127,
												columnNumber: 31
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 126,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "font-semibold text-cyan tabular-nums",
										children: [b.score, "%"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 129,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 125,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "h-1.5 overflow-hidden rounded-full bg-secondary",
									children: /* @__PURE__ */ (void 0)("div", {
										className: "h-full rounded-full bg-brand transition-all",
										style: { width: `${b.score}%` }
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 132,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 131,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-text-2",
									children: b.detail
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 137,
									columnNumber: 17
								}, this)
							]
						}, b.key, true, {
							fileName: _jsxFileName,
							lineNumber: 124,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 122,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
							className: "mb-1.5 text-xs font-medium uppercase tracking-wider text-turquoise",
							children: "Matched strengths & skills"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 144,
							columnNumber: 15
						}, this), report.matchedStrengths.length > 0 ? /* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap gap-1.5",
							children: report.matchedStrengths.map((s) => /* @__PURE__ */ (void 0)(Chip, {
								className: "px-2.5 py-0.5 text-xs capitalize",
								children: s
							}, s, false, {
								fileName: _jsxFileName,
								lineNumber: 150,
								columnNumber: 21
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 148,
							columnNumber: 17
						}, this) : /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground",
							children: "No direct skill matches added yet — try starter basics in a 5-phase roadmap."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 156,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 143,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
							className: "mb-1.5 text-xs font-medium uppercase tracking-wider text-warning",
							children: "Missing skills & qualifications to build"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 162,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("ul", {
							className: "space-y-1 text-xs text-text-2",
							children: [
								report.missingSkills.slice(0, 4).map((s) => /* @__PURE__ */ (void 0)("li", { children: ["• Skill gap: ", s] }, s, true, {
									fileName: _jsxFileName,
									lineNumber: 167,
									columnNumber: 19
								}, this)),
								report.missingQualifications.map((q) => /* @__PURE__ */ (void 0)("li", { children: ["• ", q] }, q, true, {
									fileName: _jsxFileName,
									lineNumber: 170,
									columnNumber: 19
								}, this)),
								report.improvementAreas.slice(0, 2).map((imp) => /* @__PURE__ */ (void 0)("li", {
									className: "text-muted-foreground",
									children: ["→ ", imp]
								}, imp, true, {
									fileName: _jsxFileName,
									lineNumber: 173,
									columnNumber: 19
								}, this))
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 165,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 161,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 142,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "text-[11px] text-muted-foreground",
						children: report.disclaimer
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 181,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 121,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 63,
		columnNumber: 5
	}, this);
}
function FinancialOutlookPanel({ career, profile }) {
	const [currency, setCurrency] = (0, import_react.useState)("INR");
	const insight = getCareerInsight(career);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs font-medium uppercase tracking-wider text-cyan",
					children: "Financial Expectations & Market Outlook"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 202,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-xl font-semibold",
					children: [
						"Salary benchmarks, entry curve & demand (",
						career.name,
						")"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 205,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 201,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "flex items-center gap-2 text-xs text-text-2",
					children: ["Currency:", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						"aria-label": "Select display currency",
						value: currency,
						onChange: (e) => setCurrency(e.target.value),
						className: selectClass("h-9 w-28 px-2 text-xs"),
						children: Object.keys(CURRENCY_META).map((code) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: code,
							children: CURRENCY_META[code].label
						}, code, false, {
							fileName: _jsxFileName,
							lineNumber: 218,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 211,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 209,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 200,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "glass-soft p-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "flex items-center gap-1.5 text-xs text-cyan",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IndianRupee, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 229,
									columnNumber: 13
								}, this), " Entry level (0–2 yrs)"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 228,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 font-display text-lg font-semibold tabular-nums",
								children: formatRangeFromInr(insight.indiaEntryInr, currency)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 231,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-0.5 text-xs text-muted-foreground tabular-nums",
								children: ["Abroad: ", formatAbroadRange(insight.abroadEntryUsd, currency)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 234,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 227,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "glass-soft p-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "flex items-center gap-1.5 text-xs text-lavender-bright",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 240,
									columnNumber: 13
								}, this), " Mid-career (3–7 yrs)"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 239,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 font-display text-lg font-semibold tabular-nums",
								children: formatRangeFromInr(insight.indiaMidInr, currency)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 242,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-0.5 text-xs text-muted-foreground tabular-nums",
								children: ["Abroad: ", formatAbroadRange(insight.abroadMidUsd, currency)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 245,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 238,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "glass-soft p-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "flex items-center gap-1.5 text-xs text-turquoise",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Earth, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 251,
									columnNumber: 13
								}, this), " Experienced (8+ yrs)"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 250,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 font-display text-lg font-semibold tabular-nums",
								children: formatRangeFromInr(insight.indiaExperiencedInr, currency)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 253,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-0.5 text-xs text-muted-foreground tabular-nums",
								children: ["Abroad: ", formatAbroadRange(insight.abroadExperiencedUsd, currency)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 256,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 249,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 226,
				columnNumber: 7
			}, this),
			profile?.expectedStartingSalaryInr ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Notice, {
				tone: "info",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-semibold",
							children: "Personal alignment check:"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 265,
							columnNumber: 13
						}, this),
						" Your target starting pay (₹",
						(profile.expectedStartingSalaryInr / 1e5).toFixed(1),
						" LPA",
						profile.preferredWorkLocation ? ` · ${profile.preferredWorkLocation}` : "",
						") vs",
						" ",
						career.name,
						" entry range",
						" ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-medium text-cyan",
							children: formatRangeFromInr(insight.indiaEntryInr, "INR")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 269,
							columnNumber: 13
						}, this),
						". Education budget set:",
						" ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-medium",
							children: ["₹", (profile.educationBudgetInr ?? profile.budget).toLocaleString("en-IN")]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 273,
							columnNumber: 13
						}, this),
						"."
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 264,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 263,
				columnNumber: 9
			}, this) : null,
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "glass-soft p-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-medium text-cyan",
								children: "Difficulty of entry"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 283,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 font-medium text-foreground",
								children: insight.difficultyOfEntry
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 284,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-text-2",
								children: insight.difficultyExplanation
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 285,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 282,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "glass-soft p-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-medium text-cyan",
								children: "Future industry demand"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 288,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 font-medium text-foreground",
								children: [
									insight.futureDemand.trend,
									" (",
									insight.futureDemand.timeframe,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 289,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-text-2",
								children: insight.futureDemand.outlookNote
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 292,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 287,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "glass-soft p-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-medium text-cyan",
								children: "Education investment"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 295,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 font-medium text-foreground tabular-nums",
								children: formatRangeFromInr(insight.educationCostInr, currency, false)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 296,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-text-2",
								children: insight.employabilityNote
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 299,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 294,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "glass-soft p-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "flex items-center gap-1 text-xs font-medium text-cyan",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 303,
									columnNumber: 13
								}, this), " Sectors & remote work"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 302,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 font-medium text-foreground",
								children: insight.jobOpportunities.remotePossibility
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 305,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-text-2",
								children: insight.jobOpportunities.sectors.slice(0, 3).join(" · ")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 308,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 301,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 281,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-3 text-xs text-text-2 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-xl border border-glass-border bg-secondary/40 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-medium text-foreground",
							children: "Fixed & Variable Pay:"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 316,
							columnNumber: 11
						}, this),
						" ",
						insight.compensationStructure.baseNote,
						" ",
						insight.compensationStructure.variableNote
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 315,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-xl border border-glass-border bg-secondary/40 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-medium text-foreground",
							children: "Freelance & Self-Employment:"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 320,
							columnNumber: 11
						}, this),
						" ",
						insight.compensationStructure.freelanceNote
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 319,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 314,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[11px] text-muted-foreground",
				children: [
					"Source attribution: ",
					insight.salarySource,
					" (",
					insight.salaryPeriod,
					"). Figures are indicative industry estimates and do not guarantee salaries, job offers, or promotions."
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 325,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 199,
		columnNumber: 5
	}, this);
}
//#endregion
export { computeCompatibility as i, CompatibilityCard as n, FinancialOutlookPanel as r, CompatibilityBadge as t };
