import { useEventDetailsStore } from "../../stores"
import { useUserDataIO } from "../user/user";

const UseStartup = () => {

    const BACKEND_API = import.meta.env.VITE_BACKEND_API;
    const {
        setEventOrga, setEventRules,
        setEventSchedules, setRegistration,
        setAttendence, setProject,
        setEventDate, setPositionA,
        setPositionB, setPositionC,
        setCertificateRelease
    } = useEventDetailsStore();

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
                setEventDate(data.event_time)

                if (data.pos_A) {
                    setPositionA(true);
                }

                if (data.pos_B) {
                    setPositionB(true);
                }

                if (data.pos_C) {
                    setPositionC(true);
                }

                if (data.certificate) {
                    // setPositionC(true);
                    setCertificateRelease(data.certificate)

                }

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