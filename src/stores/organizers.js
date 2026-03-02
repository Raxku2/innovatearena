import { create } from 'zustand'

const useEventDetailsStore = create((set) => ({
  bears: 0,
  eventDuration: 5,
  eventDomains: 6,
  eventPrize:2.0,
  registrationOpen: 'MARCH 10',
  registrationClose: 'APRIL 01',
  eventDate: 'APRIL 08',



  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))


export {
    useEventDetailsStore
}