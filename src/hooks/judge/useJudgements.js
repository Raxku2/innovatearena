import { useEventDetailsStore, useJudgesStore } from "../../stores"
import { UseStartup } from "../startup/UseStartup";

const useJudgements = () => {
    const BACKEND_API = import.meta.env.VITE_BACKEND_API;
    const { setSubmits, setJudgements } = useJudgesStore();
    const {
        disableLoadingBar, enableLoadingBar,
        setAdmins, setInvoice, registration_process_status, attendence_process_status, setAttendanceCount
    } = useEventDetailsStore();

    const { getEventData } = UseStartup();



    const loadAllSubmits = async () => {
        enableLoadingBar();
        getEventData();
        try {
            const res = await fetch(`${BACKEND_API}/judgement/submits`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify(payload)
            })

            const status = res.status

            if (status === 200 || status === 304) {

                if (status === 200) {
                    const data = await res.json()
                    // console.log(data);
                    setSubmits(data);
                    await loadJudgedSubmits();
                    disableLoadingBar();
                    return

                }

                if (status === 304) {
                    setSubmits([]);
                    await loadJudgedSubmits();
                    disableLoadingBar();
                    return
                }

                // await getFullUserInfo()
                setSubmits([]);
                await loadJudgedSubmits();
                disableLoadingBar();
                return
            }

            setSubmits([]);
            await loadJudgedSubmits();
            disableLoadingBar();
            // console.log(status)

        } catch (error) {
            setSubmits([]);
            await loadJudgedSubmits();
            console.error("Profile fetch failed:", error)
            setAppStatus("try again")
            disableLoadingBar();
        }
    }

    const saveJudgemment = async (data, project_id) => {
        // console.log(data, project_id);
        // return
        enableLoadingBar();


        try {
            const res = await fetch(`${BACKEND_API}/judgement/submit?project_id=${project_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const status = res.status

            if (status === 200 || status === 304) {

                if (status === 200) {
                    await loadAllSubmits();
                    disableLoadingBar();
                    return
                }

                if (status === 304) {
                    disableLoadingBar();
                    return
                }

                // await getFullUserInfo()
                disableLoadingBar();
                return
            }

            disableLoadingBar();
            // console.log(status)

        } catch (error) {
            await loadAllSubmits();
            console.error("Profile fetch failed:", error)
            // setAppStatus("try again")
            disableLoadingBar();
        }

    }

    const rejectSubmit = async (project_id) => {
        // console.log(data, project_id);
        // return
        enableLoadingBar();


        try {
            const res = await fetch(`${BACKEND_API}/judgement/submit?project_id=${project_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify(data)
            })

            const status = res.status

            if (status === 200 || status === 304) {

                if (status === 200) {
                    await loadAllSubmits();
                    disableLoadingBar();
                    return
                }

                if (status === 304) {
                    disableLoadingBar();
                    return
                }

                // await getFullUserInfo()
                disableLoadingBar();
                return
            }

            disableLoadingBar();
            // console.log(status)

        } catch (error) {
            await loadAllSubmits();
            console.error("Profile fetch failed:", error)
            // setAppStatus("try again")
            disableLoadingBar();
        }


    }

    const loadJudgedSubmits = async () => {

        // enableLoadingBar();
        // getEventData();
        try {
            const res = await fetch(`${BACKEND_API}/judgement/judged`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const status = res.status

            if (status === 200 || status === 304) {

                if (status === 200) {
                    const data = await res.json()
                    // console.log(data);
                    setJudgements(data);
                    // disableLoadingBar();
                    return

                }

                if (status === 304) {
                    setJudgements([]);
                    // disableLoadingBar();
                    return
                }

                // await getFullUserInfo()
                setJudgements([]);
                // disableLoadingBar();
                return
            }

            setJudgements([]);
            // disableLoadingBar();
            // console.log(status)

        } catch (error) {
            setJudgements([]);
            console.error("Profile fetch failed:", error)
            // disableLoadingBar();
        }
    }

    return {
        loadJudgedSubmits,
        saveJudgemment,
        loadAllSubmits,
        rejectSubmit
    }

}


export { useJudgements }