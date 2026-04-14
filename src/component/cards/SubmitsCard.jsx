import React, { useEffect } from 'react'
import { useState } from 'react'
import clsx from 'clsx';
import { useJudgements } from '../../hooks';
import { data } from 'react-router';
import { useEventDetailsStore } from '../../stores';

export default function SubmitsCard({ project_info }) {

    const { saveJudgemment, rejectSubmit } = useJudgements();

    const [title, setTitle] = useState('');
    const [deployment, setDeployment] = useState('');
    const [repo, setRepo] = useState('');

    const [id, setId] = useState(null);
    const [marks, setMarks] = useState(0);
    const [pos, setPos] = useState(0);
    const [reject, setReject] = useState(false);

    const { pos_A, pos_B, pos_C } = useEventDetailsStore();


    useEffect(() => {
        if (project_info) {
            setTitle(project_info.project_title);
            setDeployment(project_info.deployment);
            setRepo(project_info.repo);
            setId(project_info.project_id);
        }
    }, [project_info]);

    const handleSavingJudgement = async () => {
        if (reject) {
            rejectSubmit(id);
        }
        else {
            await saveJudgemment({
                "judgement": true,
                "marks": marks,
                "pos": pos
            }, id
            );
        }
    }


    return (

        <div className="relative bg-slate-900/40 p-6 border border-slate-800/50 group hover:border-primary/50 transition-all duration-500">

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-12 flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-headline font-bold text-on-surface mb-2 tracking-tight uppercase">{title}</h3>
                        <div className="space-y-1 mb-4">
                            <div className="flex items-center gap-2 text-xs font-mono">
                                <span className="text-slate-500">UPLINK:</span>
                                <a className="text-primary hover:underline truncate" href={deployment} target='_blank'>{deployment}</a>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono">
                                <span className="text-slate-500">SOURCE:</span>
                                <a className="text-slate-300 hover:text-white truncate" href={repo} target='_blank'>{repo}</a>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase">
                                <span>EVALUATION_METRIC</span>
                                <span className="text-primary font-bold">CORE_STRENGTH: {marks}</span>
                            </div>

                            <input className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-primary" max={10} min={0} step={0.5} type="range" defaultValue={0}
                                onChange={e => {
                                    setMarks(e.target.valueAsNumber);
                                    console.log(e.target.valueAsNumber);

                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-2">
                <button
                    hidden={pos_A}
                    className={clsx(
                        " border border-primary  font-mono text-xs py-2 hover:bg-primary hover:text-black transition-all uppercase tracking-tighter",
                        pos == 1 ? "text-black bg-primary" : "bg-black text-primary")}
                    onClick={() => {
                        if (pos == 1) {
                            setPos(0);
                            return
                        }
                        setPos(1);
                    }}
                >1st_PLACE</button>

                <button
                    hidden={pos_B}
                    className={clsx(
                        "border border-cyan-700 font-mono text-xs py-2 hover:bg-cyan-700 hover:text-white transition-all uppercase tracking-tighter",
                        pos == 2 ? "bg-cyan-700 text-white " : "bg-black text-cyan-700 ")}
                    onClick={() => {
                        if (pos == 2) {
                            setPos(0);
                            return
                        }
                        setPos(2);
                    }}
                >2nd_PLACE</button>


                <button className={clsx(
                    "border border-emerald-500  font-mono text-xs py-2 hover:bg-emerald-500 hover:text-black transition-all uppercase tracking-tighter",
                    pos == 3 ? "bg-emerald-500 text-black " : "bg-black text-emerald-500")}
                    onClick={() => {
                        if (pos == 3) {
                            setPos(0);
                            return
                        }
                        setPos(3);
                    }}
                    hidden={pos_C}
                >3rd_PLACE</button>

                <button className={clsx("border border-secondary font-mono text-xs py-2 transition-all uppercase tracking-tighter", !reject ? "bg-black  text-secondary hover:bg-secondary hover:text-white " : "bg-white text-black hover:bg-secondary hover:text-gray-500 ")}

                    onClick={() => {
                        setPos(0);
                        setReject(!reject);
                    }}

                >ELIMINATE_PROCESS</button>
            </div>

            <div className="mt-6 flex justify-between items-center border-t border-slate-800/50 pt-4">
                <div className="flex gap-4">
                    <button className="text-xs font-mono text-slate-400 hover:text-primary transition-colors flex items-center gap-1"
                        onClick={handleSavingJudgement}
                    >
                        <span className="material-symbols-outlined text-sm">save</span> SAVE_DATA_PROTOCOL
                    </button>

                    <button className="text-xs font-mono text-slate-400 hover:text-white transition-colors flex items-center gap-1" hidden>
                        <span className="material-symbols-outlined text-sm">edit</span> EDIT_ENTRY
                    </button>
                </div>
                {/* <div className="text-[10px] font-mono text-slate-600">LAST_MODIFIED: 12:44:02_UTC</div> */}
            </div>
        </div>
    )
}
