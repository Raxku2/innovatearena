import React from 'react'
import { useGoogleAuth } from '../../hooks'
import { useEventDetailsStore } from '../../stores';

export default function Navbar1() {
    const { login } = useGoogleAuth();
    const {enableLoadingBar} = useEventDetailsStore();


    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-terminal border-b border-neon-cyan/20">
            <div className="layout-container flex h-20 items-center justify-between px-6 lg:px-12 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-4 text-white group cursor-pointer">
                    <div className="text-neon-cyan relative">
                        <span className="material-symbols-outlined text-[32px] group-hover:animate-pulse">terminal</span>
                        <div className="absolute inset-0 bg-neon-cyan blur-md opacity-40"></div>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-white text-xl font-display font-bold tracking-widest uppercase">INNOVATE<span className="text-neon-pink">Are</span><span className="text-neon-cyan">na</span></h2>
                        <span className="text-[10px] font-mono text-neon-green tracking-[0.3em]">&gt; SYSTEM_ONLINE</span>
                    </div>
                </div>
                <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest">
                    <a className="text-slate-400 hover:text-neon-yellow hover:text-glow-yellow transition-all duration-300 uppercase" href="#mission">// MISSION</a>
                    <a className="text-slate-400 hover:text-neon-pink hover:text-glow-pink transition-all duration-300 uppercase" href="#battlegrounds">// BATTLEGROUNDS</a>
                    <a className="text-slate-400 hover:text-neon-green hover:text-glow-green transition-all duration-300 uppercase" href="#protocols">// PROTOCOLS</a>
                    <a className="text-slate-400 hover:text-neon-cyan hover:text-glow-cyan transition-all duration-300 uppercase" href="#timeline">// TIMELINE</a>
                </nav>
                <div className="flex items-center gap-4">
                    <button className="hidden sm:flex items-center justify-center overflow-hidden bg-black/50 hover:bg-neon-cyan/10 border border-neon-cyan text-neon-cyan h-10 px-8 text-sm font-display font-bold uppercase tracking-wider transition-all box-glow-cyan hover:scale-105 clip-path-polygon"
                        onClick={() => {
                            enableLoadingBar();
                            login();
                        }}
                    >
                        <span className="mr-2 material-symbols-outlined text-sm">login</span>
                        ACCESS_GRANT
                    </button>
                </div>
            </div>
        </header>
    )
}
