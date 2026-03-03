import React from 'react'
import { Navbar1, Navbar2 } from '../../component';
import { useEventDetailsStore } from '../../stores';
import { useGoogleAuth } from '../../hooks';
import { Link } from 'react-router';

export default function Terms() {
    const { login } = useGoogleAuth();
    const { enableLoadingBar } = useEventDetailsStore();
    return (
        <main class="flex-1 relative">

            {/* <Navbar2/> */}
            <header className="fixed top-0 left-0 right-0 z-50 glass-terminal border-b border-neon-cyan/20">
                <div className="layout-container flex h-20 items-center justify-between px-6 lg:px-12 max-w-7xl mx-auto w-full">
                    <div className="flex items-center gap-4 text-white group cursor-pointer">
                        <div className="text-neon-cyan relative">
                            <span className="material-symbols-outlined text-[32px] group-hover:animate-pulse">gavel</span>
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

            <header class="min-h-[60vh] flex flex-col justify-center items-start px-8 md:px-20 relative overflow-hidden border-b border-slate-800 mt-[10%]">

                
                <div class="absolute inset-0 bg-gradient-to-b from-transparent to-background-deep z-0"></div>
                <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[150px] pointer-events-none"></div>
                <div class="relative z-10 w-full max-w-5xl">
                    <div class="flex items-center gap-4 mb-6">
                        <span class="px-2 py-1 bg-neon-pink text-black font-mono font-bold text-xs">CONFIDENTIAL</span>
                        <span class="font-mono text-neon-cyan text-xs tracking-widest">// LEGAL_COMPLIANCE_LAYER</span>
                    </div>
                    <h1 class="kinetic-title font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter text-white leading-[0.9] mb-8 wrap-break-words">
                        THE_LEGAL<br />PROTOCOLS
                    </h1>
                    <div class="flex flex-col md:flex-row md:items-center justify-between border-t border-slate-700 pt-6 w-full">
                        <div class="flex flex-col mb-4 md:mb-0">
                            <span class="text-xs font-mono text-slate-500 mb-1">DOCUMENT_STATUS</span>
                            <span class="text-neon-green font-mono text-sm tracking-wider">[ ACTIVE_ENFORCEMENT ]</span>
                        </div>
                        <div class="flex flex-col text-right">
                            <span class="text-xs font-mono text-slate-500 mb-1">LAST_UPDATE</span>
                            <span class="text-white font-mono text-sm tracking-wider">MARCH_03_2026 // 14:00:00 IST</span>
                        </div>
                    </div>
                </div>
            </header>
            <div class="px-6 md:px-20 py-20 space-y-32 max-w-6xl mx-auto">
                <section class="relative group" id="ELIGIBILITY">
                    <div class="absolute -left-4 -top-4 text-8xl font-display font-black text-slate-800/20 -z-10 group-hover:text-neon-cyan/10 transition-colors">01</div>
                    <div class="glass-panel neon-border-cyan rounded-none p-1 md:p-1">
                        <div class="bg-black/40 p-8 md:p-12 relative overflow-hidden">
                            <div class="scan-line-anim opacity-10"></div>
                            <h2 class="font-display font-bold text-3xl text-white mb-8 flex items-center gap-4">
                                <span class="text-neon-cyan">01.</span> ELIGIBILITY_CRITERIA
                            </h2>
                            <div class="font-mono text-sm md:text-base text-slate-300 space-y-6 leading-relaxed">
                                <p>
                                    Access to the InnovateArena mainframe is restricted to currently enrolled students of accredited institutions. Verification of academic credentials constitutes a mandatory handshake protocol.
                                </p>
                                <ul class="list-none space-y-4 mt-4 pl-4 border-l border-slate-700">
                                    <li class="flex items-start gap-3">
                                        <span class="material-symbols-outlined text-neon-cyan text-sm mt-1">terminal</span>
                                        <span>Participants must be 16+ cycles of age or provide guardian authorization keys.</span>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <span class="material-symbols-outlined text-neon-cyan text-sm mt-1">terminal</span>
                                        <span>Cross-institutional teams are permitted provided all nodes (members) are verified.</span>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <span class="material-symbols-outlined text-neon-cyan text-sm mt-1">terminal</span>
                                        <span>Professional developers are barred from entry to maintain fair competitive latency.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="relative group" id="PAYMENTS">
                    <div class="absolute -right-4 -top-4 text-8xl font-display font-black text-slate-800/20 -z-10 group-hover:text-neon-pink/10 transition-colors">02</div>
                    <div class="glass-panel neon-border-pink rounded-xl p-8 md:p-12 relative overflow-hidden">
                        <div class="absolute top-0 right-0 p-4">
                            <span class="material-symbols-outlined text-neon-pink opacity-20 text-6xl">payments</span>
                        </div>
                        <h2 class="font-display font-bold text-3xl text-white mb-8 flex items-center gap-4">
                            <span class="text-neon-pink">02.</span> TRANSACTION_LOGIC
                        </h2>
                        <div class="font-mono text-sm md:text-base text-slate-300 space-y-6 leading-relaxed">
                            <p>
                                All monetary transfers for registration fees are final unless the <span class="text-neon-yellow">CRITICAL_PROTOCOL</span> (Section 03) is invoked.
                            </p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div class="border border-slate-700 p-4 bg-slate-900/50">
                                    <h4 class="text-neon-pink font-bold mb-2">ACCEPTED_GATEWAYS</h4>
                                    <p class="text-xs text-slate-400">UPI, Credit/Debit Cards, NetBanking. Crypto-assets are currently not supported by the central bank firewall.</p>
                                </div>
                                <div class="border border-slate-700 p-4 bg-slate-900/50">
                                    <h4 class="text-neon-pink font-bold mb-2">CURRENCY_STD</h4>
                                    <p class="text-xs text-slate-400">All transactions are processed in INR (Indian Rupees). International participants must handle FX fees.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="relative" id="REFUND_POLICY">
                    <div class="absolute inset-0 bg-neon-yellow/5 blur-[100px] -z-10"></div>
                    <div class="border-2 border-neon-yellow bg-black/80 p-1 shadow-[0_0_50px_rgba(255,238,0,0.15)] relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-full h-[2px] bg-neon-yellow animate-scan"></div>
                        <div class="bg-black/60 p-8 md:p-12 backdrop-blur-xl">
                            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                <h2 class="font-display font-bold text-3xl text-white flex items-center gap-4">
                                    <span class="text-neon-yellow">03.</span> CANCELLATION &amp; REFUND
                                </h2>
                                <span class="px-3 py-1 bg-neon-yellow text-black font-bold font-mono text-xs animate-pulse">CRITICAL_PROTOCOL</span>
                            </div>
                            <div class="font-body text-slate-200 space-y-6 text-lg">
                                <p class="border-l-4 border-neon-yellow pl-6 py-2 bg-neon-yellow/5">
                                    <strong class="text-white">Strict No-Refund Policy:</strong> Once the registration sequence is initiated and payment is confirmed, no refunds will be issued under standard operating conditions.
                                </p>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                    <div>
                                        <h4 class="font-mono text-neon-yellow mb-2 text-sm uppercase">Exception_Handler_01</h4>
                                        <p class="text-sm text-slate-400">If the event is cancelled by the organizers (Force Majeure), a full refund will be processed within 5-7 business cycles.</p>
                                    </div>
                                    <div>
                                        <h4 class="font-mono text-neon-yellow mb-2 text-sm uppercase">Exception_Handler_02</h4>
                                        <p class="text-sm text-slate-400">Duplicate transactions due to gateway errors will be automatically reversed to the source node within 48 hours.</p>
                                    </div>
                                </div>
                                <div class="mt-8 pt-8 border-t border-slate-800 flex items-center gap-4 text-xs font-mono text-slate-500">
                                    <span class="material-symbols-outlined">verified_user</span>
                                    <span>COMPLIANT WITH RAZORPAY MERCHANT TERMS v2.4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="relative group" id="CODE_OF_CONDUCT">
                    <div class="hacker-grid border border-slate-700 bg-black/80 p-8 md:p-12 relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-neon-green/20 to-transparent pointer-events-none"></div>
                        <h2 class="font-display font-bold text-3xl text-white mb-8 flex items-center gap-4 relative z-10">
                            <span class="text-neon-green">04.</span> THE_PROTOCOLS
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 relative z-10 font-mono text-sm">
                            <div class="space-y-4">
                                <h3 class="text-white border-b border-slate-700 pb-2">SUB_ROUTINE: BEHAVIOR</h3>
                                <p class="text-slate-400">Harassment includes offensive verbal comments related to gender, sexual orientation, disability, physical appearance, body size, race, or religion.</p>
                                <p class="text-slate-400">Participants asked to stop any harassing behavior are expected to comply immediately or face immediate disconnection.</p>
                            </div>
                            <div class="space-y-4">
                                <h3 class="text-white border-b border-slate-700 pb-2">SUB_ROUTINE: INTELLECTUAL_PROPERTY</h3>
                                <p class="text-slate-400">All code committed during the hackathon must be original. Plagiarism detectors are active on all submission repositories.</p>
                                <p class="text-slate-400">Open source libraries are permitted, provided they are declared in the project manifest.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="opacity-50 hover:opacity-100 transition-opacity" id="SHIPPING">
                    <div class="border-l border-slate-800 pl-6 py-2">
                        <h3 class="font-mono text-slate-500 text-sm mb-2">05. SHIPPING_POLICY</h3>
                        <p class="text-xs font-mono text-slate-600">NOT_APPLICABLE for digital goods/services. Swag kits (if applicable) are collected on-site.</p>
                    </div>
                </section>


                <section class="relative py-12 " id="CONTACT">
                    <div class="architects-card p-8 bg-white md:p-12 shadow-[10px_10px_0px_#00f3ff] relative transform hover:-translate-y-1 transition-transform">

                        {/* <div class="absolute top-4 right-4 font-mono font-bold text-xs bg-black text-white px-2 py-1">Direct_Link</div> */}

                        <h2 class="font-display font-black text-4xl mb-8 uppercase tracking-tighter">
                            08. Contact<br />Uplink
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-sm">
                            <div>
                                <p class="font-bold mb-1">OFFICIAL_CHANNEL</p>
                                <a class="text-blue-600 hover:underline text-lg" href="mailto:yantrayodha+support@gmail.com">yantrayodha+support@gmail.com</a>
                            </div>
                            <div>
                                <p class="font-bold mb-1">EMERGENCY_VOICE_LINE</p>
                                <p class="text-lg">+91 76792 83874 <span class="text-xs text-gray-500 ml-2">(1000 - 1800 IST)</span></p>
                            </div>
                            <div class="md:col-span-2 pt-6 border-t-2 border-black">
                                <p class="font-bold mb-2">PHYSICAL_NODE</p>
                                <p class="max-w-md uppercase ">Abacus Institute ECE department, Natungram, Mogra, Hooghly, west_bengal-712148</p>
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="mt-20 pt-10 border-t border-slate-800 text-center pb-10">
                    <p class="font-mono text-xs text-slate-600 uppercase">
                        © 2026 pinaka . ALL RIGHTS RESERVED. <br />
                        SYSTEM_ID: LEGAL_DOC_V0.1
                    </p>
                </footer>
            </div>
        </main>
    )
}
