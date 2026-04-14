import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useJudgements } from '../../hooks';
import { useEventDetailsStore } from '../../stores';

export default function JudgedSubmitCard({ project_info }) {
    const { saveJudgemment, rejectSubmit } = useJudgements();

    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [deployment, setDeployment] = useState('');
    const [repo, setRepo] = useState('');

    const [id, setId] = useState(null);
    const [marks, setMarks] = useState(0);
    const [pos, setPos] = useState(0);
    const [reject, setReject] = useState(false);

    // If pos_C is a boolean meant to intentionally hide 3rd place for certain events, 
    // see the comment on the 3rd place button below.
    const { pos_A, pos_B, pos_C } = useEventDetailsStore();

    useEffect(() => {
        if (project_info) {
            setTitle(project_info.project_title);
            setDeployment(project_info.deployment);
            setRepo(project_info.repo);
            setId(project_info.project_id);
            if (project_info.marks) setMarks(project_info.marks);
            if (project_info.pos) setPos(project_info.pos);
            if (project_info.reject) setReject(project_info.reject);
        }
    }, [project_info]);

    const handleSavingJudgement = async () => {
        if (reject) {
            await rejectSubmit(id);
        } else {
            await saveJudgemment(
                {
                    judgement: true,
                    marks: marks,
                    pos: pos,
                },
                id
            );
        }
        setEditing(false);
    };

    return (
        <div className={clsx(
            "relative p-6 border transition-all duration-500 group",
            reject && !editing ? "bg-red-900/10 border-secondary/30" : "bg-slate-900/40 border-slate-800/50 hover:border-primary/50"
        )}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-12 flex flex-col justify-between">
                    <div>
                        <h3 className={clsx(
                            "text-2xl font-headline font-bold mb-2 tracking-tight uppercase",
                            reject && !editing ? "text-slate-500 line-through" : "text-on-surface"
                        )}>
                            {title}
                        </h3>
                        <div className="space-y-1 mb-4">
                            <div className="flex items-center gap-2 text-xs font-mono">
                                <span className="text-slate-500">UPLINK:</span>
                                <a className="text-primary hover:underline truncate" href={deployment}>
                                    {deployment}
                                </a>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono">
                                <span className="text-slate-500">SOURCE:</span>
                                <a className="text-slate-300 hover:text-white truncate" href={repo}>
                                    {repo}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase">
                                <span>EVALUATION_METRIC</span>
                                <span className="text-primary font-bold">CORE_STRENGTH: {marks}</span>
                            </div>

                            {editing && (
                                <input
                                    className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-primary"
                                    max={10}
                                    min={0}
                                    step={0.5}
                                    type="range"
                                    value={marks}
                                    onChange={(e) => setMarks(e.target.valueAsNumber)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={clsx(
                "mt-8 gap-2", 
                editing ? "grid grid-cols-2 md:grid-cols-4" : "flex flex-wrap"
            )}>
                
                {/* 1st Place Button */}
                {(pos === 1 || editing) && !reject && (
                    <button
                        disabled={!editing}
                        className={clsx(
                            "border border-primary font-mono text-xs py-2 uppercase tracking-tighter w-full transition-all",
                            !editing && "px-6 max-w-37.5 cursor-default",
                            editing && "hover:bg-primary hover:text-black cursor-pointer",
                            pos === 1 ? "text-black bg-primary" : "bg-black text-primary"
                        )}
                        onClick={() => setPos(pos === 1 ? 0 : 1)}
                    >
                        1st_PLACE
                    </button>
                )}

                {/* 2nd Place Button */}
                {(pos === 2 || editing) && !reject && (
                    <button
                        disabled={!editing}
                        className={clsx(
                            "border border-cyan-700 font-mono text-xs py-2 uppercase tracking-tighter w-full transition-all",
                            !editing && "px-6 max-w-37.5 cursor-default",
                            editing && "hover:bg-cyan-700 hover:text-white cursor-pointer",
                            pos === 2 ? "bg-cyan-700 text-white" : "bg-black text-cyan-700"
                        )}
                        onClick={() => setPos(pos === 2 ? 0 : 2)}
                    >
                        2nd_PLACE
                    </button>
                )}

                {/* 3rd Place Button - FIX APPLIED HERE */}
                {(pos === 3 || editing) && !reject && (
                    <button
                        disabled={!editing}
                        className={clsx(
                            "border border-emerald-500 font-mono text-xs py-2 uppercase tracking-tighter w-full transition-all",
                            !editing && "px-6 max-w-37.5 cursor-default",
                            editing && "hover:bg-emerald-500 hover:text-black cursor-pointer",
                            pos === 3 ? "bg-emerald-500 text-black" : "bg-black text-emerald-500",
                            // If you DO want pos_C to dynamically hide this button, use a Tailwind class instead of a React condition:
                            // pos_C && "hidden" 
                        )}
                        onClick={() => setPos(pos === 3 ? 0 : 3)}
                    >
                        3rd_PLACE
                    </button>
                )}

                {/* Eliminate Process Button */}
                {(reject || editing) && (
                    <button
                        disabled={!editing}
                        className={clsx(
                            "border border-secondary font-mono text-xs py-2 uppercase tracking-tighter w-full transition-all",
                            !editing && "px-6 max-w-50 cursor-default",
                            editing && "hover:bg-secondary hover:text-white cursor-pointer",
                            reject ? "bg-secondary text-white" : "bg-black text-secondary"
                        )}
                        onClick={() => {
                            setPos(0);
                            setReject(!reject);
                        }}
                    >
                        {reject && !editing ? "STATUS: ELIMINATED" : "ELIMINATE_PROCESS"}
                    </button>
                )}
            </div>

            <div className="mt-6 flex justify-between items-center border-t border-slate-800/50 pt-4">
                <div className="flex gap-4">
                    {editing && (
                        <button
                            className="text-xs font-mono text-slate-400 hover:text-primary transition-colors flex items-center gap-1"
                            onClick={handleSavingJudgement}
                        >
                            <span className="material-symbols-outlined text-sm">save</span> SAVE_DATA_PROTOCOL
                        </button>
                    )}

                    <button
                        className="text-xs font-mono text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                        onClick={() => setEditing(!editing)}
                    >
                        <span className="material-symbols-outlined text-sm">
                            {editing ? "close" : "edit"}
                        </span> 
                        {editing ? "CANCEL_EDIT" : "EDIT_ENTRY"}
                    </button>
                </div>
            </div>
        </div>
    );
}