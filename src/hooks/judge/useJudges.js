import { useEventDetailsStore, useJudgesStore } from "../../stores";

const useJudges = () => {
    const BACKEND_API = import.meta.env.VITE_BACKEND_API;
    const { setJudges } = useJudgesStore();
    const { setAppStatus } = useEventDetailsStore();
    const {
        disableLoadingBar, enableLoadingBar
    } = useEventDetailsStore();

    const loadAllJudges = async () => {
        try {
            const res = await fetch(`${BACKEND_API}/root/admins/judge`, {
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
                    setJudges(data)
                    setAppStatus("Judges fetched")
                }

                if (status === 304) {
                    setAppStatus("data matched")
                }

                return
            }

            setJudges([]);
            setAppStatus("try again")
        } catch (error) {
            console.error("Profile fetch failed:", error)
            setAppStatus("try again")
        }
    }

    const makeJudge = async (judgeEmail) => {
        try {
            enableLoadingBar();
            const res = await fetch(`${BACKEND_API}/root/admins/judge?judge_email=${judgeEmail}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify(payload)
            })

            const status = res.status

            if (status === 200 || status === 304) {

                if (status === 200) {
                    setAppStatus("input recorded")
                }

                if (status === 304) {
                    setAppStatus("data matched")
                }

                await loadAllJudges()
                disableLoadingBar();
                return
            }

            // console.log(status)
            setAppStatus("try again")
            disableLoadingBar();

        } catch (error) {

            // console.error("Profile fetch failed:", error)
            setAppStatus("try again")
            disableLoadingBar();

        }
    }

    const removeJudge = async (judgeEmail) => {
        try {
            enableLoadingBar();

            const res = await fetch(`${BACKEND_API}/root/admins/judge?judge_email=${judgeEmail}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify(payload)
            })

            const status = res.status

            if (status === 200 || status === 304) {

                if (status === 200) {
                    setAppStatus("input recorded")
                }

                if (status === 304) {
                    setAppStatus("data matched")
                }

                await loadAllJudges()
                disableLoadingBar();
                return
            }

            // console.log(status)
            setAppStatus("try again")
            disableLoadingBar();

        } catch (error) {

            // console.error("Profile fetch failed:", error)
            setAppStatus("try again")
            disableLoadingBar();

        }

    }

    return {
        makeJudge, removeJudge, loadAllJudges
    }


}

export {
    useJudges
}