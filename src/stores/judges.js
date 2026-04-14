import { create } from 'zustand'

const useJudgesStore = create((set) => ({
    allJudges: [],
    allSubmits: [],

    setJudges: (param) => set({ allJudges: param }),
    setSubmits: (param) => set({ allSubmits: param }),

}))

export { useJudgesStore }