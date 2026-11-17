import { l as __toESM, s as require_react } from "./useSelector-Cu7jxM-W.js";
import { F as serverTimestamp, M as writeBatch, N as collection, P as doc, S as isFirebaseConfigured, T as getDocs, b as db, k as setDoc, v as OperationType, x as handleFirestoreError } from "./auth-ByhFdEgm.js";
import { t as CAREERS } from "./careers-Da7lFkNP.js";
//#region node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.js
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.js
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.js
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
//#endregion
//#region node_modules/lucide-react/dist/esm/defaultAttributes.js
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.js
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
//#endregion
//#region node_modules/lucide-react/dist/esm/Icon.js
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Icon = (0, import_react.forwardRef)(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => (0, import_react.createElement)("svg", {
	ref,
	...defaultAttributes,
	width: size,
	height: size,
	stroke: color,
	strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
	className: mergeClasses("lucide", className),
	...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
	...rest
}, [...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]));
//#endregion
//#region node_modules/lucide-react/dist/esm/createLucideIcon.js
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var createLucideIcon = (iconName, iconNode) => {
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Bookmark = createLucideIcon("bookmark", [["path", {
	d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
	key: "oz39mx"
}]]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Compass = createLucideIcon("compass", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
	key: "9ktpf1"
}]]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var GitCompareArrows = createLucideIcon("git-compare-arrows", [
	["circle", {
		cx: "5",
		cy: "6",
		r: "3",
		key: "1qnov2"
	}],
	["path", {
		d: "M12 6h5a2 2 0 0 1 2 2v7",
		key: "1yj91y"
	}],
	["path", {
		d: "m15 9-3-3 3-3",
		key: "1lwv8l"
	}],
	["circle", {
		cx: "19",
		cy: "18",
		r: "3",
		key: "1qljk2"
	}],
	["path", {
		d: "M12 18H7a2 2 0 0 1-2-2V9",
		key: "16sdep"
	}],
	["path", {
		d: "m9 15 3 3-3 3",
		key: "1m3kbl"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Map$1 = createLucideIcon("map", [
	["path", {
		d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
		key: "169xi5"
	}],
	["path", {
		d: "M15 5.764v15",
		key: "1pn4in"
	}],
	["path", {
		d: "M9 3.236v15",
		key: "1uimfh"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Menu = createLucideIcon("menu", [
	["path", {
		d: "M4 5h16",
		key: "1tepv9"
	}],
	["path", {
		d: "M4 12h16",
		key: "1lakjw"
	}],
	["path", {
		d: "M4 19h16",
		key: "1djgab"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var X = createLucideIcon("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
//#endregion
//#region src/lib/careers-service.ts
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
export { Menu as a, Compass as c, X as i, Bookmark as l, seedAllCareersToFirestore as n, Map$1 as o, useCareersCatalog as r, GitCompareArrows as s, saveSingleCareerToFirestore as t, createLucideIcon as u };
