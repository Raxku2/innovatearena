import React, { useEffect, useState } from 'react'
import { useUserDataIO } from '../../hooks';
import { useEventDetailsStore, useUserDetailsStore } from '../../stores';

export default function Radar() {
    const { attendanceCounter } = useUserDataIO();
    const { attendence_process_status, attendanceCount } = useEventDetailsStore();

    const {
        userType
    } = useUserDetailsStore();

    useEffect(() => {
        attendanceCounter();
    }, [userType, attendence_process_status]);

    const [batch2026, setBatch2026] = useState(0);
    const [batch2027, setBatch2027] = useState(0);
    const [batch2028, setBatch2028] = useState(0);
    const [batch2029, setBatch2029] = useState(0);
    const [batch2030, setBatch2030] = useState(0);

    // State to hold the dynamically generated radar blips
    const [blips, setBlips] = useState([]);

    useEffect(() => {
        if (attendanceCount) {
            // Safety fallbacks added to prevent undefined errors
            setBatch2026(attendanceCount['2026'] || 0);
            setBatch2027(attendanceCount['2027'] || 0);
            setBatch2028(attendanceCount['2028'] || 0);
            setBatch2029(attendanceCount['2029'] || 0);
            setBatch2030(attendanceCount['2030'] || 0);
        }
    }, [attendanceCount]);

    // Generate random positions for each attendee within the radar circle
    useEffect(() => {
        const totalAttendance = batch2026 + batch2027 + batch2028 + batch2029 + batch2030;

        const newBlips = Array.from({ length: totalAttendance }).map((_, index) => {
            // Math to keep the dots evenly distributed inside a circular boundary
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.sqrt(Math.random()) * 45; // Max 45% radius so they stay inside the radar

            return {
                id: index,
                top: `${50 + radius * Math.sin(angle)}%`,
                left: `${50 + radius * Math.cos(angle)}%`,
                animationDelay: `${Math.random() * 2}s` // Randomize the pulsing start time
            };
        });

        setBlips(newBlips);
    }, [batch2026, batch2027, batch2028, batch2029, batch2030]);


    return (
        <div className="glass-panel neon-border-red rounded-xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-75">

            <div className="absolute top-0 right-0 p-3 opacity-50">
                <span className="material-symbols-outlined text-neon-red">radar</span>
            </div>

            <h3 className="text-white font-display font-bold text-sm tracking-widest absolute top-6 left-6">COHORT_RADAR</h3>
            <div className="relative w-48 h-48 mt-4 flex items-center justify-center">

                <div className="absolute inset-0 border border-slate-700 rounded-full opacity-30"></div>
                <div className="absolute inset-4 border border-slate-700 rounded-full opacity-40"></div>
                <div className="absolute inset-8 border border-slate-700 rounded-full opacity-50"></div>
                <div className="absolute inset-12 border border-slate-600 rounded-full opacity-60"></div>
                <div className="absolute w-full h-px bg-slate-800 top-1/2 left-0 transform -translate-y-1/2"></div>
                <div className="absolute h-full w-px bg-slate-800 top-0 left-1/2 transform -translate-x-1/2"></div>
                <div className="absolute h-full w-px bg-slate-800 top-0 left-1/2 transform -translate-x-1/2 rotate-45"></div>
                <div className="absolute h-full w-px bg-slate-800 top-0 left-1/2 transform -translate-x-1/2 -rotate-45"></div>

                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_10px_rgba(255,51,51,0.5)]" viewBox="0 0 100 100">
                    <polygon fill="rgba(255, 51, 51, 0.2)" points="50,15 80,40 70,80 30,80 20,40" stroke="#ff3333" strokeWidth="1.5"></polygon>
                </svg>

                {/* Map over the blips array to render every student's point */}
                {blips.map((blip) => (
                    <div
                        key={blip.id}
                        className='h-2 w-2 rounded-full bg-red-500 absolute animate-pulse'
                        style={{
                            top: blip.top,
                            left: blip.left,
                            transform: 'translate(-50%, -50%)', // Center the blip exactly on its coordinates
                            animationDelay: blip.animationDelay // Stagger the pulsing effects
                        }}
                    ></div>
                ))}

                <div className="absolute top-1/2 left-1/2 w-[50%] h-1  origin-left animate-spin-slow" style={{
                    background: 'linear-gradient(to right, transparent, #ff3333)'
                }}> </div>
            </div>


            <div className="mt-6 w-full grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-500 uppercase text-center">
                <div className="p-1 border border-slate-800 rounded bg-slate-900/50">Alpha '26: {batch2026}</div>
                <div className="p-1 border border-slate-800 rounded bg-slate-900/50">Beta: '27: {batch2027}</div>
                <div className="p-1 border border-slate-800 rounded bg-slate-900/50">Gamma: '28: {batch2028}</div>
                <div className="p-1 border border-slate-800 rounded bg-slate-900/50">Delta: '29: {batch2029}</div>
                <div className="p-1 border border-slate-800 rounded col-span-2 bg-slate-900/50">Epsilon: '30: {batch2030}</div>
            </div>
        </div>
    )
}