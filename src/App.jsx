import React, { useEffect } from 'react'
import AiemSnakeLoader from './component/loading/aiem_loading'
import { AuthPage, Home, PrivecyPolicy, RefundPolicy, Terms } from './pages'
import { Footer1, Invoice, Navbar1 } from './component'
import { AnimatePresence } from 'motion/react'
import { Link, Route, Routes, useLocation } from "react-router"
import { useEventDetailsStore } from './stores'
import { useAdminControls, useGoogleAuth, UseStartup, useUserAuthHook, useUserDataIO } from './hooks'

export default function App() {
  const location = useLocation();
  const { enableLoadingBar, disableLoadingBar, LoadingBar } = useEventDetailsStore();
  const { getUserFromLocalStorage } = useUserAuthHook();
  const { getEventData } = UseStartup();
  const { getFullUserInfo,getAdminInfo } = useUserDataIO();
  const { giveRecods } = useAdminControls();

  useGoogleAuth();

  useEffect(() => {
    ; (async function () {
      await getEventData();
      await getFullUserInfo();
      getUserFromLocalStorage();
    })();
  }, []);


  useEffect(() => {
    if (LoadingBar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [LoadingBar]);


  return (
    <div>

      <div className='w-full h-full fixed inset-0 flex justify-center items-center z-10000 bg-white/4 backdrop-blur-md border border-white/20 rounded-xl  shadow-lg top-0 left-0 disabled ' hidden={!LoadingBar}>
        <div className='h-full lg:h-[90%] lg:w-[90%] w-full'>
          <AiemSnakeLoader />
        </div>
      </div>

      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}  >
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/auth'
            element={<AuthPage />}
          />
          <Route
            path='/terms'
            element={<Terms />}
          />
          <Route
            path='/privecy'
            element={<PrivecyPolicy />}
          />
          <Route
            path='/refund'
            element={<RefundPolicy />}
          />
          <Route
            path='/aa'
            element={<Invoice />}
          />

        </Routes>

      </AnimatePresence>

      <Footer1 />

    </div>
  )
}
