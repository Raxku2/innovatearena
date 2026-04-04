import React from 'react'
import { JudgeAssign, SubmitContainers } from '../../component'
import { useUserDetailsStore } from '../../stores';

export default function Judge() {
    const { userType, super_mode } = useUserDetailsStore();
    return (


        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">

                <div className="col-span-1 md:col-span-7 glass-panel border neon-border-pink rounded-xl p-6 relative overflow-hidden group flex flex-col" hidden={!(userType == 'root')}>
                    <JudgeAssign />
                </div>

                <div className="col-span-1 md:col-span-7 glass-panel border neon-border-cyan rounded-xl relative overflow-hidden group flex flex-col" hidden={!(userType == 'root')}>
            <SubmitContainers />
                </div>


            </div>

        </div>
    )
}
