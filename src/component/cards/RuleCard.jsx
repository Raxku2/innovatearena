import React, { useEffect, useState } from 'react'
import { useUserDetailsStore } from '../../stores';
import { useUserDataIO } from '../../hooks';

export default function RuleCard({ title_prop, index_prop, id_prop }) {

    const { userType } = useUserDetailsStore();
    const [modification, setModification] = useState(false);
    const [title, setTitle] = useState('title_prop');
    const [id, setId] = useState('id_prop');
    const [index, setIndex] = useState('');
    const { updateRule, deleteRule } = useUserDataIO();

    useEffect(() => {
        setTitle(title_prop);
        setId(id_prop);
        setIndex(index_prop + 1)
    }, [index_prop, title_prop, id_prop]);


    function formatNumber(num) {
        return String(num).padStart(2, "0");
    }

    return (
        <div className="flex items-center gap-3 p-2 hover:bg-white/5 cursor-pointer rounded transition-colors group/rule">
            <span className="text-neon-pink font-bold opacity-70">{formatNumber(index)}</span>

            <input type="text"
                className="text-slate-300 flex-1 outline-none border-none bg-transparent"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder='> '
                disabled={!modification}
                hidden={!modification}

            />
            <span className="text-slate-300 flex-1"
                hidden={modification}

            >PROTOCOL: {title}</span>

            <div className=' flex flex-col md:flex-row' hidden={!(userType == 'root')}>

                <button className="material-symbols-outlined text-[10px] text-slate-600 group-hover/rule:text-neon-cyan transition-colors m-2"
                    onClick={e => setModification(true)}
                    hidden={modification}
                >edit</button>

                <button className="material-symbols-outlined text-[10px] text-slate-600 group-hover/rule:text-neon-cyan transition-colors m-2"
                    onClick={async () => {
                        updateRule(title, id);
                        setModification(false)
                    }
                    }
                    hidden={!modification}
                >save_as</button>

                <button className="material-symbols-outlined text-[10px] text-slate-600 group-hover/rule:text-neon-cyan transition-colors m-2"
                    onClick={async () => {
                        deleteRule(id)
                        setModification(false);
                    }
                    }
                    hidden={!modification}
                >delete_forever</button>
            </div>
        </div>
    )
}
