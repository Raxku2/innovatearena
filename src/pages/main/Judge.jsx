import React, { useEffect } from 'react';
import { JudgeAssign, SubmitContainers } from '../../component';
import { useUserDetailsStore } from '../../stores';
import { useNavigate } from 'react-router';

export default function Judge() {
    const { userType, judge_role } = useUserDetailsStore();
    const navigate = useNavigate();

    useEffect(() => {

        if (userType) {
            if (userType == 'root' || judge_role) {
                return
            }else{
                navigate('/');
            }
        }
    }, []);

    return (
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">

                {userType === 'root' && (
                    <div className="col-span-1 md:col-span-7 glass-panel border neon-border-pink rounded-xl p-6 relative overflow-hidden group flex flex-col">
                        <JudgeAssign />
                    </div>
                )}

                {judge_role && (
                    <div className="col-span-1 md:col-span-6 glass-panel border neon-border-cyan rounded-xl relative overflow-hidden group flex flex-col">
                        <SubmitContainers />
                    </div>
                )}

            </div>
        </div>
    );
}