import { create } from 'zustand'

const useEventDetailsStore = create((set) => ({
  LoadingBar: true,
  AppStatus: "SYSTEM READY",
  eventDuration: 5,
  eventDomains: 6,
  eventPrize: 2.0,
  venuePhoto: "https://www.abacusinstitute.org/images/slider/slide1.jpg",
  venueLocation: "MAGRA_CAMPUS // ABACUS INSTITUTE",
  teamSize: "1-2",
  registrationOpen: 'MARCH 5',
  registrationClose: 'APRIL 04',
  eventDate: 'APRIL 08',
  eventOrganizers: [],
  rules: [],
  matrix: null,
  admins: [],
  invoice: null,



  enableLoadingBar: () => set({ LoadingBar: true }),
  disableLoadingBar: () => set({ LoadingBar: false }),
  setAppStatus: (params) => set({ AppStatus: params }),
  setEventOrga: (params) => set({ eventOrganizers: params }),
  setEventRules: (params) => set({ rules: params }),
  setEventSchedules: (params) => set({ schedules: params }),
  setMatrix: (params) => set({ matrix: params }),
  setAdmins: (params) => set({ admins: params }),
  setInvoice: (params) => set({ invoice: params }),

}))


export {
  useEventDetailsStore
}