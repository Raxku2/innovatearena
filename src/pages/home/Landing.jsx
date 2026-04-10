import React, { useEffect, useState } from 'react'
import { useEventDetailsStore } from '../../stores';
import { OrganizersCard } from '../../component';
import { useGoogleAuth } from '../../hooks';

export default function Landing() {

    const { eventDuration, eventDomains, eventPrize, registrationOpen, registrationClose, eventDate, eventOrganizers, venueLocation, venuePhoto, teamSize, enableLoadingBar } = useEventDetailsStore();

    const { login, isLoaded } = useGoogleAuth();

    const [time, setTime] = useState(0);
    const [domains, setDomains] = useState(0);
    const [prize, setPrize] = useState(0.0);


    useEffect(() => {

        const interval = setInterval(() => {
            setTime(prev => (prev < eventDuration ? prev + 1 : prev));
            setDomains(prev => (prev < eventDomains ? prev + 1 : prev));
            setPrize(prev =>
                prev < eventPrize ? +(prev + 0.1).toFixed(1) : prev
            );
        }, 130);

        return () => clearInterval(interval);

    }, []);
    const formattedTime = String(time).padStart(2, "0");
    const formattedDomains = String(domains).padStart(2, "0");
    const formattedPrize = prize.toFixed(1);


    function eventDateFormatted() {
        const date = new Date(eventDate);

        // Extract the full month name and convert to uppercase
        const month = date.toLocaleString('en-US', { month: 'long' }).toUpperCase();
        const day = date.getDate();

        return `${month} ${day}`;
    }

    function prevEventDate() {
        const date = new Date(eventDate);

        date.setDate(date.getDate() - 1);

        // Extract the full month name and convert to uppercase
        const month = date.toLocaleString('en-US', { month: 'long' }).toUpperCase();
        const day = date.getDate();

        return `${month} ${day}`;
    }





    return (
        <div className="font-body text-slate-200 antialiased overflow-x-hidden selection:bg-(--neon-pink) selection:text-white">

            <div className="fixed inset-0 z-100 crt-overlay pointer-events-none"></div>
            <div className="fixed inset-0 z-0 pointer-events-none scanline"></div>

            <div className="fixed right-0 top-1/4 z-40 hidden xl:flex flex-col gap-2 p-2 pointer-events-none">
                <div className="glass-terminal p-4 w-48 rounded-l-lg border-r-0 transform translate-x-2 hover:translate-x-0 transition-transform duration-300 pointer-events-auto">
                    <h4 className="text-(--neon-cyan) font-mono text-xs mb-2 border-b border-(--neon-cyan)/30 pb-1">SYS_STATUS</h4>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-[10px] text-(--neon-green) font-mono mb-1">
                                <span>CPU_LOAD</span>
                                <span>94%</span>
                            </div>
                            <div className="h-1 bg-gray-800 w-full overflow-hidden">
                                <div className="h-full bg-(--neon-green) w-[94%] animate-pulse"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] text-(--neon-pink) font-mono mb-1">
                                <span>NET_UPLINK</span>
                                <span>12TB/s</span>
                            </div>
                            <div className="h-1 bg-gray-800 w-full overflow-hidden">
                                <div className="h-full bg-(--neon-pink) w-[68%]"></div>
                            </div>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                            &gt; PROTOCOL_ACTIVE<br />
                            &gt; ENCRYPTION: 256-BIT
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative flex min-h-screen w-full flex-col">

                <main className="grow pt-20">
                    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
                        <div className="absolute inset-0 z-0 opacity-40">
                            <div className="absolute top-[10%] left-[10%] w-125 h-125 bg-(--neon-pink)/10 rounded-full blur-[100px] animate-float"></div>
                            <div className="absolute bottom-[10%] right-[10%] w-150 h-150 bg-(--neon-cyan)/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-3s' }}></div>
                        </div>
                        <div className="relative z-10 flex flex-col items-center text-center max-w-6xl mx-auto">
                            <div className="inline-flex items-center gap-3 px-4 py-1 border border-(--neon-green)/30 bg-(--neon-green)/5 mb-12 backdrop-blur-md skew-x-[-10deg]">
                                <span className="skew-x-10 flex items-center gap-2">
                                    <span className="flex h-2 w-2 rounded-full bg-(--neon-green) animate-pulse box-shadow-green"></span>
                                    <span className="text-xs font-mono font-bold text-(--neon-green) tracking-[0.2em] uppercase">YANTRAYODHA CLUB ONLINE</span>
                                </span>
                            </div>
                            <h1 className="font-display font-black leading-none tracking-tighter mb-8 perspective-1000">
                                <div className="text-6xl md:text-8xl lg:text-[7rem] text-white glitch-text mb-2" data-text="DECODE">DECODE</div>
                                <div className="text-6xl md:text-8xl lg:text-[7rem] text-transparent bg-clip-text bg-linear-to-r from-(--neon-cyan) via-white to-(--neon-pink) text-glow-cyan glitch-text" data-text="THE FUTURE">THE FUTURE</div>
                            </h1>
                            <p className="text-lg md:text-xl font-mono text-slate-300 max-w-2xl mx-auto mb-12 tracking-wide border-l-2 border-(--neon-yellow) pl-6 text-left">
                                <span className="text-(--neon-yellow)">&gt;</span> STAGING_FRONTEND_DOMINATION...<br />
                                <span className="text-(--neon-yellow)">&gt;</span> 6 BATTLEGROUNDS IDENTIFIED.<br />
                                <span className="text-(--neon-yellow)">&gt;</span> TOTAL BOUNTY: <span className="text-white font-bold bg-(--neon-yellow)/20 px-1">₹2K PRIZE POOL</span>
                            </p>
                            <button className="group relative flex items-center justify-between w-full max-w-sm bg-black border border-slate-700 hover:border-(--neon-pink) rounded px-2 py-2 transition-all duration-300 box-glow-pink hover:scale-105"
                                onClick={(e) => {
                                    e.preventDefault();
                                    enableLoadingBar();
                                    login();
                                }}
                            >
                                <div className="absolute inset-0 bg-(--neon-pink)/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="flex items-center gap-4 z-10 pl-2">
                                    <div className="w-10 h-10 rounded bg-white flex items-center justify-center">
                                        <img alt="G" className="w-6 h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7CQT2EMq335wa8_IbuzjhXuqPwJ44zIODPUTZmjQWhSDCKHWd2lW6EZbpdIqe0PIN7LSgyqjzBXoCshgM2RSDd03e02WKZO6JlftOFSj0JK5D_rWu6V7qxmvRvojVS33uyDctnupQ1okts56r8wXcTjcvUwck-H4PBKSvEn0Z_AYbnD8tp3laQiltzhz-lQaMZNMcHtSp8ARA3YFxduCGx8ayLt1KUHdODY1mZnhHY33eBUGQj_4nUPaZnhLnnolFVFhJZr1CVfZF" />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Identity Verification</span>
                                        <span className="text-white font-display font-bold text-md tracking-wider">INITIATE_THE_TAKEOVER</span>
                                    </div>
                                </div>
                                <div className="h-10 w-10 flex items-center justify-center border-l border-slate-700 group-hover:border-(--neon-pink)/50 z-10 text-(--neon-pink)">
                                    <span className="material-symbols-outlined animate-pulse">fingerprint</span>
                                </div>
                            </button>
                        </div>
                        <div className="relative z-10 mt-24 w-full max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="glass-terminal p-6 border-t-4 border-t-(--neon-pink) flex flex-col gap-1 hover:bg-(--neon-pink)/5 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-2 right-2 text-(--neon-pink)/20">
                                        <span className="material-symbols-outlined text-6xl">view_cozy</span>
                                    </div>
                                    <span className="text-(--neon-pink) text-xs font-mono font-bold tracking-[0.2em] uppercase mb-2">TARGET_SECTORS</span>
                                    <div className="flex items-baseline gap-2">


                                        <span className="text-5xl font-display font-bold text-white group-hover:text-(--neon-pink) text-glow-pink transition-colors">{formattedDomains}</span>


                                        <span className="text-sm font-mono text-slate-400">Domains</span>
                                    </div>
                                    <div className="w-full h-1 bg-gray-800 mt-4 rounded-full overflow-hidden">
                                        <div className="h-full bg-(--neon-pink) w-full"></div>
                                    </div>
                                </div>
                                <div className="glass-terminal p-6 border-t-4 border-t-(--neon-cyan) flex flex-col gap-1 hover:bg-(--neon-cyan)/5 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-2 right-2 text-(--neon-cyan)/20">
                                        <span className="material-symbols-outlined text-6xl">timer</span>
                                    </div>
                                    <span className="text-(--neon-cyan) text-xs font-mono font-bold tracking-[0.2em] uppercase mb-2">TIME_CONSTRAINT</span>
                                    <div className="flex items-baseline gap-2">


                                        <span className="text-5xl font-display font-bold text-white group-hover:text-(--neon-cyan) text-glow-cyan transition-colors">{formattedTime}</span>


                                        <span className="text-sm font-mono text-slate-400">Hours</span>
                                    </div>
                                    <div className="w-full h-1 bg-gray-800 mt-4 rounded-full overflow-hidden">
                                        <div className="h-full bg-(--neon-cyan) w-[60%] animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="glass-terminal p-6 border-t-4 border-t-(--neon-yellow) flex flex-col gap-1 hover:bg-(--neon-yellow)/5 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-2 right-2 text-(--neon-yellow)/20">
                                        <span className="material-symbols-outlined text-6xl">monetization_on</span>
                                    </div>
                                    <span className="text-(--neon-yellow) text-xs font-mono font-bold tracking-[0.2em] uppercase mb-2">BOUNTY_POOL</span>
                                    <div className="flex items-baseline gap-2">


                                        <span className="text-5xl font-display font-bold text-white group-hover:text-(--neon-yellow) text-glow-yellow transition-colors">₹{formattedPrize}K</span>
                                        <span className="text-sm font-mono text-slate-400">INR</span>


                                    </div>
                                    <div className="w-full h-1 bg-gray-800 mt-4 rounded-full overflow-hidden">
                                        <div className="h-full liquid-progress w-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="py-24 px-6 relative bg-surface-hacker border-t border-(--neon-cyan)/10" id="mission">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwgMjQzLCAyNTUsIDAuMSkiLz48L3N2Zz4=')] opacity-20"></div>
                        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1 relative group">
                                <div className="relative w-full aspect-square max-w-md mx-auto transform hover:scale-105 transition-transform duration-500" data-alt="Abstract glitch art geometric shapes with neon cyan and dark blue hues">
                                    <div className="absolute inset-0 border-2 border-neon-cyan/30 rotate-3 z-0"></div>
                                    <div className="absolute inset-0 border-2 border-neon-pink/30 -rotate-3 z-0"></div>
                                    <div className="absolute inset-4 bg-black/60 backdrop-blur-sm border border-neon-cyan/40 flex flex-col items-center justify-center z-10 overflow-hidden">
                                        <div className="absolute top-0 w-full h-full bg-linear-to-b from-(--neon-cyan)/10 to-transparent animate-scan"></div>
                                        <span className="material-symbols-outlined text-9xl text-(--neon-cyan)/80 animate-pulse mb-4">terminal</span>
                                        <div className="font-mono text-(--neon-pink) text-xs glitch-text" data-text="ERROR: SLEEP_NOT_FOUND">ERROR: SLEEP_NOT_FOUND</div>
                                    </div>
                                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-(--neon-cyan)/20 blur-[60px] animate-pulse"></div>
                                    <div className="absolute -left-10 -top-10 w-40 h-40 bg-(--neon-pink)/20 blur-[60px] animate-pulse"></div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2 flex flex-col gap-8">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="w-8 h-0.5 bg-(--neon-pink)"></span>
                                        <h2 className="text-(--neon-pink) text-sm font-mono font-bold tracking-[0.2em] uppercase">The_Mission_Protocol</h2>
                                    </div>
                                    <h3 className="text-4xl md:text-6xl font-display font-black text-white leading-tight mb-6">
                                        NO SLEEP. <br />
                                        <span className="text-slate-600 line-through decoration-(--neon-cyan) decoration-4">JUST CODE.</span> <br />
                                        <span className="text-transparent bg-clip-text bg-linear-to-r from-(--neon-yellow) to-(--neon-green)">PURE ADRENALINE.</span>
                                    </h3>
                                    <p className="text-slate-400 font-mono text-lg leading-relaxed border-l-4 border-(--neon-cyan)/50 pl-6 bg-linear-to-r from-(--neon-cyan)/5 to-transparent py-4">
                                        &gt; INITIATING 5-HOUR SPRINT SEQUENCE.<br />
                                        &gt; SEARCHING FOR ARCHITECTS...<br />
                                        &gt; OBJECTIVE: PROTOTYPE THE IMPOSSIBLE.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="bg-black/40 border border-slate-800 p-4 hover:border-(--neon-yellow) transition-all hover:box-glow-yellow group">
                                        <span className="material-symbols-outlined text-(--neon-yellow) mb-3 group-hover:scale-110 transition-transform">bolt</span>
                                        <h4 className="text-white font-display font-bold mb-1">HIGH_INTENSITY</h4>
                                        <p className="text-xs text-slate-500 font-mono">Build fast, break things.</p>
                                    </div>
                                    <div className="bg-black/40 border border-slate-800 p-4 hover:border-(--neon-cyan) transition-all hover:box-glow-cyan group">
                                        <span className="material-symbols-outlined text-(--neon-cyan) mb-3 group-hover:scale-110 transition-transform">code</span>
                                        <h4 className="text-white font-display font-bold mb-1">RAPID_PROTO</h4>
                                        <p className="text-xs text-slate-500 font-mono">Idea to execution.</p>
                                    </div>
                                    <div className="bg-black/40 border border-slate-800 p-4 hover:border-(--neon-pink) transition-all hover:box-glow-pink group">
                                        <span className="material-symbols-outlined text-(--neon-pink) mb-3 group-hover:scale-110 transition-transform">bug_report</span>
                                        <h4 className="text-white font-display font-bold mb-1">GLITCH_AESTHETIC</h4>
                                        <p className="text-xs text-slate-500 font-mono">Embrace the chaos.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="py-24 px-6 relative" id="battlegrounds">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                                <div>
                                    <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-2 uppercase tracking-tight text-glow-cyan">Battlegrounds</h2>
                                    <div className="h-1 w-full bg-linear-to-r from-(--neon-cyan) to-transparent"></div>
                                </div>
                                <p className="text-slate-400 font-mono max-w-md text-right md:text-right">
                                    &gt; SELECT_DOMAIN<br />
                                    &gt; 6 SECTORS AVAILABLE FOR DISRUPTION.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="group relative bg-black border border-slate-800 p-8 overflow-hidden hover:border-(--neon-yellow) transition-all duration-300 hover:scale-[1.02] hover:box-glow-yellow">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-9xl text-(--neon-yellow)">school</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                                        <div className="w-14 h-14 bg-(--neon-yellow)/10 border border-(--neon-yellow) flex items-center justify-center text-(--neon-yellow) group-hover:bg-(--neon-yellow) group-hover:text-black transition-colors">
                                            <span className="material-symbols-outlined text-3xl">school</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-(--neon-yellow) transition-colors">EDUCATION</h3>
                                            <p className="text-sm font-mono text-slate-400">Revolutionize learning. EdTech solutions for the next gen.</p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-(--neon-yellow) group-hover:w-full transition-all duration-500"></div>
                                </div>


                                <div className="group relative bg-black border border-slate-800 p-8 overflow-hidden hover:border-(--neon-pink) transition-all duration-300 hover:scale-[1.02] hover:box-glow-pink">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-9xl text-(--neon-pink)">ecg_heart</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                                        <div className="w-14 h-14 bg-(--neon-pink)/10 border border-(--neon-pink) flex items-center justify-center text-(--neon-pink) group-hover:bg-(--neon-pink) group-hover:text-black transition-colors">
                                            <span className="material-symbols-outlined text-3xl">ecg_heart</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-(--neon-pink) transition-colors">HEALTH</h3>
                                            <p className="text-sm font-mono text-slate-400">Bio-hacking and digital health interfaces.</p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-(--neon-pink) group-hover:w-full transition-all duration-500"></div>
                                </div>
                                <div className="group relative bg-black border border-slate-800 p-8 overflow-hidden hover:border-(--neon-cyan) transition-all duration-300 hover:scale-[1.02] hover:box-glow-cyan">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-9xl text-(--neon-cyan)">shopping_cart</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                                        <div className="w-14 h-14 bg-(--neon-cyan)/10 border border-(--neon-cyan) flex items-center justify-center text-(--neon-cyan) group-hover:bg-(--neon-cyan) group-hover:text-black transition-colors">
                                            <span className="material-symbols-outlined text-3xl">shopping_cart</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-(--neon-cyan) transition-colors">E-COMMERCE</h3>
                                            <p className="text-sm font-mono text-slate-400">Next-gen retail experiences and decentralized markets.</p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-(--neon-cyan) group-hover:w-full transition-all duration-500"></div>
                                </div>
                                <div className="group relative bg-black border border-slate-800 p-8 overflow-hidden hover:border-(--neon-green) transition-all duration-300 hover:scale-[1.02] hover:box-glow-green">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-9xl text-(--neon-green)">account_balance</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                                        <div className="w-14 h-14 bg-(--neon-green)/10 border border-(--neon-green) flex items-center justify-center text-(--neon-green) group-hover:bg-(--neon-green) group-hover:text-black transition-colors">
                                            <span className="material-symbols-outlined text-3xl">account_balance</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-(--neon-green) transition-colors">FINTECH</h3>
                                            <p className="text-sm font-mono text-slate-400">DeFi, payment gateways, and financial sovereignty.</p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-(--neon-green) group-hover:w-full transition-all duration-500"></div>
                                </div>
                                <div className="group relative bg-black border border-slate-800 p-8 overflow-hidden hover:border-(--neon-green) transition-all duration-300 hover:scale-[1.02] hover:box-glow-green">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-9xl text-(--neon-green)">sports_esports</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                                        <div className="w-14 h-14 bg-(--neon-green)/10 border border-(--neon-green) flex items-center justify-center text-(--neon-green) group-hover:bg-(--neon-green) group-hover:text-black transition-colors">
                                            <span className="material-symbols-outlined text-3xl">sports_esports</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-(--neon-green) transition-colors">ENTERTAINMENT TECH</h3>
                                            <p className="text-sm font-mono text-slate-400">Interactive Media & Virtual Experience Platforms.</p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-(--neon-green) group-hover:w-full transition-all duration-500"></div>
                                </div>

                                <div className="group relative bg-black border border-slate-800 p-8 overflow-hidden hover:border-(--neon-cyan) transition-all duration-300 hover:scale-[1.02] hover:box-glow-cyan">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                                        <span className="material-symbols-outlined text-9xl text-(--neon-cyan)">map</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                                        <div className="w-14 h-14 bg-(--neon-cyan)/10 border border-(--neon-cyan) flex items-center justify-center text-(--neon-cyan) group-hover:bg-(--neon-cyan) group-hover:text-black transition-colors">
                                            <span className="material-symbols-outlined text-3xl">map</span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-(--neon-cyan) transition-colors">TOURISM TECH</h3>
                                            <p className="text-sm font-mono text-slate-400">TravelTech & Geo-Spatial Experience Platforms.</p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-(--neon-cyan) group-hover:w-full transition-all duration-500"></div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="py-24 px-6 bg-black/50 border-y border-(--neon-cyan)/20" id="protocols">
                        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
                            <div className="flex-1">
                                <h2 className="text-3xl font-display font-black text-white mb-8 uppercase tracking-wide flex items-center gap-3">
                                    <span className="material-symbols-outlined text-(--neon-pink)">gavel</span>
                                    <span className="text-glow-pink">Protocol_Rules</span>
                                </h2>
                                <div className="border border-slate-700 rounded bg-background-deep p-2 font-mono text-sm">
                                    <div className="bg-slate-800/50 p-2 text-slate-400 mb-2 flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                        <span className="ml-2">/root/rules/config.json</span>
                                    </div>
                                    <div className="space-y-4 p-4 text-green-400">
                                        <div className="flex items-start gap-4 p-3 border border-slate-800 rounded bg-black/40 hover:border-(--neon-pink) hover:bg-(--neon-pink)/5 transition-all cursor-pointer group">
                                            <span className="material-symbols-outlined text-(--neon-pink) mt-1 group-hover:animate-bounce">block</span>
                                            <div>
                                                <h4 className="text-white font-bold mb-1">NO_BOOTSTRAP</h4>
                                                <p className="text-xs text-slate-500">"Original code only. Frameworks allowed. Templates: FORBIDDEN."</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 p-3 border border-slate-800 rounded bg-black/40 hover:border-(--neon-cyan) hover:bg-(--neon-cyan)/5 transition-all cursor-pointer group">
                                            <span className="material-symbols-outlined text-(--neon-cyan) mt-1 group-hover:animate-spin">smart_toy</span>
                                            <div>
                                                <h4 className="text-white font-bold mb-1">AI_AUGMENTATION</h4>
                                                <p className="text-xs text-slate-500">"Tools: Copilot, ChatGPT, Claude. Use intelligence amplification."</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 p-3 border border-slate-800 rounded bg-black/40 hover:border-(--neon-yellow) hover:bg-(--neon-yellow)/5 transition-all cursor-pointer group">
                                            <span className="material-symbols-outlined text-(--neon-yellow) mt-1 group-hover:animate-pulse">group</span>
                                            <div>
                                                <h4 className="text-white font-bold mb-1">SQUAD_SIZE [{teamSize}]</h4>
                                                <p className="text-xs text-slate-500">"Solo ops permitted. Teams recommended for optimal output."</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-3xl font-display font-black text-white mb-8 uppercase tracking-wide flex items-center gap-3">
                                    <span className="material-symbols-outlined text-(--neon-cyan)">analytics</span>
                                    <span className="text-glow-cyan">System_Metrics</span>
                                </h2>
                                <div className="relative p-8 border border-(--neon-cyan)/40 rounded-xl bg-black/80 backdrop-blur-sm shadow-[0_0_30px_rgba(0,243,255,0.1)]">
                                    <div className="absolute top-0 right-0 p-2 text-[10px] text-(--neon-cyan) font-mono opacity-80 border-l border-b border-(--neon-cyan)/40 bg-(--neon-cyan)/10">SYS_ANALYSIS_V.{__APP_VERSION__}</div>
                                    <div className="absolute -right-4 -top-4 w-24 h-24 border-2 border-(--neon-cyan)/20 rounded-full flex items-center justify-center animate-spin-slow pointer-events-none">
                                        <div className="w-full h-px bg-(--neon-cyan)/20"></div>
                                        <div className="absolute h-full w-1 bg-(--neon-cyan)/20"></div>
                                    </div>
                                    <div className="space-y-8 mt-4">
                                        <div className="group">
                                            <div className="flex justify-between text-sm mb-2 font-mono">
                                                <span className="text-white font-bold group-hover:text-(--neon-pink) transition-colors">INNOVATION</span>
                                                <span className="text-(--neon-pink)">98%</span>
                                            </div>
                                            <div className="h-4 w-full bg-slate-800/50 rounded overflow-hidden border border-slate-700">
                                                <div className="h-full bg-(--neon-pink) w-[98%] shadow-[0_0_15px_rgba(255,0,85,0.8)] relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group">
                                            <div className="flex justify-between text-sm mb-2 font-mono">
                                                <span className="text-white font-bold group-hover:text-(--neon-yellow) transition-colors">EXECUTION</span>
                                                <span className="text-(--neon-yellow)">85%</span>
                                            </div>
                                            <div className="h-4 w-full bg-slate-800/50 rounded overflow-hidden border border-slate-700">
                                                <div className="h-full bg-(--neon-yellow) w-[85%] shadow-[0_0_15px_rgba(255,238,0,0.8)] relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group">
                                            <div className="flex justify-between text-sm mb-2 font-mono">
                                                <span className="text-white font-bold group-hover:text-(--neon-cyan) transition-colors">AESTHETICS</span>
                                                <span className="text-(--neon-cyan)">92%</span>
                                            </div>
                                            <div className="h-4 w-full bg-slate-800/50 rounded overflow-hidden border border-slate-700">
                                                <div className="h-full bg-(--neon-cyan) w-[92%] shadow-[0_0_15px_rgba(0,243,255,0.8)] relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group">
                                            <div className="flex justify-between text-sm mb-2 font-mono">
                                                <span className="text-white font-bold group-hover:text-(--neon-green) transition-colors">DOCUMENTATION</span>
                                                <span className="text-(--neon-green)">75%</span>
                                            </div>
                                            <div className="h-4 w-full bg-slate-800/50 rounded overflow-hidden border border-slate-700">
                                                <div className="h-full bg-(--neon-green) w-[75%] shadow-[0_0_15px_rgba(0,255,157,0.8)] relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="py-24 px-6 relative overflow-hidden bg-background-deep" id="timeline">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

                        <div className="max-w-4xl mx-auto relative z-10">
                            <h2 className="text-center text-4xl font-display font-black text-white mb-20 uppercase tracking-widest text-glow-cyan glitch-text" data-text="CHRONOS TIMELINE">Chronos Timeline</h2>

                            <div className="relative border-l-4 border-(--neon-cyan)/20 ml-6 md:ml-0 md:pl-0 space-y-16">
                                <div className="relative flex flex-col md:flex-row md:items-center group">
                                    <div className="hidden md:block w-1/2 text-right pr-12">
                                        <h3 className="text-2xl font-display font-bold text-white group-hover:text-(--neon-cyan) transition-colors">REGISTRATIONS_OPEN</h3>
                                        <p className="text-slate-400 font-mono text-sm mt-1">Begin application sequence.</p>
                                    </div>
                                    <div className="absolute -left-1.5 md:left-1/2 md:-ml-2 w-4 h-4 bg-black border-2 border-(--neon-cyan) rounded-full z-10 group-hover:scale-150 group-hover:bg-(--neon-cyan) group-hover:shadow-[0_0_20px_rgba(0,243,255,0.8)] transition-all duration-300"></div>
                                    <div className="pl-8 md:pl-12 w-full md:w-1/2">
                                        <span className="text-(--neon-cyan) font-mono text-lg font-bold bg-(--neon-cyan)/10 px-2 py-1 rounded border border-(--neon-cyan)/30">{registrationOpen}</span>
                                        <div className="md:hidden mt-2">
                                            <h3 className="text-xl font-bold text-white">REGISTRATIONS_OPEN</h3>
                                            <p className="text-slate-400 font-mono text-sm mt-1">Begin application sequence.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative flex flex-col md:flex-row md:items-center group">
                                    <div className="hidden md:block w-1/2 text-right pr-12">
                                        <span className="text-(--neon-pink) font-mono text-lg font-bold bg-(--neon-pink)/10 px-2 py-1 rounded border border-(--neon-pink)/30">{prevEventDate()}</span>
                                    </div>
                                    <div className="absolute -left-1.5 md:left-1/2 md:-ml-2 w-4 h-4 bg-black border-2 border-slate-600 group-hover:border-(--neon-pink) rounded-full z-10 group-hover:scale-150 group-hover:bg-(--neon-pink) group-hover:shadow-[0_0_20px_rgba(255,0,85,0.8)] transition-all duration-300"></div>
                                    <div className="pl-8 md:pl-12 w-full md:w-1/2">
                                        <h3 className="text-2xl font-display font-bold text-white group-hover:text-(--neon-pink) transition-colors">TEAM_FORMATION_FREEZE</h3>
                                        <p className="text-slate-400 font-mono text-sm mt-1">Lock your squad configuration.</p>
                                        <div className="md:hidden mt-2">
                                            <span className="text-(--neon-pink) font-mono text-sm font-bold bg-(--neon-pink)/10 px-2 py-1 rounded border border-(--neon-pink)/30"> {prevEventDate()} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative flex flex-col md:flex-row md:items-center group">
                                    <div className="hidden md:block w-1/2 text-right pr-12">
                                        <h3 className="text-2xl font-display font-bold text-white group-hover:text-(--neon-green) transition-colors">EVENT_DAY</h3>
                                        <p className="text-slate-400 font-mono text-sm mt-1">Mainnet launch. 5 hours of code.</p>
                                    </div>
                                    <div className="absolute left-1.5 md:left-1/2 md:-ml-2 w-4 h-4 bg-black border-2 border-slate-600 group-hover:border-(--neon-green) rounded-full z-10 group-hover:scale-150 group-hover:bg-(--neon-green) group-hover:shadow-[0_0_20px_rgba(0,255,157,0.8)] transition-all duration-300"></div>
                                    <div className="pl-8 md:pl-12 w-full md:w-1/2">
                                        <span className="text-(--neon-green) font-mono text-lg font-bold bg-(--neon-green)/10 px-2 py-1 rounded border border-(--neon-green)/30"> {eventDateFormatted()} </span>
                                        <div className="md:hidden mt-2">
                                            <h3 className="text-xl font-bold text-white">EVENT_DAY</h3>
                                            <p className="text-slate-400 font-mono text-sm mt-1">Mainnet launch. 5 hours of code.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="py-24 px-6 bg-surface-hacker border-t border-(--neon-cyan)/20">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="flex flex-col gap-6">
                                <h2 className="text-3xl font-display font-black text-white uppercase tracking-wide flex items-center gap-2">
                                    <span className="w-3 h-3 bg-(--neon-green) animate-pulse"></span>
                                    The Sanctuary
                                </h2>
                                <div className="relative w-full h-100 rounded-xl overflow-hidden border border-(--neon-green)/30 group">
                                    <div className="absolute inset-0 bg-green-900/20 z-10 mix-blend-overlay pointer-events-none"></div>
                                    <div className="absolute top-4 left-4 z-20 bg-black/90 backdrop-blur text-(--neon-green) px-4 py-2 text-xs font-mono rounded border border-(--neon-green)/50 box-glow-green">
                                        LOC: {venueLocation}
                                    </div>
                                    <div className="laser-scan"></div>
                                    <img className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter contrast-125" data-alt="High tech modern university campus building at night" data-location="Mogra Campus" src={venuePhoto} />
                                    <div className="absolute inset-0 bg-linear-to-t from-background-deep via-transparent to-transparent z-10"></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex justify-between items-end">
                                    <h2 className="text-3xl font-display font-black text-white uppercase tracking-wide">The Architects</h2>
                                    <span className="text-(--neon-pink) font-mono text-sm tracking-widest">[ YANTRAYODHA_CLUB ]</span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">



                                    {
                                        eventOrganizers.map((e, index) => (
                                            <OrganizersCard name={e.name} dp={e.dp} role={e.role} key={index} />
                                        ))
                                    }



                                </div>
                            </div>
                        </div>
                    </section>


                </main>

            </div>


        </div>
    )
}
