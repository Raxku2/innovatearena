import React from 'react'
import { useEventDetailsStore, useUserDetailsStore } from '../../stores';
import { useUserDataIO } from '../../hooks';

export default function AttendenceCard() {
    const {
        attendence_process_status,
        project_submit_process_status,
        peymentStatus, registrationStatus,
    } = useEventDetailsStore();
    const { attendence, setAttendence } = useUserDetailsStore();
    const { markAttend } = useUserDataIO();

    return (
        <div className="col-span-1 md:col-span-7 glass-panel border-t-2 border-neon-green rounded-xl p-6 relative group hover:bg-neon-green/5 transition-colors duration-500" hidden={!(attendence_process_status && registrationStatus && peymentStatus)}  >
            <div className="absolute top-2 right-2 text-neon-green/20 group-hover:text-neon-green/50 transition-colors">
                <span className="material-symbols-outlined text-4xl">how_to_reg</span>
            </div>
            <h3 className="text-neon-green font-mono font-bold text-sm tracking-wider mb-6 border-b border-neon-green/20 pb-2">ATTENDANCE_PROTOCOL</h3>
            <div className="flex flex-col items-center justify-center py-4 space-y-4 " hidden={attendence} >
                <div className="w-16 h-16 rounded-full border-2 border-neon-green/30 flex items-center justify-center animate-pulse">
                    <span className="material-symbols-outlined text-neon-green text-3xl">location_on</span>
                </div>
                <div className="text-center">
                    <p className="text-xs font-mono text-slate-400 mb-4">CURRENT_STATUS: <span className="text-neon-yellow">AWAITING_SIGNAL</span></p>
                    <button className="px-8 py-3 bg-neon-green/10 hover:bg-neon-green text-neon-green hover:text-black border border-neon-green font-display font-bold text-xs uppercase transition-all shadow-[0_0_15px_rgba(0,255,157,0.2)] hover:shadow-[0_0_25px_rgba(0,255,157,0.5)]"

                        onClick={markAttend}
                    >
                        MARK_ATTENDANCE
                    </button>
                </div>
            </div>

            {/* <!-- Success State (Hidden by default or for dynamic toggling) --> */}
            <div className=" absolute inset-0 bg-surface-hacker/95 flex flex-col items-center justify-center z-20 rounded-xl" hidden={!attendence}>
                <span className="material-symbols-outlined text-neon-green text-5xl mb-2">check_circle</span>
                <h4 className="text-white font-display font-bold">STATUS: PRESENT</h4>
                <p className="text-[10px] font-mono text-neon-green">TIMESTAMP: 2026-03-24_10:15:00</p>
            </div>
        </div>
    )
}
