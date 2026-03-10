import React from 'react'
import { useGoogleAuth } from '../../hooks';
import { useEventDetailsStore, useUserDetailsStore } from '../../stores';
import { Link } from 'react-router';

export default function Navbar2() {

    const { login } = useGoogleAuth();
    const { enableLoadingBar } = useEventDetailsStore();
    const {
        dp, userName, userType,
    } = useUserDetailsStore();


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

                    <Link className="text-slate-400 hover:text-neon-yellow hover:text-glow-yellow transition-all duration-300 uppercase" to="/">// HOME</Link>
                    <Link className="text-slate-400 hover:text-neon-yellow hover:text-glow-yellow transition-all duration-300 uppercase" to="/terms">// TERMS</Link>
                    <Link className="text-slate-400 hover:text-neon-yellow hover:text-glow-yellow transition-all duration-300 uppercase" to="/privecy">// PRIVECY</Link>
                    <Link className="text-slate-400 hover:text-neon-yellow hover:text-glow-yellow transition-all duration-300 uppercase" to="/refund">// REFUND</Link>



                </nav>


                <div className="w-10 h-10 rounded-full border border-(--neon-cyan)/50 p-0.5 relative group cursor-pointer flex justify-center items-center" hidden={userType == ''}>
                    <img
                        alt={userName ? userName[0] : "U"}
                        src={dp}
                        referrerPolicy="no-referrer"
                        className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${userName || 'User'}&background=000000&color=fff`;
                        }}
                    />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-(--neon-green) border border-black rounded-full"></div>
                </div>
                <div className="flex items-center gap-4" hidden={userType != ''}>
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
