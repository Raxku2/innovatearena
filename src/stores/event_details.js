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
  registrationClose: 'APRIL 26',
  eventDate: 'APRIL 27',
  eventOrganizers: [],
  rules: [],
  matrix: null,
  admins: [],
  invoice: null,
  registration_process_status: false,
  attendence_process_status: false,
  project_submit_process_status: false,
  attendanceCount: null,
  pos_A: null,
  pos_B: null,
  pos_C: null,


  enableLoadingBar: () => set({ LoadingBar: true }),
  disableLoadingBar: () => set({ LoadingBar: false }),
  setAppStatus: (params) => set({ AppStatus: params }),
  setEventOrga: (params) => set({ eventOrganizers: params }),
  setEventRules: (params) => set({ rules: params }),
  setEventSchedules: (params) => set({ schedules: params }),
  setMatrix: (params) => set({ matrix: params }),
  setAdmins: (params) => set({ admins: params }),
  setInvoice: (params) => set({ invoice: params }),
  setRegistration: (params) => set({ registration_process_status: params }),
  setAttendence: (params) => set({ attendence_process_status: params }),
  setProject: (params) => set({ project_submit_process_status: params }),
  setAttendanceCount: (params) => set({ attendanceCount: params }),
  setEventDate: (params) => set({ eventDate: params }),
  setPositionA: (params) => set({ pos_A: params }),
  setPositionB: (params) => set({ pos_B: params }),
  setPositionC: (params) => set({ pos_C: params }),

}))


export {
  useEventDetailsStore
}