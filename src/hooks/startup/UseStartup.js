import { useEventDetailsStore } from "../../stores"
import { useUserDataIO } from "../user/user";

const UseStartup = () => {

    const BACKEND_API = import.meta.env.VITE_BACKEND_API;
    const { setEventOrga, setEventRules, setEventSchedules, setRegistration, setAttendence, setProject } = useEventDetailsStore();

    const getEventData = async () => {
        try {
            const res = await fetch(BACKEND_API + `/event/`);

            if (res.status == 200) {
                const data = await res.json();
                // console.log(data);
                setEventOrga(data.organizer);
                setEventRules(data.rule);
                setEventSchedules(data.schedule);
                setRegistration(data.registration_process);
                setAttendence(data.attendence_process);
                setProject(data.submit_process)

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