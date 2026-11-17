import { l as __toESM, s as require_react } from "./useSelector-Cu7jxM-W.js";
import { y as auth } from "./auth-ByhFdEgm.js";
import { A as updateRoadmapHoursInDb, C as saveCareerToFolder, D as saveOpportunityRecord, E as saveLearningPlan, M as updateRoadmapTitleInDb, O as saveTransitionRecord, S as saveAssessment, T as saveComparison, _ as listUserActivity, a as deleteLearningPlan, b as removeSavedOpportunityRecord, c as getUserProfile, d as listComparisons, f as listLearningPlans, g as listTransitions, h as listSavedOpportunities, i as deleteComparison, j as updateRoadmapTaskNoteInDb, k as toggleRoadmapTaskInDb, l as listAssessments, m as listSavedCareers, n as canWriteFirestore, o as deleteRoadmapWithTasks, p as listRoadmapsWithTasks, r as createRoadmapWithTasks, s as deleteTransitionRecord, t as addCustomTaskToRoadmap, u as listChallengeAttempts, v as logUserActivity, w as saveChallengeAttempt, x as resetRoadmapTasksInDb, y as removeSavedCareer } from "./db-BNKfCsrU.js";
//#region src/lib/store.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var KEY = "futuroute:v2";
var DEFAULT = {
	saved: [],
	savedFolders: {},
	savedNotes: {},
	compare: ["software-developer", "ui-ux-designer"],
	savedComparisons: [],
	savedPlans: [],
	savedOpportunities: [],
	transitions: [],
	recent: [],
	comparedCount: 0,
	activity: [],
	challenges: {},
	roadmaps: [],
	profile: null
};
var state = DEFAULT;
var loaded = false;
var activeUid = null;
var listeners = /* @__PURE__ */ new Set();
function notify() {
	listeners.forEach((l) => l());
}
function storageKeyFor(uid) {
	return uid ? `${KEY}:user:${uid}` : KEY;
}
function persistLocal() {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(storageKeyFor(activeUid), JSON.stringify(state));
	} catch {}
}
function load() {
	if (loaded || typeof window === "undefined") return;
	loaded = true;
	try {
		const raw = localStorage.getItem(storageKeyFor(activeUid));
		if (raw) {
			const parsed = JSON.parse(raw);
			const roadmaps = Array.isArray(parsed.roadmaps) ? parsed.roadmaps : parsed.roadmap ? [{
				...parsed.roadmap,
				id: parsed.roadmap.id ?? "rm-local",
				title: parsed.roadmap.title ?? "My Roadmap"
			}] : [];
			const activeId = parsed.activeRoadmapId ?? roadmaps[0]?.id;
			state = {
				...DEFAULT,
				...parsed,
				roadmaps,
				activeRoadmapId: activeId,
				roadmap: roadmaps.find((r) => r.id === activeId) ?? roadmaps[0]
			};
		}
	} catch {
		state = DEFAULT;
	}
}
function setState(fn) {
	load();
	const next = fn(state);
	const active = next.roadmaps.find((r) => r.id === next.activeRoadmapId) ?? next.roadmaps[0];
	state = {
		...next,
		activeRoadmapId: active?.id,
		roadmap: active
	};
	persistLocal();
	notify();
}
function useApp() {
	return (0, import_react.useSyncExternalStore)((l) => {
		load();
		listeners.add(l);
		queueMicrotask(l);
		return () => listeners.delete(l);
	}, () => state, () => DEFAULT);
}
var uidGen = () => Math.random().toString(36).slice(2, 10);
var log = (s, text, kind) => ({
	...s,
	activity: [{
		id: uidGen(),
		text,
		at: Date.now(),
		kind
	}, ...s.activity].slice(0, 30)
});
function syncCloudActivity(text, kind) {
	const u = auth.currentUser;
	if (u && canWriteFirestore()) logUserActivity(u.uid, text, kind).catch(() => {});
}
function useFirebaseStoreSync(user) {
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const uid = user?.uid ?? null;
		if (activeUid !== uid) {
			activeUid = uid;
			loaded = false;
			state = DEFAULT;
			load();
			notify();
		}
		if (!user || !user.emailVerified) return;
		let cancelled = false;
		(async () => {
			try {
				const [profile, savedList, comparisons, assessments, roadmaps, challenges, activity, learningPlans, savedOpportunities, transitions] = await Promise.all([
					getUserProfile(user.uid).catch(() => null),
					listSavedCareers(user.uid).catch(() => []),
					listComparisons(user.uid).catch(() => []),
					listAssessments(user.uid).catch(() => []),
					listRoadmapsWithTasks(user.uid).catch(() => []),
					listChallengeAttempts(user.uid).catch(() => ({})),
					listUserActivity(user.uid).catch(() => []),
					listLearningPlans(user.uid).catch(() => []),
					listSavedOpportunities(user.uid).catch(() => []),
					listTransitions(user.uid).catch(() => [])
				]);
				if (cancelled) return;
				setState((cur) => {
					const savedIds = savedList.length ? savedList.map((s) => s.careerId) : cur.saved;
					const savedFolders = { ...cur.savedFolders };
					const savedNotes = { ...cur.savedNotes };
					for (const item of savedList) {
						savedFolders[item.careerId] = item.folder;
						if (item.note) savedNotes[item.careerId] = item.note;
					}
					const mappedRoadmaps = roadmaps.length ? roadmaps.map((r) => ({
						id: r.id,
						careerId: r.careerId,
						title: r.title,
						level: r.level,
						hours: r.hours,
						budget: r.budget,
						format: r.format ?? "mixed",
						project: r.project ?? "",
						weeks: r.weeks,
						createdAt: r.createdAtMs,
						tasks: r.tasks.map((t) => ({
							id: t.id,
							phase: t.phase,
							week: t.week,
							title: t.title,
							desc: t.desc ?? "",
							effort: t.effort ?? "",
							objectives: t.objectives,
							difficulty: t.difficulty,
							practicalTask: t.practicalTask,
							freeAlternative: t.freeAlternative ?? void 0,
							note: t.note,
							resource: t.resource ?? void 0,
							done: t.done
						}))
					})) : cur.roadmaps;
					const latestAsm = assessments[0];
					const mappedDiscovery = latestAsm ? {
						answers: latestAsm.answers,
						results: Array.isArray(latestAsm.groups?.strongMatches) ? latestAsm.groups.strongMatches.map((x) => x.career?.id).filter((x) => Boolean(x)) : cur.discovery?.results ?? [],
						groups: latestAsm.groups,
						source: latestAsm.source,
						at: latestAsm.createdAtMs
					} : cur.discovery;
					const mappedChallenges = { ...cur.challenges };
					for (const [cid, c] of Object.entries(challenges)) mappedChallenges[cid] = {
						answer: c.answer ?? "",
						correct: c.correct,
						enjoy: c.enjoy,
						reflection: c.reflection,
						at: Date.now()
					};
					const mappedActivity = activity.length ? activity.map((a) => ({
						id: a.id,
						text: a.text,
						kind: a.kind,
						at: a.createdAtMs
					})) : cur.activity;
					const mappedOpps = savedOpportunities.length ? savedOpportunities.map((o) => ({
						opportunityId: o.opportunityId,
						title: o.title,
						category: o.category,
						status: o.status,
						savedAtMs: o.savedAtMs,
						updatedAtMs: o.updatedAtMs
					})) : cur.savedOpportunities;
					const mappedTransitions = transitions.length ? transitions.map((tr) => ({
						id: tr.id,
						currentRole: tr.currentRole,
						targetCareerId: tr.targetCareerId,
						targetCareerName: tr.targetCareerName,
						existingSkills: tr.existingSkills,
						missingSkills: tr.missingSkills,
						compatibilityScore: tr.compatibilityScore,
						estimatedWeeks: tr.estimatedWeeks,
						budgetInr: tr.budgetInr,
						weeklyHours: tr.weeklyHours,
						createdAtMs: tr.createdAtMs
					})) : cur.transitions;
					return {
						...cur,
						profile: profile ?? cur.profile,
						saved: savedIds,
						savedFolders,
						savedNotes,
						savedComparisons: comparisons.length ? comparisons : cur.savedComparisons,
						savedPlans: learningPlans.length ? learningPlans : cur.savedPlans,
						savedOpportunities: mappedOpps,
						transitions: mappedTransitions,
						comparedCount: Math.max(cur.comparedCount, comparisons.length),
						discovery: mappedDiscovery,
						roadmaps: mappedRoadmaps,
						activeRoadmapId: cur.activeRoadmapId && mappedRoadmaps.some((r) => r.id === cur.activeRoadmapId) ? cur.activeRoadmapId : mappedRoadmaps[0]?.id,
						challenges: mappedChallenges,
						activity: mappedActivity
					};
				});
			} catch {}
		})();
		return () => {
			cancelled = true;
		};
	}, [user, user?.emailVerified]);
}
var actions = {
	setProfile(profile) {
		setState((s) => ({
			...s,
			profile
		}));
	},
	toggleSave(id, name, folder = "top") {
		const u = auth.currentUser;
		const isRemoving = state.saved.includes(id);
		setState((s) => {
			if (isRemoving) {
				const nextFolders = { ...s.savedFolders };
				delete nextFolders[id];
				return log({
					...s,
					saved: s.saved.filter((x) => x !== id),
					savedFolders: nextFolders
				}, `Removed ${name} from saved careers`, "save");
			}
			return log({
				...s,
				saved: [...s.saved, id],
				savedFolders: {
					...s.savedFolders,
					[id]: folder
				}
			}, `Saved ${name}`, "save");
		});
		if (u && canWriteFirestore()) if (isRemoving) {
			removeSavedCareer(u.uid, id).catch(() => {});
			syncCloudActivity(`Removed ${name} from saved careers`, "save");
		} else {
			saveCareerToFolder(u.uid, id, folder, state.savedNotes[id]).catch(() => {});
			syncCloudActivity(`Saved ${name}`, "save");
		}
	},
	setSavedFolder(id, name, folder) {
		const u = auth.currentUser;
		setState((s) => {
			const saved = s.saved.includes(id) ? s.saved : [...s.saved, id];
			return log({
				...s,
				saved,
				savedFolders: {
					...s.savedFolders,
					[id]: folder
				}
			}, `Moved ${name} to ${folder === "top" ? "Top Career Choices" : folder === "alternative" ? "Alternative Careers" : "Explore Later"}`, "save");
		});
		if (u && canWriteFirestore()) saveCareerToFolder(u.uid, id, folder, state.savedNotes[id]).catch(() => {});
	},
	setSavedNote(id, note) {
		const u = auth.currentUser;
		const folder = state.savedFolders[id] ?? "top";
		setState((s) => ({
			...s,
			savedNotes: {
				...s.savedNotes,
				[id]: note
			}
		}));
		if (u && canWriteFirestore()) saveCareerToFolder(u.uid, id, folder, note).catch(() => {});
	},
	visit(id) {
		setState((s) => ({
			...s,
			recent: [id, ...s.recent.filter((x) => x !== id)].slice(0, 8)
		}));
	},
	setCompare(ids) {
		setState((s) => ({
			...s,
			compare: ids.slice(0, 3)
		}));
	},
	markCompared(names) {
		setState((s) => log({
			...s,
			comparedCount: s.comparedCount + 1
		}, `Compared ${names.join(" vs ")}`, "compare"));
	},
	async saveComparisonRecord(careerIds, title, note) {
		const u = auth.currentUser;
		let id = `cmp-${Date.now().toString(36)}`;
		if (u && canWriteFirestore()) {
			id = await saveComparison(u.uid, careerIds, title, note);
			syncCloudActivity(`Saved comparison: ${title}`, "compare");
		}
		const item = {
			id,
			careerIds,
			title,
			note,
			createdAtMs: Date.now()
		};
		setState((s) => log({
			...s,
			savedComparisons: [item, ...s.savedComparisons].slice(0, 20)
		}, `Saved comparison: ${title}`, "compare"));
		return id;
	},
	async removeComparisonRecord(comparisonId) {
		const u = auth.currentUser;
		if (u && canWriteFirestore()) await deleteComparison(u.uid, comparisonId).catch(() => {});
		setState((s) => ({
			...s,
			savedComparisons: s.savedComparisons.filter((c) => c.id !== comparisonId)
		}));
	},
	setDiscovery(answers, results, groups, source = "deterministic") {
		const u = auth.currentUser;
		setState((s) => log({
			...s,
			discovery: {
				answers,
				results,
				groups,
				source,
				at: Date.now()
			}
		}, "Completed career discovery", "discover"));
		if (u && canWriteFirestore()) {
			saveAssessment(u.uid, answers, groups ?? { results }, source).catch(() => {});
			syncCloudActivity("Completed career discovery", "discover");
		}
	},
	setChallenge(id, r, label) {
		const u = auth.currentUser;
		setState((s) => {
			const merged = {
				...s.challenges[id] ?? {
					correct: false,
					answer: "",
					at: Date.now()
				},
				...r
			};
			const next = {
				...s,
				challenges: {
					...s.challenges,
					[id]: merged
				}
			};
			return label ? log(next, label, "challenge") : next;
		});
		if (u && canWriteFirestore()) {
			const cur = state.challenges[id];
			saveChallengeAttempt(u.uid, id, {
				answer: cur?.answer,
				correct: Boolean(cur?.correct),
				enjoy: cur?.enjoy,
				reflection: cur?.reflection
			}).catch(() => {});
			if (label) syncCloudActivity(label, "challenge");
		}
	},
	async addRoadmap(r, name) {
		const u = auth.currentUser;
		let roadmapId = r.id || `rm-${Date.now().toString(36)}`;
		if (u && canWriteFirestore()) {
			roadmapId = await createRoadmapWithTasks(u.uid, {
				careerId: r.careerId,
				title: r.title || `${name} Roadmap`,
				level: r.level ?? "beginner",
				hours: r.hours,
				budget: r.budget,
				format: r.format,
				project: r.project,
				weeks: r.weeks
			}, r.tasks.map((t, idx) => ({
				id: t.id,
				phase: t.phase,
				week: t.week ?? idx + 1,
				position: idx,
				title: t.title,
				desc: t.desc,
				effort: t.effort,
				objectives: t.objectives,
				difficulty: t.difficulty,
				practicalTask: t.practicalTask,
				freeAlternative: t.freeAlternative ?? null,
				resource: t.resource ?? null,
				done: t.done
			})));
			syncCloudActivity(`Created a roadmap for ${name}`, "roadmap");
		}
		const created = {
			...r,
			id: roadmapId,
			title: r.title || `${name} Roadmap`
		};
		setState((s) => log({
			...s,
			roadmaps: [created, ...s.roadmaps.filter((x) => x.id !== roadmapId)],
			activeRoadmapId: roadmapId
		}, `Created a roadmap for ${name}`, "roadmap"));
		return roadmapId;
	},
	setRoadmap(r, name) {
		this.addRoadmap(r, name);
	},
	selectRoadmap(roadmapId) {
		setState((s) => ({
			...s,
			activeRoadmapId: roadmapId
		}));
	},
	renameRoadmap(roadmapId, title) {
		const u = auth.currentUser;
		setState((s) => ({
			...s,
			roadmaps: s.roadmaps.map((rm) => rm.id === roadmapId ? {
				...rm,
				title
			} : rm)
		}));
		if (u && canWriteFirestore()) updateRoadmapTitleInDb(u.uid, roadmapId, title).catch(() => {});
	},
	async deleteRoadmap(roadmapId) {
		const u = auth.currentUser;
		if (u && canWriteFirestore()) await deleteRoadmapWithTasks(u.uid, roadmapId).catch(() => {});
		setState((s) => {
			const remaining = s.roadmaps.filter((r) => r.id !== roadmapId);
			const nextActive = s.activeRoadmapId === roadmapId ? remaining[0]?.id : s.activeRoadmapId;
			return log({
				...s,
				roadmaps: remaining,
				activeRoadmapId: nextActive
			}, "Removed a roadmap", "roadmap");
		});
	},
	addTaskToRoadmap(roadmapId, task) {
		const u = auth.currentUser;
		const targetRm = state.roadmaps.find((r) => r.id === roadmapId);
		const pos = targetRm ? targetRm.tasks.length : 0;
		setState((s) => ({
			...s,
			roadmaps: s.roadmaps.map((rm) => rm.id === roadmapId ? {
				...rm,
				tasks: [...rm.tasks, task]
			} : rm)
		}));
		if (u && canWriteFirestore()) addCustomTaskToRoadmap(u.uid, roadmapId, {
			id: task.id,
			phase: task.phase,
			week: task.week ?? pos + 1,
			position: pos,
			title: task.title,
			desc: task.desc,
			effort: task.effort,
			resource: task.resource ?? null,
			done: task.done
		}).catch(() => {});
	},
	toggleTask(taskId, roadmapId) {
		const u = auth.currentUser;
		const targetId = roadmapId ?? state.activeRoadmapId ?? state.roadmap?.id;
		if (!targetId) return;
		let toggledTitle = "";
		let toggledDone = false;
		setState((s) => {
			const nextRoadmaps = s.roadmaps.map((rm) => {
				if (rm.id !== targetId) return rm;
				const tasks = rm.tasks.map((t) => {
					if (t.id !== taskId) return t;
					toggledDone = !t.done;
					toggledTitle = t.title;
					return {
						...t,
						done: toggledDone
					};
				});
				return {
					...rm,
					tasks
				};
			});
			if (!toggledTitle) return s;
			return log({
				...s,
				roadmaps: nextRoadmaps
			}, `${toggledDone ? "Completed" : "Reopened"} task: ${toggledTitle}`, "task");
		});
		if (toggledTitle && u && canWriteFirestore()) {
			toggleRoadmapTaskInDb(u.uid, targetId, taskId, toggledDone).catch(() => {});
			syncCloudActivity(`${toggledDone ? "Completed" : "Reopened"} task: ${toggledTitle}`, "task");
		}
	},
	setTaskNote(taskId, note, roadmapId) {
		const u = auth.currentUser;
		const targetId = roadmapId ?? state.activeRoadmapId ?? state.roadmap?.id;
		if (!targetId) return;
		const cleaned = note.trim().slice(0, 400);
		setState((s) => ({
			...s,
			roadmaps: s.roadmaps.map((rm) => rm.id === targetId ? {
				...rm,
				tasks: rm.tasks.map((t) => t.id === taskId ? {
					...t,
					note: cleaned
				} : t)
			} : rm)
		}));
		if (u && canWriteFirestore()) updateRoadmapTaskNoteInDb(u.uid, targetId, taskId, cleaned).catch(() => {});
	},
	async saveBudgetPlan(input) {
		const u = auth.currentUser;
		let id = `plan-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
		if (u && canWriteFirestore()) {
			id = await saveLearningPlan(u.uid, input);
			syncCloudActivity(`Saved budget plan for ${input.careerName}`, "roadmap");
		}
		const created = {
			...input,
			id,
			createdAtMs: Date.now()
		};
		setState((s) => log({
			...s,
			savedPlans: [created, ...s.savedPlans.filter((p) => p.id !== id)].slice(0, 20)
		}, `Saved ₹${input.budget.toLocaleString("en-IN")} learning plan for ${input.careerName}`, "roadmap"));
		return created;
	},
	async removeBudgetPlan(planId) {
		const u = auth.currentUser;
		if (u && canWriteFirestore()) await deleteLearningPlan(u.uid, planId).catch(() => {});
		setState((s) => ({
			...s,
			savedPlans: s.savedPlans.filter((p) => p.id !== planId)
		}));
	},
	resetRoadmapProgress(roadmapId) {
		const u = auth.currentUser;
		const target = state.roadmaps.find((r) => r.id === roadmapId);
		if (!target) return;
		setState((s) => log({
			...s,
			roadmaps: s.roadmaps.map((rm) => rm.id === roadmapId ? {
				...rm,
				tasks: rm.tasks.map((t) => ({
					...t,
					done: false
				}))
			} : rm)
		}, `Reset progress on ${target.title}`, "roadmap"));
		if (u && canWriteFirestore()) resetRoadmapTasksInDb(u.uid, roadmapId, target.tasks.map((t) => t.id)).catch(() => {});
	},
	retuneRoadmapHours(roadmapId, nextHours) {
		const u = auth.currentUser;
		const hrs = Math.max(1, Math.min(50, Math.round(nextHours)));
		const target = state.roadmaps.find((r) => r.id === roadmapId);
		if (!target) return;
		let totalHours = 0;
		for (const t of target.tasks) {
			const m = t.effort.match(/(\d+)\s*h/);
			totalHours += m ? Number(m[1]) : 4;
		}
		const nextWeeks = Math.max(2, Math.ceil(totalHours / hrs));
		setState((s) => ({
			...s,
			roadmaps: s.roadmaps.map((rm) => {
				if (rm.id !== roadmapId) return rm;
				let cum = 0;
				return {
					...rm,
					hours: hrs,
					weeks: nextWeeks,
					tasks: rm.tasks.map((t) => {
						const m = t.effort.match(/(\d+)\s*h/);
						const h = m ? Number(m[1]) : 4;
						cum += h;
						return {
							...t,
							week: Math.max(1, Math.ceil(cum / hrs)),
							effort: `${h} h · ~${Math.max(1, Math.ceil(h / hrs))} wk`
						};
					})
				};
			})
		}));
		if (u && canWriteFirestore()) updateRoadmapHoursInDb(u.uid, roadmapId, hrs, nextWeeks).catch(() => {});
	},
	saveOpportunity(opportunityId, title, category, status = "saved") {
		const u = auth.currentUser;
		const now = Date.now();
		setState((s) => {
			const exists = s.savedOpportunities.some((o) => o.opportunityId === opportunityId);
			const next = exists ? s.savedOpportunities.map((o) => o.opportunityId === opportunityId ? {
				...o,
				status,
				updatedAtMs: now
			} : o) : [{
				opportunityId,
				title,
				category,
				status,
				savedAtMs: now,
				updatedAtMs: now
			}, ...s.savedOpportunities];
			return log({
				...s,
				savedOpportunities: next
			}, `${exists ? "Updated" : "Saved"} opportunity: ${title}`, "opportunity");
		});
		if (u && canWriteFirestore()) {
			saveOpportunityRecord(u.uid, opportunityId, title, category, status).catch(() => {});
			syncCloudActivity(`Saved opportunity: ${title}`, "opportunity");
		}
	},
	removeOpportunity(opportunityId) {
		const u = auth.currentUser;
		setState((s) => ({
			...s,
			savedOpportunities: s.savedOpportunities.filter((o) => o.opportunityId !== opportunityId)
		}));
		if (u && canWriteFirestore()) removeSavedOpportunityRecord(u.uid, opportunityId).catch(() => {});
	},
	async addTransition(input) {
		const u = auth.currentUser;
		let id = `trn-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
		if (u && canWriteFirestore()) {
			id = await saveTransitionRecord(u.uid, input);
			syncCloudActivity(`Simulated transition to ${input.targetCareerName}`, "transition");
		}
		const created = {
			...input,
			id,
			createdAtMs: Date.now()
		};
		setState((s) => log({
			...s,
			transitions: [created, ...s.transitions].slice(0, 15)
		}, `Simulated transition: ${input.currentRole} → ${input.targetCareerName}`, "transition"));
		return created;
	},
	async removeTransition(transitionId) {
		const u = auth.currentUser;
		if (u && canWriteFirestore()) await deleteTransitionRecord(u.uid, transitionId).catch(() => {});
		setState((s) => ({
			...s,
			transitions: s.transitions.filter((t) => t.id !== transitionId)
		}));
	},
	reset() {
		setState(() => DEFAULT);
	}
};
function roadmapProgress(r) {
	if (!r || r.tasks.length === 0) return {
		done: 0,
		total: 0,
		pct: 0,
		phase: 0
	};
	const done = r.tasks.filter((t) => t.done).length;
	const next = r.tasks.find((t) => !t.done);
	return {
		done,
		total: r.tasks.length,
		pct: Math.round(done / r.tasks.length * 100),
		phase: next ? next.phase : 5
	};
}
//#endregion
//#region src/lib/career-types.ts
var INDUSTRIES = [
	"Technology & IT",
	"Artificial Intelligence",
	"Sports",
	"Healthcare",
	"Business & Management",
	"Finance",
	"Law",
	"Science & Research",
	"Creative Arts",
	"Design",
	"Media & Entertainment",
	"Education",
	"Government",
	"Defence",
	"Environment",
	"Hospitality",
	"Engineering",
	"Entrepreneurship",
	"Agriculture",
	"Social Sciences"
];
var VERIFIED_RESOURCES = {
	fcc: {
		name: "freeCodeCamp",
		url: "https://www.freecodecamp.org/learn",
		cost: "Free",
		note: "Interactive web & programming curriculum"
	},
	mdn: {
		name: "MDN Learn Web Development",
		url: "https://developer.mozilla.org/en-US/docs/Learn",
		cost: "Free",
		note: "Reference-quality HTML/CSS/JS guides"
	},
	cs50: {
		name: "Harvard CS50x",
		url: "https://cs50.harvard.edu/x/",
		cost: "Free",
		note: "Foundations of computer science"
	},
	odin: {
		name: "The Odin Project",
		url: "https://www.theodinproject.com/",
		cost: "Free",
		note: "Project-based web development path"
	},
	kaggle: {
		name: "Kaggle Learn",
		url: "https://www.kaggle.com/learn",
		cost: "Free",
		note: "Short Python, pandas & ML courses"
	},
	ml: {
		name: "Machine Learning Specialization (Coursera)",
		url: "https://www.coursera.org/learn/machine-learning",
		cost: "Free to audit",
		note: "Audit option availability may vary"
	},
	huggingface: {
		name: "Hugging Face Learn",
		url: "https://huggingface.co/learn",
		cost: "Free",
		note: "Hands-on NLP, LLM & computer vision courses"
	},
	khan: {
		name: "Khan Academy Computing",
		url: "https://www.khanacademy.org/computing",
		cost: "Free",
		note: "Gentle introduction for school students"
	},
	khanEcon: {
		name: "Khan Academy Economics & Finance",
		url: "https://www.khanacademy.org/economics-finance-domain",
		cost: "Free",
		note: "Microeconomics, macroeconomics & finance basics"
	},
	khanSci: {
		name: "Khan Academy Science",
		url: "https://www.khanacademy.org/science",
		cost: "Free",
		note: "Biology, chemistry, physics & health foundations"
	},
	khanHum: {
		name: "Khan Academy Humanities",
		url: "https://www.khanacademy.org/humanities",
		cost: "Free",
		note: "History, civics, art history & storytelling"
	},
	w3py: {
		name: "W3Schools Python",
		url: "https://www.w3schools.com/python/",
		cost: "Free",
		note: "Quick Python syntax practice"
	},
	thm: {
		name: "TryHackMe",
		url: "https://tryhackme.com/",
		cost: "Free tier",
		note: "Guided security labs; some rooms paid"
	},
	owasp: {
		name: "OWASP Top Ten",
		url: "https://owasp.org/www-project-top-ten/",
		cost: "Free",
		note: "Common web security risks"
	},
	figma: {
		name: "Figma Resource Library",
		url: "https://www.figma.com/resource-library/",
		cost: "Free",
		note: "Design fundamentals; Figma has a free plan"
	},
	laws: {
		name: "Laws of UX",
		url: "https://lawsofux.com/",
		cost: "Free",
		note: "Psychology principles behind interfaces"
	},
	skillshop: {
		name: "Google Skillshop",
		url: "https://skillshop.withgoogle.com/",
		cost: "Free",
		note: "Google Ads & Analytics training"
	},
	nptel: {
		name: "NPTEL",
		url: "https://nptel.ac.in/",
		cost: "Free",
		note: "IIT/IISc university courses; proctored exam fee optional"
	},
	swayam: {
		name: "SWAYAM India",
		url: "https://swayam.gov.in/",
		cost: "Free",
		note: "National MOOC platform across arts, law, science & commerce"
	},
	mitocw: {
		name: "MIT OpenCourseWare",
		url: "https://ocw.mit.edu/",
		cost: "Free",
		note: "Open university lecture notes & engineering courses"
	},
	mslearn: {
		name: "Microsoft Learn",
		url: "https://learn.microsoft.com/en-us/training/",
		cost: "Free",
		note: "Cloud, data, and software career learning paths"
	},
	openwho: {
		name: "OpenWHO Learning",
		url: "https://openwho.org/",
		cost: "Free",
		note: "WHO public health & epidemiology courses"
	},
	fifa: {
		name: "FIFA Training Centre",
		url: "https://www.fifatrainingcentre.com/",
		cost: "Free",
		note: "Tactical analysis, coaching methodology & grassroots guides"
	},
	varsity: {
		name: "Varsity by Zerodha",
		url: "https://zerodha.com/varsity/",
		cost: "Free",
		note: "Structured personal finance, markets & valuation modules"
	},
	ncert: {
		name: "NCERT Textbooks & Guides",
		url: "https://ncert.nic.in/",
		cost: "Free",
		note: "Core Indian school textbooks across science, humanities & commerce"
	},
	unccl: {
		name: "UN CC:Learn",
		url: "https://unccelearn.org/",
		cost: "Free",
		note: "UN climate change, sustainability & environmental policy courses"
	},
	fao: {
		name: "FAO elearning Academy",
		url: "https://elearning.fao.org/",
		cost: "Free",
		note: "Sustainable agriculture, food systems & rural development"
	},
	blender: {
		name: "Blender Tutorials",
		url: "https://www.blender.org/support/tutorials/",
		cost: "Free",
		note: "Open-source 3D modelling, animation & rendering"
	},
	godot: {
		name: "Godot Engine Docs",
		url: "https://docs.godotengine.org/en/stable/",
		cost: "Free",
		note: "Free open-source 2D & 3D game development"
	},
	courseraAudit: {
		name: "Coursera (Free Audit)",
		url: "https://www.coursera.org/",
		cost: "Free to audit",
		note: "Many university courses allow free video auditing"
	}
};
var COMMITMENT_TEXT = {
	1: "Beginner-friendly starting curve; foundational habits build over a few weeks.",
	2: "Moderate onboarding; steady weekly practice develops confidence over 2–3 months.",
	3: "Consistent structured practice across core skills and portfolio projects.",
	4: "Substantial domain or technical depth; requires sustained multi-month study.",
	5: "High academic or specialist rigour; formal qualifications or deep mastery required."
};
var HUE_BY_INDUSTRY = {
	"Technology & IT": "lavender",
	"Artificial Intelligence": "pink",
	Sports: "turquoise",
	Healthcare: "cyan",
	"Business & Management": "warning",
	Finance: "cyan",
	Law: "violet",
	"Science & Research": "turquoise",
	"Creative Arts": "pink",
	Design: "violet",
	"Media & Entertainment": "warning",
	Education: "lavender",
	Government: "cyan",
	Defence: "warning",
	Environment: "turquoise",
	Hospitality: "pink",
	Engineering: "lavender",
	Entrepreneurship: "warning",
	Agriculture: "turquoise",
	"Social Sciences": "violet"
};
function expandCareers(industry, items, defaults) {
	return items.map((t) => {
		const [id, name, subcategory, short, day, skills, interests, capabilities, subjects, pathways, altRoutes, projects, emerging, commitmentLevel, environment, minEducation, budgetTier, pros, cons, trial, resKeys, challengeId] = t;
		const tags = Array.from(/* @__PURE__ */ new Set([
			...interests,
			...capabilities,
			...skills.map((s) => s.toLowerCase()),
			industry.toLowerCase(),
			subcategory.toLowerCase()
		]));
		return {
			id,
			name,
			industry,
			subcategory,
			short,
			hue: HUE_BY_INDUSTRY[industry],
			day,
			responsibilities: [
				`Plan and execute core ${subcategory.toLowerCase()} workflows`,
				`Collaborate with peers and stakeholders on deliverables`,
				`Evaluate quality, safety, or outcomes against clear standards`,
				`Keep learning new methods and tools in ${industry}`
			],
			skills,
			capabilities,
			interests,
			subjects,
			pathways,
			altRoutes,
			projects,
			commitment: COMMITMENT_TEXT[commitmentLevel] ?? COMMITMENT_TEXT[3],
			commitmentLevel,
			estimatedCostNote: defaults.costNote,
			progression: [
				`Trainee / Junior ${name}`,
				name,
				`Senior / Lead ${name}`,
				`${subcategory} Director or Specialist`
			],
			freelanceOpportunity: defaults.freelance,
			entrepreneurshipOpportunity: defaults.entrepreneurship,
			entryLevelOpportunities: defaults.entryLevel,
			pros,
			cons,
			resources: resKeys.map((k) => VERIFIED_RESOURCES[k]),
			trial,
			challengeId,
			emerging,
			environment,
			minEducation,
			budgetTier,
			tags
		};
	});
}
//#endregion
//#region src/lib/careers-data-part1.ts
var CAREERS_PART_1 = [
	...expandCareers("Technology & IT", [
		[
			"software-developer",
			"Software Developer",
			"Application Engineering",
			"Design, build and maintain software applications people rely on daily.",
			"Writing and reviewing code, breaking features into tasks, fixing bugs and collaborating with teammates.",
			[
				"Programming logic",
				"JavaScript or Python",
				"Git",
				"Problem decomposition",
				"Debugging"
			],
			[
				"technology",
				"gaming",
				"mathematics"
			],
			[
				"problem_solving",
				"analytical",
				"technical",
				"teamwork"
			],
			[
				"Mathematics",
				"Computer Science",
				"Physics"
			],
			[
				"B.Tech / B.E. in CSE or IT",
				"BCA → MCA",
				"Self-taught with a strong project portfolio"
			],
			["Open-source contributions", "Apprenticeships and coding fellowships"],
			[
				"Personal portfolio website",
				"To-do app with persistence",
				"CLI quiz utility"
			],
			false,
			3,
			"Office / desk",
			"Class 12",
			0,
			[
				"Many core resources are free",
				"Build tangible projects quickly",
				"Skills transfer across every industry"
			],
			[
				"Debugging requires patience",
				"Tools and frameworks evolve fast",
				"Long periods of screen focus"
			],
			"Trace a 10-line loop or build a single working HTML/JS counter.",
			[
				"cs50",
				"fcc",
				"mdn",
				"odin"
			],
			"software"
		],
		[
			"web-developer",
			"Web Developer",
			"Frontend & Full-Stack Web",
			"Craft responsive websites and interactive web applications for every screen.",
			"Turning interface layouts into accessible code, connecting APIs and testing across browsers.",
			[
				"HTML & CSS",
				"JavaScript / TypeScript",
				"Responsive layout",
				"Accessibility",
				"REST APIs"
			],
			[
				"technology",
				"design",
				"art"
			],
			[
				"creativity",
				"technical",
				"problem_solving",
				"observation"
			],
			[
				"Computer Science",
				"Fine Arts",
				"Mathematics"
			],
			[
				"B.Tech / BCA",
				"Diploma in Web Technologies",
				"Portfolio-first self-learning"
			],
			["Freelance local business websites", "Open-source UI templates"],
			[
				"Landing page for a community club",
				"Interactive recipe finder",
				"Weather dashboard"
			],
			false,
			2,
			"Remote / from home",
			"Class 10+",
			0,
			[
				"Fast visual feedback loop",
				"Low barrier to start on any laptop",
				"High freelance flexibility"
			],
			[
				"Browser compatibility edge cases",
				"Frequent ecosystem updates",
				"Crowded entry-level market"
			],
			"Create a responsive one-page personal bio using HTML and CSS.",
			[
				"mdn",
				"fcc",
				"odin"
			],
			"software"
		],
		[
			"data-analyst",
			"Data Analyst",
			"Business & Operations Analytics",
			"Turn raw spreadsheets and records into clear insights for better decisions.",
			"Cleaning datasets, writing SQL queries, building charts and presenting findings clearly.",
			[
				"Spreadsheets",
				"SQL",
				"Data visualisation",
				"Statistics basics",
				"Data storytelling"
			],
			[
				"technology",
				"mathematics",
				"business"
			],
			[
				"analytical",
				"mathematics",
				"observation",
				"communication"
			],
			[
				"Mathematics",
				"Economics",
				"Computer Science",
				"Business Studies"
			],
			[
				"B.Sc. / B.Com / BBA with analytics",
				"B.Tech CSE",
				"Portfolio of public dataset case studies"
			],
			["Internship via NGO/sports club data tracking", "Google / Kaggle public notebooks"],
			[
				"Personal expense tracker dashboard",
				"City transit trend report",
				"Sports match stats summary"
			],
			false,
			2,
			"Office / desk",
			"Class 12",
			0,
			[
				"Accessible entry via spreadsheets",
				"Relevant in sports, finance, health and tech",
				"Blends logic with communication"
			],
			[
				"Data cleaning can feel repetitive",
				"Strict attention to edge cases required",
				"Insights depend on source quality"
			],
			"Inspect a 6-month bar chart and write three evidence-based takeaways.",
			[
				"kaggle",
				"khan",
				"nptel"
			],
			"data"
		],
		[
			"cybersecurity-analyst",
			"Cybersecurity Analyst",
			"Information Security",
			"Protect networks, accounts and digital systems from threats and breaches.",
			"Reviewing security alerts, investigating suspicious traffic, patching flaws and educating teams.",
			[
				"Networking basics",
				"Linux CLI",
				"Threat triage",
				"OWASP security",
				"Incident documentation"
			],
			["technology", "law"],
			[
				"analytical",
				"observation",
				"problem_solving",
				"critical_thinking"
			],
			[
				"Computer Science",
				"Mathematics",
				"Physics"
			],
			[
				"B.Tech CSE (Cybersecurity)",
				"BCA + security labs",
				"Legal CTF practice + internships"
			],
			["Bug bounty programs (authorised scope)", "University SOC volunteer teams"],
			[
				"Home Wi-Fi hardening checklist",
				"Phishing awareness guide",
				"Starter TryHackMe rooms"
			],
			false,
			4,
			"Office / desk",
			"Class 12",
			0,
			[
				"Puzzle-like investigative mindset",
				"Strong social purpose protecting users",
				"Legal hands-on practice labs exist"
			],
			[
				"Continuous upskilling as threats shift",
				"On-call pressure during incidents",
				"Requires strict ethical boundaries"
			],
			"Evaluate a suspicious SMS message and identify three phishing red flags.",
			[
				"thm",
				"owasp",
				"cs50"
			],
			"cyber"
		],
		[
			"cloud-architect",
			"Cloud Solutions Architect",
			"Cloud Infrastructure",
			"Design scalable, reliable cloud systems that power modern apps and services.",
			"Selecting cloud services, planning fault tolerance, reviewing cost efficiency and security boundaries.",
			[
				"Cloud networking",
				"Linux & containers",
				"IAM security",
				"Cost estimation",
				"System design"
			],
			["technology", "business"],
			[
				"analytical",
				"technical",
				"organisation",
				"problem_solving"
			],
			[
				"Computer Science",
				"Mathematics",
				"Physics"
			],
			[
				"B.Tech / B.E. CSE",
				"Systems admin → cloud transition",
				"Cloud vendor free learning paths"
			],
			["Open-source self-hosting projects", "Cloud free-tier lab deployments"],
			[
				"Static site CDN deployment",
				"Diagram a 3-tier web app",
				"Serverless API prototype"
			],
			false,
			4,
			"Remote / from home",
			"Undergraduate Degree",
			0,
			[
				"High architectural ownership",
				"Remote-friendly engineering work",
				"Cross-team leadership"
			],
			[
				"Misconfigurations carry high cost or outage risk",
				"Steep prerequisite knowledge",
				"Vendor lock-in trade-offs"
			],
			"Sketch how a school website handles 10,000 exam-day visitors without crashing.",
			[
				"mslearn",
				"cs50",
				"nptel"
			],
			"software"
		],
		[
			"devops-engineer",
			"DevOps & SRE Engineer",
			"Infrastructure Automation",
			"Automate testing, deployment and reliability so software ships smoothly.",
			"Maintaining CI/CD pipelines, monitoring uptime metrics, writing automation scripts and resolving outages.",
			[
				"Linux",
				"Git & CI/CD",
				"Docker",
				"Scripting (Bash/Python)",
				"Observability"
			],
			["technology"],
			[
				"technical",
				"problem_solving",
				"organisation",
				"analytical"
			],
			["Computer Science", "Mathematics"],
			[
				"B.Tech / BCA",
				"Software developer → SRE transition",
				"Linux foundation + cloud projects"
			],
			["Homelab container setups", "Automating student club deployments"],
			[
				"Automated test workflow with GitHub Actions",
				"Containerise a small API",
				"Uptime alert script"
			],
			false,
			4,
			"Remote / from home",
			"Undergraduate Degree",
			0,
			[
				"Bridges software and operations",
				"Automation eliminates repetitive work",
				"High demand across tech teams"
			],
			[
				"Incident response can interrupt off-hours",
				"Complex debugging across distributed systems",
				"Requires breadth across tools"
			],
			"Write a small checklist of steps that must pass before deploying an app update.",
			[
				"mslearn",
				"fcc",
				"cs50"
			],
			"software"
		],
		[
			"mobile-app-developer",
			"Mobile App Developer",
			"Android & iOS Engineering",
			"Build smooth, offline-capable apps for smartphones and tablets.",
			"Implementing screens, managing device storage, integrating sensors and testing across phone sizes.",
			[
				"Kotlin / Swift / React Native",
				"UI state management",
				"APIs & offline sync",
				"Testing",
				"App ergonomics"
			],
			[
				"technology",
				"design",
				"gaming"
			],
			[
				"technical",
				"creativity",
				"problem_solving"
			],
			[
				"Computer Science",
				"Mathematics",
				"Fine Arts"
			],
			[
				"B.Tech / BCA",
				"Mobile development diploma",
				"App Store / Play Store portfolio"
			],
			["Publish a campus utility app", "Cross-platform starter projects"],
			[
				"Habit tracker app",
				"Offline flashcard study app",
				"Local bus timetable viewer"
			],
			false,
			3,
			"Office / desk",
			"Class 12",
			0,
			[
				"See your work running in your hand",
				"Useful for local community solutions",
				"Strong indie potential"
			],
			[
				"Device fragmentation testing",
				"App store review policies",
				"Emulator RAM requirements"
			],
			"Sketch four screens for an app that tracks daily water intake in two taps.",
			[
				"fcc",
				"mdn",
				"mslearn"
			],
			"uiux"
		],
		[
			"game-developer",
			"Game Developer",
			"Interactive Entertainment Tech",
			"Combine physics, art, audio and code to build playable interactive worlds.",
			"Prototyping gameplay loops, tuning controls, fixing frame-rate bottlenecks and playtesting builds.",
			[
				"C# / GDScript / C++",
				"2D/3D math",
				"Game loops",
				"Physics basics",
				"Playtesting"
			],
			[
				"gaming",
				"technology",
				"art",
				"music"
			],
			[
				"creativity",
				"problem_solving",
				"technical",
				"teamwork"
			],
			[
				"Mathematics",
				"Physics",
				"Computer Science",
				"Fine Arts"
			],
			[
				"B.Tech CSE / Game Design degree",
				"Self-taught with game jams",
				"Indie studio portfolio"
			],
			["48-hour online game jams", "Modding existing games"],
			[
				"2D platformer level in Godot",
				"Simple puzzle game",
				"Physics ball bounce prototype"
			],
			false,
			3,
			"Lab or studio",
			"Class 10+",
			0,
			[
				"Unites storytelling, math and tech",
				"Vibrant game-jam community",
				"Completely free engines like Godot exist"
			],
			[
				"Long hours near launch deadlines",
				"Harder to predict commercial hits",
				"Requires multi-disciplinary coordination"
			],
			"Design rules for a 1-minute two-button mini-game on paper.",
			[
				"godot",
				"cs50",
				"khan"
			],
			"software"
		],
		[
			"database-administrator",
			"Database Administrator",
			"Data Infrastructure",
			"Keep critical organisational databases fast, accurate, backed up and secure.",
			"Tuning slow queries, planning backup drills, managing permissions and preventing data corruption.",
			[
				"SQL mastery",
				"Indexing & query plans",
				"Backup & recovery",
				"Access control",
				"Schema design"
			],
			["technology", "mathematics"],
			[
				"organisation",
				"analytical",
				"observation",
				"technical"
			],
			["Computer Science", "Mathematics"],
			[
				"B.Tech / BCA / B.Sc. CS",
				"Backend engineering → DBA track",
				"Database administration certifications"
			],
			["Open-source PostgreSQL contributions", "Data migration apprenticeships"],
			[
				"Normalise a school library schema",
				"Benchmark indexed vs unindexed queries",
				"Write a backup script"
			],
			false,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Foundational role in banking, health and tech",
				"Predictable engineering depth",
				"Clear measurable impact"
			],
			[
				"High responsibility during data migrations",
				"Can require maintenance windows",
				"Less visual than frontend roles"
			],
			"Design tables for students, books and borrow records without duplicating student names.",
			[
				"khan",
				"fcc",
				"mslearn"
			],
			"data"
		],
		[
			"qa-automation-engineer",
			"QA & Test Automation Engineer",
			"Software Quality",
			"Catch defects early and build automated checks that keep software dependable.",
			"Writing edge-case test plans, automating browser clicks, reproducing bug reports and verifying fixes.",
			[
				"Test case design",
				"Bug reproduction",
				"Playwright / Selenium",
				"API testing",
				"Attention to detail"
			],
			["technology", "gaming"],
			[
				"observation",
				"critical_thinking",
				"analytical",
				"communication"
			],
			[
				"Computer Science",
				"English",
				"Mathematics"
			],
			[
				"B.Tech / BCA / B.Sc.",
				"Manual QA → automation engineering",
				"Open-source bug triage"
			],
			["Crowd-testing platforms", "Writing automated tests for student apps"],
			[
				"Test plan for a login form",
				"Write 5 automated UI checks",
				"Bug report walkthrough"
			],
			false,
			2,
			"Remote / from home",
			"Class 12",
			0,
			[
				"Gentle entry ramp into software teams",
				"Rewards sceptical, thorough thinkers",
				"High demand on product teams"
			],
			[
				"Repetitive regression runs without automation",
				"Tight pre-release deadlines",
				"Requires diplomacy when reporting bugs"
			],
			"List 8 ways a user could break a simple age-input form.",
			[
				"fcc",
				"mdn",
				"cs50"
			],
			"software"
		],
		[
			"network-engineer",
			"Network Engineer",
			"Telecom & Connectivity",
			"Design and maintain the routers, fibre links and Wi-Fi keeping teams connected.",
			"Configuring switches, diagnosing packet loss, mapping IP subnets and securing campus or enterprise links.",
			[
				"TCP/IP & DNS",
				"Subnetting",
				"Routing protocols",
				"Firewall rules",
				"Hardware diagnostics"
			],
			["technology"],
			[
				"problem_solving",
				"technical",
				"observation",
				"organisation"
			],
			[
				"Physics",
				"Computer Science",
				"Mathematics"
			],
			[
				"B.Tech ECE / CSE",
				"Polytechnic Diploma in Networking",
				"Apprenticeship with telecom/ISP"
			],
			["Campus IT lab volunteering", "Cisco Packet Tracer simulations"],
			[
				"Draw your home network topology",
				"Practise IPv4 subnetting",
				"Measure latency with traceroute"
			],
			false,
			3,
			"Office / desk",
			"Diploma / Certificate",
			0,
			[
				"Hands-on hardware and protocol mastery",
				"Essential across banks, hospitals and campuses",
				"Clear certification ladders"
			],
			[
				"On-site cabling or hardware swaps",
				"Urgent troubleshooting during outages",
				"Shift coverage in operations centres"
			],
			"Map every device on your home router and trace how DNS resolves a domain.",
			[
				"nptel",
				"khan",
				"mslearn"
			],
			"cyber"
		],
		[
			"blockchain-developer",
			"Distributed Ledger Engineer",
			"Web3 & Cryptographic Systems",
			"Build verifiable smart contracts and tamper-evident record systems.",
			"Writing deterministic contract logic, auditing edge-case exploits and testing consensus workflows.",
			[
				"Cryptography basics",
				"Solidity / Rust",
				"Smart contract auditing",
				"Distributed systems",
				"Testing"
			],
			[
				"technology",
				"finance",
				"mathematics"
			],
			[
				"analytical",
				"critical_thinking",
				"technical",
				"mathematics"
			],
			["Mathematics", "Computer Science"],
			[
				"B.Tech CSE",
				"Backend developer → cryptographic systems",
				"Open security audit contests"
			],
			["Protocol fellowships", "Public testnet security sandboxes"],
			[
				"Simple voting contract on a local testnet",
				"Audit a flawed token snippet",
				"Merkle tree verifier"
			],
			true,
			4,
			"Remote / from home",
			"Undergraduate Degree",
			0,
			[
				"Deep cryptography and systems learning",
				"Global remote collaboration",
				"Open-source culture"
			],
			[
				"Bugs in immutable code are unforgiving",
				"Industry cycles fluctuate sharply",
				"High security stakes"
			],
			"Trace how cryptographic hashing detects a single changed letter in a document.",
			[
				"cs50",
				"mitocw",
				"owasp"
			],
			"cyber"
		],
		[
			"esports-platform-engineer",
			"Esports & Gaming Infrastructure Engineer",
			"Competitive Gaming Tech",
			"Build low-latency matchmaking, tournament brackets and anti-cheat telemetry.",
			"Optimising real-time servers, syncing player stats, preventing match tampering and scaling tournament peaks.",
			[
				"Real-time WebSockets",
				"Backend APIs",
				"Latency optimisation",
				"Telemetry",
				"Fair-play logic"
			],
			[
				"gaming",
				"technology",
				"sports"
			],
			[
				"technical",
				"problem_solving",
				"analytical",
				"teamwork"
			],
			["Computer Science", "Mathematics"],
			[
				"B.Tech CSE / IT",
				"Game backend engineering portfolio",
				"Community tournament tool builders"
			],
			["Building Discord/tournament bots for college leagues", "Open-source game server mods"],
			[
				"Live tournament bracket generator",
				"Player Elo rating calculator",
				"Ping monitor dashboard"
			],
			true,
			3,
			"Remote / from home",
			"Undergraduate Degree",
			0,
			[
				"Turns gaming passion into core systems engineering",
				"Exciting live-event energy",
				"Transfers directly to fintech/streaming"
			],
			[
				"Traffic spikes during live finals",
				"Anti-cheat arms race",
				"Strict latency SLAs"
			],
			"Work out how an Elo rating updates when a lower-seeded team beats the top seed.",
			[
				"cs50",
				"fcc",
				"godot"
			],
			"software"
		]
	], {
		progression: [
			"Junior Engineer / Analyst",
			"Mid-level Specialist",
			"Senior / Staff Engineer",
			"Engineering Manager or Principal"
		],
		freelance: "Strong — independent web, app, QA, and analytics contracts are common once you have 2–3 portfolio projects.",
		entrepreneurship: "High — low capital required to launch SaaS tools, boutique agencies, or developer utilities.",
		entryLevel: "Internships, open-source fellowships, campus projects, and trainee roles.",
		costNote: "Free portals cover fundamentals; only a shared computer or lab access and optional exam fees apply."
	}),
	...expandCareers("Artificial Intelligence", [
		[
			"ai-ml-engineer",
			"AI/ML Engineer",
			"Applied Machine Learning",
			"Train, evaluate and deploy machine learning models that solve real problems.",
			"Cleaning datasets, testing model architectures, checking error slices and shipping APIs responsibly.",
			[
				"Python",
				"Statistics",
				"Linear algebra",
				"Model evaluation",
				"Scikit-learn / PyTorch"
			],
			[
				"ai",
				"technology",
				"mathematics",
				"science"
			],
			[
				"mathematics",
				"analytical",
				"technical",
				"problem_solving"
			],
			[
				"Mathematics",
				"Computer Science",
				"Physics"
			],
			[
				"B.Tech CSE / AI & DS",
				"B.Sc. Math/Stats + Python",
				"M.Tech / MS for specialised R&D"
			],
			["Kaggle competitions & open notebooks", "Research lab internships"],
			[
				"Spam vs real message classifier",
				"House price baseline with error analysis",
				"Handwritten digit notebook"
			],
			true,
			5,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Intellectually deep and versatile",
				"Rich open-source ecosystem",
				"Applies to health, sports, climate and tech"
			],
			[
				"Math-heavy prerequisites",
				"Models fail in surprising edge cases",
				"Compute limits on personal laptops"
			],
			"Compare two models on a small imbalanced dataset and spot why accuracy alone misleads.",
			[
				"kaggle",
				"ml",
				"huggingface",
				"nptel"
			],
			"data"
		],
		[
			"data-scientist",
			"Data Scientist",
			"Statistical Modelling",
			"Combine statistics, experiments and programming to answer complex questions.",
			"Designing A/B tests, modelling trends, questioning assumptions and briefing decision-makers.",
			[
				"Probability & statistics",
				"Python / R",
				"Experiment design",
				"SQL",
				"Communication"
			],
			[
				"ai",
				"mathematics",
				"science",
				"business"
			],
			[
				"mathematics",
				"analytical",
				"research",
				"communication"
			],
			[
				"Mathematics",
				"Economics",
				"Computer Science"
			],
			[
				"B.Sc./M.Sc. Statistics or Data Science",
				"B.Tech CSE",
				"Analytics → Data Science transition"
			],
			["Publish data investigations on public civic datasets", "University research assistantships"],
			[
				"A/B test sample size study",
				"Weather vs transit ridership model",
				"Survey bias audit"
			],
			false,
			4,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Mix of detective work, math and storytelling",
				"High strategic impact",
				"Strong free study tracks"
			],
			[
				"Unclear business questions",
				"Heavy data preparation before modelling",
				"Statistical traps require discipline"
			],
			"Think of three reasons why ice-cream sales and sunburns rise together without causing each other.",
			[
				"kaggle",
				"khan",
				"mitocw"
			],
			"data"
		],
		[
			"nlp-engineer",
			"NLP & Language AI Engineer",
			"Language Technology",
			"Teach software to understand, summarise, translate and retrieve human language.",
			"Fine-tuning embeddings, building search pipelines, evaluating multilingual accuracy and reducing hallucinations.",
			[
				"Python",
				"Tokenisation & embeddings",
				"Transformers",
				"Evaluation metrics",
				"Multilingual datasets"
			],
			[
				"ai",
				"writing",
				"technology"
			],
			[
				"technical",
				"analytical",
				"writing",
				"research"
			],
			[
				"Computer Science",
				"English",
				"Mathematics"
			],
			[
				"B.Tech CSE / Computational Linguistics",
				"M.Tech NLP",
				"Hugging Face open-source projects"
			],
			["Build regional-language study tools", "Open evaluation benchmarks"],
			[
				"FAQ semantic search tool",
				"Grammar error dataset check",
				"Regional text classifier"
			],
			true,
			4,
			"Remote / from home",
			"Undergraduate Degree",
			0,
			[
				"Blends linguistics and computer science",
				"High value in Indian multilingual tools",
				"Open pre-trained models available"
			],
			[
				"Subtle language bias and hallucinations",
				"Fast-moving research literature",
				"Evaluation is trickier than simple accuracy"
			],
			"Write 5 tricky test sentences where word order completely flips meaning.",
			[
				"huggingface",
				"kaggle",
				"ml"
			],
			"data"
		],
		[
			"computer-vision-engineer",
			"Computer Vision Engineer",
			"Visual AI Systems",
			"Enable cameras and sensors to detect objects, sports motion, or medical scans.",
			"Curating labelled image frames, training detection models and testing lighting or angle failure modes.",
			[
				"Python & OpenCV",
				"Image preprocessing",
				"CNNs / Vision models",
				"Geometry",
				"Error analysis"
			],
			[
				"ai",
				"technology",
				"sports",
				"healthcare"
			],
			[
				"mathematics",
				"observation",
				"technical",
				"problem_solving"
			],
			[
				"Mathematics",
				"Physics",
				"Computer Science"
			],
			[
				"B.Tech CSE / ECE",
				"M.Tech Computer Vision",
				"OpenCV & Kaggle CV tracks"
			],
			["Sports video ball-tracking prototypes", "Agricultural leaf-disease image projects"],
			[
				"Document edge scanner in Python",
				"Leaf health classifier",
				"Motion frame counter"
			],
			true,
			4,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Visual results you can immediately inspect",
				"Huge impact in healthcare, robotics and sports",
				"Strong open datasets"
			],
			[
				"Labelling quality bottlenecks",
				"Real-world lighting and camera blur",
				"GPU access needed for large models"
			],
			"Look at 4 photos and list lighting or occlusion issues that would confuse an automated detector.",
			[
				"kaggle",
				"huggingface",
				"nptel"
			],
			"data"
		],
		[
			"ai-ethics-specialist",
			"AI Ethics & Governance Specialist",
			"Responsible AI",
			"Audit AI systems for fairness, transparency, privacy risks and human oversight.",
			"Testing models for demographic bias, drafting model cards, reviewing data consent and advising product teams.",
			[
				"Fairness auditing",
				"Policy & privacy frameworks",
				"Critical writing",
				"AI literacy",
				"Stakeholder alignment"
			],
			[
				"ai",
				"law",
				"social"
			],
			[
				"critical_thinking",
				"writing",
				"research",
				"communication"
			],
			[
				"Political Science",
				"Computer Science",
				"English",
				"Psychology"
			],
			[
				"B.Tech / Law / Public Policy",
				"Interdisciplinary AI & Society masters",
				"Policy fellowships"
			],
			["Algorithmic audit reviews", "Civic tech ethics committees"],
			[
				"Audit a hiring rubric for hidden bias",
				"Write a clear model card for a grading tool",
				"Privacy checklist"
			],
			true,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Bridges humanities, law and technology",
				"Protects real people from automated harm",
				"Growing regulatory relevance"
			],
			[
				"Standards vary across countries",
				"Requires translating between legal and technical teams",
				"Few pure entry-level seats"
			],
			"Identify three ways historical hiring data could bias a resume-screening algorithm.",
			[
				"courseraAudit",
				"huggingface",
				"swayam"
			],
			"cyber"
		],
		[
			"prompt-evaluation-engineer",
			"AI Systems & Evaluation Engineer",
			"LLM Reliability",
			"Design structured prompts, retrieval pipelines and automated grading suites for AI apps.",
			"Building test benchmarks, inspecting failure traces, grounding outputs in databases and cutting latency.",
			[
				"Structured JSON schemas",
				"Evaluation rubrics",
				"Retrieval (RAG)",
				"Python / TypeScript",
				"Critical analysis"
			],
			[
				"ai",
				"technology",
				"writing"
			],
			[
				"analytical",
				"critical_thinking",
				"writing",
				"technical"
			],
			[
				"Computer Science",
				"English",
				"Mathematics"
			],
			[
				"B.Tech / BCA + AI app projects",
				"QA / Product → AI evaluation track",
				"Open evaluation benchmarks"
			],
			["Build grounded domain Q&A tools", "Open-source benchmark contributions"],
			[
				"20-question test suite for a study helper",
				"JSON schema validator",
				"Citation checker"
			],
			true,
			3,
			"Remote / from home",
			"Class 12",
			0,
			[
				"Combines communication clarity with engineering",
				"Rapidly growing practical need",
				"Easy to test small ideas quickly"
			],
			[
				"Prompt behaviour shifts across model versions",
				"Requires rigorous measurement over hype",
				"Must guard against hallucinations"
			],
			"Write 5 adversarial user inputs designed to trick a career advisor into making up fake facts.",
			[
				"huggingface",
				"fcc",
				"kaggle"
			],
			"data"
		],
		[
			"robotics-ai-engineer",
			"Robotics & Embodied AI Engineer",
			"Intelligent Machines",
			"Combine sensors, control theory and AI so robots navigate and act safely.",
			"Simulating robot arms or rovers, fusing sensor inputs, tuning control loops and testing safety stops.",
			[
				"C++ / Python",
				"ROS2 basics",
				"Control theory",
				"Linear algebra",
				"Sensor fusion"
			],
			[
				"ai",
				"technology",
				"science"
			],
			[
				"mathematics",
				"problem_solving",
				"technical",
				"observation"
			],
			[
				"Physics",
				"Mathematics",
				"Computer Science"
			],
			[
				"B.Tech Mechatronics / ECE / CSE",
				"M.Tech Robotics",
				"University robotics clubs"
			],
			["Open-source Gazebo simulations", "Drone / rover student competitions"],
			[
				"Line-follower PID simulation",
				"2D obstacle pathfinder",
				"Sensor noise filter"
			],
			true,
			5,
			"Lab or studio",
			"Undergraduate Degree",
			500,
			[
				"Tangible physical-world results",
				"Interdisciplinary mechanics + software",
				"Strong research community"
			],
			[
				"Hardware repairs take patience",
				"Strict safety testing",
				"Higher learning curve across math & electronics"
			],
			"Plan how a warehouse robot avoids colliding with another robot in a narrow aisle.",
			[
				"mitocw",
				"nptel",
				"cs50"
			],
			"software"
		],
		[
			"mlops-engineer",
			"MLOps Platform Engineer",
			"AI Infrastructure",
			"Keep machine learning pipelines reproducible, monitored and reliable in production.",
			"Versioning datasets, automating retraining workflows, tracking prediction drift and managing model serving.",
			[
				"Python",
				"Docker & CI/CD",
				"Data pipelines",
				"Monitoring",
				"Cloud basics"
			],
			["ai", "technology"],
			[
				"organisation",
				"technical",
				"analytical",
				"problem_solving"
			],
			["Computer Science", "Mathematics"],
			[
				"B.Tech CSE",
				"DevOps / Backend → MLOps",
				"Open ML pipeline projects"
			],
			["Build reproducible Kaggle pipelines", "Automate model card generation"],
			[
				"Version a tiny dataset + script with Git",
				"Model latency logger",
				"Data schema checker"
			],
			true,
			4,
			"Remote / from home",
			"Undergraduate Degree",
			0,
			[
				"Essential backbone for real AI products",
				"Combines software reliability with ML",
				"High engineering leverage"
			],
			[
				"Debugging spans both code and data drift",
				"Requires strong backend fundamentals",
				"Less model-invention glamour"
			],
			"List 5 checks to run before replacing a live recommendation model with a new version.",
			[
				"ml",
				"mslearn",
				"huggingface"
			],
			"software"
		],
		[
			"conversational-ai-designer",
			"Conversational AI & Voice UX Designer",
			"Human-AI Interaction",
			"Shape helpful, safe and natural voice or chat experiences across languages.",
			"Mapping user intents, writing clear fallback flows, testing tone and auditing accessibility.",
			[
				"Dialogue design",
				"UX writing",
				"User testing",
				"Intent mapping",
				"Empathy"
			],
			[
				"ai",
				"design",
				"writing",
				"media"
			],
			[
				"communication",
				"creativity",
				"writing",
				"observation"
			],
			[
				"English",
				"Psychology",
				"Computer Science"
			],
			[
				"B.Des / Mass Comm / CS",
				"UX Writer → Conversational Designer",
				"Voice assistant prototype portfolio"
			],
			["Regional-language IVR & accessibility bots", "Chatbot UX teardowns"],
			[
				"Flowchart for a student timetable bot",
				"Rewrite 5 unhelpful error messages",
				"Voice accessibility audit"
			],
			true,
			2,
			"Remote / from home",
			"Undergraduate Degree",
			0,
			[
				"Accessible without deep calculus",
				"High value for regional & voice access",
				"Combines writing with product design"
			],
			[
				"Users test boundaries unexpectedly",
				"Handing off cleanly to human support is crucial",
				"Hard to measure naturalness"
			],
			"Design a 4-step conversation flow when a user asks an unclear question without frustrating them.",
			[
				"figma",
				"laws",
				"huggingface"
			],
			"uiux"
		],
		[
			"healthcare-ai-analyst",
			"Clinical & Healthcare AI Specialist",
			"Health Informatics AI",
			"Bridge medical workflows and machine learning tools while guarding patient safety.",
			"Validating triage tools, auditing clinical datasets for missing groups and collaborating with doctors.",
			[
				"Biostatistics",
				"Health data standards",
				"Python",
				"Clinical ethics",
				"Communication"
			],
			[
				"ai",
				"healthcare",
				"science"
			],
			[
				"analytical",
				"research",
				"critical_thinking",
				"teamwork"
			],
			[
				"Biology",
				"Mathematics",
				"Computer Science"
			],
			[
				"B.Tech Biomedical / CS",
				"MBBS + Health Informatics",
				"Public health data fellowships"
			],
			["Hospital quality-improvement analytics", "OpenWHO + Kaggle health datasets"],
			[
				"Explore a public diabetes dataset responsibly",
				"Checklist for clinical tool safety",
				"Patient triage flow"
			],
			true,
			4,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Directly supports patient care",
				"Rare interdisciplinary niche",
				"Combines biology and data"
			],
			[
				"Strict regulatory validation",
				"High cost of false negatives",
				"Slow hospital adoption cycles"
			],
			"Explain why a heart-risk model trained only on urban adults could fail in rural clinics.",
			[
				"openwho",
				"kaggle",
				"nptel"
			],
			"data"
		],
		[
			"autonomous-systems-engineer",
			"Autonomous Mobility & Drone Systems Engineer",
			"Autonomous Systems",
			"Develop mapping, perception and safe navigation algorithms for drones and smart vehicles.",
			"Processing GPS/LiDAR streams, testing route planning in simulators and verifying fail-safe landings.",
			[
				"Path planning",
				"Python / C++",
				"Sensor calibration",
				"Simulation",
				"Safety engineering"
			],
			[
				"ai",
				"technology",
				"travel"
			],
			[
				"mathematics",
				"problem_solving",
				"technical",
				"observation"
			],
			[
				"Physics",
				"Mathematics",
				"Computer Science"
			],
			[
				"B.Tech Aerospace / ECE / CSE",
				"M.Tech Autonomous Systems",
				"Student UAV competitions"
			],
			["Open-source flight simulator scripting", "Precision agriculture drone teams"],
			[
				"A* grid pathfinder",
				"Battery-aware route planner",
				"Obstacle avoidance simulation"
			],
			true,
			5,
			"Lab or studio",
			"Undergraduate Degree",
			500,
			[
				"Cutting-edge mobility and mapping applications",
				"Used in disaster relief & agriculture",
				"Deep engineering challenge"
			],
			[
				"Heavy regulation in airspace/roads",
				"Edge-case testing requires simulation rigour",
				"Hardware costs in physical trials"
			],
			"Plan fallback actions if a mapping drone loses GPS signal mid-flight.",
			[
				"mitocw",
				"nptel",
				"khan"
			],
			"software"
		],
		[
			"ai-product-manager",
			"AI Product Manager",
			"AI Product Strategy",
			"Define what AI features should exist, how users trust them and how success is measured.",
			"Interviewing users, deciding whether AI is even needed, setting accuracy thresholds and aligning engineers.",
			[
				"User discovery",
				"AI capability limits",
				"Metrics design",
				"Prioritisation",
				"Clear writing"
			],
			[
				"ai",
				"business",
				"entrepreneurship",
				"technology"
			],
			[
				"leadership",
				"communication",
				"critical_thinking",
				"analytical"
			],
			[
				"Economics",
				"Computer Science",
				"Business Studies"
			],
			[
				"B.Tech / BBA / Design",
				"Product Analyst → AI PM",
				"Build and ship 2 small user-tested tools"
			],
			["Product teardowns of AI study tools", "Startup associate PM programs"],
			[
				"Write a 1-page spec for a student note helper",
				"Decide AI vs simple rule-engine trade-offs",
				"User interview script"
			],
			true,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Shapes real user value over hype",
				"High cross-functional leadership",
				"Accessible to both tech and business backgrounds"
			],
			[
				"Ambiguous accountability without direct authority",
				"Balancing hype vs reliability",
				"Constant market noise"
			],
			"Pick a student problem and list why a simple checklist beats an AI model for half of it.",
			[
				"courseraAudit",
				"huggingface",
				"skillshop"
			],
			"marketing"
		],
		[
			"sports-analytics-engineer",
			"Sports Analytics & Performance Data Specialist",
			"Sports AI & Telemetry",
			"Use tracking data, video and statistics to uncover tactical insights in football, cricket and athletics.",
			"Analysing match events, building shot/expected-goal charts, tracking player workload and briefing coaches.",
			[
				"Python / R",
				"Sports rules & tactics",
				"Statistical modelling",
				"Visualisation",
				"Concise briefing"
			],
			[
				"sports",
				"football",
				"cricket",
				"ai",
				"mathematics"
			],
			[
				"analytical",
				"observation",
				"mathematics",
				"teamwork"
			],
			[
				"Mathematics",
				"Physical Education",
				"Computer Science"
			],
			[
				"B.Tech / B.Sc. Stats + sports portfolio",
				"Sports Management / Analytics masters",
				"Open match-event data projects"
			],
			["Publish tactical breakdowns on public football/cricket datasets", "College team match stat tracking"],
			[
				"Cricket over-by-over momentum chart",
				"Football pass network sketch",
				"Player workload tracker"
			],
			true,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Ideal blend of sports passion and math/coding",
				"Growing adoption across clubs and broadcasters",
				"Visual storytelling"
			],
			[
				"Smaller hiring pool than general IT",
				"Must earn trust of traditional coaches",
				"Match-day schedules can be irregular"
			],
			"Watch 10 minutes of a football or cricket match and log 3 measurable tactical patterns.",
			[
				"kaggle",
				"fifa",
				"khan"
			],
			"data"
		]
	], {
		progression: [
			"Junior AI / Data Specialist",
			"Applied ML / AI Engineer",
			"Senior / Lead AI Specialist",
			"Principal Architect or Research Lead"
		],
		freelance: "Moderate-High — evaluation audits, analytics pipelines, and custom prototypes offer consulting paths.",
		entrepreneurship: "High — vertical AI tools for education, health, sports, and regional languages.",
		entryLevel: "Research fellowships, open dataset portfolios, Kaggle notebooks, and junior data/ML roles.",
		costNote: "Core coding and ML theory are free online; cloud GPUs have free student/notebook tiers."
	}),
	...expandCareers("Sports", [
		[
			"football-coach",
			"Football Coach",
			"Coaching & Tactics",
			"Develop players' technical skills, tactical awareness, fitness and team spirit on the pitch.",
			"Designing training drills, analysing match footage, mentoring young athletes and planning match-day tactics.",
			[
				"Tactical analysis",
				"Drill planning",
				"Player feedback",
				"Match rules & safety",
				"Team leadership"
			],
			[
				"sports",
				"football",
				"social"
			],
			[
				"leadership",
				"teamwork",
				"observation",
				"communication",
				"fitness"
			],
			[
				"Physical Education",
				"Psychology",
				"Biology",
				"Mathematics"
			],
			[
				"B.P.Ed (Physical Education)",
				"AIFF / AFC / UEFA Coaching Licenses (D → C → B → Pro)",
				"NSNIS Diploma in Sports Coaching"
			],
			["Grassroots school/club assistant coaching", "Certified refereeing → coaching pathway"],
			[
				"Design a 45-minute passing & pressing session plan",
				"Break down 3 build-up patterns from a match",
				"Warm-up safety checklist"
			],
			false,
			3,
			"Outdoors / on the move",
			"Class 12",
			1e3,
			[
				"Active, outdoor, people-centred work",
				"Direct impact on youth confidence and discipline",
				"Clear federated coaching licence ladder"
			],
			[
				"Weekend and evening hours",
				"Job security depends on results at senior levels",
				"Grassroots pay starts modest"
			],
			"Plan a 20-minute 4v4 possession drill with one clear coaching rule and safety note.",
			[
				"fifa",
				"ncert",
				"courseraAudit"
			],
			"marketing"
		],
		[
			"cricket-coach",
			"Cricket Coach & Video Tactician",
			"Coaching & Technique",
			"Refine batting, bowling and fielding biomechanics while building match strategy.",
			"Running net sessions, spotting footwork or release flaws, managing bowler workloads and planning matchups.",
			[
				"Technique observation",
				"Matchups & field placement",
				"Net session planning",
				"Injury prevention",
				"Mentoring"
			],
			["sports", "cricket"],
			[
				"observation",
				"leadership",
				"communication",
				"teamwork",
				"fitness"
			],
			[
				"Physical Education",
				"Physics",
				"Psychology"
			],
			[
				"B.P.Ed / M.P.Ed",
				"NCA / BCCI / ECB Level 1–3 Coaching Certifications",
				"NSNIS Cricket Coaching Diploma"
			],
			["District academy assistant coaching", "School team coaching + video tagging"],
			[
				"Record 10 bowling deliveries and note front-foot alignment",
				"Plan a powerplay bowling strategy",
				"Fielding drill circuit"
			],
			false,
			3,
			"Outdoors / on the move",
			"Class 12",
			1e3,
			[
				"Deep strategic nuance",
				"Massive grassroots academy ecosystem in India",
				"Strong mentorship role"
			],
			[
				"Outdoor heat and travel demands",
				"Competitive senior coaching slots",
				"Weather disruptions"
			],
			"Sketch two field placements for a spinner bowling to an aggressive left-hander in overs 7–10.",
			[
				"ncert",
				"khanSci",
				"courseraAudit"
			],
			"data"
		],
		[
			"sports-performance-analyst",
			"Sports Performance Analyst",
			"Match & Video Analysis",
			"Tag match video and player metrics so teams spot patterns invisible in real time.",
			"Coding match clips, building halftime feedback reels, tracking sprint zones and scouting upcoming opponents.",
			[
				"Video tagging",
				"Pattern recognition",
				"Tactical literacy",
				"Spreadsheets",
				"Clear visual reports"
			],
			[
				"sports",
				"football",
				"cricket",
				"technology"
			],
			[
				"observation",
				"analytical",
				"technical",
				"communication"
			],
			[
				"Physical Education",
				"Computer Science",
				"Mathematics"
			],
			[
				"B.Sc. Sports Science / Performance Analysis",
				"B.Tech + sports tagging portfolio",
				"Club academy internships"
			],
			["Volunteer video analyst for college football/cricket teams", "Open tactical blog/channel"],
			[
				"Tag 15 minutes of a match for turnovers",
				"Create a 5-slide opponent scouting summary",
				"Shot map chart"
			],
			true,
			2,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Enter professional sport without being a pro athlete",
				"Combines observation, video and data",
				"Fast-growing team role"
			],
			[
				"Tight overnight turnarounds during tournaments",
				"Long hours watching footage",
				"Fewer roles outside major leagues"
			],
			"Watch 5 minutes of football or cricket and timestamp every transition or tactical error.",
			[
				"fifa",
				"kaggle",
				"khan"
			],
			"data"
		],
		[
			"sports-physiotherapist",
			"Sports Physiotherapist",
			"Athlete Rehabilitation",
			"Prevent injuries, treat sprains and guide athletes safely back to peak movement.",
			"Assessing joint mobility, supervising rehab exercises, taping before matches and coordinating recovery.",
			[
				"Anatomy & biomechanics",
				"Injury assessment",
				"Rehab progression",
				"Manual therapy",
				"Empathy & patience"
			],
			[
				"sports",
				"healthcare",
				"science"
			],
			[
				"observation",
				"communication",
				"fitness",
				"problem_solving"
			],
			[
				"Biology",
				"Physics",
				"Physical Education"
			],
			[
				"BPT (Bachelor of Physiotherapy)",
				"MPT in Sports Physiotherapy",
				"Team/clinic clinical residency"
			],
			["Clinic internship → local tournament medical support", "Marathon/youth league physio volunteer"],
			[
				"Ankle sprain return-to-play checklist",
				"Dynamic warm-up sequence guide",
				"Posture assessment notes"
			],
			false,
			5,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			1e3,
			[
				"Deeply rewarding recovery impact",
				"Works across clubs, clinics and private practice",
				"Grounded in medical science"
			],
			[
				"Physically demanding treatment days",
				"Strict medical licensing needed",
				"4.5+ years degree pathway"
			],
			"Research why a sudden jump in weekly running distance causes shin splints.",
			[
				"khanSci",
				"openwho",
				"ncert"
			],
			"data"
		],
		[
			"athletic-trainer",
			"Athletic Trainer & Injury Prevention Specialist",
			"On-Field Readiness",
			"Manage sideline safety, concussion protocols, hydration and movement screening.",
			"Checking pitch safety, conducting pre-season screens, giving immediate first aid and tracking return-to-play.",
			[
				"First aid & CPR",
				"Movement screening",
				"Hydration & heat safety",
				"Taping",
				"Calm crisis response"
			],
			["sports", "healthcare"],
			[
				"observation",
				"fitness",
				"leadership",
				"teamwork"
			],
			[
				"Biology",
				"Physical Education",
				"Chemistry"
			],
			[
				"B.Sc. Sports Science / Kinesiology",
				"Certified First Aid & Athletic Training programs",
				"Sports medicine fellowships"
			],
			["School sports medical support", "Community marathon & league support"],
			[
				"Heat-safety hydration protocol for a summer tournament",
				"First-aid kit audit",
				"Pre-season mobility screen"
			],
			false,
			4,
			"Outdoors / on the move",
			"Undergraduate Degree",
			1e3,
			[
				"Front-row involvement in live sport",
				"Protects young athletes from preventable harm",
				"Active variety"
			],
			[
				"Sideline emergencies require calm under pressure",
				"Weekend tournament schedule",
				"Certification rules vary by region"
			],
			"Design a 5-point hydration and heat-break checklist for an afternoon youth match.",
			[
				"openwho",
				"khanSci",
				"fifa"
			],
			"cyber"
		],
		[
			"sports-nutritionist",
			"Sports Nutritionist",
			"Performance Nutrition",
			"Design evidence-based meal and hydration plans that fuel training and recovery.",
			"Calculating energy needs, adapting menus for travel or weight classes and debunking supplement myths.",
			[
				"Macronutrient planning",
				"Hydration science",
				"Athlete counselling",
				"Evidence literacy",
				"Cultural menu design"
			],
			[
				"sports",
				"healthcare",
				"science"
			],
			[
				"research",
				"analytical",
				"communication",
				"organisation"
			],
			[
				"Biology",
				"Chemistry",
				"Physical Education"
			],
			[
				"B.Sc. Nutrition & Dietetics",
				"M.Sc. Sports Nutrition",
				"IOC Diploma / registered dietitian credentials"
			],
			["Academy meal-planning workshops", "Tele-nutrition coaching with verified credentials"],
			[
				"Pre-match and recovery meal plan using everyday home food",
				"Label-reading audit",
				"Hydration plan"
			],
			false,
			4,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			500,
			[
				"Practical everyday science",
				"Blends clinical care with athletics",
				"Private consulting option"
			],
			[
				"Combating viral supplement misinformation",
				"Requires formal science credentials",
				"Strict client adherence challenges"
			],
			"Compare three common post-workout snacks for carbohydrates, protein and hydration.",
			[
				"khanSci",
				"fao",
				"openwho"
			],
			"data"
		],
		[
			"sports-journalist",
			"Sports Journalist & Broadcaster",
			"Sports Media",
			"Report matches, interview athletes and tell compelling human stories behind sport.",
			"Covering live fixtures, verifying stats, writing post-match features and producing audio/video clips.",
			[
				"Crisp sports writing",
				"Live interviewing",
				"Fact-checking",
				"Match literacy",
				"Digital storytelling"
			],
			[
				"sports",
				"football",
				"cricket",
				"writing",
				"media"
			],
			[
				"writing",
				"communication",
				"observation",
				"public_speaking"
			],
			[
				"English",
				"History",
				"Physical Education"
			],
			[
				"B.A. Journalism & Mass Communication",
				"Any degree + sports reporting portfolio",
				"Sports media fellowships"
			],
			["Independent tactical newsletter or podcast", "College athletics press desk"],
			[
				"300-word match report from a local game",
				"5-question athlete interview guide",
				"Tactical thread"
			],
			false,
			2,
			"Outdoors / on the move",
			"Class 12",
			0,
			[
				"Start writing and building samples immediately",
				"Access to live sporting moments",
				"Transferable media skills"
			],
			[
				"Tight post-match deadlines",
				"Competitive full-time newsrooms",
				"Weekend and late-night matches"
			],
			"Watch highlights of a close match and write a 150-word report without clichés.",
			[
				"khanHum",
				"swayam",
				"skillshop"
			],
			"marketing"
		],
		[
			"sports-event-manager",
			"Sports Event & League Operations Manager",
			"Sports Management",
			"Plan tournaments, venues, schedules, sponsorships and fan safety from kickoff to trophy.",
			"Coordinating pitch bookings, managing volunteer crews, aligning sponsors and troubleshooting match-day logistics.",
			[
				"Event scheduling",
				"Budgeting",
				"Vendor coordination",
				"Safety compliance",
				"Crisis troubleshooting"
			],
			[
				"sports",
				"business",
				"social"
			],
			[
				"organisation",
				"leadership",
				"teamwork",
				"communication"
			],
			[
				"Business Studies",
				"Economics",
				"Physical Education"
			],
			[
				"BBA / MBA in Sports Management",
				"Event management diploma + tournament volunteering",
				"Federation operations"
			],
			["Organise an inter-college football or cricket league", "Volunteer at city marathons"],
			[
				"8-team knockout tournament schedule & budget",
				"Match-day volunteer roster",
				"Sponsor pitch deck"
			],
			false,
			2,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Energetic team environment",
				"Visible live outcomes",
				"Transferable project-management skills"
			],
			[
				"High stress on event day",
				"Long physical hours outdoors",
				"Weather/venue last-minute changes"
			],
			"Schedule a 6-team round-robin tournament across 2 pitches in a single weekend.",
			[
				"courseraAudit",
				"skillshop",
				"fifa"
			],
			"marketing"
		],
		[
			"strength-conditioning-coach",
			"Strength & Conditioning Coach",
			"Athletic Development",
			"Build speed, agility, power and injury resilience across an athlete's season.",
			"Programming gym and pitch sessions, monitoring fatigue, coaching lifting form and tracking sprint times.",
			[
				"Exercise physiology",
				"Periodisation",
				"Speed & agility drills",
				"Form coaching",
				"Load tracking"
			],
			[
				"sports",
				"football",
				"cricket",
				"science"
			],
			[
				"fitness",
				"leadership",
				"observation",
				"mathematics"
			],
			[
				"Physical Education",
				"Biology",
				"Physics"
			],
			[
				"B.Sc. Exercise / Sports Science",
				"B.P.Ed + S&C Certification (NSCA / ASCA)",
				"Academy internships"
			],
			["Youth fitness camps", "Gym coaching → sport-specific S&C"],
			[
				"4-week off-season agility plan",
				"Vertical jump & sprint test log",
				"Warm-up movement audit"
			],
			false,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			1e3,
			[
				"Directly measurable athlete improvements",
				"Works with teams or individual clients",
				"Active lifestyle"
			],
			[
				"Early morning training slots",
				"Must adjust plans when athletes feel fatigued",
				"Certs cost money later"
			],
			"Explain why a footballer needs different endurance training than a marathon runner.",
			[
				"fifa",
				"khanSci",
				"courseraAudit"
			],
			"data"
		],
		[
			"youth-academy-scout",
			"Talent Scout & Youth Development Officer",
			"Player Identification",
			"Spot promising young talent fairly across regions and guide long-term player pathways.",
			"Attending school and district matches, writing structured scouting reports and checking age-group fairness.",
			[
				"Structured observation",
				"Potential vs early-size awareness",
				"Report writing",
				"Network building",
				"Ethics"
			],
			[
				"sports",
				"football",
				"cricket",
				"travel"
			],
			[
				"observation",
				"analytical",
				"writing",
				"communication"
			],
			[
				"Physical Education",
				"Psychology",
				"English"
			],
			[
				"B.P.Ed / Sports Management",
				"Coaching license + scouting accreditation (PFSA / federation)",
				"District association roles"
			],
			["Grassroots tournament coverage + scouting reports", "Partnering with local school coaches"],
			["Write a 1-page neutral scouting card watching a youth match", "Compare decision-making vs physical size"],
			false,
			3,
			"Outdoors / on the move",
			"Class 12",
			500,
			[
				"Discovers overlooked talent from small towns",
				"Travel and live sport",
				"High strategic impact on clubs"
			],
			[
				"Heavy weekend travel",
				"Subjective judgement pressure",
				"Limited salaried grassroots seats"
			],
			"Watch a match and focus strictly on what one player does when they DO NOT have the ball.",
			[
				"fifa",
				"courseraAudit",
				"swayam"
			],
			"marketing"
		],
		[
			"esports-strategist",
			"Esports Coach & Tactical Strategist",
			"Competitive Gaming",
			"Prepare competitive gaming rosters through VOD review, draft strategy and mental focus.",
			"Reviewing match replays, studying patch changes, running scrim blocks and keeping team communication calm.",
			[
				"Game meta analysis",
				"VOD review",
				"Team communication",
				"Tilt management",
				"Draft planning"
			],
			["gaming", "sports"],
			[
				"leadership",
				"analytical",
				"observation",
				"communication"
			],
			[
				"Computer Science",
				"Psychology",
				"Mathematics"
			],
			[
				"Any degree + high-level competitive/coaching track",
				"Esports management certificates",
				"Collegiate team coaching"
			],
			["Coach a university or amateur tournament squad", "Publish patch strategy breakdowns"],
			[
				"3-slide replay breakdown of a lost round",
				"Team comms checklist",
				"Practice schedule"
			],
			true,
			2,
			"Remote / from home",
			"Class 12",
			0,
			[
				"Turns competitive gaming analytical skills into coaching",
				"Remote scrim collaboration",
				"Youth-led ecosystem"
			],
			[
				"Short career spans in specific game titles",
				"Unstable smaller orgs",
				"Late-night scrim schedules"
			],
			"Review 5 minutes of a match replay and find one positioning mistake that cost the round.",
			[
				"courseraAudit",
				"skillshop",
				"khan"
			],
			"data"
		],
		[
			"sports-psychologist",
			"Sports & Performance Psychologist",
			"Mental Conditioning",
			"Help athletes handle pressure, recover confidence after setbacks and build pre-match routines.",
			"Running 1-on-1 mental-skills sessions, teaching focus techniques and advising coaches on team culture.",
			[
				"Counselling & listening",
				"Focus & breathing routines",
				"Goal setting",
				"Research methods",
				"Confidentiality"
			],
			[
				"sports",
				"healthcare",
				"social"
			],
			[
				"communication",
				"observation",
				"research",
				"critical_thinking"
			],
			[
				"Psychology",
				"Physical Education",
				"Biology"
			],
			["B.A./B.Sc. Psychology → M.Sc. Sport Psychology", "RCI/national psychology licensing where applicable"],
			["Youth academy mental-skills workshops", "Academic sports research"],
			["Pre-penalty / pre-exam calm focus routine", "Journal prompts for post-loss recovery"],
			true,
			5,
			"With people (schools, clinics, events)",
			"Postgraduate / Licensing",
			500,
			[
				"Deeply human impact beyond physical training",
				"Skills apply to performing arts and exams too",
				"Growing acceptance"
			],
			[
				"Postgraduate degree required",
				"Earning athlete buy-in takes patience",
				"Confidentiality demands"
			],
			"Design a 3-step 30-second reset routine an athlete can use right after making a costly error.",
			[
				"khanSci",
				"swayam",
				"courseraAudit"
			],
			"uiux"
		],
		[
			"biomechanics-specialist",
			"Sports Biomechanics Specialist",
			"Movement Science",
			"Use physics, high-speed video and force analysis to boost efficiency and cut joint stress.",
			"Capturing motion markers, measuring sprint or bowling mechanics and collaborating with coaches and physios.",
			[
				"Kinematics & physics",
				"Motion capture analysis",
				"Data plots",
				"Anatomy",
				"Coaching translation"
			],
			[
				"sports",
				"science",
				"technology",
				"mathematics"
			],
			[
				"mathematics",
				"analytical",
				"observation",
				"research"
			],
			[
				"Physics",
				"Mathematics",
				"Biology",
				"Physical Education"
			],
			["B.Tech Biomedical / B.Sc. Sports Science → M.Sc. Biomechanics", "University sports science labs"],
			["Open-source video angle tracking with Kinovea", "University athletics lab projects"],
			["Measure knee/ankle angles in a jump photo", "Compare two running stride videos"],
			true,
			4,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Fascinating blend of physics and human movement",
				"Directly prevents career-ending injuries",
				"Lab + field mix"
			],
			[
				"Specialised lab equipment at senior levels",
				"Postgraduate often expected",
				"Translating numbers into simple cues is hard"
			],
			"Explain using levers why extending arms slows down a figure skater's or diver's spin.",
			[
				"khanSci",
				"mitocw",
				"nptel"
			],
			"data"
		]
	], {
		progression: [
			"Assistant / Grassroots Specialist",
			"Academy / Club Coach or Analyst",
			"Head / Senior Lead",
			"Performance Director"
		],
		freelance: "Moderate — private coaching, nutrition plans, sports media, and performance analysis allow independent practice.",
		entrepreneurship: "High — sports academies, fitness studios, event companies, and analytics consultancies.",
		entryLevel: "School/college team volunteering, district academy internships, marathon/tournament operations.",
		costNote: "Basic tactical and sports science learning is free; official federation licenses and degrees have set fees."
	}),
	...expandCareers("Healthcare", [
		[
			"physician-doctor",
			"Physician / Medical Doctor",
			"Clinical Medicine",
			"Diagnose illnesses, prescribe evidence-based treatment and care for patients across life stages.",
			"Examining patients, interpreting lab reports, updating care plans and collaborating with nurses and specialists.",
			[
				"Clinical reasoning",
				"Anatomy & physiology",
				"Patient empathy",
				"Ethical judgement",
				"Stamina"
			],
			["healthcare", "science"],
			[
				"observation",
				"problem_solving",
				"communication",
				"critical_thinking"
			],
			[
				"Biology",
				"Chemistry",
				"Physics"
			],
			["NEET / Medical Entrance → MBBS (5.5 yrs) → MD/MS Specialisation", "Clinical residency"],
			["Allied health or public health tracks if pivoting from pre-med"],
			[
				"Read a WHO public disease fact sheet",
				"Shadow a community health camp",
				"First-aid certification"
			],
			false,
			5,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			5e3,
			[
				"Unmatched direct human impact",
				"Lifelong respected profession",
				"Wide specialty choices"
			],
			[
				"Long, demanding 6–10 year training",
				"High emotional and shift pressure",
				"Competitive entrance exams"
			],
			"Learn the 5 vital signs doctors check first and what normal adult ranges look like.",
			[
				"khanSci",
				"openwho",
				"ncert"
			],
			"data"
		],
		[
			"registered-nurse",
			"Registered Nurse",
			"Patient Care & Clinical Ops",
			"Deliver hands-on patient care, administer treatments and act as the vital link on care teams.",
			"Monitoring vitals, giving medications safely, comforting families and coordinating ward rounds.",
			[
				"Clinical procedures",
				"Observation",
				"Compassionate communication",
				"Team coordination",
				"Calm under stress"
			],
			["healthcare", "social"],
			[
				"teamwork",
				"observation",
				"communication",
				"organisation"
			],
			[
				"Biology",
				"Chemistry",
				"English"
			],
			[
				"B.Sc. Nursing (4 yrs) / GNM Diploma",
				"State Nursing Council registration",
				"Specialised ICU/paediatric tracks"
			],
			["Community health nursing", "Telehealth triage nursing"],
			["Attend a certified basic life support workshop", "Study infection-control hand hygiene steps"],
			false,
			4,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			1e3,
			[
				"Constant global and local demand",
				"Deep patient trust",
				"Pathways into ICU, teaching or nurse leadership"
			],
			[
				"Rotating shifts and night duties",
				"Physically on your feet",
				"Emotional toll in critical care"
			],
			"List 5 details a nurse checks before giving any patient their scheduled medicine.",
			[
				"openwho",
				"khanSci",
				"ncert"
			],
			"cyber"
		],
		[
			"pharmacist",
			"Clinical & Community Pharmacist",
			"Medication Safety",
			"Ensure safe medicine dosing, check drug interactions and counsel patients on usage.",
			"Verifying prescriptions, spotting dangerous drug overlaps, compounding formulations and explaining side effects.",
			[
				"Pharmacology",
				"Chemistry accuracy",
				"Interaction checking",
				"Patient counselling",
				"Regulatory compliance"
			],
			["healthcare", "science"],
			[
				"observation",
				"analytical",
				"communication",
				"organisation"
			],
			[
				"Chemistry",
				"Biology",
				"Mathematics"
			],
			[
				"B.Pharm (4 yrs) / Pharm.D (6 yrs) / D.Pharm",
				"Pharmacy Council registration",
				"Clinical or pharma R&D"
			],
			["Hospital clinical pharmacy", "Pharmacovigilance & drug safety"],
			["Check how two common OTC painkillers differ in active ingredient", "Build a safe medicine-storage guide"],
			false,
			4,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			1e3,
			[
				"Strong chemistry-to-care bridge",
				"Options across hospitals, retail and pharma research",
				"Structured work hours"
			],
			[
				"Zero-error tolerance in dispensing",
				"Commercial pressure in retail settings",
				"Licensing exams"
			],
			"Read an everyday medicine label and identify active ingredient, dose limit and storage rule.",
			[
				"khanSci",
				"openwho",
				"nptel"
			],
			"cyber"
		],
		[
			"clinical-psychologist",
			"Counselling & Clinical Psychologist",
			"Mental Health",
			"Support mental wellbeing through structured assessments and evidence-based therapies.",
			"Conducting intake interviews, facilitating therapy sessions, keeping ethical notes and planning care goals.",
			[
				"Active listening",
				"Psychological assessment",
				"Ethics & boundaries",
				"Research literacy",
				"Empathy"
			],
			["healthcare", "social"],
			[
				"communication",
				"observation",
				"critical_thinking",
				"research"
			],
			[
				"Psychology",
				"Biology",
				"English"
			],
			["B.A./B.Sc. Psychology → M.A./M.Sc. → M.Phil / Psy.D Clinical Psychology (RCI licensed in India)"],
			["School counselling", "Workplace wellbeing & HR mental-health programs"],
			["Practise reflective listening in a 5-minute peer conversation", "Read a CBT thought-record worksheet"],
			false,
			5,
			"With people (schools, clinics, events)",
			"Postgraduate / Licensing",
			1e3,
			[
				"Meaningful transformation in people's lives",
				"Growing societal awareness",
				"Flexible private practice later"
			],
			[
				"Requires postgraduate & licensing years",
				"Emotional boundaries take skill",
				"Can feel isolating without peer supervision"
			],
			"Identify the difference between advising someone vs helping them reflect on their own thought.",
			[
				"khanSci",
				"swayam",
				"courseraAudit"
			],
			"uiux"
		],
		[
			"physiotherapist",
			"Physiotherapist",
			"Rehabilitation Medicine",
			"Restore movement and reduce pain for patients recovering from injury, surgery or stroke.",
			"Testing range of motion, teaching home exercises, monitoring posture recovery and tracking pain scores.",
			[
				"Musculoskeletal anatomy",
				"Exercise therapy",
				"Patient motivation",
				"Progress tracking",
				"Hands-on care"
			],
			["healthcare", "sports"],
			[
				"observation",
				"communication",
				"fitness",
				"problem_solving"
			],
			[
				"Biology",
				"Physics",
				"Physical Education"
			],
			["BPT (Bachelor of Physiotherapy, 4.5 yrs)", "MPT in Orthopaedics / Neurology / Cardiopulmonary"],
			["Home-care geriatric rehab", "Hospital orthopaedic clinics"],
			["Map major muscles used when standing up from a chair", "Design a 3-stretch desk break routine"],
			false,
			4,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			1e3,
			[
				"Non-surgical, hands-on healing",
				"High satisfaction watching patients walk again",
				"Independent clinic potential"
			],
			[
				"Physically demanding sessions",
				"Requires formal BPT licensing",
				"Patients sometimes skip home exercises"
			],
			"Test how posture changes shoulder reach by slouching vs sitting upright.",
			[
				"khanSci",
				"ncert",
				"openwho"
			],
			"data"
		],
		[
			"public-health-specialist",
			"Public Health Specialist",
			"Population & Preventive Health",
			"Design sanitation, vaccination and nutrition campaigns that protect entire communities.",
			"Analysing district health data, planning awareness drives, partnering with NGOs and evaluating program reach.",
			[
				"Epidemiology basics",
				"Program evaluation",
				"Community engagement",
				"Health policy",
				"Report writing"
			],
			[
				"healthcare",
				"social",
				"government",
				"environment"
			],
			[
				"research",
				"leadership",
				"communication",
				"analytical"
			],
			[
				"Biology",
				"Geography",
				"Economics",
				"Mathematics"
			],
			["Any health/science/social undergrad → MPH (Master of Public Health)", "NGO & WHO field fellowships"],
			["District health fellowship", "School hygiene & nutrition initiatives"],
			["Take a free OpenWHO course", "Design a 1-page clean-water awareness flyer"],
			false,
			3,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			0,
			[
				"Scales impact to thousands of people",
				"Welcomes doctors, nurses, data analysts and social scientists",
				"Free WHO courses"
			],
			[
				"Slow policy cycles",
				"Field travel in remote districts",
				"Master's often needed for senior roles"
			],
			"Compare preventing 100 cases of dengue via clean drainage vs treating 100 hospitalised cases.",
			[
				"openwho",
				"fao",
				"courseraAudit"
			],
			"data"
		],
		[
			"epidemiologist",
			"Epidemiologist",
			"Disease & Outbreak Science",
			"Investigate why diseases spread in populations and measure what interventions actually work.",
			"Tracing outbreak curves, computing risk ratios, cleaning survey data and briefing health ministries.",
			[
				"Biostatistics",
				"Study design",
				"R / Python / SQL",
				"Outbreak investigation",
				"Scientific writing"
			],
			[
				"healthcare",
				"science",
				"mathematics"
			],
			[
				"mathematics",
				"analytical",
				"research",
				"critical_thinking"
			],
			[
				"Mathematics",
				"Biology",
				"Computer Science"
			],
			["B.Sc. Biology/Stats → MPH / M.Sc. Epidemiology", "ICMR / public health data fellowships"],
			["Clinical trial data coordinator", "Global disease surveillance dashboards"],
			["Plot a mock infection curve and find its doubling time", "Spot bias in a voluntary online health poll"],
			false,
			4,
			"Office / desk",
			"Postgraduate / Licensing",
			0,
			[
				"Medical detective work with real-world stakes",
				"Strong quantitative clarity",
				"High global relevance"
			],
			[
				"Postgraduate study usually required",
				"High scrutiny during public health crises",
				"Messy field records"
			],
			"Explain why comparing disease counts in two cities fails without dividing by population size.",
			[
				"openwho",
				"kaggle",
				"khanSci"
			],
			"data"
		],
		[
			"dentist",
			"Dentist & Oral Surgeon",
			"Dental Care",
			"Prevent, diagnose and treat tooth, gum and jaw conditions with precision craft.",
			"Performing dental exams, reading X-rays, restoring cavities, educating on hygiene and running clinic hygiene.",
			[
				"Fine motor precision",
				"Oral anatomy",
				"Infection control",
				"Patient reassurance",
				"Clinic management"
			],
			["healthcare", "science"],
			[
				"observation",
				"technical",
				"communication",
				"problem_solving"
			],
			[
				"Biology",
				"Chemistry",
				"Physics"
			],
			["NEET → BDS (5 yrs) → optional MDS", "Dental Council registration"],
			["Public dental health", "Prosthetics / digital dentistry clinics"],
			["Learn tooth numbering systems and preventive hygiene facts", "Shadow a local dental clinic"],
			false,
			5,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			5e3,
			[
				"Combines medical science with fine handcraft",
				"Predictable daytime clinic hours",
				"Strong private practice route"
			],
			[
				"High clinic setup equipment cost",
				"Competitive private urban clinics",
				"Back/neck posture strain"
			],
			"Learn why acidic drinks right before brushing weaken enamel faster.",
			[
				"khanSci",
				"ncert",
				"openwho"
			],
			"cyber"
		],
		[
			"medical-lab-technologist",
			"Medical Laboratory Technologist",
			"Diagnostic Science",
			"Run blood, microbiology and pathology tests that doctors rely on for every diagnosis.",
			"Calibrating analysers, preparing microscope slides, enforcing sterile quality control and flagging critical values.",
			[
				"Microbiology & haematology",
				"Lab safety",
				"Instrument calibration",
				"Quality control",
				"Precision"
			],
			["healthcare", "science"],
			[
				"observation",
				"technical",
				"organisation",
				"analytical"
			],
			[
				"Biology",
				"Chemistry",
				"Physics"
			],
			[
				"B.Sc. MLT (Medical Lab Technology)",
				"DMLT Diploma → B.Sc. lateral entry",
				"Hospital diagnostic lab internships"
			],
			["Molecular diagnostics & PCR labs", "Blood bank specialist"],
			["Study how a centrifuge separates blood components by density", "Review lab biosafety colour codes"],
			false,
			3,
			"Lab or studio",
			"Diploma / Certificate",
			500,
			[
				"Shorter entry route into frontline healthcare",
				"Essential behind every medical decision",
				"Consistent lab demand"
			],
			[
				"Strict biohazard protocols",
				"Shift rotation in 24/7 hospitals",
				"Repetitive high-volume sample processing"
			],
			"Trace what happens to a blood sample from collection label to verified doctor report.",
			[
				"khanSci",
				"openwho",
				"nptel"
			],
			"cyber"
		],
		[
			"telemedicine-coordinator",
			"Telemedicine & Digital Health Coordinator",
			"Connected Care",
			"Connect rural or homebound patients with doctors using reliable video triage and digital records.",
			"Onboarding patients onto tele-clinics, verifying vital readings, troubleshooting audio/video and routing follow-ups.",
			[
				"Digital literacy",
				"Empathetic triage",
				"EMR documentation",
				"Workflow troubleshooting",
				"Multilingual care"
			],
			[
				"healthcare",
				"technology",
				"social"
			],
			[
				"communication",
				"organisation",
				"problem_solving",
				"teamwork"
			],
			[
				"Biology",
				"Computer Science",
				"English"
			],
			[
				"B.Sc. Health Informatics / Allied Health / Nursing",
				"Healthcare operations fellowships",
				"NGO e-clinic coordinators"
			],
			["Health-tech customer operations", "Rural e-Sanjeevani / community clinic coordinator"],
			["Design a 4-step pre-call checklist so a first-time rural patient joins a video consult smoothly"],
			true,
			2,
			"Remote / from home",
			"Undergraduate Degree",
			0,
			[
				"Expands specialist access across small towns",
				"Blends tech support and care",
				"Emerging digital-health path"
			],
			[
				"Connectivity drops during rural calls",
				"Strict patient privacy rules",
				"Boundary between admin support and medical advice"
			],
			"Write simple visual instructions for an elderly patient to take and send a clear rash photo.",
			[
				"openwho",
				"mslearn",
				"courseraAudit"
			],
			"uiux"
		],
		[
			"occupational-therapist",
			"Occupational Therapist",
			"Adaptive Care",
			"Help children, injured workers or older adults regain independence in everyday tasks.",
			"Adapting home or classroom tools, coaching fine-motor skills and working closely with families and teachers.",
			[
				"Activity analysis",
				"Adaptive device design",
				"Patience & creativity",
				"Developmental knowledge",
				"Observation"
			],
			[
				"healthcare",
				"design",
				"social"
			],
			[
				"creativity",
				"observation",
				"communication",
				"problem_solving"
			],
			[
				"Biology",
				"Psychology",
				"Fine Arts"
			],
			[
				"BOT (Bachelor of Occupational Therapy)",
				"MOT Specialisation (Paediatrics / Neuro)",
				"Rehab hospital practice"
			],
			["Assistive-tech & ergonomic workplace consulting", "Inclusive school support"],
			["Rethink how a kitchen spoon or toothbrush could be adapted for someone with weak grip"],
			false,
			4,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			1e3,
			[
				"Creative problem-solving meets healthcare",
				"Deeply uplifting daily milestones",
				"Under-supplied specialist field"
			],
			[
				"Requires 4+ year clinical degree",
				"Progress can take months of patient coaching",
				"Fewer college seats"
			],
			"List 5 daily morning tasks that become hard with only one usable hand — and one workaround for each.",
			[
				"khanSci",
				"openwho",
				"figma"
			],
			"uiux"
		],
		[
			"nutrition-dietitian",
			"Clinical Dietitian & Nutritionist",
			"Preventive & Clinical Nutrition",
			"Guide patients with diabetes, allergies or recovery needs toward sustainable eating habits.",
			"Reviewing lab markers, building culturally realistic meal plans and coaching patients without shame.",
			[
				"Clinical nutrition",
				"Habit coaching",
				"Cultural meal planning",
				"Blood-marker literacy",
				"Empathy"
			],
			[
				"healthcare",
				"science",
				"social"
			],
			[
				"communication",
				"analytical",
				"research",
				"organisation"
			],
			[
				"Biology",
				"Chemistry",
				"Home Science"
			],
			["B.Sc. Nutrition & Dietetics → M.Sc. Clinical Nutrition", "Registered Dietitian (RD) internship & exam"],
			["Corporate wellness", "Hospital dietetics & renal/cardiac care"],
			["Plan a balanced vegetarian day's meals using affordable local grains and pulses"],
			false,
			3,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			500,
			[
				"Immediately useful in daily life",
				"Hospital, clinic and online consult avenues",
				"Evidence-based care"
			],
			[
				"Requires fighting fad-diet misinformation",
				"RD licensing exam needed for clinical authority",
				"Client drop-off"
			],
			"Check nutrition labels on two packaged snacks and compare fibre vs added sugar per serving.",
			[
				"fao",
				"khanSci",
				"openwho"
			],
			"data"
		],
		[
			"biomedical-researcher",
			"Biomedical & Clinical Trials Researcher",
			"Medical Research",
			"Run lab experiments or ethical clinical trials to test safer diagnostics and therapies.",
			"Designing study protocols, pipetting or analysing cell assays, recording lab notebooks and publishing peer-reviewed data.",
			[
				"Molecular biology",
				"Experimental controls",
				"Scientific statistics",
				"Good Clinical Practice",
				"Academic writing"
			],
			["healthcare", "science"],
			[
				"research",
				"analytical",
				"critical_thinking",
				"observation"
			],
			[
				"Biology",
				"Chemistry",
				"Mathematics"
			],
			["B.Sc./B.Tech Biotechnology or Life Sciences → M.Sc. → PhD", "Clinical Research Diploma (CRO trials)"],
			["Clinical Data Associate at CROs", "Translational hospital research"],
			["Explain why a clinical trial uses a randomised control group and blinding"],
			false,
			5,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Advances medicines and diagnostics for millions",
				"Global academic and biotech mobility",
				"Deep curiosity satisfaction"
			],
			[
				"Many experiments fail before working",
				"Long PhD/postdoc path for principal roles",
				"Grant funding uncertainty"
			],
			"Design a fair experiment to test whether a new vitamin actually reduces cold duration.",
			[
				"khanSci",
				"mitocw",
				"nptel"
			],
			"data"
		]
	], {
		progression: [
			"Intern / Junior Clinician or Technologist",
			"Registered Practitioner",
			"Senior Specialist",
			"Department Lead or Clinic Director"
		],
		freelance: "Regulated — clinical practice requires valid statutory registration; tele-counselling, nutrition & health writing offer independent avenues.",
		entrepreneurship: "Moderate-High — private clinics, diagnostic labs, rehab centres, and digital health tools (subject to licensing).",
		entryLevel: "Hospital observerships, certified first-aid volunteering, lab traineeships, and public health fellowships.",
		costNote: "Foundational biology and WHO courses are free; clinical degrees require regulated university admission."
	}),
	...expandCareers("Business & Management", [
		[
			"product-manager",
			"Product Manager",
			"Product Strategy",
			"Discover user problems, prioritise what teams build next and guide products from idea to launch.",
			"Talking to customers, writing crisp specs, reviewing metrics and aligning designers and engineers.",
			[
				"User research",
				"Prioritisation",
				"Clear communication",
				"Metrics literacy",
				"Cross-team leadership"
			],
			[
				"business",
				"technology",
				"design",
				"entrepreneurship"
			],
			[
				"leadership",
				"communication",
				"analytical",
				"critical_thinking"
			],
			[
				"Business Studies",
				"Economics",
				"Computer Science",
				"Psychology"
			],
			[
				"B.Tech / BBA / Design / Any degree + product portfolio",
				"MBA (optional)",
				"Associate PM fellowships"
			],
			["Analyst or Designer → Product Manager transition", "Launch a campus/side project"],
			[
				"Teardown of your favourite app's onboarding",
				"1-page feature spec",
				"5 user interviews summary"
			],
			false,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"High ownership across tech, business and design",
				"No single mandatory degree",
				"Constant learning"
			],
			[
				"Responsibility without direct managerial authority",
				"Frequent context switching",
				"Competitive entry-level APM slots"
			],
			"Pick an app you use daily, name one frustrating screen and propose a simpler 2-step fix.",
			[
				"courseraAudit",
				"figma",
				"skillshop"
			],
			"uiux"
		],
		[
			"management-consultant",
			"Management & Strategy Consultant",
			"Advisory",
			"Diagnose thorny business problems and build structured growth or turnaround plans.",
			"Interviewing client leaders, breaking costs into trees, modelling market scenarios and presenting recommendations.",
			[
				"Structured problem solving",
				"Spreadsheet modelling",
				"Slide storytelling",
				"Client interviewing",
				"Commercial sense"
			],
			[
				"business",
				"finance",
				"travel"
			],
			[
				"analytical",
				"communication",
				"problem_solving",
				"leadership"
			],
			[
				"Economics",
				"Mathematics",
				"Business Studies"
			],
			[
				"Top UG in Commerce / Engineering / Economics",
				"MBA in Strategy",
				"Boutique consulting internships"
			],
			["NGO & social-sector strategy consulting", "Internal corporate strategy teams"],
			["Estimate how many cups of tea a college canteen sells daily using a logic tree"],
			false,
			4,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Exposure to many industries early",
				"Sharpens structured thinking rapidly",
				"Strong alumni networks"
			],
			[
				"Long hours and heavy travel",
				"High presentation pressure",
				"Recommendations aren't always implemented"
			],
			"Break down a local café's monthly profit into 4 concrete levers it can improve.",
			[
				"khanEcon",
				"courseraAudit",
				"varsity"
			],
			"data"
		],
		[
			"digital-marketer",
			"Digital Marketer",
			"Growth & Brand Campaigns",
			"Connect ideas and products with the right audience through content, search and analytics.",
			"Planning campaigns, writing copy, checking conversion funnels and running small A/B headline tests.",
			[
				"Copywriting",
				"Audience research",
				"Analytics",
				"SEO & social channels",
				"Experimentation"
			],
			[
				"business",
				"media",
				"writing",
				"art"
			],
			[
				"creativity",
				"communication",
				"writing",
				"analytical"
			],
			[
				"English",
				"Business Studies",
				"Economics",
				"Psychology"
			],
			[
				"BBA / B.Com / BMS / Mass Comm",
				"Any degree + live campaign portfolio",
				"Google Skillshop certifications"
			],
			["Manage social growth for a college club or local shop", "Freelance content & SEO"],
			[
				"Grow a club page with weekly themes",
				"Write and compare two ad headlines",
				"Keyword audit"
			],
			false,
			1,
			"Remote / from home",
			"Class 10+",
			0,
			[
				"Easy to start testing with zero budget",
				"Mixes writing, design and analytics",
				"Fast measurable feedback"
			],
			[
				"Algorithms change constantly",
				"Click/ROI pressure",
				"Crowded generalist market"
			],
			"Pick an audience and write a one-line campaign idea for a local café on Tuesday afternoons.",
			[
				"skillshop",
				"khan",
				"courseraAudit"
			],
			"marketing"
		],
		[
			"operations-manager",
			"Operations & Process Manager",
			"Execution & Logistics",
			"Make sure teams, materials and schedules deliver smoothly on time and within budget.",
			"Spotlighting bottlenecks, standardising workflows, reviewing vendor SLAs and coaching frontline supervisors.",
			[
				"Process mapping",
				"Scheduling",
				"Root-cause analysis",
				"Spreadsheets",
				"People management"
			],
			["business"],
			[
				"organisation",
				"leadership",
				"problem_solving",
				"teamwork"
			],
			[
				"Business Studies",
				"Mathematics",
				"Economics"
			],
			[
				"BBA / B.Tech Industrial or Mechanical → Ops roles",
				"MBA Operations",
				"Management trainee programs"
			],
			["E-commerce warehouse ops trainee", "Campus fest logistics head"],
			["Map every step from ordering food online to doorstep delivery and spot 2 delay risks"],
			false,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Concrete, visible daily impact",
				"Essential in every manufacturing, retail and tech firm",
				"Path to COO"
			],
			[
				"Fixing urgent supply or staffing fires",
				"Early shifts in logistics hubs",
				"Requires diplomacy across teams"
			],
			"Draw a 6-step process map for morning school bus pickups and identify one bottleneck.",
			[
				"nptel",
				"courseraAudit",
				"khanEcon"
			],
			"data"
		],
		[
			"human-resources-specialist",
			"Human Resources & People Partner",
			"Talent & Culture",
			"Help organisations hire fairly, grow employee skills and build healthy, compliant workplaces.",
			"Screening candidates, running structured interviews, designing onboarding and mediating team conflicts.",
			[
				"Structured interviewing",
				"Active listening",
				"Labour law basics",
				"Training design",
				"Discretion"
			],
			[
				"business",
				"social",
				"law"
			],
			[
				"communication",
				"organisation",
				"observation",
				"teamwork"
			],
			[
				"Psychology",
				"Business Studies",
				"English"
			],
			["BBA / B.A. Psychology / B.Com → MBA HR / TISS / XLRI", "Talent acquisition associate"],
			["Campus placement cell coordinator", "Learning & Development facilitator"],
			["Write 5 fair, skill-based interview questions for a student club treasurer role"],
			false,
			2,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"People-first impact on workplace fairness",
				"Combines psychology and organisation",
				"Predictable schedule"
			],
			[
				"Difficult redundancy or conflict conversations",
				"Heavy administrative compliance",
				"Often caught between staff and leadership"
			],
			"Spot why asking 'What's your weakness?' gives weaker hiring signal than asking about a real past project.",
			[
				"swayam",
				"courseraAudit",
				"khanHum"
			],
			"uiux"
		],
		[
			"supply-chain-analyst",
			"Supply Chain & Procurement Analyst",
			"Global Logistics",
			"Optimise how raw materials and finished goods move from suppliers to customers efficiently.",
			"Forecasting demand, checking inventory buffers, comparing freight routes and negotiating vendor lead times.",
			[
				"Inventory math",
				"Excel / SQL",
				"Demand forecasting",
				"Vendor evaluation",
				"Risk planning"
			],
			[
				"business",
				"mathematics",
				"travel"
			],
			[
				"analytical",
				"mathematics",
				"organisation",
				"problem_solving"
			],
			[
				"Mathematics",
				"Economics",
				"Business Studies"
			],
			[
				"B.Tech / BBA / B.Com + supply-chain analytics",
				"PG Diploma in Supply Chain (NITIE/IIM/NPTEL)",
				"Logistics trainee"
			],
			["Import-export documentation assistant", "E-commerce inventory planning"],
			["Calculate safety stock when supplier delivery varies between 3 and 7 days"],
			false,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Backbone of global trade and climate resilience",
				"Quantitative yet practical",
				"Global career mobility"
			],
			[
				"Disruptions from weather or port strikes",
				"Spreadsheets get huge",
				"Vendor negotiation stress"
			],
			"Explain why keeping either zero inventory or huge excess inventory hurts a bookstore.",
			[
				"nptel",
				"kaggle",
				"mitocw"
			],
			"data"
		],
		[
			"business-analyst",
			"Business Systems Analyst",
			"Process & Systems",
			"Translate business goals into clear data requirements and software workflows.",
			"Interviewing stakeholders, mapping 'as-is' vs 'to-be' flows, writing acceptance criteria and verifying reports.",
			[
				"Requirements elicitation",
				"Process diagrams",
				"SQL & Excel",
				"Stakeholder workshops",
				"Clear writing"
			],
			["business", "technology"],
			[
				"analytical",
				"communication",
				"organisation",
				"critical_thinking"
			],
			[
				"Business Studies",
				"Computer Science",
				"Economics"
			],
			[
				"BBA / B.Tech / B.Com",
				"IT consulting analyst programs",
				"Domain transition from finance/ops"
			],
			["ERP implementation trainee", "Systems documentation volunteer"],
			["Write 4 clear acceptance rules for a school library book-return feature"],
			false,
			2,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Ideal bridge for non-coders entering tech",
				"Strong communication leverage",
				"High corporate demand"
			],
			[
				"Caught between demanding clients and dev constraints",
				"Extensive documentation",
				"Requires patience"
			],
			"Ask 5 clarifying questions to turn 'We want a faster checkout' into measurable rules.",
			[
				"mslearn",
				"courseraAudit",
				"skillshop"
			],
			"uiux"
		],
		[
			"brand-strategist",
			"Brand Strategist",
			"Positioning & Identity",
			"Define what makes an organisation memorable, trustworthy and distinct to its audience.",
			"Studying cultural trends, interviewing customers, shaping messaging pillars and briefing creative teams.",
			[
				"Market research",
				"Positioning",
				"Storytelling",
				"Qualitative interviews",
				"Presentation craft"
			],
			[
				"business",
				"design",
				"writing",
				"media"
			],
			[
				"creativity",
				"communication",
				"observation",
				"writing"
			],
			[
				"English",
				"Psychology",
				"Business Studies",
				"Fine Arts"
			],
			[
				"BBA / Mass Comm / Design / Humanities",
				"Advertising agency strategy trainee",
				"Brand case-study portfolio"
			],
			["Rebrand a local craft cooperative", "Freelance positioning audits for startups"],
			["Compare how two rival shoe brands talk to completely different buyers"],
			false,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Creative thinking backed by human insight",
				"Shapes visual and verbal culture",
				"Agency or in-house paths"
			],
			[
				"Hard to isolate brand ROI short-term",
				"Subjective executive feedback",
				"Fast-paced pitch cycles"
			],
			"Define in two sentences how a neighbourhood bakery can stand out from supermarket bread.",
			[
				"skillshop",
				"khanHum",
				"courseraAudit"
			],
			"marketing"
		],
		[
			"project-manager",
			"Project Manager",
			"Delivery & Coordination",
			"Keep multi-team projects on track across scope, deadlines, risks and budgets.",
			"Running standups, tracking blockers, updating timelines, managing scope changes and keeping stakeholders informed.",
			[
				"Milestone planning",
				"Risk logs",
				"Budget tracking",
				"Facilitation",
				"Conflict resolution"
			],
			["business"],
			[
				"organisation",
				"leadership",
				"communication",
				"teamwork"
			],
			[
				"Business Studies",
				"Mathematics",
				"English"
			],
			[
				"Any Undergraduate Degree",
				"Project coordinator → PM",
				"CAPM / PMP / Agile fundamentals"
			],
			["Lead tech fests, community builds or NGO drives", "Scrum coordinator"],
			["Build a 6-week backward timeline for hosting an inter-school science fair"],
			false,
			2,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Applicable in construction, tech, media and NGOs",
				"Rewards organised communicators",
				"Clear progression"
			],
			[
				"Take heat when external delays hit deadlines",
				"Admin and status-chasing fatigue",
				"Scope creep"
			],
			"List 3 things that could delay a school magazine launch and one backup plan for each.",
			[
				"courseraAudit",
				"mslearn",
				"nptel"
			],
			"marketing"
		],
		[
			"customer-success-manager",
			"Customer Success Manager",
			"Client Retention & Adoption",
			"Help organisations actually get value from tools they adopt so they renew and grow.",
			"Running onboarding sessions, spotting drops in usage, solving workflow blockers and sharing product feedback.",
			[
				"Relationship building",
				"Product training",
				"Usage analytics",
				"Empathy",
				"Renewal planning"
			],
			[
				"business",
				"technology",
				"social"
			],
			[
				"communication",
				"problem_solving",
				"organisation",
				"teamwork"
			],
			[
				"Business Studies",
				"English",
				"Computer Science"
			],
			[
				"BBA / B.Com / B.Tech",
				"Support specialist → Customer Success",
				"SaaS onboarding fellowships"
			],
			["Ed-tech school implementation coordinator", "Tech onboarding coach"],
			["Record a 2-minute walkthrough explaining a confusing app setting without jargon"],
			false,
			2,
			"Remote / from home",
			"Undergraduate Degree",
			0,
			[
				"People-oriented entry into B2B tech",
				"High impact on customer happiness",
				"Remote-friendly"
			],
			[
				"Managing frustrated clients after bugs",
				"Quarterly renewal targets",
				"Juggling many accounts"
			],
			"Draft a polite 4-line email turning around an unhappy user whose export failed.",
			[
				"skillshop",
				"courseraAudit",
				"mslearn"
			],
			"marketing"
		],
		[
			"sustainability-operations-lead",
			"Corporate Sustainability & ESG Coordinator",
			"Sustainable Business",
			"Measure and cut waste, energy and carbon across company supply chains and offices.",
			"Collecting utility and travel data, auditing vendor practices, tracking ESG targets and writing transparency reports.",
			[
				"Carbon accounting basics",
				"Data spreadsheets",
				"Supply-chain literacy",
				"Reporting standards",
				"Persuasion"
			],
			[
				"business",
				"environment",
				"science"
			],
			[
				"analytical",
				"research",
				"organisation",
				"critical_thinking"
			],
			[
				"Environmental Studies",
				"Economics",
				"Business Studies"
			],
			[
				"BBA / Environmental Science / Engineering",
				"UN CC:Learn certificates",
				"MBA / M.Sc. Sustainability"
			],
			["Campus zero-waste audit lead", "ESG data research analyst"],
			["Audit your school's top 3 sources of paper, electricity or plastic waste and propose fixes"],
			true,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Blends climate purpose with corporate leverage",
				"Fast-growing regulatory requirement",
				"Cross-department visibility"
			],
			[
				"Facing greenwashing or budget pushback",
				"Messy supplier data",
				"Evolving reporting rules"
			],
			"Distinguish between a genuine packaging reduction vs misleading 'green' marketing claim.",
			[
				"unccl",
				"courseraAudit",
				"fao"
			],
			"data"
		],
		[
			"retail-category-manager",
			"Retail & E-Commerce Category Manager",
			"Merchandising & Pricing",
			"Choose which products to stock, how to price them and how to keep shelves profitable.",
			"Analysing sell-through rates, negotiating with suppliers, planning festive promos and fixing stockouts.",
			[
				"Margin math",
				"Merchandising",
				"Supplier negotiation",
				"Demand trends",
				"Excel"
			],
			[
				"business",
				"finance",
				"design"
			],
			[
				"analytical",
				"mathematics",
				"communication",
				"organisation"
			],
			[
				"Business Studies",
				"Economics",
				"Mathematics"
			],
			[
				"BBA / B.Com / NIFT Fashion Management",
				"Retail management trainee",
				"E-commerce catalog ops"
			],
			["D2C marketplace merchandising", "Family retail modernisation"],
			["Compare profit margin vs inventory turnover on an everyday ₹100 item vs a ₹2,000 item"],
			false,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Immediate feedback from customer buying behaviour",
				"Teaches real unit economics",
				"Strong entrepreneurship prep"
			],
			[
				"Seasonal peak-sale pressure",
				"Inventory write-offs if trends miss",
				"Tough vendor negotiations"
			],
			"Audit 5 items in a local store and guess which ones sell fastest vs earn the highest margin.",
			[
				"khanEcon",
				"skillshop",
				"varsity"
			],
			"data"
		],
		[
			"hospital-administrator",
			"Healthcare & Hospital Operations Manager",
			"Health Management",
			"Keep hospital clinics, emergency triage, billing and medical supplies running smoothly.",
			"Scheduling department shifts, reducing patient wait times, checking accreditation standards and managing budgets.",
			[
				"Service operations",
				"Quality & safety standards",
				"Budgeting",
				"Staff coordination",
				"Empathy"
			],
			["business", "healthcare"],
			[
				"organisation",
				"leadership",
				"problem_solving",
				"communication"
			],
			[
				"Business Studies",
				"Biology",
				"Economics"
			],
			["BBA Healthcare → MHA (Master of Hospital Administration)", "Nursing/Allied Health → Admin track"],
			["Diagnostic chain centre manager", "Health-tech clinic ops"],
			["Map how an outpatient clinic can reduce waiting-room bottlenecks without rushing doctors"],
			false,
			3,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			0,
			[
				"Critical mission helping patients smoothly",
				"Stable healthcare sector demand",
				"Combines ops with empathy"
			],
			[
				"24/7 facility coordination",
				"Strict regulatory audits",
				"Balancing costs with patient comfort"
			],
			"Design a clear signage & check-in order for a busy clinic serving elderly patients.",
			[
				"openwho",
				"swayam",
				"courseraAudit"
			],
			"uiux"
		]
	], {
		progression: [
			"Coordinator / Trainee",
			"Manager / Specialist",
			"Senior Manager / Lead",
			"Director / VP"
		],
		freelance: "Strong — digital marketing, product consulting, brand strategy, and operations advisory support independent work.",
		entrepreneurship: "Very High — business management fundamentals apply directly to launching startups and services.",
		entryLevel: "Management trainee cohorts, campus fest leadership, startup operations internships, and NGO projects.",
		costNote: "Business, economics, and digital analytics courses are free online; MBA tuition varies widely and is optional."
	}),
	...expandCareers("Finance", [
		[
			"financial-analyst",
			"Financial Analyst",
			"Corporate Finance & Valuation",
			"Analyse financial statements, budgets and market trends to guide smart capital decisions.",
			"Building Excel forecasts, comparing quarter-on-quarter margins, preparing board decks and tracking cash flows.",
			[
				"Financial accounting",
				"Excel modelling",
				"Valuation ratios",
				"Industry research",
				"Written clarity"
			],
			[
				"finance",
				"business",
				"mathematics"
			],
			[
				"mathematics",
				"analytical",
				"research",
				"organisation"
			],
			[
				"Accountancy",
				"Economics",
				"Mathematics",
				"Business Studies"
			],
			[
				"B.Com / BBA Finance / Economics",
				"CFA / MBA Finance",
				"Corporate FP&A analyst programs"
			],
			["Varsity modules + public annual-report teardowns", "Startup finance ops"],
			["Read a public company's 1-page income statement and compute profit margin"],
			false,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Clear quantitative feedback",
				"Applies across tech, energy, sports and retail",
				"Structured career ladder"
			],
			[
				"Long hours around quarter-end closes",
				"Spreadsheet errors carry big impact",
				"Competitive top firms"
			],
			"Calculate why a profitable company on paper can still run out of cash in the bank.",
			[
				"varsity",
				"khanEcon",
				"nptel"
			],
			"data"
		],
		[
			"chartered-accountant",
			"Chartered Accountant / CPA",
			"Audit, Tax & Assurance",
			"Ensure financial records are accurate, compliant and trustworthy for businesses and regulators.",
			"Auditing ledgers, advising on tax compliance, verifying internal controls and signing financial statements.",
			[
				"Accounting standards",
				"Tax & audit law",
				"Forensic attention",
				"Ethics",
				"Client advisory"
			],
			[
				"finance",
				"law",
				"mathematics"
			],
			[
				"analytical",
				"organisation",
				"critical_thinking",
				"mathematics"
			],
			[
				"Accountancy",
				"Business Studies",
				"Mathematics",
				"Economics"
			],
			["ICAI CA (Foundation → Intermediate → Articleship → Final) / CPA / ACCA", "B.Com parallel"],
			["Corporate accounting & GST compliance specialist"],
			["Balance a mock 10-line household budget into assets, liabilities, income and expenses"],
			false,
			5,
			"Office / desk",
			"Class 12",
			1e3,
			[
				"High professional trust and authority",
				"Can launch an independent practice",
				"Strong stability"
			],
			[
				"Rigorous multi-stage pass rates",
				"Heavy tax-filing season hours",
				"Strict compliance updates"
			],
			"Track every rupee in and out for 7 days and categorise needs vs wants vs savings.",
			[
				"varsity",
				"swayam",
				"ncert"
			],
			"data"
		],
		[
			"investment-banker",
			"Investment Banking Analyst",
			"Capital Markets & M&A",
			"Help companies raise funds, merge, or go public through detailed valuation and deal execution.",
			"Building comparable-company valuations, drafting investor memos, coordinating due diligence and running deal rooms.",
			[
				"DCF & comps valuation",
				"Financial modelling",
				"Presentation speed",
				"Commercial stamina",
				"Attention to detail"
			],
			["finance", "business"],
			[
				"mathematics",
				"analytical",
				"problem_solving",
				"communication"
			],
			[
				"Economics",
				"Accountancy",
				"Mathematics"
			],
			["Top Commerce/Econ/Engg UG → MBA Finance / Analyst intake", "Boutique M&A advisory"],
			["Corporate development / VC analyst roles"],
			["Compare market cap vs enterprise value for two public companies"],
			false,
			5,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Accelerated deal exposure",
				"Strong analytical rigour",
				"Exit options into PE/VC/corporate strategy"
			],
			[
				"Very demanding 70+ hour deal weeks",
				"Intense competition for top banks",
				"High deadline stress"
			],
			"Read an IPO summary and list 3 risks disclosed in the company's risk-factors section.",
			[
				"varsity",
				"khanEcon",
				"courseraAudit"
			],
			"data"
		],
		[
			"actuary",
			"Actuary",
			"Risk & Insurance Mathematics",
			"Use probability and statistics to price insurance, pensions and long-term financial risks.",
			"Modelling life/health claim probabilities, testing capital reserves under crisis scenarios and pricing policies.",
			[
				"Probability & calculus",
				"Actuarial modelling",
				"R / Python / Excel",
				"Insurance regulation",
				"Report writing"
			],
			[
				"finance",
				"mathematics",
				"science"
			],
			[
				"mathematics",
				"analytical",
				"research",
				"critical_thinking"
			],
			[
				"Mathematics",
				"Economics",
				"Computer Science"
			],
			["B.Sc. Math/Stats/Actuarial Science + IAI / IFoA / SOA actuarial exams"],
			["Catastrophe modelling & reinsurance analytics"],
			["Calculate the fair break-even price of a ₹1,000 phone-screen warranty if 8% of screens crack"],
			false,
			5,
			"Office / desk",
			"Class 12",
			1e3,
			[
				"Deep mathematical problem solving",
				"Regular hours with strong compensation stability",
				"High global respect"
			],
			[
				"Long multi-year exam series alongside work",
				"Very math-intensive",
				"Slow initial licensing"
			],
			"Work out expected value for a simple insurance pool of 100 cyclists.",
			[
				"khanEcon",
				"mitocw",
				"nptel"
			],
			"data"
		],
		[
			"wealth-advisor",
			"Personal Financial Planner & Wealth Advisor",
			"Household & Goal Planning",
			"Help individuals and families budget, insure risks, invest wisely and plan life milestones.",
			"Mapping client goals, checking emergency funds and debt, comparing index vs tax plans and preventing panic selling.",
			[
				"Personal finance",
				"Asset allocation",
				"Tax-aware planning",
				"Clear jargon-free teaching",
				"Fiduciary ethics"
			],
			[
				"finance",
				"social",
				"business"
			],
			[
				"communication",
				"analytical",
				"organisation",
				"observation"
			],
			[
				"Economics",
				"Mathematics",
				"Business Studies"
			],
			["B.Com / BBA + NISM / CFP (Certified Financial Planner) + SEBI IA registration"],
			["Financial literacy educator", "Bank wealth relationship manager"],
			["Build a safe 3-bucket priority order: emergency fund, term/health cover, long-term goal"],
			false,
			3,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			500,
			[
				"Directly protects families from scams and bad debt",
				"High human trust",
				"Independent practice possible"
			],
			[
				"Must avoid commission-driven conflicts",
				"Clients make emotional decisions in market dips",
				"Licensing rules"
			],
			"Compute how compounding at 10% vs 6% changes a monthly saving over 20 years.",
			[
				"varsity",
				"khanEcon",
				"swayam"
			],
			"data"
		],
		[
			"risk-analyst",
			"Credit & Risk Analyst",
			"Financial Stability",
			"Spot fraud, default, or market-crash vulnerabilities before a bank or fintech loses money.",
			"Scoring loan applicants fairly, stress-testing portfolios, monitoring payment anomalies and setting exposure caps.",
			[
				"Risk metrics",
				"SQL / Python",
				"Financial ratios",
				"Pattern spotting",
				"Regulatory rules"
			],
			[
				"finance",
				"mathematics",
				"technology"
			],
			[
				"analytical",
				"critical_thinking",
				"mathematics",
				"observation"
			],
			[
				"Mathematics",
				"Economics",
				"Computer Science"
			],
			[
				"B.Sc. Stats/Econ / B.Tech / B.Com",
				"MBA / FRM (Financial Risk Manager)",
				"Bank risk graduate programs"
			],
			["Fintech fraud operations → Risk analytics"],
			["Design 4 transparent rules to verify if an applicant can safely afford a monthly EMI"],
			false,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Crucial safeguard in banking and fintech",
				"Combines economics and data",
				"Predictable corporate rhythm"
			],
			[
				"Conservative mindset can clash with aggressive sales teams",
				"Strict audits",
				"Complex regulations"
			],
			"Explain why lending solely on social-media scores can unfairly exclude reliable rural borrowers.",
			[
				"varsity",
				"kaggle",
				"khanEcon"
			],
			"data"
		],
		[
			"fintech-product-specialist",
			"FinTech & Digital Payments Specialist",
			"Financial Technology",
			"Design seamless UPI, lending, savings or micro-insurance experiences for everyday users.",
			"Mapping payment failure drops, checking KYC compliance flows, testing mobile UX and partnering with banks.",
			[
				"Payment rails (UPI/cards)",
				"KYC/compliance basics",
				"Product analytics",
				"UX empathy",
				"SQL"
			],
			[
				"finance",
				"technology",
				"business"
			],
			[
				"problem_solving",
				"analytical",
				"technical",
				"communication"
			],
			[
				"Computer Science",
				"Economics",
				"Business Studies"
			],
			[
				"B.Tech / BBA / B.Com",
				"Fintech product/ops internships",
				"Open banking sandbox projects"
			],
			["Merchant onboarding ops → Product specialist"],
			["Trace 5 steps when a UPI payment says 'pending' and how the app should reassure the user"],
			true,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Massive scale and inclusion in India",
				"Fast innovation pace",
				"Blends finance, UX and tech"
			],
			[
				"Strict RBI/regulatory constraints",
				"High uptime & trust expectations",
				"Competitive hiring"
			],
			"Spot two design improvements that help first-time smartphone users avoid wrong transfers.",
			[
				"varsity",
				"figma",
				"fcc"
			],
			"uiux"
		],
		[
			"tax-consultant",
			"Tax & Regulatory Consultant",
			"Taxation Policy",
			"Help individuals, startups and cross-border teams comply accurately with GST and income tax rules.",
			"Reviewing invoices, researching tax exemptions, preparing filings and answering regulatory notices clearly.",
			[
				"Tax statutes",
				"Careful reading",
				"Accounting",
				"Deadline management",
				"Written explanations"
			],
			["finance", "law"],
			[
				"organisation",
				"analytical",
				"writing",
				"critical_thinking"
			],
			[
				"Accountancy",
				"Business Studies",
				"Economics"
			],
			["B.Com / LL.B / CA / CMA / CS", "Tax advisory firms"],
			["Startup compliance & GST advisory practice"],
			["Read the difference between gross income and taxable income after basic deductions"],
			false,
			4,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Recession-resilient demand",
				"Strong independent advisory potential",
				"Blends law and numbers"
			],
			[
				"Heavy seasonal filing deadlines",
				"Rules change every annual budget",
				"Detail-heavy"
			],
			"Trace how GST works at two stages of manufacturing a notebook so tax isn't charged twice.",
			[
				"varsity",
				"swayam",
				"ncert"
			],
			"data"
		],
		[
			"corporate-treasurer",
			"Corporate Treasury & Cash Manager",
			"Liquidity Management",
			"Manage company cash reserves, currency risks and bank credit lines so payroll and vendors never stall.",
			"Forecasting daily cash balances, hedging foreign exchange exposure and negotiating bank facility terms.",
			[
				"Cash-flow forecasting",
				"FX & interest basics",
				"Banking operations",
				"Excel",
				"Risk discipline"
			],
			["finance", "business"],
			[
				"organisation",
				"mathematics",
				"analytical",
				"problem_solving"
			],
			[
				"Accountancy",
				"Economics",
				"Mathematics"
			],
			["B.Com / MBA Finance / CA", "Corporate finance → Treasury track"],
			["Multinational shared-services treasury desk"],
			["Plan how an exporter earning USD but paying staff in INR handles a 5% rupee swing"],
			false,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Direct stability impact on organisations",
				"Steady hours outside crises",
				"Global MNC exposure"
			],
			[
				"Requires high accuracy with large sums",
				"Less visible externally",
				"Strict bank cut-off times"
			],
			"Build a 4-week cash inflow vs outflow table showing why timing matters even if monthly totals match.",
			[
				"khanEcon",
				"varsity",
				"courseraAudit"
			],
			"data"
		],
		[
			"quantitative-analyst",
			"Quantitative Financial Researcher",
			"Algorithmic Finance",
			"Apply stochastic math, time-series statistics and fast code to model financial markets.",
			"Testing statistical hypotheses on historical price data, checking execution slippage and writing C++/Python models.",
			[
				"Probability & calculus",
				"Python / C++",
				"Time-series stats",
				"Scientific scepticism",
				"Linear algebra"
			],
			[
				"finance",
				"mathematics",
				"ai",
				"technology"
			],
			[
				"mathematics",
				"analytical",
				"technical",
				"research"
			],
			[
				"Mathematics",
				"Computer Science",
				"Physics"
			],
			["B.Tech CSE/Math/Physics at top institutes", "M.Sc. Quantitative Finance / Financial Engineering"],
			["Statistical arbitrage or market-risk quant teams"],
			["Explain why backtesting a trading rule on past data without out-of-sample checks fools beginners"],
			false,
			5,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Deepest intersection of math, code and markets",
				"Immediate quantitative feedback",
				"Intellectual rigour"
			],
			[
				"Ultra-competitive entry",
				"High stress when models underperform",
				"Requires advanced math"
			],
			"Simulate 20 coin-flip streaks and see why a 'winning streak' easily happens by pure chance.",
			[
				"mitocw",
				"kaggle",
				"varsity"
			],
			"data"
		],
		[
			"credit-analyst",
			"Commercial Banking & Credit Underwriter",
			"Lending Decisions",
			"Evaluate businesses or individuals seeking loans to judge repayment capacity responsibly.",
			"Inspecting bank statements, visiting factories or shops, assessing collateral and writing credit memos.",
			[
				"Cash-flow reading",
				"Business evaluation",
				"Interviewing founders",
				"Memo writing",
				"Scepticism"
			],
			["finance", "business"],
			[
				"analytical",
				"observation",
				"writing",
				"critical_thinking"
			],
			[
				"Accountancy",
				"Economics",
				"Business Studies"
			],
			["B.Com / BBA / MBA Finance / CA", "Bank Probationary Officer / Credit trainee"],
			["NBFC MSME lending specialist"],
			["List 5 honest questions you'd ask a bakery owner asking for an oven loan"],
			false,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Learns how real local businesses actually operate",
				"Clear decision impact",
				"Stable banking pathway"
			],
			[
				"Pressure to approve deals vs keep defaults low",
				"Field checks across towns",
				"Repetitive paperwork"
			],
			"Compare two shops with identical revenue — why is the one with overdue customer bills riskier?",
			[
				"varsity",
				"khanEcon",
				"swayam"
			],
			"data"
		],
		[
			"esg-investment-analyst",
			"Climate & ESG Investment Analyst",
			"Sustainable Finance",
			"Evaluate green bonds, renewable projects and corporate climate risks for long-term investors.",
			"Reading emissions disclosures, comparing solar vs grid unit economics and scoring governance quality.",
			[
				"Financial analysis",
				"Climate & energy literacy",
				"ESG frameworks",
				"Research writing",
				"Scepticism"
			],
			[
				"finance",
				"environment",
				"science"
			],
			[
				"research",
				"analytical",
				"critical_thinking",
				"writing"
			],
			[
				"Economics",
				"Environmental Studies",
				"Accountancy"
			],
			["Economics / Finance / Env Engineering + ESG research", "UN CC:Learn + CFA ESG"],
			["Development bank & impact-fund analyst"],
			["Compare an authentic renewable-energy bond vs a vague corporate sustainability pledge"],
			true,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Channels capital toward clean energy and social impact",
				"Growing global mandate",
				"Interdisciplinary"
			],
			[
				"Data disclosure inconsistency across firms",
				"Requires resisting greenwashing hype",
				"Evolving rules"
			],
			"List 3 measurable numbers you would demand before labelling an agriculture fund 'climate-safe'.",
			[
				"unccl",
				"varsity",
				"khanEcon"
			],
			"data"
		],
		[
			"forensic-accountant",
			"Forensic Accountant & Fraud Examiner",
			"Financial Investigation",
			"Trace irregular transactions, shell companies and embezzlement for courts, regulators or boards.",
			"Reconciling messy ledgers, spotting duplicate invoices, interviewing witnesses and preparing court-ready exhibits.",
			[
				"Accounting & audit",
				"Data cross-checking",
				"Investigative mindset",
				"Legal evidence standards",
				"Report writing"
			],
			["finance", "law"],
			[
				"observation",
				"analytical",
				"critical_thinking",
				"writing"
			],
			[
				"Accountancy",
				"Economics",
				"English"
			],
			["CA / B.Com + Certified Fraud Examiner (CFE)", "Audit → Forensic advisory practice"],
			["Compliance & AML investigator in banks"],
			["Spot 3 warning signs in a list of vendor payments made on Sundays to matching bank accounts"],
			false,
			4,
			"Office / desk",
			"Undergraduate Degree",
			500,
			[
				"Detective-style puzzle solving with numbers",
				"Protects institutions from fraud",
				"High specialist prestige"
			],
			[
				"Adversarial, high-conflict engagements",
				"Tedious line-by-line document review",
				"Strict confidentiality"
			],
			"Think of two ways a fake vendor invoice could hide inside a company's office-supplies budget.",
			[
				"varsity",
				"owasp",
				"swayam"
			],
			"cyber"
		]
	], {
		progression: [
			"Junior Analyst / Articled Trainee",
			"Analyst / Associate",
			"Senior Manager / Vice President",
			"Partner, CFO or Practice Head"
		],
		freelance: "Moderate — certified CAs, tax consultants, and SEBI-registered planners build independent practices; banking/quant roles are salaried.",
		entrepreneurship: "High — advisory boutiques, fintech startups, and independent wealth/tax firms.",
		entryLevel: "Bank/fintech internships, CA articleships, equity research notebooks, and personal finance clubs.",
		costNote: "Market, economics, and accounting concepts are free online; professional certifications have formal exam fees."
	}),
	...expandCareers("Law", [
		[
			"corporate-lawyer",
			"Corporate & Commercial Lawyer",
			"Contracts & Business Law",
			"Draft agreements, advise companies on deals and ensure business ventures follow the law.",
			"Reviewing shareholder contracts, negotiating risk clauses, conducting due diligence and briefing founders.",
			[
				"Contract drafting",
				"Close reading",
				"Negotiation",
				"Commercial awareness",
				"Precise writing"
			],
			[
				"law",
				"business",
				"finance"
			],
			[
				"writing",
				"critical_thinking",
				"analytical",
				"communication"
			],
			[
				"English",
				"Political Science",
				"Economics",
				"Business Studies"
			],
			[
				"CLAT / AILET → 5-year BA LL.B / BBA LL.B",
				"3-year LL.B after graduation",
				"Bar Council enrollment"
			],
			["In-house startup legal counsel"],
			["Read a simple rental agreement and underline 3 clauses that protect each side"],
			false,
			4,
			"Office / desk",
			"Undergraduate Degree",
			1e3,
			[
				"Central to business and startup deals",
				"Intellectually sharp writing craft",
				"Strong firm/in-house pathways"
			],
			[
				"Long hours during deal closings",
				"Dense reading volume",
				"Requires accredited LL.B"
			],
			"Spot the ambiguity in: 'Freelancer will deliver the website promptly after payment.'",
			[
				"swayam",
				"khanHum",
				"ncert"
			],
			"cyber"
		],
		[
			"litigation-advocate",
			"Litigation & Courtroom Advocate",
			"Dispute Resolution",
			"Represent individuals or organisations in courts, argue legal points and examine evidence.",
			"Drafting petitions, researching precedent cases, preparing witnesses and arguing before judges.",
			[
				"Oral advocacy",
				"Legal research",
				"Case strategy",
				"Persuasive writing",
				"Composure"
			],
			["law", "social"],
			[
				"public_speaking",
				"critical_thinking",
				"research",
				"writing"
			],
			[
				"English",
				"History",
				"Political Science"
			],
			["5-yr BA LL.B / 3-yr LL.B + AIBE Bar Exam", "Chambers apprenticeship with senior advocate"],
			["Legal aid clinic counsel", "Consumer & tribunal advocacy"],
			["Argue both sides of a mock school-policy dispute in 2 minutes each"],
			false,
			5,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			1e3,
			[
				"Powerful voice for citizens and justice",
				"Independent courtroom career",
				"Dramatic, dynamic days"
			],
			[
				"Slow earnings in initial chamber years",
				"Court adjournments test patience",
				"Long prep nights"
			],
			"Summarise a news story about a court verdict into: Facts, Issue, Rule, and Outcome.",
			[
				"swayam",
				"khanHum",
				"ncert"
			],
			"marketing"
		],
		[
			"intellectual-property-lawyer",
			"Intellectual Property (IP) Attorney",
			"Patents, Trademarks & Copyright",
			"Protect inventions, software, music, books and brand logos from copying or misuse.",
			"Filing trademark/patent claims, reviewing licensing terms for creators and resolving brand disputes.",
			[
				"Patent/copyright literacy",
				"Technical reading",
				"Precise claims drafting",
				"Negotiation",
				"Research"
			],
			[
				"law",
				"technology",
				"creative",
				"music"
			],
			[
				"writing",
				"research",
				"analytical",
				"critical_thinking"
			],
			[
				"English",
				"Computer Science",
				"Biology",
				"Physics"
			],
			["LL.B (Science/Engg UG preferred for Patent Agent exam)", "Registered Patent Agent + Bar enrollment"],
			["Creator/media licensing consultant", "University tech-transfer office"],
			["Check why a band name can be trademarked while a common fruit name cannot"],
			false,
			4,
			"Office / desk",
			"Undergraduate Degree",
			500,
			[
				"Connects law with music, biotech, design and AI",
				"Predictable firm hours vs courts",
				"Science grads thrive in patents"
			],
			[
				"Highly technical patent specifications",
				"Requires dual legal + domain fluency",
				"Filing deadlines are strict"
			],
			"Explain the difference between Copyright (creative expression) and Patent (functional invention).",
			[
				"swayam",
				"mitocw",
				"khanHum"
			],
			"uiux"
		],
		[
			"cyber-law-specialist",
			"Cyber Law & Data Privacy Counsel",
			"Digital Rights & Privacy",
			"Advise platforms and users on data protection, cybercrime compliance and online platform rules.",
			"Auditing privacy notices against data protection acts, managing breach notifications and advising security teams.",
			[
				"Privacy law (DPDP/GDPR)",
				"Tech architecture literacy",
				"Policy drafting",
				"Incident coordination",
				"Ethics"
			],
			[
				"law",
				"technology",
				"ai"
			],
			[
				"critical_thinking",
				"writing",
				"research",
				"analytical"
			],
			[
				"Computer Science",
				"Political Science",
				"English"
			],
			["LL.B + Cyber Law diploma", "Privacy certifications (CIPP) alongside law/compliance degree"],
			["Data Protection Officer (DPO) support", "Digital rights policy researcher"],
			["Read an app's privacy policy and note 3 kinds of data it collects that you didn't expect"],
			true,
			4,
			"Office / desk",
			"Undergraduate Degree",
			500,
			[
				"Urgent, modern intersection of tech and rights",
				"High global relevance",
				"Works closely with engineers"
			],
			[
				"Laws evolve slower than technology",
				"Cross-border rules conflict",
				"Detail-dense compliance docs"
			],
			"Write a clear 3-sentence privacy summary for a student study app in plain language.",
			[
				"owasp",
				"swayam",
				"courseraAudit"
			],
			"cyber"
		],
		[
			"environmental-lawyer",
			"Environmental & Climate Lawyer",
			"Environmental Justice",
			"Enforce pollution standards, defend forests and wetlands, and advise on clean-energy compliance.",
			"Reviewing environmental impact assessments, drafting public-interest petitions and advising green projects.",
			[
				"Environmental statutes",
				"Scientific report reading",
				"Field fact-finding",
				"Advocacy",
				"Persistence"
			],
			[
				"law",
				"environment",
				"social"
			],
			[
				"research",
				"critical_thinking",
				"writing",
				"public_speaking"
			],
			[
				"Environmental Studies",
				"Political Science",
				"Biology",
				"Geography"
			],
			["BA LL.B + Environmental Law specialisation", "NGT / High Court chambers & policy NGOs"],
			["ESG legal compliance advisor", "Climate litigation researcher"],
			["Read an environmental impact summary and list 3 questions a local community should ask"],
			false,
			4,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			500,
			[
				"Direct protection of ecosystems and communities",
				"Meaningful purpose",
				"Growing climate-law momentum"
			],
			[
				"Long litigation timelines",
				"Tough opposition from large polluters",
				"Modest pay in public-interest NGOs"
			],
			"Explain why 'polluter pays' matters differently from a small flat fine.",
			[
				"unccl",
				"swayam",
				"khanHum"
			],
			"data"
		],
		[
			"public-prosecutor",
			"Public Prosecutor / Government Counsel",
			"Criminal & Public Justice",
			"Represent the public interest in criminal or constitutional cases with fairness and evidentiary rigour.",
			"Reviewing police case files, checking witness evidence admissibility and arguing trials ethically.",
			[
				"Criminal procedure",
				"Evidence evaluation",
				"Courtroom advocacy",
				"Ethical impartiality",
				"Case prep"
			],
			[
				"law",
				"government",
				"social"
			],
			[
				"critical_thinking",
				"public_speaking",
				"analytical",
				"writing"
			],
			[
				"Political Science",
				"History",
				"English"
			],
			["LL.B + Bar practice (typically 7+ yrs practice) + State Public Service / Prosecutor Exam"],
			["Judicial clerkship → Government counsel panels"],
			["Read why the standard of proof in criminal trials ('beyond reasonable doubt') is stricter than civil suits"],
			false,
			5,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			500,
			[
				"Direct public service in justice system",
				"Heavy courtroom trial mastery",
				"Constitutional responsibility"
			],
			[
				"High caseloads and graphic case facts",
				"Years of practice required before appointment",
				"Strict state procedures"
			],
			"List 3 reasons why eyewitness memory alone can sometimes be unreliable evidence.",
			[
				"swayam",
				"ncert",
				"khanHum"
			],
			"cyber"
		],
		[
			"legal-tech-specialist",
			"Legal Tech & Operations Specialist",
			"Law & Automation",
			"Streamline contract workflows, legal research databases and compliance tracking with modern software.",
			"Configuring contract automation templates, structuring legal knowledge bases and training lawyers on tools.",
			[
				"Legal workflow mapping",
				"Document automation",
				"Data privacy",
				"Project management",
				"Tech fluency"
			],
			[
				"law",
				"technology",
				"business"
			],
			[
				"organisation",
				"technical",
				"problem_solving",
				"communication"
			],
			[
				"Computer Science",
				"English",
				"Business Studies"
			],
			["LL.B or B.Tech/BBA + legal ops roles", "Legal tech startups & BigLaw innovation teams"],
			["Contract lifecycle manager", "Court digitisation project analyst"],
			["Design a 5-field intake form that cuts lawyer email back-and-forth on NDA requests"],
			true,
			3,
			"Remote / from home",
			"Undergraduate Degree",
			0,
			[
				"Innovative bridge between law and software",
				"Better work-life predictability than traditional firms",
				"Growing role"
			],
			[
				"Convincing traditional teams to adopt new habits",
				"Smaller niche market",
				"Dual literacy needed"
			],
			"Map 4 repetitive steps in reviewing a standard internship agreement that software can check first.",
			[
				"fcc",
				"swayam",
				"mslearn"
			],
			"uiux"
		],
		[
			"compliance-officer",
			"Regulatory Compliance Officer",
			"Governance & Ethics",
			"Keep banks, hospitals, or tech firms aligned with anti-money-laundering, safety and ethics rules.",
			"Monitoring rule updates, auditing internal teams, running ethics training and filing statutory disclosures.",
			[
				"Policy interpretation",
				"Internal auditing",
				"Training design",
				"Documentation",
				"Ethical firmness"
			],
			[
				"law",
				"finance",
				"business"
			],
			[
				"organisation",
				"critical_thinking",
				"communication",
				"observation"
			],
			[
				"Business Studies",
				"Economics",
				"Political Science"
			],
			["B.Com / BBA / LL.B / Company Secretary (CS)", "Banking & healthcare compliance teams"],
			["Anti-money-laundering (AML) analyst", "Corporate governance secretary"],
			["Draft 4 clear internal rules to prevent gift-bribery when vendors visit an office"],
			false,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Steady corporate demand",
				"Prevents organisational crises",
				"Predictable schedule"
			],
			[
				"Can be seen as 'slowing down' fast teams",
				"Heavy regulatory paperwork",
				"Zero-margin audit errors"
			],
			"Spot why an internal anonymous whistle-blower channel needs retaliation protection to work.",
			[
				"swayam",
				"varsity",
				"courseraAudit"
			],
			"cyber"
		],
		[
			"arbitration-mediator",
			"Mediator & Alternative Dispute Resolution Specialist",
			"Peaceful Settlement",
			"Help disputing businesses, families or communities reach fair settlements outside slow court trials.",
			"Facilitating joint and private sessions, uncovering shared interests and drafting clear settlement terms.",
			[
				"Neutral facilitation",
				"Emotional de-escalation",
				"Active listening",
				"Creative compromise",
				"Agreement drafting"
			],
			[
				"law",
				"social",
				"business"
			],
			[
				"communication",
				"observation",
				"leadership",
				"critical_thinking"
			],
			[
				"English",
				"Psychology",
				"Political Science"
			],
			["LL.B / Social Work / Management + certified Mediator training (IIAM / court panels)"],
			["Commercial arbitration counsel", "Community/family dispute mediation"],
			["Reframe a loud positional fight ('I want the whole room!') into underlying needs"],
			false,
			4,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			500,
			[
				"Constructive problem-solving over courtroom combat",
				"Saves parties years and money",
				"Calm interpersonal craft"
			],
			[
				"Both parties must trust neutrality",
				"Requires deep emotional composure",
				"Senior referrals build slowly"
			],
			"Practice turning two angry complaints between project teammates into one shared goal.",
			[
				"swayam",
				"khanHum",
				"courseraAudit"
			],
			"uiux"
		],
		[
			"human-rights-advocate",
			"Human Rights & Public Policy Advocate",
			"Civil Liberties",
			"Research rights violations, support vulnerable groups and push for fair laws and institutional reform.",
			"Documenting field testimonies, writing policy briefs, partnering with legal aid clinics and engaging lawmakers.",
			[
				"Constitutional literacy",
				"Field ethics",
				"Policy writing",
				"Coalition building",
				"Resilience"
			],
			[
				"law",
				"social",
				"government",
				"writing"
			],
			[
				"research",
				"writing",
				"communication",
				"critical_thinking"
			],
			[
				"Political Science",
				"History",
				"English",
				"Psychology"
			],
			["BA LL.B / Public Policy / Social Work", "Fellowships (LAMP, Human Rights NGOs, UN agencies)"],
			["Legal-aid paralegal coordinator", "Think-tank policy analyst"],
			["Compare a constitutional fundamental right with how it applies in a local school or workplace case"],
			false,
			4,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			0,
			[
				"High moral purpose",
				"Deep constitutional and civic learning",
				"Global NGO/UN pathways"
			],
			[
				"Slow systemic change",
				"Modest non-profit salaries",
				"Emotionally heavy field accounts"
			],
			"Write a 150-word factual summary of a local civic access problem without exaggerating.",
			[
				"khanHum",
				"swayam",
				"ncert"
			],
			"marketing"
		],
		[
			"sports-law-attorney",
			"Sports Law & Athlete Representation Counsel",
			"Sports Governance & Contracts",
			"Draft player contracts, negotiate sponsorships, handle anti-doping rules and resolve club disputes.",
			"Reviewing transfer clauses, advising academies on youth protection and representing athletes at sports tribunals.",
			[
				"Contract law",
				"Federation regulations",
				"Sponsorship rights",
				"Negotiation",
				"Ethics"
			],
			[
				"law",
				"sports",
				"football",
				"cricket",
				"business"
			],
			[
				"communication",
				"analytical",
				"writing",
				"critical_thinking"
			],
			[
				"English",
				"Business Studies",
				"Political Science",
				"Physical Education"
			],
			["LL.B + Sports Law diplomas/internships with federations or sports agencies"],
			["Athlete sponsorship & image-rights manager", "League compliance officer"],
			["List 4 protections a 16-year-old athlete's contract should check before signing with an agency"],
			true,
			4,
			"Office / desk",
			"Undergraduate Degree",
			500,
			[
				"Combines legal craft with live sport",
				"Protects young athletes from unfair contracts",
				"International federation scope"
			],
			[
				"Niche market with few dedicated Indian firms initially",
				"Needs Bar foundation first",
				"Seasonal transfers"
			],
			"Identify why an exclusivity clause in an athlete sponsorship needs a clear time and category limit.",
			[
				"fifa",
				"swayam",
				"courseraAudit"
			],
			"cyber"
		],
		[
			"tax-attorney",
			"Tax Litigation & Policy Lawyer",
			"Fiscal Law",
			"Represent businesses in tax tribunal appeals and structure cross-border operations legally.",
			"Interpreting statutory amendments, writing appellate briefs and coordinating with Chartered Accountants.",
			[
				"Statutory interpretation",
				"Tax treaties",
				"Appellate drafting",
				"Numerical fluency",
				"Research"
			],
			["law", "finance"],
			[
				"analytical",
				"research",
				"writing",
				"critical_thinking"
			],
			[
				"Economics",
				"Accountancy",
				"Political Science"
			],
			["LL.B / B.Com + LL.B", "Tax litigation chambers or Big-4 legal teams"],
			["Customs & trade law counsel"],
			["Look up how 'tax avoidance' (legal planning) differs from 'tax evasion' (illegal hiding)"],
			false,
			4,
			"Office / desk",
			"Undergraduate Degree",
			500,
			[
				"High specialist demand",
				"Stable appellate calendar",
				"Strong synergy with finance"
			],
			[
				"Dense statutory amendments",
				"Requires strong accounting grasp",
				"Heavy reading"
			],
			"Read a short consumer GST receipt and trace why rates differ between essentials and luxury goods.",
			[
				"swayam",
				"varsity",
				"ncert"
			],
			"data"
		],
		[
			"paralegal-researcher",
			"Legal Researcher & Paralegal Specialist",
			"Legal Support & Access",
			"Organise case evidence, verify statutory citations and help citizens navigate filings clearly.",
			"Summarising past judgements, preparing court bundles, interviewing intake clients and maintaining case calendars.",
			[
				"Case summarisation",
				"Document indexing",
				"Citation accuracy",
				"Plain-language intake",
				"Reliability"
			],
			["law", "writing"],
			[
				"research",
				"organisation",
				"writing",
				"observation"
			],
			[
				"English",
				"History",
				"Political Science"
			],
			[
				"Paralegal Diploma / B.A. / LL.B",
				"Law firm knowledge & research teams",
				"NGO community paralegal"
			],
			["Legal publishing & case-database editor"],
			["Summarise a 2-page rulebook into 5 clear bullet points with exact section numbers"],
			false,
			2,
			"Office / desk",
			"Class 12",
			0,
			[
				"Accessible entry into legal work before/without full Bar",
				"Builds foundational legal literacy",
				"Orderly workflows"
			],
			[
				"Support-role ceiling unless pursuing LL.B",
				"Strict filing deadlines",
				"Detailed citation checking"
			],
			"Organise 10 mixed emails and receipts into a chronological timeline with clear filenames.",
			[
				"swayam",
				"ncert",
				"khanHum"
			],
			"data"
		]
	], {
		progression: [
			"Junior Associate / Paralegal / Trainee",
			"Associate / Counsel",
			"Senior Associate / Advocate",
			"Partner, Senior Counsel or General Counsel"
		],
		freelance: "High in independent litigation, mediation, and IP consulting after Bar enrollment.",
		entrepreneurship: "Moderate-High — founding boutique law practices, mediation centres, or legal-tech services.",
		entryLevel: "Court/firm internships, university moot courts, legal aid clinics, and policy fellowships.",
		costNote: "Constitutional and civic basics are free; formal LL.B tuition and Bar exams follow statutory schedules."
	}),
	...expandCareers("Science & Research", [
		[
			"biotechnologist",
			"Biotechnologist",
			"Applied Life Sciences",
			"Engineer microbes, enzymes or biological processes for medicines, clean fuels and resilient crops.",
			"Running cell cultures, designing PCR assays, logging fermentation yields and ensuring biosafety.",
			[
				"Molecular techniques",
				"Sterile lab practice",
				"Experimental design",
				"Data plotting",
				"Lab safety"
			],
			[
				"science",
				"healthcare",
				"environment"
			],
			[
				"research",
				"observation",
				"analytical",
				"problem_solving"
			],
			[
				"Biology",
				"Chemistry",
				"Mathematics"
			],
			["B.Tech / B.Sc. Biotechnology → M.Sc./M.Tech", "Biopharma R&D or quality labs"],
			["Bio-manufacturing quality assurance", "Biotech regulatory affairs"],
			["Extract visible DNA from a crushed banana using salt, dish soap and cold alcohol at home"],
			false,
			4,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Creates real vaccines, enzymes and bio-plastics",
				"Active wet-lab + data mix",
				"Global R&D relevance"
			],
			[
				"Long experiment cycles and failed batches",
				"Masters often needed for core R&D",
				"Strict cleanroom protocols"
			],
			"List 3 everyday products—from insulin to laundry detergent—made using engineered microbes.",
			[
				"khanSci",
				"nptel",
				"mitocw"
			],
			"data"
		],
		[
			"microbiologist",
			"Microbiologist",
			"Microbial Science",
			"Study bacteria, fungi and viruses to improve food safety, antibiotics and water quality.",
			"Culturing samples safely, checking microscope stains, testing antimicrobial resistance and auditing hygiene.",
			[
				"Aseptic technique",
				"Microscopy",
				"Food/water testing",
				"Statistical logging",
				"Biosafety"
			],
			[
				"science",
				"healthcare",
				"environment"
			],
			[
				"observation",
				"research",
				"organisation",
				"analytical"
			],
			["Biology", "Chemistry"],
			["B.Sc. Microbiology → M.Sc. Microbiology", "Hospital, food-safety (FSSAI) & pharma QC labs"],
			["Dairy & beverage quality-control microbiologist", "Water-testing lab analyst"],
			["Learn why boiling kills most active bacteria while bacterial spores need higher pressure steam"],
			false,
			4,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Essential across food, water, medicine and soil",
				"Clear hands-on lab routines",
				"Rewarding invisible world"
			],
			[
				"Strict biohazard rules",
				"Routine quality-control runs in entry roles",
				"Requires careful lab focus"
			],
			"Explain why washing hands with plain soap disrupts many viruses better than plain water.",
			[
				"khanSci",
				"openwho",
				"ncert"
			],
			"cyber"
		],
		[
			"astrophysicist",
			"Astrophysicist & Space Researcher",
			"Space & Cosmology",
			"Study stars, exoplanets and cosmic signals using physics, telescopes and computational simulations.",
			"Reducing telescope spectra, coding orbital or radiative models, reading papers and collaborating internationally.",
			[
				"Classical & quantum physics",
				"Calculus & linear algebra",
				"Python simulation",
				"Data reduction",
				"Scientific writing"
			],
			[
				"science",
				"mathematics",
				"technology"
			],
			[
				"mathematics",
				"research",
				"analytical",
				"critical_thinking"
			],
			[
				"Physics",
				"Mathematics",
				"Computer Science"
			],
			["B.Sc./B.Tech Physics or Engineering Physics → M.Sc. → PhD", "ISRO / IUCAA / observatory fellowships"],
			["Space mission operations & satellite telemetry", "Science planetarium communication"],
			["Explore a real public exoplanet transit light-curve and spot the dip when a planet crosses its star"],
			false,
			5,
			"Lab or studio",
			"Postgraduate / Licensing",
			0,
			[
				"Answers profound questions about the universe",
				"Teaches elite coding & physics transferable anywhere",
				"Global teams"
			],
			[
				"Very long PhD/postdoc academic funnel",
				"Limited permanent research faculty seats",
				"Heavy theoretical math"
			],
			"Calculate why a planet blocking 1% of a star's radius blocks only ~0.01% of its light area.",
			[
				"mitocw",
				"khanSci",
				"nptel"
			],
			"data"
		],
		[
			"chemist-researcher",
			"Analytical & Materials Chemist",
			"Chemical Sciences",
			"Synthesise new compounds and verify composition for batteries, medicines and clean water.",
			"Running chromatography/spectroscopy, purifying reactions, checking safety sheets and writing synthesis logs.",
			[
				"Organic/analytical chemistry",
				"Spectroscopy reading",
				"Lab safety",
				"Precision measurement",
				"Documentation"
			],
			["science", "environment"],
			[
				"observation",
				"analytical",
				"research",
				"problem_solving"
			],
			[
				"Chemistry",
				"Physics",
				"Mathematics"
			],
			["B.Sc. Chemistry / B.Tech Chemical → M.Sc./PhD", "Pharma, battery & polymer R&D labs"],
			["Environmental water-quality lab chemist", "Cosmetic & food formulation"],
			["Read a Material Safety Data Sheet symbol guide and identify 4 basic lab hazard icons"],
			false,
			4,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Tangibly creates new batteries, dyes and drugs",
				"Strong industrial demand",
				"Clear lab craft"
			],
			[
				"Fume-hood & solvent safety vigilance",
				"Many reactions need iterative tweaking",
				"Long PhD for lead discovery"
			],
			"Explain why lithium-ion battery researchers care deeply about moisture traces measured in parts per million.",
			[
				"khanSci",
				"nptel",
				"mitocw"
			],
			"data"
		],
		[
			"geneticist",
			"Geneticist & Genomics Specialist",
			"Heredity & DNA Science",
			"Investigate how genes influence traits, inherited conditions and crop resilience.",
			"Analysing sequencing reads, running family pedigree checks, counselling or mapping gene variants cleanly.",
			[
				"Genetics & statistics",
				"Sequence analysis",
				"Ethics & privacy",
				"Careful communication",
				"Literature review"
			],
			["science", "healthcare"],
			[
				"research",
				"analytical",
				"critical_thinking",
				"observation"
			],
			[
				"Biology",
				"Mathematics",
				"Chemistry"
			],
			["B.Sc. Genetics / Biotech / Biology → M.Sc. Genetics / Genetic Counselling", "PhD for research"],
			["Clinical genetic counsellor (with accredited M.Sc.)", "Crop genetics & seed research"],
			["Trace a simple recessive trait across a 3-generation family tree to spot carrier probabilities"],
			false,
			5,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Rapidly advancing frontier of medicine and agriculture",
				"High clinical & ethical relevance",
				"Research depth"
			],
			[
				"Complex multi-gene traits resist simple answers",
				"Strict genomic privacy duties",
				"Long study path"
			],
			"Why doesn't carrying one genetic risk variant guarantee a person will develop a condition?",
			[
				"khanSci",
				"mitocw",
				"nptel"
			],
			"data"
		],
		[
			"bioinformatician",
			"Bioinformatician / Computational Biologist",
			"Biology + Data Science",
			"Write software and statistical pipelines to decode massive DNA, protein and RNA datasets.",
			"Aligning gene sequences in Python/R, building annotation pipelines and visualising protein pathways.",
			[
				"Python / R / Bash",
				"Statistics",
				"Molecular biology",
				"Sequence algorithms",
				"Reproducible workflows"
			],
			[
				"science",
				"technology",
				"ai",
				"healthcare"
			],
			[
				"technical",
				"analytical",
				"research",
				"mathematics"
			],
			[
				"Biology",
				"Computer Science",
				"Mathematics"
			],
			["B.Tech Bioinformatics / CS + Bio minor → M.Sc./M.Tech Bioinformatics", "Open genomics workshops"],
			["Pharma target-discovery data engineer", "Agricultural genomics analyst"],
			["Translate a 12-letter DNA sequence into its complementary strand and mRNA codons"],
			true,
			4,
			"Remote / from home",
			"Undergraduate Degree",
			0,
			[
				"Combines biology and coding without always needing a wet lab",
				"Remote-friendly",
				"High biotech value"
			],
			[
				"Needs fluency in two very different fields",
				"Huge messy file formats",
				"Academic pace in some labs"
			],
			"Look up how BLAST searches billions of DNA bases in seconds using short seed matches.",
			[
				"kaggle",
				"khanSci",
				"nptel"
			],
			"software"
		],
		[
			"oceanographer",
			"Oceanographer & Marine Scientist",
			"Earth & Ocean Systems",
			"Study ocean currents, coral ecosystems, sea-level trends and coastal resilience.",
			"Analysing buoy & satellite sea-temperature data, sampling coastal water and modelling storm surges.",
			[
				"Marine ecology / physics",
				"GIS & data analysis",
				"Field sampling",
				"Statistics",
				"Team expeditions"
			],
			[
				"science",
				"environment",
				"travel"
			],
			[
				"research",
				"observation",
				"analytical",
				"fitness"
			],
			[
				"Physics",
				"Biology",
				"Geography",
				"Mathematics"
			],
			["B.Sc. Physics/Biology/Env Science → M.Sc. Marine Science / Oceanography (NIO / university programs)"],
			["Coastal conservation NGOs", "Marine weather & shipping route analyst"],
			["Explore how ocean warming causes sea level rise through thermal expansion even before ice melts"],
			false,
			4,
			"Outdoors / on the move",
			"Postgraduate / Licensing",
			500,
			[
				"Adventurous blend of sea fieldwork and climate science",
				"Vital coastal community protection",
				"Unique niche"
			],
			[
				"Long research voyages can be isolating",
				"Competitive research funding",
				"Postgraduate degree usually required"
			],
			"Explain why warmer ocean water fuels stronger cyclones using energy transfer.",
			[
				"unccl",
				"khanSci",
				"mitocw"
			],
			"data"
		],
		[
			"neuroscientist",
			"Neuroscientist",
			"Brain & Cognition",
			"Explore how neurons, circuits and sleep shape memory, movement, perception and disease.",
			"Recording behavioural or EEG trials, analysing neural spike datasets and testing cognitive hypotheses.",
			[
				"Neurobiology",
				"Experimental stats",
				"Python / MATLAB",
				"Ethics",
				"Critical reading"
			],
			[
				"science",
				"healthcare",
				"ai"
			],
			[
				"research",
				"analytical",
				"observation",
				"critical_thinking"
			],
			[
				"Biology",
				"Psychology",
				"Mathematics",
				"Physics"
			],
			["B.Sc. Life Sciences / Psychology / B.Tech → M.Sc./PhD Neuroscience (NBRC / IISc / universities)"],
			["Brain-computer interface (BCI) research engineer", "Clinical neurophysiology technologist"],
			["Design a fair 5-minute experiment checking whether background music affects memorising 12 random words"],
			false,
			5,
			"Lab or studio",
			"Postgraduate / Licensing",
			0,
			[
				"Unlocks mysteries of memory, sleep and perception",
				"Connects naturally with AI and medicine",
				"Deep curiosity"
			],
			[
				"Long PhD road for lead labs",
				"Human brain data is noisy",
				"Strict animal/human ethics oversight"
			],
			"Explain why double-blind trials matter when testing whether a 'brain-training' app really works.",
			[
				"khanSci",
				"mitocw",
				"courseraAudit"
			],
			"data"
		],
		[
			"forensic-scientist",
			"Forensic Scientist",
			"Forensic Investigation",
			"Examine physical, chemical or digital traces scientifically to support accurate justice.",
			"Testing toxicology samples, comparing fibres or fingerprints, logging strict chain-of-custody and testifying neutrally.",
			[
				"Analytical chemistry / bio",
				"Chain-of-custody rigour",
				"Microscopy",
				"Unbiased reporting",
				"Attention to detail"
			],
			["science", "law"],
			[
				"observation",
				"critical_thinking",
				"analytical",
				"writing"
			],
			[
				"Chemistry",
				"Biology",
				"Physics"
			],
			["B.Sc. Forensic Science / Chemistry / Bio → M.Sc. Forensic Science (NFSU / state labs)"],
			["Digital forensics investigator (cybercrime labs)", "Document & handwriting examiner"],
			["List 4 contamination mistakes that could ruin physical evidence collected at a scene"],
			false,
			4,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Scientific precision serving justice",
				"Diverse subfields (DNA, cyber, toxicology)",
				"Clear lab procedures"
			],
			[
				"Often very different from dramatic TV shows—slow careful lab work",
				"Strict legal cross-examination",
				"Limited state lab openings"
			],
			"Why must forensic scientists measure probability carefully instead of saying '100% match' lightly?",
			[
				"khanSci",
				"swayam",
				"owasp"
			],
			"cyber"
		],
		[
			"materials-scientist",
			"Materials Scientist & Nanotechnologist",
			"Advanced Materials",
			"Design lighter alloys, solar cells, biodegradable packaging and faster semiconductors.",
			"Testing tensile strength or conductivity, inspecting electron-microscope structures and tuning heat treatments.",
			[
				"Physics & chemistry",
				"Materials testing",
				"Microscopy / XRD",
				"Data analysis",
				"Failure analysis"
			],
			[
				"science",
				"technology",
				"environment"
			],
			[
				"research",
				"analytical",
				"problem_solving",
				"technical"
			],
			[
				"Physics",
				"Chemistry",
				"Mathematics"
			],
			["B.Tech Materials / Metallurgical / Chemical Engg → M.Tech/PhD", "Semiconductor, EV & aerospace R&D"],
			["Solar PV & battery cell reliability engineer"],
			["Compare why glass shatters on impact while car windshields hold together in a spiderweb"],
			false,
			4,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Powers EVs, chips, aerospace and medical implants",
				"Blends physics, chemistry and engineering",
				"Strong industry ties"
			],
			[
				"Specialised lab tools limit home experimentation",
				"Long R&D validation cycles",
				"Cleanroom constraints"
			],
			"List 3 properties a material needs for a reusable rocket heat shield vs a solar panel glass.",
			[
				"nptel",
				"mitocw",
				"khanSci"
			],
			"data"
		],
		[
			"climate-scientist",
			"Climate & Atmospheric Scientist",
			"Earth Climate Modelling",
			"Analyse weather records, monsoon shifts and greenhouse emissions to guide climate adaptation.",
			"Running atmospheric grid models, calibrating rain-gauge records and advising flood or drought planners.",
			[
				"Atmospheric physics",
				"Python / R climate data",
				"Statistics",
				"GIS",
				"Science communication"
			],
			[
				"science",
				"environment",
				"mathematics"
			],
			[
				"mathematics",
				"research",
				"analytical",
				"communication"
			],
			[
				"Physics",
				"Mathematics",
				"Geography",
				"Computer Science"
			],
			["B.Sc./B.Tech Physics, Math or Atmospheric Sci → M.Sc./PhD Meteorology/Climate (IITM/IISc/universities)"],
			["Agricultural weather-advisory analyst", "Clean-energy wind/solar resource modeller"],
			["Explain the difference between daily weather (wearing a jacket) and climate (your whole wardrobe)"],
			true,
			4,
			"Office / desk",
			"Postgraduate / Licensing",
			0,
			[
				"Directly helps cities and farmers prepare for extremes",
				"Combines physics, coding and public service",
				"Global demand"
			],
			[
				"Communicating uncertainty to non-scientists is tough",
				"Postgrad math/physics expected",
				"Heavy climate datasets"
			],
			"Why do extreme rainfall events increase in a warmer atmosphere even in regions with fewer rainy days?",
			[
				"unccl",
				"mitocw",
				"kaggle"
			],
			"data"
		],
		[
			"pharmacologist",
			"Pharmacologist & Drug Safety Scientist",
			"Pharmacology",
			"Study how molecules interact with human receptors, safe dosages and unwanted side effects.",
			"Designing dose-response assays, tracking adverse drug reports and writing regulatory safety reviews.",
			[
				"Biochemistry",
				"Physiology",
				"Statistical dose curves",
				"Regulatory ethics",
				"Scientific writing"
			],
			["science", "healthcare"],
			[
				"research",
				"analytical",
				"observation",
				"critical_thinking"
			],
			[
				"Biology",
				"Chemistry",
				"Mathematics"
			],
			["B.Pharm / B.Sc. Life Sciences → M.Pharm / M.Sc. Pharmacology → PhD", "Pharmacovigilance scientist"],
			["Medical science liaison", "Drug safety & regulatory affairs"],
			["Learn what 'therapeutic window' means: why both too little and too much of a medicine fail"],
			false,
			4,
			"Lab or studio",
			"Postgraduate / Licensing",
			500,
			[
				"Saves lives through safer medicines",
				"Strong biopharma R&D pathway",
				"Rigorous lab and data mix"
			],
			[
				"Years of candidate failures before one safe drug",
				"Strict regulatory documentation",
				"Masters+ needed"
			],
			"Why must clinical doses account for kidney or liver health in older patients?",
			[
				"khanSci",
				"nptel",
				"openwho"
			],
			"data"
		],
		[
			"quantum-computing-researcher",
			"Quantum Information & Computing Researcher",
			"Next-Gen Computation",
			"Explore quantum algorithms, error correction and cryogenic hardware for intractable physics problems.",
			"Simulating qubit circuits in Qiskit, debugging noise decoherence and proving algorithmic speedups.",
			[
				"Linear algebra & complex numbers",
				"Quantum mechanics",
				"Python (Qiskit)",
				"Research rigour",
				"Algorithmic proof"
			],
			[
				"science",
				"technology",
				"mathematics",
				"ai"
			],
			[
				"mathematics",
				"research",
				"critical_thinking",
				"analytical"
			],
			[
				"Physics",
				"Mathematics",
				"Computer Science"
			],
			["B.Tech Physics/CSE/ECE or B.Sc. Physics/Math → M.Sc./PhD Quantum Technologies", "National Quantum Mission labs"],
			["Quantum cryptography & post-quantum security engineer"],
			["Explain how a qubit superposition differs from just flipping a regular coin randomly"],
			true,
			5,
			"Lab or studio",
			"Postgraduate / Licensing",
			0,
			[
				"Frontier of physics and computer science",
				"Free cloud quantum simulators exist",
				"Post-quantum security urgency"
			],
			[
				"Highly abstract linear algebra & physics",
				"Commercial fault-tolerant hardware is years away",
				"Academic depth needed"
			],
			"Look up why quantum computers threaten current RSA encryption—and why we already build 'post-quantum' math.",
			[
				"mitocw",
				"nptel",
				"mslearn"
			],
			"software"
		]
	], {
		progression: [
			"Research Assistant / Junior Analyst",
			"Associate Scientist",
			"Senior / Principal Scientist",
			"Lab Director or Professor"
		],
		freelance: "Moderate — scientific writing, bioinformatics pipelines, statistical consulting, and technical editing.",
		entrepreneurship: "Moderate-High — deep-tech biotech, diagnostics, clean materials, and climate analytics startups.",
		entryLevel: "Summer research fellowships (IASc/SRFP), university lab volunteering, and open datasets.",
		costNote: "Physics, biology, math, and MIT/NPTEL lectures are free; wet-lab research relies on funded university labs."
	}),
	...expandCareers("Creative Arts", [
		[
			"illustrator",
			"Illustrator & Visual Storyteller",
			"Illustration",
			"Create expressive artwork for children's books, editorial articles, games and packaging.",
			"Sketching thumbnails, refining colour palettes, meeting art directors' briefs and preparing print/digital files.",
			[
				"Drawing & anatomy",
				"Colour & lighting",
				"Visual storytelling",
				"Digital/traditional media",
				"Client briefs"
			],
			[
				"art",
				"design",
				"writing"
			],
			[
				"creativity",
				"observation",
				"communication"
			],
			[
				"Fine Arts",
				"English",
				"History"
			],
			["BFA (Bachelor of Fine Arts) / Visual Communication", "Self-taught with strong curated portfolio"],
			["Editorial & book cover commissions", "Concept art for indie games"],
			["Illustrate one proverb or short poem in 3 simple sketches without using any words"],
			false,
			3,
			"Lab or studio",
			"Class 10+",
			500,
			[
				"Expressive, joyful craft",
				"Can start with paper and pencil",
				"Global remote commissions"
			],
			[
				"Income varies by commission pipeline",
				"Client revision cycles",
				"Must learn pricing & licensing"
			],
			"Draw the same everyday mug in 3 different moods using only light and shadow.",
			[
				"khanHum",
				"figma",
				"blender"
			],
			"uiux"
		],
		[
			"music-producer",
			"Music Producer & Composer",
			"Music Production",
			"Shape songs, film scores, or game audio from melody ideas to polished final mixes.",
			"Arranging instruments in a DAW, recording vocals cleanly, balancing EQ/compression and collaborating with artists.",
			[
				"Harmony & rhythm",
				"DAW arrangement",
				"Ear training",
				"Audio mixing basics",
				"Artist collaboration"
			],
			[
				"music",
				"technology",
				"media"
			],
			[
				"creativity",
				"observation",
				"technical",
				"teamwork"
			],
			[
				"Music",
				"Physics",
				"Computer Science"
			],
			["B.A./Diploma in Music Production or Sound Engineering", "Self-taught portfolio of produced tracks"],
			["Podcast/indie-game music composer", "Studio recording & mixing engineer"],
			["Layer 3 simple tracks (rhythm, bass, melody) in a free DAW to create a 20-second loop"],
			false,
			3,
			"Lab or studio",
			"Class 10+",
			500,
			[
				"Unites emotion, rhythm and acoustic craft",
				"Home laptop studios are powerful today",
				"Crosses film, games and streaming"
			],
			[
				"Crowded independent release space",
				"Ear fatigue on long mixes",
				"Acoustic room treatment helps later"
			],
			"Listen actively to one favourite song and write down every instrument entering in the first 45 seconds.",
			[
				"khanHum",
				"courseraAudit",
				"swayam"
			],
			"marketing"
		],
		[
			"sound-designer",
			"Sound Designer & Foley Artist",
			"Audio Storytelling",
			"Craft immersive footsteps, sci-fi interfaces, ambience and crisp dialogue for films, games and apps.",
			"Recording everyday objects cleanly, editing effects to frame timing and mixing spatial soundscapes.",
			[
				"Field recording",
				"Audio editing",
				"Foley creativity",
				"Spatial mixing",
				"Detail listening"
			],
			[
				"music",
				"gaming",
				"media",
				"technology"
			],
			[
				"creativity",
				"observation",
				"technical",
				"problem_solving"
			],
			[
				"Physics",
				"Music",
				"Computer Science"
			],
			["Sound Design / Film & Audio Diploma (FTII/SRFTI/private)", "Game-jam audio portfolio"],
			["App/UX micro-sound designer", "Podcast audio editor"],
			["Record 3 household sounds on a phone and rename how they could represent futuristic UI actions"],
			false,
			3,
			"Lab or studio",
			"Class 12",
			500,
			[
				"Playful experimental craft",
				"Less crowded than singer/songwriter paths",
				"Huge impact on game & film immersion"
			],
			[
				"Requires quiet recording spaces",
				"Often project-based freelance work",
				"Tight post-production schedules"
			],
			"Watch a 1-minute movie scene muted and list every tiny background sound the scene secretly needs.",
			[
				"courseraAudit",
				"godot",
				"khanHum"
			],
			"uiux"
		],
		[
			"fine-artist",
			"Contemporary Fine Artist & Sculptor",
			"Studio Arts",
			"Create original paintings, sculptures, installations or printmaking exploring ideas and culture.",
			"Developing a body of studio work, experimenting with pigments/clay, documenting exhibitions and writing artist notes.",
			[
				"Medium mastery",
				"Conceptual depth",
				"Material experiment",
				"Visual critique",
				"Exhibition curation"
			],
			[
				"art",
				"history",
				"social"
			],
			[
				"creativity",
				"observation",
				"critical_thinking",
				"writing"
			],
			[
				"Fine Arts",
				"History",
				"English"
			],
			["BFA → MFA (Fine Arts)", "Artist residencies, fellowships & community art collectives"],
			["Art workshops & public muralist", "Set/scenic artisan"],
			["Visit a local craftsperson or gallery and analyse why two artworks evoke totally different emotions"],
			false,
			4,
			"Lab or studio",
			"Class 12",
			1e3,
			[
				"Maximum creative autonomy",
				"Cultural and community impact",
				"Lifelong personal voice"
			],
			[
				"Unpredictable sales and gallery income",
				"Material & studio space costs",
				"Requires resilience to rejection"
			],
			"Make a cohesive 3-piece mini series on one local theme using only cheap ink, charcoal or recycled paper.",
			[
				"khanHum",
				"swayam",
				"courseraAudit"
			],
			"uiux"
		],
		[
			"animator",
			"2D / 3D Character Animator",
			"Animation",
			"Bring characters, educational explainers and virtual worlds to life through timing and motion.",
			"Blocking key poses, refining arcs and squash-stretch, syncing dialogue and rendering shots cleanly.",
			[
				"12 principles of animation",
				"Timing & spacing",
				"Blender / Krita / Maya",
				"Acting observation",
				"Patience"
			],
			[
				"art",
				"gaming",
				"media",
				"technology"
			],
			[
				"creativity",
				"observation",
				"technical",
				"teamwork"
			],
			[
				"Fine Arts",
				"Physics",
				"Computer Science"
			],
			["B.Des Animation (NID/IDC) / B.Sc. Animation", "Self-taught with Blender & strong 60-second demo reel"],
			["Ed-tech explainer animator", "Game character rigging & animation"],
			["Sketch or animate a bouncing ball showing how heavy bowling balls bounce differently from ping-pong balls"],
			false,
			4,
			"Lab or studio",
			"Class 12",
			0,
			[
				"Free pro-grade tools like Blender exist",
				"High demand across gaming, education and film",
				"Magic of bringing drawings alive"
			],
			[
				"Frame-by-frame work is painstaking",
				"Long studio crunch near deadlines",
				"Render hardware demands for heavy 3D"
			],
			"Act out picking up a heavy suitcase in front of a mirror and note which body part moves FIRST.",
			[
				"blender",
				"khan",
				"khanHum"
			],
			"uiux"
		],
		[
			"creative-writer",
			"Author, Screenwriter & Narrative Designer",
			"Creative & Narrative Writing",
			"Write novels, scripts, interactive game stories and educational narratives that move readers.",
			"Outlining story arcs, drafting scenes, trimming dead dialogue, researching settings and handling editor notes.",
			[
				"Story structure",
				"Character voice",
				"Editing discipline",
				"Research",
				"Emotional truth"
			],
			[
				"writing",
				"history",
				"media",
				"gaming"
			],
			[
				"writing",
				"creativity",
				"observation",
				"research"
			],
			[
				"English",
				"History",
				"Psychology",
				"Hindi / Regional language"
			],
			["B.A. Literature / Creative Writing", "Any degree + published short stories / scripts / indie game scripts"],
			["Branching narrative writer for games", "Children's educational storybook author"],
			["Write a 200-word scene showing a character is nervous WITHOUT ever using the words 'nervous' or 'scared'"],
			false,
			3,
			"Remote / from home",
			"Class 10+",
			0,
			[
				"Zero equipment barrier",
				"Regional-language storytelling is thriving",
				"Transfers across books, games and film"
			],
			[
				"Income takes years to stabilise from books alone",
				"Frequent rejection letters",
				"Self-discipline required"
			],
			"Rewrite a boring 5-line plot summary so each line forces an unexpected choice.",
			[
				"khanHum",
				"swayam",
				"courseraAudit"
			],
			"marketing"
		],
		[
			"photographer",
			"Documentary & Commercial Photographer",
			"Visual Documentation",
			"Capture honest human stories, products, architecture or wildlife through light and composition.",
			"Scouting natural light, directing subjects calmly, culling shoots, colour-grading RAW files and archiving.",
			[
				"Exposure & lighting",
				"Framing & timing",
				"Subject rapport",
				"Editing workflow",
				"Client delivery"
			],
			[
				"art",
				"travel",
				"media"
			],
			[
				"observation",
				"creativity",
				"communication",
				"technical"
			],
			[
				"Fine Arts",
				"Physics",
				"History"
			],
			["Photography Diploma / Visual Communication", "Portfolio-first apprenticeship with studio/photojournalist"],
			["Architectural & product photography", "Photojournalism features"],
			["Take 5 photos of the same street corner at morning, noon and dusk to see how shadows reshape mood"],
			false,
			2,
			"Outdoors / on the move",
			"Class 10+",
			1e3,
			[
				"Active exploration outdoors",
				"Phone cameras teach composition immediately",
				"Direct client bookings possible"
			],
			[
				"Camera lenses & backups cost money",
				"Weekend event schedules",
				"High competition at basic level"
			],
			"Tell a complete 4-photo story about someone making tea—wide shot, hands, expression, finished cup.",
			[
				"khanHum",
				"courseraAudit",
				"figma"
			],
			"uiux"
		],
		[
			"filmmaker",
			"Filmmaker & Documentary Director",
			"Cinema & Non-Fiction",
			"Shape scripts, camera blocking, performance and editing into cohesive short films or documentaries.",
			"Storyboarding scenes, rehearsing actors or interviewees, directing crew schedules and guiding the edit.",
			[
				"Visual grammar",
				"Script breakdown",
				"Crew leadership",
				"Interviewing",
				"Editing rhythm"
			],
			[
				"media",
				"art",
				"writing",
				"history"
			],
			[
				"leadership",
				"creativity",
				"communication",
				"organisation"
			],
			[
				"English",
				"History",
				"Fine Arts"
			],
			["FTII / SRFTI / Mass Comm / Film Studies", "Directing indie shorts with a phone + free editor"],
			["Brand documentary & impact-film director"],
			["Storyboard a 60-second silent film about returning a lost wallet using only 6 shots"],
			false,
			4,
			"Outdoors / on the move",
			"Class 12",
			500,
			[
				"Unites writing, visuals, sound and leadership",
				"Smartphones + free editors let anyone practise",
				"Deep cultural voice"
			],
			[
				"Fundraising and crew logistics are tough",
				"Long irregular shoot days",
				"Slow break-in to feature work"
			],
			"Watch a classic movie scene twice—first for dialogue, second ONLY noticing when the camera cuts.",
			[
				"khanHum",
				"swayam",
				"courseraAudit"
			],
			"marketing"
		],
		[
			"voice-actor",
			"Voice Actor & Audiobook Narrator",
			"Voice Performance",
			"Give life to animated characters, audiobooks, regional dubbing and accessible learning tools.",
			"Warming up vocal cords, pacing scripts at sight, matching lip-sync cues and delivering clean home-booth takes.",
			[
				"Vocal clarity",
				"Pacing & breath control",
				"Character range",
				"Sight-reading",
				"Clean mic technique"
			],
			[
				"media",
				"music",
				"writing"
			],
			[
				"communication",
				"creativity",
				"public_speaking",
				"observation"
			],
			[
				"English",
				"Hindi / Regional language",
				"Music"
			],
			["Theatre / Voice acting workshops", "Home demo reel in clean acoustic corner + casting platforms"],
			["Regional educational e-learning & accessibility narration"],
			["Read one storybook paragraph twice—once like a brisk news anchor, once like a gentle storyteller"],
			false,
			2,
			"Remote / from home",
			"Class 10+",
			500,
			[
				"Low travel, flexible studio hours",
				"Strong regional-language dubbing demand",
				"Fun expressive work"
			],
			[
				"Crowded audition pools",
				"Quiet home booth & mic needed",
				"Vocal strain if overused"
			],
			"Record yourself reading 30 seconds of instructions and listen for rushed endings or breath pops.",
			[
				"swayam",
				"courseraAudit",
				"khanHum"
			],
			"marketing"
		],
		[
			"art-therapist",
			"Expressive Arts Therapist",
			"Art & Healing",
			"Use drawing, music or movement in safe guided settings to help people process trauma or stress.",
			"Preparing non-judgemental studio materials, observing client sessions and coordinating with clinical teams.",
			[
				"Art facilitation",
				"Psychological boundaries",
				"Active empathy",
				"Non-verbal observation",
				"Ethics"
			],
			[
				"art",
				"healthcare",
				"social"
			],
			[
				"communication",
				"creativity",
				"observation",
				"research"
			],
			[
				"Psychology",
				"Fine Arts",
				"English"
			],
			["B.A. Psychology or BFA → Master's / PG Diploma in Expressive Arts Therapy"],
			["School wellbeing & elder-care creative workshops"],
			["Why does an art therapist avoid grading or praising artwork as 'pretty' during a session?"],
			true,
			4,
			"With people (schools, clinics, events)",
			"Postgraduate / Licensing",
			500,
			[
				"Combines artistic care with psychology",
				"Helps people who struggle to put feelings into words",
				"Uplifting"
			],
			[
				"Requires formal psychology + arts credentials",
				"Modest institutional pay",
				"Emotional boundary skills vital"
			],
			"Pick 3 colours and free-draw shapes matching 'calm' vs 'overwhelmed'—notice how physical lines differ.",
			[
				"khanHum",
				"swayam",
				"courseraAudit"
			],
			"uiux"
		],
		[
			"choreographer",
			"Choreographer & Movement Director",
			"Dance & Stage Movement",
			"Design expressive dance, theatre or film movement sequences and coach performers safely.",
			"Breaking music counts, teaching phrasing to groups, preventing knee/ankle strain and staging camera angles.",
			[
				"Rhythm & spatial blocking",
				"Injury-safe warmups",
				"Teaching groups",
				"Musicality",
				"Cultural styles"
			],
			[
				"art",
				"music",
				"sports",
				"media"
			],
			[
				"creativity",
				"fitness",
				"leadership",
				"teamwork"
			],
			[
				"Music",
				"Physical Education",
				"Fine Arts"
			],
			["B.A./Diploma in Classical or Contemporary Dance", "Stage/film troupe assistant choreographer"],
			["Fitness-dance & school performing arts director"],
			["Map a 4x4 stage grid and plan how 5 performers move smoothly from a line into a circle in 8 counts"],
			false,
			3,
			"Lab or studio",
			"Class 10+",
			500,
			[
				"Energetic, expressive physical craft",
				"Live stage & film energy",
				"Teaching studios offer steady base"
			],
			[
				"Physical wear and injury risks",
				"Project-to-project income",
				"Late evening rehearsals"
			],
			"Listen to a 16-beat instrumental bar and invent 4 repeatable arm/step motifs that match the tempo.",
			[
				"khanHum",
				"swayam",
				"courseraAudit"
			],
			"marketing"
		],
		[
			"set-production-designer",
			"Production & Set Designer",
			"Spatial Storytelling",
			"Create the physical environments, props and colour worlds for films, theatre and museums.",
			"Researching historical details, drafting scale models, sourcing materials within budget and dressing sets.",
			[
				"Scale drafting",
				"Material craft",
				"Historical research",
				"Budgeting",
				"Crew coordination"
			],
			[
				"art",
				"design",
				"history",
				"media"
			],
			[
				"creativity",
				"organisation",
				"research",
				"teamwork"
			],
			[
				"Fine Arts",
				"History",
				"Physics"
			],
			["B.Des / Architecture / BFA → Film & Theatre Production Design (FTII/NSD)"],
			["Exhibition & retail experiential designer"],
			["List 5 small desk props that instantly tell an audience a character is a hurried detective in 1995"],
			false,
			4,
			"Lab or studio",
			"Undergraduate Degree",
			500,
			[
				"Turns research and craft into whole physical worlds",
				"Great fit for architecture/fine-arts crossovers",
				"Team craft"
			],
			[
				"Tight shoot budgets and overnight set builds",
				"Physically demanding load-ins",
				"Project-based cycles"
			],
			"Sketch a bedroom corner that visually shows someone loves botany without writing a single sign.",
			[
				"blender",
				"khanHum",
				"figma"
			],
			"uiux"
		],
		[
			"museum-curator",
			"Museum & Cultural Heritage Curator",
			"Heritage & Public History",
			"Research, preserve and exhibit art, fossils or historical artefacts so the public connects with heritage.",
			"Cataloguing collections, designing accessible gallery stories, checking humidity preservation and securing loans.",
			[
				"Archival research",
				"Conservation basics",
				"Accessible writing",
				"Exhibition planning",
				"Fundraising"
			],
			[
				"history",
				"art",
				"writing",
				"social"
			],
			[
				"research",
				"writing",
				"organisation",
				"communication"
			],
			[
				"History",
				"Fine Arts",
				"English",
				"Geography"
			],
			["B.A. History/Art History/Archaeology → M.A. Museology / Curatorial Studies", "Museum fellowships"],
			["Digital heritage archivist", "Cultural tourism & walking-tour designer"],
			["Pick any everyday object at home and write a 40-word museum placard explaining what it reveals about 2025 life"],
			false,
			4,
			"With people (schools, clinics, events)",
			"Postgraduate / Licensing",
			0,
			[
				"Preserves culture and public memory",
				"Blends deep history with exhibition design",
				"Calm scholarly rhythm"
			],
			[
				"Few salaried curatorial openings",
				"Master's/PhD often expected",
				"Slow grant/institutional approvals"
			],
			"Rewrite a dense textbook paragraph about an ancient tool so a 10-year-old immediately stays curious.",
			[
				"khanHum",
				"swayam",
				"ncert"
			],
			"marketing"
		]
	], {
		progression: [
			"Apprentice / Junior Creator",
			"Independent Artist or Associate",
			"Senior / Lead Creator",
			"Creative Director or Principal Curator"
		],
		freelance: "Very High — commissions, production contracts, audio/visual projects, and workshops.",
		entrepreneurship: "High — independent studios, production houses, publishing, and art schools.",
		entryLevel: "Open demo reels, student films, local zines, free software builds, and studio assistantships.",
		costNote: "Free tools (Blender, Krita, Audacity) and public humanities archives let you start at ₹0."
	}),
	...expandCareers("Design", [
		[
			"ui-ux-designer",
			"UI/UX Designer",
			"Digital Product Design",
			"Make websites and apps clear, usable, accessible and pleasant for real people.",
			"Interviewing users, sketching user flows, crafting screens in Figma and watching usability tests.",
			[
				"User research",
				"Wireframing",
				"Figma prototyping",
				"Visual hierarchy",
				"Accessibility & empathy"
			],
			[
				"design",
				"art",
				"technology",
				"psychology" in ["social"] ? "social" : "social"
			],
			[
				"creativity",
				"observation",
				"communication",
				"problem_solving"
			],
			[
				"Fine Arts",
				"Psychology",
				"Computer Science",
				"English"
			],
			["B.Des Interaction Design (IIT/NID) / Any degree + 3 strong UX case studies", "Design bootcamps optional"],
			["Frontend developer → UX Designer", "Graphic designer → Product UI transition"],
			["Redesign a confusing bus-booking or college timetable screen", "Usability test with 3 friends"],
			false,
			2,
			"Remote / from home",
			"Class 12",
			0,
			[
				"Unites visual design and human psychology",
				"Figma is free to learn",
				"Immediate everyday impact"
			],
			[
				"Requires defending decisions with user evidence",
				"Frequent stakeholder critiques",
				"Portfolio essential"
			],
			"Find 3 accessibility or clarity issues in a cluttered sign-up form with placeholder-only inputs.",
			[
				"figma",
				"laws",
				"fcc"
			],
			"uiux"
		],
		[
			"graphic-designer",
			"Graphic & Brand Identity Designer",
			"Visual Communication",
			"Communicate ideas unmistakably across posters, logos, packaging, books and social campaigns.",
			"Exploring typography pairings, building brand grids, exporting print-ready CMYK files and presenting concepts.",
			[
				"Typography",
				"Layout grids",
				"Colour theory",
				"Vector illustration",
				"Print/digital prepress"
			],
			[
				"design",
				"art",
				"media"
			],
			[
				"creativity",
				"observation",
				"communication"
			],
			[
				"Fine Arts",
				"English",
				"Computer Science"
			],
			["B.Des / BFA Applied Arts", "Portfolio built with Inkscape/Figma/Canva for local clubs & NGOs"],
			["Social-impact campaign designer", "Publication & book layout designer"],
			["Design a clear event poster using ONLY 2 font sizes and 2 colours so the date stands out first"],
			false,
			2,
			"Remote / from home",
			"Class 10+",
			0,
			[
				"Easy to see everywhere around you",
				"Immediate freelance utility for local businesses",
				"Fast visual growth"
			],
			[
				"Can become repetitive template work if underpriced",
				"Subjective taste clashes",
				"Revision loops"
			],
			"Take a messy community flyer and reorder its text into 3 clear visual levels: What, When, Where.",
			[
				"figma",
				"khanHum",
				"laws"
			],
			"uiux"
		],
		[
			"product-industrial-designer",
			"Industrial & Physical Product Designer",
			"Physical Objects & Ergonomics",
			"Design safe, ergonomic, repairable physical objects from water bottles to medical inhalers.",
			"Sketching form concepts, building foam/cardboard mockups, modelling CAD shells and checking manufacturing tolerances.",
			[
				"Ergonomics",
				"Rapid prototyping",
				"CAD (Blender/Fusion)",
				"Material selection",
				"User observation"
			],
			[
				"design",
				"science",
				"art",
				"environment"
			],
			[
				"creativity",
				"problem_solving",
				"observation",
				"technical"
			],
			[
				"Physics",
				"Fine Arts",
				"Mathematics"
			],
			["B.Des Industrial Design (NID / IIT IDC / MITID)", "Mechanical Engg → Product Design M.Des"],
			["Assistive-device & sustainable packaging designer"],
			["Build a sturdy phone stand from one sheet of scrap cardboard using only folds and slots—no glue"],
			false,
			4,
			"Lab or studio",
			"Undergraduate Degree",
			500,
			[
				"Shapes real physical tools people hold daily",
				"Great blend of art and mechanics",
				"Tangible prototypes"
			],
			[
				"Tooling & factory iteration takes months",
				"Fewer pure industrial studios than digital UX",
				"Prototyping costs"
			],
			"Hold a pair of scissors or a peelers left-handed and note 3 small ergonomic changes that help.",
			[
				"blender",
				"nptel",
				"mitocw"
			],
			"uiux"
		],
		[
			"interior-designer",
			"Interior & Spatial Wellness Designer",
			"Interior Spaces",
			"Transform indoor homes, schools and clinics into functional, sunlit, safe and calming spaces.",
			"Measuring floor plans, picking durable finishes, planning lighting layers and supervising site carpentry.",
			[
				"Space planning",
				"Lighting & acoustics",
				"Material durability",
				"Scale CAD drawing",
				"Vendor budgets"
			],
			[
				"design",
				"art",
				"business"
			],
			[
				"creativity",
				"organisation",
				"observation",
				"communication"
			],
			[
				"Fine Arts",
				"Mathematics",
				"Physics"
			],
			["B.Des Interior Design / Diploma in Interior Architecture", "Studio apprenticeship"],
			["Accessible & elder-friendly home modification specialist"],
			["Measure your study corner and sketch two furniture layouts that avoid window screen glare"],
			false,
			3,
			"Outdoors / on the move",
			"Class 12",
			500,
			[
				"See rooms physically transformed",
				"Freelance & studio options in every city",
				"Combines beauty with ergonomics"
			],
			[
				"On-site contractor delays and dust",
				"Budget overruns create client stress",
				"Weekend site visits"
			],
			"Notice 3 ways a hospital or school corridor can feel calmer without spending much money.",
			[
				"blender",
				"figma",
				"nptel"
			],
			"uiux"
		],
		[
			"fashion-designer",
			"Fashion & Sustainable Textile Designer",
			"Apparel & Textiles",
			"Design wearable garments balancing fit, movement, cultural textile craft and lower fabric waste.",
			"Draping patterns, sourcing handloom/recycled weaves, fitting sample garments and managing seasonal collections.",
			[
				"Pattern making",
				"Textile knowledge",
				"Draping & stitching",
				"Trend research",
				"Costing"
			],
			[
				"design",
				"art",
				"environment",
				"business"
			],
			[
				"creativity",
				"observation",
				"organisation",
				"technical"
			],
			[
				"Fine Arts",
				"History",
				"Chemistry",
				"Business Studies"
			],
			["NIFT / NID B.Des Fashion or Textile Design", "Apprenticeship with craft clusters or apparel houses"],
			["Zero-waste pattern specialist", "Technical & adaptive sportswear designer"],
			["Examine inside seams of a well-made shirt vs a cheap tee to spot why one holds shape longer"],
			false,
			4,
			"Lab or studio",
			"Class 12",
			1e3,
			[
				"Connects contemporary wear with rich textile heritage",
				"Entrepreneurship potential",
				"Expressive craft"
			],
			[
				"Fast-fashion waste pressure",
				"Competitive brand launch economics",
				"Tight seasonal production cycles"
			],
			"Sketch a versatile jacket or kurta with 2 clever pocket/adjuster details for commuters.",
			[
				"khanHum",
				"courseraAudit",
				"figma"
			],
			"uiux"
		],
		[
			"game-ui-artist",
			"Game UI & Environment Concept Artist",
			"Interactive World Design",
			"Design clear heads-up displays, menus and atmospheric worlds that guide players effortlessly.",
			"Painting environment mood boards, simplifying inventory screens and testing readability at TV/phone distances.",
			[
				"Visual storytelling",
				"HUD ergonomics",
				"Colour mood",
				"Figma / Krita / Blender",
				"Playtesting"
			],
			[
				"design",
				"gaming",
				"art"
			],
			[
				"creativity",
				"observation",
				"problem_solving",
				"teamwork"
			],
			["Fine Arts", "Computer Science"],
			["B.Des Game Art / BFA + indie game-jam reels", "Portfolio in Figma + Blender/Godot"],
			["Educational gamification UI designer"],
			["Look at a complex RPG inventory screen and cross out 3 things that confuse brand-new players"],
			false,
			3,
			"Lab or studio",
			"Class 12",
			0,
			[
				"Dream bridge for visual artists who love games",
				"Game-jam teams always need UI artists",
				"Free tools exist"
			],
			[
				"Studio project cancellations can happen",
				"Long polish phases",
				"Competitive junior roles"
			],
			"Design a clean 3-icon health/stamina/objective bar readable on a tiny 5-inch phone screen.",
			[
				"figma",
				"godot",
				"blender"
			],
			"uiux"
		],
		[
			"motion-graphics-designer",
			"Motion Graphics & Explainer Designer",
			"Kinetic Visuals",
			"Animate charts, typography and icons to explain tricky concepts clearly in seconds.",
			"Storyboarding beats to voiceover scripts, animating smooth curves and exporting crisp web/video loops.",
			[
				"Timing & easing",
				"Typography in motion",
				"Storyboarding",
				"Sound sync",
				"Vector graphics"
			],
			[
				"design",
				"media",
				"art"
			],
			[
				"creativity",
				"observation",
				"communication",
				"technical"
			],
			[
				"Fine Arts",
				"English",
				"Physics"
			],
			["B.Des / Visual Comm / Self-taught reel of 4 short 15-second explainers"],
			["Science & education video explainer creator"],
			["Storyboard in 4 frames how you'd animate 'compounding interest' so a middle-schooler gets it instantly"],
			false,
			2,
			"Remote / from home",
			"Class 10+",
			0,
			[
				"High demand across ed-tech, news and brands",
				"Strong freelance remote market",
				"Clear showreel hiring"
			],
			[
				"Tight revision deadlines",
				"Software subscriptions at advanced pro tiers",
				"Eye fatigue"
			],
			"Spot why smooth ease-in/ease-out motion feels natural while rigid linear movement feels robotic.",
			[
				"blender",
				"figma",
				"khanHum"
			],
			"uiux"
		],
		[
			"architecture-designer",
			"Sustainable Architect",
			"Built Environment",
			"Design climate-smart homes, campuses and public buildings that use light, airflow and local materials.",
			"Drafting structural plans, modelling passive cooling sun paths, checking building codes and walking construction sites.",
			[
				"Architectural drafting",
				"Climate-passive design",
				"Structural intuition",
				"CAD/BIM",
				"Client listening"
			],
			[
				"design",
				"environment",
				"art",
				"science"
			],
			[
				"creativity",
				"mathematics",
				"organisation",
				"problem_solving"
			],
			[
				"Mathematics",
				"Physics",
				"Fine Arts"
			],
			["NATA / JEE Paper 2 → B.Arch (5 yrs) + Council of Architecture registration"],
			["Urban design & green-building consultant (IGBC/LEED)"],
			["Track where afternoon sun hits your home walls and see how shading overhangs could cool rooms"],
			false,
			5,
			"Lab or studio",
			"Undergraduate Degree",
			1e3,
			[
				"Lasting civic legacy",
				"Blends art, physics, ecology and community life",
				"Registered independent practice"
			],
			[
				"5-year rigorous degree + lower initial studio pay",
				"Slow construction timelines",
				"Bureaucratic approvals"
			],
			"Draw a tiny 10x10ft reading pavilion placed to catch morning breeze while blocking harsh west sun.",
			[
				"nptel",
				"blender",
				"unccl"
			],
			"uiux"
		],
		[
			"xr-spatial-designer",
			"XR / AR / VR Spatial Designer",
			"Spatial Computing",
			"Design comfortable 3D training sims, museum AR overlays and virtual science labs.",
			"Prototyping 3D interactions in headsets/phones, preventing motion sickness and keeping text legible in 3D space.",
			[
				"3D spatial UX",
				"Blender / Unity / Godot",
				"Comfort & ergonomics",
				"Prototyping",
				"User testing"
			],
			[
				"design",
				"technology",
				"gaming",
				"science"
			],
			[
				"creativity",
				"technical",
				"observation",
				"problem_solving"
			],
			[
				"Computer Science",
				"Fine Arts",
				"Physics"
			],
			["B.Des / B.Tech CSE + XR prototypes", "Interactive media masters"],
			["Medical & aviation VR training simulation designer"],
			["Why shouldn't a VR menu stick right onto a user's nose when they turn their head?"],
			true,
			3,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Emerging frontier in education, surgery & heritage",
				"Combines 3D art with UX",
				"Creative experimentation"
			],
			[
				"Headset hardware access helps",
				"Smaller job market today than mobile/web UX",
				"Rapidly shifting SDKs"
			],
			"Sketch how an AR museum phone view could annotate an old monument without blocking the real view.",
			[
				"blender",
				"godot",
				"figma"
			],
			"uiux"
		],
		[
			"design-systems-architect",
			"Design Systems & Accessibility Specialist",
			"Scalable UI Craft",
			"Build shared, accessible UI components and contrast/keyboard rules so entire product teams ship consistently.",
			"Auditing colour contrast, naming reusable tokens, documenting component states and pairing with frontend devs.",
			[
				"Design tokens",
				"WCAG accessibility",
				"Figma components",
				"HTML/CSS literacy",
				"Documentation"
			],
			["design", "technology"],
			[
				"organisation",
				"technical",
				"observation",
				"communication"
			],
			[
				"Computer Science",
				"Fine Arts",
				"English"
			],
			["UI/UX Designer or Frontend Dev → Design Systems specialisation"],
			["Digital accessibility auditor (WCAG specialist)"],
			["Test a bright pastel text on white background and see why low contrast excludes users in sunlight"],
			true,
			3,
			"Remote / from home",
			"Undergraduate Degree",
			0,
			[
				"High leverage across large engineering teams",
				"Makes tech usable for screen-reader & low-vision users",
				"Orderly"
			],
			[
				"Requires diplomacy getting teams to adopt standards",
				"Less flashy than campaign art",
				"Detail-intensive"
			],
			"List all states a simple 'Save' button needs: default, hover, focus ring, loading, saved, error.",
			[
				"figma",
				"laws",
				"mdn"
			],
			"uiux"
		],
		[
			"packaging-designer",
			"Sustainable Packaging Designer",
			"Structural & Eco-Packaging",
			"Invent protective, easy-to-open packaging that cuts plastic, shipping weight and waste.",
			"Folding cardboard dielines, testing drop durability, printing clear recycling labels and cutting ink layers.",
			[
				"Structural dielines",
				"Material lifecycle",
				"Typography",
				"Prototyping",
				"Cost awareness"
			],
			[
				"design",
				"environment",
				"business"
			],
			[
				"creativity",
				"problem_solving",
				"observation",
				"technical"
			],
			[
				"Fine Arts",
				"Physics",
				"Environmental Studies"
			],
			["B.Des Packaging / Graphic / Industrial Design", "IIP (Indian Institute of Packaging) programs"],
			["E-commerce zero-plastic mailers consultant"],
			["Unfold an empty toothpaste box flat and study how a single cut sheet locks without excess glue"],
			false,
			3,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Tangible everyday sustainability impact",
				"Strong FMCG, food and pharma demand",
				"Hands-on model making"
			],
			[
				"Strict factory unit-cost ceilings (paise matter)",
				"Food-safety barrier regulations",
				"Physical test waste"
			],
			"Design a fragile clay-cup gift box using corrugated folds instead of bubble wrap.",
			[
				"figma",
				"unccl",
				"blender"
			],
			"uiux"
		],
		[
			"typography-brand-designer",
			"Type & Editorial Publication Designer",
			"Typography & Editorial",
			"Design legible, distinctive typefaces, magazines, textbooks and multilingual scripts.",
			"Adjusting letter spacing across Devanagari/Latin glyphs, setting book grids and balancing dense text legibility.",
			[
				"Type anatomy",
				"Multilingual script craft",
				"Grid systems",
				"Micro-detail",
				"Editorial pacing"
			],
			[
				"design",
				"art",
				"writing",
				"history"
			],
			[
				"observation",
				"creativity",
				"organisation",
				"research"
			],
			[
				"Fine Arts",
				"English",
				"Hindi / Regional language"
			],
			["B.Des Communication Design (IDC IITB type track / NID)", "Font-design studio apprenticeships"],
			["Educational textbook & accessibility typography designer"],
			["Compare why sans-serif screen fonts work well on small phones while book serifs guide long reading"],
			false,
			4,
			"Remote / from home",
			"Undergraduate Degree",
			0,
			[
				"Vital cultural work for Indian scripts online",
				"Calm, meditative craft",
				"Timeless utility"
			],
			[
				"Very specialised niche",
				"Months of patient bezier-curve refinement",
				"Few large studios"
			],
			"Notice how badly spaced letters ('keming') turn clear words hard to skim from across a room.",
			[
				"figma",
				"khanHum",
				"swayam"
			],
			"uiux"
		],
		[
			"service-designer",
			"Public & Service Experience Designer",
			"Systems & Civic UX",
			"Redesign messy real-world services—like hospital admissions, rail ticketing or school onboarding—end to end.",
			"Shadowing frontline staff and citizens, drawing service blueprints and testing faster queues or clearer forms.",
			[
				"Journey mapping",
				"Field observation",
				"Workshop facilitation",
				"Systems thinking",
				"Prototyping"
			],
			[
				"design",
				"social",
				"government",
				"business"
			],
			[
				"observation",
				"communication",
				"problem_solving",
				"leadership"
			],
			[
				"Psychology",
				"Political Science",
				"English",
				"Fine Arts"
			],
			["B.Des / M.Des Service & Strategic Design", "UX Researcher → Service Designer transition"],
			["Civic innovation lab fellow", "Healthcare patient-experience designer"],
			["Map every single step—digital AND physical—of renewing a student bus pass and cut two unnecessary waits"],
			true,
			3,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			0,
			[
				"Improves real civic and healthcare experiences",
				"Combines design research with policy",
				"Meaningful scale"
			],
			[
				"Harder to show visually than app screenshots",
				"Stakeholder silos resist change",
				"Long rollouts"
			],
			"Stand at a busy counter for 5 minutes and note the top question people keep asking staff because signs fail.",
			[
				"figma",
				"laws",
				"courseraAudit"
			],
			"uiux"
		]
	], {
		progression: [
			"Junior Designer",
			"Product / Senior Designer",
			"Lead / Staff Designer",
			"Design Director or Studio Founder"
		],
		freelance: "Very High — UI/UX, graphic, motion, and interior projects thrive independently with strong portfolios.",
		entrepreneurship: "High — boutique design studios, sustainable packaging labels, and digital template products.",
		entryLevel: "Redesign case studies, local NGO/club design projects, Figma community files, and studio internships.",
		costNote: "Figma, Blender, Krita, and Laws of UX are free; accredited design degrees (NID/NIFT) have set exam fees."
	})
];
//#endregion
//#region src/lib/careers-data-part2.ts
var CAREERS_PART_2 = [
	...expandCareers("Media & Entertainment", [
		[
			"video-editor",
			"Video Editor & Post-Production Specialist",
			"Film & Digital Video",
			"Shape pacing, narrative flow, colour and audio sync to turn raw footage into engaging stories.",
			"Organising shoot clips, cutting rough assemblies, balancing colour and exporting clean multi-format masters.",
			[
				"Story pacing",
				"DaVinci Resolve / Premiere",
				"Audio levelling",
				"Colour grading basics",
				"Media organisation"
			],
			[
				"media",
				"art",
				"gaming",
				"music"
			],
			[
				"creativity",
				"observation",
				"technical",
				"organisation"
			],
			[
				"English",
				"Fine Arts",
				"Computer Science"
			],
			["Mass Comm / Film Editing Diploma", "Portfolio built with free DaVinci Resolve"],
			["YouTube creator post-production partner", "Documentary assembly editor"],
			["Cut a 90-second clip of any public lecture down to 30 crisp seconds without losing the main point"],
			false,
			2,
			"Remote / from home",
			"Class 10+",
			0,
			[
				"Free pro editing software (DaVinci Resolve)",
				"Strong remote freelance demand",
				"Clear visible craft"
			],
			[
				"Long hours scrubbing timelines",
				"Slow renders on low-RAM laptops",
				"Last-minute client cuts"
			],
			"Watch a 30-second ad without sound, then WITH sound, to see how audio rhythm drives edit cuts.",
			[
				"courseraAudit",
				"skillshop",
				"khanHum"
			],
			"uiux"
		],
		[
			"journalist",
			"Investigative & Multimedia Journalist",
			"News & Public Interest",
			"Verify facts, interview diverse voices and report accurate stories that keep communities informed.",
			"Checking primary documents, interviewing witnesses fairly, structuring clear ledes and fact-checking every claim.",
			[
				"Source verification",
				"Interviewing",
				"Clear factual writing",
				"Media ethics",
				"Data journalism"
			],
			[
				"media",
				"writing",
				"history",
				"law"
			],
			[
				"writing",
				"research",
				"critical_thinking",
				"communication"
			],
			[
				"English",
				"History",
				"Political Science",
				"Economics"
			],
			["B.A. Journalism & Mass Comm / Any degree + student reporting", "Data journalism fellowships"],
			["Newsletter writer", "Civic accountability & science reporter"],
			["Interview two classmates on one campus rule change and write a balanced 150-word report"],
			false,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Vital civic service",
				"Builds sharp questioning and clarity",
				"Access to varied worlds"
			],
			[
				"Tight newsroom deadlines",
				"Industry revenue shifts",
				"Online harassment on tough stories"
			],
			"Spot 3 unverified claims in a viral forwarded message and list how to verify each from primary sources.",
			[
				"khanHum",
				"swayam",
				"ncert"
			],
			"marketing"
		],
		[
			"podcast-producer",
			"Podcast & Audio Show Producer",
			"Audio Media",
			"Develop audio series from guest research and scripting to clean recording, editing and distribution.",
			"Booking guests, writing interview outlines, cleaning room echo and pacing narrative episodes.",
			[
				"Show structuring",
				"Guest prep",
				"Audio cleanup",
				"Narrative pacing",
				"Audience growth"
			],
			[
				"media",
				"music",
				"writing",
				"social"
			],
			[
				"communication",
				"organisation",
				"creativity",
				"writing"
			],
			[
				"English",
				"Music",
				"History"
			],
			["Mass Comm / Audio Production", "Independent show portfolio launched with free tools"],
			["Branded & educational audio documentary producer"],
			["Outline a 10-minute episode interviewing a local craftsperson—hook, 4 questions, takeaway"],
			false,
			2,
			"Remote / from home",
			"Class 12",
			0,
			[
				"Intimate long-form storytelling",
				"Low startup gear cost",
				"Strong niche community building"
			],
			[
				"Audience discovery takes months of consistency",
				"Audio editing time adds up",
				"Sponsorship requires scale"
			],
			"Record a 60-second voice intro in a quiet closet vs a bare tiled room—hear how acoustics change clarity.",
			[
				"skillshop",
				"swayam",
				"courseraAudit"
			],
			"marketing"
		],
		[
			"content-strategist",
			"Content & Editorial Strategist",
			"Digital Publishing",
			"Plan helpful articles, videos and guides tailored to what readers or learners actually search for.",
			"Auditing content gaps, mapping reader journeys, editing writer drafts and reviewing engagement metrics.",
			[
				"Editorial planning",
				"Audience empathy",
				"SEO basics",
				"Substantive editing",
				"Analytics"
			],
			[
				"media",
				"writing",
				"business"
			],
			[
				"writing",
				"organisation",
				"analytical",
				"communication"
			],
			[
				"English",
				"Business Studies",
				"Psychology"
			],
			["B.A. English/Journalism / BBA", "Writer → Editor / Content Strategist"],
			["Educational curriculum content lead"],
			["List 5 real questions a first-time college applicant asks that most university websites fail to answer"],
			false,
			2,
			"Remote / from home",
			"Undergraduate Degree",
			0,
			[
				"Turns clear explanation into business value",
				"Remote-friendly",
				"Blends writing with data"
			],
			[
				"Repetitive commercial topics if unfocused",
				"Balancing quality with traffic pressure",
				"Algorithm swings"
			],
			"Take a 400-word dense FAQ page and rewrite its headings as plain questions users actually ask.",
			[
				"skillshop",
				"courseraAudit",
				"khanHum"
			],
			"marketing"
		],
		[
			"social-media-manager",
			"Social Media & Community Manager",
			"Digital Communities",
			"Grow respectful, active online communities around clubs, creators, sports teams or causes.",
			"Scheduling short-form reels/posts, replying thoughtfully to comments, tracking shares and spotting trends early.",
			[
				"Platform fluency",
				"Short-form hooks",
				"Community moderation",
				"Analytics",
				"Crisis calm"
			],
			[
				"media",
				"social",
				"business",
				"sports"
			],
			[
				"communication",
				"creativity",
				"observation",
				"writing"
			],
			[
				"English",
				"Psychology",
				"Business Studies"
			],
			["Mass Comm / BBA / Portfolio running a campus club or NGO handle"],
			["Creator partnerships & community events lead"],
			["Plan a 5-day content calendar for a school science club without relying on clickbait"],
			false,
			1,
			"Remote / from home",
			"Class 10+",
			0,
			[
				"Immediate real-world testing on a phone",
				"Creative + analytical",
				"Great entry into media & sports orgs"
			],
			[
				"Always-on notification pressure",
				"Handling rude comment sections calmly",
				"Algorithm volatility"
			],
			"Draft two polite public replies to a frustrated customer complaining in a comment thread.",
			[
				"skillshop",
				"figma",
				"courseraAudit"
			],
			"marketing"
		],
		[
			"pr-communications-specialist",
			"Public Relations & Crisis Communications Specialist",
			"Reputation & Media Relations",
			"Help organisations speak honestly with journalists, communities and employees—especially in tough moments.",
			"Drafting press notes, prepping spokespeople for Q&A, monitoring coverage and managing crisis updates.",
			[
				"Press writing",
				"Media relations",
				"Crisis calm",
				"Stakeholder empathy",
				"Fact-checking"
			],
			[
				"media",
				"writing",
				"business",
				"law"
			],
			[
				"communication",
				"writing",
				"critical_thinking",
				"public_speaking"
			],
			[
				"English",
				"Political Science",
				"Psychology"
			],
			["B.A. Mass Comm / PR / English", "Agency PR trainee → Corporate Communications"],
			["NGO & university communications lead"],
			["Write a 4-sentence transparent apology notice when a campus app goes down for 2 hours"],
			false,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"High strategic trust during high-stakes events",
				"Sharp persuasive writing",
				"Diverse sectors"
			],
			[
				"Ethical tension if asked to spin mistakes",
				"Urgent media response hours",
				"Constant news monitoring"
			],
			"Compare a vague corporate non-apology vs an honest accountability statement—spot the difference.",
			[
				"khanHum",
				"swayam",
				"courseraAudit"
			],
			"marketing"
		],
		[
			"film-critic-culture-writer",
			"Cultural Critic & Media Essayist",
			"Arts & Criticism",
			"Analyse cinema, music, games and visual culture with historical context so audiences notice deeper craft.",
			"Screening films/games closely, researching director influences and writing insightful reviews or video essays.",
			[
				"Close textual analysis",
				"Cultural history",
				"Distinctive prose",
				"Research",
				"Fair critique"
			],
			[
				"media",
				"writing",
				"art",
				"history"
			],
			[
				"writing",
				"critical_thinking",
				"observation",
				"research"
			],
			[
				"English",
				"History",
				"Fine Arts"
			],
			["B.A. Literature / Film Studies", "Independent Substack/YouTube essay portfolio"],
			["Festival programmer & cultural curator"],
			["Review a film you disliked in 150 words WITHOUT insults—focus on pacing, framing or script choices"],
			false,
			3,
			"Remote / from home",
			"Class 12",
			0,
			[
				"Deep engagement with art and history",
				"Builds unique analytical voice",
				"Flexible independent publishing"
			],
			[
				"Few full-time staff critic roles today",
				"Requires self-monetisation or teaching alongside",
				"Online backlash"
			],
			"Explain why a great scene worked by breaking down sound, framing and silence instead of just the plot.",
			[
				"khanHum",
				"swayam",
				"courseraAudit"
			],
			"marketing"
		],
		[
			"broadcast-producer",
			"Live Broadcast & Show Producer",
			"Television & Streaming",
			"Coordinate live studio shows, news bulletins or streaming broadcasts down to the second.",
			"Building minute-by-minute rundowns, cueing camera switches, booking guests and adapting live to breaking updates.",
			[
				"Rundown timing",
				"Control-room comms",
				"Live problem solving",
				"Editorial judgement",
				"Team coordination"
			],
			[
				"media",
				"technology",
				"sports"
			],
			[
				"leadership",
				"organisation",
				"communication",
				"problem_solving"
			],
			[
				"English",
				"Political Science",
				"Computer Science"
			],
			["Mass Comm / Broadcast Journalism", "Control-room assistant producer"],
			["Live educational webinar & town-hall producer"],
			["Write a 15-minute live show rundown with 3 segments and a 60-second backup plan if a guest drops out"],
			false,
			3,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Thrilling live teamwork energy",
				"Immediate audience reach",
				"Sharp real-time decision skills"
			],
			[
				"High pressure when live mics or feeds fail",
				"Irregular shift hours",
				"Fast studio burn-out without boundaries"
			],
			"Practise counting down 10-second live segment transitions cleanly while reading a cue card.",
			[
				"swayam",
				"courseraAudit",
				"skillshop"
			],
			"marketing"
		],
		[
			"live-event-av-technician",
			"Live Event Audio-Visual & Lighting Engineer",
			"Live Production Tech",
			"Set up soundboards, microphones, stage lighting and livestream feeds for concerts, sports and conferences.",
			"Testing cable runs, ringing out mic feedback, programming lighting cues and monitoring livestream stability.",
			[
				"Signal flow",
				"Audio mixing",
				"DMX lighting basics",
				"Cable troubleshooting",
				"Team stamina"
			],
			[
				"media",
				"music",
				"technology"
			],
			[
				"technical",
				"problem_solving",
				"teamwork",
				"observation"
			],
			[
				"Physics",
				"Music",
				"Computer Science"
			],
			["Audio/AV Engineering Diploma", "Campus auditorium crew → concert/conference AV tech"],
			["Hybrid conference & livestream production specialist"],
			["Trace a microphone signal path from stage mic → mixer → amplifier → speaker so you spot dead links fast"],
			false,
			2,
			"Outdoors / on the move",
			"Class 12",
			500,
			[
				"Hands-on live atmosphere without needing a 4-year theory degree",
				"Immediate physical troubleshooting",
				"Variety"
			],
			[
				"Heavy gear load-ins and late pack-downs",
				"Weekend events",
				"Audio feedback stress"
			],
			"Learn why pointing a handheld mic straight at a floor monitor speaker causes screeching feedback.",
			[
				"khanSci",
				"nptel",
				"courseraAudit"
			],
			"software"
		],
		[
			"script-supervisor",
			"Continuity & Script Supervisor",
			"Film Set Operations",
			"Track every camera angle, prop position, costume detail and dialogue change so scenes cut seamlessly.",
			"Logging slate takes next to the director, checking eyelines and keeping detailed edit-room continuity notes.",
			[
				"Eagle-eyed observation",
				"Detailed shot logging",
				"Calm set presence",
				"Script breakdown",
				"Diplomacy"
			],
			[
				"media",
				"art",
				"writing"
			],
			[
				"observation",
				"organisation",
				"communication",
				"teamwork"
			],
			["English", "Fine Arts"],
			["Film Production Diploma / On-set PA → Script Supervisor mentorship"],
			["Post-production coordinator"],
			["Watch 2 consecutive shots in any movie scene and check if props, hair or cup levels shift slightly"],
			false,
			3,
			"Lab or studio",
			"Class 12",
			0,
			[
				"Essential director's right-hand seat on set",
				"Accessible without costly camera gear",
				"Trains razor observation"
			],
			[
				"12-hour film shoot days",
				"Constant focus while others chat between takes",
				"Project-to-project bookings"
			],
			"Design a simple 1-page log sheet to track scene number, lens, take audio status and actor action.",
			[
				"khanHum",
				"swayam",
				"courseraAudit"
			],
			"uiux"
		],
		[
			"music-streaming-curator",
			"Music & Audio Platform Curator",
			"Music Discovery & Metadata",
			"Build regional playlists, verify metadata credits and help emerging artists reach listeners fairly.",
			"Auditioning independent submissions, tagging mood/tempo accurately and analysing listener skip rates.",
			[
				"Broad musical ear",
				"Metadata tagging",
				"Cultural literacy",
				"Data analysis",
				"Fair artist discovery"
			],
			[
				"music",
				"media",
				"technology",
				"ai"
			],
			[
				"observation",
				"analytical",
				"creativity",
				"communication"
			],
			[
				"Music",
				"English",
				"Computer Science"
			],
			["Music / Media / Analytics UG", "Music label A&R or streaming editorial internships"],
			["Independent music blog & artist-discovery newsletter"],
			["Build a 6-song regional-language focus playlist and write 1 sentence explaining the energy transition"],
			true,
			2,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Turns deep musical taste + data into discovery power",
				"Supports indie regional artists",
				"Modern digital role"
			],
			[
				"Limited editorial seats at major platforms",
				"Balancing human taste vs algorithm metrics",
				"Pitch flood"
			],
			"Tag 5 songs accurately by tempo, language, mood and acoustic vs electronic instrumentation.",
			[
				"skillshop",
				"kaggle",
				"courseraAudit"
			],
			"data"
		],
		[
			"documentary-researcher",
			"Documentary & Archival Researcher",
			"Non-Fiction Storytelling",
			"Dig into archives, verify historical footage rights and pre-interview real subjects for documentaries.",
			"Searching public archives, clearing copyright permissions, fact-checking timelines and briefing directors.",
			[
				"Archival digging",
				"Pre-interviewing",
				"Rights clearance",
				"Fact verification",
				"Structured notes"
			],
			[
				"media",
				"history",
				"writing",
				"law"
			],
			[
				"research",
				"writing",
				"observation",
				"organisation"
			],
			[
				"History",
				"English",
				"Political Science"
			],
			["B.A. History/Journalism", "Non-fiction production assistant → Archive Producer"],
			["Podcast & historical museum research producer"],
			["Find 3 public-domain photos or government archives about your city's railway history and verify dates"],
			false,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Deep investigative satisfaction",
				"Shapes educational & historical films",
				"Valued on serious productions"
			],
			[
				"Grant-dependent timelines",
				"Slow archive permissions",
				"Contract-based work"
			],
			"Prepare 6 empathetic pre-interview questions for an elder sharing memories of a historical flood.",
			[
				"khanHum",
				"swayam",
				"ncert"
			],
			"marketing"
		],
		[
			"sports-broadcast-director",
			"Sports Broadcast & Graphics Producer",
			"Live Sports Media",
			"Blend live match camera angles, instant replays and real-time player stat graphics for viewers.",
			"Coordinating slow-motion replay operators, queuing live scorebug stats and storytelling during match breaks.",
			[
				"Sports rules mastery",
				"Live replay timing",
				"Data graphics",
				"Crew leadership",
				"Fast editorial instinct"
			],
			[
				"sports",
				"football",
				"cricket",
				"media",
				"technology"
			],
			[
				"leadership",
				"observation",
				"teamwork",
				"communication"
			],
			[
				"Physical Education",
				"English",
				"Computer Science"
			],
			["Mass Comm / Sports Media + university live-stream directing", "Broadcast operations trainee"],
			["College sports & esports broadcast producer"],
			["Watch a live over or 5 minutes of football and note when replays add insight vs distract from live play"],
			true,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Electrifying live sports atmosphere",
				"Merges sports tactics with media craft",
				"Growing digital leagues"
			],
			[
				"Weekend & evening match schedule",
				"Zero margin for replay errors on air",
				"Travel to stadiums"
			],
			"Design a clean 3-stat lower-third graphic that fits on screen during a match without blocking the ball.",
			[
				"fifa",
				"skillshop",
				"figma"
			],
			"data"
		]
	], {
		progression: [
			"Production Assistant / Junior Creator",
			"Producer / Editor / Specialist",
			"Senior Producer",
			"Executive Producer or Editorial Director"
		],
		freelance: "Very High — video editing, podcasting, journalism, social media, and live AV thrive on project work.",
		entrepreneurship: "High — boutique media studios, creator collectives, newsletters, and production agencies.",
		entryLevel: "Campus radio/magazine, independent reels/podcasts, local event AV crews, and media internships.",
		costNote: "DaVinci Resolve, Audacity, and Skillshop are free; microphones/cameras can be upgraded gradually."
	}),
	...expandCareers("Education", [
		[
			"school-teacher",
			"K-12 Subject Teacher",
			"School Education",
			"Inspire young learners daily, explain core concepts clearly and nurture curious classrooms.",
			"Planning interactive lessons, adapting explanations for mixed paces, grading thoughtfully and supporting students.",
			[
				"Concept simplification",
				"Classroom empathy",
				"Lesson planning",
				"Formative feedback",
				"Patience"
			],
			[
				"teaching" in ["social"] ? "social" : "social",
				"science",
				"history",
				"mathematics"
			],
			[
				"communication",
				"public_speaking",
				"leadership",
				"organisation"
			],
			[
				"Mathematics",
				"English",
				"Science" in ["Physics"] ? "Physics" : "Biology",
				"History"
			],
			["BA/B.Sc./B.Com + B.Ed (or 4-yr Integrated ITEP) + CTET / State TET"],
			["Alternative & experiential learning schools"],
			["Explain fractions or photosynthesis to a 10-year-old in 3 minutes using everyday kitchen objects"],
			false,
			3,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			500,
			[
				"Shaping generations directly",
				"Deep community respect",
				"School vacation calendar alignment"
			],
			[
				"Large class sizes & admin paperwork",
				"Modest starting pay in many private schools",
				"Emotional energy"
			],
			"Write a 2-minute hands-on classroom hook so students discover a rule instead of memorising it.",
			[
				"ncert",
				"khan",
				"swayam"
			],
			"uiux"
		],
		[
			"university-lecturer",
			"College Lecturer & Academic Researcher",
			"Higher Education",
			"Teach specialised university courses, mentor thesis students and publish original scholarship.",
			"Preparing seminar lectures, supervising student projects, conducting lab/field research and peer-reviewing papers.",
			[
				"Deep subject mastery",
				"Research methods",
				"Seminar facilitation",
				"Academic writing",
				"Mentorship"
			],
			[
				"science",
				"history",
				"writing",
				"mathematics"
			],
			[
				"research",
				"public_speaking",
				"writing",
				"critical_thinking"
			],
			[
				"Mathematics",
				"Physics",
				"Economics",
				"English"
			],
			["Bachelor's → Master's → UGC-NET / GATE / PhD"],
			["Adjunct industry lecturer teaching practical studios"],
			["Turn a complex academic topic into a 10-minute seminar outline with 2 open discussion questions"],
			false,
			5,
			"With people (schools, clinics, events)",
			"Postgraduate / Licensing",
			0,
			[
				"Intellectual freedom to pursue deep questions",
				"Mentoring young adults",
				"Academic community"
			],
			[
				"Long PhD road before permanent tenure-track roles",
				"Publish-or-perish pressures",
				"Competitive openings"
			],
			"Read an abstract of a paper and summarise its core question, method and limit in 3 plain sentences.",
			[
				"mitocw",
				"nptel",
				"swayam"
			],
			"data"
		],
		[
			"instructional-designer",
			"Instructional & Learning Experience Designer",
			"Curriculum & EdTech",
			"Design clear online courses, interactive simulations and practical workshops adults or students finish joyfully.",
			"Breaking complex skills into bite-sized modules, writing scenario quizzes and testing learner drop-off points.",
			[
				"Backward curriculum design",
				"Scenario writing",
				"Accessibility",
				"LMS tools",
				"Visual clarity"
			],
			[
				"design",
				"writing",
				"technology",
				"social"
			],
			[
				"creativity",
				"organisation",
				"writing",
				"problem_solving"
			],
			[
				"English",
				"Psychology",
				"Computer Science"
			],
			["Any UG + Education/UX/Content portfolio", "M.A. Education / EdTech fellowships"],
			["Corporate technical training designer", "MOOC & university online course architect"],
			["Take a confusing 10-page manual and turn step 1 into a 3-screen interactive mini-quiz"],
			true,
			2,
			"Remote / from home",
			"Undergraduate Degree",
			0,
			[
				"Remote-friendly blend of psychology, writing and UX",
				"Avoids classroom admin burden",
				"High tech demand"
			],
			[
				"Tight corporate course deadlines",
				"Subject-matter experts can be slow reviewers",
				"Measuring real retention"
			],
			"Rewrite a boring 'Click File > Export' lesson into a quick 2-minute challenge learners actually remember.",
			[
				"courseraAudit",
				"figma",
				"swayam"
			],
			"uiux"
		],
		[
			"special-education-teacher",
			"Special Education & Inclusive Learning Specialist",
			"Inclusive Education",
			"Adapt learning tools and pacing so students with dyslexia, ADHD, autism or sensory needs thrive.",
			"Creating Individualised Education Plans (IEPs), coaching multisensory reading and partnering with families.",
			[
				"Multisensory pedagogy",
				"IEP planning",
				"Deep patience",
				"Behaviour observation",
				"Family collaboration"
			],
			[
				"social",
				"healthcare",
				"art"
			],
			[
				"communication",
				"observation",
				"creativity",
				"problem_solving"
			],
			[
				"Psychology",
				"English",
				"Biology"
			],
			["D.Ed / B.Ed Special Education (RCI-recognised in India) / M.Ed Special Ed"],
			["Inclusive curriculum & assistive ed-tech consultant"],
			["Rethink a standard timed multiple-choice worksheet so a dyslexic student can show what they know fairly"],
			false,
			4,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			500,
			[
				"Life-changing advocacy for overlooked learners",
				"Urgent shortage of trained specialists",
				"Deep personal rewards"
			],
			[
				"Emotionally demanding days",
				"Fighting school system rigidity",
				"Requires accredited special-ed credentials"
			],
			"Notice 3 ways noisy fluorescent classrooms overwhelm sensory-sensitive learners—and zero-cost fixes.",
			[
				"swayam",
				"ncert",
				"openwho"
			],
			"uiux"
		],
		[
			"career-academic-counsellor",
			"Student Career & Wellbeing Counsellor",
			"Guidance & Advising",
			"Help students explore strengths calmly, compare degrees honestly and navigate academic pressure.",
			"Running 1-on-1 exploration sessions, hosting parent workshops, curating scholarship info and spotting burnout early.",
			[
				"Non-judgemental listening",
				"Career literacy",
				"College pathway knowledge",
				"Workshop facilitation",
				"Ethics"
			],
			[
				"social",
				"business",
				"healthcare"
			],
			[
				"communication",
				"observation",
				"research",
				"organisation"
			],
			[
				"Psychology",
				"English",
				"Economics"
			],
			["B.A./M.A. Psychology or Education + Guidance & Counselling Diploma (NCERT DCGC)"],
			["University placement & career readiness coach"],
			["Help a confused Class 11 student who loves both cricket and math explore 4 non-obvious career blends"],
			false,
			3,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			500,
			[
				"Reduces student anxiety around high-stakes choices",
				"Builds broad cross-industry knowledge",
				"Meaningful trust"
			],
			[
				"Managing unrealistic parent expectations gently",
				"Heavy seasonal application rush",
				"Large student ratios"
			],
			"Practice asking 4 open curiosity questions instead of telling a student 'just pick engineering or medicine'.",
			[
				"ncert",
				"swayam",
				"courseraAudit"
			],
			"uiux"
		],
		[
			"edtech-curriculum-architect",
			"STEM & Coding Curriculum Architect",
			"Interactive Learning",
			"Build project-based math, science and coding activities where students learn by building real things.",
			"Writing starter project guides, calibrating hint progressions, testing activities in schools and refining clarity.",
			[
				"Pedagogical scaffolding",
				"Python / Scratch / Math",
				"Project design",
				"Clarity",
				"Testing with learners"
			],
			[
				"technology",
				"mathematics",
				"science",
				"writing"
			],
			[
				"creativity",
				"technical",
				"writing",
				"problem_solving"
			],
			[
				"Computer Science",
				"Mathematics",
				"Physics"
			],
			["B.Tech / B.Sc. + teaching/mentoring volunteering", "Ed-tech curriculum product teams"],
			["Open-source educational kit creator", "Maker-lab curriculum designer"],
			["Design a 30-minute cardboard or Python activity that teaches loops without boring textbook jargon"],
			true,
			3,
			"Remote / from home",
			"Undergraduate Degree",
			0,
			[
				"Scales great teaching to thousands of classrooms",
				"Creative technical writing",
				"Remote options"
			],
			[
				"Ed-tech business cycles fluctuate",
				"Balancing rigour vs gamified fluff",
				"Iterative pilot feedback"
			],
			"Watch a beginner get stuck on an instruction you wrote—fix the exact word that misled them.",
			[
				"khan",
				"fcc",
				"cs50"
			],
			"software"
		],
		[
			"stem-lab-educator",
			"Hands-On STEM & Robotics Maker Educator",
			"Experiential Learning",
			"Run school maker labs, science fairs and Arduino/sensor workshops that turn theory into working builds.",
			"Maintaining 3D printers and microcontrollers, guiding student troubleshooting and coaching competition teams.",
			[
				"Electronics & Arduino",
				"Safe workshop tools",
				"Socratic coaching",
				"Debugging with kids",
				"Maintenance"
			],
			[
				"science",
				"technology",
				"design"
			],
			[
				"technical",
				"problem_solving",
				"teamwork",
				"public_speaking"
			],
			[
				"Physics",
				"Computer Science",
				"Mathematics"
			],
			["B.Tech / B.Sc. Physics/Electronics + Tinkering Lab / STEM fellowship"],
			["Mobile rural science-bus educator", "Community makerspace founder"],
			["Build a safe paper-circuit greeting card using a coin cell, foil tape and an LED"],
			true,
			2,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			500,
			[
				"Joy of watching students light up when builds work",
				"Active hands-on days",
				"Avoids rote lecturing"
			],
			[
				"Parts break constantly in lively labs",
				"Managing workshop safety with crowds",
				"School travel"
			],
			"Instead of grabbing the wire to fix a student's circuit, write 2 questions that help them find the loose pin.",
			[
				"mitocw",
				"khanSci",
				"nptel"
			],
			"software"
		],
		[
			"language-trainer",
			"Multilingual & Communication Trainer",
			"Language Education",
			"Help learners gain real speaking, writing and pronunciation confidence for study, travel or work.",
			"Running low-anxiety conversation drills, giving kind pronunciation feedback and tailoring lessons to goals.",
			[
				"Applied linguistics",
				"Phonetics",
				"Supportive feedback",
				"Cultural nuance",
				"Lesson pacing"
			],
			[
				"writing",
				"travel",
				"social",
				"history"
			],
			[
				"communication",
				"public_speaking",
				"writing",
				"observation"
			],
			["English", "Hindi / Regional language"],
			["B.A. Languages / Linguistics + CELTA / TESOL or regional language pedagogy cert"],
			["Online 1-on-1 language tutor", "Workplace communication coach"],
			["Design a 10-minute roleplay helping a shy learner practice ordering train tickets or asking directions"],
			false,
			2,
			"Remote / from home",
			"Undergraduate Degree",
			500,
			[
				"High global & remote flexibility",
				"Immediate confidence boost for learners",
				"Connects across cultures"
			],
			[
				"Hourly teaching fatigue if overbooked",
				"Platform commissions online",
				"Variable evening schedules"
			],
			"Notice why explaining grammar rules first freezes beginners, while useful phrases first builds momentum.",
			[
				"swayam",
				"khanHum",
				"courseraAudit"
			],
			"marketing"
		],
		[
			"corporate-lnd-facilitator",
			"Workplace Learning & Development Facilitator",
			"Professional Training",
			"Help working teams build leadership, technical tools, safety habits and inclusive collaboration.",
			"Diagnosing skill gaps with managers, facilitating interactive workshops and tracking workplace application.",
			[
				"Adult learning theory",
				"Workshop facilitation",
				"Needs analysis",
				"Coaching",
				"Impact measurement"
			],
			["business", "social"],
			[
				"public_speaking",
				"leadership",
				"communication",
				"organisation"
			],
			[
				"Business Studies",
				"Psychology",
				"English"
			],
			["BBA / Psychology / Any degree + HR/L&D or MBA HR", "Internal technical trainer"],
			["Independent leadership & communication workshop facilitator"],
			["Turn a dull 30-slide policy deck into a 15-minute group scenario exercise"],
			false,
			3,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			0,
			[
				"Energising interactive sessions",
				"Respected cross-company advisory role",
				"Transferable facilitation skills"
			],
			[
				"Sceptical trainees forced to attend mandatory sessions",
				"Travel for workshops",
				"Proving ROI"
			],
			"Design an icebreaker tied directly to a workshop topic instead of a pointless party game.",
			[
				"courseraAudit",
				"skillshop",
				"swayam"
			],
			"marketing"
		],
		[
			"education-policy-researcher",
			"Education Policy & Assessment Researcher",
			"System Reform",
			"Evaluate school programs, teacher training and literacy gaps using field evidence to guide governments and NGOs.",
			"Visiting rural and urban classrooms, analysing learning survey datasets and writing clear policy memos.",
			[
				"Impact evaluation",
				"Qualitative fieldwork",
				"Stata / R / Excel",
				"Policy writing",
				"Humility"
			],
			[
				"social",
				"government",
				"mathematics",
				"writing"
			],
			[
				"research",
				"analytical",
				"critical_thinking",
				"writing"
			],
			[
				"Economics",
				"Political Science",
				"Mathematics",
				"Psychology"
			],
			["Economics / Social Sciences / Education UG → MPP / M.A. Education (Azim Premji / TISS)"],
			["Foundation program officer (Pratham/ASER-style fellows)"],
			["Why does measuring school enrolment alone miss whether children can actually read a paragraph?"],
			false,
			4,
			"Outdoors / on the move",
			"Postgraduate / Licensing",
			0,
			[
				"Shapes education systems at state/national scale",
				"Blends fieldwork with econometrics",
				"Deep impact"
			],
			[
				"Slow political/bureaucratic implementation",
				"Masters often expected",
				"Long field travel"
			],
			"Design a 3-question oral reading check that spots comprehension rather than memorised recitation.",
			[
				"ncert",
				"swayam",
				"khanEcon"
			],
			"data"
		],
		[
			"early-childhood-educator",
			"Early Childhood & Montessori Educator",
			"Foundational Years",
			"Nurture curiosity, language, motor play and emotional safety for children aged 3–8.",
			"Preparing tactile play stations, storytelling circles, observing developmental milestones and reassuring parents.",
			[
				"Child development",
				"Play-based pedagogy",
				"Warm calm patience",
				"Storytelling",
				"Safety vigilance"
			],
			[
				"social",
				"art",
				"music"
			],
			[
				"creativity",
				"observation",
				"communication",
				"teamwork"
			],
			[
				"Psychology",
				"Fine Arts",
				"English",
				"Music"
			],
			["ECCE Diploma / Montessori Training / B.El.Ed / NEP foundational stage cert"],
			["Community toy-library & preschool founder"],
			["Invent 3 learning games using just pebbles, leaves and chalk for counting and sorting"],
			false,
			2,
			"With people (schools, clinics, events)",
			"Diploma / Certificate",
			500,
			[
				"Purest foundational impact on lifelong confidence",
				"Playful creative mornings",
				"Consistent local demand"
			],
			[
				"High physical energy required",
				"Undervalued pay in unorganised preschools",
				"Strict safety responsibility"
			],
			"Practice kneeling to a child's eye level and giving a 1-step clear positive instruction instead of 'Don't run!'",
			[
				"ncert",
				"swayam",
				"khanHum"
			],
			"uiux"
		],
		[
			"assessment-psychometric-specialist",
			"Educational Assessment & Psychometrics Specialist",
			"Fair Testing Design",
			"Design unbiased, concept-testing exams and adaptive practice tools that measure true understanding.",
			"Auditing test questions for tricky wording bias, running item-response stats and collaborating with teachers.",
			[
				"Classical & IRT stats",
				"Item writing",
				"Fairness auditing",
				"Python / R",
				"Cognitive science"
			],
			[
				"mathematics",
				"science",
				"technology"
			],
			[
				"analytical",
				"mathematics",
				"critical_thinking",
				"research"
			],
			[
				"Mathematics",
				"Psychology",
				"Computer Science"
			],
			["Statistics / Psychology / EdTech → Psychometrics & Assessment Research"],
			["Adaptive EdTech diagnostic engineer"],
			["Rewrite a memorisation-only history MCQ so it tests reasoning from a short historical quote instead"],
			true,
			4,
			"Office / desk",
			"Postgraduate / Licensing",
			0,
			[
				"Reforms broken rote exams into fairer diagnostics",
				"Great blend of math and psychology",
				"Emerging AI-eval tie-in"
			],
			[
				"Highly specialised technical stats",
				"Exam-board conservatism",
				"Zero tolerance for scoring errors"
			],
			"Look at a tricky exam question and spot if it tests reading speed or subject knowledge.",
			[
				"kaggle",
				"khan",
				"swayam"
			],
			"data"
		],
		[
			"community-literacy-coordinator",
			"Community Library & Adult Literacy Coordinator",
			"Lifelong Access",
			"Run neighbourhood reading rooms, digital-literacy camps and adult learning circles.",
			"Curating multilingual books, coaching first-time smartphone/UPI safety and recruiting local youth volunteers.",
			[
				"Community mobilisation",
				"Multilingual curation",
				"Workshop design",
				"Digital safety teaching",
				"Budgeting"
			],
			[
				"social",
				"writing",
				"travel"
			],
			[
				"leadership",
				"communication",
				"organisation",
				"teamwork"
			],
			[
				"English",
				"Hindi / Regional language",
				"History"
			],
			["Any UG + NGO fellowships (Gandhi Fellowship, Teach For India, local library networks)"],
			["Public library network & rural digital-inclusion manager"],
			["Plan a 45-minute community session teaching older adults how to spot fake payment-link scams"],
			false,
			2,
			"With people (schools, clinics, events)",
			"Class 12",
			0,
			[
				"Immediate visible empowerment in communities",
				"Welcomes diverse degrees",
				"Deep grassroots bonds"
			],
			[
				"Grant/donation funding limits",
				"Modest non-profit salaries",
				"Volunteer turnover"
			],
			"Curate 5 practical topics a neighbourhood evening reading club would love besides school textbooks.",
			[
				"swayam",
				"ncert",
				"openwho"
			],
			"cyber"
		]
	], {
		progression: [
			"Trainee Educator / Fellow",
			"Teacher / Designer / Specialist",
			"Lead Educator / Curriculum Head",
			"Principal, Dean or Director"
		],
		freelance: "High — tutoring, instructional design, language coaching, and curriculum consulting.",
		entrepreneurship: "Moderate-High — micro-schools, STEM maker studios, EdTech learning tools, and coaching hubs.",
		entryLevel: "Peer tutoring, community library volunteering, NGO teaching fellowships, and MOOC beta testing.",
		costNote: "NCERT, SWAYAM, MIT OCW, and Khan Academy are free; teaching degrees like B.Ed carry regulated fees."
	}),
	...expandCareers("Government", [
		[
			"civil-services-administrator",
			"Civil Services & District Administrator",
			"Public Administration",
			"Lead district governance, public welfare delivery, infrastructure coordination and disaster response.",
			"Reviewing department targets, inspecting schools/clinics, hearing citizen grievances and coordinating police/revenue.",
			[
				"Constitutional & policy grasp",
				"Crisis leadership",
				"Public finance",
				"Ethical backbone",
				"Multistakeholder coordination"
			],
			[
				"government",
				"law",
				"social"
			],
			[
				"leadership",
				"critical_thinking",
				"organisation",
				"communication"
			],
			[
				"Political Science",
				"History",
				"Economics",
				"Geography"
			],
			["Any Bachelor's Degree → UPSC CSE / State PSC Examinations + Lal Bahadur Shastri Academy training"],
			["State municipal & public-sector administrative services"],
			["Read a district collectorate annual report and trace how funds reach a village road or primary school"],
			false,
			5,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			500,
			[
				"Immense scale of civic service",
				"Broad leadership across health, roads, water and schools",
				"Job security"
			],
			[
				"Extremely competitive multi-year exam funnel",
				"Political pressure & transfers",
				"24/7 crisis accountability"
			],
			"Propose a 3-step transparent queue system to cut bribery and waiting time at a local certificate office.",
			[
				"ncert",
				"swayam",
				"khanHum"
			],
			"data"
		],
		[
			"urban-city-planner",
			"Urban & Regional Transit Planner",
			"Cities & Mobility",
			"Design walkable neighbourhoods, safe bus/metro networks, storm drainage and affordable housing zones.",
			"Mapping GIS land-use layers, surveying commuters, modelling flood zones and facilitating public town halls.",
			[
				"GIS spatial mapping",
				"Transport planning",
				"Zoning & codes",
				"Public consultation",
				"Climate resilience"
			],
			[
				"government",
				"design",
				"environment",
				"travel"
			],
			[
				"analytical",
				"creativity",
				"organisation",
				"communication"
			],
			[
				"Geography",
				"Mathematics",
				"Economics",
				"Fine Arts"
			],
			["B.Plan (Bachelor of Planning) / B.Arch / Civil Engg → M.Plan (SPA / IIT / CEPT)"],
			["Smart-city & municipal transit fellow"],
			["Walk 10 minutes from your home to the nearest bus stop and note 4 footpath, shade or crossing hazards"],
			false,
			4,
			"Outdoors / on the move",
			"Undergraduate Degree",
			500,
			[
				"Visibly shapes safer, greener cities",
				"Combines design, ecology and public policy",
				"Growing metro demand"
			],
			[
				"Long political & budget timelines before plans get built",
				"Navigating conflicting land interests",
				"Admin inertia"
			],
			"Why does adding extra car lanes often fill back up with traffic, whereas dedicated bus lanes move more people?",
			[
				"unccl",
				"nptel",
				"swayam"
			],
			"uiux"
		],
		[
			"public-policy-analyst",
			"Public Policy & Legislative Analyst",
			"Policy Research",
			"Evaluate government schemes with hard evidence so taxpayers' money actually solves citizens' problems.",
			"Analysing budget allocations, reading parliamentary bills, interviewing field beneficiaries and writing briefs.",
			[
				"Policy evaluation",
				"Economics & stats",
				"Crisp brief writing",
				"Stakeholder listening",
				"Legal literacy"
			],
			[
				"government",
				"law",
				"social",
				"writing"
			],
			[
				"research",
				"critical_thinking",
				"writing",
				"analytical"
			],
			[
				"Economics",
				"Political Science",
				"History",
				"Mathematics"
			],
			["Any UG → Master in Public Policy (MPP) / Legislative Assistant (LAMP) / State Chief Minister Fellowships"],
			["Think-tank & multilateral (UNDP/World Bank) analyst"],
			["Summarise any recent city policy in 150 words: Who benefits, who pays, and what unintended side effect could occur?"],
			false,
			4,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Directly improves laws and welfare reach",
				"Intellectual diversity",
				"Strong fellowships available"
			],
			[
				"Implementation gap between policy paper and ground reality",
				"Partisan noise",
				"Grant/project cycles"
			],
			"Spot one unintended consequence if a city suddenly banned all street vendors without designating vending zones.",
			[
				"khanEcon",
				"swayam",
				"ncert"
			],
			"data"
		],
		[
			"diplomat-foreign-service",
			"Diplomat & International Relations Officer",
			"Foreign Service & Trade",
			"Represent national interests abroad, support citizens overseas and negotiate trade, climate and peace pacts.",
			"Drafting diplomatic cables, assisting stranded nationals, coordinating cultural/trade delegations and briefing envoys.",
			[
				"Geopolitics & history",
				"Foreign languages",
				"Cross-cultural tact",
				"Crisis composure",
				"Negotiation"
			],
			[
				"government",
				"travel",
				"history",
				"law"
			],
			[
				"communication",
				"critical_thinking",
				"writing",
				"public_speaking"
			],
			[
				"Political Science",
				"History",
				"Economics",
				"English"
			],
			["Any Bachelor's Degree → UPSC CSE (IFS) / International Relations M.A. for multilateral orgs"],
			["Global trade, UN agency or embassy policy specialist"],
			["Read two different countries' news coverage of the same trade summit and list what each prioritised"],
			false,
			5,
			"Outdoors / on the move",
			"Undergraduate Degree",
			500,
			[
				"Global cultural exposure & service",
				"Shapes trade, science and climate cooperation",
				"Prestigious craft"
			],
			[
				"Frequent international relocations disrupt family routines",
				"Elite exam barrier",
				"Delicate protocol constraints"
			],
			"Practise summarising a heated disagreement between two parties using neutral, face-saving diplomatic wording.",
			[
				"khanHum",
				"swayam",
				"courseraAudit"
			],
			"marketing"
		],
		[
			"municipal-water-transit-officer",
			"Municipal Utilities & Public Works Officer",
			"Civic Infrastructure",
			"Keep city drinking water safe, stormwater drains clear, streetlights working and solid waste managed.",
			"Auditing contractor repairs, responding to citizen leak reports, testing water chlorination and budgeting wards.",
			[
				"Civil/utility ops",
				"Vendor oversight",
				"Civic GIS",
				"Budgeting",
				"Citizen responsiveness"
			],
			[
				"government",
				"environment",
				"social"
			],
			[
				"organisation",
				"problem_solving",
				"leadership",
				"observation"
			],
			[
				"Geography",
				"Physics",
				"Mathematics"
			],
			["B.Tech Civil / Mechanical / Environmental → State Municipal Engineering / SSC / Urban Fellowships"],
			["Smart-water utility telemetry specialist"],
			["Trace where household wastewater goes after the sink drain in your city—treated or straight into a river?"],
			false,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Immediate visible health & dignity impact for neighbourhoods",
				"Practical engineering + civic ops",
				"Stable"
			],
			[
				"Dealing with aging underground pipes and monsoon emergencies",
				"Contractor accountability challenges",
				"Bureaucracy"
			],
			"Map 3 clogged drain spots near a busy road and think how simple grate designs reduce flooding.",
			[
				"nptel",
				"unccl",
				"swayam"
			],
			"cyber"
		],
		[
			"election-civic-data-officer",
			"Civic Data & Open Governance Specialist",
			"Public Sector Analytics",
			"Publish clean open civic datasets and dashboards so municipalities spot gaps in transit, schools or budgets.",
			"Cleaning ward-level census/health tables, automating public dashboards and training municipal staff.",
			[
				"Data cleaning",
				"GIS / Python / SQL",
				"Data privacy",
				"Visual clarity",
				"Public communication"
			],
			[
				"government",
				"technology",
				"mathematics"
			],
			[
				"analytical",
				"technical",
				"organisation",
				"communication"
			],
			[
				"Mathematics",
				"Computer Science",
				"Economics",
				"Geography"
			],
			["B.Tech / Statistics / Public Policy → Civic Tech Fellowships (DataMeet / Smart Cities / NIC)"],
			["Open-data NGO & census analyst"],
			["Explore a public municipal ward budget and turn 10 rows of raw spend into 2 simple visual insights"],
			true,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Brings modern transparency to local governance",
				"Uses coding skills for public good",
				"Growing smart-city need"
			],
			[
				"Fragmented PDFs and messy paper records",
				"Institutional resistance to transparency",
				"Contract fellowships"
			],
			"Why should a city publish school repair data by ward instead of hiding everything in a single citywide average?",
			[
				"kaggle",
				"fcc",
				"swayam"
			],
			"data"
		],
		[
			"economist-public-sector",
			"Public Sector & Development Economist",
			"Economic Policy",
			"Study inflation, employment, rural credit and taxation to advise central banks, ministries or global agencies.",
			"Running econometric regressions on household surveys, forecasting tax revenue and authoring policy papers.",
			[
				"Macro/microeconomics",
				"Econometrics (R/Stata)",
				"Survey design",
				"Policy writing",
				"Scepticism"
			],
			[
				"government",
				"finance",
				"mathematics",
				"social"
			],
			[
				"mathematics",
				"analytical",
				"research",
				"critical_thinking"
			],
			["Economics", "Mathematics"],
			["B.A./B.Sc. Economics → M.A./M.Sc. Economics (DSE/ISI/IGIDR) → Indian Economic Service / RBI / PhD"],
			["Central bank & development bank researcher"],
			["Explain why raising minimum wages affects formal factories differently than informal daily-wage farms"],
			false,
			5,
			"Office / desk",
			"Postgraduate / Licensing",
			0,
			[
				"Shapes national fiscal and employment policies",
				"Deep mathematical & human insight",
				"Respected expertise"
			],
			[
				"Rigorous quantitative Master's/exam required",
				"Economic models lag rapid shocks",
				"Academic competition"
			],
			"Look at vegetable price spikes and separate seasonal supply shocks from broad long-term inflation.",
			[
				"khanEcon",
				"mitocw",
				"swayam"
			],
			"data"
		],
		[
			"revenue-customs-officer",
			"Tax Administration & Customs Enforcement Officer",
			"Fiscal Enforcement",
			"Ensure fair trade compliance at ports/airports, prevent smuggling and administer public tax systems.",
			"Inspecting cargo manifests, auditing commercial valuation discrepancies and coordinating border intelligence.",
			[
				"Trade & tariff rules",
				"Forensic accounting",
				"Port inspection",
				"Legal procedure",
				"Integrity"
			],
			[
				"government",
				"finance",
				"law"
			],
			[
				"observation",
				"analytical",
				"critical_thinking",
				"organisation"
			],
			[
				"Economics",
				"Accountancy",
				"Political Science"
			],
			["Any Bachelor's Degree → UPSC CSE (IRS) / SSC CGL (Customs & GST Inspectors)"],
			["Trade compliance & port logistics specialist"],
			["How can mislabelling a luxury watch box as 'plastic toys' on an import form evade customs duty?"],
			false,
			4,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Protects national revenue and fair local industry",
				"Combines investigation with finance/law",
				"Stable service"
			],
			[
				"High-integrity pressure against smuggling networks",
				"Shift rosters at ports/airports",
				"Competitive exams"
			],
			"Compare two shipping invoices for identical items and list 3 clues of deliberate under-invoicing.",
			[
				"varsity",
				"ncert",
				"swayam"
			],
			"cyber"
		],
		[
			"disaster-management-officer",
			"Disaster Risk & Emergency Coordinator",
			"Resilience & Response",
			"Prepare flood, cyclone, heatwave and earthquake response plans that save lives before and during disasters.",
			"Running early-warning drills, mapping shelter capacity, coordinating relief supplies and briefing NDMA/SDRF teams.",
			[
				"Hazard mapping",
				"Emergency logistics",
				"Community drills",
				"Inter-agency comms",
				"Calm leadership"
			],
			[
				"government",
				"environment",
				"social"
			],
			[
				"leadership",
				"organisation",
				"problem_solving",
				"teamwork"
			],
			[
				"Geography",
				"Environmental Studies",
				"Physics"
			],
			["Geography / Civil Engg / Social Work → M.A./PG Diploma Disaster Management (NIDM / TISS)"],
			["Humanitarian NGO emergency response coordinator"],
			["Draw a household/school evacuation and emergency-kit checklist for a sudden urban flood or tremor"],
			false,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Saves lives through preparation and calm execution",
				"Field + planning mix",
				"Critical climate-era role"
			],
			[
				"Intense high-stress response windows",
				"Bureaucratic coordination bottlenecks",
				"Field hardship post-disaster"
			],
			"Why is sending random unsorted old clothes after a flood often less helpful than clean water & cash/hygiene kits?",
			[
				"unccl",
				"openwho",
				"swayam"
			],
			"cyber"
		],
		[
			"digital-public-infrastructure-lead",
			"Digital Public Infrastructure (DPI) Specialist",
			"e-Governance Systems",
			"Build accessible, open-standard citizen portals for digital identity, health records, scholarships and transit.",
			"Designing low-bandwidth citizen flows, auditing inclusion for feature-phone users and coordinating ministries.",
			[
				"Open standards",
				"Inclusive UX",
				"Systems architecture",
				"Privacy & consent",
				"Public procurement"
			],
			[
				"government",
				"technology",
				"design"
			],
			[
				"technical",
				"problem_solving",
				"communication",
				"leadership"
			],
			[
				"Computer Science",
				"Political Science",
				"Economics"
			],
			["B.Tech / Design / Policy + DPI Fellowships (eGov / EkStep / NIC / State IT missions)"],
			["Civic-tech open-source maintainer"],
			["Test how a government scholarship form fails for someone with slow 3G and only a regional language"],
			true,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Population-scale positive impact",
				"Unites modern tech with public service",
				"Fast-growing Indian global model"
			],
			[
				"Legacy system integration headaches",
				"Strict public tender/compliance cycles",
				"Accessibility gaps"
			],
			"Simplify a 20-field paper government application into 6 essential questions with plain wording.",
			[
				"figma",
				"fcc",
				"swayam"
			],
			"uiux"
		],
		[
			"rural-development-fellow",
			"Rural Development & Livelihoods Coordinator",
			"Grassroots Governance",
			"Partner with village panchayats, self-help groups and farmer collectives to improve incomes and local infrastructure.",
			"Facilitating gram sabha meetings, connecting cooperatives to credit/markets and tracking watershed works.",
			[
				"Participatory listening",
				"Microfinance literacy",
				"Watershed basics",
				"Local language fluency",
				"Resilience"
			],
			[
				"government",
				"social",
				"agriculture",
				"environment"
			],
			[
				"communication",
				"leadership",
				"teamwork",
				"organisation"
			],
			[
				"Economics",
				"Geography",
				"Political Science"
			],
			["Any UG → State Rural Livelihood Mission / PMRDF / Young India / TISS Rural Development"],
			["Agri-cooperative & grassroots NGO manager"],
			["Why do local women's self-help groups often achieve higher loan repayment than distant commercial banks?"],
			false,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Deep authentic connection with rural communities",
				"Immediate visible impact",
				"Rich leadership growth"
			],
			[
				"Rural field living conditions and travel",
				"Modest initial stipends",
				"Patience needed for local consensus"
			],
			"List 3 non-crop local businesses a rural youth collective could launch using existing village skills.",
			[
				"fao",
				"swayam",
				"ncert"
			],
			"marketing"
		],
		[
			"parliamentary-legislative-aide",
			"Legislative & Parliamentary Research Aide",
			"Lawmaking Support",
			"Help elected representatives prepare sharp committee questions, amendments and constituent briefings.",
			"Tracking upcoming bills, verifying ministry data answers, writing speech briefs and meeting citizen groups.",
			[
				"Rapid policy synthesis",
				"Statutory reading",
				"Neutral fact-checking",
				"Deadline writing",
				"Discretion"
			],
			[
				"government",
				"law",
				"writing",
				"history"
			],
			[
				"research",
				"writing",
				"critical_thinking",
				"communication"
			],
			[
				"Political Science",
				"History",
				"Economics",
				"English"
			],
			["Any Bachelor's Degree → LAMP Fellowship / State Legislative Internships / PRS-style research"],
			["Public affairs & policy communications specialist"],
			["Draft 3 pointed, data-backed parliamentary questions about delayed school textbook distribution"],
			false,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Front-row seat to lawmaking right after college",
				"Builds elite policy writing speed",
				"Non-exam entry via fellowships"
			],
			[
				"Intense session hours",
				"Short fellowship contracts initially",
				"Political turbulence"
			],
			"Read any short bill summary and identify one clause that could be interpreted in two opposite ways.",
			[
				"ncert",
				"swayam",
				"khanHum"
			],
			"marketing"
		],
		[
			"heritage-tourism-officer",
			"Cultural Heritage & Tourism Development Officer",
			"Public Culture",
			"Conserve local monuments responsibly while creating sustainable jobs for local guides and artisans.",
			"Designing visitor signage, regulating crowd capacity, partnering with craft guilds and managing heritage sites.",
			[
				"Heritage conservation",
				"Sustainable tourism",
				"Community partnerships",
				"Storytelling",
				"Site budgeting"
			],
			[
				"government",
				"history",
				"travel",
				"art"
			],
			[
				"organisation",
				"communication",
				"research",
				"creativity"
			],
			[
				"History",
				"Geography",
				"English"
			],
			["B.A. History / Tourism Management / Heritage Studies (IITTM / INTACH internships)"],
			["Responsible ecotourism & museum trail designer"],
			["Spot 3 ways over-tourism damages an old fort or temple—and how timed entry or local guides fix it"],
			false,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Preserves culture while supporting local artisans",
				"Active outdoor heritage sites",
				"Storytelling role"
			],
			[
				"Balancing visitor revenue vs conservation rules",
				"Multi-agency monument permissions",
				"Seasonal crowds"
			],
			"Write a 60-second audio-guide script for a local landmark focusing on a surprising human detail.",
			[
				"khanHum",
				"swayam",
				"ncert"
			],
			"marketing"
		]
	], {
		progression: [
			"Fellow / Junior Officer",
			"Program / Administrative Officer",
			"Deputy Director / Senior Analyst",
			"Director / Secretary / Commissioner"
		],
		freelance: "Low-Moderate — public policy consulting, urban planning audits, and civic data advisory exist independently.",
		entrepreneurship: "Moderate — civic-tech platforms, policy research boutiques, and social development consultancies.",
		entryLevel: "Fellowships (LAMP, CMGGA, SBI Youth for India), municipal internships, and competitive UPSC/SSC prep.",
		costNote: "NCERT, SWAYAM, and open civic datasets are free; public service exam coaching is optional."
	}),
	...expandCareers("Defence", [
		[
			"commissioned-army-officer",
			"Commissioned Army Officer",
			"Ground Operations & Leadership",
			"Lead soldiers, plan field logistics, guard borders and assist civil authorities during national emergencies.",
			"Inspecting unit readiness, leading physical training, briefing tactical exercises and looking after troops' welfare.",
			[
				"Squad leadership",
				"Map & terrain navigation",
				"Crisis composure",
				"Physical endurance",
				"Integrity"
			],
			[
				"defence" in ["government"] ? "government" : "government",
				"sports",
				"travel"
			],
			[
				"leadership",
				"fitness",
				"teamwork",
				"critical_thinking"
			],
			[
				"Mathematics",
				"Physics",
				"Geography",
				"English"
			],
			["Class 12 → NDA (UPSC) / Undergraduate → CDS / Technical Entry + SSB Interview & Academy Training"],
			["Territorial Army / NCC leadership track"],
			["Practice reading a topographic contour map to spot which hill blocks line-of-sight between two valleys"],
			false,
			5,
			"Outdoors / on the move",
			"Class 12",
			0,
			[
				"Unparalleled camaraderie and service ethos",
				"Paid academy training once selected",
				"Strong leadership development"
			],
			[
				"High physical risk and harsh terrain postings",
				"Long family separations",
				"Strict hierarchical discipline"
			],
			"Plan how a 10-person trek team splits water, first aid and navigation roles before crossing a foggy pass.",
			[
				"ncert",
				"khanSci",
				"swayam"
			],
			"cyber"
		],
		[
			"naval-marine-engineer",
			"Naval & Marine Systems Engineer",
			"Maritime Engineering",
			"Operate and maintain ship propulsion, power grids, sonar and hull safety across ocean deployments.",
			"Monitoring engine-room turbines, running damage-control drills, inspecting electrical systems and leading sailors.",
			[
				"Thermodynamics & propulsion",
				"Electrical diagnostics",
				"Damage control",
				"Leadership at sea",
				"Safety"
			],
			[
				"technology",
				"travel",
				"science"
			],
			[
				"technical",
				"problem_solving",
				"leadership",
				"teamwork"
			],
			[
				"Physics",
				"Mathematics",
				"Chemistry"
			],
			["B.Tech Mechanical / Electrical / Marine Engg → Indian Navy Technical Entry / Merchant Navy IMU"],
			["Commercial marine & port engineering officer"],
			["Trace how a ship generates both electricity and fresh drinking water from seawater while far from land"],
			false,
			5,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Hands-on mastery of massive floating power plants",
				"Ocean travel and brotherhood",
				"Strong engineering base"
			],
			[
				"Months away at sea with limited connectivity",
				"Hot noisy machinery spaces",
				"Strict safety watches"
			],
			"Explain why watertight bulkhead doors prevent one hull puncture from sinking an entire vessel.",
			[
				"nptel",
				"mitocw",
				"khanSci"
			],
			"software"
		],
		[
			"air-force-pilot-navigator",
			"Military / Rescue Flight Pilot & Navigator",
			"Aviation Operations",
			"Fly transport, helicopter relief or tactical aircraft safely through demanding weather and terrain.",
			"Completing pre-flight checks, calculating fuel/wind navigation, flying simulated emergencies and debriefing sorties.",
			[
				"Spatial awareness",
				"Split-second checklists",
				"Meteorology",
				"Aeronautical math",
				"Calm under G-load"
			],
			[
				"travel",
				"technology",
				"sports"
			],
			[
				"observation",
				"problem_solving",
				"fitness",
				"critical_thinking"
			],
			[
				"Physics",
				"Mathematics",
				"English"
			],
			["NDA / AFCAT / CDS Flying Branch + PABT/CPSS testing + Air Force Academy (strict medical/vision norms)"],
			["Civil commercial aviation / disaster helicopter rescue"],
			["Calculate how a 30-knot crosswind pushes a rescue helicopter off course over a 100km mountain leg"],
			false,
			5,
			"Outdoors / on the move",
			"Class 12",
			0,
			[
				"Elite precision flying & humanitarian airlift rescues",
				"Cutting-edge aviation training",
				"High honour"
			],
			[
				"Strict medical/eyesight eligibility rules",
				"Zero-error aviation risk",
				"Frequent base transfers"
			],
			"Practice cross-checking 4 instrument gauges mentally while keeping a steady visual horizon.",
			[
				"mitocw",
				"khanSci",
				"nptel"
			],
			"data"
		],
		[
			"defence-systems-engineer",
			"Defence Radar, Avionics & Embedded Systems Engineer",
			"Defence R&D",
			"Design rugged electronics, radar tracking, encrypted comms and autonomous defence hardware (DRDO/PSU/private).",
			"Writing real-time C/embedded firmware, testing thermal/vibration resilience and simulating signal interference.",
			[
				"Embedded C/C++",
				"Signal processing",
				"RF & radar basics",
				"Hardware testing",
				"System security"
			],
			[
				"technology",
				"science",
				"mathematics"
			],
			[
				"technical",
				"mathematics",
				"analytical",
				"problem_solving"
			],
			[
				"Physics",
				"Mathematics",
				"Computer Science"
			],
			["B.Tech ECE / EEE / CSE → GATE / DRDO SET / BEL / HAL / private aerospace-defence engineering"],
			["Civil aerospace & satellite hardware engineering"],
			["Explain why electronics inside an aircraft or satellite must be shielded against radiation & extreme vibration"],
			false,
			4,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Cutting-edge hardware & signal physics",
				"Serves national self-reliance",
				"Dual-use civil space skills"
			],
			[
				"Strict security clearances limit remote work",
				"Long hardware qualification timelines",
				"Formal documentation"
			],
			"Describe how radar computes an object's distance by timing how long a radio pulse takes to bounce back.",
			[
				"nptel",
				"mitocw",
				"cs50"
			],
			"software"
		],
		[
			"cyber-defence-specialist",
			"Critical Infrastructure & Cyber Defence Specialist",
			"National Cyber Security",
			"Defend power grids, satellites, banking backbones and defence networks from state-grade cyber intrusions.",
			"Hunting advanced network persistence, reverse-engineering malware safely and hardening air-gapped networks.",
			[
				"Reverse engineering",
				"Network forensics",
				"Linux internals",
				"Threat intelligence",
				"Incident command"
			],
			["technology", "law"],
			[
				"analytical",
				"critical_thinking",
				"observation",
				"technical"
			],
			[
				"Computer Science",
				"Mathematics",
				"Physics"
			],
			["B.Tech CSE / Cyber Security + CERT-In / Defence Cyber Agency / NTRO / Security Ops"],
			["Enterprise critical-infrastructure SOC lead"],
			["Explain why 'air-gapping' a power-plant network isn't enough if infected USB drives get plugged in"],
			true,
			5,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"High-stakes digital defence mission",
				"Deep technical mastery",
				"Always-relevant skills"
			],
			[
				"Intense adversarial mindset required",
				"Strict background/clearance checks",
				"On-call readiness"
			],
			"Trace how phishing one contractor email can become the entry hop toward an internal server.",
			[
				"thm",
				"owasp",
				"cs50"
			],
			"cyber"
		],
		[
			"geospatial-intelligence-analyst",
			"Geospatial & Satellite Imagery Analyst",
			"Earth & Border Observation",
			"Interpret satellite radar/optical imagery to track floods, border infrastructure, glaciers and disaster damage.",
			"Layering multispectral satellite passes, spotting terrain changes and producing clear briefing maps.",
			[
				"GIS (QGIS)",
				"Remote sensing",
				"Photogrammetry",
				"Pattern observation",
				"Spatial briefing"
			],
			[
				"science",
				"environment",
				"technology",
				"travel"
			],
			[
				"observation",
				"analytical",
				"research",
				"technical"
			],
			[
				"Geography",
				"Physics",
				"Mathematics",
				"Computer Science"
			],
			["B.Sc./B.Tech Geography, Geoinformatics or Civil → M.Tech Remote Sensing (IIRS/ISRO) / Defence GIS"],
			["Climate deforestation & crop-insurance satellite analyst"],
			["Compare a visible satellite photo vs an infrared image to spot why clouds hide optical cameras while radar sees through"],
			true,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Turns orbital imagery into actionable truth",
				"Useful in both defence and climate/agriculture",
				"Visual"
			],
			[
				"Hours examining subtle grayscale radar textures",
				"Security rules on sensitive imagery",
				"Niche hiring"
			],
			"Open any free satellite map and spot 3 signs distinguishing a dry riverbed from an active unpaved road.",
			[
				"unccl",
				"kaggle",
				"nptel"
			],
			"data"
		],
		[
			"coast-guard-rescue-officer",
			"Coast Guard & Maritime Search-and-Rescue Officer",
			"Coastal Safety",
			"Protect coastlines, intercept smuggling/pollution spills and rescue fishing vessels caught in storms.",
			"Commanding patrol cutters, coordinating helicopter sea rescues, inspecting marine oil spills and enforcing maritime law.",
			[
				"Maritime navigation",
				"Search-and-rescue ops",
				"Weather reading",
				"Crew leadership",
				"Emergency response"
			],
			[
				"travel",
				"environment",
				"sports"
			],
			[
				"leadership",
				"fitness",
				"teamwork",
				"problem_solving"
			],
			[
				"Physics",
				"Mathematics",
				"Geography"
			],
			["Class 12 / B.Tech / B.Sc. Physics-Math → Indian Coast Guard Assistant Commandant selection"],
			["Merchant marine safety & port harbour master"],
			["Calculate how ocean drift carries a disabled fishing boat over 6 hours so rescue teams search ahead, not where it radioed"],
			false,
			4,
			"Outdoors / on the move",
			"Class 12",
			0,
			[
				"Direct humanitarian sea rescues",
				"Protects marine ecology from oil spills",
				"Adventurous coastal leadership"
			],
			[
				"Rough monsoon sea deployments",
				"24/7 search pressure",
				"Transfers along coastlines"
			],
			"Plan a search grid pattern over open ocean when wind blows east and current flows south.",
			[
				"ncert",
				"openwho",
				"khanSci"
			],
			"data"
		],
		[
			"aerospace-avionics-technician",
			"Aircraft Maintenance & Avionics Engineer",
			"Flight Safety Engineering",
			"Inspect airframes, jet engines and cockpit navigation sensors so every aircraft flies safely.",
			"Performing ultrasonic crack checks, calibrating altimeters, signing airworthiness logs and troubleshooting faults.",
			[
				"Avionics & hydraulics",
				"Zero-error checklists",
				"Precision tools",
				"Troubleshooting",
				"Safety ethics"
			],
			["technology", "science"],
			[
				"observation",
				"technical",
				"organisation",
				"problem_solving"
			],
			[
				"Physics",
				"Mathematics",
				"English"
			],
			["DGCA Aircraft Maintenance Engineering (AME) License / Air Force Technical Trades / B.Tech Aerospace"],
			["Civil airline MRO hangar engineer"],
			["Why does aviation require two independent people to sign off critical flight-control bolt checks?"],
			false,
			4,
			"Lab or studio",
			"Class 12",
			1e3,
			[
				"Literally keeps flights safe every day",
				"Concrete mechanical + electronics craft",
				"Civil-defence crossover"
			],
			[
				"Night hangar shifts between flights",
				"Strict personal liability on sign-offs",
				"Noisy tarmac work"
			],
			"Learn why aircraft mechanics colour-code and count every single wrench before closing an engine panel.",
			[
				"nptel",
				"mitocw",
				"khanSci"
			],
			"cyber"
		],
		[
			"logistics-ordnance-officer",
			"Defence Logistics & Supply Officer",
			"High-Altitude & Field Supply",
			"Plan rations, spare parts, cold-weather gear and medical drops to remote outposts under tough conditions.",
			"Forecasting winter stock-ups before mountain passes snow shut, managing convoy routes and auditing depots.",
			[
				"Supply chain planning",
				"Inventory control",
				"Convoy risk planning",
				"Leadership",
				"ERP systems"
			],
			["business", "travel"],
			[
				"organisation",
				"leadership",
				"problem_solving",
				"analytical"
			],
			[
				"Mathematics",
				"Economics",
				"Business Studies"
			],
			["NDA / CDS / Logistics Branch Entry → Service Logistics Corps"],
			["Humanitarian UN / WFP emergency logistics"],
			["Calculate total fuel and spare tires needed to convoy 20 tonnes up a 4,000m mountain road before snowfall"],
			false,
			4,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Solves extreme real-world supply puzzles",
				"Transfers directly to civilian supply chain leadership",
				"Teamwork"
			],
			[
				"Remote depot postings",
				"Extreme weather bottlenecks",
				"Zero margin for missing winter stock"
			],
			"Plan the exact packing order so emergency medical kits stay dry and unload FIRST from a crowded relief truck.",
			[
				"nptel",
				"courseraAudit",
				"khanEcon"
			],
			"data"
		],
		[
			"military-medical-corps-officer",
			"Armed Forces Medical & Field Trauma Doctor",
			"Tactical & Field Medicine",
			"Provide emergency trauma care, high-altitude medicine and hospital treatment for personnel and disaster victims.",
			"Running field medical posts, treating frostbite/altitude sickness, overseeing vaccinations and surgical units.",
			[
				"Emergency trauma care",
				"High-altitude physiology",
				"Medical triage",
				"Calm leadership",
				"Adaptability"
			],
			["healthcare", "science"],
			[
				"observation",
				"problem_solving",
				"leadership",
				"fitness"
			],
			[
				"Biology",
				"Chemistry",
				"Physics"
			],
			["NEET → AFMC Pune (MBBS) or Post-MBBS Short Service / Permanent Commission in AMC"],
			["Expedition & wilderness medicine specialist"],
			["Learn why triage sorts mass-casualty patients by immediate treatable urgency rather than first-come-first-served"],
			false,
			5,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			0,
			[
				"Subsidised world-class medical education (AFMC)",
				"Combines trauma medicine with adventure",
				"Disaster relief"
			],
			[
				"Field/border postings",
				"Obligatory service commitment",
				"High trauma exposure"
			],
			"Look up the key symptoms differentiating mild altitude headache from dangerous HAPE/HACE emergencies.",
			[
				"openwho",
				"khanSci",
				"ncert"
			],
			"cyber"
		],
		[
			"maritime-navigation-officer",
			"Hydrographer & Naval Cartographer",
			"Ocean Charting",
			"Survey seabed depths, reefs and shipping channels so vessels and coastal ports stay safe from grounding.",
			"Operating multibeam sonar surveys, correcting tide charts and updating official nautical navigation maps.",
			[
				"Sonar & hydrography",
				"Trigonometry & geodesy",
				"GIS charting",
				"Tidal math",
				"Attention to detail"
			],
			[
				"science",
				"travel",
				"environment"
			],
			[
				"mathematics",
				"observation",
				"technical",
				"research"
			],
			[
				"Mathematics",
				"Physics",
				"Geography"
			],
			["Navy Hydrographic Cadre / National Hydrographic Office / Marine Geomatics"],
			["Offshore wind-farm seabed survey engineer"],
			["Explain why coastal ports must re-survey harbour depths after every major cyclone or river flood"],
			false,
			4,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Blends mapping, ocean science and navigation",
				"Direct safety impact on global shipping",
				"Unique niche"
			],
			[
				"Long survey vessel deployments",
				"Requires precision math & patience",
				"Small specialised corps"
			],
			"Why does measuring ocean depth by sound pulse require knowing water temperature and salinity?",
			[
				"mitocw",
				"khanSci",
				"nptel"
			],
			"data"
		],
		[
			"emergency-tactical-paramedic",
			"Combat & Disaster Rescue Paramedic",
			"Emergency Response",
			"Stabilise injured civilians or personnel in earthquakes, mountain accidents or tactical emergencies before hospital reach.",
			"Controlling bleeding rapidly, immobilising fractures safely, managing oxygen lines and coordinating medevac choppers.",
			[
				"Trauma first aid",
				"Triage speed",
				"Airway management",
				"Physical grit",
				"Radio clarity"
			],
			["healthcare", "sports"],
			[
				"fitness",
				"problem_solving",
				"teamwork",
				"observation"
			],
			[
				"Biology",
				"Physical Education",
				"Chemistry"
			],
			["EMT / Paramedic Diploma + NDRF / Medical Corps / State Disaster Rescue Forces"],
			["Mountain & adventure expedition medic"],
			["Learn the correct steps of the Recovery Position and why you never remove an embedded object in the field"],
			false,
			3,
			"Outdoors / on the move",
			"Class 12",
			500,
			[
				"Faster training route into life-saving emergency work",
				"Action-oriented teamwork",
				"Direct rescues"
			],
			[
				"Graphic trauma scenes",
				"High physical strain & odd hours",
				"Emotional decompression needed"
			],
			"Practice giving a calm 20-second emergency radio report: Location, Hazards, Patients, Need.",
			[
				"openwho",
				"khanSci",
				"ncert"
			],
			"cyber"
		],
		[
			"defence-rd-scientist",
			"Propulsion & Ballistics R&D Scientist",
			"Aerospace & Propulsion",
			"Research high-temperature materials, solid/liquid rocket propellants and aerodynamic stability safely.",
			"Running wind-tunnel or combustion simulations, inspecting telemetry graphs and documenting safety margins.",
			[
				"Fluid dynamics",
				"Thermodynamics",
				"MATLAB / Python",
				"Material stress",
				"Experimental rigour"
			],
			[
				"science",
				"technology",
				"mathematics"
			],
			[
				"mathematics",
				"research",
				"analytical",
				"critical_thinking"
			],
			[
				"Physics",
				"Mathematics",
				"Chemistry"
			],
			["B.Tech Aerospace / Mechanical / Chemical → M.Tech → DRDO / ISRO Scientist-B recruitment"],
			["Civil space launch startup propulsion engineer"],
			["Why does a rocket nozzle widen like a bell at the bottom instead of staying a straight pipe?"],
			false,
			5,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Frontier aerospace physics",
				"Transfers directly to civilian satellite launch",
				"Deep engineering craft"
			],
			[
				"Strict clearance & lab safety protocols",
				"Testing failures require patience",
				"Competitive Scientist exams"
			],
			"Explore Newton's third law in vacuum: why rockets accelerate even with no air to 'push against'.",
			[
				"nptel",
				"mitocw",
				"khanSci"
			],
			"data"
		]
	], {
		progression: [
			"Cadet / Junior Officer / Trainee",
			"Lieutenant / Flight Officer / Scientist-B",
			"Major / Commander / Senior Lead",
			"Colonel / Captain / Program Director"
		],
		freelance: "Rare in active uniformed defence; high post-service transition into aviation, cyber, logistics, and corporate leadership.",
		entrepreneurship: "Moderate-High post-service or in private defence-tech, drone, and cybersecurity startups.",
		entryLevel: "NCC, NDA/CDS/AFCAT preparation, physical fitness discipline, and technical engineering degrees.",
		costNote: "Service academy training is government-funded upon selection; NCERT & NPTEL study foundations are free."
	}),
	...expandCareers("Environment", [
		[
			"environmental-scientist",
			"Environmental Scientist & Ecologist",
			"Ecosystem Monitoring",
			"Test soil, air and rivers for contamination and design restoration plans for degraded habitats.",
			"Collecting field water samples, running lab toxicity assays, mapping species diversity and advising factories/towns.",
			[
				"Ecology & chemistry",
				"Field sampling",
				"Water/soil testing",
				"GIS mapping",
				"Impact reports"
			],
			[
				"environment",
				"science",
				"travel"
			],
			[
				"research",
				"observation",
				"analytical",
				"writing"
			],
			[
				"Biology",
				"Chemistry",
				"Environmental Studies",
				"Geography"
			],
			["B.Sc. Environmental Science / Life Sciences → M.Sc. Environmental Science / Ecology"],
			["Factory environmental compliance & EIA auditor"],
			["Check a local pond or drain for 3 visual indicators of nutrient algae overload vs healthy clear flow"],
			false,
			4,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Mix of outdoor fieldwork and lab science",
				"Direct defence of local rivers & biodiversity",
				"Purpose-driven"
			],
			[
				"Can clash with polluting industrial pressures",
				"Muddy/hot field days",
				"Master's boosts senior prospects"
			],
			"Explain why measuring dissolved oxygen tells far more about river health than simply looking at water colour.",
			[
				"unccl",
				"khanSci",
				"nptel"
			],
			"data"
		],
		[
			"renewable-energy-engineer",
			"Solar & Wind Renewable Energy Engineer",
			"Clean Power Engineering",
			"Design, size and connect solar farms, rooftop microgrids, wind turbines and battery storage.",
			"Calculating solar irradiance yields, wiring inverter protection, inspecting panel degradation and balancing loads.",
			[
				"Electrical power systems",
				"PV sizing & shading",
				"Battery storage",
				"Grid integration",
				"CAD / PVsyst"
			],
			[
				"environment",
				"technology",
				"science"
			],
			[
				"technical",
				"mathematics",
				"problem_solving",
				"analytical"
			],
			[
				"Physics",
				"Mathematics",
				"Chemistry"
			],
			["B.Tech Electrical / Mechanical / Energy Engg → Solar/Wind project developer or M.Tech Energy"],
			["Commercial rooftop solar entrepreneur"],
			["Estimate how many 400W rooftop solar panels a home using 8 kWh/day needs under 4.5 peak sun hours"],
			true,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Booming clean-energy sector",
				"Visible clean power plants",
				"Great mix of field sites and engineering"
			],
			[
				"Hot desert/rooftop site inspections",
				"Grid curtailment policy bottlenecks",
				"High-voltage safety rigour"
			],
			"Observe how even a tiny afternoon chimney shadow across two solar cells drops output of a whole panel string.",
			[
				"nptel",
				"unccl",
				"mitocw"
			],
			"data"
		],
		[
			"wildlife-conservationist",
			"Wildlife Biologist & Conservationist",
			"Biodiversity Protection",
			"Study wild habitats, reduce human-wildlife conflict and protect endangered corridors with local communities.",
			"Setting camera traps, logging bird/mammal transects, partnering with forest guards and running community workshops.",
			[
				"Species identification",
				"Camera-trap stats",
				"Community conflict empathy",
				"Field navigation",
				"Grant writing"
			],
			[
				"environment",
				"science",
				"travel",
				"social"
			],
			[
				"observation",
				"research",
				"fitness",
				"communication"
			],
			[
				"Biology",
				"Geography",
				"Environmental Studies"
			],
			["B.Sc. Zoology/Botany/Forestry → M.Sc. Wildlife Biology (WII / NCBS / universities)"],
			["Nature conservation NGO coordinator"],
			["Use a birding checklist around your neighbourhood for 15 minutes and note which trees attract the most birds"],
			false,
			4,
			"Outdoors / on the move",
			"Postgraduate / Licensing",
			500,
			[
				"Deep immersion in forests and wildlife",
				"Meaningful coexistence work with villagers",
				"Passionate peers"
			],
			[
				"Remote postings & insect/weather discomfort",
				"Competitive fellowships & NGO pay",
				"Human-animal conflict stress"
			],
			"Why do narrow forested 'wildlife corridors' between two reserves matter almost as much as park size?",
			[
				"unccl",
				"fao",
				"khanSci"
			],
			"data"
		],
		[
			"urban-forestry-ecologist",
			"Urban Forestry & Rewilding Specialist",
			"Green Cities",
			"Cool urban heat islands and restore native biodiversity using smart street-tree planning and mini-forests.",
			"Auditing root space and native species mix, testing urban soil compaction and advising city parks teams.",
			[
				"Native botany",
				"Soil & heat mapping",
				"Tree-care safety",
				"Community tree drives",
				"Urban ecology"
			],
			[
				"environment",
				"design",
				"social"
			],
			[
				"observation",
				"creativity",
				"organisation",
				"communication"
			],
			[
				"Biology",
				"Geography",
				"Environmental Studies"
			],
			["B.Sc. Botany / Forestry / Horticulture / Landscape Architecture"],
			["Campus & corporate campus native rewilding designer"],
			["Walk down two streets—one bare asphalt, one shaded by wide native trees—and compare comfort and bird life"],
			true,
			2,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Cools neighbourhoods immediately",
				"Visible green legacy",
				"Accessible volunteer starting points"
			],
			[
				"Municipal neglect kills poorly planted saplings",
				"Limited dedicated city forester budgets",
				"Slow tree growth"
			],
			"Why does planting 1,000 fast-growing non-native eucalyptus trees often hurt groundwater and birds vs 200 native trees?",
			[
				"fao",
				"unccl",
				"ncert"
			],
			"uiux"
		],
		[
			"water-resources-hydrologist",
			"Water Resources & Watershed Hydrologist",
			"Water Security",
			"Restore aquifers, design rainwater harvesting and model river basin floods and droughts sustainably.",
			"Measuring groundwater bore levels, designing contour check-dams, running runoff models and advising panchayats.",
			[
				"Hydrology & rainfall math",
				"GIS watershed mapping",
				"Aquifer recharge",
				"Civil basics",
				"Community engagement"
			],
			[
				"environment",
				"science",
				"agriculture",
				"government"
			],
			[
				"analytical",
				"mathematics",
				"problem_solving",
				"research"
			],
			[
				"Geography",
				"Physics",
				"Mathematics"
			],
			["B.Tech Civil / Agricultural Engg or B.Sc. Geology → M.Tech Hydrology / Water Resources"],
			["Urban rainwater-harvesting & lake-restoration consultant"],
			["Calculate how many litres of rain fall on a 100 sq m roof during a single 50mm monsoon downpour"],
			false,
			4,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Solves one of humanity's sharpest future crises",
				"Combines geology, math and community impact",
				"High demand"
			],
			[
				"Conflicting water-rights politics",
				"Extreme flood/drought emergencies",
				"Field mud & travel"
			],
			"Trace why paving every courtyard forces storm drains to flood while porous recharge pits refill wells.",
			[
				"nptel",
				"unccl",
				"fao"
			],
			"data"
		],
		[
			"waste-circular-economy-specialist",
			"Zero-Waste & Circular Economy Strategist",
			"Resource Recovery",
			"Redesign campus, municipal and factory waste streams so plastics, e-waste and organics get recovered safely.",
			"Conducting waste composition audits, setting up wet-waste composting and matching recyclers with clean feedstock.",
			[
				"Material recovery flows",
				"Composting science",
				"Behaviour change",
				"Logistics costing",
				"Safety compliance"
			],
			[
				"environment",
				"business",
				"design"
			],
			[
				"organisation",
				"problem_solving",
				"communication",
				"analytical"
			],
			[
				"Environmental Studies",
				"Chemistry",
				"Business Studies"
			],
			["Env Engineering / Sustainability / Management + waste-startup or municipal solid-waste roles"],
			["E-waste & industrial byproduct exchange entrepreneur"],
			["Separate one day of household trash and notice how mixing wet food scraps ruins clean dry paper for recycling"],
			true,
			2,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Immediate visible drop in landfill waste",
				"Strong social-enterprise potential",
				"Practical problem-solving"
			],
			[
				"Unpleasant waste-yard site visits",
				"Informal sector integration takes sensitivity",
				"Thin recycler margins"
			],
			"Design a 3-bin hostel corridor setup whose colour and icons prevent sleepy students from tossing coffee cups in paper.",
			[
				"unccl",
				"fao",
				"courseraAudit"
			],
			"uiux"
		],
		[
			"carbon-footprint-auditor",
			"Carbon Accounting & Verification Auditor",
			"Climate Measurement",
			"Measure Scope 1, 2 and 3 greenhouse emissions accurately and verify whether green claims hold real proof.",
			"Auditing electricity bills, freight fuel logs and factory processes against ISO/GHG Protocol emission factors.",
			[
				"GHG Protocol math",
				"Spreadsheet auditing",
				"Energy unit conversion",
				"Scepticism",
				"Verification reporting"
			],
			[
				"environment",
				"finance",
				"mathematics"
			],
			[
				"analytical",
				"mathematics",
				"critical_thinking",
				"observation"
			],
			[
				"Mathematics",
				"Chemistry",
				"Economics",
				"Environmental Studies"
			],
			["B.Tech / B.Sc. / Commerce + GHG Accounting certification (ISO 14064 / UN CC:Learn)"],
			["Independent ESG & carbon-project verifier"],
			["Look up why Scope 3 supply-chain emissions are usually 5x bigger—and harder to measure—than office electricity"],
			true,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"High-integrity role combating fake offsets",
				"Bridges finance and climate",
				"Remote auditing possible"
			],
			[
				"Tedious spreadsheet & utility-bill chasing",
				"Pressure from clients wanting flattering numbers",
				"Standard shifts"
			],
			"Calculate rough annual CO2 from commuting 20km daily by solo petrol car vs metro train.",
			[
				"unccl",
				"varsity",
				"kaggle"
			],
			"data"
		],
		[
			"climate-adaptation-planner",
			"Climate Resilience & Heatwave Planner",
			"Adaptation Policy",
			"Prepare cities and vulnerable workers for extreme heat, coastal flooding and shifting monsoons.",
			"Mapping urban cool shelters, writing hospital heat-action plans, shifting outdoor work hours and advising mayors.",
			[
				"Vulnerability mapping",
				"Heat-health policy",
				"GIS",
				"Stakeholder coordination",
				"Communication"
			],
			[
				"environment",
				"government",
				"social",
				"healthcare"
			],
			[
				"research",
				"leadership",
				"communication",
				"organisation"
			],
			[
				"Geography",
				"Environmental Studies",
				"Political Science",
				"Economics"
			],
			["Urban Planning / Public Health / Env Studies → Climate Adaptation fellowships"],
			["Insurance climate-risk & municipal resilience advisor"],
			["Identify 4 zero-cost heatwave protections a city can roll out in one week for outdoor delivery & construction workers"],
			true,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Protects vulnerable workers directly today",
				"Fast-growing municipal need",
				"Interdisciplinary"
			],
			[
				"Limited dedicated city budgets",
				"Must persuade many departments",
				"Heavy crisis reporting in summer"
			],
			"Compare 'mitigation' (cutting emissions) vs 'adaptation' (cool roofs & flood barriers)—why do cities need both?",
			[
				"unccl",
				"openwho",
				"swayam"
			],
			"uiux"
		],
		[
			"marine-conservation-biologist",
			"Marine & Mangrove Restoration Biologist",
			"Coastal Ecosystems",
			"Protect coral reefs, seagrass beds and mangrove forests that shield coasts and sustain fishing families.",
			"Surveying tidal mudflats, planting native mangrove nurseries, tracking fish stocks and working with fisherfolk.",
			[
				"Coastal ecology",
				"Water chemistry",
				"Community co-management",
				"GIS",
				"Field resilience"
			],
			[
				"environment",
				"science",
				"travel"
			],
			[
				"observation",
				"research",
				"fitness",
				"teamwork"
			],
			[
				"Biology",
				"Geography",
				"Chemistry"
			],
			["B.Sc. Marine Biology / Zoology → M.Sc. Marine Conservation / Coastal Management"],
			["Blue-carbon & coastal NGO specialist"],
			["Why do coastal mangrove roots prevent storm waves from eroding villages far better than concrete seawalls alone?"],
			false,
			4,
			"Outdoors / on the move",
			"Postgraduate / Licensing",
			500,
			[
				"Protects vital marine nurseries & coastlines",
				"Vibrant underwater & coastal work",
				"Community impact"
			],
			[
				"Seasonal cyclone/tide constraints",
				"Remote field stations",
				"Competitive conservation grants"
			],
			"Trace a simple coastal food web showing what collapses if juvenile fish lose mangrove nursery roots.",
			[
				"unccl",
				"fao",
				"khanSci"
			],
			"data"
		],
		[
			"gis-environmental-mapper",
			"GIS & Environmental Mapping Specialist",
			"Geospatial Ecology",
			"Turn drone, GPS and satellite layers into interactive maps showing deforestation, soil erosion or flood risk.",
			"Cleaning shapefile layers in QGIS, running NDVI vegetation health indices and designing clear decision maps.",
			[
				"QGIS / ArcGIS",
				"Remote sensing (NDVI)",
				"Python GeoPandas",
				"Cartographic clarity",
				"Spatial stats"
			],
			[
				"environment",
				"technology",
				"mathematics"
			],
			[
				"technical",
				"analytical",
				"observation",
				"creativity"
			],
			[
				"Geography",
				"Computer Science",
				"Mathematics"
			],
			["B.Sc. Geography/Env Sci or B.Tech → PG Diploma/M.Sc. Geoinformatics (open QGIS projects)"],
			["Freelance solar-site & conservation mapper"],
			["Explain how healthy green leaves reflect near-infrared light differently from dry bare soil on satellite sensors"],
			true,
			3,
			"Remote / from home",
			"Undergraduate Degree",
			0,
			[
				"Free pro open-source software (QGIS)",
				"Remote-friendly spatial tech",
				"Used across forestry, water & cities"
			],
			[
				"Large raster files tax slow computers",
				"Coordinate-projection bugs",
				"Niche job titles"
			],
			"Draw a mental map of 3 data layers you'd stack to pick the best site for a new rural check-dam.",
			[
				"kaggle",
				"unccl",
				"nptel"
			],
			"data"
		],
		[
			"solar-microgrid-technician",
			"Decentralised Solar Microgrid & EV Charging Specialist",
			"Clean Energy Access",
			"Install and maintain off-grid solar mini-grids for remote villages, clinics and electric-vehicle hubs.",
			"Wiring DC/AC charge controllers safely, checking battery cell balance, training local operators and billing meters.",
			[
				"Electrical safety",
				"Solar PV & battery wiring",
				"Fault diagnostics",
				"Community training",
				"Hands-on tools"
			],
			[
				"environment",
				"technology",
				"social"
			],
			[
				"technical",
				"problem_solving",
				"fitness",
				"communication"
			],
			["Physics", "Mathematics"],
			["ITI Electrician / Polytechnic Electrical Diploma + Suryamitra / Skill India Solar Training"],
			["District clean-energy installation entrepreneur"],
			["Why do off-grid village clinics need deep-cycle battery storage paired with solar panels?"],
			true,
			2,
			"Outdoors / on the move",
			"Diploma / Certificate",
			500,
			[
				"Fast practical entry without 4-year degree",
				"Brings clean light & cold-chain vaccine fridges to villages",
				"Growing"
			],
			[
				"Outdoor rooftop/pole physical work",
				"Strict electrocution & arc-flash safety",
				"Rural travel"
			],
			"Spot why matching DC voltage between panels, charge controller and battery bank prevents burnt equipment.",
			[
				"nptel",
				"ncert",
				"unccl"
			],
			"cyber"
		],
		[
			"air-quality-analyst",
			"Air Quality & Atmospheric Monitoring Analyst",
			"Clean Air Science",
			"Measure PM2.5, ozone and industrial emissions to trace pollution sources and verify clean-air actions.",
			"Calibrating roadside sensor networks, checking wind-rose source trajectories and briefing city health teams.",
			[
				"Sensor calibration",
				"Data cleaning (Python/R)",
				"Atmospheric chemistry",
				"Source apportionment",
				"Visual reports"
			],
			[
				"environment",
				"science",
				"healthcare",
				"technology"
			],
			[
				"analytical",
				"technical",
				"research",
				"communication"
			],
			[
				"Chemistry",
				"Physics",
				"Mathematics",
				"Computer Science"
			],
			["B.Tech Env/Chemical or B.Sc. Physics/Chem + Air quality monitoring fellowships"],
			["Smart-building indoor air quality engineer"],
			["Explain why wind speed and winter temperature inversions trap smog low over cities even on Sundays"],
			true,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Directly linked to respiratory public health",
				"Mixes hardware sensors and data science",
				"Urgent urban need"
			],
			[
				"Low-cost sensors drift in high humidity",
				"Politically sensitive pollution findings",
				"Niche sector"
			],
			"Check your city's daily AQI chart and see how morning traffic peaks vs afternoon wind mixing shift levels.",
			[
				"unccl",
				"kaggle",
				"nptel"
			],
			"data"
		],
		[
			"ecotourism-naturalist",
			"Naturalist Guide & Responsible Ecotourism Lead",
			"Nature Interpretation",
			"Lead ethical wildlife, birding or mountain treks that educate visitors while protecting habitats and local livelihoods.",
			"Identifying tracks and bird calls, enforcing leave-no-trace distance rules and running night-sky or forest walks.",
			[
				"Natural history",
				"Group safety & first aid",
				"Storytelling",
				"Leave-no-trace ethics",
				"Local language"
			],
			[
				"environment",
				"travel",
				"sports",
				"social"
			],
			[
				"communication",
				"observation",
				"fitness",
				"public_speaking"
			],
			[
				"Biology",
				"Geography",
				"English"
			],
			["Any degree + Naturalist certification / Mountaineering & Wilderness First Aid / Eco-lodge training"],
			["Outdoor experiential school-camp director"],
			["Spend 10 minutes observing a single garden tree—find 5 insects, birds or bark textures most walkers miss"],
			false,
			2,
			"Outdoors / on the move",
			"Class 12",
			500,
			[
				"Outdoor life sharing wonder with people",
				"Supports conservation economics",
				"Low classroom barrier"
			],
			[
				"Seasonal monsoon closures",
				"Physical walking & weather exposure",
				"Unpredictable tourist waves"
			],
			"Practice turning a dry fact ('this tree is Ficus religiosa') into a vivid 2-sentence ecological story.",
			[
				"ncert",
				"unccl",
				"fao"
			],
			"marketing"
		]
	], {
		progression: [
			"Field Technician / Junior Analyst",
			"Specialist / Project Officer",
			"Senior Ecologist / Lead Engineer",
			"Program Director or Principal Consultant"
		],
		freelance: "Moderate-High — ESG/carbon audits, GIS mapping, rainwater design, and ecotourism guiding.",
		entrepreneurship: "High — solar installation firms, zero-waste startups, eco-tourism, and environmental testing labs.",
		entryLevel: "Citizen science (eBird/iNaturalist), campus sustainability audits, UN CC:Learn, and field volunteering.",
		costNote: "UN CC:Learn, FAO, and QGIS are completely free; specialised lab gear lives at universities/employers."
	}),
	...expandCareers("Hospitality", [
		[
			"hotel-operations-manager",
			"Hotel & Resort Operations Manager",
			"Hospitality Leadership",
			"Orchestrate guest comfort, front desk, housekeeping, dining and safety seamlessly across a property.",
			"Doing morning floor inspections, resolving tricky guest complaints with grace, coaching shift teams and checking occupancy.",
			[
				"Service recovery",
				"Team scheduling",
				"Budget & occupancy math",
				"Eye for detail",
				"Calm warmth"
			],
			[
				"hospitality" in ["business"] ? "business" : "business",
				"travel",
				"social"
			],
			[
				"leadership",
				"organisation",
				"communication",
				"problem_solving"
			],
			[
				"English",
				"Business Studies",
				"Economics"
			],
			["NCHMCT JEE → B.Sc. Hospitality & Hotel Administration (IHM) / BBA Hospitality + Management Trainee"],
			["Boutique homestay & heritage-property manager"],
			["How would you turn a double-booked room mistake into a moment that makes the guest feel cared for?"],
			false,
			3,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			1e3,
			[
				"Dynamic people-first leadership",
				"Global hotel chain mobility",
				"Clear management trainee tracks"
			],
			[
				"Long hours on weekends, festivals and holidays",
				"Standing/walking shifts",
				"Handling demanding guests calmly"
			],
			"Walk into any reception lobby and spot 3 tiny details—lighting, smell, signage—that signal care or neglect.",
			[
				"courseraAudit",
				"swayam",
				"skillshop"
			],
			"uiux"
		],
		[
			"culinary-chef",
			"Culinary Chef & Kitchen Innovator",
			"Culinary Arts",
			"Design memorable menus, master cooking techniques, manage food costs and lead high-energy kitchen brigades.",
			"Tasting prep batches, balancing plating speed with consistency, training commis chefs and minimising food waste.",
			[
				"Heat & knife mastery",
				"Flavour balancing",
				"Food safety (HACCP)",
				"Kitchen leadership",
				"Waste/cost math"
			],
			[
				"art",
				"science",
				"business",
				"travel"
			],
			[
				"creativity",
				"leadership",
				"teamwork",
				"fitness"
			],
			[
				"Chemistry",
				"Biology",
				"Business Studies"
			],
			["Culinary Arts Degree / IHM / Apprentice line-cook progression inside quality kitchens"],
			["R&D food-product chef or independent café founder"],
			["Cook one simple dish twice—changing ONLY heat timing or acid at the end—and taste the clear difference"],
			false,
			4,
			"Lab or studio",
			"Class 12",
			1e3,
			[
				"Creative tactile craft feeding people joy",
				"Strong entrepreneurial path",
				"Deep regional food preservation"
			],
			[
				"Intense heat, burns and standing 10+ hours",
				"Weekend/night peak service",
				"High kitchen stress"
			],
			"Plan 3 zero-waste ways a restaurant can reuse vegetable peels, stems or leftover bread cleanly into new dishes.",
			[
				"fao",
				"swayam",
				"khanSci"
			],
			"uiux"
		],
		[
			"pastry-artisan-baker",
			"Pastry Chef & Artisan Baker",
			"Baking & Confectionery",
			"Combine precision chemistry, fermentation and delicate decoration to craft breads, pastries and desserts.",
			"Starting dough fermentation pre-dawn, checking oven humidity, tempering chocolate and pricing batch ingredients.",
			[
				"Baking ratios & science",
				"Fermentation timing",
				"Decoration detail",
				"Temperature control",
				"Batch costing"
			],
			[
				"art",
				"science",
				"design"
			],
			[
				"creativity",
				"observation",
				"organisation",
				"technical"
			],
			[
				"Chemistry",
				"Mathematics",
				"Fine Arts"
			],
			["Diploma/B.A. Bakery & Patisserie / Home-baker → commercial artisan kitchen"],
			["Allergen-friendly / gluten-free specialty bakery founder"],
			["Look up why weighing flour in grams gives far more consistent bread than using scoop cups"],
			false,
			3,
			"Lab or studio",
			"Class 10+",
			500,
			[
				"Rewarding blend of edible art and kitchen chemistry",
				"Can start practising in a home oven",
				"Local micro-bakery route"
			],
			[
				"Pre-dawn baking shifts",
				"Physically repetitive tray lifting",
				"Exact ingredient margin pressures"
			],
			"Calculate the exact ingredient cost per cookie including electricity, packaging and 10% spoilage.",
			[
				"khanSci",
				"varsity",
				"swayam"
			],
			"data"
		],
		[
			"sustainable-tourism-planner",
			"Sustainable Tourism & Experience Curator",
			"Responsible Travel",
			"Design curated travel itineraries that delight guests while keeping profits with local homestays and craftspeople.",
			"Vetting local eco-stays, crafting slow cultural trails, training hosts and calculating fair community splits.",
			[
				"Destination research",
				"Itinerary pacing",
				"Community partnerships",
				"Crisis backup plans",
				"Storytelling"
			],
			[
				"travel",
				"environment",
				"history",
				"business"
			],
			[
				"organisation",
				"communication",
				"creativity",
				"research"
			],
			[
				"Geography",
				"History",
				"English",
				"Business Studies"
			],
			["B.A./MBA Travel & Tourism Management (IITTM) / Independent boutique tour founder"],
			["Corporate offsite & educational field-trip curator"],
			["Design a 2-day slow weekend trail in your district featuring 3 local artisans and zero plastic bottles"],
			true,
			2,
			"Outdoors / on the move",
			"Class 12",
			0,
			[
				"Turns curiosity about places & history into livelihoods",
				"Low capital to pilot small group walks",
				"Meaningful"
			],
			[
				"Seasonal tourism slumps",
				"Weather or transport disruptions",
				"24/7 responsibility when guests travel"
			],
			"Spot why packing 9 landmarks into 1 day exhausts travellers compared to 2 deep experiences with local stories.",
			[
				"khanHum",
				"unccl",
				"skillshop"
			],
			"marketing"
		],
		[
			"event-experience-director",
			"Events, Conferences & Wedding Producer",
			"Live Experiences",
			"Turn empty halls or lawns into seamless conferences, music festivals or family celebrations on strict timelines.",
			"Aligning florists, AV crews, caterers and security, managing vendor budgets and solving backstage hiccups quietly.",
			[
				"Vendor coordination",
				"Run-of-show timing",
				"Budget control",
				"Calm troubleshooting",
				"Spatial aesthetics"
			],
			[
				"business",
				"design",
				"social",
				"music"
			],
			[
				"organisation",
				"leadership",
				"problem_solving",
				"communication"
			],
			[
				"Business Studies",
				"English",
				"Fine Arts"
			],
			["BBA / Event Management Diploma / College cultural fest core committee → agency producer"],
			["Tech summit & community festival producer"],
			["Build a 12-row minute-by-minute checklist for a 2-hour college auditorium event including soundcheck buffer"],
			false,
			2,
			"Outdoors / on the move",
			"Class 12",
			0,
			[
				"Exciting creative-logistics energy",
				"Visible celebrations & reunions",
				"Fast entry via assisting live events"
			],
			[
				"Sleepless event weeks and last-minute vendor flakes",
				"Weekend/night peak schedule",
				"Cashflow chasing"
			],
			"What 3 backups should be ready outdoors in case rain hits 40 minutes before guests arrive?",
			[
				"courseraAudit",
				"skillshop",
				"figma"
			],
			"marketing"
		],
		[
			"airline-cabin-safety-crew",
			"Airline Cabin Safety & In-Flight Crew",
			"Aviation Hospitality",
			"Ensure passenger cabin safety, emergency evacuations, first aid and warm hospitality at 35,000 feet.",
			"Checking safety oxygen/exit gear pre-boarding, briefing passengers, calming anxious flyers and handling medical kits.",
			[
				"Emergency evacuation drills",
				"CPR/first aid",
				"Conflict de-escalation",
				"Cross-cultural grace",
				"Team sync"
			],
			[
				"travel",
				"social",
				"healthcare"
			],
			[
				"communication",
				"teamwork",
				"observation",
				"fitness"
			],
			[
				"English",
				"Geography",
				"Biology"
			],
			["Class 12 + Airline Cabin Crew Induction Training (no expensive private institute required — apply directly to airlines)"],
			["Airport VIP lounge & safety training instructor"],
			["Explain why flight attendants instruct passengers to put on their OWN oxygen mask before helping children"],
			false,
			2,
			"Outdoors / on the move",
			"Class 12",
			0,
			[
				"Global travel perks without paying for university",
				"Serious life-saving safety training",
				"Direct airline hiring"
			],
			[
				"Jet lag and irregular night/holiday rosters",
				"Standing in narrow aisles",
				"Strict airline grooming/height norms"
			],
			"Practice de-escalating an angry passenger over a delayed bag using calm posture and 2 helpful options.",
			[
				"openwho",
				"swayam",
				"courseraAudit"
			],
			"uiux"
		],
		[
			"airport-operations-coordinator",
			"Airport Terminal & Ground Operations Coordinator",
			"Aviation Logistics",
			"Keep aircraft turnarounds, baggage sorting, passenger boarding gates and ramp safety running like clockwork.",
			"Tracking gate turnaround timers (cleaning, fuelling, boarding), resolving missed connections and auditing ramp safety.",
			[
				"Turnaround timing",
				"Aviation safety rules",
				"Crisis comms",
				"Crew dispatch",
				"Software tracking"
			],
			[
				"travel",
				"business",
				"technology"
			],
			[
				"organisation",
				"problem_solving",
				"leadership",
				"teamwork"
			],
			[
				"Mathematics",
				"Physics",
				"English",
				"Business Studies"
			],
			["Aviation Management BBA / Operations Degree / Direct airline airport-ops trainee"],
			["Air cargo & cold-chain logistics coordinator"],
			["Trace the 8 parallel tasks that must finish in 35 minutes between a plane landing and taking off again"],
			false,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Fast-paced orchestrating of complex machinery & people",
				"Inside look at global aviation",
				"Clear shift handover"
			],
			[
				"24/7 shift rotations and fog/storm delay stress",
				"Loud tarmac environments",
				"Tight turnaround timers"
			],
			"Why do airlines board window-to-aisle or back-to-front poorly when overhead bin jams happen?",
			[
				"courseraAudit",
				"nptel",
				"mslearn"
			],
			"data"
		],
		[
			"food-beverage-director",
			"Food & Beverage (F&B) Operations Manager",
			"Dining & Supply",
			"Oversee multiple restaurants, café menus, supplier quality, liquor/hygiene compliance and guest satisfaction.",
			"Negotiating fresh produce contracts, checking kitchen wastage ratios, reviewing staff training and launching seasonal menus.",
			[
				"P&L budgeting",
				"Menu engineering",
				"Supplier audits",
				"Staff coaching",
				"Hygiene compliance"
			],
			["business", "hospitality" in ["social"] ? "social" : "social"],
			[
				"leadership",
				"analytical",
				"organisation",
				"communication"
			],
			[
				"Business Studies",
				"Accountancy",
				"Economics"
			],
			["B.Sc. Hospitality (IHM) / BBA → Restaurant Captain / Beverage Ops → F&B Manager"],
			["Cloud-kitchen brand portfolio manager"],
			["Learn why placing a high-margin dessert near eye level on a menu changes average table profit dramatically"],
			false,
			3,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			500,
			[
				"Fast promotion path in growing dining sectors",
				"Mixes culinary taste with hard finance",
				"Entrepreneurial prep"
			],
			[
				"Late night closing checks",
				"Thin restaurant profit margins",
				"High frontline staff turnover"
			],
			"Calculate food-cost percentage when dish ingredients cost ₹90 and the menu price is ₹300.",
			[
				"varsity",
				"fao",
				"courseraAudit"
			],
			"data"
		],
		[
			"heritage-lodge-manager",
			"Eco-Lodge & Heritage Homestay Manager",
			"Boutique Hospitality",
			"Run intimate boutique stays celebrating regional architecture, home-cooked cuisine and tranquil nature.",
			"Welcoming small guest groups personally, managing solar/water backups, coordinating local cooks and online bookings.",
			[
				"Personalised hosting",
				"Property maintenance",
				"Digital booking channels",
				"Local sourcing",
				"Bookkeeping"
			],
			[
				"travel",
				"environment",
				"history",
				"entrepreneurship"
			],
			[
				"communication",
				"organisation",
				"leadership",
				"creativity"
			],
			[
				"Business Studies",
				"History",
				"English",
				"Geography"
			],
			["Hospitality degree or any UG + internship at boutique eco/heritage properties"],
			["Launch an ancestral-home farmstay or mountain lodge"],
			["Design a 1-page welcome card for out-of-state guests explaining local village etiquette, trails and hidden gems"],
			false,
			2,
			"Outdoors / on the move",
			"Class 12",
			500,
			[
				"Human-scale warmth over giant cookie-cutter hotels",
				"Live in scenic rural/mountain regions",
				"Entrepreneurial"
			],
			[
				"Handling plumbing/power fixes in remote locations",
				"Seasonal off-peak cashflow",
				"24/7 host availability"
			],
			"Spot 3 ways a small 6-room guesthouse can delight guests better than a 300-room luxury chain.",
			[
				"skillshop",
				"unccl",
				"swayam"
			],
			"marketing"
		],
		[
			"corporate-travel-consultant",
			"Corporate & Expedition Travel Logistics Planner",
			"Mobility & Travel Ops",
			"Plan complex multi-city visas, group flights, insurance and risk support for research teams, sports squads or firms.",
			"Optimising flight connections, verifying visa rules, negotiating group rates and rebooking cancelled routes fast.",
			[
				"Visa & route rules",
				"Cost optimisation",
				"Emergency rebooking",
				"Attention to detail",
				"Client calm"
			],
			["travel", "business"],
			[
				"organisation",
				"problem_solving",
				"communication",
				"analytical"
			],
			[
				"Geography",
				"English",
				"Economics"
			],
			["Tourism Diploma / Any degree + GDS booking systems (Amadeus/Sabre) training"],
			["Sports team & academic conference travel manager"],
			["Plan a 2-stop rail+flight itinerary for a 15-member college football squad within a tight ₹60,000 budget"],
			false,
			2,
			"Remote / from home",
			"Class 12",
			0,
			[
				"Desk/remote friendly travel career",
				"Saves groups huge stress when strikes/weather hit",
				"Global geography"
			],
			[
				"Urgent midnight flight-cancellation rescues",
				"Strict airline refund fees",
				"Routine ticketing tasks"
			],
			"Always check why a 45-minute international airport transfer is a trap when checked bags or immigration apply.",
			[
				"courseraAudit",
				"skillshop",
				"khanEcon"
			],
			"data"
		],
		[
			"food-safety-hygiene-auditor",
			"Food Safety & Quality Assurance Auditor (FSSAI/HACCP)",
			"Food & Kitchen Safety",
			"Inspect commercial kitchens, cloud kitchens and food factories to prevent foodborne illness.",
			"Checking fridge cold-chain logs, swabbing prep surfaces, reviewing allergen labels and training kitchen staff.",
			[
				"Microbiology basics",
				"FSSAI / HACCP rules",
				"Inspection rigour",
				"Staff coaching",
				"Report writing"
			],
			[
				"science",
				"healthcare",
				"business"
			],
			[
				"observation",
				"critical_thinking",
				"organisation",
				"communication"
			],
			["Biology", "Chemistry"],
			["B.Sc. Food Technology / Microbiology / Home Science + FSSAI FoSTaC / ISO 22000 Lead Auditor"],
			["Independent restaurant & factory hygiene consultant"],
			["Why must raw chicken never be chopped on the same unwashed wooden board used right after for salad cucumbers?"],
			false,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			500,
			[
				"Directly protects public health",
				"Steady regulatory compliance demand",
				"Clear scientific standards"
			],
			[
				"Delivering tough fail notices to kitchen owners",
				"Standing inspections across factories",
				"Detail fatigue"
			],
			"Inspect your home fridge shelves and note the safest vertical order (cooked/ready-to-eat top, raw bottom).",
			[
				"fao",
				"openwho",
				"nptel"
			],
			"cyber"
		],
		[
			"wellness-retreat-coordinator",
			"Wellness, Yoga & Culinary Retreat Coordinator",
			"Restorative Hospitality",
			"Curate calm multi-day retreats combining restorative movement, wholesome meals, nature walks and digital detox.",
			"Scheduling instructors, checking dietary allergies, maintaining peaceful spaces and handling guest logistics quietly.",
			[
				"Program pacing",
				"Allergy & safety care",
				"Vendor coordination",
				"Warm discretion",
				"Marketing"
			],
			[
				"travel",
				"healthcare",
				"sports",
				"social"
			],
			[
				"organisation",
				"communication",
				"creativity",
				"teamwork"
			],
			[
				"Biology",
				"Physical Education",
				"English"
			],
			["Hospitality / Wellness Management / Yoga certification + retreat operations experience"],
			["Corporate burnout-recovery retreat designer"],
			["Balance a 3-day retreat schedule so guests feel rested—avoiding packing workshops back-to-back like school"],
			true,
			2,
			"Outdoors / on the move",
			"Class 12",
			500,
			[
				"Peaceful restorative environments",
				"Growing global wellness travel trend",
				"Creative holistic curation"
			],
			[
				"Emotional expectations from stressed guests",
				"Remote venue logistics",
				"Marketing cycles"
			],
			"Design a 1-day nature retreat flow balancing guided movement, quiet reading hours and unhurried meals.",
			[
				"openwho",
				"skillshop",
				"courseraAudit"
			],
			"uiux"
		],
		[
			"cruise-hospitality-officer",
			"Cruise Ship Guest & Purser Officer",
			"Maritime Hospitality",
			"Manage passenger check-in, shore excursions, crew welfare and international customs across multi-week voyages.",
			"Resolving cabin requests, clearing port immigration manifests, coordinating excursion buses and running safety drills.",
			[
				"Multicultural fluency",
				"Maritime guest ops",
				"Customs manifests",
				"Calm crisis poise",
				"Scheduling"
			],
			[
				"travel",
				"business",
				"social"
			],
			[
				"communication",
				"organisation",
				"leadership",
				"problem_solving"
			],
			[
				"English",
				"Geography",
				"Business Studies"
			],
			["Hospitality Degree (IHM) / Hotel front-office experience + STCW maritime safety certificate"],
			["International port & ferry terminal manager"],
			["How do you communicate clearly and respectfully to an upset guest who doesn't speak your first language well?"],
			false,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			1e3,
			[
				"See coastal countries while saving living expenses onboard",
				"Rapid multinational team growth",
				"Dynamic"
			],
			[
				"Working 7 days/week for 4–6 month ship contracts",
				"Tiny crew cabins",
				"Long time away from family"
			],
			"Plan the boarding order for 600 guests going on 4 different port bus tours within 45 minutes.",
			[
				"courseraAudit",
				"swayam",
				"skillshop"
			],
			"uiux"
		]
	], {
		progression: [
			"Trainee / Commis / Associate",
			"Supervisor / Coordinator",
			"Operations Manager",
			"General Manager or Experience Director"
		],
		freelance: "High — event production, culinary consulting, travel curation, and hygiene auditing offer contract paths.",
		entrepreneurship: "Very High — cafés, cloud kitchens, boutique homestays, bakeries, and tour companies.",
		entryLevel: "IHM/hospitality internships, college event committees, home culinary/baking projects, and hotel shifts.",
		costNote: "Hospitality basics and digital tools are free; formal IHM degrees or STCW maritime safety carry fees."
	}),
	...expandCareers("Engineering", [
		[
			"mechanical-engineer",
			"Mechanical & CAD Design Engineer",
			"Machines & Thermal Systems",
			"Design gears, HVAC cooling, manufacturing jigs and consumer hardware that withstand real forces reliably.",
			"Modelling assemblies in CAD, running thermal/stress checks, selecting bearings and collaborating with machinists.",
			[
				"CAD modelling",
				"Thermodynamics & mechanics",
				"Material tolerances",
				"DFM manufacturing",
				"Root-cause testing"
			],
			[
				"technology",
				"science",
				"design"
			],
			[
				"problem_solving",
				"mathematics",
				"technical",
				"creativity"
			],
			[
				"Physics",
				"Mathematics",
				"Chemistry"
			],
			["B.Tech / B.E. Mechanical Engineering", "Polytechnic Diploma → B.Tech lateral entry"],
			["3D-printing & hardware prototyping consultant"],
			["Look at a folding umbrella hinge and notice which single thin pin carries the highest bending stress"],
			false,
			4,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Builds tangible real-world machines",
				"Applies across EVs, aerospace, robotics and factories",
				"Timeless"
			],
			[
				"CAD errors discovered on factory floor are costly",
				"Factory visits can be dusty/noisy",
				"Broad syllabus"
			],
			"Explain why bicycle frames use hollow triangular tubes instead of solid square rods.",
			[
				"nptel",
				"mitocw",
				"khanSci"
			],
			"software"
		],
		[
			"civil-structural-engineer",
			"Civil & Structural Safety Engineer",
			"Bridges, Buildings & Transit",
			"Ensure bridges, metro viaducts, homes and dams safely carry earthquakes, floods and decades of load.",
			"Calculating beam steel reinforcement, checking soil bearing reports, inspecting rebar on site and auditing concrete.",
			[
				"Structural mechanics",
				"Earthquake safety codes",
				"Geotechnical basics",
				"Site inspection",
				"Ethics"
			],
			[
				"science",
				"environment",
				"mathematics"
			],
			[
				"mathematics",
				"analytical",
				"observation",
				"problem_solving"
			],
			[
				"Physics",
				"Mathematics",
				"Geography"
			],
			["B.Tech / B.E. Civil Engineering → M.Tech Structural (optional) + Licensed Structural Engineer"],
			["Green building & retrofitting safety auditor"],
			["Take two dry spaghetti strips—push straight down vs bend sideways—to feel why columns buckle suddenly"],
			false,
			4,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Creates landmarks and safe public transit",
				"High civic safety responsibility",
				"Strong infrastructure growth"
			],
			[
				"Outdoor dust/sun on construction sites",
				"Zero tolerance for unethical shortcuts on rebar/cement",
				"Slow projects"
			],
			"Why do earthquake-resistant buildings include diagonal bracing or ductile steel instead of stiff brittle stone?",
			[
				"nptel",
				"mitocw",
				"ncert"
			],
			"data"
		],
		[
			"electrical-power-engineer",
			"Electrical & Smart-Grid Power Engineer",
			"Power Systems",
			"Keep transformers, substations, factory motors and clean-energy smart grids stable without blackouts.",
			"Simulating grid load balance, sizing circuit breakers, inspecting substations and integrating solar/battery feeds.",
			[
				"Circuit analysis",
				"High-voltage safety",
				"Power electronics",
				"Protection relays",
				"Grid modelling"
			],
			[
				"technology",
				"science",
				"environment"
			],
			[
				"mathematics",
				"analytical",
				"technical",
				"problem_solving"
			],
			[
				"Physics",
				"Mathematics",
				"Chemistry"
			],
			["B.Tech / B.E. Electrical Engineering → Utility / Grid Corp (PGCIL/NTPC) or renewable energy firms"],
			["Industrial energy-efficiency auditor"],
			["Explain why long-distance power lines step voltage UP to hundreds of kilovolts before sending current across states"],
			false,
			4,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Vital backbone of EVs, renewables and cities",
				"Strong PSU & private energy paths",
				"Clear physics foundation"
			],
			[
				"Strict lethal-voltage lockout safety rules",
				"Substation emergencies during storms",
				"Heavy math theory"
			],
			"Trace why plugging a heater, microwave and iron into one cheap extension cord trips the MCB breaker.",
			[
				"nptel",
				"mitocw",
				"khanSci"
			],
			"cyber"
		],
		[
			"electronics-vlsi-engineer",
			"VLSI & Semiconductor Chip Engineer",
			"Microelectronics",
			"Design, verify and test the microscopic silicon chips inside phones, satellites and AI servers.",
			"Writing Verilog/SystemVerilog hardware blocks, running timing verification sims and debugging silicon wafers.",
			[
				"Digital logic",
				"Verilog / HDL",
				"Circuit physics",
				"Verification testing",
				"Linux scripting"
			],
			[
				"technology",
				"science",
				"mathematics"
			],
			[
				"analytical",
				"mathematics",
				"technical",
				"observation"
			],
			[
				"Physics",
				"Mathematics",
				"Computer Science"
			],
			["B.Tech ECE / EEE → M.Tech VLSI / Chip design trainee", "Open-source RISC-V hardware labs"],
			["FPGA & embedded verification specialist"],
			["Draw how two simple logic gates (AND + XOR) add two binary bits together into Sum and Carry"],
			true,
			5,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Heart of modern smartphones, AI and India's fab wave",
				"High engineering depth & stability",
				"Free HDL sims"
			],
			[
				"Tiny bug before tape-out costs millions",
				"Steep advanced electronics learning curve",
				"Dense verification logs"
			],
			"Why does shrinking transistors closer together make heat removal one of chip designers' hardest limits?",
			[
				"nptel",
				"mitocw",
				"cs50"
			],
			"software"
		],
		[
			"aerospace-engineer",
			"Aerospace & Satellite Systems Engineer",
			"Flight & Space Engineering",
			"Design lightweight wings, drones, satellites and thermal shields for atmospheric and orbital flight.",
			"Running CFD airflow sims, testing composite wing spars, sizing solar panels for CubeSats and checking vibration limits.",
			[
				"Aerodynamics",
				"Orbital mechanics",
				"Composite structures",
				"MATLAB / Python",
				"Systems testing"
			],
			[
				"science",
				"technology",
				"mathematics"
			],
			[
				"mathematics",
				"analytical",
				"problem_solving",
				"research"
			],
			[
				"Physics",
				"Mathematics",
				"Chemistry"
			],
			["B.Tech Aerospace / Mechanical → M.Tech Aerospace → ISRO / HAL / Private space & drone startups"],
			["Commercial drone & CubeSat engineering"],
			["Fold two paper planes—one narrow dart, one wide glider—and notice how wing area changes glide vs speed"],
			false,
			5,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Inspiring flight and space exploration work",
				"Booming private Indian space & drone startups",
				"Deep physics"
			],
			[
				"Fewer core roles than software",
				"Strict certification & slow test timelines",
				"Heavy fluid dynamics math"
			],
			"Why do satellites in low Earth orbit stay up without engines firing constantly?",
			[
				"mitocw",
				"nptel",
				"khanSci"
			],
			"data"
		],
		[
			"chemical-process-engineer",
			"Chemical & Green Process Engineer",
			"Industrial Chemistry",
			"Scale reactions safely from tiny lab flasks into clean factories making medicines, fuels, glass or fertilisers.",
			"Balancing heat-exchanger flows, preventing runaway pressure hazards, cutting solvent waste and tuning distillation.",
			[
				"Mass & energy balances",
				"Process safety (HAZOP)",
				"Fluid flow",
				"Reaction kinetics",
				"Cost scaling"
			],
			[
				"science",
				"environment",
				"mathematics"
			],
			[
				"analytical",
				"mathematics",
				"problem_solving",
				"organisation"
			],
			[
				"Chemistry",
				"Physics",
				"Mathematics"
			],
			["B.Tech Chemical Engineering → Pharma, green hydrogen, polymer & food-processing plants"],
			["Battery recycling & green-hydrogen process engineer"],
			["Explain why doubling a kitchen recipe pot's radius doesn't double how fast heat reaches the middle"],
			false,
			4,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Central to green hydrogen, batteries and pharma",
				"High safety & efficiency leverage",
				"Strong industrial roles"
			],
			[
				"Remote industrial plant locations",
				"Strict chemical hazard vigilance",
				"Rotating plant shift audits"
			],
			"Think of 2 safety valves/alarms needed if a large closed reaction tank heats up faster than expected.",
			[
				"nptel",
				"mitocw",
				"khanSci"
			],
			"cyber"
		],
		[
			"ev-battery-systems-engineer",
			"EV Powertrain & Battery Systems Engineer",
			"Electric Mobility",
			"Build safer battery packs, thermal cooling plates and battery-management software for electric bikes, buses and cars.",
			"Testing cell charge cycles, writing BMS state-of-charge estimators, checking fire-barrier spacing and range trials.",
			[
				"Battery electrochemistry",
				"Thermal management",
				"Embedded BMS C",
				"Power electronics",
				"Safety testing"
			],
			[
				"technology",
				"environment",
				"science"
			],
			[
				"technical",
				"problem_solving",
				"analytical",
				"mathematics"
			],
			[
				"Physics",
				"Chemistry",
				"Mathematics",
				"Computer Science"
			],
			["B.Tech Electrical / Mechanical / Chemical → EV mobility startups & automotive R&D"],
			["Battery swapping & second-life stationary storage engineer"],
			["Why do electric vehicles use liquid or finned cooling around battery packs while normal AA remotes don't?"],
			true,
			4,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Fast-growing clean transport boom across 2-wheelers & buses",
				"Unites electronics, heat and code",
				"Impactful"
			],
			[
				"High-voltage & thermal-runaway safety risks",
				"Supply-chain cell testing bottlenecks",
				"Rapid standards evolution"
			],
			"Explain why fast-charging the last 80%–100% of a phone or EV battery always slows down deliberately.",
			[
				"nptel",
				"mitocw",
				"mslearn"
			],
			"data"
		],
		[
			"mechatronics-automation-engineer",
			"Mechatronics & Factory Automation Engineer",
			"Smart Manufacturing",
			"Integrate motors, pneumatic arms, optical sensors and PLC controllers so manufacturing lines run safely and reliably.",
			"Programming PLC ladder logic, wiring proximity sensors, calibrating robotic grippers and guarding safety light-curtains.",
			[
				"PLC & sensors",
				"Motors & actuators",
				"Circuit debugging",
				"Mechanical alignment",
				"Safety interlocks"
			],
			["technology", "science"],
			[
				"technical",
				"problem_solving",
				"observation",
				"hands_on" in ["fitness"] ? "fitness" : "organisation"
			],
			[
				"Physics",
				"Computer Science",
				"Mathematics"
			],
			["B.Tech Mechatronics / ECE / Mechanical / Automation Diploma"],
			["Warehouse robotics & agricultural sorting automation engineer"],
			["List 4 steps and 2 safety sensors needed for an automated bottling cap-tightener when a bottle tips over"],
			false,
			3,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Super practical bridge between hardware and software",
				"High manufacturing demand",
				"Tangible motion"
			],
			[
				"Factory travel and emergency line-stop troubleshooting",
				"Physical wiring/standing",
				"Noisy shop floors"
			],
			"Design an interlock rule so a heavy hydraulic press physically CANNOT fire unless BOTH of the operator's hands hold outside buttons.",
			[
				"nptel",
				"mitocw",
				"cs50"
			],
			"software"
		],
		[
			"biomedical-device-engineer",
			"Biomedical & Assistive Device Engineer",
			"Medical Hardware",
			"Build reliable prosthetics, patient monitors, infusion pumps and affordable diagnostic devices for clinics.",
			"Prototyping bio-sensors, verifying electrical isolation so patients never get shocked and running clinical usability tests.",
			[
				"Medical electronics",
				"Biomechanics",
				"Patient electrical safety",
				"Regulatory ISO 13485",
				"Empathy"
			],
			[
				"healthcare",
				"technology",
				"science",
				"design"
			],
			[
				"problem_solving",
				"technical",
				"observation",
				"critical_thinking"
			],
			[
				"Biology",
				"Physics",
				"Mathematics"
			],
			["B.Tech Biomedical / ECE / Mechanical → Medical device R&D / Hospital clinical engineer"],
			["Affordable low-cost rural diagnostic & prosthetic innovator"],
			["Spot 3 usability hazards if a hospital infusion pump uses tiny similar buttons in a dark ward at 3 AM"],
			true,
			4,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Directly saves lives through better medical hardware",
				"Blends biology, hardware and design",
				"Meaningful"
			],
			[
				"Years of clinical regulatory testing before market",
				"Strict liability",
				"Fewer domestic R&D firms than IT"
			],
			"Why must any sensor taped to a wet patient skin surface have strict electrical isolation from wall AC power?",
			[
				"nptel",
				"openwho",
				"khanSci"
			],
			"uiux"
		],
		[
			"acoustic-noise-engineer",
			"Acoustic & Noise-Control Engineer",
			"Sound Physics & Architecture",
			"Design quiet EV cabins, clear classroom acoustics, concert halls and sound barriers near metro lines.",
			"Measuring decibel frequency spectra, placing acoustic absorbers, modelling room echoes and testing fan blades.",
			[
				"Wave physics",
				"Decibel analysis",
				"Room acoustics",
				"Material damping",
				"Audio measurement"
			],
			[
				"science",
				"music",
				"design",
				"environment"
			],
			[
				"observation",
				"mathematics",
				"technical",
				"creativity"
			],
			[
				"Physics",
				"Mathematics",
				"Music"
			],
			["B.Tech Mechanical / Physics / Architecture + Acoustics specialisation"],
			["Studio, cinema & urban noise-mitigation consultant"],
			["Clap once in an empty tiled bathroom vs a carpeted room with curtains—hear how echo time drops dramatically"],
			false,
			4,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Fascinating bridge of music, architecture and physics",
				"Improves classroom & urban sleep health",
				"Uncommon skill"
			],
			[
				"Small specialised hiring market",
				"Requires precision sound meters",
				"Clients often undervalue acoustics late"
			],
			"Why does placing soft curtains or rugs help reduce classroom noise far more than just putting up warning posters?",
			[
				"mitocw",
				"nptel",
				"khanSci"
			],
			"data"
		],
		[
			"industrial-safety-engineer",
			"Industrial & Ergonomic Safety Engineer",
			"Workplace Protection",
			"Prevent factory fires, chemical leaks, falls and repetitive-strain injuries before accidents happen.",
			"Auditing fire exits, redesigning heavy-lifting workflows, investigating near-misses without blame and training crews.",
			[
				"Hazard identification",
				"Fire & chemical safety",
				"Ergonomics",
				"Root-cause investigation",
				"Assertive empathy"
			],
			[
				"science",
				"healthcare",
				"law"
			],
			[
				"observation",
				"critical_thinking",
				"communication",
				"leadership"
			],
			[
				"Chemistry",
				"Physics",
				"Biology"
			],
			["B.Tech / B.Sc. + ADIS (Advanced Diploma in Industrial Safety) / NEBOSH"],
			["Warehouse & construction safety consultant"],
			["Why should companies reward workers for reporting 'near-misses' instead of punishing them?"],
			false,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			500,
			[
				"Literally sends workers home safely every evening",
				"Mandatory across factories, energy and construction",
				"Respected"
			],
			[
				"Pushing back when managers rush production over safety",
				"Investigating painful accidents",
				"Compliance audits"
			],
			"Audit a stairwell or kitchen at home for 3 slip, trip, burn or blocked-exit hazards.",
			[
				"openwho",
				"nptel",
				"swayam"
			],
			"cyber"
		],
		[
			"marine-offshore-engineer",
			"Offshore Wind & Ocean Engineering Specialist",
			"Marine Structures",
			"Design floating offshore wind turbines, deep-water ports and wave-resistant coastal structures.",
			"Modelling wave fatigue loads, planning corrosion protection in saltwater and coordinating subsea cable lays.",
			[
				"Fluid-structure loads",
				"Corrosion prevention",
				"Marine geotech",
				"CAD/FEA",
				"Project safety"
			],
			[
				"environment",
				"science",
				"travel"
			],
			[
				"mathematics",
				"problem_solving",
				"analytical",
				"technical"
			],
			[
				"Physics",
				"Mathematics",
				"Geography"
			],
			["B.Tech Ocean Engineering / Naval Architecture / Civil (IIT Madras/Kharagpur/universities)"],
			["Port expansion & offshore renewable foundation engineer"],
			["Why does salty sea spray destroy unprotected steel bolts many times faster than inland rainwater?"],
			true,
			4,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"High-growth clean offshore wind & port engineering",
				"Rare specialised degree",
				"Global coastal hubs"
			],
			[
				"Rough offshore site visits",
				"Slow heavy marine construction",
				"Corrosion surprises"
			],
			"Think of 2 reasons offshore ocean wind produces steadier electricity than turbines tucked behind hills.",
			[
				"nptel",
				"mitocw",
				"unccl"
			],
			"data"
		],
		[
			"semiconductor-fab-engineer",
			"Semiconductor Process & Yield Engineer",
			"Chip Manufacturing",
			"Run ultra-clean photolithography, etching and wafer-inspection processes to keep silicon chip yields high.",
			"Analysing defect maps on silicon wafers, tuning plasma/chemical etch recipes and debugging cleanroom tool drift.",
			[
				"Solid-state physics",
				"Statistical process control",
				"Cleanroom discipline",
				"Data root-cause",
				"Chemistry"
			],
			[
				"technology",
				"science",
				"mathematics"
			],
			[
				"analytical",
				"observation",
				"technical",
				"mathematics"
			],
			[
				"Physics",
				"Chemistry",
				"Mathematics"
			],
			["B.Tech ECE / Chemical / Materials / Physics → Semiconductor Fab Yield/Process Engineer"],
			["Solar cell & display manufacturing process engineer"],
			["Explain why a single invisible speck of dust inside a chip fab can ruin dozens of smartphone processors"],
			true,
			4,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Booming national & global semiconductor manufacturing investment",
				"Deep experimental science",
				"High impact"
			],
			[
				"Wearing full cleanroom bunny-suits for hours",
				"24/7 fab shift support",
				"Microscopic troubleshooting stress"
			],
			"Look at a wafer map showing defects clustered ONLY around the outer wafer rim—what could be causing that?",
			[
				"nptel",
				"mitocw",
				"kaggle"
			],
			"data"
		]
	], {
		progression: [
			"Graduate Engineer Trainee",
			"Design / Process Engineer",
			"Senior / Lead Engineer",
			"Chief Engineer or R&D Director"
		],
		freelance: "Moderate — CAD modelling, energy/safety audits, and structural consulting after licensing.",
		entrepreneurship: "High — hardware/EV component startups, clean-tech manufacturing, and specialized engineering consultancies.",
		entryLevel: "Engineering labs, campus Baja/Robocon teams, NPTEL certification projects, and plant traineeships.",
		costNote: "NPTEL, MIT OCW, and open CAD tools are free; formal engineering degrees have regulated college tuition."
	}),
	...expandCareers("Entrepreneurship", [
		[
			"tech-startup-founder",
			"Tech Startup Founder",
			"Scalable Software Ventures",
			"Spot an acute, underserved problem, build a minimal working product fast and iterate with real paying users.",
			"Talking to 5 customers daily, prioritising what NOT to build, fixing customer support bugs and managing cash runway.",
			[
				"Customer discovery",
				"Rapid MVP building",
				"Sales & storytelling",
				"Unit economics",
				"Resilience"
			],
			[
				"entrepreneurship",
				"technology",
				"business"
			],
			[
				"leadership",
				"problem_solving",
				"communication",
				"creativity"
			],
			[
				"Computer Science",
				"Business Studies",
				"Economics"
			],
			["Any background + building and shipping real small products / college incubators"],
			["Technical co-founder or solo indie SaaS builder"],
			["Interview 5 students about a daily headache—without pitching any app idea yet—and log exact words they use"],
			false,
			4,
			"Remote / from home",
			"Class 10+",
			0,
			[
				"Maximum creative & strategic freedom",
				"Learn product, sales and finance simultaneously",
				"High impact"
			],
			[
				"High failure rate and income uncertainty early on",
				"Emotional roller-coaster",
				"Heavy responsibility for team"
			],
			"How can you test if 10 people truly want your service using ONLY a simple WhatsApp/form prototype in 48 hours?",
			[
				"fcc",
				"varsity",
				"skillshop"
			],
			"marketing"
		],
		[
			"social-enterprise-founder",
			"Social Enterprise Founder",
			"Impact Ventures",
			"Build self-sustaining businesses that solve sanitation, clean water, rural crafts or inclusion profitably—not charity-only.",
			"Balancing fair artisan/farmer pay with viable retail pricing, pitching impact grants and measuring real social outcomes.",
			[
				"Impact measurement",
				"Sustainable pricing",
				"Community trust",
				"Supply operations",
				"Storytelling"
			],
			[
				"entrepreneurship",
				"social",
				"environment",
				"business"
			],
			[
				"leadership",
				"communication",
				"problem_solving",
				"teamwork"
			],
			[
				"Economics",
				"Business Studies",
				"Environmental Studies"
			],
			["Any degree + grassroots volunteering / Social entrepreneurship incubators (Villgro / UnLtd / NSRCEL)"],
			["Non-profit revenue-generating arm builder"],
			["Design a self-sustaining model for a student repair-café so tool costs get covered without pricing out poor neighbours"],
			true,
			3,
			"With people (schools, clinics, events)",
			"Class 12",
			500,
			[
				"Combines purpose with financial independence from endless grants",
				"Deep community dignity",
				"Rewarding"
			],
			[
				"Hardest balance: thin margins + vulnerable communities",
				"Slower patient capital needed",
				"Burnout risk"
			],
			"Spot why selling affordable water filters through local women's groups lasts longer than dropping free filters once.",
			[
				"courseraAudit",
				"varsity",
				"unccl"
			],
			"marketing"
		],
		[
			"d2c-brand-founder",
			"Direct-to-Consumer (D2C) Product Founder",
			"Consumer Brands",
			"Create thoughtful everyday physical goods—from millet snacks to ergonomic bags—and sell directly online.",
			"Testing small supplier batches, perfecting packaging durability, managing marketplace ads and reading customer reviews.",
			[
				"Product sourcing",
				"Unit-cost margin math",
				"Digital marketing",
				"Packaging QC",
				"Customer support"
			],
			[
				"entrepreneurship",
				"business",
				"design"
			],
			[
				"creativity",
				"organisation",
				"analytical",
				"communication"
			],
			[
				"Business Studies",
				"Accountancy",
				"Fine Arts"
			],
			["Any UG + small-batch weekend market pilot before scaling online"],
			["Family craft/food business modernisation"],
			["Calculate shipping, packaging, ad cost and product cost on a ₹499 jar to check if any real profit stays"],
			false,
			3,
			"Office / desk",
			"Class 12",
			1e3,
			[
				"Tangible brand you can hold and gift",
				"Easy to pilot at local pop-up markets first",
				"Real commerce training"
			],
			[
				"Cash tied up in unsold inventory",
				"Rising online ad costs",
				"High product-return logistics"
			],
			"Read 10 3-star reviews of any consumer item online—every complaint is a free blueprint for a better version.",
			[
				"skillshop",
				"varsity",
				"figma"
			],
			"marketing"
		],
		[
			"indie-software-creator",
			"Bootstrapped Indie Maker & Micro-SaaS Creator",
			"Independent Software",
			"Build focused, useful software tools or templates solo or with one partner—profitable without investor pressure.",
			"Coding focused niche utilities, answering user emails kindly, automating billing and writing helpful tutorials.",
			[
				"Full-stack shipping",
				"Niche problem hunting",
				"Clear pricing",
				"Copywriting",
				"Self-management"
			],
			[
				"entrepreneurship",
				"technology",
				"design"
			],
			[
				"technical",
				"problem_solving",
				"creativity",
				"organisation"
			],
			[
				"Computer Science",
				"English",
				"Business Studies"
			],
			["Self-taught or B.Tech/BCA + launching tiny micro-tools publicly"],
			["Developer plugins, Notion/Figma/Shopify app builder"],
			["Find one repetitive spreadsheet chore a local dentist, tutor or gym hates—sketch a 1-screen tool fixing just that"],
			true,
			3,
			"Remote / from home",
			"Class 10+",
			0,
			[
				"Zero investor bosses, high schedule autonomy",
				"Global currency reach from anywhere",
				"Low capital needed"
			],
			[
				"Lonely solo troubleshooting",
				"Most early micro-products earn little until you hit a real nerve",
				"Support load"
			],
			"Why does solving a tiny boring problem for 200 small clinics often beat chasing a giant 'next social network'?",
			[
				"fcc",
				"mdn",
				"odin"
			],
			"software"
		],
		[
			"local-service-business-owner",
			"Local Service & Trades Venture Founder",
			"Essential Community Services",
			"Build dependable, tech-enabled local businesses—home solar cleaning, repair hubs, elderly care or tutoring.",
			"Training reliable staff, guaranteeing punctual quality, handling local permits and growing word-of-mouth referrals.",
			[
				"Service quality systems",
				"Hiring & fairness",
				"Local cashflow",
				"Scheduling",
				"Trust building"
			],
			[
				"entrepreneurship",
				"business",
				"social"
			],
			[
				"leadership",
				"organisation",
				"communication",
				"problem_solving"
			],
			[
				"Business Studies",
				"Accountancy",
				"Economics"
			],
			["Any background + hands-on service apprenticeship → starting with 1 vehicle/kit and 5 local clients"],
			["Campus/neighbourhood logistics & maintenance firm"],
			["Design a 5-point arrival checklist that makes a home repair service feel 10x more trustworthy than random numbers"],
			false,
			2,
			"Outdoors / on the move",
			"Class 10+",
			1e3,
			[
				"Fastest path to real day-one revenue without tech hype",
				"Recession-resilient everyday needs",
				"Local jobs"
			],
			[
				"Managing frontline staff reliability",
				"Seasonal demand swings",
				"Hands-on operational stress"
			],
			"Calculate how many daily paid appointments at ₹400 cover fuel, helper wages and a fair owner margin.",
			[
				"varsity",
				"khanEcon",
				"skillshop"
			],
			"data"
		],
		[
			"edtech-learning-founder",
			"Niche Learning & Cohort Academy Founder",
			"Education Ventures",
			"Launch focused skill workshops, regional-language study communities or exam-prep mentorship that students truly complete.",
			"Teaching live cohorts, refining exercises where learners stall, building peer accountability and keeping fees honest.",
			[
				"Live teaching",
				"Curriculum iteration",
				"Community warmth",
				"Ethical pricing",
				"Operations"
			],
			[
				"entrepreneurship",
				"social",
				"writing"
			],
			[
				"public_speaking",
				"leadership",
				"creativity",
				"communication"
			],
			[
				"English",
				"Mathematics",
				"Business Studies"
			],
			["Experienced mentor / college topper → small paid weekend cohort → scaled academy"],
			["Vocational & regional skill-training entrepreneur"],
			["Run a free 60-minute live peer study session on one tricky topic and ask where everyone still felt confused"],
			false,
			2,
			"Remote / from home",
			"Class 12",
			0,
			[
				"Tiny startup capital—zoom + structured worksheets",
				"High personal fulfilment",
				"Immediate learner feedback"
			],
			[
				"Hard to scale personalised mentorship without diluting quality",
				"Refund/completion expectations",
				"Crowded ads"
			],
			"Why do 85% of people quit pre-recorded video bundles, while small live feedback cohorts finish?",
			[
				"courseraAudit",
				"skillshop",
				"swayam"
			],
			"marketing"
		],
		[
			"climate-cleantech-founder",
			"CleanTech & Circular Materials Founder",
			"Climate Entrepreneurship",
			"Commercialise water-saving hardware, bio-packaging, EV retrofits or farm-waste briquettes at real scale.",
			"Running factory pilot trials, applying for clean-tech grants (BIRAC/DST), securing industrial buyers and patenting.",
			[
				"Hardware/process validation",
				"Industrial B2B sales",
				"Grant fundraising",
				"Unit economics",
				"Grit"
			],
			[
				"entrepreneurship",
				"environment",
				"science",
				"technology"
			],
			[
				"problem_solving",
				"leadership",
				"research",
				"critical_thinking"
			],
			[
				"Chemistry",
				"Physics",
				"Economics",
				"Environmental Studies"
			],
			["B.Tech / M.Sc. + University incubation (IIT/NIT/Atal Incubation Centres)"],
			["Agricultural stubble/waste upcycling startup"],
			["Why does an industrial buyer switch to eco-packaging only when cost, drop strength AND supply match plastic?"],
			true,
			5,
			"Lab or studio",
			"Undergraduate Degree",
			1e3,
			[
				"Solves massive ecological problems permanently",
				"Strong non-dilutive R&D grants exist",
				"High moat"
			],
			[
				"Hardware pilots take 2–4 years longer than apps",
				"Capital intensive tooling",
				"Long B2B sales cycles"
			],
			"Identify one agricultural or factory waste stream in your state and check if it burns, pollutes or rots unused.",
			[
				"unccl",
				"nptel",
				"varsity"
			],
			"data"
		],
		[
			"venture-scout-ecosystem-builder",
			"Startup Incubator & Venture Ecosystem Manager",
			"Entrepreneurship Support",
			"Run college incubators, startup accelerators and angel networks that help early founders avoid rookie traps.",
			"Screening pitches fairly, connecting founders with first customers and mentors, organising demo days and tracking grants.",
			[
				"Pitch evaluation",
				"Mentor matchmaking",
				"Community building",
				"Unit economics",
				"Programme ops"
			],
			[
				"entrepreneurship",
				"business",
				"finance"
			],
			[
				"communication",
				"analytical",
				"organisation",
				"leadership"
			],
			[
				"Business Studies",
				"Economics",
				"English"
			],
			["BBA / B.Tech / MBA + Campus E-Cell lead → Accelerator Program Associate / VC Analyst"],
			["University entrepreneurship-cell director"],
			["Read two startup pitches and spot one hidden assumption that would break their business if wrong"],
			false,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Meets dozens of passionate builders weekly",
				"Learns pattern recognition across industries",
				"Low personal financial risk"
			],
			[
				"High pitch hype vs substance noise",
				"Saying 'no' kindly to excited founders",
				"Admin event load"
			],
			"Ask 3 sharp customer-evidence questions to check if a founder actually talked to users or just guessed.",
			[
				"varsity",
				"khanEcon",
				"courseraAudit"
			],
			"data"
		],
		[
			"franchise-operations-founder",
			"Multi-Outlet & Franchise Systems Builder",
			"Standardised Scale",
			"Document recipes, training manuals and supply checks so one proven café, clinic or store expands cleanly across cities.",
			"Auditing franchisee cleanliness and margins, building onboarding checklists and troubleshooting local outlet dips.",
			[
				"Playbook documentation",
				"Quality auditing",
				"Supply consistency",
				"Partner vetting",
				"Unit P&L"
			],
			["entrepreneurship", "business"],
			[
				"organisation",
				"leadership",
				"analytical",
				"communication"
			],
			[
				"Business Studies",
				"Accountancy",
				"Economics"
			],
			["Hospitality/Retail Operations → Multi-unit manager or franchise brand founder"],
			["Diagnostic lab or preschool franchise operations lead"],
			["Write a 6-step opening checklist so two totally different people make the exact same cup of coffee in two cities"],
			false,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			500,
			[
				"Scales physical businesses without owning every shop yourself",
				"Teaches airtight systems thinking",
				"Durable"
			],
			[
				"Rogue franchisees hurting brand reputation",
				"Disputes over royalty fees",
				"Frequent travel"
			],
			"Spot why a restaurant with one magical chef fails to franchise unless recipes are measured by weight and timer.",
			[
				"varsity",
				"courseraAudit",
				"khanEcon"
			],
			"data"
		],
		[
			"craft-cooperative-entrepreneur",
			"Artisan Craft & GI-Tag Brand Entrepreneur",
			"Cultural Commerce",
			"Partner directly with rural weavers, potters or bamboo artisans to bring authentic craft to fair global buyers.",
			"Co-designing modern everyday silhouettes with master artisans, handling export quality checks and paying fair advances.",
			[
				"Craft heritage respect",
				"Fair pricing",
				"Design translation",
				"Export logistics",
				"Storytelling"
			],
			[
				"entrepreneurship",
				"art",
				"design",
				"social",
				"travel"
			],
			[
				"creativity",
				"communication",
				"organisation",
				"teamwork"
			],
			[
				"Fine Arts",
				"History",
				"Business Studies"
			],
			["NIFT/NID/Design/Business UG + field cluster fellowships → Artisan craft brand"],
			["Museum gift-shop & ethical interior decor supplier"],
			["Visit a local potter or weaver and ask what step takes the longest time vs pays the least—start solving that"],
			false,
			3,
			"Outdoors / on the move",
			"Class 12",
			500,
			[
				"Preserves centuries-old living skills with fair livelihoods",
				"Rich human relationships",
				"Distinctive brand"
			],
			[
				"Inconsistent batch sizing in handcraft",
				"Long rural supply coordination",
				"Explaining handcraft cost to buyers"
			],
			"Write an honest product card explaining how many hours of hand-loom work went into a single shawl.",
			[
				"khanHum",
				"skillshop",
				"figma"
			],
			"uiux"
		],
		[
			"bootstrapped-agency-founder",
			"Creative, Dev or Marketing Agency Founder",
			"B2B Service Venture",
			"Turn your team's design, coding, video or SEO craft into steady monthly client retainers with zero VC capital.",
			"Scoping client proposals clearly, managing freelancers, protecting team scope from creep and invoicing on time.",
			[
				"Scoping & pricing",
				"Client leadership",
				"Quality review",
				"Sales outreach",
				"Cashflow buffer"
			],
			[
				"entrepreneurship",
				"business",
				"technology",
				"design"
			],
			[
				"leadership",
				"communication",
				"organisation",
				"problem_solving"
			],
			[
				"Business Studies",
				"English",
				"Computer Science"
			],
			["Freelancer with 5 happy clients → small 3–8 person specialised agency"],
			["Niche healthcare-clinic or D2C specialist studio"],
			["Write a 1-page project scope clearly listing BOTH what IS included AND 3 things NOT included"],
			false,
			3,
			"Remote / from home",
			"Class 12",
			0,
			[
				"Generates cashflow from Month 1 without investors",
				"Great training ground before building software products",
				"Flexible"
			],
			[
				"Chasing late client invoices",
				"Feast-or-famine project pipeline",
				"Client boundary creep"
			],
			"Why does specialising ('Shopify speed for food brands') win higher fees than saying 'We build any website'?",
			[
				"skillshop",
				"varsity",
				"fcc"
			],
			"marketing"
		],
		[
			"agritech-venture-founder",
			"AgriTech & Farm-Supply Startup Founder",
			"Rural Innovation",
			"Build soil testing, farm-gate cold storage, transparent crop pricing or tractor-rental apps for smallholder farmers.",
			"Spending mornings at mandis/villages, adapting offline-friendly interfaces, managing collection centres and logistics.",
			[
				"Rural empathy",
				"Offline-first product",
				"Agri supply math",
				"Field operations",
				"Trust earning"
			],
			[
				"entrepreneurship",
				"agriculture",
				"technology",
				"social"
			],
			[
				"problem_solving",
				"communication",
				"leadership",
				"analytical"
			],
			[
				"Economics",
				"Biology",
				"Computer Science",
				"Geography"
			],
			["Agri / Engg / Business UG + rural field immersions → AgriTech venture"],
			["Farm-input advisory & FPO marketplace builder"],
			["Why do bright-blue English-only farm apps fail in rural belts compared to simple voice notes in regional dialects?"],
			true,
			4,
			"Outdoors / on the move",
			"Undergraduate Degree",
			500,
			[
				"Direct impact on farmer incomes and food waste",
				"Massive real market beyond metro bubbles",
				"Meaningful"
			],
			[
				"Thin perishables logistics margins",
				"Working capital tied in procurement",
				"Slow trust-building in villages"
			],
			"Trace a tomato from farm crate to city kitchen and list 3 spots where heat or bruising destroys half the harvest.",
			[
				"fao",
				"varsity",
				"swayam"
			],
			"data"
		],
		[
			"healthcare-clinic-founder",
			"Community Clinic or Diagnostic Hub Founder",
			"Health Entrepreneurship",
			"Launch transparent, affordable neighbourhood clinics, rehab centres or elder-care services (with licensed clinicians).",
			"Hiring ethical clinical partners, designing soothing wait spaces, setting transparent fee boards and community outreach.",
			[
				"Healthcare regulations",
				"Unit economics",
				"Service empathy",
				"Team culture",
				"Patient trust"
			],
			[
				"entrepreneurship",
				"healthcare",
				"business"
			],
			[
				"leadership",
				"organisation",
				"communication",
				"critical_thinking"
			],
			[
				"Biology",
				"Business Studies",
				"Accountancy"
			],
			["Clinician (MBBS/BPT/BDS) or Healthcare Admin + operational partner"],
			["Home elder-care & chronic-diabetes support venture"],
			["List 3 small touches that make a small neighbourhood clinic feel trustworthy and transparent on price"],
			false,
			4,
			"With people (schools, clinics, events)",
			"Undergraduate Degree",
			5e3,
			[
				"Fills critical primary-care gaps in tier-2/3 towns",
				"High community gratitude",
				"Steady repeat trust"
			],
			[
				"Strict medical licensing & clinical waste laws",
				"Heavy equipment & lease capital",
				"High patient liability"
			],
			"Why does publishing clear upfront diagnostic test prices build far higher word-of-mouth trust than hidden discounts?",
			[
				"openwho",
				"varsity",
				"courseraAudit"
			],
			"uiux"
		]
	], {
		progression: [
			"Side-Project / Solo Pilot",
			"Early Founder (First 10 Customers)",
			"Growing Venture Lead",
			"Multi-Market Founder or Serial Builder"
		],
		freelance: "Often starts via independent freelancing or tiny paid pilots before hiring.",
		entrepreneurship: "100% core focus — practical bootstrapping, problem discovery, and ethical unit economics.",
		entryLevel: "Interview 10 real users, sell a tiny pilot service locally, college E-Cell, and Varsity/Skillshop.",
		costNote: "Service, indie-software, and education ventures can pilot with ₹0–₹1,000; hardware/inventory needs more capital."
	}),
	...expandCareers("Agriculture", [
		[
			"agronomist",
			"Agronomist & Crop Advisory Scientist",
			"Crop Science",
			"Advise farmers and cooperatives on crop rotation, balanced nutrients, pest control and drought-resilient yields.",
			"Walking field plots, reading soil lab reports, diagnosing leaf deficiencies and running demonstration trials.",
			[
				"Soil & plant physiology",
				"Integrated pest management",
				"Field diagnostics",
				"Farmer communication",
				"Trial stats"
			],
			[
				"agriculture" in ["environment"] ? "environment" : "environment",
				"science",
				"social"
			],
			[
				"observation",
				"research",
				"communication",
				"problem_solving"
			],
			[
				"Biology",
				"Chemistry",
				"Geography"
			],
			["ICAR / State Agri Univ → B.Sc. Agriculture (4 yrs) → M.Sc. Agronomy"],
			["FPO & agri-cooperative lead agronomist"],
			["Compare why rotating legumes (pulses) with wheat restores nitrogen naturally instead of dumping excess urea"],
			false,
			4,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Directly feeds nations while protecting soil",
				"Outdoor field connection",
				"Clear ICAR agricultural degree path"
			],
			[
				"Rural travel in hot/rainy weather",
				"Convincing wary farmers to test new methods",
				"Erratic monsoons"
			],
			"Inspect two potted plants—one overwatered, one underwatered—and notice how yellowing leaves differ.",
			[
				"fao",
				"ncert",
				"swayam"
			],
			"data"
		],
		[
			"precision-agriculture-technologist",
			"Precision Agriculture & IoT Technologist",
			"Smart Farming Tech",
			"Use soil moisture sensors, weather APIs and drip automation so farms save 40% water and fertiliser.",
			"Deploying solar LoRa field sensors, tuning automated drip valves and building simple farmer SMS alerts.",
			[
				"IoT sensors",
				"Drip hydraulics",
				"Data telemetry",
				"Python / dashboards",
				"Rural UX"
			],
			[
				"technology",
				"environment",
				"science"
			],
			[
				"technical",
				"problem_solving",
				"analytical",
				"observation"
			],
			[
				"Physics",
				"Computer Science",
				"Biology",
				"Mathematics"
			],
			["B.Tech Agricultural Engg / ECE / CS → Agri-IoT startups & irrigation tech"],
			["Greenhouse climate-automation engineer"],
			["Design a 2-sentence SMS alert telling a farmer when to skip irrigation because 25mm rain is forecast tonight"],
			true,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			500,
			[
				"Applies electronics & AI straight to water conservation",
				"High climate urgency",
				"Field + tech balance"
			],
			[
				"Dust, ants and rodents chew field sensor wires",
				"Spotty rural cellular signal",
				"Smallholder cost ceilings"
			],
			"Why does watering the exact root zone drop-by-drop outperform flooding an entire field from a canal?",
			[
				"fao",
				"nptel",
				"kaggle"
			],
			"software"
		],
		[
			"organic-soil-health-specialist",
			"Regenerative & Organic Soil Specialist",
			"Soil Ecology",
			"Restore exhausted soils using composting, cover crops, bio-fertilisers and microbial soil carbon practices.",
			"Testing soil organic carbon, training farmers in bio-inputs, auditing organic certification logs and checking worms.",
			[
				"Soil microbiology",
				"Composting systems",
				"Organic standards",
				"Field workshops",
				"Lab interpretation"
			],
			[
				"environment",
				"science",
				"social"
			],
			[
				"research",
				"observation",
				"communication",
				"organisation"
			],
			[
				"Biology",
				"Chemistry",
				"Environmental Studies"
			],
			["B.Sc. Agriculture / Soil Science / Env Sci → Organic certification auditor & regenerative advisor"],
			["Urban kitchen-garden & compost consultant"],
			["Take a handful of dark garden soil vs dry roadside dust—feel moisture retention, smell and crumbly texture"],
			true,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Rebuilds living soil fertility and captures carbon",
				"Growing organic food demand",
				"Deep ecological logic"
			],
			[
				"3-year organic transition dip risks farmer cashflow",
				"Certification paperwork",
				"Lab access in small towns"
			],
			"Explain why burning dry crop stubble kills beneficial soil microbes and wastes organic carbon.",
			[
				"fao",
				"unccl",
				"ncert"
			],
			"data"
		],
		[
			"aquaculture-fisheries-specialist",
			"Sustainable Aquaculture & Fisheries Specialist",
			"Blue Food Systems",
			"Manage freshwater fish ponds, shrimp hatcheries or coastal mariculture cleanly without polluting water.",
			"Checking pond dissolved oxygen and ammonia daily, balancing feed ratios and preventing disease outbreaks.",
			[
				"Water chemistry",
				"Fish biology",
				"Feed conversion math",
				"Pond aeration",
				"Disease prevention"
			],
			[
				"science",
				"environment",
				"business"
			],
			[
				"observation",
				"analytical",
				"organisation",
				"problem_solving"
			],
			[
				"Biology",
				"Chemistry",
				"Mathematics"
			],
			["B.F.Sc. (Bachelor of Fisheries Science, 4 yrs) → M.F.Sc. / State Fisheries / Aquaculture enterprises"],
			["Aquaponics (fish + leafy greens) urban farm designer"],
			["Why does hot stagnant pond water trigger sudden fish distress right before dawn? (Hint: algae respiration!)"],
			false,
			4,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"High-protein food security with lower footprint than beef",
				"Strong coastal & inland livelihood impact",
				"Focused B.F.Sc."
			],
			[
				"Pond oxygen crashes happen at 4 AM requiring urgent aerators",
				"Disease spreads fast in dense ponds",
				"Humid field work"
			],
			"Calculate feed needed over 30 days if 1,000 fingerlings eat 3% of their growing body weight daily.",
			[
				"fao",
				"nptel",
				"khanSci"
			],
			"data"
		],
		[
			"horticulture-greenhouse-manager",
			"Protected Cultivation & Hydroponics Manager",
			"High-Value Horticulture",
			"Grow year-round berries, flowers, seedlings and pesticide-free greens inside polyhouses and vertical farms.",
			"Managing shade nets, calibrating hydroponic nutrient pH/EC, supervising pruning and timing harvest cold-boxes.",
			[
				"Plant nutrition (EC/pH)",
				"Climate control",
				"Integrated pest scouting",
				"Crew scheduling",
				"Post-harvest care"
			],
			[
				"environment",
				"science",
				"business"
			],
			[
				"organisation",
				"observation",
				"technical",
				"leadership"
			],
			[
				"Biology",
				"Chemistry",
				"Business Studies"
			],
			["B.Sc. Horticulture / Agriculture → Commercial polyhouse / nursery / hydroponics manager"],
			["Nursery & urban rooftop hydroponic entrepreneur"],
			["Test why hydroponic plants rot instantly if roots sit in still un-oxygenated water vs bubbling air stones"],
			false,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			500,
			[
				"High yield per drop of water near cities",
				"Clean sheltered growing spaces",
				"Entrepreneurial nursery potential"
			],
			[
				"High initial polyhouse/electricity cost",
				"Fungus spreads quickly in humid houses",
				"Daily 7-day plant care"
			],
			"Read an EC (electrical conductivity) vs pH chart to understand why wrong pH locks out nutrients even in rich water.",
			[
				"fao",
				"ncert",
				"courseraAudit"
			],
			"data"
		],
		[
			"agricultural-economist",
			"Agricultural Economist & Commodity Analyst",
			"Agri-Markets & Policy",
			"Analyse crop price cycles, MSP policies, crop insurance and export rules to help farmers manage market risk.",
			"Forecasting monsoon sowing acreage, tracking mandi arrival prices, evaluating FPO profits and writing market briefs.",
			[
				"Econometrics",
				"Commodity markets",
				"Supply-demand modelling",
				"Rural survey analysis",
				"Report writing"
			],
			[
				"business",
				"finance",
				"mathematics",
				"environment"
			],
			[
				"analytical",
				"mathematics",
				"research",
				"writing"
			],
			[
				"Economics",
				"Mathematics",
				"Geography"
			],
			["B.Sc. Agri / B.A. Economics → M.Sc. Agricultural Economics (IARI / NDRI / universities)"],
			["Agri-fintech & parametric weather-insurance analyst"],
			["Why does a bumper onion harvest across every district sometimes leave farmers earning LESS than a normal year?"],
			false,
			4,
			"Office / desk",
			"Postgraduate / Licensing",
			0,
			[
				"Connects farm reality directly to national food prices",
				"High value in banks, FPOs & insurers",
				"Rigorous"
			],
			[
				"Weather unpredictability breaks neat forecasts",
				"Requires Master's/stats strength",
				"Fragmented mandi records"
			],
			"Explain how transparent electronic warehouse receipts let a farmer get cash at harvest without panic-selling cheap.",
			[
				"fao",
				"khanEcon",
				"varsity"
			],
			"data"
		],
		[
			"dairy-livestock-specialist",
			"Dairy Technologist & Veterinary Livestock Advisor",
			"Dairy & Animal Health",
			"Improve animal nutrition, humane housing, milk hygiene and rural dairy-cooperative cold chains.",
			"Formulating balanced fodder rations, checking milk fat/adulteration tests, scheduling vaccinations and advising women's dairies.",
			[
				"Animal nutrition",
				"Milk quality testing",
				"Cold-chain hygiene",
				"Preventive care",
				"Cooperative leadership"
			],
			[
				"science",
				"healthcare",
				"business"
			],
			[
				"observation",
				"communication",
				"organisation",
				"problem_solving"
			],
			["Biology", "Chemistry"],
			["B.Tech Dairy Technology / B.V.Sc. & A.H. (Veterinary Science) → NDDB / Co-op Dairies (Amul/Mother Dairy)"],
			["Artisanal cheese & clean-dairy founder"],
			["Trace why chilling raw milk below 4°C within 2 hours of milking multiplies safe shelf life without preservatives"],
			false,
			4,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Powers rural daily cashflow for millions of smallholders",
				"Strong cooperative network",
				"Practical science"
			],
			[
				"Early 5 AM rural collection rounds",
				"Outbreaks like FMD need swift quarantine",
				"Humid processing plants"
			],
			"List 3 nutritional differences between balanced green+dry fodder vs feeding livestock only dry wheat straw.",
			[
				"fao",
				"openwho",
				"nptel"
			],
			"data"
		],
		[
			"seed-plant-breeder",
			"Plant Breeder & Climate-Resilient Seed Scientist",
			"Crop Genetics",
			"Develop drought-tolerant, flood-submergence-resilient and nutrient-rich seed varieties for changing climates.",
			"Running multi-location field crosses, recording flowering dates, selecting disease-free lines and guarding biodiversity.",
			[
				"Plant genetics",
				"Field trial stats",
				"Botanical observation",
				"Patience",
				"Data logging"
			],
			[
				"science",
				"environment",
				"mathematics"
			],
			[
				"research",
				"observation",
				"analytical",
				"critical_thinking"
			],
			[
				"Biology",
				"Mathematics",
				"Chemistry"
			],
			["B.Sc. Agriculture → M.Sc./PhD Genetics & Plant Breeding (ICAR / SAU / ICRISAT)"],
			["Heirloom & millet seed conservation specialist"],
			["Why does planting only ONE uniform high-yield wheat clone everywhere make the whole harvest vulnerable to a new fungus?"],
			false,
			5,
			"Outdoors / on the move",
			"Postgraduate / Licensing",
			0,
			[
				"Deep multi-year legacy feeding future decades",
				"Combines genetics with sunny field plots",
				"Climate vital"
			],
			[
				"Takes 7–10 crop seasons to stabilise one new variety",
				"Masters/PhD required",
				"Tedious hand-pollination"
			],
			"Inspect two local millet or rice grains and compare why traditional varieties survive erratic rain better.",
			[
				"fao",
				"khanSci",
				"mitocw"
			],
			"data"
		],
		[
			"post-harvest-cold-chain-engineer",
			"Post-Harvest & Solar Cold-Storage Engineer",
			"Food Waste Reduction",
			"Build affordable solar cold-rooms, grain dryers and gentle sorting lines so harvests don't rot before reaching buyers.",
			"Calculating produce respiration heat, sizing phase-change thermal banks, inspecting packhouses and cutting transit bruising.",
			[
				"Refrigeration thermodynamics",
				"Crop physiology",
				"Packhouse design",
				"Solar thermal sizing",
				"Cost math"
			],
			[
				"environment",
				"technology",
				"business"
			],
			[
				"problem_solving",
				"technical",
				"mathematics",
				"organisation"
			],
			[
				"Physics",
				"Mathematics",
				"Biology"
			],
			["B.Tech Agricultural / Mechanical Engineering → M.Tech Post-Harvest Engineering"],
			["Solar cold-storage entrepreneur serving FPOs"],
			["Why do mangoes or bananas spoil faster if packed warm inside tight plastic bags instead of vented crates?"],
			true,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Cuts 20%–30% food loss directly without growing an extra acre",
				"Practical engineering impact",
				"Clean tech"
			],
			[
				"Rural power grid instability",
				"Convincing traders to pay slightly more for graded fruit",
				"Travel"
			],
			"Compare cooling produce right at the farm gate ('pre-cooling') vs loading hot crates into a refrigerated truck.",
			[
				"nptel",
				"fao",
				"unccl"
			],
			"data"
		],
		[
			"drone-crop-mapping-specialist",
			"Agricultural Drone Pilot & Crop Health Mapper",
			"Agri-Robotics",
			"Fly multispectral mapping or spot-spraying drones safely to detect crop stress early and cut chemical spray waste.",
			"Planning flight grid batteries, calibrating nozzles for wind drift, stitching orthomosaic maps and logging DGCA hours.",
			[
				"DGCA drone regulations",
				"Multispectral NDVI",
				"Battery & wind safety",
				"Field calibration",
				"Farmer demos"
			],
			[
				"technology",
				"environment",
				"travel"
			],
			[
				"technical",
				"observation",
				"organisation",
				"fitness"
			],
			[
				"Physics",
				"Geography",
				"Mathematics"
			],
			["Class 10+ → DGCA Remote Pilot Certificate (RPC) + Agri-Drone Service Operator / AgEngg"],
			["Drone-as-a-service rural micro-entrepreneur"],
			["Why is spot-spraying only diseased yellow patches in a 10-acre field far safer and cheaper than blanket spraying?"],
			true,
			2,
			"Outdoors / on the move",
			"Diploma / Certificate",
			1e3,
			[
				"Fast entry route into modern tech-farming",
				"Saves farmers water, money and chemical exposure",
				"Hands-on"
			],
			[
				"High midday winds pause flights",
				"Expensive LiPo battery maintenance",
				"Strict airspace rules"
			],
			"List 4 pre-flight checks before launching a heavy agricultural drone near village power lines and trees.",
			[
				"fao",
				"unccl",
				"mitocw"
			],
			"cyber"
		],
		[
			"food-processing-technologist",
			"Food Product & Processing Technologist",
			"Food Science",
			"Turn raw crops—like millets, pulses and fruits—into safe, nutritious, shelf-stable foods without junk additives.",
			"Testing extrusion or dehydration curves, running microbial shelf-life checks, designing nutrition labels and scaling batches.",
			[
				"Food chemistry",
				"Preservation physics",
				"Quality assurance",
				"Sensory testing",
				"FSSAI labelling"
			],
			[
				"science",
				"business",
				"healthcare"
			],
			[
				"analytical",
				"creativity",
				"observation",
				"organisation"
			],
			[
				"Chemistry",
				"Biology",
				"Physics"
			],
			["B.Tech / B.Sc. Food Technology (CFTRI / NIFTEM / universities) → R&D or QA"],
			["Healthy millet/plant-protein consumer food startup"],
			["Look at an ingredient list on two packaged snacks—ingredients appear in descending order by WEIGHT!"],
			false,
			3,
			"Lab or studio",
			"Undergraduate Degree",
			0,
			[
				"Connects farm harvests to busy city kitchens",
				"Hands-on tasting & lab science",
				"Strong food startup scene"
			],
			[
				"Factory quality shifts",
				"Balancing real nutrition with shelf life and low price",
				"Strict audits"
			],
			"Explain how removing water (freeze-drying or sun-drying) stops spoilage bacteria without chemical preservatives.",
			[
				"fao",
				"nptel",
				"khanSci"
			],
			"data"
		],
		[
			"agroforestry-planner",
			"Agroforestry & Carbon-Farm Designer",
			"Trees + Crops Systems",
			"Design multi-layer farms combining timber, fruit trees, shade crops and livestock for steady year-round farm income.",
			"Mapping sun shade angles, pairing deep-root trees with shallow annual crops and guiding long-term tree spacing.",
			[
				"Tree-crop ecology",
				"Spatial farm mapping",
				"Long-term cashflow",
				"Soil conservation",
				"Farmer coaching"
			],
			[
				"environment",
				"design",
				"social"
			],
			[
				"creativity",
				"research",
				"observation",
				"communication"
			],
			[
				"Biology",
				"Geography",
				"Environmental Studies"
			],
			["B.Sc. Forestry / Agriculture → Agroforestry NGO or carbon-program advisor"],
			["Permaculture & farm-sanctuary designer"],
			["Why does planting tall timber or mango trees along farm borders protect wheat from hot dry winds while adding backup income?"],
			true,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Protects farmers from single-crop failure",
				"Creates mini biodiversity corridors",
				"Long-term ecological beauty"
			],
			[
				"Trees take 4–7 years before commercial harvest",
				"Tenancy rules discourage tenants from planting trees",
				"Slow ROI"
			],
			"Design a 3-layer farm edge: windbreak tall tree, middle fruit/fodder shrub, ground legume cover.",
			[
				"fao",
				"unccl",
				"ncert"
			],
			"uiux"
		],
		[
			"farm-to-market-cooperative-lead",
			"Farmer Producer Organisation (FPO) Business Lead",
			"Agri-Cooperatives",
			"Help hundreds of small farmers pool harvests, rent machinery together and negotiate fair prices directly with buyers.",
			"Auditing cooperative accounts, aggregating graded grain lots, securing bank credit and running member meetings cleanly.",
			[
				"Cooperative governance",
				"Aggregation logistics",
				"Bookkeeping",
				"Negotiation",
				"Community trust"
			],
			[
				"business",
				"social",
				"entrepreneurship"
			],
			[
				"leadership",
				"organisation",
				"communication",
				"analytical"
			],
			[
				"Business Studies",
				"Economics",
				"Accountancy"
			],
			["BBA / B.Sc. Agri → MBA Agribusiness / Rural Management (IRMA / MANAGE) → FPO CEO"],
			["Fair-trade spice, coffee or millet export cooperative"],
			["Calculate why 100 farmers selling 50 tonnes together gain leverage that 1 farmer selling 500kg alone never has"],
			false,
			3,
			"Outdoors / on the move",
			"Undergraduate Degree",
			0,
			[
				"Transforms smallholders' bargaining power",
				"Direct impact on rural prosperity",
				"Management + purpose"
			],
			[
				"Managing diverse member expectations & local politics",
				"Working capital delays",
				"Rural travel"
			],
			"List 3 transparent weighing and digital-receipt habits that prevent distrust inside a farmer collection centre.",
			[
				"fao",
				"varsity",
				"swayam"
			],
			"data"
		]
	], {
		progression: [
			"Field Trainee / Extension Fellow",
			"Specialist / Coordinator",
			"Senior Advisor / Plant Manager",
			"Regional Director or Agri-Venture Founder"
		],
		freelance: "Moderate — drone mapping, organic audits, polyhouse setup, and farm design consulting.",
		entrepreneurship: "High — solar cold storage, FPO brands, food processing, nurseries, and agri-drone services.",
		entryLevel: "FAO elearning courses, kitchen-composting experiments, rural fellowships, and state agri-university fairs.",
		costNote: "FAO elearning Academy and NCERT agricultural basics are free; ICAR state degrees have low public tuition."
	}),
	...expandCareers("Social Sciences", [
		[
			"sociologist",
			"Sociologist & Social Researcher",
			"Society & Institutions",
			"Study how housing, gender, caste, digital media and work shape everyday human choices and inequality.",
			"Conducting in-depth interviews, coding qualitative themes, analysing census trends and publishing accessible reports.",
			[
				"Ethnography & surveys",
				"Qualitative coding",
				"Statistical literacy",
				"Unbiased listening",
				"Essay writing"
			],
			[
				"social",
				"history",
				"writing"
			],
			[
				"research",
				"observation",
				"critical_thinking",
				"writing"
			],
			[
				"History",
				"Political Science",
				"English",
				"Psychology"
			],
			["B.A. Sociology → M.A. Sociology (DU / TISS / JNU / universities) → Research / Policy / UX Research"],
			["Corporate & civic UX qualitative researcher"],
			["Write 4 open, non-leading interview questions about why young people choose certain careers—avoiding yes/no prompts"],
			false,
			4,
			"Office / desk",
			"Postgraduate / Licensing",
			0,
			[
				"Sharpens ability to see hidden social patterns",
				"Feeds directly into UX research, policy & journalism",
				"Meaningful"
			],
			[
				"Academic & NGO funding cycles",
				"Qualitative rigour takes time",
				"Master's often needed for research roles"
			],
			"Explain why asking 'Don't you agree homework is stressful?' ruins survey data compared to neutral wording.",
			[
				"swayam",
				"khanHum",
				"courseraAudit"
			],
			"uiux"
		],
		[
			"economist",
			"Applied & Behavioural Economist",
			"Human Choices & Markets",
			"Examine how incentives, scarcity, credit and defaults drive real decisions by households and firms.",
			"Testing small policy nudges, cleaning household panel surveys in R/Stata and writing evidence summaries.",
			[
				"Microeconomic logic",
				"Data analysis (R/Python)",
				"Survey design",
				"Causal inference",
				"Clear writing"
			],
			[
				"mathematics",
				"social",
				"business",
				"finance"
			],
			[
				"mathematics",
				"analytical",
				"research",
				"critical_thinking"
			],
			["Economics", "Mathematics"],
			["B.A./B.Sc. Economics → M.A./M.Sc. Economics → Research labs (J-PAL), banks or tech pricing teams"],
			["Tech marketplace & pricing economist"],
			["Why did automatically enrolling workers in savings (with opt-out) raise participation far more than pamphlets?"],
			false,
			4,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Powerful lens on incentives behind tech, climate and poverty",
				"High corporate & policy versatility",
				"Rigorous"
			],
			[
				"Heavy math/econometrics in top Master's programs",
				"Correlation vs causation traps",
				"Competitive entry"
			],
			"Spot why comparing wages of degree-holders vs non-degree-holders ignores background family advantages.",
			[
				"khanEcon",
				"mitocw",
				"kaggle"
			],
			"data"
		],
		[
			"clinical-social-worker",
			"Medical & Community Social Worker",
			"Care & Social Support",
			"Connect vulnerable families, hospital patients or abused children with shelter, legal aid, therapy and welfare rights.",
			"Running home visits, coordinating hospital discharge plans, guiding welfare paperwork and advocating calmly.",
			[
				"Crisis casework",
				"Welfare navigation",
				"Trauma-informed care",
				"Active empathy",
				"Emotional boundaries"
			],
			[
				"social",
				"healthcare",
				"law"
			],
			[
				"communication",
				"observation",
				"teamwork",
				"organisation"
			],
			[
				"Psychology",
				"Political Science",
				"English"
			],
			["BSW (Bachelor of Social Work) → MSW (Master of Social Work — TISS / DU / universities)"],
			["Hospital patient-support & NGO child-protection officer"],
			["Map 3 real barriers—literacy, transport, lost ID cards—that stop an eligible elderly resident from receiving pension"],
			false,
			4,
			"With people (schools, clinics, events)",
			"Postgraduate / Licensing",
			0,
			[
				"Hands-on frontline advocacy changing real lives",
				"Works across hospitals, courts, schools and NGOs",
				"Purposeful"
			],
			[
				"Heavy caseloads & emotional vicarious trauma",
				"Slow government welfare portals",
				"Modest salaries"
			],
			"Practice listening to someone vent a tough problem for 2 minutes WITHOUT interrupting with quick advice.",
			[
				"swayam",
				"openwho",
				"courseraAudit"
			],
			"uiux"
		],
		[
			"anthropologist",
			"Cultural & Design Anthropologist",
			"Human Culture & Ethnography",
			"Spend immersive time observing how communities use language, rituals, money and tools in real life.",
			"Shadowing families or shopkeepers in context, writing thick field notes and uncovering unspoken design truths.",
			[
				"Contextual inquiry",
				"Cultural humility",
				"Field-note craft",
				"Pattern synthesis",
				"Storytelling"
			],
			[
				"social",
				"history",
				"travel",
				"design"
			],
			[
				"observation",
				"research",
				"writing",
				"communication"
			],
			[
				"History",
				"English",
				"Geography",
				"Psychology"
			],
			["B.A./M.A. Anthropology → Academic research OR Corporate Design Research / Consumer Insights"],
			["Design-agency ethnographer studying rural/mobile users"],
			["Watch how people actually use a kitchen or bus ticket counter for 10 minutes—notice 2 clever homegrown workarounds"],
			false,
			4,
			"Outdoors / on the move",
			"Postgraduate / Licensing",
			0,
			[
				"Surprising high-paying bridge into tech UX & product design",
				"Deep cultural empathy",
				"Fascinating fieldwork"
			],
			[
				"Very few pure academic roles",
				"Requires reframing skills clearly for industry",
				"Long field immersion"
			],
			"Why do people often TELL a survey they save neatly, while observing their actual habits shows something totally different?",
			[
				"khanHum",
				"swayam",
				"figma"
			],
			"uiux"
		],
		[
			"political-analyst",
			"Political & Geopolitical Risk Analyst",
			"Governance & Elections",
			"Track public opinion, state legislation, election shifts and geopolitical trade risks for newsrooms, firms or NGOs.",
			"Checking voter-turnout data, reading manifesto commitments vs past budgets and writing neutral scenario briefings.",
			[
				"Electoral data analysis",
				"Institutional literacy",
				"Neutral framing",
				"Rapid reading",
				"Briefing"
			],
			[
				"government",
				"history",
				"writing",
				"law"
			],
			[
				"critical_thinking",
				"research",
				"writing",
				"analytical"
			],
			[
				"Political Science",
				"History",
				"Economics",
				"Mathematics"
			],
			["B.A. Political Science / History / Journalism → M.A. IR / Public Policy / Political Risk Firms"],
			["Election survey methodology & civic media analyst"],
			["Compare 2 election promises from any past campaign and list what budget or legal steps each actually required"],
			false,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"High intellectual engagement with current affairs",
				"Blends history, stats and strategy",
				"Media & advisory routes"
			],
			[
				"Partisan echo chambers test neutrality",
				"Tight election-cycle sprints",
				"Contractual project cycles"
			],
			"Identify 3 flaws that make a flashy street-corner TV poll unrepresentative of an entire constituency.",
			[
				"swayam",
				"ncert",
				"kaggle"
			],
			"data"
		],
		[
			"urban-sociologist",
			"Urban Inequality & Housing Researcher",
			"Cities & Communities",
			"Study commuter safety, informal settlements, public parks and neighbourhood belonging to guide fairer cities.",
			"Walking neighbourhoods with women/elderly residents, running safety audits and co-designing community centres.",
			[
				"Participatory mapping",
				"Survey stats",
				"Urban policy",
				"Facilitation",
				"Clear advocacy writing"
			],
			[
				"social",
				"environment",
				"design",
				"government"
			],
			[
				"observation",
				"research",
				"communication",
				"critical_thinking"
			],
			[
				"Geography",
				"Political Science",
				"Economics"
			],
			["Sociology / Urban Studies / Planning → Urban research centres (IIHS / CPR / municipal think tanks)"],
			["Safe-cities & women's transit accessibility researcher"],
			["Check a bus stop at 7 PM: note lighting, clear sightlines, nearby shops and benches that make waits feel safe or risky"],
			true,
			4,
			"Outdoors / on the move",
			"Postgraduate / Licensing",
			0,
			[
				"Shapes safer streets, parks and housing policy",
				"Tangible local fieldwork",
				"Bridges planning & people"
			],
			[
				"City planners sometimes ignore social research",
				"Grant-funded project cycles",
				"Master's helpful"
			],
			"Why does demolishing an informal slum without nearby transit jobs often recreate another informal settlement nearby?",
			[
				"swayam",
				"unccl",
				"khanHum"
			],
			"uiux"
		],
		[
			"development-program-evaluator",
			"Monitoring & Evaluation (M&E) Specialist",
			"Impact Measurement",
			"Measure objectively whether NGOs, scholarships or health drives actually improved lives—not just spent money.",
			"Designing baseline/endline questionnaires, running randomised comparisons and building donor/public impact dashboards.",
			[
				"Theory of Change",
				"Survey sampling",
				"Excel / R / KoboToolbox",
				"Statistical rigour",
				"Honest reporting"
			],
			[
				"social",
				"mathematics",
				"government"
			],
			[
				"analytical",
				"research",
				"mathematics",
				"critical_thinking"
			],
			[
				"Mathematics",
				"Economics",
				"Psychology"
			],
			["Social Sciences / Stats / Econ → M&E Officer at NGOs, foundations or CSR teams"],
			["CSR & foundation impact-audit consultant"],
			["Spot the flaw: an NGO counts '5,000 pamphlets printed' as proof that villagers changed a health habit"],
			false,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Combines math rigour with humanitarian work",
				"Essential in almost every mid-to-large NGO & CSR team",
				"Clear career"
			],
			[
				"Finding programs didn't work as hoped is awkward to report",
				"Messy field surveys",
				"Frequent project audits"
			],
			"Distinguish Output ('built 10 handpumps') from Outcome ('families spend 45 min less walking for clean water').",
			[
				"khanEcon",
				"kaggle",
				"courseraAudit"
			],
			"data"
		],
		[
			"criminologist",
			"Criminologist & Restorative Justice Researcher",
			"Crime Prevention & Reform",
			"Study roots of youth offending, prison rehabilitation, urban crime prevention and victim support policy.",
			"Analysing court/police recidivism statistics, evaluating job-training inside prisons and advising justice reform.",
			[
				"Criminal justice systems",
				"Statistical analysis",
				"Ethical interviewing",
				"Policy writing",
				"Objectivity"
			],
			[
				"social",
				"law",
				"government"
			],
			[
				"research",
				"critical_thinking",
				"analytical",
				"writing"
			],
			[
				"Psychology",
				"Political Science",
				"History"
			],
			["B.A. Psychology/Sociology/Law → M.A./M.Sc. Criminology (NFSU / TISS / NICFS)"],
			["Cybercrime victim-support & youth diversion coordinator"],
			["Examine why teaching a practical trade plus housing support cuts repeat offending far better than longer isolation alone"],
			false,
			4,
			"Office / desk",
			"Postgraduate / Licensing",
			0,
			[
				"Replaces fear-driven policy with evidence and rehabilitation",
				"Fascinating intersection of law & psychology",
				"Purpose"
			],
			[
				"Heavy subject matter",
				"Slow institutional justice reform",
				"Master's needed for specialist positions"
			],
			"Look at why well-lit busy pedestrian streets deter theft naturally ('eyes on the street') more than blank walls.",
			[
				"swayam",
				"khanHum",
				"ncert"
			],
			"cyber"
		],
		[
			"demographer-population-analyst",
			"Demographer & Population Health Analyst",
			"Population Dynamics",
			"Forecast aging populations, migration flows, school seat needs and healthcare demand across decades.",
			"Building age-sex population pyramids, analysing fertility/mortality shifts and briefing pension or school planners.",
			[
				"Demographic math",
				"Census & NFHS data",
				"R / Python",
				"Visual storytelling",
				"Long-term thinking"
			],
			[
				"mathematics",
				"social",
				"healthcare",
				"government"
			],
			[
				"mathematics",
				"analytical",
				"research",
				"organisation"
			],
			[
				"Mathematics",
				"Geography",
				"Economics"
			],
			["Statistics / Geography / Econ → M.Sc./MPS Population Studies (IIPS Mumbai / JNU)"],
			["Retail site-expansion & healthcare demographic planner"],
			["Why must a district with falling birth rates and rising life expectancy start retraining pediatric space for elder care?"],
			false,
			4,
			"Office / desk",
			"Postgraduate / Licensing",
			0,
			[
				"Extraordinarily accurate long-range planning power",
				"Clear IIPS/demography fellowship pipeline",
				"High impact"
			],
			[
				"Very specialised academic field",
				"Census delays skew fresh data",
				"Heavy demographic life-table math"
			],
			"Sketch how a city's housing size changes when young professionals migrate in alone vs families settling long-term.",
			[
				"kaggle",
				"khanEcon",
				"swayam"
			],
			"data"
		],
		[
			"behavioural-economics-researcher",
			"Behavioural Insights & Nudge Specialist",
			"Decision Psychology",
			"Test small design tweaks—clearer reminders, simpler forms, default savings—that help people follow through on goals.",
			"Running ethical A/B field trials on SMS/app wording, reading cognitive bias papers and spotting friction points.",
			[
				"Cognitive psychology",
				"A/B experiment design",
				"Copy simplification",
				"Ethics against dark patterns",
				"Stats"
			],
			[
				"social",
				"design",
				"business",
				"healthcare"
			],
			[
				"observation",
				"analytical",
				"creativity",
				"communication"
			],
			[
				"Psychology",
				"Economics",
				"Mathematics",
				"English"
			],
			["Psychology / Economics / Design UG → Behavioural Science teams in fintech, health & gov"],
			["Ethical product growth & patient-adherence specialist"],
			["Spot the difference between an ethical 'nudge' (auto-reminding vaccine dates) and a manipulative 'dark pattern' (hidden unsubscribe)"],
			true,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Practical psychology driving fintech, health and climate action",
				"Creative experiment design",
				"Modern"
			],
			[
				"Small effect sizes—nudges can't replace missing infrastructure",
				"Replication crisis requires careful testing",
				"Niche"
			],
			"Rewrite a scary overdue library fine notice so students actually return books early instead of avoiding the desk.",
			[
				"laws",
				"courseraAudit",
				"khanEcon"
			],
			"uiux"
		],
		[
			"community-organiser",
			"Civic Participation & Community Organiser",
			"Grassroots Mobilisation",
			"Help tenants, youth or neighbourhood groups turn shared frustrations into constructive civic action and mutual aid.",
			"Listening door-to-door, running calm inclusive town meetings, building local leadership and petitioning councils.",
			[
				"Deep listening",
				"Meeting facilitation",
				"Coalition building",
				"Non-violent advocacy",
				"Resilience"
			],
			[
				"social",
				"government",
				"environment"
			],
			[
				"leadership",
				"communication",
				"teamwork",
				"public_speaking"
			],
			[
				"Political Science",
				"History",
				"English"
			],
			["Any background + student union, climate youth networks or grassroots civic orgs"],
			["Resident welfare, cooperative & labour-rights organiser"],
			["Run a 15-minute group meeting where the 2 quietest people get heard cleanly instead of one loud voice dominating"],
			false,
			2,
			"With people (schools, clinics, events)",
			"Class 10+",
			0,
			[
				"Zero academic gatekeeping—pure relational skill",
				"Builds real democratic muscle locally",
				"Energising teamwork"
			],
			[
				"High burnout if you carry everyone's problems alone",
				"Modest non-profit funding",
				"Slow wins"
			],
			"Turn a vague group complaint ('our park is messy!') into 1 specific ask to 1 responsible municipal office.",
			[
				"swayam",
				"khanHum",
				"ncert"
			],
			"marketing"
		],
		[
			"gender-equity-researcher",
			"Gender, Inclusion & Workplace Equity Specialist",
			"Social Inclusion",
			"Audit safety, transport access, pay gaps and parental policies so institutions work fairly for everyone.",
			"Analysing workforce retention data, facilitating POSH/safety committees, reviewing transit lighting and advising HR.",
			[
				"Inclusion auditing",
				"Data disaggregation",
				"Policy drafting",
				"Sensitive facilitation",
				"Legal compliance"
			],
			[
				"social",
				"law",
				"business",
				"government"
			],
			[
				"critical_thinking",
				"research",
				"communication",
				"observation"
			],
			[
				"Political Science",
				"Psychology",
				"Economics",
				"English"
			],
			["Social Sciences / Law / HR → M.A. Gender Studies / TISS / Corporate DEI & POSH Advisory"],
			["Accessible & safe-transit urban auditor"],
			["Why does splitting city bus usage data by gender and time of day reveal safety gaps hidden in total passenger counts?"],
			true,
			3,
			"Office / desk",
			"Undergraduate Degree",
			0,
			[
				"Directly improves workplace dignity and street safety",
				"Growing corporate & multilateral demand",
				"Meaningful"
			],
			[
				"Facing performative tokenism vs real structural change",
				"Emotional resistance in workshops",
				"Policy complexity"
			],
			"Check an empty job posting for 2 subtle unnecessary phrases that discourage qualified caregivers or career-returners.",
			[
				"swayam",
				"courseraAudit",
				"khanHum"
			],
			"uiux"
		],
		[
			"conflict-peace-researcher",
			"Peacebuilding & Community Dialogue Facilitator",
			"Conflict Transformation",
			"Design safe dialogue spaces across divided communities or campuses to prevent escalation and build practical trust.",
			"Mapping root grievances neutrally, training youth mediators and facilitating joint problem-solving projects.",
			[
				"Restorative circles",
				"Conflict mapping",
				"Deep neutrality",
				"Cross-cultural tact",
				"Grant reporting"
			],
			[
				"social",
				"law",
				"history",
				"travel"
			],
			[
				"communication",
				"observation",
				"critical_thinking",
				"leadership"
			],
			[
				"History",
				"Political Science",
				"Psychology",
				"English"
			],
			["Social Sciences / IR → M.A. Peace & Conflict Studies / Humanitarian NGOs / UN agencies"],
			["University restorative-justice & campus dialogue lead"],
			["Practice summarising an opponent's viewpoint so accurately that they say 'Yes, that IS what I meant' before replying"],
			false,
			4,
			"With people (schools, clinics, events)",
			"Postgraduate / Licensing",
			0,
			[
				"Deep human diplomacy craft",
				"Valued in humanitarian, campus and multilateral work",
				"Life skill"
			],
			[
				"Emotionally intense environments",
				"Relies on institutional/NGO grants",
				"Postgraduate often expected"
			],
			"Design one shared practical task (like fixing a shared water pump) that gets two feuding groups cooperating side by side.",
			[
				"swayam",
				"courseraAudit",
				"khanHum"
			],
			"uiux"
		]
	], {
		progression: [
			"Research / Field Associate",
			"Analyst / Caseworker / Facilitator",
			"Senior Researcher / Lead",
			"Director or Principal Fellow"
		],
		freelance: "Moderate-High — UX ethnography, M&E impact audits, behavioural copy design, and inclusion advisory.",
		entrepreneurship: "Moderate — research consultancies, civic design labs, and community wellness/inclusion firms.",
		entryLevel: "Campus research assistantships, local civic volunteering, open NFHS/census data analysis, and fellowships.",
		costNote: "SWAYAM, Khan Academy, and public census/survey datasets are free; MSW/MA public universities have modest tuition."
	})
];
//#endregion
//#region src/lib/careers.ts
var CAREERS = [...CAREERS_PART_1, ...CAREERS_PART_2];
var BY_ID = new Map(CAREERS.map((c) => [c.id, c]));
var getCareer = (id, extraCatalog) => {
	if (extraCatalog?.length) {
		const found = extraCatalog.find((c) => c.id === id);
		if (found) return found;
	}
	return BY_ID.get(id);
};
var HUE_CLASS = {
	lavender: {
		text: "text-lavender-bright",
		bg: "bg-lavender/15",
		border: "border-lavender/40"
	},
	cyan: {
		text: "text-cyan",
		bg: "bg-cyan/15",
		border: "border-cyan/40"
	},
	turquoise: {
		text: "text-turquoise",
		bg: "bg-turquoise/15",
		border: "border-turquoise/40"
	},
	pink: {
		text: "text-pink",
		bg: "bg-pink/15",
		border: "border-pink/40"
	},
	violet: {
		text: "text-lavender",
		bg: "bg-violet/25",
		border: "border-violet/50"
	},
	warning: {
		text: "text-warning",
		bg: "bg-warning/15",
		border: "border-warning/40"
	}
};
//#endregion
export { actions as a, useFirebaseStoreSync as c, INDUSTRIES as i, HUE_CLASS as n, roadmapProgress as o, getCareer as r, useApp as s, CAREERS as t };
