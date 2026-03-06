import React, { useEffect, useState } from 'react'
import { useEventDetailsStore, useUserDetailsStore } from '../../stores';
import AdminIdCard from './AdminIdCard';
import { useUserDataIO } from '../../hooks';

export default function AdminController() {
    const { userType, super_mode } = useUserDetailsStore();
    const { matrix, admins } = useEventDetailsStore();

    const [editingControls, setEditingControls] = useState(false);
    const [users, setUsers] = useState([])
    const [currentId, setCurrentId] = useState('');

    const { getAdminInfo, updateAdminInfo } = useUserDataIO();

    useEffect(() => {
        getAdminInfo();
    }, []);

    useEffect(() => {
        if (matrix) {

            if (matrix.users_email) {
                setUsers(matrix.users_email);
            }
        }
    }, [matrix]);


    const handelMakeAdmin = async () => {
        updateAdminInfo(currentId, 'root');
    }

    return (
        <div>

            <div className="scan-line-anim opacity-10"></div>
            <div className="absolute top-4 right-4 text-neon-pink/20 group-hover:text-neon-pink/40 transition-colors">
                <span className="material-symbols-outlined text-5xl">admin_panel_settings</span>
            </div>
            <div className="flex items-center mb-6 border-b border-neon-pink/20 pb-3 relative z-10">
                <h2 className="text-neon-pink font-display font-bold text-xl tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 bg-neon-pink rounded-full animate-pulse shadow-[0_0_8px_#ff0055]"></span>
                    ADMIN_CONTROL_VAULT
                </h2>
            </div>

            <div className="space-y-3 relative z-10 font-mono">
                {/* <div className="bg-black/60 border-l-2 border-neon-pink p-3 flex justify-between items-center hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-slate-500 text-sm">terminal</span>
                        <span className="text-white text-sm">root@innovate.dev</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="btn-action btn-cyan">MODIFY_PRIVILEGE</button>
                        <button className="btn-action btn-pink">REVOKE_KEY</button>
                    </div>
                </div> */}

                {
                    admins.map((e, i) => {
                        // console.log(e);

                        return (<AdminIdCard key={i} email={e.email} />)
                    })
                }


                <button className="mt-6 w-full py-3 border border-dashed border-slate-600 hover:border-neon-pink text-slate-500 hover:text-neon-pink text-xs font-mono uppercase transition-all flex items-center justify-center gap-2 group/btn" hidden={!(userType == 'root' && super_mode)}
                    onClick={() => {
                        setEditingControls(true);
                    }}>
                    <span className="material-symbols-outlined text-sm group-hover/btn:rotate-90 transition-transform">add</span>
                    INITIALIZE_ADMIN
                </button>
            </div>



            <div hidden={!super_mode}>

                <div className=" inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-8 text-center space-y-6 absolute transition-opacity duration-300" hidden={!editingControls}

                >

                    <h4 className="text-white font-display font-bold text-lg tracking-widest text-neon-pink">ADD_ADMIN</h4>
                    <div className="w-full max-w-xs text-left">
                        <label className="text-[10px] text-slate-500 font-mono mb-1 block"

                        >ADMIN_EMAIL</label>
                        {/* <input className="w-full bg-slate-900 border border-neon-pink/50 text-white font-mono text-sm px-4 py-2 focus:ring-1 focus:ring-neon-pink outline-none" type="text"   /> */}
                        <select
                            className="w-full bg-slate-900 border border-neon-pink/50 text-white 
                            font-mono text-sm px-4 py-2 focus:ring-1 focus:ring-neon-pink outline-none"
                            onChange={e => setCurrentId(e.target.value)}
                            // value={currentId}
                            defaultValue={"422"}
                        >
                            <option value="422" disabled > {"> SELECT ID"}</option>
                            {
                                users.map((e, i) => {
                                    return (
                                        <option key={i} value={e} > {e}</option>
                                    )
                                })
                            }

                        </select>

                    </div>
                    <div className="flex flex-wrap justify-center gap-3 w-full">
                        <button className="flex-1 min-w-30 px-4 py-2 border border-neon-green/50 text-neon-green font-mono text-xs uppercase hover:bg-neon-green/10 transition-colors shadow-[0_0_10px_rgba(0,255,157,0.2)] hover:shadow-[0_0_15px_rgba(0,255,157,0.4)]"
                            onClick={() => {
                                setEditingControls(false);
                                handelMakeAdmin();
                            }}
                        >INSERT_CHANGES</button>

                        <button className="flex-1 min-w-30 px-4 py-2 border border-slate-600 text-slate-400 font-mono text-xs uppercase hover:bg-slate-800 transition-colors"
                            onClick={() => {

                                setEditingControls(false);
                            }}
                        >DISCARD_DATA</button>

                    </div>
                </div>
            </div>
        </div>
    )
}
