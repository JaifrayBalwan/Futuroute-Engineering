import { A as updateDoc, C as deleteDoc, D as orderBy, E as limit, F as serverTimestamp, M as writeBatch, N as collection, O as query, P as doc, S as isFirebaseConfigured, T as getDocs, b as db, j as where, k as setDoc, v as OperationType, w as getDoc, x as handleFirestoreError, y as auth } from "./auth-ByhFdEgm.js";
//#region src/lib/db.ts
var cleanStr = (v, max) => typeof v === "string" ? v.trim().slice(0, max) : "";
var cleanList = (arr, maxItems, maxLen = 80) => {
	if (!Array.isArray(arr)) return [];
	const out = [];
	for (const item of arr) if (typeof item === "string" && item.trim()) {
		out.push(item.trim().slice(0, maxLen));
		if (out.length >= maxItems) break;
	}
	return out;
};
var toMs = (t) => {
	if (t && typeof t === "object" && "toMillis" in t && typeof t.toMillis === "function") return t.toMillis();
	return Date.now();
};
var safeId = (raw) => raw.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 128) || "item";
function canWriteFirestore() {
	return isFirebaseConfigured && Boolean(auth.currentUser && auth.currentUser.emailVerified);
}
async function getUserProfile(uid) {
	if (!isFirebaseConfigured) return null;
	const path = `users/${uid}`;
	try {
		const snap = await getDoc(doc(db, "users", uid));
		if (!snap.exists()) return null;
		const d = snap.data();
		return {
			uid: String(d["uid"] ?? uid),
			displayName: String(d["displayName"] ?? ""),
			email: typeof d["email"] === "string" ? d["email"] : void 0,
			ageRange: typeof d["ageRange"] === "string" ? d["ageRange"] : void 0,
			educationLevel: typeof d["educationLevel"] === "string" ? d["educationLevel"] : void 0,
			stream: typeof d["stream"] === "string" ? d["stream"] : void 0,
			academicYear: typeof d["academicYear"] === "string" ? d["academicYear"] : void 0,
			subjects: Array.isArray(d["subjects"]) ? d["subjects"] : [],
			interests: Array.isArray(d["interests"]) ? d["interests"] : [],
			capabilities: Array.isArray(d["capabilities"]) ? d["capabilities"] : [],
			currentSkills: Array.isArray(d["currentSkills"]) ? d["currentSkills"] : [],
			weaknesses: Array.isArray(d["weaknesses"]) ? d["weaknesses"] : [],
			environment: typeof d["environment"] === "string" ? d["environment"] : void 0,
			budget: typeof d["budget"] === "number" ? d["budget"] : 0,
			weeklyHours: typeof d["weeklyHours"] === "number" ? d["weeklyHours"] : 5,
			learningPreferences: Array.isArray(d["learningPreferences"]) ? d["learningPreferences"] : [],
			shortGoal: typeof d["shortGoal"] === "string" ? d["shortGoal"] : void 0,
			longGoal: typeof d["longGoal"] === "string" ? d["longGoal"] : void 0,
			expectedStartingSalaryInr: typeof d["expectedStartingSalaryInr"] === "number" ? d["expectedStartingSalaryInr"] : void 0,
			desiredLongTermSalaryInr: typeof d["desiredLongTermSalaryInr"] === "number" ? d["desiredLongTermSalaryInr"] : void 0,
			preferredWorkLocation: d["preferredWorkLocation"] === "India" || d["preferredWorkLocation"] === "Abroad" || d["preferredWorkLocation"] === "Both" ? d["preferredWorkLocation"] : void 0,
			willingToInvestEducation: d["willingToInvestEducation"] === "Yes" || d["willingToInvestEducation"] === "Limited / Free-first" || d["willingToInvestEducation"] === "No" ? d["willingToInvestEducation"] : void 0,
			educationBudgetInr: typeof d["educationBudgetInr"] === "number" ? d["educationBudgetInr"] : void 0,
			willingHigherEducation: d["willingHigherEducation"] === "Yes" || d["willingHigherEducation"] === "Maybe" || d["willingHigherEducation"] === "No" ? d["willingHigherEducation"] : void 0,
			onboarded: Boolean(d["onboarded"]),
			createdAt: d["createdAt"],
			updatedAt: d["updatedAt"]
		};
	} catch (error) {
		handleFirestoreError(error, OperationType.GET, path);
	}
}
async function upsertUserProfile(uid, input) {
	if (!canWriteFirestore()) return;
	const path = `users/${uid}`;
	const ref = doc(db, "users", uid);
	try {
		const existing = await getDoc(ref);
		const payload = {
			uid,
			displayName: cleanStr(input.displayName, 100) || "Student",
			subjects: cleanList(input.subjects, 20),
			interests: cleanList(input.interests, 25),
			capabilities: cleanList(input.capabilities, 20),
			currentSkills: cleanList(input.currentSkills ?? [], 25),
			weaknesses: cleanList(input.weaknesses ?? [], 15),
			budget: Math.max(0, Math.min(1e7, Math.round(Number(input.budget) || 0))),
			weeklyHours: Math.max(1, Math.min(60, Math.round(Number(input.weeklyHours) || 5))),
			learningPreferences: cleanList(input.learningPreferences, 10),
			onboarded: Boolean(input.onboarded),
			updatedAt: serverTimestamp()
		};
		if (input.email) payload["email"] = cleanStr(input.email, 200);
		if (input.ageRange) payload["ageRange"] = cleanStr(input.ageRange, 40);
		if (input.educationLevel) payload["educationLevel"] = cleanStr(input.educationLevel, 80);
		if (input.stream) payload["stream"] = cleanStr(input.stream, 80);
		if (input.academicYear) payload["academicYear"] = cleanStr(input.academicYear, 60);
		if (input.environment) payload["environment"] = cleanStr(input.environment, 100);
		if (input.shortGoal) payload["shortGoal"] = cleanStr(input.shortGoal, 240);
		if (input.longGoal) payload["longGoal"] = cleanStr(input.longGoal, 240);
		if (typeof input.expectedStartingSalaryInr === "number" && input.expectedStartingSalaryInr >= 0) payload["expectedStartingSalaryInr"] = Math.min(1e8, Math.round(input.expectedStartingSalaryInr));
		if (typeof input.desiredLongTermSalaryInr === "number" && input.desiredLongTermSalaryInr >= 0) payload["desiredLongTermSalaryInr"] = Math.min(5e8, Math.round(input.desiredLongTermSalaryInr));
		if (input.preferredWorkLocation) payload["preferredWorkLocation"] = input.preferredWorkLocation;
		if (input.willingToInvestEducation) payload["willingToInvestEducation"] = input.willingToInvestEducation;
		if (typeof input.educationBudgetInr === "number" && input.educationBudgetInr >= 0) payload["educationBudgetInr"] = Math.min(5e7, Math.round(input.educationBudgetInr));
		if (input.willingHigherEducation) payload["willingHigherEducation"] = input.willingHigherEducation;
		if (existing.exists()) await updateDoc(ref, payload);
		else await setDoc(ref, {
			...payload,
			createdAt: serverTimestamp()
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.WRITE, path);
	}
}
async function logUserActivity(uid, text, kind) {
	if (!canWriteFirestore()) return;
	const id = `act-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
	const path = `users/${uid}/activity/${id}`;
	try {
		await setDoc(doc(db, "users", uid, "activity", id), {
			userId: uid,
			text: cleanStr(text, 240) || "Updated exploration",
			kind,
			createdAt: serverTimestamp()
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.CREATE, path);
	}
}
async function listUserActivity(uid) {
	if (!isFirebaseConfigured) return [];
	const path = `users/${uid}/activity`;
	try {
		const q = query(collection(db, "users", uid, "activity"), where("userId", "==", uid), orderBy("createdAt", "desc"), limit(20));
		return (await getDocs(q)).docs.map((d) => {
			const data = d.data();
			return {
				id: d.id,
				userId: String(data["userId"] ?? uid),
				text: String(data["text"] ?? ""),
				kind: data["kind"] ?? "discover",
				createdAtMs: toMs(data["createdAt"])
			};
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.LIST, path);
	}
}
async function listSavedCareers(uid) {
	if (!isFirebaseConfigured) return [];
	const path = `users/${uid}/saved_careers`;
	try {
		const q = query(collection(db, "users", uid, "saved_careers"), where("userId", "==", uid));
		return (await getDocs(q)).docs.map((d) => {
			const data = d.data();
			return {
				userId: String(data["userId"] ?? uid),
				careerId: String(data["careerId"] ?? d.id),
				folder: data["folder"] ?? "top",
				note: typeof data["note"] === "string" ? data["note"] : void 0,
				createdAt: data["createdAt"],
				updatedAt: data["updatedAt"]
			};
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.LIST, path);
	}
}
async function saveCareerToFolder(uid, careerId, folder = "top", note) {
	if (!canWriteFirestore()) return;
	const cid = safeId(careerId);
	const path = `users/${uid}/saved_careers/${cid}`;
	const ref = doc(db, "users", uid, "saved_careers", cid);
	try {
		const existing = await getDoc(ref);
		const payload = {
			userId: uid,
			careerId: cid,
			folder,
			updatedAt: serverTimestamp()
		};
		if (note !== void 0) payload["note"] = cleanStr(note, 400);
		if (existing.exists()) await updateDoc(ref, payload);
		else await setDoc(ref, {
			...payload,
			createdAt: serverTimestamp()
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.WRITE, path);
	}
}
async function removeSavedCareer(uid, careerId) {
	if (!canWriteFirestore()) return;
	const cid = safeId(careerId);
	const path = `users/${uid}/saved_careers/${cid}`;
	try {
		await deleteDoc(doc(db, "users", uid, "saved_careers", cid));
	} catch (error) {
		handleFirestoreError(error, OperationType.DELETE, path);
	}
}
async function saveComparison(uid, careerIds, title, note) {
	const id = `cmp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
	if (!canWriteFirestore()) return id;
	const path = `users/${uid}/comparisons/${id}`;
	try {
		const payload = {
			userId: uid,
			careerIds: cleanList(careerIds, 3, 128),
			title: cleanStr(title, 180) || "Career Comparison",
			createdAt: serverTimestamp()
		};
		if (note) payload["note"] = cleanStr(note, 500);
		await setDoc(doc(db, "users", uid, "comparisons", id), payload);
		return id;
	} catch (error) {
		handleFirestoreError(error, OperationType.CREATE, path);
	}
}
async function listComparisons(uid) {
	if (!isFirebaseConfigured) return [];
	const path = `users/${uid}/comparisons`;
	try {
		const q = query(collection(db, "users", uid, "comparisons"), where("userId", "==", uid), orderBy("createdAt", "desc"), limit(20));
		return (await getDocs(q)).docs.map((d) => {
			const data = d.data();
			return {
				id: d.id,
				userId: String(data["userId"] ?? uid),
				careerIds: Array.isArray(data["careerIds"]) ? data["careerIds"] : [],
				title: String(data["title"] ?? "Comparison"),
				note: typeof data["note"] === "string" ? data["note"] : void 0,
				createdAtMs: toMs(data["createdAt"])
			};
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.LIST, path);
	}
}
async function deleteComparison(uid, comparisonId) {
	if (!canWriteFirestore()) return;
	const id = safeId(comparisonId);
	const path = `users/${uid}/comparisons/${id}`;
	try {
		await deleteDoc(doc(db, "users", uid, "comparisons", id));
	} catch (error) {
		handleFirestoreError(error, OperationType.DELETE, path);
	}
}
async function saveAssessment(uid, answers, groups, source) {
	const id = `asm-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
	if (!canWriteFirestore()) return id;
	const path = `users/${uid}/assessments/${id}`;
	try {
		const boundedAnswers = {};
		for (const [k, v] of Object.entries(answers).slice(0, 25)) boundedAnswers[k] = v;
		const boundedGroups = {};
		for (const [k, v] of Object.entries(groups).slice(0, 6)) boundedGroups[k] = v;
		await setDoc(doc(db, "users", uid, "assessments", id), {
			userId: uid,
			answers: boundedAnswers,
			groups: boundedGroups,
			source,
			createdAt: serverTimestamp()
		});
		return id;
	} catch (error) {
		handleFirestoreError(error, OperationType.CREATE, path);
	}
}
async function listAssessments(uid) {
	if (!isFirebaseConfigured) return [];
	const path = `users/${uid}/assessments`;
	try {
		const q = query(collection(db, "users", uid, "assessments"), where("userId", "==", uid), orderBy("createdAt", "desc"), limit(10));
		return (await getDocs(q)).docs.map((d) => {
			const data = d.data();
			return {
				id: d.id,
				userId: String(data["userId"] ?? uid),
				answers: data["answers"] ?? {},
				groups: data["groups"] ?? {},
				source: data["source"] === "gemini" ? "gemini" : "deterministic",
				createdAtMs: toMs(data["createdAt"])
			};
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.LIST, path);
	}
}
async function createRoadmapWithTasks(uid, roadmap, tasks) {
	const roadmapId = `rm-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
	if (!canWriteFirestore()) return roadmapId;
	const roadmapPath = `users/${uid}/roadmaps/${roadmapId}`;
	try {
		const rmRef = doc(db, "users", uid, "roadmaps", roadmapId);
		await setDoc(rmRef, {
			userId: uid,
			careerId: safeId(roadmap.careerId),
			title: cleanStr(roadmap.title, 160) || "Learning Roadmap",
			level: roadmap.level,
			hours: Math.max(1, Math.min(60, Math.round(roadmap.hours))),
			budget: Math.max(0, Math.min(1e7, Math.round(roadmap.budget))),
			format: cleanStr(roadmap.format ?? "mixed", 40),
			project: cleanStr(roadmap.project ?? "", 300),
			weeks: Math.max(1, Math.min(260, Math.round(roadmap.weeks ?? 8))),
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp()
		});
		const batch = writeBatch(db);
		tasks.slice(0, 60).forEach((t, idx) => {
			const tid = safeId(t.id || `task-${idx + 1}`);
			const tRef = doc(db, "users", uid, "roadmaps", roadmapId, "tasks", tid);
			const taskDoc = {
				userId: uid,
				roadmapId,
				phase: Math.max(1, Math.min(5, Math.round(t.phase))),
				week: Math.max(1, Math.min(260, Math.round(t.week ?? idx + 1))),
				position: idx,
				title: cleanStr(t.title, 200) || `Task ${idx + 1}`,
				desc: cleanStr(t.desc ?? "", 600),
				effort: cleanStr(t.effort ?? "", 80),
				resource: t.resource && t.resource.name && t.resource.url ? {
					name: cleanStr(t.resource.name, 160),
					url: cleanStr(t.resource.url, 400)
				} : null,
				freeAlternative: t.freeAlternative && t.freeAlternative.name && t.freeAlternative.url ? {
					name: cleanStr(t.freeAlternative.name, 160),
					url: cleanStr(t.freeAlternative.url, 400)
				} : null,
				done: Boolean(t.done),
				updatedAt: serverTimestamp()
			};
			if (t.objectives?.length) taskDoc["objectives"] = cleanList(t.objectives, 8, 180);
			if (t.difficulty) taskDoc["difficulty"] = t.difficulty;
			if (t.practicalTask) taskDoc["practicalTask"] = cleanStr(t.practicalTask, 400);
			batch.set(tRef, taskDoc);
		});
		await batch.commit();
		return roadmapId;
	} catch (error) {
		handleFirestoreError(error, OperationType.WRITE, roadmapPath);
	}
}
async function listRoadmapsWithTasks(uid) {
	if (!isFirebaseConfigured) return [];
	const path = `users/${uid}/roadmaps`;
	try {
		const q = query(collection(db, "users", uid, "roadmaps"), where("userId", "==", uid), orderBy("updatedAt", "desc"), limit(20));
		const snap = await getDocs(q);
		const out = [];
		for (const d of snap.docs) {
			const data = d.data();
			const tasksPath = `users/${uid}/roadmaps/${d.id}/tasks`;
			let tasks = [];
			try {
				const tq = query(collection(db, "users", uid, "roadmaps", d.id, "tasks"), where("userId", "==", uid), orderBy("position", "asc"));
				tasks = (await getDocs(tq)).docs.map((td) => {
					const tdData = td.data();
					const diff = tdData["difficulty"];
					return {
						id: td.id,
						userId: String(tdData["userId"] ?? uid),
						roadmapId: d.id,
						phase: Number(tdData["phase"] ?? 1),
						week: typeof tdData["week"] === "number" ? tdData["week"] : void 0,
						position: Number(tdData["position"] ?? 0),
						title: String(tdData["title"] ?? ""),
						desc: typeof tdData["desc"] === "string" ? tdData["desc"] : void 0,
						effort: typeof tdData["effort"] === "string" ? tdData["effort"] : void 0,
						objectives: Array.isArray(tdData["objectives"]) ? tdData["objectives"] : void 0,
						difficulty: diff === "Beginner" || diff === "Intermediate" || diff === "Advanced" ? diff : void 0,
						practicalTask: typeof tdData["practicalTask"] === "string" ? tdData["practicalTask"] : void 0,
						freeAlternative: tdData["freeAlternative"] ?? null,
						note: typeof tdData["note"] === "string" ? tdData["note"] : void 0,
						resource: tdData["resource"] ?? null,
						done: Boolean(tdData["done"])
					};
				});
			} catch (err) {
				handleFirestoreError(err, OperationType.LIST, tasksPath);
			}
			out.push({
				id: d.id,
				userId: String(data["userId"] ?? uid),
				careerId: String(data["careerId"] ?? ""),
				title: String(data["title"] ?? "Roadmap"),
				level: data["level"] ?? "beginner",
				hours: Number(data["hours"] ?? 5),
				budget: Number(data["budget"] ?? 0),
				format: typeof data["format"] === "string" ? data["format"] : void 0,
				project: typeof data["project"] === "string" ? data["project"] : void 0,
				weeks: typeof data["weeks"] === "number" ? data["weeks"] : void 0,
				createdAtMs: toMs(data["createdAt"]),
				updatedAtMs: toMs(data["updatedAt"]),
				tasks
			});
		}
		return out;
	} catch (error) {
		handleFirestoreError(error, OperationType.LIST, path);
	}
}
async function toggleRoadmapTaskInDb(uid, roadmapId, taskId, done) {
	if (!canWriteFirestore()) return;
	const path = `users/${uid}/roadmaps/${roadmapId}/tasks/${taskId}`;
	try {
		await updateDoc(doc(db, "users", uid, "roadmaps", roadmapId, "tasks", taskId), {
			done,
			updatedAt: serverTimestamp()
		});
		await updateDoc(doc(db, "users", uid, "roadmaps", roadmapId), { updatedAt: serverTimestamp() });
	} catch (error) {
		handleFirestoreError(error, OperationType.UPDATE, path);
	}
}
async function updateRoadmapTaskNoteInDb(uid, roadmapId, taskId, note) {
	if (!canWriteFirestore()) return;
	const path = `users/${uid}/roadmaps/${roadmapId}/tasks/${taskId}`;
	try {
		await updateDoc(doc(db, "users", uid, "roadmaps", roadmapId, "tasks", taskId), {
			note: cleanStr(note, 400),
			updatedAt: serverTimestamp()
		});
		await updateDoc(doc(db, "users", uid, "roadmaps", roadmapId), { updatedAt: serverTimestamp() });
	} catch (error) {
		handleFirestoreError(error, OperationType.UPDATE, path);
	}
}
async function addCustomTaskToRoadmap(uid, roadmapId, task) {
	if (!canWriteFirestore()) return;
	const tid = safeId(task.id);
	const path = `users/${uid}/roadmaps/${roadmapId}/tasks/${tid}`;
	try {
		const taskDoc = {
			userId: uid,
			roadmapId,
			phase: Math.max(1, Math.min(5, Math.round(task.phase))),
			week: Math.max(1, Math.min(260, Math.round(task.week ?? 1))),
			position: Math.max(0, Math.min(500, Math.round(task.position))),
			title: cleanStr(task.title, 200),
			desc: cleanStr(task.desc ?? "", 600),
			effort: cleanStr(task.effort ?? "", 80),
			resource: task.resource ?? null,
			done: Boolean(task.done),
			updatedAt: serverTimestamp()
		};
		if (task.objectives?.length) taskDoc["objectives"] = cleanList(task.objectives, 8, 180);
		if (task.difficulty) taskDoc["difficulty"] = task.difficulty;
		if (task.practicalTask) taskDoc["practicalTask"] = cleanStr(task.practicalTask, 400);
		await setDoc(doc(db, "users", uid, "roadmaps", roadmapId, "tasks", tid), taskDoc);
		await updateDoc(doc(db, "users", uid, "roadmaps", roadmapId), { updatedAt: serverTimestamp() });
	} catch (error) {
		handleFirestoreError(error, OperationType.CREATE, path);
	}
}
async function resetRoadmapTasksInDb(uid, roadmapId, taskIds) {
	if (!canWriteFirestore() || taskIds.length === 0) return;
	const path = `users/${uid}/roadmaps/${roadmapId}/tasks`;
	try {
		const batch = writeBatch(db);
		for (const tid of taskIds.slice(0, 60)) batch.update(doc(db, "users", uid, "roadmaps", roadmapId, "tasks", tid), {
			done: false,
			updatedAt: serverTimestamp()
		});
		batch.update(doc(db, "users", uid, "roadmaps", roadmapId), { updatedAt: serverTimestamp() });
		await batch.commit();
	} catch (error) {
		handleFirestoreError(error, OperationType.UPDATE, path);
	}
}
async function updateRoadmapHoursInDb(uid, roadmapId, hours, weeks) {
	if (!canWriteFirestore()) return;
	const path = `users/${uid}/roadmaps/${roadmapId}`;
	try {
		await updateDoc(doc(db, "users", uid, "roadmaps", roadmapId), {
			hours: Math.max(1, Math.min(60, Math.round(hours))),
			weeks: Math.max(1, Math.min(260, Math.round(weeks))),
			updatedAt: serverTimestamp()
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.UPDATE, path);
	}
}
async function updateRoadmapTitleInDb(uid, roadmapId, title) {
	if (!canWriteFirestore()) return;
	const path = `users/${uid}/roadmaps/${roadmapId}`;
	try {
		await updateDoc(doc(db, "users", uid, "roadmaps", roadmapId), {
			title: cleanStr(title, 160) || "Learning Roadmap",
			updatedAt: serverTimestamp()
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.UPDATE, path);
	}
}
async function deleteRoadmapWithTasks(uid, roadmapId) {
	if (!canWriteFirestore()) return;
	const path = `users/${uid}/roadmaps/${roadmapId}`;
	try {
		const tSnap = await getDocs(query(collection(db, "users", uid, "roadmaps", roadmapId, "tasks"), where("userId", "==", uid)));
		const batch = writeBatch(db);
		tSnap.docs.forEach((d) => batch.delete(d.ref));
		batch.delete(doc(db, "users", uid, "roadmaps", roadmapId));
		await batch.commit();
	} catch (error) {
		handleFirestoreError(error, OperationType.DELETE, path);
	}
}
async function saveChallengeAttempt(uid, challengeId, payload) {
	if (!canWriteFirestore()) return;
	const cid = safeId(challengeId);
	const path = `users/${uid}/challenges/${cid}`;
	try {
		const ref = doc(db, "users", uid, "challenges", cid);
		const existing = await getDoc(ref);
		const docData = {
			userId: uid,
			challengeId: cid,
			correct: Boolean(payload.correct),
			updatedAt: serverTimestamp()
		};
		if (payload.answer !== void 0) docData["answer"] = cleanStr(payload.answer, 500);
		if (payload.enjoy !== void 0) docData["enjoy"] = payload.enjoy;
		if (payload.reflection !== void 0) docData["reflection"] = cleanStr(payload.reflection, 600);
		if (existing.exists()) await updateDoc(ref, docData);
		else await setDoc(ref, docData);
	} catch (error) {
		handleFirestoreError(error, OperationType.WRITE, path);
	}
}
async function listChallengeAttempts(uid) {
	if (!isFirebaseConfigured) return {};
	const path = `users/${uid}/challenges`;
	try {
		const q = query(collection(db, "users", uid, "challenges"), where("userId", "==", uid));
		const snap = await getDocs(q);
		const map = {};
		snap.docs.forEach((d) => {
			const data = d.data();
			map[d.id] = {
				userId: String(data["userId"] ?? uid),
				challengeId: d.id,
				answer: typeof data["answer"] === "string" ? data["answer"] : void 0,
				correct: Boolean(data["correct"]),
				enjoy: data["enjoy"],
				reflection: typeof data["reflection"] === "string" ? data["reflection"] : void 0
			};
		});
		return map;
	} catch (error) {
		handleFirestoreError(error, OperationType.LIST, path);
	}
}
async function saveLearningPlan(uid, input) {
	const id = `plan-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
	if (!canWriteFirestore()) return id;
	const path = `users/${uid}/learning_plans/${id}`;
	try {
		const budget = Math.max(0, Math.min(1e7, Math.round(input.budget)));
		const recommendedSpend = Math.max(0, Math.min(budget, Math.round(input.recommendedSpend)));
		const payload = {
			userId: uid,
			careerId: safeId(input.careerId),
			careerName: cleanStr(input.careerName, 120) || "Career Plan",
			level: input.level,
			budget,
			recommendedSpend,
			hours: Math.max(1, Math.min(60, Math.round(input.hours))),
			device: cleanStr(input.device, 40) || "laptop",
			format: cleanStr(input.format, 40) || "mixed",
			outcome: cleanStr(input.outcome, 40) || "fundamentals",
			weeks: Math.max(1, Math.min(260, Math.round(input.weeks))),
			itemIds: cleanList(input.itemIds, 20, 80),
			createdAt: serverTimestamp()
		};
		if (input.aiSummary) payload["aiSummary"] = cleanStr(input.aiSummary, 600);
		await setDoc(doc(db, "users", uid, "learning_plans", id), payload);
		return id;
	} catch (error) {
		handleFirestoreError(error, OperationType.CREATE, path);
	}
}
async function listLearningPlans(uid) {
	if (!isFirebaseConfigured) return [];
	const path = `users/${uid}/learning_plans`;
	try {
		const q = query(collection(db, "users", uid, "learning_plans"), where("userId", "==", uid), orderBy("createdAt", "desc"), limit(20));
		return (await getDocs(q)).docs.map((d) => {
			const data = d.data();
			return {
				id: d.id,
				userId: String(data["userId"] ?? uid),
				careerId: String(data["careerId"] ?? ""),
				careerName: String(data["careerName"] ?? "Career Plan"),
				level: data["level"] ?? "beginner",
				budget: Number(data["budget"] ?? 0),
				recommendedSpend: Number(data["recommendedSpend"] ?? 0),
				hours: Number(data["hours"] ?? 5),
				device: typeof data["device"] === "string" ? data["device"] : "laptop",
				format: typeof data["format"] === "string" ? data["format"] : "mixed",
				outcome: typeof data["outcome"] === "string" ? data["outcome"] : "fundamentals",
				weeks: typeof data["weeks"] === "number" ? data["weeks"] : 6,
				itemIds: Array.isArray(data["itemIds"]) ? data["itemIds"] : [],
				aiSummary: typeof data["aiSummary"] === "string" ? data["aiSummary"] : void 0,
				createdAtMs: toMs(data["createdAt"])
			};
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.LIST, path);
	}
}
async function deleteLearningPlan(uid, planId) {
	if (!canWriteFirestore()) return;
	const id = safeId(planId);
	const path = `users/${uid}/learning_plans/${id}`;
	try {
		await deleteDoc(doc(db, "users", uid, "learning_plans", id));
	} catch (error) {
		handleFirestoreError(error, OperationType.DELETE, path);
	}
}
async function listSavedOpportunities(uid) {
	if (!isFirebaseConfigured) return [];
	const path = `users/${uid}/saved_opportunities`;
	try {
		const q = query(collection(db, "users", uid, "saved_opportunities"), where("userId", "==", uid));
		return (await getDocs(q)).docs.map((d) => {
			const data = d.data();
			const rawStatus = data["status"];
			const status = rawStatus === "planning" || rawStatus === "applied" ? rawStatus : "saved";
			return {
				userId: String(data["userId"] ?? uid),
				opportunityId: String(data["opportunityId"] ?? d.id),
				title: String(data["title"] ?? "Opportunity"),
				category: String(data["category"] ?? "Internships"),
				status,
				savedAtMs: toMs(data["savedAt"]),
				updatedAtMs: toMs(data["updatedAt"])
			};
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.LIST, path);
	}
}
async function saveOpportunityRecord(uid, opportunityId, title, category, status = "saved") {
	if (!canWriteFirestore()) return;
	const oid = safeId(opportunityId);
	const path = `users/${uid}/saved_opportunities/${oid}`;
	const ref = doc(db, "users", uid, "saved_opportunities", oid);
	try {
		if ((await getDoc(ref)).exists()) await updateDoc(ref, {
			status,
			updatedAt: serverTimestamp()
		});
		else await setDoc(ref, {
			userId: uid,
			opportunityId: oid,
			title: cleanStr(title, 180) || "Opportunity",
			category: cleanStr(category, 60) || "Internships",
			status,
			savedAt: serverTimestamp(),
			updatedAt: serverTimestamp()
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.WRITE, path);
	}
}
async function removeSavedOpportunityRecord(uid, opportunityId) {
	if (!canWriteFirestore()) return;
	const oid = safeId(opportunityId);
	const path = `users/${uid}/saved_opportunities/${oid}`;
	try {
		await deleteDoc(doc(db, "users", uid, "saved_opportunities", oid));
	} catch (error) {
		handleFirestoreError(error, OperationType.DELETE, path);
	}
}
async function listTransitions(uid) {
	if (!isFirebaseConfigured) return [];
	const path = `users/${uid}/career_transitions`;
	try {
		const q = query(collection(db, "users", uid, "career_transitions"), where("userId", "==", uid), orderBy("createdAt", "desc"), limit(15));
		return (await getDocs(q)).docs.map((d) => {
			const data = d.data();
			return {
				id: d.id,
				userId: String(data["userId"] ?? uid),
				currentRole: String(data["currentRole"] ?? "Beginner"),
				targetCareerId: String(data["targetCareerId"] ?? ""),
				targetCareerName: String(data["targetCareerName"] ?? ""),
				existingSkills: Array.isArray(data["existingSkills"]) ? data["existingSkills"] : [],
				missingSkills: Array.isArray(data["missingSkills"]) ? data["missingSkills"] : [],
				compatibilityScore: Number(data["compatibilityScore"] ?? 50),
				estimatedWeeks: Number(data["estimatedWeeks"] ?? 12),
				budgetInr: typeof data["budgetInr"] === "number" ? data["budgetInr"] : void 0,
				weeklyHours: typeof data["weeklyHours"] === "number" ? data["weeklyHours"] : void 0,
				createdAtMs: toMs(data["createdAt"])
			};
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.LIST, path);
	}
}
async function saveTransitionRecord(uid, input) {
	const id = `trn-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
	if (!canWriteFirestore()) return id;
	const path = `users/${uid}/career_transitions/${id}`;
	try {
		const payload = {
			userId: uid,
			currentRole: cleanStr(input.currentRole, 120) || "Beginner",
			targetCareerId: safeId(input.targetCareerId),
			targetCareerName: cleanStr(input.targetCareerName, 120) || "Target Career",
			existingSkills: cleanList(input.existingSkills, 25, 80),
			missingSkills: cleanList(input.missingSkills, 25, 80),
			compatibilityScore: Math.max(0, Math.min(100, Math.round(input.compatibilityScore))),
			estimatedWeeks: Math.max(1, Math.min(260, Math.round(input.estimatedWeeks))),
			createdAt: serverTimestamp()
		};
		if (typeof input.budgetInr === "number") payload["budgetInr"] = Math.max(0, Math.min(1e7, Math.round(input.budgetInr)));
		if (typeof input.weeklyHours === "number") payload["weeklyHours"] = Math.max(1, Math.min(60, Math.round(input.weeklyHours)));
		await setDoc(doc(db, "users", uid, "career_transitions", id), payload);
		return id;
	} catch (error) {
		handleFirestoreError(error, OperationType.CREATE, path);
	}
}
async function deleteTransitionRecord(uid, transitionId) {
	if (!canWriteFirestore()) return;
	const id = safeId(transitionId);
	const path = `users/${uid}/career_transitions/${id}`;
	try {
		await deleteDoc(doc(db, "users", uid, "career_transitions", id));
	} catch (error) {
		handleFirestoreError(error, OperationType.DELETE, path);
	}
}
//#endregion
export { updateRoadmapHoursInDb as A, saveCareerToFolder as C, saveOpportunityRecord as D, saveLearningPlan as E, updateRoadmapTitleInDb as M, upsertUserProfile as N, saveTransitionRecord as O, saveAssessment as S, saveComparison as T, listUserActivity as _, deleteLearningPlan as a, removeSavedOpportunityRecord as b, getUserProfile as c, listComparisons as d, listLearningPlans as f, listTransitions as g, listSavedOpportunities as h, deleteComparison as i, updateRoadmapTaskNoteInDb as j, toggleRoadmapTaskInDb as k, listAssessments as l, listSavedCareers as m, canWriteFirestore as n, deleteRoadmapWithTasks as o, listRoadmapsWithTasks as p, createRoadmapWithTasks as r, deleteTransitionRecord as s, addCustomTaskToRoadmap as t, listChallengeAttempts as u, logUserActivity as v, saveChallengeAttempt as w, resetRoadmapTasksInDb as x, removeSavedCareer as y };
