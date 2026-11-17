import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import "../_libs/firebase.mjs";
import { c as setDoc, d as writeBatch, f as collection, h as serverTimestamp, i as getDocs, p as doc } from "../_libs/@firebase/firestore+[...].mjs";
import { c as db, d as isFirebaseConfigured, i as OperationType, u as handleFirestoreError } from "./auth-Bjd81y0G.mjs";
import { t as CAREERS } from "./careers-ChJ9jiL5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/careers-service-BdvVUi83.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var cachedCatalog = null;
var loadPromise = null;
function mergeCareers(remote) {
	const byId = new Map(CAREERS.map((c) => [c.id, c]));
	for (const r of remote) if (r && r.id && r.name && r.industry) byId.set(r.id, r);
	return Array.from(byId.values());
}
async function fetchCareersCatalog(force = false) {
	if (!isFirebaseConfigured) {
		cachedCatalog = CAREERS;
		return CAREERS;
	}
	if (!force && cachedCatalog) return cachedCatalog;
	if (!force && loadPromise) return loadPromise;
	loadPromise = (async () => {
		try {
			const snap = await getDocs(collection(db, "careers"));
			if (snap.empty) {
				cachedCatalog = CAREERS;
				return CAREERS;
			}
			cachedCatalog = mergeCareers(snap.docs.map((d) => {
				const data = d.data();
				const fallback = CAREERS.find((x) => x.id === d.id);
				return {
					...fallback ?? CAREERS[0],
					id: String(data["id"] ?? d.id),
					name: String(data["name"] ?? fallback?.name ?? d.id),
					industry: data["industry"] ?? fallback?.industry ?? "Technology & IT",
					subcategory: String(data["subcategory"] ?? fallback?.subcategory ?? "General"),
					short: String(data["short"] ?? fallback?.short ?? ""),
					day: String(data["day"] ?? fallback?.day ?? ""),
					hue: data["hue"] ?? fallback?.hue ?? "lavender",
					responsibilities: Array.isArray(data["responsibilities"]) ? data["responsibilities"] : fallback?.responsibilities ?? [],
					skills: Array.isArray(data["skills"]) ? data["skills"] : fallback?.skills ?? [],
					capabilities: Array.isArray(data["capabilities"]) ? data["capabilities"] : fallback?.capabilities ?? [],
					interests: Array.isArray(data["interests"]) ? data["interests"] : fallback?.interests ?? [],
					subjects: Array.isArray(data["subjects"]) ? data["subjects"] : fallback?.subjects ?? [],
					pathways: Array.isArray(data["pathways"]) ? data["pathways"] : fallback?.pathways ?? [],
					altRoutes: Array.isArray(data["altRoutes"]) ? data["altRoutes"] : fallback?.altRoutes ?? [],
					projects: Array.isArray(data["projects"]) ? data["projects"] : fallback?.projects ?? [],
					commitment: String(data["commitment"] ?? fallback?.commitment ?? ""),
					commitmentLevel: Number(data["commitmentLevel"] ?? fallback?.commitmentLevel ?? 3),
					estimatedCostNote: String(data["estimatedCostNote"] ?? fallback?.estimatedCostNote ?? ""),
					progression: Array.isArray(data["progression"]) ? data["progression"] : fallback?.progression ?? [],
					freelanceOpportunity: String(data["freelanceOpportunity"] ?? fallback?.freelanceOpportunity ?? ""),
					entrepreneurshipOpportunity: String(data["entrepreneurshipOpportunity"] ?? fallback?.entrepreneurshipOpportunity ?? ""),
					entryLevelOpportunities: String(data["entryLevelOpportunities"] ?? fallback?.entryLevelOpportunities ?? ""),
					pros: Array.isArray(data["pros"]) ? data["pros"] : fallback?.pros ?? [],
					cons: Array.isArray(data["cons"]) ? data["cons"] : fallback?.cons ?? [],
					resources: Array.isArray(data["resources"]) ? data["resources"] : fallback?.resources ?? [],
					trial: String(data["trial"] ?? fallback?.trial ?? ""),
					challengeId: String(data["challengeId"] ?? fallback?.challengeId ?? "software"),
					emerging: Boolean(data["emerging"] ?? fallback?.emerging ?? false),
					environment: String(data["environment"] ?? fallback?.environment ?? "Office / desk"),
					minEducation: String(data["minEducation"] ?? fallback?.minEducation ?? "Class 12"),
					budgetTier: Number(data["budgetTier"] ?? fallback?.budgetTier ?? 0),
					tags: Array.isArray(data["tags"]) ? data["tags"] : fallback?.tags ?? []
				};
			}));
			return cachedCatalog;
		} catch {
			cachedCatalog = CAREERS;
			return CAREERS;
		} finally {
			loadPromise = null;
		}
	})();
	return loadPromise;
}
function useCareersCatalog() {
	const [careers, setCareers] = (0, import_react.useState)(cachedCatalog ?? CAREERS);
	const [loading, setLoading] = (0, import_react.useState)(!cachedCatalog);
	const refresh = async () => {
		setLoading(true);
		const list = await fetchCareersCatalog(true);
		setCareers(list);
		setLoading(false);
	};
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		let alive = true;
		fetchCareersCatalog().then((list) => {
			if (alive) {
				setCareers(list);
				setLoading(false);
			}
		});
		return () => {
			alive = false;
		};
	}, []);
	return {
		careers,
		loading,
		refresh
	};
}
function toFirestoreCareerPayload(c) {
	return {
		id: c.id,
		name: c.name.slice(0, 120),
		industry: c.industry.slice(0, 80),
		subcategory: c.subcategory.slice(0, 80),
		short: c.short.slice(0, 300),
		day: c.day.slice(0, 1e3),
		hue: c.hue,
		responsibilities: c.responsibilities.slice(0, 15),
		skills: c.skills.slice(0, 20),
		capabilities: c.capabilities.slice(0, 20),
		interests: c.interests.slice(0, 20),
		subjects: c.subjects.slice(0, 15),
		pathways: c.pathways.slice(0, 12),
		altRoutes: c.altRoutes.slice(0, 12),
		projects: c.projects.slice(0, 12),
		commitment: c.commitment.slice(0, 300),
		commitmentLevel: Math.max(1, Math.min(5, Math.round(c.commitmentLevel))),
		estimatedCostNote: c.estimatedCostNote.slice(0, 400),
		progression: c.progression.slice(0, 10),
		freelanceOpportunity: c.freelanceOpportunity.slice(0, 300),
		entrepreneurshipOpportunity: c.entrepreneurshipOpportunity.slice(0, 300),
		entryLevelOpportunities: c.entryLevelOpportunities.slice(0, 300),
		pros: c.pros.slice(0, 10),
		cons: c.cons.slice(0, 10),
		resources: c.resources.slice(0, 12),
		trial: c.trial.slice(0, 400),
		challengeId: c.challengeId.slice(0, 64),
		emerging: Boolean(c.emerging),
		environment: c.environment.slice(0, 100),
		minEducation: c.minEducation.slice(0, 80),
		budgetTier: Math.max(0, Math.min(1e6, Math.round(c.budgetTier))),
		tags: c.tags.slice(0, 30),
		updatedAt: serverTimestamp()
	};
}
async function seedAllCareersToFirestore() {
	if (!isFirebaseConfigured) return CAREERS.length;
	const path = "careers";
	try {
		const chunkSize = 100;
		for (let i = 0; i < CAREERS.length; i += chunkSize) {
			const batch = writeBatch(db);
			for (const career of CAREERS.slice(i, i + chunkSize)) batch.set(doc(db, "careers", career.id), toFirestoreCareerPayload(career));
			await batch.commit();
		}
		cachedCatalog = CAREERS;
		return CAREERS.length;
	} catch (error) {
		handleFirestoreError(error, OperationType.WRITE, path);
	}
}
async function saveSingleCareerToFirestore(career) {
	if (!isFirebaseConfigured) return;
	const cleanId = career.id.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "").slice(0, 128);
	const path = `careers/${cleanId}`;
	try {
		const normalized = {
			...career,
			id: cleanId
		};
		await setDoc(doc(db, "careers", cleanId), toFirestoreCareerPayload(normalized));
		cachedCatalog = mergeCareers([normalized]);
	} catch (error) {
		handleFirestoreError(error, OperationType.WRITE, path);
	}
}
//#endregion
export { seedAllCareersToFirestore as n, useCareersCatalog as r, saveSingleCareerToFirestore as t };
