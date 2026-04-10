import { create } from 'zustand'

const useJudgesStore = create((set) => ({
    allJudges: [],

    setJudges: (param) => set({ allJudges: param }),

}))

export { useJudgesStore }