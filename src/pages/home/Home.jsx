import React, { useEffect, useState } from 'react'
import Landing from './Landing'
import { useEventDetailsStore, useUserDetailsStore } from '../../stores'
import { DateCounter, Navbar1 } from '../../component';
import clsx from 'clsx';
import { useDepartmentSelector, useInnovateArenaPayment, useUserAuthHook, useUserDataIO, useYearSelector } from '../../hooks';
import { useNavigate } from 'react-router'

export default function Home() {
  const { userType } = useUserDetailsStore();

  const {
    dp, userName, email, userId,
    peymentStatus, registrationStatus,
    department, batch, phone, partnerName,
    partneremail, team_id, setUserName,
    partner_status, setUserPhone,
    setUserPaernerName, setUserPaernerEmail,
    txnId
  } = useUserDetailsStore();


  const navigate = useNavigate();

  const {
    enableLoadingBar, AppStatus
  } = useEventDetailsStore();
  const [regCardStatus, setRegCardStatus] = useState(0);
  const [regCardMessage, setRegCardMessage] = useState("");
  const [progress, setProgress] = useState(25);
  const [step, setStep] = useState(1);

  
  const { year, setYear, validYears } = useYearSelector();
  const {
    currentdepartment, setDepartment, validDepartments
  } = useDepartmentSelector();




  const [userFormedit, setUserFormedit] = useState(false);
  const [partnerFormedit, setPartnerFormedit] = useState(false);
  const [
    partnerCardVisibility, setparnrtCardVisibility
  ] = useState(false);
  const { removeUser } = useUserAuthHook();

  const {
    getFullUserInfo, updateUserInfo,
    createPartner, syncPartnerInfo, removePartnerInfo,
  } = useUserDataIO();

  const [modification, setModification] = useState(true);

  useEffect(() => {
    if (partnerName && partneremail) {
      setparnrtCardVisibility(true);
    }
  }, [partnerName, partneremail])

  useEffect(() => {
    getFullUserInfo();
  }, [userId])


  useEffect(() => {
    if (!registrationStatus && !peymentStatus) {
      setRegCardStatus(0);
      setRegCardMessage("[!] REGISTRATION_PENDING");
      setProgress(25);
      setStep(1);
    }
    else if (!registrationStatus && peymentStatus) {
      setRegCardStatus(0);
      setRegCardMessage("[!] REGISTRATION_PENDING")
      setProgress(75);
      setStep(2);
    }
    else if (registrationStatus && !peymentStatus) {
      setRegCardStatus(0);
      setRegCardMessage("[!] PAYMENT_PENDING")
      setProgress(50);
      setStep(2);
    }
    else if (registrationStatus && peymentStatus) {
      setRegCardStatus(1);
      setRegCardMessage("[✓] SEQUENCE_COMPLETE")
      setProgress(100);
      setStep(3);
      setModification(false);
    }
    else {
      setRegCardStatus(0);
      setRegCardMessage("[!] REGISTRATION_PENDING")
    }

  }, [registrationStatus, peymentStatus])


  const { startRegistrationPayment } = useInnovateArenaPayment();


  return (
    <>
      {!userType && <div>
        <Navbar1 />
        <Landing />
      </div>
      }

      {userType === 'user' && (
        <div>
          <div className="font-body text-slate-300 antialiased overflow-hidden selection:bg-(--neon-pink) selection:text-white h-screen flex flex-col">
            <div classNaremoveUserme="fixed inset-0 z-100 crt-overlay pointer-events-none"></div>
            <div className="flex h-full w-full relative z-10">

              <aside className="w-full md:w-64 h-full hidden md:flex flex-col bg-black/80 border-r border-slate-800 relative z-20">
                <div className="h-20 flex items-center px-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-(--neon-cyan) text-3xl animate-pulse">terminal</span>
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-white tracking-wider text-sm">INNOVATE<span className="text-(--neon-cyan)">ARENA</span></span>
                      <span className="text-[9px] font-mono text-slate-500 tracking-[0.2em]">DASHBOARD_V2.6</span>
                    </div>
                  </div>
                </div>
                <nav className="flex-1 py-8 space-y-2 px-2 font-mono text-sm">
                  <a className="sidebar-link active flex items-center gap-4 px-4 py-3 text-white rounded-r-lg" href="#">
                    <span className="material-symbols-outlined text-lg">person</span>
                    <span>PROFILE</span>
                    <span className="ml-auto w-1 h-1 bg-(--neon-pink) rounded-full shadow-[0_0_5px_#ff0055]"></span>
                  </a>
                  {/* 
                  <a className="sidebar-link flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white rounded-r-lg group" href="#">
                    <span className="material-symbols-outlined text-lg group-hover:text-(--neon-cyan) transition-colors">calendar_month</span>
                    <span>SCHEDULE</span>
                    { <span className="ml-auto w-1 h-1 bg-(--neon-pink) rounded-full shadow-[0_0_5px_#ff0055]"></span> }
                </a>
                <a className="sidebar-link flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white rounded-r-lg group" href="#">
                  <span className="material-symbols-outlined text-lg group-hover:text-(--neon-cyan) transition-colors">gavel</span>
                  <span>RULES</span>
                </a>
                <a className="sidebar-link flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white rounded-r-lg group relative" href="#">
                  <span className="material-symbols-outlined text-lg group-hover:text-(--neon-cyan) transition-colors">notifications</span>
                  <span>NOTIFICATIONS</span>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-(--neon-pink) rounded-full animate-pulse-fast shadow-[0_0_8px_#ff0055]"></span>
                </a>
                <a className="sidebar-link flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white rounded-r-lg group" href="#">
                  <span className="material-symbols-outlined text-lg group-hover:text-(--neon-cyan) transition-colors">verified</span>
                  <span>CERTIFICATES</span>
                </a>
                <a className="sidebar-link flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white rounded-r-lg group" href="#">
                  <span className="material-symbols-outlined text-lg group-hover:text-(--neon-cyan) transition-colors">help</span>
                  <span>QUERIES</span>
                </a>
                    */}
                </nav>

                <div className="p-4 border-t border-slate-800">
                  <button className="bg-slate-900/50 rounded border border-slate-700 p-3 flex items-center gap-3 group cursor-pointer hover:border-neon-cyan transition-colors"
                    onClick={() => {
                      enableLoadingBar();
                      removeUser();
                      navigate('/');
                      window.location.reload();
                    }}
                  >
                    <div className="w-8 h-8 rounded bg-neon-cyan/20 flex items-center justify-center text-neon-cyan">
                      <span className="material-symbols-outlined text-sm">logout</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white group-hover:text-neon-cyan">TERMINATE</span>
                      <span className="text-[10px] text-slate-500 font-mono text-wrap">TEAM ID: #{team_id}</span>
                    </div>
                  </button>
                </div>

              </aside>

              <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <div className="absolute top-0 right-0 w-125 h-125 bg-(--neon-cyan)/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-125 h-125 bg-(--neon-pink)/5 rounded-full blur-[120px] pointer-events-none"></div>



                <header className="h-20 flex items-center justify-between px-8 border-b border-slate-800/50 bg-black/20 backdrop-blur-md z-30">
                  <div className="flex flex-col">
                    <h1 className="text-white font-display font-bold  text-xs md:text-sm  tracking-wide flex items-center gap-2">
                      <span className="text-(--neon-green) text-xs md:text-lg font-mono capitalize">[ STATUS: {AppStatus.toUpperCase()} ]</span>
                      <span className="text-slate-400 text-xs md:text-sm font-mono">//</span>
                      WELCOME, {userName}
                    </h1>
                    <span className="text-[10px] text-(--neon-cyan) font-mono tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-(--neon-cyan) text-xs md:text-sm rounded-full animate-pulse"></span>
                      ENCRYPTED_CONNECTION_STABLE
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded bg-slate-900/80 border border-slate-700 font-mono text-xs text-slate-400">
                      <span className="material-symbols-outlined text-sm text-(--neon-yellow)">bolt</span>
                      <span>SERVER_LATENCY: 12ms</span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-(--neon-cyan)/50 p-0.5 relative group cursor-pointer flex justify-center items-center">
                      <img
                        alt={userName ? userName[0] : "U"}
                        src={dp}
                        referrerPolicy="no-referrer"
                        className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${userName || 'User'}&background=000000&color=fff`;
                        }}
                      />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-(--neon-green) border border-black rounded-full"></div>
                    </div>
                  </div>
                </header>


                <div className="flex-1 overflow-y-auto p-6 lg:p-8">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* registration progress */}
                    <div className={clsx("col-span-1 md:col-span-8 glass-panel rounded-xl p-6 relative overflow-hidden group", regCardStatus == 0 ? " neon-border-yellow " : " neon-border-cyan ")}>
                      <div className="scan-line-anim opacity-20"></div>

                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <div>
                          <h3 className={clsx("font-display font-bold text-lg tracking-wider mb-1", regCardStatus == 0 ? "text-(--neon-yellow) " : "text-(--neon-green) ")} >REGISTRATION_PROTOCOL</h3>
                          <p className="text-xs font-mono text-slate-400">Unique ID: <span className="text-white">{email}</span></p>
                        </div>
                        <div className={clsx("px-3 py-1  border text-xs font-mono font-bold rounded animate-pulse", regCardStatus == 0 ? "bg-(--neon-yellow)/10 border-neon-yellow/30 text-(--neon-yellow) " : "bg-(--neon-green)/10 border-neon-cyan/30 text-(--neon-green) ")}>
                          {regCardMessage}
                        </div>
                      </div>


                      <div className="space-y-2 relative z-10">
                        <div className="flex justify-between text-xs font-mono text-slate-300">
                          <span>{registrationStatus || peymentStatus ? "SYSTEM_STATUS" : "INITIALIZING..."}</span>
                          <span>{progress}%</span>
                        </div>

                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">

                          <div className={clsx("h-full bg-linear-to-r relative ",
                            regCardStatus == 0
                              ? "bg-linear-to-r from-(--neon-yellow) to-(--orange1)  shadow-[0_0_10px_var(--neon-yellow)]"
                              : "bg-linear-to-r from-(--neon-green) to-(--emerald) shadow-[0_0_10px_var(--neon-green)]"

                          )}
                            style={{ width: `${progress}%` }}
                          >
                            <div className="absolute inset-0 bg-white/30 animate-[loading_2s_ease-in-out_infinite]"></div>
                          </div>

                        </div>

                        <div className={clsx("flex justify-between text-[10px] font-mono mt-1", step > 2 ? "text-(--neon-green)" : "text-slate-500")}>
                          <span>{step < 3 ? `STEP ${step}/3: TRANSACTION` : "ALL SYSTEMS GO - READY FOR BUILD SPRINT"}</span>
                          <span className="text-slate-500" >{step > 2 ? "COMPLETED" : `EST. TIME: ${6 / step} MIN`}</span>
                        </div>
                      </div>
                    </div>

                    {/* time counter */}
                    <DateCounter />


                    {/* user data form  */}
                    <div className="col-span-1 md:col-span-4 glass-panel neon-border-cyan rounded-xl p-6 relative group hover:bg-(--neon-cyan)/5 transition-colors duration-500">
                      <div className="absolute top-2 right-2 text-(--neon-cyan)/20 group-hover:text-(--neon-cyan)/50 transition-colors">
                        <span className="material-symbols-outlined text-4xl">fingerprint</span>
                      </div>
                      <h3 className="text-(--neon-cyan) font-mono font-bold text-sm tracking-wider mb-6 border-b border-(--neon-cyan)/20 pb-2">USER_CORE_DATA</h3>
                      <div className="space-y-4 font-mono text-sm relative z-10">


                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                          <span className="text-slate-500">ALIAS</span>
                          <input className="text-white font-bold bg-transparent text-right pr-0 m-0 w-[70%] h-5 outline-0 border-0 text-6" type="text" name="" value={userName} id="" disabled={!userFormedit} onChange={e => {
                            setUserName(e.target.value);

                          }} />
                        </div>


                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                          <span className="text-slate-500">DEPT</span>
                          <select
                            value={currentdepartment}
                            onChange={(e) => setDepartment(e.target.value)}
                            className={`
            w-[70%] appearance-none bg-transparent border-none text-sm p-0 text-center transition-all duration-300 outline-none
             ${currentdepartment === ''
                                ? 'text-slate-500'
                                : 'text-white'
                              }
          `} disabled={!userFormedit}
                          >
                            {/* Placeholder Option */}
                            <option value="" disabled className="bg-transparent text-slate-500">
                              [ SELECT_DEPARTMENT ]
                            </option>

                            {/* Map through the valid departments from the hook */}
                            {validDepartments.map((dept) => (
                              <option key={dept} value={dept} className="bg-transparent text-white">
                                {dept}
                              </option>
                            ))}
                          </select>
                        </div>


                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                          <span className="text-slate-500">BATCH</span>
                          {/* <span className="text-(--neon-green)">
                            {batch}
                          </span> */}
                          <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className={`
            w-[70%] appearance-none bg-transparent border-none text-sm p-0 text-center transition-all duration-300 outline-none
            ${year === ''
                                ? 'text-slate-500'
                                : 'text-white'
                              }
          `} disabled={!userFormedit}
                          >
                            {/* Placeholder Option */}
                            <option value="" disabled className="bg-transparent  text-slate-500">
                              [ SELECT_YEAR ]
                            </option>

                            {/* Map through the valid years from the hook */}
                            {validYears.map((y) => (
                              <option key={y} value={y} className="bg-transparent text-white">
                                {y}
                              </option>
                            ))}
                          </select>
                        </div>


                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">PHONE</span>
                          <input className="text-white font-bold bg-transparent text-right pr-0 m-0 w-[70%] h-5 outline-0 border-0 text-6" type="text" name="" value={phone} id="" disabled={!userFormedit} onChange={e => setUserPhone(e.target.value)} placeholder='+91 72837 XXXXX' />
                        </div>


                      </div>


                      <button
                        className="mt-6 w-full py-2 border border-slate-700 hover:border-neon-cyan text-slate-400 hover:text-neon-cyan text-xs font-mono uppercase transition-all flex items-center justify-center gap-2"
                        onClick={() => {
                          setUserFormedit(true);
                        }}
                        hidden={!modification || userFormedit}
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                        Modify_Data
                      </button>


                      <button
                        className="mt-6 w-full py-2 border border-slate-700 hover:border-neon-cyan text-slate-400 hover:text-neon-cyan text-xs font-mono uppercase transition-all flex items-center justify-center gap-2"
                        onClick={async () => {
                          setUserFormedit(false);
                          await updateUserInfo();
                        }}
                        hidden={!modification || !userFormedit}
                      >
                        <span className="material-symbols-outlined text-sm">save</span>
                        SAVE_DATA_PROTOCOL
                      </button>



                    </div>

                    {/* team form  */}
                    <div className="col-span-1 md:col-span-4 glass-panel neon-border-pink rounded-xl p-6 relative group hover:bg-(--neon-pink)/5 transition-colors duration-500">
                      <div className="absolute top-2 right-2 text-(--neon-pink)/20 group-hover:text-(--neon-pink)/50 transition-colors">
                        <span className="material-symbols-outlined text-4xl">group_work</span>
                      </div>
                      <h3 className="text-(--neon-pink) font-mono font-bold text-sm tracking-wider mb-6 border-b border-(--neon-pink)/20 pb-2">TEAM_SYNC_NODE</h3>



                      <div className="py-2 relative z-10" hidden={!partnerCardVisibility}>
                        <div className="flex items-center gap-4 mb-4">

                          <div className="w-12 h-12 rounded-full border-2 border-neon-pink p-0.5">
                            <div className="w-full h-full bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                              <span className="material-symbols-outlined">face_3</span>
                            </div>
                          </div>

                          <div>

                            <input type="text"
                              className='
                            text-white font-bold text-sm border-0 p-0 outline-none m-0 w-[85%] bg-transparent
                            '
                              placeholder='> PARTNER_NAME'
                              value={partnerName}
                              onChange={e => setUserPaernerName(e.target.value)}
                            />



                            <p className="text-neon-pink text-xs font-mono">{
                            }</p>
                            <span
                              className='
                              text-neon-pink text-xs font-mono bg-transparent capitalize border-none outline-none p-0 m-0 
                              '>

                              [<input
                                className='
                              text-neon-pink text-xs font-mono bg-transparent capitalize border-none outline-none p-0 m-0 
                              '
                                value={partneremail}
                                onChange={e => setUserPaernerEmail(e.target.value)}
                                placeholder='> PARTNER_EMAIL'
                                type="text" name="" id="" />]
                            </span>
                          </div>

                        </div>

                        <p className="text-slate-400 text-xs font-mono mb-4">Connection stable. Data stream active.</p>

                        <button
                          className="w-full py-2 bg-neon-pink/10 hover:bg-neon-pink/20 border border-neon-pink/50 text-neon-pink text-xs font-bold uppercase transition-all flex items-center justify-center gap-2"
                          hidden={peymentStatus || partner_status}
                          onClick={() => {
                            enableLoadingBar();
                            createPartner();
                          }}
                        >
                          <span className="material-symbols-outlined text-sm">check</span>
                          SAVE_DATA_PROTOCOL
                        </button>


                        {/* SYNC */}
                        <button
                          className="w-full py-2 bg-neon-pink/10 hover:bg-neon-pink/20 border border-neon-pink/50 text-neon-pink text-xs font-bold uppercase transition-all flex items-center justify-center gap-2"
                          hidden={peymentStatus || !partner_status}
                          onClick={() => {
                            syncPartnerInfo();
                          }}
                        >
                          <span className="material-symbols-outlined text-sm">sync</span>
                          SYNC_DATA_PROTOCOL
                        </button>


                        {/* DELETE */}
                        <button
                          className="w-full py-2 bg-neon-pink/10 hover:bg-neon-pink/20 border border-neon-pink/50 text-neon-pink text-xs font-bold uppercase transition-all flex items-center justify-center gap-2"
                          hidden={peymentStatus || !partner_status}
                          onClick={() => {
                            enableLoadingBar();
                            removePartnerInfo();
                          }}
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                          WIPE_PARTNER
                        </button>


                      </div>


                      <div className="text-center py-4 z-10 relative" hidden={partnerCardVisibility} >

                        <div className="w-16 h-16 mx-auto rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center mb-3 group-hover:border-(--neon-pink) group-hover:animate-spin-slow transition-all">
                          <span className="material-symbols-outlined text-slate-500 group-hover:text-white">add</span>
                        </div>
                        <h4 className="text-white font-bold text-sm">NO_SQUAD_DETECTED</h4>
                        <p className="text-slate-500 text-xs font-mono mt-1 mb-4">Join a cluster or initiate a new protocol.</p>

                        <div className=" " >
                          <button className="py-2 bg-neon-pink/10 hover:bg-neon-pink/20 border w-full border-neon-pink/50 text-neon-pink text-xs font-bold uppercase transition-all"
                            hidden={peymentStatus}
                            onClick={() => {
                              setPartnerFormedit(true);
                              setparnrtCardVisibility(true);
                            }}>
                            CREATE_TEAM
                          </button>
                        </div>
                      </div>
                    </div>


                    {/* payment vault  */}
                    <div className="col-span-1 md:col-span-4 glass-panel border border-t-4  border-neon-green rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-b from-neon-green/5 to-transparent pointer-events-none"></div>

                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-white font-display font-bold text-lg tracking-wide">TRANSACTION_VAULT</h3>
                          <span className="material-symbols-outlined text-neon-green"
                            hidden={peymentStatus} >account_balance_wallet</span>
                          <span className="material-symbols-outlined text-neon-green"
                            hidden={!peymentStatus}>verified_user</span>
                        </div>

                        <div className="bg-black/50 border border-slate-800 rounded p-3 mb-4 flex justify-between items-center"
                          hidden={!peymentStatus}
                        >
                          <div>
                            <p className="text-[10px] text-slate-500 font-mono uppercase mb-1">RECEIPT ID</p>
                            <span className="text-white font-mono text-sm">{txnId}</span>
                          </div>
                          <p className="text-[10px] text-neon-green font-mono mt-1 text-right bg-neon-green/10 px-2 py-1 rounded">PAYMENT_VERIFIED</p>
                        </div>

                        <div className="bg-black/50 border border-slate-800 rounded p-3 mb-4"
                          hidden={peymentStatus}

                        >
                          <p className="text-[10px] text-slate-500 font-mono uppercase mb-1">PAYMENT_DESTINATION</p>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white font-bold">R</div>
                            <span className="text-white font-mono text-sm">RAKESH KUNDU</span>
                          </div>
                          <p className="text-[10px] text-(--neon-green) font-mono mt-1 text-right">VERIFIED_MERCHANT</p>
                        </div>

                        <div className="flex justify-between items-end mb-6">
                          <span className="text-slate-400 font-mono text-xs">{peymentStatus ? "AMOUNT_PAID" : "AMOUNT_DUE"}</span>
                          <span className="text-2xl font-display font-bold text-white">₹50<span className="text-sm text-slate-500">.00</span></span>
                        </div>
                      </div>

                      <button className="w-full relative overflow-hidden group py-3 bg-neon-cyan hover:bg-cyan-400 text-black font-display font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)]"
                        onClick={() => {
                          enableLoadingBar();
                          startRegistrationPayment();
                        }}
                        hidden={peymentStatus}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          CLICK_TO_PAY <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </span>
                        <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      </button>


                      <button className="w-full relative overflow-hidden group py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-display font-bold uppercase tracking-wider transition-all backdrop-blur-sm"

                        // hidden={!peymentStatus}
                        hidden
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2 text-xs">
                          <span className="material-symbols-outlined text-sm">download</span> DOWNLOAD_INVOICE
                        </span>
                      </button>

                    </div>

                    {/* footer sec */}
                    <div className="col-span-1 md:col-span-12 mt-4 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-600">
                      <span>SYSTEM_ID: <span className="text-slate-400">NODE_001_ALPHA</span></span>
                      <div className="flex gap-4">
                        <a className="hover:text-neon-cyan transition-colors" href="#">TERMS_OF_SERVICE</a>
                        <a className="hover:text-neon-pink transition-colors" href="#">PRIVACY_PROTOCOL</a>
                        <a className="hover:text-neon-yellow transition-colors" href="#">SUPPORT_CHANNEL</a>
                      </div>
                    </div>


                  </div>
                </div>
              </main>
            </div>

          </div >
        </div >
      )
      }

      {
        userType === 'admin' && (
          <div>
            {/* Admin Content */}
          </div>
        )
      }
    </>
  )
}
