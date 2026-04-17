import React from 'react';

export default function NotFound() {
    return (
        <section className="h-screen relative bg-[#030508]">

            <div className="fixed inset-0 z-100 crt-overlay pointer-events-none"></div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* */}
                <div className="laser-line top-1/4 opacity-20 blur-sm"></div>
                <div className="laser-line-pink top-3/4 opacity-20 blur-sm"></div>

                {/* */}
                <div className="absolute inset-0 opacity-10 font-mono text-[10px] overflow-hidden leading-none select-none">
                    01001001 01001110 01001110 01001111 01010110 01000001 01010100 01000101 01000110 01000101 01010011 01010100 00100000 00110010 00110110
                    <br />404_ERROR_SECTOR_NOT_FOUND_SIGNAL_LOST_404_ERROR_SECTOR_NOT_FOUND_SIGNAL_LOST_404_ERROR_SECTOR_NOT_FOUND_SIGNAL_LOST
                    <br />01001001 01001110 01001110 01001111 01010110 01000001 01010100 01000101 01000110 01000101 01010011 01010100 00100000 00110010 00110110
                    <br />404_ERROR_SECTOR_NOT_FOUND_SIGNAL_LOST_404_ERROR_SECTOR_NOT_FOUND_SIGNAL_LOST_404_ERROR_SECTOR_NOT_FOUND_SIGNAL_LOST
                </div>
            </div>

            {/* */}
            <section className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">

                {/* */}
                <div className="absolute top-[20%] left-[15%] hidden lg:block border border-primary/20 bg-primary/5 p-4 backdrop-blur-xl -rotate-3">
                    <div className="font-mono text-[10px] text-primary mb-2 border-b border-primary/30 pb-1 flex justify-between">
                        <span>SUB_PROCESS_X01</span>
                        <span className="material-symbols-outlined text-[10px]">terminal</span>
                    </div>
                    <div className="w-32 h-1 bg-primary/20 mb-1">
                        <div className="w-[65%] h-full bg-primary shadow-[0_0_5px_#00f3ff]"></div>
                    </div>
                    <div className="font-mono text-[8px] text-primary/40 text-left">
                        LOCATING SECTOR...<br />
                        TRACING_ENCRYPTION...<br />
                        FAIL_CODE: 0x000404
                    </div>
                </div>

                <div className="absolute bottom-[25%] right-[10%] hidden lg:block border border-neon-pink/20 bg-neon-pink/5 p-4 backdrop-blur-xl rotate-[5deg]">
                    <div className="font-mono text-[10px] text-neon-pink mb-2 border-b border-neon-pink/30 pb-1">
                        ENCRYPTION_LAYER_6
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                        <div className="w-4 h-4 bg-neon-pink/40"></div>
                        <div className="w-4 h-4 bg-neon-pink"></div>
                        <div className="w-4 h-4 bg-neon-pink/20"></div>
                        <div className="w-4 h-4 bg-neon-pink/60"></div>
                    </div>
                </div>

                {/* */}
                <div className="relative group">
                    <h1 className="text-[12rem] md:text-[20rem] font-black font-headline leading-none tracking-tighter text-on-background/10 glitch-cyan select-none">
                        404
                    </h1>
                    <h1 className="absolute inset-0 flex items-center justify-center text-[11.8rem] md:text-[19.8rem] font-black font-headline leading-none tracking-tighter text-primary group-hover:text-secondary transition-colors duration-300 pointer-events-none drop-shadow-[0_0_25px_rgba(0,243,255,0.5)]">
                        404
                    </h1>
                </div>

                {/* */}
                <div className="max-w-2xl -mt-10 md:-mt-20 z-20">
                    <div className="inline-block px-4 py-1 bg-(--neon-pink) text-black font-mono font-bold text-sm mb-6 tracking-tighter">
                        ERROR: SIGNAL_LOST // ACCESS_DENIED
                    </div>
                    <p className="font-mono text-(--neon-yellow) text-lg md:text-xl tracking-wide uppercase mb-8 drop-shadow-[0_0_8px_rgba(255,238,0,0.5)]">
                        The sector you are looking for has been purged or moved to a different coordinate.
                    </p>
                </div>

                {/* */}
                <div className="mt-4 group">
                    <button className="relative px-12 py-4 bg-background border-2 border-primary overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] active:scale-95"
                        onClick={() => {
                            window.location.replace("https://innovatearena.vercel.app")
                        }}
                    >
                        {/* */}
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        {/* */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-secondary"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-secondary"></div>

                        <div className="flex items-center gap-3 relative z-10"

                        >
                            <span className="material-symbols-outlined text-primary group-hover:text-secondary transition-colors">sync_alt</span>
                            <span className="font-mono font-bold text-primary tracking-[0.2em] uppercase">REBOOT_CONNECTION</span>
                        </div>
                    </button>
                    <div className="mt-4 font-mono text-[10px] text-on-background/40 tracking-widest uppercase">
                        REDIRECTING TO: SYSTEM_ROOT // HOME
                    </div>
                </div>
            </section>

            {/* */}
            <div className="fixed top-[15%] right-[5%] w-64 h-64 opacity-20 pointer-events-none hidden xl:block">
                <img alt="Cyberpunk high-tech circuitry"
                    className="w-full h-full object-cover border-2 border-primary grayscale contrast-200"
                    data-alt="Close-up of futuristic green circuit board with glowing data lines and technical digital overlays in a dark setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMBtwIRPT1EqD6Zia3Ok2QR6U7gAz0GBiOuz_wPAcIspgzmePGyHoe1PXJz2hF_BInlzu-Z1wtY_abvC9uaDfecCaovAy3V-4Abcai_Jii8b5y_bHjq2XArXCWOL_hUi1I8_mDS1af64W0Gb1MCLcC7FwiMjFdLimyV3O9k2ioZj4u_1MmeSwRREwTBatkwlqBkouoZeI4bwZZu7HLc5HSgd_BZ_kEx3rlE-43xRS2WFigVC16-GJHGToP5o5ay10ZkaP37AvNvpz9"
                />
            </div>

            <div className="fixed bottom-[15%] left-[5%] w-48 h-80 opacity-20 pointer-events-none hidden xl:block">
                <img alt="Abstract neon digital distortion"
                    className="w-full h-full object-cover border-2 border-secondary grayscale contrast-150"
                    data-alt="Abstract digital glitch pattern with vertical lines and chromatic aberration in neon pink and deep black space"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv0yaXRfSkM5W4HH5WDk3CxL-yuHSXkSrIDFAZkKC8XGvLfd11L7N2wG0lD16ovIWuBwiThw5ULKrK9dfTuSPBLSiqrnpJSK9dway5wmAKGWxiXfXWgzbyTODsl3COL5aMAqoa---hpLhnt5Be-s6KGyboMDLoZr9mT_H3hdagY_kig1KIz5mM58gdDbWtyC8ddnSc_MfTAAea3FUJMvFCiDEBlphAr9x-q2AhvHCccTfnE9ONWPJ4lZO3A5imySfjn1PDW5lrfn3b"
                />
            </div>
        </section>
    );
}