import React, { useEffect, useState } from 'react'
import { useEventDetailsStore } from '../../stores';

export default function DepartmentMatrix() {

    const {
         matrix
    } = useEventDetailsStore();

    const [ecelimit, setEceLimit] = useState(60);
    const [ece26, setEce26] = useState(0);
    const [ece27, setEce27] = useState(0);
    const [ece28, setEce28] = useState(0);
    const [ece29, setEce29] = useState(0);
    const [ece30, setEce30] = useState(0);

    const [cselimit, setCseLimit] = useState(80);
    const [cse26, setCse26] = useState(0);
    const [cse27, setCse27] = useState(0);
    const [cse28, setCse28] = useState(0);
    const [cse29, setCse29] = useState(0);
    const [cse30, setCse30] = useState(0);

    const [bshulimit, bshusetLimit] = useState(200);
    const [Bshu26, setBshu26] = useState(0);
    const [Bshu27, setBshu27] = useState(0);
    const [Bshu28, setBshu28] = useState(0);
    const [Bshu29, setBshu29] = useState(0);
    const [Bshu30, setBshu30] = useState(0);

    const [melimit, setmeLimit] = useState(60);
    const [me26, setMe26] = useState(0);
    const [me27, setMe27] = useState(0);
    const [me28, setMe28] = useState(0);
    const [me29, setMe29] = useState(0);
    const [me30, setMe30] = useState(0);

    const [eelimit, seteeLimit] = useState(60);
    const [ee26, setEe26] = useState(0);
    const [ee27, setEe27] = useState(0);
    const [ee28, setEe28] = useState(0);
    const [ee29, setEe29] = useState(0);
    const [ee30, setEe30] = useState(0);

    const [civillimit, setcivilLimit] = useState(60);
    const [civil26, setCivil26] = useState(0);
    const [civil27, setCivil27] = useState(0);
    const [civil28, setCivil28] = useState(0);
    const [civil29, setCivil29] = useState(0);
    const [civil30, setCivil30] = useState(0);

    useEffect(()=>{
        if(matrix){

            setEce26(matrix.ECE["2026"])
            setEce27(matrix.ECE["2027"])
            setEce28(matrix.ECE["2028"])
            setEce29(matrix.ECE["2029"])
            setEce30(matrix.ECE["2030"])

            setCse26(matrix.CSE["2026"])
            setCse27(matrix.CSE["2027"])
            setCse28(matrix.CSE["2028"])
            setCse29(matrix.CSE["2029"])
            setCse30(matrix.CSE["2030"])

            setEe26(matrix.EE["2026"])
            setEe27(matrix.EE["2027"])
            setEe28(matrix.EE["2028"])
            setEe29(matrix.EE["2029"])
            setEe30(matrix.EE["2030"])

            setMe26(matrix.ME["2026"])
            setMe27(matrix.ME["2027"])
            setMe28(matrix.ME["2028"])
            setMe29(matrix.ME["2029"])
            setMe30(matrix.ME["2030"])

            setBshu26(matrix.BSHU["2026"])
            setBshu27(matrix.BSHU["2027"])
            setBshu28(matrix.BSHU["2028"])
            setBshu29(matrix.BSHU["2029"])
            setBshu30(matrix.BSHU["2030"])

            setCivil26(matrix.CIVIL["2026"])
            setCivil27(matrix.CIVIL["2027"])
            setCivil28(matrix.CIVIL["2028"])
            setCivil29(matrix.CIVIL["2029"])
            setCivil30(matrix.CIVIL["2030"])




        }
    },[matrix])

    return (
        <div className="col-span-1 lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-display font-bold text-white tracking-wide border-l-4 border-neon-cyan pl-3">DEPARTMENT_MATRIX</h2>
                <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-neon-pink"></span>
                    <span className="w-2 h-2 rounded-full bg-neon-cyan"></span>
                    <span className="w-2 h-2 rounded-full bg-neon-yellow"></span>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ece */}
                <div className="glass-panel border border-slate-700/50 hover:border-neon-pink/50 transition-colors rounded-lg p-4 relative">
                    <div className="absolute top-2 right-2 text-xs font-mono text-slate-500">Node_ECE</div>
                    <h3 className="text-neon-pink font-bold font-display text-sm mb-3">ECE_DEPT</h3>
                    <div className="space-y-2 text-[10px] font-mono text-slate-400">
                        <div className="flex items-center gap-2">
                            <span className="w-8">2026</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full"><div className={"bar-fill bg-neon-pink  shadow-[0_0_5px_#ff0055] " + `w-[${((ece26 / ecelimit) * 100)}%]`}></div></div>
                            <span className="w-6 text-right text-white">{ece26}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-8">2027</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full"><div className={"bar-fill bg-neon-pink  shadow-[0_0_5px_#ff0055] " + `w-[${((ece27 / ecelimit) * 100)}%]`}></div></div>
                            <span className="w-6 text-right text-white">{ece27}</span>

                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-8">2028</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full"><div className={"bar-fill bg-neon-pink  shadow-[0_0_5px_#ff0055] " + `w-[${((ece28 / ecelimit) * 100)}%]`}></div></div>
                            <span className="w-6 text-right text-white">{ece28}</span>

                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-8">2029</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full"><div className={"bar-fill bg-neon-pink  shadow-[0_0_5px_#ff0055] " + `w-[${((ece29 / ecelimit) * 100)}%]`}></div></div>
                            <span className="w-6 text-right text-white">{ece29}</span>


                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-8">2030</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full"><div className={"bar-fill bg-neon-pink  shadow-[0_0_5px_#ff0055] " + `w-[${((ece30 / ecelimit) * 100)}%]`}></div></div>
                            <span className="w-6 text-right text-white">{ece30}</span>

                        </div>
                    </div>
                </div>

                {/* cse */}
                <div className="glass-panel border border-slate-700/50 hover:border-neon-cyan/50 transition-colors rounded-lg p-4 relative">
                    <div className="absolute top-2 right-2 text-xs font-mono text-slate-500">Node_CSE</div>
                    <h3 className="text-neon-cyan font-bold font-display text-sm mb-3">CSE_DEPT</h3>
                    <div className="space-y-2 text-[10px] font-mono text-slate-400">
                        <div className="flex items-center gap-2">

                            <span className="w-8">2026</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full">
                                <div className={"bar-fill bg-neon-cyan shadow-[0_0_5px_#00f3ff] " + `w-[${((cse26 / cselimit) * 100)}%]`}></div>
                            </div>
                            <span className="w-6 text-right text-white">{cse26}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="w-8">2027</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full">
                                <div className={"bar-fill bg-neon-cyan shadow-[0_0_5px_#00f3ff] " + `w-[${((cse27 / cselimit) * 100)}%]`}></div>
                            </div>
                            <span className="w-6 text-right text-white">{cse27}</span>

                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-8">2028</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full">
                                <div className={"bar-fill bg-neon-cyan shadow-[0_0_5px_#00f3ff] " + `w-[${((cse28 / cselimit) * 100)}%]`}></div>
                            </div>
                            <span className="w-6 text-right text-white">{cse28}</span>

                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-8">2029</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full">
                                <div className={"bar-fill bg-neon-cyan shadow-[0_0_5px_#00f3ff] " + `w-[${((cse29 / cselimit) * 100)}%]`}></div>
                            </div>
                            <span className="w-6 text-right text-white">{cse29}</span>

                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-8">2030</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full">
                                <div className={"bar-fill bg-neon-cyan shadow-[0_0_5px_#00f3ff] " + `w-[${((cse30 / cselimit) * 100)}%]`}></div>
                            </div>
                            <span className="w-6 text-right text-white">{cse30}</span>

                        </div>
                    </div>
                </div>
                {/* me  */}

                <div className="glass-panel border border-slate-700/50 hover:border-neon-yellow/50 transition-colors rounded-lg p-4 relative">
                    <div className="absolute top-2 right-2 text-xs font-mono text-slate-500">Node_ME</div>
                    <h3 className="text-neon-yellow font-bold font-display text-sm mb-3">ME_DEPT</h3>
                    <div className="space-y-2 text-[10px] font-mono text-slate-400">

                        <div className="flex items-center gap-2">
                            <span className="w-8">2026</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full"><div className={"bar-fill bg-neon-yellow " + `w-[${((me26 / melimit) * 100)}%]`}></div></div>
                            <span className="w-6 text-right text-white">{me26}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="w-8">2027</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full"><div className={"bar-fill bg-neon-yellow " + `w-[${((me27 / melimit) * 100)}%]`}></div></div>
                            <span className="w-6 text-right text-white">{me27}</span>

                        </div>

                        <div className="flex items-center gap-2">
                            <span className="w-8">2028</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full"><div className={"bar-fill bg-neon-yellow " + `w-[${((me28 / melimit) * 100)}%]`}></div></div>
                            <span className="w-6 text-right text-white">{me28}</span>

                        </div>

                        <div className="flex items-center gap-2">
                            <span className="w-8">2029</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full"><div className={"bar-fill bg-neon-yellow " + `w-[${((me29 / melimit) * 100)}%]`}></div></div>
                            <span className="w-6 text-right text-white">{me29}</span>

                        </div>

                        <div className="flex items-center gap-2">
                            <span className="w-8">2030</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full"><div className={"bar-fill bg-neon-yellow " + `w-[${((me30 / melimit) * 100)}%]`}></div></div>
                            <span className="w-6 text-right text-white">{me30}</span>

                        </div>
                    </div>
                </div>

                {/* ee */}
                <div className="glass-panel border border-slate-700/50 hover:border-neon-green/50 transition-colors rounded-lg p-4 relative">
                    <div className="absolute top-2 right-2 text-xs font-mono text-slate-500">Node_EE</div>
                    <h3 className="text-neon-green font-bold font-display text-sm mb-3">EE_DEPT</h3>
                    <div className="space-y-2 text-[10px] font-mono text-slate-400">

                        <div className="flex items-center gap-2">
                            <span className="w-8">2026</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full"><div className={"bar-fill bg-neon-green " + `w-[${((ee26 / eelimit) * 100)}%]`}></div></div>
                            <span className="w-6 text-right text-white">{ee26}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="w-8">2027</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full"><div className={"bar-fill bg-neon-green " + `w-[${((ee27 / eelimit) * 100)}%]`}></div></div>
                            <span className="w-6 text-right text-white">{ee27}</span>

                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-8">2028</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full"><div className={"bar-fill bg-neon-green " + `w-[${((ee28 / eelimit) * 100)}%]`}></div></div>
                            <span className="w-6 text-right text-white">{ee26}</span>

                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-8">2029</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full"><div className={"bar-fill bg-neon-green " + `w-[${((ee29 / eelimit) * 100)}%]`}></div></div>
                            <span className="w-6 text-right text-white">{ee26}</span>

                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-8">2030</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full"><div className={"bar-fill bg-neon-green " + `w-[${((ee30 / eelimit) * 100)}%]`}></div></div>
                            <span className="w-6 text-right text-white">{ee26}</span>

                        </div>
                    </div>
                </div>

                {/* bhsu  */}
                <div className="glass-panel border border-slate-700/50 hover:border-white/50 transition-colors rounded-lg p-4 relative md:col-span-2">
                    <div className="absolute top-2 right-2 text-xs font-mono text-slate-500">Node_BHSU</div>
                    <h3 className="text-white font-bold font-display text-sm mb-3">BHSU_DEPT</h3>

                    <div className="space-y-2 text-[10px] font-mono text-slate-400">

                        <div className="flex items-center gap-2">
                            <span className="w-8">ALL</span>
                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full"><div className={"bar-fill bg-slate-400 " + `w-[${(((Bshu26 + Bshu27 + Bshu28 + Bshu29 + Bshu30) / bshulimit) * 100)}%]`}></div></div>
                            <span className="w-6 text-right text-white">{Bshu26 + Bshu27 + Bshu28 + Bshu29 + Bshu30}</span>
                        </div>

                    </div>


                </div>


                {/* civil  */}

                <div className="glass-panel border border-slate-700/50 hover:border-white/50 transition-colors rounded-lg p-4 relative md:col-span-2">
                    <div className="absolute top-2 right-2 text-xs font-mono text-slate-500">Node_CIVIL</div>
                    <h3 className="text-white font-bold font-display text-sm mb-3">CIVIL_DEPT</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-[10px] font-mono text-slate-400">
                        <div className="flex flex-col items-center gap-2">
                            <div className="h-20 w-3 bg-slate-800 rounded-b-sm relative flex items-end">
                                <div className={"w-full bg-slate-400 " + `h-[${((civil26 / civillimit) * 100)}%]`}></div>
                            </div>
                            <span>'26</span>

                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="h-20 w-3 bg-slate-800 rounded-b-sm relative flex items-end">
                                <div className={"w-full bg-slate-400 " + `h-[${((civil27 / civillimit) * 100)}%]`}></div>
                            </div>
                            <span>'27</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="h-20 w-3 bg-slate-800 rounded-b-sm relative flex items-end">
                                <div className={"w-full bg-slate-400 " + `h-[${((civil28 / civillimit) * 100)}%]`}></div>
                                {/* <div className="w-full bg-slate-400  h-[35%]"></div> */}
                            </div>
                            <span>'28</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="h-20 w-3 bg-slate-800 rounded-b-sm relative flex items-end">
                                <div className={"w-full bg-slate-400 " + `h-[${((civil29 / civillimit) * 100)}%]`}></div>
                                {/* <div className="w-full bg-slate-400  h-[30%]"></div> */}
                            </div>
                            <span>'29</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="h-20 w-3 bg-slate-800 rounded-b-sm relative flex items-end">
                                <div className={"w-full bg-slate-400 " + `h-[${((civil30 / civillimit) * 100)}%]`}></div>
                                {/* <div className="w-full bg-slate-400  h-[20%]"></div> */}
                            </div>
                            <span>'30</span>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
