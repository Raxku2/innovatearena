import { data } from "react-router";
import { useEventDetailsStore, useUserDetailsStore } from "../../stores";
import { useAdminControls } from "../admin/admin";
import { useUserAuthHook } from "../auth/userAuth";
import useDepartmentSelector from "../inputs/deptselector";
import useYearSelector from "../inputs/yearselector";
import { UseStartup } from "../startup/UseStartup";

const useUserDataIO = () => {
    const { setAppStatus } = useEventDetailsStore();
    const { giveRecods } = useAdminControls();

    const {
        userId, userName, department, batch,
        phone, setUserPhone, partnerName, partneremail,
        setUserDepartment, setUserBatch, setPartnerStatus,
        setUserPaernerName, setUserPaernerdp, setUserPaernerId,
        setUserPaernerEmail, setUserReg, setLogin, email,
        setPayStatus, settxn, userType, setuserType

    } = useUserDetailsStore();

    const { currentdepartment } = useDepartmentSelector();
    const { year } = useYearSelector();

    const { disableLoadingBar, enableLoadingBar } = useEventDetailsStore();


    const { setUserToLocalStorage, getUserFromLocalStorage } = useUserAuthHook();
    const { getEventData } = UseStartup();


    const BACKEND_API = import.meta.env.VITE_BACKEND_API;

    const getFullUserInfo = async () => {
        if (!userId) {
            return
        }
        // setAppStatus("sync...")
        try {
            const res = await fetch(BACKEND_API + `/user/${userId}`);

            if (res.status == 200) {


                const data = await res.json();
                fetch(data.dp);

                setLogin(data.name, data.email, data.dp, data._id, data.type, data.team_id);
                data.batch && setUserBatch(data.batch ? data.batch : "");
                data.payment_status && setPayStatus(data.payment_status);
                setUserDepartment(data.dept ? data.dept : '');
                data.phone ?? setUserPhone(data.phone);
                data.reg_status ?? setUserReg(data.reg_status);
                setPartnerStatus(data.partnerId ? true : false);
                data.partnerEmail ?? setUserPaernerEmail(data.partnerEmail);
                data.partnerId ?? setUserPaernerId(data.partnerId);
                data.partnerName ?? setUserPaernerName(data.partnerName);
                data.txn ?? settxn(data.txn);
                data.type ?? setuserType(data.type)
                // console.log("i set data");


                await giveRecods();

                setUserToLocalStorage(data)
            }

            if (res.status == 404) {
                enableLoadingBar();
                localStorage.removeItem('userData')
                window.location.reload();
            }

            // setAppStatus("data updated")

        } catch (error) {
            console.error("Profile fetch failed:", error);
        }
    }

    const updateUserInfo = async () => {
        if (!userId) {
            return
        }
        setAppStatus("updating...")
        try {
            const res = await fetch(BACKEND_API + `/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // 3. Stringify your data object
                    "name": userName ?? null,
                    "dept": currentdepartment ?? null,
                    "batch": year ?? null,
                    "phone": phone ?? null,
                    "reg_status": userName && currentdepartment && year && phone ? true : false
                })
            });

            if (res.status == 200) {
                setAppStatus("input recorded")
                getFullUserInfo();

            } else if (res.status == 304) {
                setAppStatus("data matched")
                getFullUserInfo();

            } else {
                console.log(res.status);

                setAppStatus("try again")

            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
        }

    }

    const createPartner = async () => {
        if (!userId) {
            return
        }
        if (partneremail == email) {
            setUserPaernerEmail(null);
            setUserPaernerName(null);
            disableLoadingBar();
            return
        }
        let partneremail_formatted = String(partneremail).toLowerCase()
        // console.log(partneremail_formatted);
        
        setAppStatus("updating...")
        try {
            const res = await fetch(BACKEND_API + `/user/partner/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "name": partnerName,
                        "email": partneremail_formatted
                    })
            });

            if (res.status == 201) {
                setAppStatus("Partner pached");
                setPartnerStatus(true);
                getPartnerInfo();
                // getUserFromLocalStorage()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                getFullUserInfo();
                disableLoadingBar()


            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar();
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }

    }

    const getPartnerInfo = async () => {
        if (!userId) {
            return
        }
        try {
            const res = await fetch(BACKEND_API + `/user/partner/${partneremail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.status == 200) {
                const data = await res.json();
                // console.log(data);

                setPartnerStatus(data._id ? true : false);
                setUserPaernerEmail(data.email ? data.email : '');
                setUserPaernerId(data._id ? data._id : '');
                setUserPaernerName(data.name ? data.name : '');
                setUserPaernerdp(data.dp ? data.dp : '');


                disableLoadingBar()

            } else if (res.status == 304) {
                setAppStatus("server busy")
                getFullUserInfo();
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }

    }

    const syncPartnerInfo = async () => {
        if (!userId) {
            return
        }
        setAppStatus("scan...")
        try {
            const res = await fetch(BACKEND_API + `/user/partner/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.status == 200) {
                // setPartnerStatus(true);
                await getPartnerInfo()
                await getFullUserInfo();
                getUserFromLocalStorage();
                // disableLoadingBar()
                setAppStatus("Partner scanned");

            } else if (res.status == 304) {
                setAppStatus("server busy")
                getFullUserInfo();
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }

    }

    const removePartnerInfo = async () => {
        if (!userId) {
            return
        }

        if (!partneremail) {
            window.location.reload()
        }
        setAppStatus("scan...")
        try {

            const res = await fetch(BACKEND_API + `/user/partner/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.status == 204) {
                setPartnerStatus(false);
                setUserPaernerEmail('');
                setUserPaernerName('');
                setUserPaernerId('');
                // setPartnerStatus(true);
                // getPartnerInfo();
                // getUserFromLocalStorage();
                let data = await JSON.parse(localStorage.getItem("userData"));
                data.partnerEmail = ''
                data.partnerName = ''
                data.partnerId = ''
                localStorage.setItem('userData', JSON.stringify(data))
                getFullUserInfo();

                disableLoadingBar();
                setAppStatus("Partner killed");


            } else if (res.status == 501) {
                setAppStatus("server busy")
                getFullUserInfo();
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }

    }
    const createSchedule = async (title, time) => {
        if (userType != 'root') {
            return
        }
        if (!title || !time) {
            console.log('cancel for value');

            return
        }
        setAppStatus("creating...")
        enableLoadingBar();
        try {

            const res = await fetch(BACKEND_API + `/event/schedule`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "title": title,
                        "time": time
                    })
            });

            if (res.status == 201) {
                await getEventData();
                setAppStatus("Created!");
                disableLoadingBar()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }


    }
    const updateSchedule = async (title, time, sch_id) => {
        if (userType != 'root') {
            return
        }
        if (!title || !time) {
            console.log('cancel for value');

            return
        }
        setAppStatus("updating...")
        enableLoadingBar();
        try {

            const res = await fetch(BACKEND_API + `/event/schedule/${sch_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "title": title,
                        "time": time
                    })
            });

            if (res.status == 200) {
                await getEventData();
                setAppStatus("updated!");
                disableLoadingBar()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }


    }



    const deleteSchedule = async (sch_id) => {
        if (userType != 'root') {
            return
        }
        if (!sch_id) {
            console.log('cancel for value');

            return
        }
        setAppStatus("deleting...")
        enableLoadingBar();
        try {

            const res = await fetch(BACKEND_API + `/event/schedule/${sch_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.status == 204) {
                await getEventData();
                setAppStatus("deleted!");
                disableLoadingBar()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }


    }
    // rule
    const createRule = async (title) => {
        if (userType != 'root') {
            return
        }
        if (!title) {
            console.log('cancel for value');

            return
        }
        setAppStatus("creating...")
        enableLoadingBar();
        try {

            const res = await fetch(BACKEND_API + `/event/rule`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "title": title,
                        "description": ""
                    })
            });

            if (res.status == 201) {
                await getEventData();
                setAppStatus("Created!");
                disableLoadingBar()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }


    }
    const updateRule = async (title, rule_id) => {
        if (userType != 'root') {
            return
        }
        if (!title) {
            console.log('cancel for value');

            return
        }
        setAppStatus("updating...")
        enableLoadingBar();
        try {

            const res = await fetch(BACKEND_API + `/event/rule/${rule_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "title": title,
                        "description": ""
                    })
            });

            if (res.status == 200) {
                await getEventData();
                setAppStatus("updated!");
                disableLoadingBar()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }


    }



    const deleteRule = async (rule_id) => {
        if (userType != 'root') {
            return
        }
        if (!rule_id) {
            console.log('cancel for value');
            return
        }
        setAppStatus("deleting...")
        enableLoadingBar();
        try {

            const res = await fetch(BACKEND_API + `/event/rule/${rule_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.status == 204) {
                await getEventData();
                setAppStatus("deleted!");
                disableLoadingBar()


            } else if (res.status == 501) {
                setAppStatus("server busy")
                disableLoadingBar()

            } else {
                console.log(res.status);
                setAppStatus("try again")
                disableLoadingBar()
            }
        } catch (error) {
            setAppStatus("try again")
            console.error("Profile fetch failed:", error);
            disableLoadingBar()
        }


    }


    return {
        getFullUserInfo, deleteSchedule,
        updateUserInfo, updateSchedule,
        createPartner, createSchedule,
        syncPartnerInfo, removePartnerInfo,
        createRule, updateRule, deleteRule
    }


}

export {
    useUserDataIO,

}