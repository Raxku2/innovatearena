import React, { useState, useEffect } from 'react';
import { useUserDataIO } from '../../hooks';
import { useUserDetailsStore } from '../../stores';

export default function OrganizerTiles({ name, id, role, dp }) {
    const [editingControls, setEditingControls] = useState(false);

    // Local state for editing
    const [organizerName, setOrganizerName] = useState(name);
    const [organizerRole, setOrganizerRole] = useState(role);
    const [organizerDp, setOrganizerDp] = useState(dp);

    const { updateOrganizer, deleteOrganizer } = useUserDataIO();
    const { userType, super_mode } = useUserDetailsStore();

    // Sync local state if parent props change
    useEffect(() => {
        setOrganizerName(name);
        setOrganizerRole(role);
        setOrganizerDp(dp);
    }, [name, role, dp]);

    const handleSave = () => {
        updateOrganizer(organizerName, id, organizerDp, organizerRole);
        setEditingControls(false);
    };

    const handleDiscard = () => {
        // Reset local state back to original props
        setOrganizerName(name);
        setOrganizerRole(role);
        setOrganizerDp(dp);
        setEditingControls(false);
    };

    return (
        <div className="bg-black/40 border border-slate-800 hover:border-neon-cyan/50 rounded-lg p-4 flex items-center justify-between gap-4 transition-all">
            <div className="flex items-center gap-4 w-full">

                {/* CONDITIONAL RENDERING: Edit Mode vs View Mode */}
                {editingControls ? (
                    <div className="flex flex-col font-mono w-full">
                        <input type="text" className="text-white font-bold text-sm h-3.5 tracking-wide w-full bg-transparent border-none outline-none mb-2" placeholder="> name ?" value={organizerName} onChange={e => setOrganizerName(e.target.value)} />
                        <input type="text" className="text-white font-bold text-sm h-3.5 tracking-wide w-full bg-transparent border-none outline-none mb-2" placeholder="> role ?" value={organizerRole} onChange={e => setOrganizerRole(e.target.value)} />
                        <input type="text" className="text-white font-bold text-sm h-3.5 tracking-wide w-full bg-transparent border-none outline-none" placeholder="> dp ?" value={organizerDp} onChange={e => setOrganizerDp(e.target.value)} />
                    </div>
                ) : (
                    <>
                        <div className="relative w-12 h-12 rounded-full border border-slate-600 overflow-hidden shrink-0">
                            <img alt="Profile" className="w-full h-full object-cover grayscale mix-blend-luminosity" src={organizerDp} />
                            <div className="absolute inset-0 bg-neon-cyan/20 animate-laser border-b-2 border-neon-cyan mix-blend-overlay" style={{ animationDelay: '1s' }}></div>
                        </div>
                        <div className="flex-1 font-mono">
                            <div className="text-white font-bold text-sm tracking-wide">{organizerName}</div>
                            <div className="text-neon-green text-xs opacity-80">{organizerRole}</div>
                        </div>
                    </>
                )}
            </div>

            <div className="flex flex-col flex-wrap items-end gap-2 shrink-0" hidden={!(userType == 'root')}>
                {/* CONDITIONAL RENDERING: Buttons */}
                {editingControls ? (
                    <>
                        <button className="btn-action btn-cyan py-1 px-2 text-[10px]" onClick={handleSave}>
                            SAVE
                        </button>
                        <button className="btn-action btn-cyan py-1 px-2 text-[10px]" onClick={handleDiscard}>
                            DISCARD
                        </button>
                    </>
                ) : (
                    <>
                        <button className="btn-action btn-cyan py-1 px-2 text-[10px]" onClick={() => setEditingControls(true)}>
                            EDIT_PROFILE
                        </button>
                        <button className="btn-action btn-pink py-1 px-2 text-[10px]" onClick={() => deleteOrganizer(id)}>
                            DISMISS
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}