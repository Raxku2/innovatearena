import React, { useEffect, useState } from 'react'
import { useCertificateGenerator } from '../../hooks'
import { useEventDetailsStore, useUserDetailsStore } from '../../stores';

export default function Cirtificates() {
    const { generateExelCertificate, generatePartiCertificate } = useCertificateGenerator();
    const { userId, userName, judgement, present, pos, rejected } = useUserDetailsStore();
    const { certificate_release } = useEventDetailsStore();

    const [position, setPosition] = useState(null)

    useEffect(() => {
        if (pos == 1) {
            setPosition("1st")
        }
        if (pos == 2) {
            setPosition("2nd")
        }
        if (pos == 3) {
            setPosition("3rd")
        }
    }, []);

    const handelCertificateDownload = async () => {
        if (pos && pos != 0 && pos < 4) {
            if (!position) {
                return
            }


            generateExelCertificate({ name: userName, id: userId, pos: position })
            return
        }
        await generatePartiCertificate({ name: userName, id: userId });
    }

    return (
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">

                <div className="col-span-1 md:col-span-12 glass-panel border neon-border-pink rounded-xl p-6 relative overflow-hidden group flex flex-col">
                    <div className="scan-line-anim opacity-10"></div>
                    <div className="absolute top-4 right-4 text-neon-pink/20 group-hover:text-neon-pink/40 transition-colors">
                        <span className="material-symbols-outlined text-5xl">school</span>
                    </div>

                    <div className="flex items-center mb-6 border-b border-neon-pink/20 pb-3 relative z-10">
                        <h2 className="text-neon-pink font-display font-bold text-xl tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 bg-neon-pink rounded-full animate-pulse shadow-[0_0_8px_#ff0055]"></span>
                            CERTIFICATE_VAULT
                        </h2>
                    </div>
                    {!certificate_release &&
                        <div
                            className="bg-black/60 border-l-2 border-neon-pink p-3 flex justify-between items-center hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-slate-500 text-sm">terminal</span>
                                <span className="text-white text-sm">{"Unpublished by Organizers"}</span>
                            </div>
                        </div>
                    }

                    {certificate_release &&
                        <>
                            {(rejected || !present) &&
                                < div
                                    className="bg-black/60 border-l-2 border-neon-pink p-3 flex justify-between items-center hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-slate-500 text-sm">terminal</span>
                                        <span className="text-white text-sm">{"Your profile is not eligible for this certificate"}</span>
                                    </div>
                                </div>}

                            {(!rejected && present && !judgement) &&
                                <div
                                    className="bg-black/60 border-l-2 border-neon-pink p-3 flex justify-between items-center hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-slate-500 text-sm">terminal</span>
                                        <span className="text-white text-sm">{"Submission Pending Evaluation"}</span>
                                    </div>
                                </div>}

                            {(!rejected && present && judgement) &&
                                <div
                                    className="bg-black/60 border-l-2 border-neon-pink p-3 flex justify-between items-center hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-slate-500 text-sm">terminal</span>
                                        <span className="text-white text-sm">{"Digital Certificate Available"}</span>
                                    </div>

                                    <div className="flex gap-2">
                                        {/* <button className="btn-action btn-cyan">MODIFY_PRIVILEGE</button> */}
                                        <button className="btn-action btn-pink"
                                            onClick={handelCertificateDownload}
                                        >DOWNLOAD_CERTIFICATE</button>
                                    </div>
                                </div>
                            }
                        </>
                    }
                </div>
            </div>
        </div >
    )
}
