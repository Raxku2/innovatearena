import React from 'react'
import { useGoogleAuth } from '../../hooks';
import { useEventDetailsStore } from '../../stores';
import { Link } from 'react-router';

export default function RefundPolicy() {
    const { login } = useGoogleAuth();
    const { enableLoadingBar } = useEventDetailsStore();


    return (
        <main className="flex-1 relative">

            <header className="fixed top-0 left-0 right-0 z-50 glass-terminal border-b border-neon-cyan/20">
                <div className="layout-container flex h-20 items-center justify-between px-6 lg:px-12 max-w-7xl mx-auto w-full">
                    <div className="flex items-center gap-4 text-white group cursor-pointer">
                        <div className="text-neon-pink relative">
                            <span className="material-symbols-outlined  text-[32px] text-neon-pink  animate-pulse">policy</span>
                            <div className="absolute inset-0 bg-neon-pink blur-md opacity-40"></div>
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

            <header className="min-h-[60vh] flex flex-col justify-center items-start px-8 md:px-20 relative overflow-hidden border-b border-slate-800 mt-[10%]">
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-background-deep z-0 noise-bg"></div>
                <div className="absolute top-0 right-0 w-150 h-150 bg-neon-pink/5 rounded-full blur-[150px] pointer-events-none"></div>
                <div className="relative z-10 w-full max-w-5xl">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="px-2 py-1 bg-neon-cyan text-black font-mono font-bold text-xs">OFFICIAL_DOC</span>
                        <span className="font-mono text-neon-pink text-xs tracking-widest animate-pulse">// FINANCIAL_LAYER</span>
                    </div>
                    <h1 className="kinetic-title font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter text-white leading-[0.9] mb-8 wrap-break-word uppercase">
                        REFUND_PROTOCOL<br /><span className="text-transparent bg-clip-text bg-linear-to-r from-neon-pink to-neon-cyan">V0.2</span>
                    </h1>

                    <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-slate-700 pt-6 w-full">
                        <div className="flex flex-col mb-4 md:mb-0">
                            <span className="text-xs font-mono text-slate-500 mb-1">CURRENT_STATUS</span>
                            <span className="text-neon-cyan font-mono text-sm tracking-wider flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
                                PUBLIC_ENFORCEMENT
                            </span>
                        </div>

                        <div className="flex flex-col text-right">
                            <span className="text-xs font-mono text-slate-500 mb-1">LAST_UPDATE</span>
                            <span className="text-white font-mono text-sm tracking-wider">MARCH_10_2026 // 12:00:00 IST</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="px-6 md:px-20 py-20 space-y-32 max-w-5xl mx-auto">
                <section className="relative group" id="NO_REFUND">
                    <div className="absolute -left-4 -top-4 text-8xl font-display font-black text-slate-800/20 -z-10 group-hover:text-neon-pink/10 transition-colors">01</div>
                    <div className="glass-panel neon-border-pink rounded-none p-1">
                        <div className="bg-black/80 p-8 md:p-12 relative overflow-hidden backdrop-blur-xl">
                            <div className="scan-line-anim opacity-10"></div>
                            <div className="flex justify-between items-start mb-8">
                                <h2 className="font-display font-bold text-2xl md:text-3xl text-white flex items-center gap-4">
                                    <span className="text-neon-pink">01.</span> GENERAL_NO-REFUND_POLICY
                                </h2>
                                <span className="material-symbols-outlined text-neon-pink text-3xl">lock</span>
                            </div>
                            <div className="font-mono text-sm md:text-base text-slate-300 space-y-6 leading-relaxed border-l-2 border-neon-pink/30 pl-6">
                                <p className="text-white font-bold text-lg">
                                    <span className="text-neon-pink">[!] WARNING:</span> UNIDIRECTIONAL TRANSACTION FLOW
                                </p>
                                <p>
                                    InnovateArena operates a strict <span className="text-white">No-Refund Policy</span>. Once the registration handshake is complete and the nominal fee of <span className="text-neon-pink font-bold">₹50</span> is successfully transmitted to our secure gateway, the protocol locks the transaction.
                                </p>
                                <p className="text-slate-400 text-xs">
                                    // REASONING: This fee is immediately allocated to server provisioning, API credits, and prize pool liquidity injection. Reversing this process causes system instability.
                                </p>
                                <div className="bg-neon-pink/10 border border-neon-pink/20 p-4 mt-4 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-neon-pink">info</span>
                                    <span className="text-xs font-mono text-neon-pink">Please verify all team data before initiating the payment sequence.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative group" id="CORRECTION">
                    <div className="absolute -right-4 -top-4 text-8xl font-display font-black text-slate-800/20 -z-10 group-hover:text-neon-cyan/10 transition-colors">02</div>
                    <div className="border border-slate-700 bg-surface-hacker p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-neon-cyan/20 to-transparent pointer-events-none"></div>
                        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                            <h2 className="font-display font-bold text-2xl md:text-3xl text-white flex items-center gap-4 relative z-10">
                                <span className="text-neon-cyan">02.</span> ACCOUNT_CORRECTION
                            </h2>
                            <span className="px-3 py-1 bg-neon-cyan text-black font-bold font-mono text-xs animate-pulse">ACTION_REQUIRED</span>
                        </div>
                        <div className="space-y-6 font-mono text-sm relative z-10">
                            <p className="text-slate-300">
                                Scenario: <span className="text-white font-bold">Payment Successful but Account Not Updated</span>
                            </p>
                            <p className="text-slate-400">
                                In rare instances of network latency or packet loss during the Razorpay callback, your dashboard status may remain 'UNPAID' despite funds being deducted.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                <div className="border border-slate-700 bg-black/50 p-6 hover:border-neon-cyan transition-colors group/card">
                                    <h3 className="text-neon-cyan font-bold mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">timer</span> Step 01: WAIT
                                    </h3>
                                    <p className="text-slate-500 text-xs">Allow 15-30 minutes for the asynchronous reconciliation bot to retry the handshake.</p>
                                </div>
                                <div className="border border-slate-700 bg-black/50 p-6 hover:border-neon-cyan transition-colors group/card flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-neon-cyan font-bold mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">mail</span> Step 02: SIGNAL
                                        </h3>
                                        <p className="text-slate-500 text-xs mb-4">If status persists, transmit proof of payment (Transaction ID) to our support node immediately.</p>
                                    </div>
                                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-sm">
                                        <p className="text-red-400 font-mono text-[10px] uppercase leading-tight">
                                            <span className="font-bold">[!] INVALID_PROOF:</span> Screenshots of "Payment Success" lacking a visible Transaction ID, UTR, or bank reference number are strictly unacceptable and will be rejected.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative" id="AUTO_REFUND">
                    <div className="absolute inset-0 bg-neon-yellow/5 blur-[100px] -z-10"></div>
                    <div className="border-2 border-neon-yellow bg-black/80 p-1 shadow-[0_0_50px_rgba(255,238,0,0.15)] relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-neon-yellow animate-scan"></div>
                        <div className="bg-black/60 p-8 md:p-12 backdrop-blur-xl">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                <h2 className="font-display font-bold text-2xl md:text-3xl text-white flex items-center gap-4">
                                    <span className="text-neon-yellow">03.</span> FAILED_TRANSACTIONS
                                </h2>
                                <div className="flex items-center gap-2 px-3 py-1 border border-neon-yellow/50 rounded-full bg-neon-yellow/10">
                                    <div className="w-2 h-2 rounded-full bg-neon-yellow animate-pulse"></div>
                                    <span className="font-mono text-neon-yellow text-xs">Razorpay_Uplink: ACTIVE</span>
                                </div>
                            </div>
                            <div className="font-body text-slate-200 space-y-6">
                                <p>
                                    If funds are deducted but the gateway returns a <span className="font-mono text-neon-yellow">FAILURE</span> signal:
                                </p>
                                <div className="bg-gray-900 border-l-4 border-neon-yellow p-6">
                                    <p className="font-mono text-sm text-slate-300">
                                        &gt; INITIATING AUTO-REFUND SEQUENCE...<br />
                                        &gt; TARGET: SOURCE_BANK_ACCOUNT<br />
                                        &gt; ESTIMATED_ARRIVAL: 5-7 BUSINESS_CYCLES
                                    </p>
                                </div>
                                <p className="text-sm text-slate-400">
                                    This process is automated by the banking network protocols. InnovateArena admins cannot accelerate this timeline manually.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative group" id="EVENT_CANCELLATION">
                    <div className="hacker-grid border border-slate-700 bg-black/80 p-8 md:p-12 relative overflow-hidden">
                        <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-6 flex items-center gap-4 relative z-10">
                            <span className="text-slate-500">04.</span> EVENT_CANCELLATION
                        </h2>
                        <div className="flex gap-4 items-start">
                            <span className="material-symbols-outlined text-red-500 text-4xl mt-1">warning</span>
                            <div className="space-y-4">
                                <p className="font-syne font-bold text-xl text-white">CONTINGENCY_PROTOCOL: TOTAL_SYSTEM_SHUTDOWN</p>
                                <p className="font-mono text-sm text-slate-400">
                                    In the unlikely event that InnovateArena is cancelled by the organizing committee due to Force Majeure or critical infrastructure failure, a <span className="text-white underline decoration-neon-green">100% REFUND</span> will be executed for all registered participants.
                                </p>
                                <ul className="font-mono text-xs text-slate-500 list-disc list-inside space-y-1">
                                    <li>Refunds will be processed to the original payment method.</li>
                                    <li>Notification will be sent via registered email channels.</li>
                                    <li>Processing time: T+7 Days.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative py-12 " id="CONTACT">
                    <div className="architects-card p-8 bg-white md:p-12 shadow-[10px_10px_0px_#00f3ff] relative transform hover:-translate-y-1 transition-transform">
                        <h2 className="font-display font-black text-4xl mb-8 uppercase tracking-tighter">
                            05. Contact<br />Uplink
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-sm">
                            <div>
                                <p className="font-bold mb-1">OFFICIAL_CHANNEL</p>
                                <a className="text-blue-600 hover:underline text-lg" href="mailto:yantrayodha+support@gmail.com">yantrayodha+support@gmail.com</a>
                                <p className="text-xs text-gray-500 mt-1">All disputes and payment proofs must be routed here. Do NOT directly contact individual organizers.</p>
                            </div>
                            <div>
                                <p className="font-bold mb-1">EMERGENCY_VOICE_LINE</p>
                                <p className="text-lg">+91 76792 83874 <span className="text-xs text-gray-500 ml-2">(Mon-Fri, 1000 - 2000 IST)</span></p>
                            </div>
                            <div className="md:col-span-2 pt-6 border-t-2 border-black">
                                <p className="font-bold mb-2">PHYSICAL_NODE</p>
                                <p className="max-w-md uppercase ">Abacus Institute ECE department, Natungram, Mogra, Hooghly, west_bengal-712148</p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="mt-20 pt-10 border-t border-slate-800 text-center pb-10">
                    <p className="font-mono text-xs text-slate-600 uppercase">
                        © 2026 pinaka . ALL RIGHTS RESERVED. <br />
                        SYSTEM_ID: FINANCIAL_DOC_V0.2
                    </p>
                </footer>
            </div>
        </main>
    )
}