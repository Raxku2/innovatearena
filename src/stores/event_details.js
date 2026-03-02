import { create } from 'zustand'

const useEventDetailsStore = create((set) => ({
  LoadingBar: true,
  AppStatus: "SYSTEM READY",
  eventDuration: 5,
  eventDomains: 6,
  eventPrize: 2.0,
  registrationOpen: 'MARCH 10',
  registrationClose: 'APRIL 01',
  eventDate: 'APRIL 08',
  eventOrganizers: [
    {
      name: "Soumojit",
      role: "Co-Lead",
      dp: "https://raw.githubusercontent.com/yyaiem/yy_members/refs/heads/main/Soumojit_Barui.png"
    },
    {
      name: "Sneha",
      role: "Event Coord",
      dp: "https://raw.githubusercontent.com/yyaiem/yy_members/refs/heads/main/Soumojit_Barui.png"
    }
  ],
  venuePhoto: "https://www.abacusinstitute.org/images/slider/slide1.jpg",
  venueLocation: "MAGRA_CAMPUS // ABACUS INSTITUTE",
  teamSize: "1-2",



  enableLoadingBar: () => set({ LoadingBar: true }),
  disableLoadingBar: () => set({ LoadingBar: false }),
  setAppStatus: (params) => set({ AppStatus: params }),
}))


export {
  useEventDetailsStore
}