import { l as __toESM, o as require_jsx_runtime, s as require_react } from "./useSelector-Cu7jxM-W.js";
import { n as toast } from "./dist-CnotZWgl.js";
import { I as Link, h as useUser } from "./auth-ByhFdEgm.js";
import { s as LogIn, t as AppShell } from "./AppShell-BgEZmUVx.js";
import { a as actions, o as roadmapProgress, r as getCareer, s as useApp } from "./careers-Da7lFkNP.js";
import { o as Map, r as useCareersCatalog, u as createLucideIcon } from "./careers-service-REWdQftI.js";
import { t as ArrowRight } from "./arrow-right-Bzry0KKp.js";
import { t as Check } from "./check-0L_Q9Hk-.js";
import { t as Clock } from "./clock-CaH_y0_w.js";
import { t as ExternalLink } from "./external-link-_z19ceB5.js";
import { t as Plus } from "./plus-Vx67vOmi.js";
import { t as RotateCcw } from "./rotate-ccw-B6VJ56SS.js";
import { t as Trash2 } from "./trash-2-CZ9EJ6gF.js";
import { a as Glass, c as PageHeader, d as inputClass, f as selectClass, i as EmptyState, l as ProgressRing, m as cn, n as Button, p as textareaClass, r as Chip, u as btnClass } from "./ui-kit-BDOPC8gw.js";
import { r as buildRoadmap } from "./engine-CZvW0XUP.js";
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var NotebookPen = createLucideIcon("notebook-pen", [
	["path", {
		d: "M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4",
		key: "re6nr2"
	}],
	["path", {
		d: "M2 6h4",
		key: "aawbzj"
	}],
	["path", {
		d: "M2 10h4",
		key: "l0bgd4"
	}],
	["path", {
		d: "M2 14h4",
		key: "1gsvsf"
	}],
	["path", {
		d: "M2 18h4",
		key: "1bu2t1"
	}],
	["path", {
		d: "M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
		key: "pqwjuv"
	}]
]);
//#endregion
//#region src/routes/roadmap.tsx?tsr-split=component
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	if (!loading && !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "My Career Roadmap",
		title: "My Career Roadmap",
		text: "Sign in to save, manage, and track multiple 5-phase personal learning roadmaps across devices."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
		className: "max-w-xl space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold",
				children: "Sign in to access your saved roadmaps"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-text-2",
				children: "You can browse careers and preview plans freely as a guest, or sign in to save multiple 5-phase roadmaps, learning objectives, and progress."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/auth",
					search: { next: "/roadmap" },
					className: btnClass("primary"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4" }), " Sign in / Create account"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/planner",
					className: btnClass("outline"),
					children: "Preview Budget Planner"
				})]
			})
		]
	})] });
	const builderPanel = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
		className: "mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-semibold",
			children: "Create / Switch Career Target Roadmap (5 Phases)"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleGenerateNewRoadmap,
			className: "mt-4 grid gap-3 sm:grid-cols-[1.5fr_1fr_110px_auto] sm:items-end",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1 text-xs text-text-2",
					children: ["Target Career", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: newCareerId,
						onChange: (e) => setNewCareerId(e.target.value),
						className: selectClass("h-10"),
						children: sortedCareerChoices.map((career) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: career.id,
							children: [
								career.name,
								" (",
								career.industry,
								")"
							]
						}, career.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1 text-xs text-text-2",
					children: ["Starting Familiarity", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: newLevel,
						onChange: (e) => setNewLevel(e.target.value),
						className: selectClass("h-10"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "beginner",
								children: "Complete beginner"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "some",
								children: "Know some basics"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "comfortable",
								children: "Fairly comfortable"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1 text-xs text-text-2",
					children: ["Weekly hrs", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 1,
						max: 40,
						value: newHours,
						onChange: (e) => setNewHours(Math.max(1, Math.min(40, Number(e.target.value) || 5))),
						className: inputClass("h-10")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: building,
					className: "h-10",
					children: building ? "Creating…" : "Generate 5-Phase Roadmap"
				})
			]
		})]
	});
	if (!roadmap) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "5-Phase Learning System",
			title: "My Career Roadmap",
			text: "Generate a 5-phase personalised roadmap directly here or customize spending inside the Budget Planner."
		}),
		builderPanel,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glass, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "size-5" }),
			title: "No active roadmap yet",
			text: "Pick a target career above to generate a 5-phase roadmap, or open the Budget-to-Skill Planner first.",
			action: {
				label: "Open Budget Planner",
				to: "/planner"
			}
		}) })
	] });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "5-Phase Interactive Roadmap",
			title: roadmap.title || `${c?.name ?? "Career"} Roadmap`,
			text: `${roadmap.hours} h/week · ${roadmap.level === "beginner" ? "Beginner" : roadmap.level === "some" ? "Some basics" : "Fairly comfortable"} · budget ₹${roadmap.budget.toLocaleString("en-IN")}${roadmap.weeks ? ` · ~${roadmap.weeks} weeks` : ""}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setShowBuilder(!showBuilder),
						children: showBuilder ? "Hide career builder" : "Switch / add career roadmap"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "soft",
						onClick: () => setAddingTask(!addingTask),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Personal milestone"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						onClick: () => {
							actions.resetRoadmapProgress(roadmap.id);
							toast.success("Roadmap progress reset");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " Reset progress"]
					})
				]
			})
		}),
		showBuilder && builderPanel,
		roadmaps.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground",
				children: [
					"Your saved roadmaps (",
					roadmaps.length,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: roadmaps.map((rm) => {
					const prog = roadmapProgress(rm);
					const active = rm.id === roadmap.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition", active ? "border-lavender/60 bg-lavender/20 glow" : "border-glass-border bg-secondary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => actions.selectRoadmap(rm.id),
							className: "text-left font-medium hover:text-cyan",
							children: [
								rm.title,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-1 text-xs text-cyan tabular-nums",
									children: [prog.pct, "%"]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Delete ${rm.title}`,
							onClick: () => void handleDelete(rm.id),
							className: "text-muted-foreground hover:text-warning",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
						})]
					}, rm.id);
				})
			})]
		}),
		addingTask && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glass, {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleAddTask,
				className: "grid gap-3 sm:grid-cols-[1.4fr_1fr_120px_100px_auto] sm:items-end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Milestone title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: newTaskTitle,
							onChange: (e) => setNewTaskTitle(e.target.value),
							placeholder: "e.g. Build SQL sales mini-dashboard",
							className: inputClass("h-10"),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Phase", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: newTaskPhase,
							onChange: (e) => setNewTaskPhase(Number(e.target.value)),
							className: selectClass("h-10 px-2.5"),
							children: PHASES.map((ph, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: idx + 1,
								children: [
									"Phase ",
									idx + 1,
									": ",
									ph
								]
							}, ph))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Difficulty", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: newTaskDifficulty,
							onChange: (e) => setNewTaskDifficulty(e.target.value),
							className: selectClass("h-10 px-2.5"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Beginner",
									children: "Beginner"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Intermediate",
									children: "Intermediate"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Advanced",
									children: "Advanced"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Effort", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: newTaskEffort,
							onChange: (e) => setNewTaskEffort(e.target.value),
							className: inputClass("h-10")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "h-10",
						children: "Add milestone"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						active: filterTab === "all",
						onClick: () => setFilterTab("all"),
						children: [
							"All (",
							roadmap.tasks.length,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						active: filterTab === "pending",
						onClick: () => setFilterTab("pending"),
						children: [
							"Pending (",
							roadmap.tasks.length - p.done,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						active: filterTab === "completed",
						onClick: () => setFilterTab("completed"),
						children: [
							"Completed (",
							p.done,
							")"
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-xs text-text-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5 text-cyan" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Weekly study pace:" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
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
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: h,
							children: [h, " h/week"]
						}, h))
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 xl:grid-cols-[1fr_320px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 space-y-5",
				children: PHASES.map((name, i) => {
					const phaseTasks = roadmap.tasks.filter((t) => t.phase === i + 1);
					if (phaseTasks.length === 0) return null;
					const visibleTasks = phaseTasks.filter((t) => filterTab === "pending" ? !t.done : filterTab === "completed" ? t.done : true);
					const done = phaseTasks.filter((t) => t.done).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
						as: "section",
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-lg font-semibold",
								children: [
									"Phase ",
									i + 1,
									": ",
									name
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "shrink-0 text-sm text-muted-foreground tabular-nums",
								children: [
									done,
									"/",
									phaseTasks.length
								]
							})]
						}), visibleTasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: [
								"No ",
								filterTab,
								" milestones in this phase."
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3",
							children: visibleTasks.map((t) => {
								const isEditingNote = editingNoteId === t.id;
								const draft = noteDrafts[t.id] ?? t.note ?? "";
								const isNext = next?.id === t.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									ref: (el) => {
										refs.current[t.id] = el;
									},
									className: cn("glass-soft flex gap-4 p-4 transition", t.done && "opacity-75", isNext && "border-cyan/60 ring-1 ring-cyan/25"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										role: "checkbox",
										"aria-checked": t.done,
										"aria-label": `Mark "${t.title}" ${t.done ? "incomplete" : "complete"}`,
										onClick: () => actions.toggleTask(t.id, roadmap.id),
										className: cn("mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg border transition", t.done ? "border-success bg-success text-primary-foreground" : "border-glass-border hover:border-lavender"),
										children: t.done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1 break-words",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-2",
												children: [
													t.week && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "rounded-md bg-lavender/20 px-2 py-0.5 text-[11px] font-medium text-lavender-bright tabular-nums",
														children: ["Week ", t.week]
													}),
													t.difficulty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-md border border-glass-border bg-secondary px-2 py-0.5 text-[11px] text-text-2",
														children: t.difficulty
													}),
													isNext && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-md bg-cyan/15 px-2 py-0.5 text-[11px] font-medium text-cyan",
														children: "Up next"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: cn("font-medium", t.done && "line-through"),
														children: t.title
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm text-text-2",
												children: t.desc
											}),
											t.objectives && t.objectives.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "mt-2 space-y-0.5 text-xs text-text-2",
												children: t.objectives.map((obj) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["✓ ", obj] }, obj))
											}),
											t.practicalTask && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-2 rounded-lg border border-cyan/25 bg-cyan/5 px-3 py-1.5 text-xs text-text-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-cyan",
														children: "Practical task:"
													}),
													" ",
													t.practicalTask
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Effort: ", t.effort] }),
													t.resource && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: t.resource.url,
														target: "_blank",
														rel: "noreferrer",
														className: "inline-flex items-center gap-1 text-cyan hover:underline",
														children: [
															"Primary: ",
															t.resource.name,
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })
														]
													}),
													t.freeAlternative && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: t.freeAlternative.url,
														target: "_blank",
														rel: "noreferrer",
														className: "inline-flex items-center gap-1 text-turquoise hover:underline",
														children: [
															"Free alt: ",
															t.freeAlternative.name,
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: () => openNoteEditor(t.id, t.note),
														className: "inline-flex items-center gap-1 text-lavender-bright hover:underline",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { className: "size-3" }), t.note ? "Edit note" : "Add personal note"]
													})
												]
											}),
											t.note && !isEditingNote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-2.5 rounded-lg border border-glass-border bg-popover/70 px-3 py-2 text-xs text-text-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-lavender-bright",
														children: "Your note:"
													}),
													" ",
													t.note
												]
											}),
											isEditingNote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
													rows: 2,
													maxLength: 400,
													value: draft,
													onChange: (e) => setNoteDrafts((prev) => ({
														...prev,
														[t.id]: e.target.value
													})),
													placeholder: "Write key takeaways, links you practiced, or questions to revisit…",
													className: textareaClass("text-xs")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "soft",
														className: "h-8 min-h-8 px-3 text-xs",
														onClick: () => saveTaskNote(t.id),
														children: "Save note"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														className: "h-8 min-h-8 px-3 text-xs",
														onClick: () => setEditingNoteId(null),
														children: "Cancel"
													})]
												})]
											})
										]
									})]
								}, t.id);
							})
						})]
					}, name);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-5 xl:sticky xl:top-6 xl:h-fit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRing, {
								value: p.pct,
								size: 150,
								stroke: 12
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm text-text-2 tabular-nums",
								children: [
									p.done,
									" of ",
									p.total,
									" milestones complete"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: ["Current phase: ", PHASES[Math.max(0, Math.min(4, p.phase - 1))]]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-2 gap-2 rounded-xl border border-glass-border bg-secondary/40 p-2.5 text-xs tabular-nums",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "Remaining hrs"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-semibold text-foreground",
									children: [remainingHours, " h"]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "Est. weeks left"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-semibold text-cyan",
									children: [remainingWeeks, " wks"]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-4 w-full",
								onClick: goNext,
								disabled: !next,
								children: next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Resume / Continue Learning", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })] }) : "All milestones complete 🎉"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Glass, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-base font-semibold",
						children: "Next upcoming milestones"
					}), remainingTasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-success",
						children: "All milestones done — check Opportunity Finder to apply for projects & internships!"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1.5 text-sm text-text-2",
						children: remainingTasks.slice(0, 5).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", t.title] }, t.id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Effort & week estimates scale automatically with your weekly hours and familiarity level. Completing milestones builds skill fluency and does not guarantee job placement."
					})
				]
			})]
		})
	] });
}
//#endregion
export { RoadmapPage as component };
