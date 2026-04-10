import React, { useEffect, useState } from 'react'
import Landing from './Landing'
import { useEventDetailsStore, useUserDetailsStore } from '../../stores'
import { Navbar1, } from '../../component';
import clsx from 'clsx';
import { useUserAuthHook, useUserDataIO, } from '../../hooks';
import { NavLink, Outlet, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'

export default function Home() {
  const navigate = useNavigate();
  const { removeUser } = useUserAuthHook();


  // zustand stores
  const {
    dp, userName, email, userId,
    team_id, judge_role, userType,
  } = useUserDetailsStore();

  const {
    enableLoadingBar,
    AppStatus,
  } = useEventDetailsStore();


  // custom hooks
  const {
    getFullUserInfo,
  } = useUserDataIO();


  // fetch user data
  useEffect(() => {
    if (userId) {
      getFullUserInfo();
    }
  }, [userId]);



  // UI controls
  const [isOpen, setIsOpen] = useState(false);
  const [pagewidth, setWidth] = useState('');


  // responsive width tracker
  useEffect(() => {

    function handleResize() {
      setWidth(window.innerWidth);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);




  return (
    <>


      {!userType && <div>
        <Navbar1 />
        <Landing />
      </div>
      }


      {userType && <div>
        <div className="font-body text-slate-300 antialiased overflow-hidden selection:bg-(--neon-pink) selection:text-white h-screen flex flex-col">
          <div className="fixed inset-0 z-100 crt-overlay pointer-events-none"></div>
          <div className="flex h-full w-full relative z-10">


            <AnimatePresence>

              {(isOpen || pagewidth >= 1280) && (
                <>
                  {/* Overlay (mobile only) */}
                  {isOpen && (
                    <motion.div
                      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-300 xl:hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsOpen(false)}
                    />
                  )}

                  <motion.aside
                    initial={{ x: -300 }}
                    animate={{
                      x: isOpen || pagewidth >= 1280 ? 0 : -300
                    }}
                    exit={{ x: -300 }}
                    transition={{ type: "spring", stiffness: 260, damping: 25 }}
                    className="fixed xl:relative w-64 h-full bg-black/90 border-r border-slate-800 z-400 flex flex-col"
                  >
                    <div className="h-20 flex items-center px-6 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-(--neon-cyan) text-3xl animate-pulse">terminal</span>
                        <div className="flex flex-col">
                          <span className="font-display font-bold text-white tracking-wider text-sm">INNOVATE<span className="text-(--neon-cyan)">ARENA</span></span>
                          <span className="text-[9px] font-mono text-slate-500 tracking-[0.2em]">DASHBOARD_V{__APP_VERSION__}</span>
                        </div>
                      </div>
                    </div>

                    <nav className="flex-1 py-8 space-y-2 px-2 font-mono text-sm">

                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          clsx(
                            // 1. These base classes apply all the time
                            "sidebar-link flex items-center gap-4 px-4 py-3 rounded-r-lg transition-colors",

                            // 2. These classes apply ONLY when active
                            isActive ? "active" : ""
                          )
                        }
                      >
                        <span className="material-symbols-outlined text-lg">person</span>
                        <span>PROFILE</span>
                      </NavLink>

                      <NavLink
                        to="/cirtificate"
                        className={({ isActive }) =>
                          clsx(
                            // 1. These base classes apply all the time
                            "sidebar-link flex items-center gap-4 px-4 py-3 rounded-r-lg transition-colors",

                            // 2. These classes apply ONLY when active
                            isActive ? "active" : ""
                          )
                        }
                        hidden
                      >
                        <span className="material-symbols-outlined text-lg">workspace_premium</span>
                        <span>CERTIFICATE</span>
                      </NavLink>

                      {(judge_role || userType == 'root') &&
                        <NavLink
                          to="/judge"
                          className={({ isActive }) =>
                            clsx(
                              // 1. These base classes apply all the time
                              "sidebar-link flex items-center gap-4 px-4 py-3 rounded-r-lg transition-colors",

                              // 2. These classes apply ONLY when active
                              isActive ? "active" : ""
                            )
                          }
                        >
                          <span className="material-symbols-outlined text-lg">workspace_premium</span>
                          <span>JUDGE</span>
                        </NavLink>
                      }






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

                  </motion.aside>
                </>)}
            </AnimatePresence>

            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
              <div className="absolute top-0 right-0 w-125 h-125 bg-(--neon-cyan)/5 rounded-full blur-[120px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-125 h-125 bg-(--neon-pink)/5 rounded-full blur-[120px] pointer-events-none"></div>


              <header className="h-20 flex items-center justify-between px-8 border-b border-slate-800/50 bg-black/20 backdrop-blur-md z-30"

                onClick={() => setIsOpen(true)}
              >
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

              <Outlet />

            </main>


          </div>
        </div >
      </div >

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
