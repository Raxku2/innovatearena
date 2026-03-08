import React from 'react'
import { useUserDetailsStore } from '../../stores';
import { useUserDataIO } from '../../hooks';

export default function AdminIdCard({ email }) {
    const { userType, super_mode } = useUserDetailsStore();
    const { updateAdminInfo } = useUserDataIO();
    return (
        <div>
            <div className="bg-black/60 border-l-2 border-neon-pink p-3 flex justify-between items-center hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-500 text-sm">terminal</span>
                    <span className="text-white text-sm">{email}</span>
                </div>
                <div className="flex gap-2">

                    <button className="btn-action btn-pink" hidden={!super_mode}
                        onClick={() => {
                            updateAdminInfo(email, "user");
                        }}
                    >REVOKE_KEY</button>
                </div>
            </div>

        </div>
    )
}
