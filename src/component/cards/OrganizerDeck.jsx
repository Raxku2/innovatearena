import React, { useEffect, useState } from 'react'
import { useEventDetailsStore, useUserDetailsStore } from '../../stores';
import { useUserDataIO } from '../../hooks';
import OrganizerTiles from './OrganizerTiles';

export default function OrganizerDeck() {
    const { userType } = useUserDetailsStore();
    const { eventOrganizers } = useEventDetailsStore();
    const { createOrganizer } = useUserDataIO();

    const [organizerAddPrompt, setOrganizerAddPrompt] = useState(false);
    const [organizerName, setOrganizerName] = useState('');
    const [organizerRole, setOrganizerRole] = useState('');
    const [organizerDp, setOrganizerDp] = useState('');


    // useEffect(() => {
        // console.log(eventOrganizers);
    // }, [eventOrganizers])




    return (
        <div>

            <div className="scan-line-anim opacity-10"></div>
            <div className="absolute top-4 right-4 text-neon-cyan/20 group-hover:text-neon-cyan/40 transition-colors">
                <span className="material-symbols-outlined text-5xl">groups</span>
            </div>
            <div className="flex justify-between items-center mb-6 border-b border-neon-cyan/20 pb-3 relative z-10">
                <h2 className="text-neon-cyan font-display font-bold text-xl tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse shadow-[0_0_8px_#00f3ff]"></span>
                    ORGANIZER_DECK
                </h2>
                {/* <button className="btn-action btn-cyan flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">add</span> ADD_NEW
                </button> */}
            </div>
            <div className="space-y-4 relative z-10">


                {/* <div className="bg-black/40 border border-slate-800 hover:border-neon-cyan/50 rounded-lg p-4 flex items-center gap-4 transition-all">
                    <div className="relative w-12 h-12 rounded-full border border-slate-600 overflow-hidden">
                        <img alt="Profile" className="w-full h-full object-cover grayscale " src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt6OizRft2aLnC_4-5MzkLMngYlCGnczqJ5lIgMTYQfY-kALVTygBFHwgFsXdN55ULPMXDzU7GO5rxCVdIgKEKTB6yjdI-U3UiPo25_UDWoxGzxxwjJK6ca7QKh5Av7YVN-C5mpXtkwPXkvIs1eGDofXJuCkV7Mqjas08Hxw70h_knrSajlJy_iC_N7AFXzjS2_mzs7y2zs-pbCgN7SCZByEu9V9a8aY1Yan7bea8FoNkhfDX8rRwKjxDRfZ1RN8ssE9rg3S6DxRmT" />
                        <div className="absolute inset-0 bg-neon-cyan/20 animate-laser border-b-2 border-neon-cyan mix-blend-overlay"></div>
                    </div>
                    <div className="flex-1 font-mono">
                        <div className="text-white font-bold text-sm tracking-wide">ALEX_MERCER</div>
                        <div className="text-neon-yellow text-xs opacity-80">Lead_Architect</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button className="btn-action btn-cyan py-1 px-2 text-[10px]">EDIT_PROFILE</button>
                        <button className="btn-action btn-pink py-1 px-2 text-[10px]">TERMINATE_ACCESS</button>
                    </div>
                </div> */}



                {
                    eventOrganizers.map((e, i) => {

                        return (
                            <OrganizerTiles key={i} name={e.name} role={e.role} id={e.id} dp={e.dp} />
                        )

                    })
                }


                <button className="mt-6 w-full py-3 border border-dashed border-slate-600 hover:border-neon-cyan text-slate-500 hover:text-neon-cyan text-xs font-mono uppercase transition-all flex items-center justify-center gap-2 group/btn"
                    onClick={e => setOrganizerAddPrompt(true)}
                    hidden={!(userType == 'root')}
                >
                    <span className="material-symbols-outlined text-sm group-hover/btn:rotate-90 transition-transform">add</span>
                    INITIALIZE_ORGANIZER
                </button>

            </div>


            <div hidden={!(userType == 'root')}>

                <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-8 text-center space-y-6" hidden={!organizerAddPrompt}>

                    <h4 className="text-white font-display font-bold text-xl tracking-widest text-neon-cyan">CREATE_ORGANIZER</h4>

                    <input className="bg-slate-900 border border-neon-cyan/50 text-white font-mono text-sm px-4 py-2 w-full max-w-xs focus:ring-1 focus:ring-neon-cyan outline-none" type="text" value={organizerName} onChange={e => setOrganizerName(e.target.value)} placeholder='> NAME ?'

                    />

                    <input className="bg-slate-900 border border-neon-cyan/50 text-white font-mono text-sm px-4 py-2 w-full max-w-xs focus:ring-1 focus:ring-neon-cyan outline-none" type="text" value={organizerRole} onChange={e => setOrganizerRole(e.target.value)} placeholder='> ROLE ?'

                    />

                    <input className="bg-slate-900 border border-neon-cyan/50 text-white font-mono text-sm px-4 py-2 w-full max-w-xs focus:ring-1 focus:ring-neon-cyan outline-none" type="text" value={organizerDp} onChange={e => setOrganizerDp(e.target.value)} placeholder='> DP ?'

                    />

                    <div className="flex gap-4">

                        <button className="px-4 py-2 border border-neon-green/50 text-neon-green font-mono text-xs uppercase hover:bg-neon-green/10 transition-colors"
                            onClick={async () => {
                                createOrganizer(organizerName, organizerRole, organizerDp)

                                setOrganizerAddPrompt(false)
                            }}

                        >ADD_ORGANIZER</button>

                        <button className="px-4 py-2 border border-slate-600 text-slate-400 font-mono text-xs uppercase hover:bg-slate-800 transition-colors"
                            onClick={e => setOrganizerAddPrompt(false)}
                        >DISCARD_DATA</button>

                    </div>
                </div>
            </div>

        </div>
    )
}
