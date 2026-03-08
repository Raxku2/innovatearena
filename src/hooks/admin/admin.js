import { useEventDetailsStore, useUserDetailsStore } from "../../stores"

const useAdminControls = () => {

    const setMatrix = useEventDetailsStore(s => s.setMatrix);
    const disableLoadingBar = useEventDetailsStore(s => s.disableLoadingBar);
    const setAppStatus = useEventDetailsStore(s => s.setAppStatus);

    const userId = useUserDetailsStore(s => s.userId);
    const userType = useUserDetailsStore(s => s.userType);

    const BACKEND_API = import.meta.env.VITE_BACKEND_API;

    const giveRecods = async () => {

        if (!userId) {
            return
        }

        if (!userType || userType !== 'root') {
            return
        }

        setAppStatus("syncing...")

        try {

            const res = await fetch(`${BACKEND_API}/root/${userId}`)

            if (res.status === 200) {

                const data = await res.json()

                setMatrix(data)

                setAppStatus("fetched!!")

                disableLoadingBar()

            }
            else if (res.status === 401) {

                setAppStatus("server denied")

                disableLoadingBar()

            }
            else {

                setAppStatus("fail")

                disableLoadingBar()

            }

        }
        catch (error) {

            setAppStatus("fail")

            disableLoadingBar()

        }

    }

    return {
        giveRecods
    }

}

export { useAdminControls }