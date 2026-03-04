import { useEventDetailsStore, useUserDetailsStore } from "../../stores"

const useAdminControls = () => {
    const { setMatrix, disableLoadingBar, setAppStatus } = useEventDetailsStore();
    const { userId, userType } = useUserDetailsStore();

    const BACKEND_API = import.meta.env.VITE_BACKEND_API;

    const giveRecods = async () => {
        // console.log(userType);
        // console.log("its running");
        if (userType != 'root') {
            return
        }
        // console.log("its still running");
        // console.log(userType);
        
        setAppStatus("syncing...")
        try {
            const res = await fetch(BACKEND_API + `/root/${userId}`);

            if (res.status == 200) {
                const data = await res.json();
                setMatrix(data);
                // console.log(data);
                
                setAppStatus("fetched!!")
                // disableLoadingBar();
            }

            if (res.status == 401) {
                setAppStatus("server denied")
                disableLoadingBar();
                return
            }
        } catch (error) {
            // console.error("Profile fetch failed:", error);
            setAppStatus("fail")
            disableLoadingBar();
        }

    }

    return {
        giveRecods
    }

}

export { useAdminControls }