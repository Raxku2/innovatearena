import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router'; // Note: Usually 'react-router-dom' in modern React
import { useGoogleAuth } from '../../hooks';
import { useEventDetailsStore, useUserDetailsStore } from '../../stores';

export default function CertificateVerify() {
    const { id } = useParams(); // Cleaner destructuring
    const { login } = useGoogleAuth();
    const { enableLoadingBar, disableLoadingBar } = useEventDetailsStore();
    const { dp, userName, userType } = useUserDetailsStore();
    const BACKEND_API = import.meta.env.VITE_BACKEND_API;

    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [deployment, setDeployment] = useState("");

    // Status can be: 'loading', 'valid', 'not_found', 'rejected', 'absent'
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        if (!id) {
            setStatus("not_found");
            return;
        }

        const fetchCertificateData = async () => {
            try {
                enableLoadingBar();
                setStatus("loading");

                const res = await fetch(BACKEND_API + `/user/${id}`);

                if (res.status === 200) {
                    const data = await res.json();

                    // console.log(data);


                    // Filter based on present and rejected status
                    if (data.rejected === true) {
                        setStatus("rejected");
                    } else if (data.present === false) {
                        setStatus("absent");
                    } else if (data.judgement === false) {
                        // setStatus("absent");
                        setStatus("not_found");
                    } else {
                        // Assuming valid if not rejected and not explicitly marked absent
                        if (data.name) setName(data.name);

                        // Position mapping logic (Checking for null/undefined because 0 is falsy)
                        if (data.pos !== undefined && data.pos !== null) {
                            const posNumber = Number(data.pos); // Coerce to number just in case it's a string

                            if (posNumber === 1) {
                                setPosition("1st");
                            } else if (posNumber === 2) {
                                setPosition("2nd");
                            } else if (posNumber === 3) {
                                setPosition("3rd");
                            } else if (posNumber === 0) {
                                setPosition("Participant");
                            } else {
                                // Fallback just in case another value comes through
                                setPosition(data.pos);
                            }
                        }

                        if (data.deployment) setDeployment(data.deployment);
                        setStatus("valid");
                    }
                } else if (res.status === 404) {
                    setStatus("not_found");
                } else {
                    setStatus("not_found"); // Fallback for other errors
                }
            } catch (error) {
                console.error("Profile fetch failed:", error);
                setStatus("not_found");
            } finally {
                disableLoadingBar();
            }
        };

        fetchCertificateData();
    }, [id, BACKEND_API, enableLoadingBar, disableLoadingBar]);

    // Helper function to render different certificate states
    const renderCertificateContent = () => {
        if (status === "loading") {
            return (
                <div className="flex justify-center items-center h-64 border-2 border-dashed border-slate-700 bg-black/50 text-neon-cyan font-mono animate-pulse">
                    &gt; VERIFYING_RECORDS...
                </div>
            );
        }

        if (status === "not_found") {
            return (
                <div className="p-8 bg-black/80 md:p-12 shadow-[10px_10px_0px_#ff003c] border-2 border-red-500 text-center">
                    <h2 className="font-display font-black text-4xl uppercase tracking-tighter text-red-500 mb-4">
                        RECORD_NOT_FOUND
                    </h2>
                    <p className="font-mono text-slate-400">The requested certificate ID does not exist in the system registry.</p>
                </div>
            );
        }

        if (status === "rejected") {
            return (
                <div className="p-8 bg-black/80 md:p-12 shadow-[10px_10px_0px_#ff003c] border-2 border-red-500 text-center">
                    <h2 className="font-display font-black text-4xl uppercase tracking-tighter text-red-500 mb-4">
                        CERTIFICATE_REVOKED
                    </h2>
                    <p className="font-mono text-slate-400">This certificate has been marked as rejected by the issuing node.</p>
                </div>
            );
        }

        if (status === "absent") {
            return (
                <div className="p-8 bg-black/80 md:p-12 shadow-[10px_10px_0px_#ffeb3b] border-2 border-yellow-500 text-center">
                    <h2 className="font-display font-black text-4xl uppercase tracking-tighter text-yellow-500 mb-4">
                        UNVERIFIED_ATTENDANCE
                    </h2>
                    <p className="font-mono text-slate-400">Participant was marked absent. Certificate is invalid.</p>
                </div>
            );
        }

        // VALID STATUS
        return (
            <div className="architects-card p-8 bg-white md:p-12 shadow-[10px_10px_0px_#00f3ff] relative border-2 border-black">
                {/* Certificate Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 border-b-2 border-black pb-6 gap-4">
                    <h2 className="font-display font-black text-4xl uppercase tracking-tighter">
                        VERIFIED_CERTIFICATE
                    </h2>
                    <div className="font-mono text-sm md:text-right">
                        <p className="font-bold text-gray-500 text-xs tracking-widest">VERIFICATION_STATUS</p>
                        <p className="text-green-600 font-bold uppercase flex items-center md:justify-end gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Authentic
                        </p>
                    </div>
                </div>

                {/* Certificate Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-sm">
                    {/* Participant Name */}
                    <div className="md:col-span-2">
                        <p className="font-bold mb-1 text-gray-500 text-xs tracking-widest uppercase">Participant_Name</p>
                        <p className="text-3xl font-bold uppercase tracking-tight text-black">{name || "N/A"}</p>
                    </div>

                    {/* Position/Role */}
                    <div>
                        <p className="font-bold mb-1 text-gray-500 text-xs tracking-widest uppercase">Position_Granted</p>
                        <p className="text-xl font-bold text-black uppercase">{position || "Participant"}</p>
                    </div>

                    {/* Deployment Link */}
                    <div>
                        <p className="font-bold mb-1 text-gray-500 text-xs tracking-widest uppercase">Project_Deployment</p>
                        {deployment ? (
                            <a
                                href={deployment.startsWith('http') ? deployment : `https://${deployment}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline text-lg inline-flex items-center gap-1 break-all"
                            >
                                View Project Deployment
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            </a>
                        ) : (
                            <p className="text-gray-400 italic">No deployment link provided</p>
                        )}
                    </div>

                    {/* Footer / Issuing Authority */}
                    <div className="md:col-span-2 pt-6 border-t-2 border-black mt-2">
                        <p className="font-bold mb-2 text-gray-500 text-xs tracking-widest uppercase">ISSUING_NODE</p>
                        <p className="max-w-md uppercase text-xs leading-relaxed">
                            Yantrayodha Event Committee<br />
                            Abacus Institute ECE department & CSE department, Natungram, Mogra, Hooghly, West_Bengal-712148
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <main className="flex-1 relative">
            <header className="fixed top-0 left-0 right-0 z-50 glass-terminal border-b border-neon-cyan/20">
                <div className="layout-container flex h-20 items-center justify-between px-6 lg:px-12 max-w-7xl mx-auto w-full">
                    <div className="flex items-center gap-4 text-white group cursor-pointer">
                        <div className="text-neon-cyan relative">
                            <span className="material-symbols-outlined text-[32px] group-hover:animate-pulse">policy</span>
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
                    <div className="w-10 h-10 rounded-full border border-neon-cyan/50 p-0.5 relative group cursor-pointer flex justify-center items-center" hidden={userType === ''}>
                        <img
                            alt={userName ? userName[0] : "U"}
                            src={dp}
                            referrerPolicy="no-referrer"
                            className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
                            onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${userName || 'User'}&background=000000&color=fff`;
                            }}
                        />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-neon-green border border-black rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-4" hidden={userType !== ''}>
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

            <div className="px-6 md:px-20 py-20 space-y-32 max-w-6xl mx-auto">
                <section className="relative py-12 pt-24" id="certificate-verifier">
                    {renderCertificateContent()}
                </section>

                <footer className="mt-20 pt-10 border-t border-slate-800 text-center pb-10">
                    <p className="font-mono text-xs text-slate-600 uppercase">
                        © 2026 pinaka . ALL RIGHTS RESERVED. <br />
                        SYSTEM_ID: VALIDA_V0.1
                    </p>
                </footer>
            </div>
        </main>
    );
}