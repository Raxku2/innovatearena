import React, { useEffect, useState } from 'react'
import { useJudges } from '../../hooks';

export default function JudgeCard({ id_obj }) {
    const [judgeEmailId, setJudgeEmailId] = useState("");
    const { makeJudge, removeJudge, loadAllJudges } = useJudges();

    useEffect(() => {
        if (id_obj) {
            setJudgeEmailId(id_obj.email)
            // console.log(id_obj);


        }
    }, [id_obj])

    return (
        <div
            className="bg-black/60 border-l-2 border-neon-pink p-3 flex justify-between items-center hover:bg-white/5 transition-colors">

            <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-500 text-sm">terminal</span>
                <span className="text-white text-sm">{judgeEmailId}</span>
            </div>
            <div className="flex gap-2">
                {/* <button className="btn-action btn-cyan">MODIFY_PRIVILEGE</button> */}
                <button className="btn-action btn-pink"
                    onClick={() => {
                        removeJudge(judgeEmailId)
                    }}
                >REVOKE_KEY</button>
            </div>
        </div>
    )
}
