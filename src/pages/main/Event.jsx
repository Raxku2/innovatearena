import React from 'react'
import { useEventDetailsStore, useUserDetailsStore } from '../../stores'

export default function Event() {
    const { userId, userName, pos, judgement, rejected } = useEventDetailsStore();
    const { certificate_release } = useUserDetailsStore();

    return (

        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">

                here i put all event details
            </div>
        </div>
    )
}

