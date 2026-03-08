import React from 'react'

export default function Radar() {
    return (
        <div className="glass-panel neon-border-red rounded-xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-75">

            <div className="absolute top-0 right-0 p-3 opacity-50">
                <span className="material-symbols-outlined text-neon-red">radar</span>
            </div>

            <h3 className="text-white font-display font-bold text-sm tracking-widest absolute top-6 left-6">COHORT_RADAR</h3>
            <div className="relative w-48 h-48 mt-4 flex items-center justify-center">
                {/* <div className='w-full h-full absolute '>

                </div> */}
                    {/* <div className='h-2 w-2 rounded-full bg-red-500 top-10 left-2 absolute animate-pulse'></div> */}

                <div className="absolute inset-0 border border-slate-700 rounded-full opacity-30"></div>
                <div className="absolute inset-4 border border-slate-700 rounded-full opacity-40"></div>
                <div className="absolute inset-8 border border-slate-700 rounded-full opacity-50"></div>
                <div className="absolute inset-12 border border-slate-600 rounded-full opacity-60"></div>
                <div className="absolute w-full h-px bg-slate-800 top-1/2 left-0 transform -translate-y-1/2"></div>
                <div className="absolute h-full w-px bg-slate-800 top-0 left-1/2 transform -translate-x-1/2"></div>
                <div className="absolute h-full w-px bg-slate-800 top-0 left-1/2 transform -translate-x-1/2 rotate-45"></div>
                <div className="absolute h-full w-px bg-slate-800 top-0 left-1/2 transform -translate-x-1/2 -rotate-45"></div>

                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_10px_rgba(255,51,51,0.5)]" viewBox="0 0 100 100">
                    <polygon fill="rgba(255, 51, 51, 0.2)" points="50,15 80,40 70,80 30,80 20,40" stroke="#ff3333" strokeWidth="1.5"></polygon>
                </svg>

                <div className="absolute top-1/2 left-1/2 w-[50%] h-1  origin-left animate-spin-slow" style={{
                    background: 'linear-gradient(to right, transparent, #ff3333)'
                }}> </div>
            </div>


            <div className="mt-6 w-full grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-500 uppercase text-center">
                <div className="p-1 border border-slate-800 rounded bg-slate-900/50">Alpha: '26</div>
                <div className="p-1 border border-slate-800 rounded bg-slate-900/50">Beta: '27</div>
                <div className="p-1 border border-slate-800 rounded bg-slate-900/50">Gamma: '28</div>
                <div className="p-1 border border-slate-800 rounded bg-slate-900/50">Delta: '29</div>
            </div>
        </div>
    )
}
