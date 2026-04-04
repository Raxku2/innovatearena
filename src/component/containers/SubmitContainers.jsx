import React from 'react'
import SubmitsCard from '../cards/SubmitsCard'

export default function SubmitContainers() {
    return (
        <section className="glass-terminal shadow-[0_0_30px_rgba(0,243,255,0.15)] flex flex-col h-full  ">


            <div className="p-6 border-b border-slate-800/50 flex justify-between items-center bg-cyan-950/10">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>layers</span>
                    <h2 className="font-mono text-lg font-bold tracking-tight text-primary uppercase">SUBMISSION_EVALUATION_DECK</h2>
                </div>
                {/* <div className="flex gap-2">
                    <button className="material-symbols-outlined p-2 bg-slate-800/50 hover:bg-primary hover:text-black transition-all">filter_list</button>
                    <button className="material-symbols-outlined p-2 bg-slate-800/50 hover:bg-primary hover:text-black transition-all">sort</button>
                </div> */}
            </div>

            {/* */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">

                <SubmitsCard />

            </div>

            {/* */}
            <div className="p-4 border-t border-slate-800 bg-black/60 flex justify-between items-center text-[10px] font-mono text-slate-500">
                <div className="flex gap-4 items-center">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> LIVE_FEED_SYNC</span>
                    <span>SUBMISSIONS_REMAINING: 28</span>
                </div>
                <div className="flex gap-1">
                    <div className="w-4 h-1 bg-primary"></div>
                    <div className="w-4 h-1 bg-primary/40"></div>
                    <div className="w-4 h-1 bg-primary/10"></div>
                </div>
            </div>

        </section>
    )
}