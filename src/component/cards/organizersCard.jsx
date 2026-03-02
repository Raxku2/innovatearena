import React from 'react'

export default function OrganizersCard({ name, role, dp }) {
    return (
        <div className="group relative cursor-pointer">
            <div className="aspect-square rounded-lg overflow-hidden border border-slate-800 group-hover:border-(--neon-cyan) transition-colors bg-black relative">
                <div className="laser-scan bg-(--neon-cyan) shadow-[0_0_10px_#00f3ff]"></div>
                <img className="w-full h-full object-cover grayscale group-hover:contrast-125 transition-all duration-500" data-alt="Black and white portrait of a man looking serious" src={dp} />
                <div className="absolute inset-0 bg-(--neon-cyan)/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="mt-3 text-center">
                <p className="text-white text-sm font-bold truncate group-hover:text-(--neon-cyan)">{name}</p>
                <p className="text-slate-500 text-[10px] font-mono uppercase truncate"> {role}</p>
            </div>
        </div>
    )
}
