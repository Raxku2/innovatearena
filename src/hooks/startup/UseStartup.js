import { useEventDetailsStore } from "../../stores"

const UseStartup = () => {

    const BACKEND_API = import.meta.env.VITE_BACKEND_API;
    const { setEventOrga, setEventRules, setEventSchedules } = useEventDetailsStore();


    const getEventData = async () => {
        try {
            const res = await fetch(BACKEND_API + `/event/`);

            if (res.status == 200) {
                const data = await res.json();
                // console.log(data);
                setEventOrga(data.organizer);
                setEventRules(data.rule);
                setEventSchedules(data.schedule);
            }

            if (res.status == 404) {
                return
            }
        } catch (error) {
            console.error("Profile fetch failed:", error);
        }
    }




    return {
        getEventData
    }
}


export { UseStartup }