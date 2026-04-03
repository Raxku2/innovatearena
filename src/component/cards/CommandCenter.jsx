import React from 'react'
import { useAdminControls, useUserDataIO } from '../../hooks';
import { useEventDetailsStore } from '../../stores';

export default function CommandCenter() {

    const { giveRecods } = useAdminControls();

    const {
        enableLoadingBar, disableLoadingBar,
        registration_process_status,
        attendence_process_status,
        project_submit_process_status,
    } = useEventDetailsStore();

    const { downloadRegCsv, toggleRegistrationProcess, toggleAttendProcess, toggleSubmitProcess } = useUserDataIO();

    return (
        <div className="glass-panel border-t-2 border-neon-cyan rounded-xl p-6">
            <h3 className="text-white font-mono font-bold text-xs uppercase mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-neon-cyan">terminal</span> Command_Line
            </h3>
            <div className="space-y-3">


                <button className="w-full py-2 bg-slate-800 hover:bg-neon-pink/10 border border-slate-600 hover:border-neon-pink text-slate-300 hover:text-white text-xs font-mono transition-all flex items-center px-4"

                    onClick={async () => {
                        enableLoadingBar()
                        await giveRecods();
                        disableLoadingBar();
                    }}
                >
                    <span className="mr-auto">&gt; RESET_NODE_CACHE</span>
                    <span className="material-symbols-outlined text-xs">restart_alt</span>
                </button>


                <button className="w-full py-2 bg-slate-800 hover:bg-neon-pink/10 border border-slate-600 hover:border-neon-pink text-slate-300 hover:text-white text-xs font-mono transition-all flex items-center px-4"

                    onClick={async () => {
                        downloadRegCsv();
                    }}
                >
                    <span className="mr-auto">&gt; EXPORT_CSV_LOGS</span>
                    <span className="material-symbols-outlined text-xs">download</span>
                </button>


                <button className="w-full py-2 bg-slate-800 hover:bg-neon-pink/10 border border-slate-600 hover:border-neon-pink text-slate-300 hover:text-white text-xs font-mono transition-all flex items-center px-4"

                    onClick={async () => {
                        toggleRegistrationProcess(!registration_process_status);
                    }}
                >
                    <span className="mr-auto" hidden={registration_process_status}>&gt; UP_REGISTRATION_NODE</span>
                    <span className="mr-auto" hidden={!registration_process_status}>&gt; DOWN_REGISTRATION_NODE</span>

                    <span className="material-symbols-outlined text-xs" hidden={!registration_process_status}>toggle_on</span>
                    <span className="material-symbols-outlined text-xs" hidden={registration_process_status}>toggle_off</span>
                </button>


                <button className="w-full py-2 bg-slate-800 hover:bg-neon-pink/10 border border-slate-600 hover:border-neon-pink text-slate-300 hover:text-white text-xs font-mono transition-all flex items-center px-4"
                    onClick={async () => {
                        toggleAttendProcess(!attendence_process_status);
                    }}
                >
                    <span className="mr-auto" hidden={attendence_process_status}>&gt; UP_ATTENDANCE_NODE</span>
                    <span className="mr-auto" hidden={!attendence_process_status}>&gt; DOWN_ATTENDANCE_NODE</span>

                    <span className="material-symbols-outlined text-xs" hidden={!attendence_process_status}>toggle_on</span>
                    <span className="material-symbols-outlined text-xs" hidden={attendence_process_status}>toggle_off</span>
                </button>


                <button className="w-full py-2 bg-slate-800 hover:bg-neon-pink/10 border border-slate-600 hover:border-neon-pink text-slate-300 hover:text-white text-xs font-mono transition-all flex items-center px-4"
                    onClick={async () => {
                        toggleSubmitProcess(!project_submit_process_status)
                    }}
                >
                    <span className="mr-auto" hidden={project_submit_process_status}>&gt; UP_SUBMISSION_NODE</span>
                    <span className="mr-auto" hidden={!project_submit_process_status}>&gt; DOWN_SUBMISSION_NODE</span>
                    <span className="material-symbols-outlined text-xs" hidden={!project_submit_process_status}>toggle_on</span>
                    <span className="material-symbols-outlined text-xs" hidden={project_submit_process_status}>toggle_off</span>
                </button>


                {/* <button className="w-full py-2 bg-slate-800 hover:bg-neon-yellow/10 border border-slate-600 hover:border-neon-yellow text-slate-300 hover:text-white text-xs font-mono transition-all flex items-center px-4">
                    <span className="mr-auto">&gt; BROADCAST_ALERT</span>
                    <span className="material-symbols-outlined text-xs">campaign</span>
                </button> */}
            </div>
        </div>
    )
}
