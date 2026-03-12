import { create } from 'zustand'

const useUserDetailsStore = create((set) => ({
    userId: '',
    userName: "",
    email: "",
    phone: '',
    department: '',
    batch: '',
    partnerName: '',
    partneremail: '',
    partnerdp: '',
    dp: null,
    userType: '',
    registrationStatus: false,
    peymentStatus: false,
    txnId: '',
    team_id: '',
    partnerid: '',
    partner_status: false,
    super_mode: false,
    attendence: false,
    project_title: null,
    project_deployument: null,
    project_repo: null,
    project_id:null,


    setLogin: (username, email, dp, user_id, actype, teamId) => set({
        userName: username,
        email: email,
        dp: dp,
        userId: user_id,
        userType: actype,
        team_id: teamId
    }),
    setLogOut: () => set({
        userName: null,
        email: null,
        dp: null,
        userId: null,
        userType: null,
        team_id: null
    }),
    setUserId: (param) => set({ userId: param }),
    setUserName: (param) => set({ userName: param }),
    setUserPhone: (param) => set({ phone: param }),
    setUserDepartment: (param) => set({ department: param }),
    setUserBatch: (param) => set({ batch: param }),
    setUserPaernerId: (param) => set({ partnerid: param }),
    setUserPaernerEmail: (param) => set({ partneremail: param }),
    setUserPaernerName: (param) => set({ partnerName: param }),
    setUserPaernerdp: (param) => set({ partnerdp: param }),
    setDp: (param) => set({ dp: param }),
    setpayId: (param) => set({ txnId: param }),
    setTeamId: (param) => set({ team_id: param }),
    setUserReg: (param) => set({ registrationStatus: param }),
    setPartnerStatus: (param) => set({ partner_status: param }),
    setPayStatus: (param) => set({ peymentStatus: param }),
    settxn: (param) => set({ txnId: param }),
    setuserType: (param) => set({ userType: param }),
    setSuper: (param) => set({ super_mode: param }),
    setAttendence: (param) => set({ attendence: param }),
    setProjectTitle: (param) => set({ project_title: param }),
    setProjectDeployment: (param) => set({ project_deployument: param }),
    setProjectRepo: (param) => set({ project_repo: param }),
    setProjectId: (param) => set({ project_id: param }),

}))


export {
    useUserDetailsStore
}