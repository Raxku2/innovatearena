import React from 'react'

export default function Footer1() {
    return (
        <footer className="border-t border-(--neon-cyan)/20 bg-black py-12 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwgMjQzLCAyNTUsIDAuMSkiLz48L3N2Zz4=')] opacity-20"></div>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                <div className="flex items-center gap-4 text-white">
                    <span className="material-symbols-outlined text-(--neon-cyan) text-[32px] animate-pulse">terminal</span>
                    <div>
                        <h2 className="text-white text-lg font-display font-bold tracking-tight uppercase">Innovate <span className="text-(--neon-cyan)">arena</span></h2>
                        <p className="text-xs text-slate-500 font-mono">Powered by Yantrayodha Club</p>
                    </div>
                </div>
                <div className="flex gap-8">
                    <a className="text-slate-400 hover:text-(--neon-cyan) hover:scale-125 transition-all" href="#"><span className="material-symbols-outlined">mail</span></a>
                    <a className="text-slate-400 hover:text-(--neon-pink) hover:scale-125 transition-all" href="#"><span className="material-symbols-outlined">public</span></a>
                    <a className="text-slate-400 hover:text-(--neon-yellow) hover:scale-125 transition-all" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
                    <div className='flex-col flex items-center justify-center'>

                        <a className="hover:text-neon-cyan transition-colors text-slate-400" href="https://innovatearena.vercel.app/terms">TERMS_OF_SERVICE</a>
                        <a className="hover:text-neon-pink transition-colors text-slate-400" href="https://innovatearena.vercel.app/privecy">PRIVACY_PROTOCOL</a>
                        <a className="hover:text-neon-yellow transition-colors text-slate-400" href="https://innovatearena.vercel.app/refund">REFUND_PROTOCOL</a>

                    </div>
                </div>
                <div className="text-slate-600 text-xs font-mono">
                    © 2026 Pinaka. <span className="text-(--neon-green)">ALL SYSTEMS OPERATIONAL.</span>
                </div>
            </div>
        </footer>
    )
}
