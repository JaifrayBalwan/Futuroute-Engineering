import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Glass, c as PageHeader, d as cn, f as inputClass, i as EmptyState, l as ProgressRing, m as textareaClass, n as Button, p as selectClass, r as Chip, u as btnClass } from "./ui-kit-BmqGm62i.mjs";
import { b as useUser } from "./auth-Bjd81y0G.mjs";
import { a as getCareer, i as actions, o as roadmapProgress, s as useApp } from "./careers-ChJ9jiL5.mjs";
import { r as useCareersCatalog } from "./careers-service-BdvVUi83.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as Clock, G as Check, I as ExternalLink, Q as ArrowRight, _ as Plus, b as Map, m as RotateCcw, o as Trash2, v as NotebookPen, w as LogIn } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DVN8uj3t.mjs";
import { r as buildRoadmap } from "./engine-DVCtS3eD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/roadmap-Ce-8Tc3w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/roadmap.tsx?tsr-split=component";
var PHASES = [
	"Foundations",
	"Core Technical & Domain Skills",
	"Core Knowledge & Mastery",
	"Practical Projects & Portfolio",
	"Career Preparation & Applications"
];
function parseTaskHours(effort) {
	const m = effort.match(/(\d+)\s*h/);
	return m ? Number(m[1]) : 4;
}
function RoadmapPage() {
	const { user, loading } = useUser();
	const { roadmaps, roadmap, profile } = useApp();
	const { careers } = useCareersCatalog();
	const refs = (0, import_react.useRef)({});
	const [filterTab, setFilterTab] = (0, import_react.useState)("all");
	const [showBuilder, setShowBuilder] = (0, import_react.useState)(false);
	const [newCareerId, setNewCareerId] = (0, import_react.useState)("software-developer");
	const [newLevel, setNewLevel] = (0, import_react.useState)("beginner");
	const [newHours, setNewHours] = (0, import_react.useState)(profile?.weeklyHours ?? 6);
	const [building, setBuilding] = (0, import_react.useState)(false);
	const [newTaskTitle, setNewTaskTitle] = (0, import_react.useState)("");
	const [newTaskPhase, setNewTaskPhase] = (0, import_react.useState)(1);
	const [newTaskEffort, setNewTaskEffort] = (0, import_react.useState)("3 h");
	const [newTaskDifficulty, setNewTaskDifficulty] = (0, import_react.useState)("Beginner");
	const [addingTask, setAddingTask] = (0, import_react.useState)(false);
	const [editingNoteId, setEditingNoteId] = (0, import_react.useState)(null);
	const [noteDrafts, setNoteDrafts] = (0, import_react.useState)({});
	const sortedCareerChoices = (0, import_react.useMemo)(() => [...careers].sort((a, b) => a.name.localeCompare(b.name)), [careers]);
	const handleGenerateNewRoadmap = async (e) => {
		e.preventDefault();
		const target = getCareer(newCareerId, careers);
		if (!target) return;
		setBuilding(true);
		try {
			const rm = buildRoadmap({
				careerId: target.id,
				level: newLevel,
				budget: profile?.budget ?? 0,
				hours: newHours,
				device: "laptop",
				format: "mixed",
				outcome: "portfolio",
				currentSkills: profile?.currentSkills
			}, careers);
			await actions.addRoadmap(rm, target.name);
			setShowBuilder(false);
			toast.success(`Generated 5-phase ${target.name} roadmap`);
		} finally {
			setBuilding(false);
		}
	};
	if (!loading && !user) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
		eyebrow: "My Career Roadmap",
		title: "My Career Roadmap",
		text: "Sign in to save, manage, and track multiple 5-phase personal learning roadmaps across devices."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 71,
		columnNumber: 9
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
		className: "max-w-xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "font-display text-xl font-semibold",
				children: "Sign in to access your saved roadmaps"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 73,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-text-2",
				children: "You can browse careers and preview plans freely as a guest, or sign in to save multiple 5-phase roadmaps, learning objectives, and progress."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 76,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/auth",
					search: { next: "/roadmap" },
					className: btnClass("primary"),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogIn, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 84,
						columnNumber: 15
					}, this), " Sign in / Create account"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 81,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/planner",
					className: btnClass("outline"),
					children: "Preview Budget Planner"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 86,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 80,
				columnNumber: 11
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 72,
		columnNumber: 9
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 70,
		columnNumber: 12
	}, this);
	const builderPanel = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
		className: "mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "font-display text-lg font-semibold",
			children: "Create / Switch Career Target Roadmap (5 Phases)"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 94,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			onSubmit: handleGenerateNewRoadmap,
			className: "mt-4 grid gap-3 sm:grid-cols-[1.5fr_1fr_110px_auto] sm:items-end",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "grid gap-1 text-xs text-text-2",
					children: ["Target Career", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						value: newCareerId,
						onChange: (e) => setNewCareerId(e.target.value),
						className: selectClass("h-10"),
						children: sortedCareerChoices.map((career) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: career.id,
							children: [
								career.name,
								" (",
								career.industry,
								")"
							]
						}, career.id, true, {
							fileName: _jsxFileName,
							lineNumber: 101,
							columnNumber: 48
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 100,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 98,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "grid gap-1 text-xs text-text-2",
					children: ["Starting Familiarity", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						value: newLevel,
						onChange: (e) => setNewLevel(e.target.value),
						className: selectClass("h-10"),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "beginner",
								children: "Complete beginner"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 109,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "some",
								children: "Know some basics"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 110,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "comfortable",
								children: "Fairly comfortable"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 111,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 108,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 106,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "grid gap-1 text-xs text-text-2",
					children: ["Weekly hrs", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "number",
						min: 1,
						max: 40,
						value: newHours,
						onChange: (e) => setNewHours(Math.max(1, Math.min(40, Number(e.target.value) || 5))),
						className: inputClass("h-10")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 116,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 114,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "submit",
					disabled: building,
					className: "h-10",
					children: building ? "Creating…" : "Generate 5-Phase Roadmap"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 118,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 97,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 93,
		columnNumber: 24
	}, this);
	if (!roadmap) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
			eyebrow: "5-Phase Learning System",
			title: "My Career Roadmap",
			text: "Generate a 5-phase personalised roadmap directly here or customize spending inside the Budget Planner."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 125,
			columnNumber: 9
		}, this),
		builderPanel,
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Map, { className: "size-5" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 128,
				columnNumber: 29
			}, this),
			title: "No active roadmap yet",
			text: "Pick a target career above to generate a 5-phase roadmap, or open the Budget-to-Skill Planner first.",
			action: {
				label: "Open Budget Planner",
				to: "/planner"
			}
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 128,
			columnNumber: 11
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 127,
			columnNumber: 9
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 124,
		columnNumber: 12
	}, this);
	const c = getCareer(roadmap.careerId, careers);
	const p = roadmapProgress(roadmap);
	const next = roadmap.tasks.find((t) => !t.done);
	const remainingTasks = roadmap.tasks.filter((t) => !t.done);
	const remainingHours = remainingTasks.reduce((sum, t) => sum + parseTaskHours(t.effort), 0);
	const remainingWeeks = Math.max(remainingTasks.length ? 1 : 0, Math.ceil(remainingHours / Math.max(1, roadmap.hours)));
	const goNext = () => {
		if (next) {
			const el = refs.current[next.id];
			el?.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
			el?.querySelector("button")?.focus();
		}
	};
	const handleAddTask = (e) => {
		e.preventDefault();
		const title = newTaskTitle.trim();
		if (!title) return;
		actions.addTaskToRoadmap(roadmap.id, {
			id: `custom-${Date.now().toString(36)}`,
			phase: newTaskPhase,
			week: Math.max(1, roadmap.tasks.length + 1),
			title,
			desc: "Personal milestone added to your roadmap.",
			effort: newTaskEffort.trim() || "3 h",
			difficulty: newTaskDifficulty,
			objectives: ["Complete milestone focus & record notes"],
			done: false
		});
		setNewTaskTitle("");
		setAddingTask(false);
		toast.success("Custom milestone added");
	};
	const handleDelete = async (id) => {
		await actions.deleteRoadmap(id);
		toast.success("Roadmap removed");
	};
	const openNoteEditor = (taskId, existingNote) => {
		if (editingNoteId === taskId) {
			setEditingNoteId(null);
			return;
		}
		setNoteDrafts((prev) => ({
			...prev,
			[taskId]: prev[taskId] ?? existingNote ?? ""
		}));
		setEditingNoteId(taskId);
	};
	const saveTaskNote = (taskId) => {
		const text = noteDrafts[taskId] ?? "";
		actions.setTaskNote(taskId, text, roadmap.id);
		setEditingNoteId(null);
		toast.success(text.trim() ? "Milestone note saved" : "Milestone note cleared");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHeader, {
			eyebrow: "5-Phase Interactive Roadmap",
			title: roadmap.title || `${c?.name ?? "Career"} Roadmap`,
			text: `${roadmap.hours} h/week · ${roadmap.level === "beginner" ? "Beginner" : roadmap.level === "some" ? "Some basics" : "Fairly comfortable"} · budget ₹${roadmap.budget.toLocaleString("en-IN")}${roadmap.weeks ? ` · ~${roadmap.weeks} weeks` : ""}`,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						onClick: () => setShowBuilder(!showBuilder),
						children: showBuilder ? "Hide career builder" : "Switch / add career roadmap"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 194,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "soft",
						onClick: () => setAddingTask(!addingTask),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 198,
							columnNumber: 13
						}, this), " Personal milestone"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 197,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "ghost",
						onClick: () => {
							actions.resetRoadmapProgress(roadmap.id);
							toast.success("Roadmap progress reset");
						},
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcw, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 204,
							columnNumber: 13
						}, this), " Reset progress"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 200,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 193,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 192,
			columnNumber: 7
		}, this),
		showBuilder && builderPanel,
		roadmaps.length > 1 && /* @__PURE__ */ (void 0)(Glass, {
			className: "mb-6",
			children: [/* @__PURE__ */ (void 0)("p", {
				className: "mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground",
				children: [
					"Your saved roadmaps (",
					roadmaps.length,
					")"
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 212,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("div", {
				className: "flex flex-wrap gap-2",
				children: roadmaps.map((rm) => {
					const prog = roadmapProgress(rm);
					const active = rm.id === roadmap.id;
					return /* @__PURE__ */ (void 0)("div", {
						className: cn("flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition", active ? "border-lavender/60 bg-lavender/20 glow" : "border-glass-border bg-secondary"),
						children: [/* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => actions.selectRoadmap(rm.id),
							className: "text-left font-medium hover:text-cyan",
							children: [
								rm.title,
								" ",
								/* @__PURE__ */ (void 0)("span", {
									className: "ml-1 text-xs text-cyan tabular-nums",
									children: [prog.pct, "%"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 222,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 220,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("button", {
							type: "button",
							"aria-label": `Delete ${rm.title}`,
							onClick: () => void handleDelete(rm.id),
							className: "text-muted-foreground hover:text-warning",
							children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 225,
								columnNumber: 21
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 224,
							columnNumber: 19
						}, this)]
					}, rm.id, true, {
						fileName: _jsxFileName,
						lineNumber: 219,
						columnNumber: 18
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 215,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 211,
			columnNumber: 31
		}, this),
		addingTask && /* @__PURE__ */ (void 0)(Glass, {
			className: "mb-6",
			children: /* @__PURE__ */ (void 0)("form", {
				onSubmit: handleAddTask,
				className: "grid gap-3 sm:grid-cols-[1.4fr_1fr_120px_100px_auto] sm:items-end",
				children: [
					/* @__PURE__ */ (void 0)("label", {
						className: "grid gap-1 text-sm",
						children: ["Milestone title", /* @__PURE__ */ (void 0)("input", {
							value: newTaskTitle,
							onChange: (e) => setNewTaskTitle(e.target.value),
							placeholder: "e.g. Build SQL sales mini-dashboard",
							className: inputClass("h-10"),
							required: true
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 236,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 234,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("label", {
						className: "grid gap-1 text-sm",
						children: ["Phase", /* @__PURE__ */ (void 0)("select", {
							value: newTaskPhase,
							onChange: (e) => setNewTaskPhase(Number(e.target.value)),
							className: selectClass("h-10 px-2.5"),
							children: PHASES.map((ph, idx) => /* @__PURE__ */ (void 0)("option", {
								value: idx + 1,
								children: [
									"Phase ",
									idx + 1,
									": ",
									ph
								]
							}, ph, true, {
								fileName: _jsxFileName,
								lineNumber: 241,
								columnNumber: 42
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 240,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 238,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("label", {
						className: "grid gap-1 text-sm",
						children: ["Difficulty", /* @__PURE__ */ (void 0)("select", {
							value: newTaskDifficulty,
							onChange: (e) => setNewTaskDifficulty(e.target.value),
							className: selectClass("h-10 px-2.5"),
							children: [
								/* @__PURE__ */ (void 0)("option", {
									value: "Beginner",
									children: "Beginner"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 249,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "Intermediate",
									children: "Intermediate"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 250,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "Advanced",
									children: "Advanced"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 251,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 248,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 246,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("label", {
						className: "grid gap-1 text-sm",
						children: ["Effort", /* @__PURE__ */ (void 0)("input", {
							value: newTaskEffort,
							onChange: (e) => setNewTaskEffort(e.target.value),
							className: inputClass("h-10")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 256,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 254,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)(Button, {
						type: "submit",
						className: "h-10",
						children: "Add milestone"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 258,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 233,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 232,
			columnNumber: 22
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-5 flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
						active: filterTab === "all",
						onClick: () => setFilterTab("all"),
						children: [
							"All (",
							roadmap.tasks.length,
							")"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 266,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
						active: filterTab === "pending",
						onClick: () => setFilterTab("pending"),
						children: [
							"Pending (",
							roadmap.tasks.length - p.done,
							")"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 269,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
						active: filterTab === "completed",
						onClick: () => setFilterTab("completed"),
						children: [
							"Completed (",
							p.done,
							")"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 272,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 265,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2 text-xs text-text-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "size-3.5 text-cyan" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 277,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Weekly study pace:" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 278,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						"aria-label": "Adjust weekly hours",
						value: roadmap.hours,
						onChange: (e) => actions.retuneRoadmapHours(roadmap.id, Number(e.target.value)),
						className: selectClass("h-8 w-28 px-2 text-xs"),
						children: [
							3,
							5,
							6,
							8,
							10,
							12,
							15,
							20,
							25
						].map((h) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: h,
							children: [h, " h/week"]
						}, h, true, {
							fileName: _jsxFileName,
							lineNumber: 280,
							columnNumber: 56
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 279,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 276,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 264,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-6 xl:grid-cols-[1fr_320px]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "min-w-0 space-y-5",
				children: PHASES.map((name, i) => {
					const phaseTasks = roadmap.tasks.filter((t) => t.phase === i + 1);
					if (phaseTasks.length === 0) return null;
					const visibleTasks = phaseTasks.filter((t) => filterTab === "pending" ? !t.done : filterTab === "completed" ? t.done : true);
					const done = phaseTasks.filter((t) => t.done).length;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
						as: "section",
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-display text-lg font-semibold",
								children: [
									"Phase ",
									i + 1,
									": ",
									name
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 296,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "shrink-0 text-sm text-muted-foreground tabular-nums",
								children: [
									done,
									"/",
									phaseTasks.length
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 299,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 295,
							columnNumber: 17
						}, this), visibleTasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: [
								"No ",
								filterTab,
								" milestones in this phase."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 303,
							columnNumber: 46
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "mt-4 space-y-3",
							children: visibleTasks.map((t) => {
								const isEditingNote = editingNoteId === t.id;
								const draft = noteDrafts[t.id] ?? t.note ?? "";
								const isNext = next?.id === t.id;
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
									ref: (el) => {
										refs.current[t.id] = el;
									},
									className: cn("glass-soft flex gap-4 p-4 transition", t.done && "opacity-75", isNext && "border-cyan/60 ring-1 ring-cyan/25"),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										role: "checkbox",
										"aria-checked": t.done,
										"aria-label": `Mark "${t.title}" ${t.done ? "incomplete" : "complete"}`,
										onClick: () => actions.toggleTask(t.id, roadmap.id),
										className: cn("mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg border transition", t.done ? "border-success bg-success text-primary-foreground" : "border-glass-border hover:border-lavender"),
										children: t.done && /* @__PURE__ */ (void 0)(Check, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 314,
											columnNumber: 40
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 313,
										columnNumber: 27
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "min-w-0 flex-1 break-words",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex flex-wrap items-center gap-2",
												children: [
													t.week && /* @__PURE__ */ (void 0)("span", {
														className: "rounded-md bg-lavender/20 px-2 py-0.5 text-[11px] font-medium text-lavender-bright tabular-nums",
														children: ["Week ", t.week]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 318,
														columnNumber: 42
													}, this),
													t.difficulty && /* @__PURE__ */ (void 0)("span", {
														className: "rounded-md border border-glass-border bg-secondary px-2 py-0.5 text-[11px] text-text-2",
														children: t.difficulty
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 321,
														columnNumber: 48
													}, this),
													isNext && /* @__PURE__ */ (void 0)("span", {
														className: "rounded-md bg-cyan/15 px-2 py-0.5 text-[11px] font-medium text-cyan",
														children: "Up next"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 324,
														columnNumber: 42
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
														className: cn("font-medium", t.done && "line-through"),
														children: t.title
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 327,
														columnNumber: 31
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 317,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "mt-1 text-sm text-text-2",
												children: t.desc
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 331,
												columnNumber: 29
											}, this),
											t.objectives && t.objectives.length > 0 && /* @__PURE__ */ (void 0)("ul", {
												className: "mt-2 space-y-0.5 text-xs text-text-2",
												children: t.objectives.map((obj) => /* @__PURE__ */ (void 0)("li", { children: ["✓ ", obj] }, obj, true, {
													fileName: _jsxFileName,
													lineNumber: 334,
													columnNumber: 58
												}, this))
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 333,
												columnNumber: 73
											}, this),
											t.practicalTask && /* @__PURE__ */ (void 0)("p", {
												className: "mt-2 rounded-lg border border-cyan/25 bg-cyan/5 px-3 py-1.5 text-xs text-text-2",
												children: [
													/* @__PURE__ */ (void 0)("span", {
														className: "font-medium text-cyan",
														children: "Practical task:"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 338,
														columnNumber: 33
													}, this),
													" ",
													t.practicalTask
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 337,
												columnNumber: 49
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "mt-2.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Effort: ", t.effort] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 343,
														columnNumber: 31
													}, this),
													t.resource && /* @__PURE__ */ (void 0)("a", {
														href: t.resource.url,
														target: "_blank",
														rel: "noreferrer",
														className: "inline-flex items-center gap-1 text-cyan hover:underline",
														children: [
															"Primary: ",
															t.resource.name,
															/* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 346,
																columnNumber: 35
															}, this)
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 344,
														columnNumber: 46
													}, this),
													t.freeAlternative && /* @__PURE__ */ (void 0)("a", {
														href: t.freeAlternative.url,
														target: "_blank",
														rel: "noreferrer",
														className: "inline-flex items-center gap-1 text-turquoise hover:underline",
														children: [
															"Free alt: ",
															t.freeAlternative.name,
															/* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 350,
																columnNumber: 35
															}, this)
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 348,
														columnNumber: 53
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
														type: "button",
														onClick: () => openNoteEditor(t.id, t.note),
														className: "inline-flex items-center gap-1 text-lavender-bright hover:underline",
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NotebookPen, { className: "size-3" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 353,
															columnNumber: 33
														}, this), t.note ? "Edit note" : "Add personal note"]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 352,
														columnNumber: 31
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 342,
												columnNumber: 29
											}, this),
											t.note && !isEditingNote && /* @__PURE__ */ (void 0)("p", {
												className: "mt-2.5 rounded-lg border border-glass-border bg-popover/70 px-3 py-2 text-xs text-text-2",
												children: [
													/* @__PURE__ */ (void 0)("span", {
														className: "font-medium text-lavender-bright",
														children: "Your note:"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 359,
														columnNumber: 33
													}, this),
													" ",
													t.note
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 358,
												columnNumber: 58
											}, this),
											isEditingNote && /* @__PURE__ */ (void 0)("div", {
												className: "mt-3 space-y-2",
												children: [/* @__PURE__ */ (void 0)("textarea", {
													rows: 2,
													maxLength: 400,
													value: draft,
													onChange: (e) => setNoteDrafts((prev) => ({
														...prev,
														[t.id]: e.target.value
													})),
													placeholder: "Write key takeaways, links you practiced, or questions to revisit…",
													className: textareaClass("text-xs")
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 364,
													columnNumber: 33
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "flex flex-wrap gap-2",
													children: [/* @__PURE__ */ (void 0)(Button, {
														variant: "soft",
														className: "h-8 min-h-8 px-3 text-xs",
														onClick: () => saveTaskNote(t.id),
														children: "Save note"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 369,
														columnNumber: 35
													}, this), /* @__PURE__ */ (void 0)(Button, {
														variant: "ghost",
														className: "h-8 min-h-8 px-3 text-xs",
														onClick: () => setEditingNoteId(null),
														children: "Cancel"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 372,
														columnNumber: 35
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 368,
													columnNumber: 33
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 363,
												columnNumber: 47
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 316,
										columnNumber: 27
									}, this)]
								}, t.id, true, {
									fileName: _jsxFileName,
									lineNumber: 310,
									columnNumber: 24
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 305,
							columnNumber: 26
						}, this)]
					}, name, true, {
						fileName: _jsxFileName,
						lineNumber: 294,
						columnNumber: 18
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 288,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				className: "space-y-5 xl:sticky xl:top-6 xl:h-fit",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProgressRing, {
								value: p.pct,
								size: 150,
								stroke: 12
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 387,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 text-sm text-text-2 tabular-nums",
								children: [
									p.done,
									" of ",
									p.total,
									" milestones complete"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 388,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: ["Current phase: ", PHASES[Math.max(0, Math.min(4, p.phase - 1))]]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 391,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-3 grid grid-cols-2 gap-2 rounded-xl border border-glass-border bg-secondary/40 p-2.5 text-xs tabular-nums",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-muted-foreground",
									children: "Remaining hrs"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 396,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-semibold text-foreground",
									children: [remainingHours, " h"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 397,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 395,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-muted-foreground",
									children: "Est. weeks left"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 400,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-semibold text-cyan",
									children: [remainingWeeks, " wks"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 401,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 399,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 394,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								className: "mt-4 w-full",
								onClick: goNext,
								disabled: !next,
								children: next ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: ["Resume / Continue Learning", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 407,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 405,
									columnNumber: 23
								}, this) : "All milestones complete 🎉"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 404,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 386,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-base font-semibold",
						children: "Next upcoming milestones"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 412,
						columnNumber: 13
					}, this), remainingTasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-success",
						children: "All milestones done — check Opportunity Finder to apply for projects & internships!"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 413,
						columnNumber: 44
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "mt-2 space-y-1.5 text-sm text-text-2",
						children: remainingTasks.slice(0, 5).map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: ["• ", t.title] }, t.id, true, {
							fileName: _jsxFileName,
							lineNumber: 416,
							columnNumber: 54
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 415,
						columnNumber: 22
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 411,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Effort & week estimates scale automatically with your weekly hours and familiarity level. Completing milestones builds skill fluency and does not guarantee job placement."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 419,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 385,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 287,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 191,
		columnNumber: 10
	}, this);
}
//#endregion
export { RoadmapPage as component };
