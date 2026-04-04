import React from 'react'

export default function SubmitsCard() {
    return (

        <div className="relative bg-slate-900/40 p-6 border border-slate-800/50 group hover:border-primary/50 transition-all duration-500">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                <div className="md:col-span-12 flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-headline font-bold text-on-surface mb-2 tracking-tight uppercase">Neural_Link_v1</h3>
                        <div className="space-y-1 mb-4">
                            <div className="flex items-center gap-2 text-xs font-mono">
                                <span className="text-slate-500">UPLINK:</span>
                                <a className="text-primary hover:underline truncate" href="#">https://deploy.net/neural-link-v1-production</a>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono">
                                <span className="text-slate-500">SOURCE:</span>
                                <a className="text-slate-300 hover:text-white truncate" href="#">https://github.com/innovate-core/neural-link</a>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase">
                                <span>EVALUATION_METRIC</span>
                                <span className="text-primary font-bold">CORE_STRENGTH: 8.5</span>
                            </div>
                            <input className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-primary" max="10" min="0" step="0.5" type="range" defaultValue="8.5" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-2">
                <button className="bg-black border border-primary text-primary font-mono text-xs py-2 hover:bg-primary hover:text-black transition-all uppercase tracking-tighter">1st_PLACE</button>
                <button className="bg-black border border-cyan-700 text-cyan-700 font-mono text-xs py-2 hover:bg-cyan-700 hover:text-white transition-all uppercase tracking-tighter">2nd_PLACE</button>
                <button className="bg-black border border-emerald-500 text-emerald-500 font-mono text-xs py-2 hover:bg-emerald-500 hover:text-black transition-all uppercase tracking-tighter">3rd_PLACE</button>
                <button className="bg-black border border-secondary text-secondary font-mono text-xs py-2 hover:bg-secondary hover:text-white transition-all uppercase tracking-tighter">ELIMINATE_PROCESS</button>
            </div>
            <div className="mt-6 flex justify-between items-center border-t border-slate-800/50 pt-4">
                <div className="flex gap-4">
                    <button className="text-xs font-mono text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">save</span> SAVE_DATA_PROTOCOL
                    </button>
                    <button className="text-xs font-mono text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">edit</span> EDIT_ENTRY
                    </button>
                </div>
                {/* <div className="text-[10px] font-mono text-slate-600">LAST_MODIFIED: 12:44:02_UTC</div> */}
            </div>
        </div>
    )
}
