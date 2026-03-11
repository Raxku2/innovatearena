import React from 'react'
import { useEventDetailsStore, useUserDetailsStore } from '../../stores';
import { useUserDataIO } from '../../hooks';

export default function ProjectSubmit() {
    const {
        project_submit_process_status,
    } = useEventDetailsStore();


    const {
        project_title,
        project_deployument,
        project_repo,
        project_id, attendence,
        setProjectTitle,
        setProjectDeployment,
        setProjectRepo
    } = useUserDetailsStore();

    const { submitProject } = useUserDataIO();


    return (
        <div className="col-span-1 md:col-span-5 glass-panel neon-border-cyan rounded-xl p-6 relative group" hidden={!(project_submit_process_status && attendence)} >
            <div className="absolute top-2 right-2 text-neon-cyan/20">
                <span className="material-symbols-outlined text-4xl">cloud_upload</span>
            </div>
            <h3 className="text-neon-cyan font-mono font-bold text-sm tracking-wider mb-6 border-b border-neon-cyan/20 pb-2">PROJECT_SUBMISSION_VAULT</h3>
            <div className="space-y-4 font-mono" hidden={project_id}>
                <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase">Project Title</label>
                    <input className="w-full bg-black/50 border border-slate-700 rounded p-2 text-xs text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all" placeholder="e.g. NEURAL_LINK_V1" type="text" value={project_title} onChange={e => setProjectTitle(e.target.value)} />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase">Live URL</label>
                    <input className="w-full bg-black/50 border border-slate-700 rounded p-2 text-xs text-white focus:border-neon-cyan focus:ring-1 focussetProjectRepo:ring-neon-cyan outline-none transition-all" placeholder="https://deploy.net/..." type="text" value={project_deployument} onChange={e => setProjectDeployment(e.target.value)} />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase">GitHub Repository</label>
                    <input className="w-full bg-black/50 border border-slate-700 rounded p-2 text-xs text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all" placeholder="https://github.com/..." type="text" value={project_repo} onChange={e => setProjectRepo(e.target.value)} />
                </div>
                <button className="w-full mt-2 py-3 bg-neon-cyan text-black font-display font-bold text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)]" onClick={() => {
                    submitProject(project_title, project_deployument, project_repo)
                }}>
                    SUBMIT_PROJECT
                </button>
            </div>


            {/* <!-- Success State Overlay (Hidden) --> */}
            <div className=" absolute inset-0 bg-surface-hacker/95 flex flex-col p-6 z-20 rounded-xl" hidden={project_id == null}>
                <div className="flex items-center gap-2 text-neon-cyan mb-4">
                    <span className="material-symbols-outlined">verified</span>
                    <span className="font-display font-bold text-sm">PROJECT_UPLOAD_COMPLETE</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 space-y-2">
                    <p>NAME: <span className="text-white uppercase">{project_title}</span></p>
                    <p>LIVE: <span className="text-neon-cyan underline">{project_deployument}...</span></p>
                    <p>REPO: <span className="text-neon-cyan underline">{project_repo}...</span></p>
                </div>
            </div>
        </div>
    )
}
