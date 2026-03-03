import React, { useEffect, useState } from "react";
import { useUserDetailsStore } from "../../stores";
import { useUserDataIO } from "../../hooks";

export default function ScheduleCard({
    time_prop = "",
    title_prop = "",
    id_prop = null,
}) {
    const { userType } = useUserDetailsStore();
    const [modification, setModification] = useState(false);

    const [time, setTime] = useState(time_prop);
    const [title, setTitle] = useState(title_prop);
    const [id, setId] = useState(id_prop);
    // const BACKEND_API = import.meta.env.VITE_BACKEND_API;

    const { deleteSchedule, updateSchedule } = useUserDataIO();

    // Sync state if parent props change
    useEffect(() => {
        setTime(time_prop);
        setTitle(title_prop);
        setId(id_prop);
    }, [time_prop, title_prop, id_prop]);

    const handleCancel = () => {
        setTime(time_prop);
        setTitle(title_prop);
        setModification(false);
    };

    const handelDelete = async () => {
        await deleteSchedule(id);
        setModification(false);
    }

    const handelSave = async () => {
        await updateSchedule(title, time, id)
        setModification(false);
    }



    return (
        <div className="flex items-center justify-between p-3 rounded bg-slate-900/40 border border-slate-800 hover:border-neon-cyan/50 transition-all group/item">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">

                {modification ? (
                    <input
                        type="text"
                        className="text-neon-cyan font-bold px-2 py-1 border-none outline-none bg-transparent"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                ) : (
                    <div className="text-neon-cyan font-bold">{time}</div>
                )}

                <div className="h-4 w-px bg-slate-700 hidden md:inline"></div>

                {modification ? (
                    <input
                        type="text"
                        className="text-slate-300 px-2 py-1 border-none outline-none bg-transparent"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <div className="text-slate-300">{title}</div>
                )}
            </div>

            {userType == "root" && (
                <div className="flex flex-col md:flex-row gap-2 opacity-50 group-hover/item:opacity-100 transition-opacity">
                    {!modification ? (
                        <>
                            <button
                                className="px-2 py-1 border border-slate-700 hover:border-neon-cyan text-slate-400 hover:text-neon-cyan uppercase text-[10px]"
                                onClick={() => setModification(true)}
                            >
                                MODIFY
                            </button>

                            <button
                                className="px-2 py-1 border border-slate-700 hover:border-neon-pink text-slate-400 hover:text-neon-pink uppercase text-[10px]"
                                onClick={handelDelete}
                            >
                                DELETE
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="px-2 py-1 border border-slate-700 hover:border-neon-cyan text-slate-400 hover:text-neon-cyan uppercase text-[10px]"
                                onClick={handelSave}
                            >
                                SAVE
                            </button>

                            <button
                                className="px-2 py-1 border border-slate-700 hover:border-neon-pink text-slate-400 hover:text-neon-pink uppercase text-[10px]"
                                onClick={handleCancel}
                            >
                                CANCEL
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}