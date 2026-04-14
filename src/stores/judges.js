import { create } from 'zustand'

const useJudgesStore = create((set) => ({
    allJudges: [],
    allSubmits: [],
    allJudgements: [],

    setJudges: (param) => set({ allJudges: param }),
    setSubmits: (param) => set({ allSubmits: param }),
    setJudgements: (param) => set({ allJudgements: param }),

}))

export { useJudgesStore }